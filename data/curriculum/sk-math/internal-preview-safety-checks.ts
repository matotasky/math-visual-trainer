import type { CurriculumInternalPreviewSafetyCheck } from "@/types";

export const SK_MATH_INTERNAL_PREVIEW_SAFETY_CHECKS: CurriculumInternalPreviewSafetyCheck[] = [
  {
    id: "check_qns_not_child_facing",
    previewId: "internal_preview_quantity_and_number_sense_intro",
    label: "Not child-facing",
    status: "pass",
    finding: "Preview is stored only in curriculum scaffold data and parent/product verification UI.",
    requiredAction: "Keep it out of child routes until explicit release."
  },
  {
    id: "check_qns_not_scored",
    previewId: "internal_preview_quantity_and_number_sense_intro",
    label: "Not scored",
    status: "pass",
    finding: "Assessment preview items are not connected to diagnostic scoring.",
    requiredAction: "Do not connect to diagnostic scoring without a later explicit implementation block."
  },
  {
    id: "check_qns_gate_blocked",
    previewId: "internal_preview_quantity_and_number_sense_intro",
    label: "Readiness gates remain blocked",
    status: "blocked",
    finding: "Lesson and assessment readiness gates are still blocked.",
    requiredAction: "Record blueprint review evidence and update gates only in a later explicit review/release step."
  },
  {
    id: "check_qns_not_verified",
    previewId: "internal_preview_quantity_and_number_sense_intro",
    label: "Not verified",
    status: "blocked",
    finding: "Module remains source_identified and blueprint review evidence is still needed.",
    requiredAction: "Do not claim verification or ŠVP alignment."
  },
  {
    id: "check_qns_wording_review",
    previewId: "internal_preview_quantity_and_number_sense_intro",
    label: "Wording review needed",
    status: "warning",
    finding: "Preview text paraphrases draft prompts and is not final child-facing wording.",
    requiredAction: "Manually review wording against official source evidence before release."
  }
];
