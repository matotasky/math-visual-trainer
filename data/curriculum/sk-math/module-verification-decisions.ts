import type { CurriculumModuleVerificationDecision } from "@/types";

export const SK_MATH_MODULE_VERIFICATION_DECISIONS: CurriculumModuleVerificationDecision[] = [
  {
    id: "decision_quantity_and_number_sense_scope",
    moduleId: "quantity_and_number_sense",
    decisionStatus: "needs_lesson_content",
    decisionType: "module_scope",
    relatedEvidenceIds: ["review_quantity_and_number_sense_cycle_1_numbers_operations"],
    relatedMappingModuleIds: ["quantity_and_number_sense"],
    requiredBeforeVerified: [
      "Define final lesson content for the module.",
      "Define assessment items or diagnostic checks for the module.",
      "Manually compare lesson and assessment content against the official mathematics PDF.",
      "Record evidence for lesson content, not only module scope.",
      "Confirm that public-facing wording does not claim more than the evidence supports."
    ],
    decisionNotes:
      "Scope mapping is supported by recorded evidence and confirmed mapping, but the module cannot be marked verified until lesson and assessment content are defined and reviewed.",
    decidedBy: "",
    decidedAt: null
  }
];
