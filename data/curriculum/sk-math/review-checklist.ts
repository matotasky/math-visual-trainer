import type { CurriculumReviewChecklistItem } from "@/types";

const reviewEvidenceId = "review_quantity_and_number_sense_cycle_1_numbers_operations";

export const SK_MATH_REVIEW_CHECKLIST: CurriculumReviewChecklistItem[] = [
  {
    id: "qns_scope_number_concept",
    reviewEvidenceId,
    label: "Number concept scope",
    description:
      "Check whether the official Cycle 1 numbers and operations component includes early number meaning, natural numbers or quantity understanding relevant to this product module.",
    status: "checked",
    sourceReference: "",
    sourcePageHint: "JSON pageNumber 9-11 / PDF footer pages 8-10.",
    officialWordingReference:
      "The official standard includes number concepts and natural number work in Cycle 1 under Čísla a operácie s číslami.",
    decisionRecommendation: "ready_to_confirm",
    reviewerNote: "Relevant official scope found for early number meaning and natural number concepts."
  },
  {
    id: "qns_quantity_comparison",
    reviewEvidenceId,
    label: "Quantity and comparison",
    description:
      "Check whether official wording supports quantity comparison, ordering, or number comparison as part of Cycle 1 expectations.",
    status: "checked",
    sourceReference: "",
    sourcePageHint: "JSON pageNumber 9-10 / PDF footer pages 8-9.",
    officialWordingReference:
      "The official standard includes porovnávanie, väčší, menší, rovný, usporiadanie, and methods of comparing numbers.",
    decisionRecommendation: "ready_to_confirm",
    reviewerNote: "Relevant official wording found for comparison, ordering, and number line work."
  },
  {
    id: "qns_grade_navigation",
    reviewEvidenceId,
    label: "Grade navigation wording",
    description:
      "Check that recommended grades in the product are presented only as parent-friendly navigation and not as official grade-level claims.",
    status: "checked",
    sourceReference: "",
    sourcePageHint: "Product decision; official PDF is cycle-based.",
    officialWordingReference:
      "The official document structures standards by cycle. Product recommended grades should remain navigation hints, not official grade-level claims.",
    decisionRecommendation: "ready_to_confirm",
    reviewerNote: "Keep recommended grades as parent-friendly navigation only."
  },
  {
    id: "qns_visual_remediation",
    reviewEvidenceId,
    label: "Visual remediation connection",
    description:
      "Check whether linking this module to Visual Arithmetic is a product remediation decision rather than an official curriculum claim.",
    status: "not_applicable",
    sourceReference: "",
    sourcePageHint: "Product remediation decision, not an official curriculum claim.",
    officialWordingReference: "",
    decisionRecommendation: "no_decision",
    reviewerNote:
      "Visual Arithmetic linkage is a product remediation pathway. It should not be presented as an official curriculum requirement."
  }
];
