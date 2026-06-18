import { getLevelIndex, LEVELS } from "@/data/levels";
import type { ChildProfile, ExerciseAttempt, LevelId, MistakeStats, TopicMastery } from "@/types";

export type LevelAdjustmentAction = "keep" | "raise" | "lower";

export type LevelAdjustmentReason =
  | "needs_diagnostic"
  | "not_enough_data"
  | "ready_to_raise"
  | "accuracy_low_lower"
  | "accuracy_low_practice"
  | "slow_but_correct"
  | "keep_building";

export type LevelAdjustmentRecommendation = {
  action: LevelAdjustmentAction;
  recommendedLevelId: LevelId;
  reason: LevelAdjustmentReason;
  accuracy: number;
  attemptsCount: number;
  averageResponseTimeMs: number;
};

type RecommendLevelAdjustmentParams = {
  childProfile: ChildProfile;
  attempts: ExerciseAttempt[];
};

type RecommendLevelAdjustmentFromMasteryParams = {
  childProfile: ChildProfile;
  mistakeStats: MistakeStats[];
  topicMastery: TopicMastery[];
};

function clampIndex(index: number): number {
  return Math.min(Math.max(index, 0), LEVELS.length - 1);
}

function buildLevelAdjustmentRecommendation(
  childProfile: ChildProfile,
  attemptsCount: number,
  correctCount: number,
  averageResponseTimeMs: number,
  mistakeCount: number
): LevelAdjustmentRecommendation {
  const currentIndex = getLevelIndex(childProfile.currentLevelId);
  const currentLevelId = LEVELS[currentIndex]?.id ?? "L0_DIAGNOSTIC";
  const accuracy = attemptsCount === 0 ? 0 : correctCount / attemptsCount;

  if (!childProfile.diagnosticCompletedAt) {
    return {
      action: "keep",
      recommendedLevelId: currentLevelId,
      reason: "needs_diagnostic",
      accuracy,
      attemptsCount,
      averageResponseTimeMs
    };
  }

  if (attemptsCount < 10) {
    return {
      action: "keep",
      recommendedLevelId: currentLevelId,
      reason: "not_enough_data",
      accuracy,
      attemptsCount,
      averageResponseTimeMs
    };
  }

  if (accuracy < 0.7) {
    const recommendedIndex = clampIndex(currentIndex - 1);

    return {
      action: recommendedIndex < currentIndex ? "lower" : "keep",
      recommendedLevelId: LEVELS[recommendedIndex]?.id ?? currentLevelId,
      reason: recommendedIndex < currentIndex ? "accuracy_low_lower" : "accuracy_low_practice",
      accuracy,
      attemptsCount,
      averageResponseTimeMs
    };
  }

  if (accuracy < 0.82) {
    return {
      action: "keep",
      recommendedLevelId: currentLevelId,
      reason: "accuracy_low_practice",
      accuracy,
      attemptsCount,
      averageResponseTimeMs
    };
  }

  if (accuracy >= 0.9 && averageResponseTimeMs > 8000) {
    return {
      action: "keep",
      recommendedLevelId: currentLevelId,
      reason: "slow_but_correct",
      accuracy,
      attemptsCount,
      averageResponseTimeMs
    };
  }

  if (attemptsCount >= 20 && accuracy >= 0.92 && averageResponseTimeMs <= 6500 && mistakeCount <= 2) {
    const recommendedIndex = clampIndex(currentIndex + 1);

    return {
      action: recommendedIndex > currentIndex ? "raise" : "keep",
      recommendedLevelId: LEVELS[recommendedIndex]?.id ?? currentLevelId,
      reason: recommendedIndex > currentIndex ? "ready_to_raise" : "keep_building",
      accuracy,
      attemptsCount,
      averageResponseTimeMs
    };
  }

  return {
    action: "keep",
    recommendedLevelId: currentLevelId,
    reason: "keep_building",
    accuracy,
    attemptsCount,
    averageResponseTimeMs
  };
}

export function recommendLevelAdjustment({
  childProfile,
  attempts
}: RecommendLevelAdjustmentParams): LevelAdjustmentRecommendation {
  const attemptsCount = attempts.length;
  const correctCount = attempts.filter((attempt) => attempt.isCorrect).length;
  const totalResponseTimeMs = attempts.reduce((total, attempt) => total + attempt.responseTimeMs, 0);
  const averageResponseTimeMs = attemptsCount === 0 ? 0 : Math.round(totalResponseTimeMs / attemptsCount);
  const mistakeCount = attemptsCount - correctCount;

  return buildLevelAdjustmentRecommendation(
    childProfile,
    attemptsCount,
    correctCount,
    averageResponseTimeMs,
    mistakeCount
  );
}

export function recommendLevelAdjustmentFromMastery({
  childProfile,
  mistakeStats,
  topicMastery
}: RecommendLevelAdjustmentFromMasteryParams): LevelAdjustmentRecommendation {
  const currentLevelMastery = topicMastery.filter((mastery) => mastery.levelId === childProfile.currentLevelId);
  const relevantMastery = currentLevelMastery.length > 0 ? currentLevelMastery : topicMastery;
  const attemptsCount = relevantMastery.reduce((total, mastery) => total + mastery.attemptsCount, 0);
  const correctCount = Math.round(
    relevantMastery.reduce((total, mastery) => total + mastery.accuracy * mastery.attemptsCount, 0)
  );
  const totalResponseTimeMs = relevantMastery.reduce(
    (total, mastery) => total + mastery.averageResponseTimeMs * mastery.attemptsCount,
    0
  );
  const averageResponseTimeMs = attemptsCount === 0 ? 0 : Math.round(totalResponseTimeMs / attemptsCount);
  const relevantLevelIds = new Set(relevantMastery.map((mastery) => mastery.levelId));
  const mistakeCount = mistakeStats
    .filter((stats) => relevantLevelIds.has(stats.levelId))
    .reduce((total, stats) => total + stats.wrongCount, 0);

  return buildLevelAdjustmentRecommendation(
    childProfile,
    attemptsCount,
    correctCount,
    averageResponseTimeMs,
    mistakeCount
  );
}
