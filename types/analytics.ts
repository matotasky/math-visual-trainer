import type { MathOperator, MathTopic, VisualModel } from "./math";

export type TopicMastery = {
  id: string;
  childProfileId: string;
  topic: MathTopic;
  levelId: string;
  accuracy: number;
  averageResponseTimeMs: number;
  attemptsCount: number;
  correctStreak: number;
  recentAccuracy: number;
  masteryScore: number;
  lastPracticedAt: Date;
  updatedAt: Date;
};

export type DailyStats = {
  id: string;
  childProfileId: string;
  date: string;
  sessionsCount: number;
  attemptsCount: number;
  correctAttempts: number;
  totalResponseTimeMs: number;
  averageResponseTimeMs: number;
  activeMinutes: number;
  topicsPracticed: MathTopic[];
  createdAt: Date;
  updatedAt: Date;
};

export type MistakeStats = {
  id: string;
  childProfileId: string;
  topic: MathTopic;
  levelId: string;
  operandKey: string;
  operator?: MathOperator;
  wrongCount: number;
  totalCount: number;
  lastMistakeAt: Date;
  commonWrongAnswers: Record<string, number>;
};

export type ResponseTimePattern = "stable" | "slow" | "fast_guessing" | "variable";

export type MistakeAnalysisSummary = {
  topic: MathTopic;
  visualModel?: VisualModel;
  operandKeys: string[];
  likelyIssue: string;
  suggestedRemediation: string;
};
