import { normalizeLevelId } from "@/data/levels";
import type { LevelId, Locale } from "@/types";

const levelDisplayNames: Record<Locale, Record<LevelId, string>> = {
  sk: {
    L0_DIAGNOSTIC: "Diagnostika",
    L1_FACTS_TO_10: "Level 1 - sčítanie a odčítanie do 10",
    L2_BRIDGE_TO_10: "Level 2 - prechod cez 10",
    L3_FACTS_TO_20: "Level 3 - sčítanie a odčítanie do 20",
    L4_TENS_TO_100: "Level 4 - desiatky do 100",
    L5_TWO_DIGIT_NO_REGROUP: "Level 5 - dvojciferné bez prechodu",
    L6_TWO_DIGIT_WITH_REGROUP: "Level 6 - dvojciferné s prechodom",
    L7_THREE_DIGIT_STRATEGIES: "Level 7 - trojciferné stratégie",
    L8_MIXED_FLUENCY: "Level 8 - rýchly mix",
    L1_QUANTITY_TO_5: "Level 1 - sčítanie a odčítanie do 10",
    L2_ADDITION_TO_5: "Level 1 - sčítanie a odčítanie do 10",
    L3_QUANTITY_TO_10: "Level 1 - sčítanie a odčítanie do 10",
    L4_MAKE_10: "Level 2 - prechod cez 10",
    L5_ADDITION_TO_10: "Level 1 - sčítanie a odčítanie do 10",
    L6_AUTOMATION_TO_10: "Level 1 - sčítanie a odčítanie do 10",
    L7_ADDITION_TO_20: "Level 3 - sčítanie a odčítanie do 20"
  },
  en: {
    L0_DIAGNOSTIC: "Diagnostic",
    L1_FACTS_TO_10: "Level 1 - addition and subtraction to 10",
    L2_BRIDGE_TO_10: "Level 2 - bridge through 10",
    L3_FACTS_TO_20: "Level 3 - addition and subtraction to 20",
    L4_TENS_TO_100: "Level 4 - tens to 100",
    L5_TWO_DIGIT_NO_REGROUP: "Level 5 - two-digit without regrouping",
    L6_TWO_DIGIT_WITH_REGROUP: "Level 6 - two-digit with regrouping",
    L7_THREE_DIGIT_STRATEGIES: "Level 7 - three-digit strategies",
    L8_MIXED_FLUENCY: "Level 8 - mixed fluency",
    L1_QUANTITY_TO_5: "Level 1 - addition and subtraction to 10",
    L2_ADDITION_TO_5: "Level 1 - addition and subtraction to 10",
    L3_QUANTITY_TO_10: "Level 1 - addition and subtraction to 10",
    L4_MAKE_10: "Level 2 - bridge through 10",
    L5_ADDITION_TO_10: "Level 1 - addition and subtraction to 10",
    L6_AUTOMATION_TO_10: "Level 1 - addition and subtraction to 10",
    L7_ADDITION_TO_20: "Level 3 - addition and subtraction to 20"
  }
};

export function getLevelDisplayName(levelId: string, locale: Locale): string {
  const normalizedLevelId = normalizeLevelId(levelId);

  return levelDisplayNames[locale][normalizedLevelId] ?? levelDisplayNames[locale][levelId as LevelId] ?? levelId;
}
