import type { CurriculumBlueprintReadinessGate } from "@/types";

export const SK_MATH_BLUEPRINT_READINESS_GATES: CurriculumBlueprintReadinessGate[] = [
  {
    id: "gate_lesson_blueprint_quantity_and_number_sense_intro",
    blueprintId: "lesson_blueprint_quantity_and_number_sense_intro",
    blueprintType: "lesson",
    moduleId: "quantity_and_number_sense",
    gateStatus: "blocked",
    blockingReasons: [
      "Lesson blueprint review evidence is not recorded.",
      "Final child-facing lesson examples are not defined.",
      "Lesson wording has not been manually reviewed against the official mathematics PDF."
    ],
    requiredActions: [
      "Record lesson blueprint review evidence.",
      "Finalize draft lesson examples.",
      "Manually review child-facing wording.",
      "Confirm remediation wording is product-only."
    ],
    releaseNote: "Blocked from child preview until lesson content review evidence is recorded."
  },
  {
    id: "gate_assessment_blueprint_quantity_and_number_sense_intro",
    blueprintId: "assessment_blueprint_quantity_and_number_sense_intro",
    blueprintType: "assessment",
    moduleId: "quantity_and_number_sense",
    gateStatus: "blocked",
    blockingReasons: [
      "Assessment blueprint review evidence is not recorded.",
      "Assessment scoring logic is not defined.",
      "Misconception probes have not been reviewed.",
      "Items are not connected to diagnostic scoring and should remain disconnected."
    ],
    requiredActions: [
      "Record assessment blueprint review evidence.",
      "Define scoring or interpretation criteria separately.",
      "Review misconception probe wording.",
      "Only connect to diagnostics after a later explicit implementation step."
    ],
    releaseNote:
      "Blocked from diagnostic or child preview use until assessment content is reviewed and scoring is explicitly designed."
  }
];
