import type { CurriculumInternalPreviewReviewResolution } from "@/types";

export const SK_MATH_INTERNAL_PREVIEW_REVIEW_RESOLUTIONS: CurriculumInternalPreviewReviewResolution[] = [
  {
    id: "resolution_internal_preview_quantity_and_number_sense_intro",
    previewId: "internal_preview_quantity_and_number_sense_intro",
    moduleId: "quantity_and_number_sense",
    status: "issues_recorded",
    acceptedFindings: [
      "Internal preview is useful for product review.",
      "Preview correctly separates lesson-step previews from assessment-item previews.",
      "Preview safety notes clearly state that content is not scored and not child-facing.",
      "The module should not move to verified from preview alone."
    ],
    openIssues: [
      "Final child-facing Slovak wording still needs manual review.",
      "Concrete visual examples are not implemented.",
      "No interaction model exists for the child-facing lesson shell.",
      "Assessment items still lack scoring or interpretation criteria."
    ],
    releaseBlockers: [
      "Readiness gates remain blocked.",
      "Blueprint review evidence is still evidence_needed.",
      "Assessment preview must remain disconnected from diagnostic scoring.",
      "No child-facing release route should be created yet."
    ],
    reviewerDecision:
      "Internal preview can be used for product review and planning, but it remains blocked for child-facing release.",
    reviewedBy: "Martin Tašký",
    reviewedAt: "2026-06-23"
  }
];
