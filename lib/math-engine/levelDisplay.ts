import type { LevelId, Locale } from "@/types";

const levelDisplayNames: Record<Locale, Record<LevelId, string>> = {
  sk: {
    L0_DIAGNOSTIC: "Diagnostika",
    L1_QUANTITY_TO_5: "Level 1 - množstvá do 5",
    L2_ADDITION_TO_5: "Level 2 - spočítavanie do 5",
    L3_QUANTITY_TO_10: "Level 3 - množstvá do 10",
    L4_MAKE_10: "Level 4 - dopĺňanie do 10",
    L5_ADDITION_TO_10: "Level 5 - spočítavanie do 10",
    L6_AUTOMATION_TO_10: "Level 6 - automatizácia do 10",
    L7_ADDITION_TO_20: "Level 7 - spočítavanie do 20"
  },
  en: {
    L0_DIAGNOSTIC: "Diagnostic",
    L1_QUANTITY_TO_5: "Level 1 - quantities to 5",
    L2_ADDITION_TO_5: "Level 2 - addition to 5",
    L3_QUANTITY_TO_10: "Level 3 - quantities to 10",
    L4_MAKE_10: "Level 4 - make 10",
    L5_ADDITION_TO_10: "Level 5 - addition to 10",
    L6_AUTOMATION_TO_10: "Level 6 - automation to 10",
    L7_ADDITION_TO_20: "Level 7 - addition to 20"
  }
};

export function getLevelDisplayName(levelId: string, locale: Locale): string {
  return levelDisplayNames[locale][levelId as LevelId] ?? levelId;
}
