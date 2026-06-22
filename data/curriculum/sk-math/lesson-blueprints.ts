import type { CurriculumLessonBlueprint } from "@/types";

export const SK_MATH_LESSON_BLUEPRINTS: CurriculumLessonBlueprint[] = [
  {
    id: "lesson_blueprint_quantity_and_number_sense_intro",
    moduleId: "quantity_and_number_sense",
    status: "draft",
    title: "Množstvo a porozumenie číslam - úvodný vizuálny blueprint",
    learningGoal:
      "Child recognizes that numbers can represent quantity, order, and position on a number line, and can compare small quantities using visual representations.",
    prerequisites: [
      "Basic counting experience",
      "Ability to recognize small groups of objects",
      "Ability to follow simple visual prompts"
    ],
    steps: [
      {
        id: "qns_visual_intro_quantity",
        stepType: "visual_intro",
        title: "Number as quantity",
        intent: "Introduce number as the amount of objects in a set.",
        childFacingPromptDraft: "Pozri sa na skupinu bodiek. Koľko ich vidíš?",
        teacherOrParentNote: "Use concrete or visual groups before symbolic numbers.",
        linkedSkillTags: ["quantity", "number_meaning", "visual_representation"],
        verificationNote:
          "Supported by evidence around number as quantity and work with sets, but lesson wording still needs manual review."
      },
      {
        id: "qns_guided_compare",
        stepType: "guided_practice",
        title: "Compare two quantities",
        intent: "Guide the child to compare which group has more, fewer, or the same amount.",
        childFacingPromptDraft: "Kde je viac? Kde je menej? Sú skupiny rovnaké?",
        teacherOrParentNote: "Avoid speed pressure. Focus on reasoning and explanation.",
        linkedSkillTags: ["comparison", "more_less_equal", "quantity"],
        verificationNote:
          "Supported by evidence around comparison and ordering of natural numbers, but examples still need review."
      },
      {
        id: "qns_number_line_position",
        stepType: "guided_practice",
        title: "Number on a number line",
        intent: "Connect quantity and number order to position on a number line.",
        childFacingPromptDraft: "Nájdi číslo na číselnej osi. Čo je hneď pred ním a čo hneď za ním?",
        teacherOrParentNote: "Use number line as an ordering representation, not as a timed drill.",
        linkedSkillTags: ["number_line", "ordering", "predecessor_successor"],
        verificationNote:
          "Supported by evidence around number line and predecessor/successor, but child prompts still need review."
      },
      {
        id: "qns_reflection_language",
        stepType: "reflection",
        title: "Explain the number",
        intent: "Encourage the child to explain a number using quantity, order, or comparison language.",
        childFacingPromptDraft: "Povedz vlastnými slovami, čo toto číslo znamená.",
        teacherOrParentNote: "Encourage mathematical language without penalizing informal wording.",
        linkedSkillTags: ["math_language", "number_meaning", "explanation"],
        verificationNote: "Supported by general mathematical language goals, but final wording needs review."
      },
      {
        id: "qns_visual_arithmetic_remediation",
        stepType: "remediation_link",
        title: "Visual Arithmetic support",
        intent: "Link to Visual Arithmetic if the child struggles with quantity recognition or comparison.",
        childFacingPromptDraft: "",
        teacherOrParentNote: "This is a product remediation decision, not an official curriculum requirement.",
        linkedSkillTags: ["visual_arithmetic", "remediation", "quantity"],
        verificationNote: "Not an official curriculum requirement. Keep wording internal/product-only."
      }
    ],
    sourceEvidenceIds: ["review_quantity_and_number_sense_cycle_1_numbers_operations"],
    verificationDecisionIds: ["decision_quantity_and_number_sense_scope"],
    publicReleaseNote:
      "Draft blueprint only. Not child-facing and not verified until lesson and assessment content are manually reviewed."
  }
];
