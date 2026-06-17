import type { LevelDefinition, LevelId } from "@/types";

export const LEVELS = [
  {
    id: "L0_DIAGNOSTIC",
    label: "Diagnostic",
    description: "Friendly entry diagnostic. Easy tasks are used to detect gaps, not as the default third-grade path.",
    topics: [
      "quantity_to_10",
      "number_matching",
      "addition_to_10",
      "subtraction_to_10",
      "make_10",
      "bridge_through_10",
      "addition_to_20",
      "subtraction_to_20",
      "tens_to_100",
      "two_digit_addition_no_regroup"
    ],
    visualModels: ["dots", "ten_frame", "number_line", "none"],
    timePressure: "none",
    minAttemptsForMastery: 0,
    targetAccuracy: 0
  },
  {
    id: "L1_FACTS_TO_10",
    label: "Facts to 10",
    description: "Fast, stable addition and subtraction to 10 with make-10 support when needed.",
    topics: ["addition_to_10", "subtraction_to_10", "make_10"],
    visualModels: ["ten_frame", "number_line", "none"],
    timePressure: "medium",
    minAttemptsForMastery: 40,
    targetAccuracy: 0.92,
    targetResponseTimeMs: 3500,
    unlocksAfter: "L0_DIAGNOSTIC"
  },
  {
    id: "L2_BRIDGE_TO_10",
    label: "Bridge through 10",
    description: "Use complements to 10 for examples like 8 + 5 and 13 - 6.",
    topics: ["bridge_through_10", "addition_to_20", "subtraction_to_20"],
    visualModels: ["ten_frame", "number_line", "none"],
    timePressure: "medium",
    minAttemptsForMastery: 45,
    targetAccuracy: 0.9,
    targetResponseTimeMs: 5500,
    unlocksAfter: "L1_FACTS_TO_10"
  },
  {
    id: "L3_FACTS_TO_20",
    label: "Facts to 20",
    description: "Automate addition and subtraction facts to 20 after the bridge strategy is stable.",
    topics: ["addition_to_20", "subtraction_to_20", "bridge_through_10"],
    visualModels: ["number_line", "ten_frame", "none"],
    timePressure: "high",
    minAttemptsForMastery: 60,
    targetAccuracy: 0.92,
    targetResponseTimeMs: 4500,
    unlocksAfter: "L2_BRIDGE_TO_10"
  },
  {
    id: "L4_TENS_TO_100",
    label: "Tens to 100",
    description: "Mental addition and subtraction with whole tens up to 100.",
    topics: ["tens_to_100"],
    visualModels: ["none"],
    timePressure: "medium",
    minAttemptsForMastery: 45,
    targetAccuracy: 0.92,
    targetResponseTimeMs: 5000,
    unlocksAfter: "L3_FACTS_TO_20"
  },
  {
    id: "L5_TWO_DIGIT_NO_REGROUP",
    label: "Two-digit without regrouping",
    description: "Add and subtract two-digit numbers without carrying or borrowing.",
    topics: ["two_digit_addition_no_regroup", "two_digit_subtraction_no_regroup"],
    visualModels: ["none"],
    timePressure: "medium",
    minAttemptsForMastery: 60,
    targetAccuracy: 0.9,
    targetResponseTimeMs: 7000,
    unlocksAfter: "L4_TENS_TO_100"
  },
  {
    id: "L6_TWO_DIGIT_WITH_REGROUP",
    label: "Two-digit with regrouping",
    description: "Add and subtract two-digit numbers with carrying and borrowing.",
    topics: ["two_digit_addition_with_regroup", "two_digit_subtraction_with_regroup"],
    visualModels: ["none"],
    timePressure: "medium",
    minAttemptsForMastery: 70,
    targetAccuracy: 0.9,
    targetResponseTimeMs: 9000,
    unlocksAfter: "L5_TWO_DIGIT_NO_REGROUP"
  },
  {
    id: "L7_THREE_DIGIT_STRATEGIES",
    label: "Three-digit strategies",
    description: "Use place value and friendly-number strategies for three-digit mental arithmetic.",
    topics: ["three_digit_addition_strategies", "three_digit_subtraction_strategies"],
    visualModels: ["none"],
    timePressure: "soft",
    minAttemptsForMastery: 70,
    targetAccuracy: 0.88,
    targetResponseTimeMs: 12000,
    unlocksAfter: "L6_TWO_DIGIT_WITH_REGROUP"
  },
  {
    id: "L8_MIXED_FLUENCY",
    label: "Mixed fluency",
    description: "Short mixed sets that combine facts, bridges, two-digit examples, and strategic larger numbers.",
    topics: [
      "addition_to_10",
      "subtraction_to_10",
      "addition_to_20",
      "subtraction_to_20",
      "two_digit_addition_with_regroup",
      "two_digit_subtraction_with_regroup",
      "three_digit_addition_strategies",
      "three_digit_subtraction_strategies"
    ],
    visualModels: ["none"],
    timePressure: "high",
    minAttemptsForMastery: 90,
    targetAccuracy: 0.92,
    targetResponseTimeMs: 8000,
    unlocksAfter: "L7_THREE_DIGIT_STRATEGIES"
  }
] satisfies LevelDefinition[];

export const DEFAULT_LEVEL_ID: LevelId = "L0_DIAGNOSTIC";

const LEGACY_LEVEL_ID_MAP: Partial<Record<LevelId, LevelId>> = {
  L1_QUANTITY_TO_5: "L1_FACTS_TO_10",
  L2_ADDITION_TO_5: "L1_FACTS_TO_10",
  L3_QUANTITY_TO_10: "L1_FACTS_TO_10",
  L4_MAKE_10: "L2_BRIDGE_TO_10",
  L5_ADDITION_TO_10: "L1_FACTS_TO_10",
  L6_AUTOMATION_TO_10: "L1_FACTS_TO_10",
  L7_ADDITION_TO_20: "L3_FACTS_TO_20"
};

const levelIds = new Set<string>(LEVELS.map((level) => level.id));

export function normalizeLevelId(levelId: string | null | undefined): LevelId {
  if (!levelId) {
    return DEFAULT_LEVEL_ID;
  }

  const legacyMatch = LEGACY_LEVEL_ID_MAP[levelId as LevelId];

  if (legacyMatch) {
    return legacyMatch;
  }

  return levelIds.has(levelId) ? (levelId as LevelId) : DEFAULT_LEVEL_ID;
}

export function getLevelDefinition(levelId: string | null | undefined): LevelDefinition {
  const normalizedLevelId = normalizeLevelId(levelId);

  return LEVELS.find((level) => level.id === normalizedLevelId) ?? LEVELS[0];
}

export function getLevelIndex(levelId: string | null | undefined): number {
  const normalizedLevelId = normalizeLevelId(levelId);
  const index = LEVELS.findIndex((level) => level.id === normalizedLevelId);

  return index >= 0 ? index : 0;
}
