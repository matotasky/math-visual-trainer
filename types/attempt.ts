import type { ExerciseMode, MathOperator, MathTopic, VisualModel } from "./math";

export type ExerciseAttempt = {
  id: string;
  childProfileId: string;
  sessionId: string;
  topic: MathTopic;
  levelId: string;
  mode: ExerciseMode;
  questionType: string;
  operands: number[];
  operator?: MathOperator;
  correctAnswer: number;
  givenAnswer: number | null;
  isCorrect: boolean;
  responseTimeMs: number;
  usedHint: boolean;
  visualModel: VisualModel;
  createdAt: Date;
};
