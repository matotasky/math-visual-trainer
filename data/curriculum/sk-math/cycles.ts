import type { CurriculumCycle } from "@/types";

export const SK_MATH_CURRICULUM_CYCLES: CurriculumCycle[] = [
  {
    id: "cycle_1",
    title: "1st cycle",
    description: "Foundation stage for grades 1 to 3.",
    grades: ["grade_1", "grade_2", "grade_3"]
  },
  {
    id: "cycle_2",
    title: "2nd cycle",
    description: "Development stage for grades 4 to 5.",
    grades: ["grade_4", "grade_5"]
  },
  {
    id: "cycle_3",
    title: "3rd cycle",
    description: "Upper primary stage for grades 6 to 9.",
    grades: ["grade_6", "grade_7", "grade_8", "grade_9"]
  }
];
