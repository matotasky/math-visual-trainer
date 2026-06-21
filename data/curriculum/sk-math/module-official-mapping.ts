import type { CurriculumModuleOfficialMapping } from "@/types";

const reviewerNote =
  "Candidate mapping only. Requires manual comparison with the official mathematics PDF before confirmation.";

const numbersOperationsRationale =
  "Product module appears to belong under the official numbers and operations component based on its draft scope.";

const relationsDataRationale =
  "Product module appears to belong under the official relations, dependencies and data component based on its draft scope.";

const geometryRationale =
  "Product module appears to belong under the official geometry component based on its draft scope.";

function createCandidateMappings(
  moduleIds: string[],
  officialOutlineSectionId: string,
  rationale: string
): CurriculumModuleOfficialMapping[] {
  return moduleIds.map((moduleId) => ({
    moduleId,
    officialOutlineSectionId,
    status: "candidate",
    rationale,
    evidenceNotes: [],
    reviewerNote
  }));
}

export const SK_MATH_MODULE_OFFICIAL_MAPPINGS: CurriculumModuleOfficialMapping[] = [
  {
    moduleId: "quantity_and_number_sense",
    officialOutlineSectionId: "cycle_1_numbers_operations",
    status: "confirmed",
    rationale: numbersOperationsRationale,
    evidenceNotes: [
      "Evidence recorded in review_quantity_and_number_sense_cycle_1_numbers_operations.",
      "Official PDF JSON references Cycle 1 numbers and operations, natural numbers, comparison, ordering, number as quantity/order, number line, and number representations."
    ],
    reviewerNote:
      "Mapping confirmed based on recorded evidence from the official mathematics PDF JSON. This confirms only that the product module belongs under Cycle 1 numbers and operations; it does not verify the module content."
  },
  ...createCandidateMappings(
    [
      "number_line_and_comparison",
      "addition_subtraction_to_20",
      "make_10_and_bridge_through_10",
      "addition_subtraction_to_100",
      "multiplication_as_groups",
      "division_as_sharing",
      "word_problems_cycle_1",
      "number_patterns_cycle_1"
    ],
    "cycle_1_numbers_operations",
    numbersOperationsRationale
  ),
  ...createCandidateMappings(
    ["basic_data_tables", "patterns_and_sequences_cycle_1", "simple_charts_cycle_1"],
    "cycle_1_relations_data",
    relationsDataRationale
  ),
  ...createCandidateMappings(
    [
      "shapes_and_measurement_intro",
      "plane_shapes_cycle_1",
      "solids_and_spatial_orientation",
      "length_mass_time_money_intro",
      "symmetry_intro"
    ],
    "cycle_1_geometry",
    geometryRationale
  )
];
