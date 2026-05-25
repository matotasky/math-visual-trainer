export type MathTopic =
  | "quantity_recognition"
  | "number_matching"
  | "addition_to_5"
  | "quantity_to_10"
  | "make_10"
  | "addition_to_10"
  | "subtraction_to_10"
  | "addition_to_20"
  | "bridge_through_10";

export type VisualModel = "dots" | "ten_frame" | "number_line" | "groups" | "none";

export type TimePressure = "none" | "soft" | "medium" | "high";

export type ExerciseMode = "diagnostic" | "learn" | "practice" | "test" | "challenge";

export type MathOperator = "+" | "-";

export type LevelId =
  | "L0_DIAGNOSTIC"
  | "L1_QUANTITY_TO_5"
  | "L2_ADDITION_TO_5"
  | "L3_QUANTITY_TO_10"
  | "L4_MAKE_10"
  | "L5_ADDITION_TO_10"
  | "L6_AUTOMATION_TO_10"
  | "L7_ADDITION_TO_20";

export type QuestionType =
  | "quantity_recognition"
  | "number_matching"
  | "addition"
  | "make_10"
  | "subtraction"
  | "bridge_through_10";

export type Exercise = {
  id: string;
  topic: MathTopic;
  levelId: LevelId;
  mode: ExerciseMode;
  questionType: QuestionType;
  operands: number[];
  operator?: MathOperator;
  correctAnswer: number;
  visualModel: VisualModel;
  prompt: string;
  options?: number[];
  timePressure: TimePressure;
};

export type GenerateExerciseParams = {
  childProfileId: string;
  mode: ExerciseMode;
  levelId: LevelId;
  topic?: MathTopic;
  preferredVisualModel?: VisualModel;
};

export type AnswerValidationResult = {
  isCorrect: boolean;
  normalizedAnswer: number | null;
};

export type LevelDefinition = {
  id: LevelId;
  label: string;
  description: string;
  topics: MathTopic[];
  visualModels: VisualModel[];
  timePressure: TimePressure;
  minAttemptsForMastery: number;
  targetAccuracy: number;
  targetResponseTimeMs?: number;
  unlocksAfter?: LevelId;
};

export type MasteryStatus =
  | "not_ready"
  | "practice"
  | "speed_practice"
  | "eligible_next_level";

export type MasteryInput = {
  accuracy: number;
  averageResponseTimeMs: number;
  attemptsCount: number;
  correctStreak: number;
  recentAccuracy: number;
  mistakePenalty: number;
};

export type MasteryResult = {
  masteryScore: number;
  status: MasteryStatus;
  eligibleForNextLevel: boolean;
  reasons: string[];
};

export type MistakeCategory =
  | "weak_quantity_recognition"
  | "wrong_pair_combination"
  | "weak_make_10"
  | "counting_by_one_dependency"
  | "fast_guessing"
  | "slow_but_correct"
  | "unknown";

export type RecommendedActivity = {
  mode: ExerciseMode;
  topic: MathTopic;
  levelId: LevelId;
  reason: string;
};
