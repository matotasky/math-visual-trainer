import type { CurriculumBlueprintReviewEvidence } from "@/types";

export const SK_MATH_BLUEPRINT_REVIEW_EVIDENCE: CurriculumBlueprintReviewEvidence[] = [
  {
    id: "review_lesson_blueprint_quantity_and_number_sense_intro",
    blueprintId: "lesson_blueprint_quantity_and_number_sense_intro",
    blueprintType: "lesson",
    moduleId: "quantity_and_number_sense",
    reviewStatus: "evidence_needed",
    sourceEvidenceIds: ["review_quantity_and_number_sense_cycle_1_numbers_operations"],
    reviewFocus: [
      "Check whether each lesson step is supported by recorded source evidence.",
      "Check whether child-facing prompt drafts overclaim official curriculum alignment.",
      "Check whether remediation wording stays product-only.",
      "Check whether number line, comparison, quantity, and mathematical language prompts match the official scope."
    ],
    findings: [],
    gaps: [
      "Lesson examples are not finalized.",
      "Exact child-facing wording has not been manually reviewed.",
      "No evidence has been recorded for final lesson content.",
      "Visual Arithmetic remediation wording needs product-only wording review."
    ],
    reviewerNote:
      "Lesson blueprint is a draft planning artifact. It needs manual content review before it can move beyond draft.",
    reviewedBy: "",
    reviewedAt: null
  },
  {
    id: "review_assessment_blueprint_quantity_and_number_sense_intro",
    blueprintId: "assessment_blueprint_quantity_and_number_sense_intro",
    blueprintType: "assessment",
    moduleId: "quantity_and_number_sense",
    reviewStatus: "evidence_needed",
    sourceEvidenceIds: ["review_quantity_and_number_sense_cycle_1_numbers_operations"],
    reviewFocus: [
      "Check whether assessment item intents match recorded module evidence.",
      "Check whether item prompts are age-appropriate and not speed-based.",
      "Check whether misconception probes are treated as product hypotheses until reviewed.",
      "Check whether items remain disconnected from diagnostic scoring until reviewed."
    ],
    findings: [],
    gaps: [
      "Assessment items are draft prompts only.",
      "No final examples, answer logic, or scoring criteria exist.",
      "Misconception probes have not been validated.",
      "Assessment blueprint is not connected to diagnostic scoring."
    ],
    reviewerNote:
      "Assessment blueprint needs manual review before it can influence progression, scoring, or diagnostics.",
    reviewedBy: "",
    reviewedAt: null
  }
];
