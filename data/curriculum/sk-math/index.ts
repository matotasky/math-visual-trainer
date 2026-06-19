import type { CurriculumAreaId, CurriculumCycleId, CurriculumModuleStatus, GradeId, LearningPathwayId } from "@/types";
import { SK_MATH_CURRICULUM_AREAS } from "./areas";
import { SK_MATH_CURRICULUM_CYCLES } from "./cycles";
import { SK_MATH_CURRICULUM_MODULES } from "./modules";

export { SK_MATH_CURRICULUM_AREAS } from "./areas";
export { SK_MATH_CURRICULUM_CYCLES } from "./cycles";
export { SK_MATH_CURRICULUM_MODULES } from "./modules";

export function getCurriculumCycle(id: CurriculumCycleId) {
  const cycle = SK_MATH_CURRICULUM_CYCLES.find((item) => item.id === id);

  if (!cycle) {
    throw new Error(`Unknown curriculum cycle: ${id}`);
  }

  return cycle;
}

export function getCurriculumArea(id: CurriculumAreaId) {
  const area = SK_MATH_CURRICULUM_AREAS.find((item) => item.id === id);

  if (!area) {
    throw new Error(`Unknown curriculum area: ${id}`);
  }

  return area;
}

export function getCurriculumModulesByCycle(cycleId: CurriculumCycleId) {
  return SK_MATH_CURRICULUM_MODULES.filter((module) => module.cycleId === cycleId);
}

export function getCurriculumModulesByGrade(gradeId: GradeId) {
  return SK_MATH_CURRICULUM_MODULES.filter((module) => module.recommendedGrades.includes(gradeId));
}

export function getCurriculumModulesByArea(areaId: CurriculumAreaId) {
  return SK_MATH_CURRICULUM_MODULES.filter((module) => module.areaId === areaId);
}

export function getCurriculumModulesByStatus(status: CurriculumModuleStatus) {
  return SK_MATH_CURRICULUM_MODULES.filter((module) => module.status === status);
}

export function getCurriculumModulesByRemediation(pathwayId: LearningPathwayId) {
  return SK_MATH_CURRICULUM_MODULES.filter((module) => module.visualArithmeticRemediation.includes(pathwayId));
}
