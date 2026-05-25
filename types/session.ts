import type { ExerciseMode, MathTopic } from "./math";

export type LearningSession = {
  id: string;
  childProfileId: string;
  mode: ExerciseMode;
  topic: MathTopic;
  levelId: string;
  startedAt: Date;
  endedAt?: Date;
  totalTasks: number;
  correctTasks: number;
  averageResponseTimeMs: number;
  completed: boolean;
};
