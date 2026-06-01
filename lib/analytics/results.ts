import type { ExerciseAttempt, ExerciseMode, Locale, MathTopic } from "@/types";

export type ResultSessionSummary = {
  sessionId: string;
  mode: ExerciseMode;
  topics: MathTopic[];
  primaryTopic: MathTopic;
  levelId: string;
  startedAt: Date;
  endedAt: Date;
  totalTasks: number;
  correctTasks: number;
  accuracy: number;
  averageResponseTimeMs: number;
};

function sortAttemptsByOldest(attempts: ExerciseAttempt[]): ExerciseAttempt[] {
  return [...attempts].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
}

export function summarizeResultSessions(attempts: ExerciseAttempt[]): ResultSessionSummary[] {
  const grouped = new Map<string, ExerciseAttempt[]>();

  for (const attempt of attempts) {
    grouped.set(attempt.sessionId, [...(grouped.get(attempt.sessionId) ?? []), attempt]);
  }

  return [...grouped.entries()]
    .map(([sessionId, sessionAttempts]) => {
      const orderedAttempts = sortAttemptsByOldest(sessionAttempts);
      const firstAttempt = orderedAttempts[0];
      const lastAttempt = orderedAttempts[orderedAttempts.length - 1] ?? firstAttempt;
      const correctTasks = orderedAttempts.filter((attempt) => attempt.isCorrect).length;
      const totalResponseTimeMs = orderedAttempts.reduce((total, attempt) => total + attempt.responseTimeMs, 0);
      const topics: MathTopic[] = [...new Set(orderedAttempts.map((attempt) => attempt.topic))];
      const sessionTopics: MathTopic[] = topics.length > 0 ? topics : ["addition_to_5"];

      return {
        sessionId,
        mode: firstAttempt?.mode ?? "practice",
        topics: sessionTopics,
        primaryTopic: sessionTopics[0] ?? "addition_to_5",
        levelId: firstAttempt?.levelId ?? "L0_DIAGNOSTIC",
        startedAt: firstAttempt?.createdAt ?? new Date(),
        endedAt: lastAttempt?.createdAt ?? new Date(),
        totalTasks: orderedAttempts.length,
        correctTasks,
        accuracy: orderedAttempts.length === 0 ? 0 : Math.round((correctTasks / orderedAttempts.length) * 100),
        averageResponseTimeMs: orderedAttempts.length === 0 ? 0 : Math.round(totalResponseTimeMs / orderedAttempts.length)
      };
    })
    .sort((a, b) => b.endedAt.getTime() - a.endedAt.getTime());
}

export function formatAttemptQuestion(attempt: ExerciseAttempt, locale: Locale): string {
  const [a = 0, b = 0] = attempt.operands;

  if (attempt.questionType === "quantity_recognition") {
    return locale === "sk" ? "Koľko ich bolo na obrázku?" : "How many were on the picture?";
  }

  if (attempt.questionType === "number_matching") {
    return locale === "sk" ? "Ktoré číslo patrilo k obrázku?" : "Which number matched the picture?";
  }

  if (attempt.questionType === "make_10") {
    return `${a} + ? = 10`;
  }

  if (attempt.questionType === "subtraction") {
    return `${a} - ${b} = ?`;
  }

  return `${a} + ${b} = ?`;
}
