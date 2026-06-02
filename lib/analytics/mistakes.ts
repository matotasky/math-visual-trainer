import { classifyMistake, getOperandKey } from "@/lib/math-engine";
import type { ExerciseAttempt, MathOperator, MathTopic, MistakeCategory } from "@/types";

export type CommonWrongAnswer = {
  answer: string;
  count: number;
};

export type MistakePatternSummary = {
  id: string;
  operandKey: string;
  topic: MathTopic;
  levelId: string;
  operator?: MathOperator;
  wrongCount: number;
  totalCount: number;
  errorRate: number;
  averageWrongResponseTimeMs: number;
  lastMistakeAt: Date;
  commonWrongAnswers: CommonWrongAnswer[];
  primaryCategory: MistakeCategory;
};

export type TopicMistakeSummary = {
  topic: MathTopic;
  totalCount: number;
  wrongCount: number;
  errorRate: number;
  averageResponseTimeMs: number;
};

export type SlowTopicSummary = {
  topic: MathTopic;
  correctCount: number;
  averageResponseTimeMs: number;
};

export type MistakeAnalysis = {
  totalAttempts: number;
  wrongAttempts: number;
  fastGuesses: number;
  slowCorrectAttempts: number;
  repeatedPatterns: MistakePatternSummary[];
  weakestTopics: TopicMistakeSummary[];
  slowTopics: SlowTopicSummary[];
  primaryCategory: MistakeCategory;
};

function average(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }

  return Math.round(values.reduce((total, value) => total + value, 0) / values.length);
}

function pickMostCommonCategory(attempts: ExerciseAttempt[]): MistakeCategory {
  const counts = new Map<MistakeCategory, number>();

  for (const attempt of attempts) {
    const category = classifyMistake(attempt);
    counts.set(category, (counts.get(category) ?? 0) + 1);
  }

  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "unknown";
}

function collectCommonWrongAnswers(attempts: ExerciseAttempt[]): CommonWrongAnswer[] {
  const counts = new Map<string, number>();

  for (const attempt of attempts) {
    const answer = attempt.givenAnswer === null ? "no_answer" : String(attempt.givenAnswer);
    counts.set(answer, (counts.get(answer) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([answer, count]) => ({ answer, count }))
    .sort((a, b) => b.count - a.count || a.answer.localeCompare(b.answer))
    .slice(0, 3);
}

function summarizeRepeatedPatterns(attempts: ExerciseAttempt[]): MistakePatternSummary[] {
  const grouped = new Map<string, ExerciseAttempt[]>();

  for (const attempt of attempts) {
    const operandKey = getOperandKey(attempt.operands, attempt.operator);
    const key = `${attempt.topic}:${attempt.levelId}:${attempt.operator ?? "none"}:${operandKey}`;
    grouped.set(key, [...(grouped.get(key) ?? []), attempt]);
  }

  return [...grouped.values()]
    .map((groupAttempts) => {
      const firstAttempt = groupAttempts[0];
      const wrongAttempts = groupAttempts.filter((attempt) => !attempt.isCorrect);
      const lastMistakeAt = wrongAttempts.reduce(
        (latest, attempt) => (attempt.createdAt > latest ? attempt.createdAt : latest),
        wrongAttempts[0]?.createdAt ?? new Date()
      );

      return {
        id: `${firstAttempt?.topic ?? "addition_to_5"}:${firstAttempt?.levelId ?? "L0_DIAGNOSTIC"}:${getOperandKey(firstAttempt?.operands ?? [], firstAttempt?.operator)}`,
        operandKey: firstAttempt ? getOperandKey(firstAttempt.operands, firstAttempt.operator) : "",
        topic: firstAttempt?.topic ?? "addition_to_5",
        levelId: firstAttempt?.levelId ?? "L0_DIAGNOSTIC",
        operator: firstAttempt?.operator,
        wrongCount: wrongAttempts.length,
        totalCount: groupAttempts.length,
        errorRate: groupAttempts.length === 0 ? 0 : Math.round((wrongAttempts.length / groupAttempts.length) * 100),
        averageWrongResponseTimeMs: average(wrongAttempts.map((attempt) => attempt.responseTimeMs)),
        lastMistakeAt,
        commonWrongAnswers: collectCommonWrongAnswers(wrongAttempts),
        primaryCategory: pickMostCommonCategory(wrongAttempts)
      };
    })
    .filter((pattern) => pattern.wrongCount > 0)
    .sort((a, b) => b.wrongCount - a.wrongCount || b.errorRate - a.errorRate || b.lastMistakeAt.getTime() - a.lastMistakeAt.getTime());
}

function summarizeWeakestTopics(attempts: ExerciseAttempt[]): TopicMistakeSummary[] {
  const grouped = new Map<MathTopic, ExerciseAttempt[]>();

  for (const attempt of attempts) {
    grouped.set(attempt.topic, [...(grouped.get(attempt.topic) ?? []), attempt]);
  }

  return [...grouped.entries()]
    .map(([topic, topicAttempts]) => {
      const wrongCount = topicAttempts.filter((attempt) => !attempt.isCorrect).length;

      return {
        topic,
        totalCount: topicAttempts.length,
        wrongCount,
        errorRate: topicAttempts.length === 0 ? 0 : Math.round((wrongCount / topicAttempts.length) * 100),
        averageResponseTimeMs: average(topicAttempts.map((attempt) => attempt.responseTimeMs))
      };
    })
    .filter((topic) => topic.wrongCount > 0)
    .sort((a, b) => b.errorRate - a.errorRate || b.wrongCount - a.wrongCount)
    .slice(0, 5);
}

function summarizeSlowTopics(attempts: ExerciseAttempt[]): SlowTopicSummary[] {
  const grouped = new Map<MathTopic, ExerciseAttempt[]>();

  for (const attempt of attempts.filter((candidate) => candidate.isCorrect && candidate.responseTimeMs > 8000)) {
    grouped.set(attempt.topic, [...(grouped.get(attempt.topic) ?? []), attempt]);
  }

  return [...grouped.entries()]
    .map(([topic, topicAttempts]) => ({
      topic,
      correctCount: topicAttempts.length,
      averageResponseTimeMs: average(topicAttempts.map((attempt) => attempt.responseTimeMs))
    }))
    .sort((a, b) => b.averageResponseTimeMs - a.averageResponseTimeMs || b.correctCount - a.correctCount)
    .slice(0, 5);
}

export function summarizeMistakeAnalysis(attempts: ExerciseAttempt[]): MistakeAnalysis {
  const wrongAttempts = attempts.filter((attempt) => !attempt.isCorrect);
  const slowCorrectAttempts = attempts.filter((attempt) => attempt.isCorrect && attempt.responseTimeMs > 8000);
  const fastGuesses = wrongAttempts.filter((attempt) => classifyMistake(attempt) === "fast_guessing").length;
  const repeatedPatterns = summarizeRepeatedPatterns(attempts);
  const primaryCategory = repeatedPatterns[0]?.primaryCategory ?? pickMostCommonCategory([...wrongAttempts, ...slowCorrectAttempts]);

  return {
    totalAttempts: attempts.length,
    wrongAttempts: wrongAttempts.length,
    fastGuesses,
    slowCorrectAttempts: slowCorrectAttempts.length,
    repeatedPatterns,
    weakestTopics: summarizeWeakestTopics(attempts),
    slowTopics: summarizeSlowTopics(attempts),
    primaryCategory
  };
}
