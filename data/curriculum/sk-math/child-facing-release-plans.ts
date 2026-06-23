import type { CurriculumChildFacingReleasePlan } from "@/types";

export const SK_MATH_CHILD_FACING_RELEASE_PLANS: CurriculumChildFacingReleasePlan[] = [
  {
    id: "release_plan_quantity_and_number_sense_lesson_shell",
    moduleId: "quantity_and_number_sense",
    sourcePreviewId: "internal_preview_quantity_and_number_sense_intro",
    status: "draft_plan",
    plannedRoute: "/child/curriculum/quantity-and-number-sense",
    releaseScope: "lesson_shell_only",
    mustRemainDisabled: true,
    requiredBeforeEnable: [
      "Finalize child-facing Slovak lesson wording.",
      "Create visual examples for quantity, comparison, and number line work.",
      "Keep assessment content out of scoring.",
      "Record blueprint review evidence.",
      "Move readiness gates only after explicit review.",
      "Confirm release copy does not claim verified ŠVP alignment."
    ],
    nonGoals: [
      "Do not connect to diagnostic scoring.",
      "Do not write lesson interactions to Firestore.",
      "Do not update mastery or progression.",
      "Do not mark module as verified.",
      "Do not expose assessment blueprint as a test."
    ],
    releaseNotes:
      "Draft plan only. The planned route must remain disabled until a later explicit child-facing shell implementation block."
  }
];
