import type { Locale } from "./locale";

export type MathTopic =
  | "quantity_recognition"
  | "number_matching"
  | "addition_to_5"
  | "quantity_to_10"
  | "make_10"
  | "addition_to_10"
  | "subtraction_to_10"
  | "addition_to_20"
  | "subtraction_to_20"
  | "bridge_through_10"
  | "tens_to_100"
  | "two_digit_addition_no_regroup"
  | "two_digit_subtraction_no_regroup"
  | "two_digit_addition_with_regroup"
  | "two_digit_subtraction_with_regroup"
  | "three_digit_addition_strategies"
  | "three_digit_subtraction_strategies";

export type VisualModel = "dots" | "ten_frame" | "number_line" | "groups" | "none";

export type TimePressure = "none" | "soft" | "medium" | "high";

export type ExerciseMode = "diagnostic" | "learn" | "practice" | "test" | "challenge";

export type MathOperator = "+" | "-";

export type LevelId =
  | "L0_DIAGNOSTIC"
  | "L1_FACTS_TO_10"
  | "L2_BRIDGE_TO_10"
  | "L3_FACTS_TO_20"
  | "L4_TENS_TO_100"
  | "L5_TWO_DIGIT_NO_REGROUP"
  | "L6_TWO_DIGIT_WITH_REGROUP"
  | "L7_THREE_DIGIT_STRATEGIES"
  | "L8_MIXED_FLUENCY"
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
  locale?: Locale;
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
