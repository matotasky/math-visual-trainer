import type { CurriculumReviewChecklistItem } from "@/types";

const reviewEvidenceId = "review_quantity_and_number_sense_cycle_1_numbers_operations";

export const SK_MATH_REVIEW_CHECKLIST: CurriculumReviewChecklistItem[] = [
  {
    id: "qns_scope_number_concept",
    reviewEvidenceId,
    label: "Number concept scope",
    description:
      "Check whether the official Cycle 1 numbers and operations component includes early number meaning, natural numbers or quantity understanding relevant to this product module.",
    status: "open",
    sourceReference: "",
    reviewerNote: ""
  },
  {
    id: "qns_quantity_comparison",
    reviewEvidenceId,
    label: "Quantity and comparison",
    description:
      "Check whether official wording supports quantity comparison, ordering, or number comparison as part of Cycle 1 expectations.",
    status: "open",
    sourceReference: "",
    reviewerNote: ""
  },
  {
    id: "qns_grade_navigation",
    reviewEvidenceId,
    label: "Grade navigation wording",
    description:
      "Check that recommended grades in the product are presented only as parent-friendly navigation and not as official grade-level claims.",
    status: "open",
    sourceReference: "",
    reviewerNote: ""
  },
  {
    id: "qns_visual_remediation",
    reviewEvidenceId,
    label: "Visual remediation connection",
    description:
      "Check whether linking this module to Visual Arithmetic is a product remediation decision rather than an official curriculum claim.",
    status: "open",
    sourceReference: "",
    reviewerNote: ""
  }
];
