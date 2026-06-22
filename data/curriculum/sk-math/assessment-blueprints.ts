import type { CurriculumAssessmentBlueprint } from "@/types";

export const SK_MATH_ASSESSMENT_BLUEPRINTS: CurriculumAssessmentBlueprint[] = [
  {
    id: "assessment_blueprint_quantity_and_number_sense_intro",
    moduleId: "quantity_and_number_sense",
    status: "draft",
    title: "Množstvo a porozumenie číslam - assessment blueprint",
    purpose:
      "Check whether the child understands number as quantity, comparison, ordering, and basic number line position without speed pressure.",
    items: [
      {
        id: "qns_item_quantity",
        intent: "concept_check",
        promptDraft: "Ukáž číslo, ktoré hovorí, koľko bodiek je v skupine.",
        expectedUnderstanding: "The child connects a number symbol with the amount of objects.",
        commonMistakes: ["Counts objects twice", "Chooses based on visual size instead of quantity"],
        verificationNote: "Based on number as quantity evidence; item wording still needs review."
      },
      {
        id: "qns_item_compare",
        intent: "comparison_check",
        promptDraft: "Vyber skupinu, kde je viac.",
        expectedUnderstanding: "The child compares two quantities and identifies more/fewer/same.",
        commonMistakes: ["Chooses the physically larger group", "Ignores one-to-one correspondence"],
        verificationNote: "Based on comparison evidence; examples still need review."
      },
      {
        id: "qns_item_order",
        intent: "ordering_check",
        promptDraft: "Usporiadaj čísla od najmenšieho po najväčšie.",
        expectedUnderstanding: "The child understands increasing order of natural numbers.",
        commonMistakes: ["Orders digits visually instead of by value", "Reverses ascending and descending order"],
        verificationNote: "Based on ordering evidence; numeric ranges still need review."
      },
      {
        id: "qns_item_number_line",
        intent: "representation_check",
        promptDraft: "Nájdi číslo na číselnej osi.",
        expectedUnderstanding: "The child uses number line position as a representation of order.",
        commonMistakes: ["Counts intervals incorrectly", "Treats number line marks as objects instead of positions"],
        verificationNote: "Based on number line evidence; final item design still needs review."
      },
      {
        id: "qns_item_misconception",
        intent: "misconception_probe",
        promptDraft: "Dve skupiny vyzerajú rôzne. Majú rovnaký počet?",
        expectedUnderstanding: "The child can separate quantity from layout or spacing.",
        commonMistakes: ["Thinks spread-out objects mean more", "Does not check one-to-one correspondence"],
        verificationNote: "Product misconception probe. Needs manual review before use."
      }
    ],
    sourceEvidenceIds: ["review_quantity_and_number_sense_cycle_1_numbers_operations"],
    verificationDecisionIds: ["decision_quantity_and_number_sense_scope"],
    publicReleaseNote:
      "Draft assessment blueprint only. Not connected to diagnostic scoring and not verified until assessment content is manually reviewed."
  }
];
