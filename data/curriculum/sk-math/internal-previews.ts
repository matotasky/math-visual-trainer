import type { CurriculumInternalPreview } from "@/types";

export const SK_MATH_INTERNAL_PREVIEWS: CurriculumInternalPreview[] = [
  {
    id: "internal_preview_quantity_and_number_sense_intro",
    moduleId: "quantity_and_number_sense",
    title: "Internal preview: Množstvo a porozumenie číslam",
    status: "internal_only",
    sourceLessonBlueprintId: "lesson_blueprint_quantity_and_number_sense_intro",
    sourceAssessmentBlueprintId: "assessment_blueprint_quantity_and_number_sense_intro",
    items: [
      {
        id: "preview_qns_lesson_quantity",
        itemType: "lesson_step_preview",
        sourceBlueprintId: "lesson_blueprint_quantity_and_number_sense_intro",
        sourceItemId: "qns_visual_intro_quantity",
        title: "Number as quantity",
        previewText: "Show a small group of dots and ask the child how many they see.",
        safetyNote: "Preview text paraphrases the draft prompt. Final child-facing wording still needs manual review."
      },
      {
        id: "preview_qns_lesson_compare",
        itemType: "lesson_step_preview",
        sourceBlueprintId: "lesson_blueprint_quantity_and_number_sense_intro",
        sourceItemId: "qns_guided_compare",
        title: "Compare two quantities",
        previewText: "Show two groups and ask which has more, fewer, or the same amount.",
        safetyNote: "Avoid speed pressure. Examples and wording are not finalized."
      },
      {
        id: "preview_qns_lesson_number_line",
        itemType: "lesson_step_preview",
        sourceBlueprintId: "lesson_blueprint_quantity_and_number_sense_intro",
        sourceItemId: "qns_number_line_position",
        title: "Number line position",
        previewText: "Use a simple number line to discuss before, after, and position.",
        safetyNote: "Number ranges and visual design require review before child use."
      },
      {
        id: "preview_qns_assessment_quantity",
        itemType: "assessment_item_preview",
        sourceBlueprintId: "assessment_blueprint_quantity_and_number_sense_intro",
        sourceItemId: "qns_item_quantity",
        title: "Quantity concept check",
        previewText: "Ask the child to match a number with the amount of dots.",
        safetyNote: "Not scored. Not connected to diagnostic logic."
      },
      {
        id: "preview_qns_assessment_misconception",
        itemType: "assessment_item_preview",
        sourceBlueprintId: "assessment_blueprint_quantity_and_number_sense_intro",
        sourceItemId: "qns_item_misconception",
        title: "Layout versus quantity probe",
        previewText: "Show two groups with the same count but different spacing.",
        safetyNote: "Misconception probe is a product hypothesis until reviewed."
      },
      {
        id: "preview_qns_safety",
        itemType: "safety_note",
        sourceBlueprintId: "internal_preview_quantity_and_number_sense_intro",
        sourceItemId: "safety",
        title: "Internal-only safety note",
        previewText: "This preview is for product review only.",
        safetyNote: "Do not link from child routes and do not use for scoring."
      }
    ],
    releaseWarning:
      "Internal preview only. Not child-facing, not scored, not verified, and blocked from release until blueprint review evidence and readiness gates change."
  }
];
