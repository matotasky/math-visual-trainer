import type { Locale } from "@/types";

export function getPreviewLearningPathLabels(locale: Locale) {
  if (locale === "sk") {
    return {
      progressLabel: "Lokálny progres",
      clearProgressLabel: "Vymazať lokálny progres",
      completedLabel: "Hotové",
      currentLabel: "Pokračuj",
      readyLabel: "Pripravené",
      previewBadgeLabel: "Ukážka",
      skillsTitle: "Čo už vieš",
      skillsSubtitle: "Podľa ukážkových lekcií dokončených v tomto prehliadači.",
      skillsEmptyMessage: "Dokonči prvú ukážkovú lekciu a tu sa zobrazí, čo si už precvičil/a.",
      skillsLocalOnlyNote: "Toto je iba lokálny prehľad, nie hodnotenie.",
      recommendedTitle: "Odporúčaný ďalší krok",
      recommendedContinuePrefix: "Pokračuj lekciou:",
      recommendedAllDone: "Výborne, dokončil/a si aktuálnu ukážkovú cestu.",
      recommendedRestartLabel: "Zopakovať od začiatku",
      recommendedStartLabel: "Začať",
      recommendedContinueLabel: "Pokračovať",
      recommendedLocalOnlyNote: "Toto odporúčanie vychádza iba z lokálneho progresu v tomto prehliadači.",
      compactListTitle: "Lekcie v tejto ceste",
      compactOpenLabel: "Otvoriť",
      compactReviewLabel: "Zopakovať",
      currentRecommendedLabel: "Odporúčané",
      clearProgressAriaLabel: "Vymazať lokálny progres tejto ukážkovej cesty",
      recommendedOpenAriaPrefix: "Otvoriť odporúčanú lekciu",
      restartAriaLabel: "Zopakovať ukážkovú cestu od začiatku",
      openLessonAriaPrefix: "Otvoriť lekciu",
      zeroProgressNote: "Ešte nič nie je dokončené. Začni prvou odporúčanou lekciou.",
      allCompleteProgressNote: "Výborne, všetky ukážkové lekcie v tejto ceste sú dokončené.",
      clearProgressHelpText: "Vymaže sa iba lokálny prehľad v tomto prehliadači.",
      allCompleteHelperTitle: "Čo ďalej?",
      allCompleteHelperItems: [
        "Zopakuj si cestu od začiatku.",
        "Vyber si lekciu, ktorá bola ťažšia.",
        "Daj si krátku pauzu a vráť sa neskôr."
      ],
      allCompleteHelperNote: "Toto je iba lokálne odporúčanie, nie hodnotenie.",
      progressLocalOnlyNote: "Ukladá sa iba v tomto prehliadači.",
      reviewCompletedLessonLabel: "Zopakovať"
    };
  }

  return {
    progressLabel: "Local progress",
    clearProgressLabel: "Clear local progress",
    completedLabel: "Done",
    currentLabel: "Continue",
    readyLabel: "Ready",
    previewBadgeLabel: "Preview",
    skillsTitle: "What you already know",
    skillsSubtitle: "Based on preview lessons completed in this browser.",
    skillsEmptyMessage: "Complete the first preview lesson and this area will show what you have practiced.",
    skillsLocalOnlyNote: "This is only a local summary, not an assessment.",
    recommendedTitle: "Recommended next step",
    recommendedContinuePrefix: "Continue with:",
    recommendedAllDone: "Great, you completed the current preview path.",
    recommendedRestartLabel: "Start again",
    recommendedStartLabel: "Start",
    recommendedContinueLabel: "Continue",
    recommendedLocalOnlyNote: "This recommendation is based only on local progress in this browser.",
    compactListTitle: "Lessons in this path",
    compactOpenLabel: "Open",
    compactReviewLabel: "Review",
    currentRecommendedLabel: "Recommended",
    clearProgressAriaLabel: "Clear local progress for this preview path",
    recommendedOpenAriaPrefix: "Open recommended lesson",
    restartAriaLabel: "Restart the preview path from the beginning",
    openLessonAriaPrefix: "Open lesson",
    zeroProgressNote: "Nothing is completed yet. Start with the first recommended lesson.",
    allCompleteProgressNote: "Great, all preview lessons in this path are complete.",
    clearProgressHelpText: "Only the local summary in this browser will be cleared.",
    allCompleteHelperTitle: "What next?",
    allCompleteHelperItems: [
      "Review the path from the beginning.",
      "Choose a lesson that felt harder.",
      "Take a short break and come back later."
    ],
    allCompleteHelperNote: "This is only a local suggestion, not an assessment.",
    progressLocalOnlyNote: "Saved only in this browser.",
    reviewCompletedLessonLabel: "Review again"
  };
}
