import { LEVELS } from "@/data/levels";
import type { ChildProfile, MistakeStats, RecommendedActivity, TopicMastery } from "@/types";

export function recommendNextActivity(
  childProfile: ChildProfile,
  topicMastery: TopicMastery[],
  mistakeStats: MistakeStats[]
): RecommendedActivity {
  const weakMistake = [...mistakeStats].sort((a, b) => b.wrongCount - a.wrongCount)[0];

  if (weakMistake) {
    return {
      mode: "learn",
      topic: weakMistake.topic,
      levelId: childProfile.currentLevelId,
      reason: "Repeated mistakes suggest a visual strategy review."
    };
  }

  const weakestTopic = [...topicMastery].sort((a, b) => a.masteryScore - b.masteryScore)[0];

  if (weakestTopic) {
    return {
      mode: "practice",
      topic: weakestTopic.topic,
      levelId: childProfile.currentLevelId,
      reason: "This topic has the lowest current mastery score."
    };
  }

  const currentLevel = LEVELS.find((level) => level.id === childProfile.currentLevelId) ?? LEVELS[0];

  return {
    mode: childProfile.diagnosticCompletedAt ? "practice" : "diagnostic",
    topic: currentLevel.topics[0],
    levelId: currentLevel.id,
    reason: "Start with the next appropriate activity for the current level."
  };
}

export function getAvailableLevels(childProfile: ChildProfile, topicMastery: TopicMastery[]) {
  const currentIndex = LEVELS.findIndex((level) => level.id === childProfile.currentLevelId);

  return LEVELS.filter((level, index) => {
    if (index <= currentIndex) {
      return true;
    }

    const prerequisite = level.unlocksAfter;
    const prerequisiteMastery = topicMastery.find((mastery) => mastery.levelId === prerequisite);

    return Boolean(prerequisiteMastery && prerequisiteMastery.masteryScore >= 0.82);
  });
}
