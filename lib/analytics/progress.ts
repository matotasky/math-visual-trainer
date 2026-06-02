import { LEVELS } from "@/data/levels";
import { toLocalDateKey } from "@/lib/utils/date";
import type { ExerciseAttempt, LevelId, MathTopic } from "@/types";

export type ProgressDailyRow = {
  dateKey: string;
  label: string;
  attempts: number;
  correct: number;
  accuracy: number;
  responseTimeSeconds: number;
};

export type ProgressTopicRow = {
  topic: MathTopic;
  attempts: number;
  correct: number;
  accuracy: number;
  averageResponseTimeMs: number;
  masteryScore: number;
};

export type ProgressLevelRow = {
  levelId: LevelId;
  attempts: number;
  correct: number;
  accuracy: number;
  averageResponseTimeMs: number;
};

export type ProgressSummary = {
  totalAttempts: number;
  correctAttempts: number;
  overallAccuracy: number;
  averageResponseTimeMs: number;
  activeDays: number;
  currentStreak: number;
  longestStreak: number;
  lastActivityAt?: Date;
  dailyRows: ProgressDailyRow[];
  topicRows: ProgressTopicRow[];
  levelRows: ProgressLevelRow[];
};

function dateKeyForOffset(daysAgo: number): string {
  const date = new Date();

  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - daysAgo);

  return toLocalDateKey(date);
}

function formatDateLabel(dateKey: string): string {
  return dateKey.slice(5);
}

function average(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }

  return Math.round(values.reduce((total, value) => total + value, 0) / values.length);
}

function calculateCurrentStreak(activeDateKeys: Set<string>): number {
  const todayKey = dateKeyForOffset(0);
  const yesterdayKey = dateKeyForOffset(1);

  if (!activeDateKeys.has(todayKey) && !activeDateKeys.has(yesterdayKey)) {
    return 0;
  }

  const startOffset = activeDateKeys.has(todayKey) ? 0 : 1;
  let streak = 0;

  for (let offset = startOffset; offset < 365; offset += 1) {
    if (!activeDateKeys.has(dateKeyForOffset(offset))) {
      break;
    }

    streak += 1;
  }

  return streak;
}

function dateKeyToTime(dateKey: string): number {
  const [year = "0", month = "1", day = "1"] = dateKey.split("-");

  return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
}

function calculateLongestStreak(activeDateKeys: Set<string>): number {
  const orderedDateKeys = [...activeDateKeys].sort((a, b) => dateKeyToTime(a) - dateKeyToTime(b));
  let longest = 0;
  let current = 0;
  let previousTime: number | null = null;
  const dayMs = 24 * 60 * 60 * 1000;

  for (const dateKey of orderedDateKeys) {
    const dateTime = dateKeyToTime(dateKey);

    if (previousTime === null || dateTime - previousTime === dayMs) {
      current += 1;
    } else {
      current = 1;
    }

    longest = Math.max(longest, current);
    previousTime = dateTime;
  }

  return longest;
}

function calculateMasteryScore(accuracy: number, averageResponseTimeMs: number): number {
  const speedScore =
    averageResponseTimeMs <= 0
      ? 0
      : averageResponseTimeMs <= 5000
        ? 100
        : averageResponseTimeMs <= 8000
          ? 80
          : averageResponseTimeMs <= 12000
            ? 60
            : 40;

  return Math.round(accuracy * 0.8 + speedScore * 0.2);
}

function summarizeDailyRows(attempts: ExerciseAttempt[], days: number): ProgressDailyRow[] {
  const dateKeys = Array.from({ length: days }, (_, index) => dateKeyForOffset(days - 1 - index));

  return dateKeys.map((dateKey) => {
    const dayAttempts = attempts.filter((attempt) => toLocalDateKey(attempt.createdAt) === dateKey);
    const correct = dayAttempts.filter((attempt) => attempt.isCorrect).length;
    const averageResponseTimeMs = average(dayAttempts.map((attempt) => attempt.responseTimeMs));

    return {
      dateKey,
      label: formatDateLabel(dateKey),
      attempts: dayAttempts.length,
      correct,
      accuracy: dayAttempts.length === 0 ? 0 : Math.round((correct / dayAttempts.length) * 100),
      responseTimeSeconds: averageResponseTimeMs === 0 ? 0 : Number((averageResponseTimeMs / 1000).toFixed(1))
    };
  });
}

function summarizeTopicRows(attempts: ExerciseAttempt[]): ProgressTopicRow[] {
  const grouped = new Map<MathTopic, ExerciseAttempt[]>();

  for (const attempt of attempts) {
    grouped.set(attempt.topic, [...(grouped.get(attempt.topic) ?? []), attempt]);
  }

  return [...grouped.entries()]
    .map(([topic, topicAttempts]) => {
      const correct = topicAttempts.filter((attempt) => attempt.isCorrect).length;
      const accuracy = topicAttempts.length === 0 ? 0 : Math.round((correct / topicAttempts.length) * 100);
      const averageResponseTimeMs = average(topicAttempts.map((attempt) => attempt.responseTimeMs));

      return {
        topic,
        attempts: topicAttempts.length,
        correct,
        accuracy,
        averageResponseTimeMs,
        masteryScore: calculateMasteryScore(accuracy, averageResponseTimeMs)
      };
    })
    .sort((a, b) => b.masteryScore - a.masteryScore || b.attempts - a.attempts);
}

function summarizeLevelRows(attempts: ExerciseAttempt[]): ProgressLevelRow[] {
  return LEVELS.map((level) => {
    const levelAttempts = attempts.filter((attempt) => attempt.levelId === level.id);
    const correct = levelAttempts.filter((attempt) => attempt.isCorrect).length;

    return {
      levelId: level.id,
      attempts: levelAttempts.length,
      correct,
      accuracy: levelAttempts.length === 0 ? 0 : Math.round((correct / levelAttempts.length) * 100),
      averageResponseTimeMs: average(levelAttempts.map((attempt) => attempt.responseTimeMs))
    };
  });
}

export function summarizeProgress(attempts: ExerciseAttempt[], days = 30): ProgressSummary {
  const activeDateKeys = new Set(attempts.map((attempt) => toLocalDateKey(attempt.createdAt)));
  const correctAttempts = attempts.filter((attempt) => attempt.isCorrect).length;
  const averageResponseTimeMs = average(attempts.map((attempt) => attempt.responseTimeMs));
  const lastActivityAt = attempts.reduce<Date | undefined>(
    (latest, attempt) => (!latest || attempt.createdAt > latest ? attempt.createdAt : latest),
    undefined
  );

  return {
    totalAttempts: attempts.length,
    correctAttempts,
    overallAccuracy: attempts.length === 0 ? 0 : Math.round((correctAttempts / attempts.length) * 100),
    averageResponseTimeMs,
    activeDays: activeDateKeys.size,
    currentStreak: calculateCurrentStreak(activeDateKeys),
    longestStreak: calculateLongestStreak(activeDateKeys),
    lastActivityAt,
    dailyRows: summarizeDailyRows(attempts, days),
    topicRows: summarizeTopicRows(attempts),
    levelRows: summarizeLevelRows(attempts)
  };
}
