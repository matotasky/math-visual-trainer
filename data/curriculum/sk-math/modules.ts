import type { CurriculumModule } from "@/types";

export const SK_MATH_CURRICULUM_MODULES: CurriculumModule[] = [
  {
    id: "quantity_and_number_sense",
    title: "Quantity and number sense",
    description: "Builds early number meaning, quantity recognition, and number comparison.",
    cycleId: "cycle_1",
    recommendedGrades: ["grade_1", "grade_2"],
    areaId: "numbers_operations",
    prerequisites: [],
    visualArithmeticRemediation: ["visual_arithmetic"],
    status: "planned"
  },
  {
    id: "addition_subtraction_to_20",
    title: "Addition and subtraction to 20",
    description: "Introduces basic addition and subtraction within 20 with strategy support.",
    cycleId: "cycle_1",
    recommendedGrades: ["grade_1", "grade_2"],
    areaId: "numbers_operations",
    prerequisites: ["quantity_and_number_sense"],
    visualArithmeticRemediation: ["visual_arithmetic", "arithmetic_fluency"],
    status: "planned"
  },
  {
    id: "make_10_and_bridge_through_10",
    title: "Make 10 and bridge through 10",
    description: "Connects complements to 10 with bridge-through-10 strategies.",
    cycleId: "cycle_1",
    recommendedGrades: ["grade_1", "grade_2", "grade_3"],
    areaId: "numbers_operations",
    prerequisites: ["quantity_and_number_sense"],
    visualArithmeticRemediation: ["visual_arithmetic", "arithmetic_fluency"],
    status: "planned"
  },
  {
    id: "multiplication_as_groups",
    title: "Multiplication as groups",
    description: "Prepares multiplication through repeated groups and visual structure.",
    cycleId: "cycle_1",
    recommendedGrades: ["grade_2", "grade_3"],
    areaId: "numbers_operations",
    prerequisites: ["addition_subtraction_to_20"],
    visualArithmeticRemediation: ["visual_arithmetic"],
    status: "coming_soon"
  },
  {
    id: "basic_data_tables",
    title: "Basic data tables",
    description: "Introduces simple tables and reading small sets of data.",
    cycleId: "cycle_1",
    recommendedGrades: ["grade_2", "grade_3"],
    areaId: "relations_data",
    prerequisites: [],
    visualArithmeticRemediation: [],
    status: "coming_soon"
  },
  {
    id: "shapes_and_measurement_intro",
    title: "Shapes and measurement intro",
    description: "Introduces simple shapes, spatial language, and early measurement ideas.",
    cycleId: "cycle_1",
    recommendedGrades: ["grade_1", "grade_2", "grade_3"],
    areaId: "geometry",
    prerequisites: [],
    visualArithmeticRemediation: [],
    status: "coming_soon"
  }
];
