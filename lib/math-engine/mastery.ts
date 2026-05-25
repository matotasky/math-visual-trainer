import type { MasteryInput, MasteryResult } from "@/types";

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function calculateMastery(input: MasteryInput): MasteryResult {
  const streakScore = clamp(input.correctStreak / 10, 0, 1);
  const responseScore = input.averageResponseTimeMs <= 0
    ? 0
    : clamp(1 - input.averageResponseTimeMs / 10000, 0, 1);
  const attemptConfidence = clamp(input.attemptsCount / 30, 0, 1);

  const masteryScore = clamp(
    input.accuracy * 0.42
      + input.recentAccuracy * 0.25
      + responseScore * 0.12
      + streakScore * 0.11
      + attemptConfidence * 0.1
      - input.mistakePenalty,
    0,
    1
  );

  const reasons: string[] = [];

  if (input.accuracy < 0.8) {
    reasons.push("Accuracy is below the minimum advancement threshold.");
    return {
      masteryScore,
      status: "not_ready",
      eligibleForNextLevel: false,
      reasons
    };
  }

  if (input.accuracy < 0.9) {
    reasons.push("Accuracy is improving but needs more stable practice.");
    return {
      masteryScore,
      status: "practice",
      eligibleForNextLevel: false,
      reasons
    };
  }

  if (input.averageResponseTimeMs > 7000) {
    reasons.push("Accuracy is strong, but response time suggests more strategy practice.");
    return {
      masteryScore,
      status: "speed_practice",
      eligibleForNextLevel: false,
      reasons
    };
  }

  if (input.attemptsCount < 20) {
    reasons.push("More attempts are needed before unlocking the next level.");
    return {
      masteryScore,
      status: "practice",
      eligibleForNextLevel: false,
      reasons
    };
  }

  reasons.push("Accuracy, response time, and attempt count are stable.");

  return {
    masteryScore,
    status: "eligible_next_level",
    eligibleForNextLevel: masteryScore >= 0.82,
    reasons
  };
}
