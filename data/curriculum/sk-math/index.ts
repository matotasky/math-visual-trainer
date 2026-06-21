import type {
  CurriculumAreaId,
  CurriculumCycleId,
  CurriculumModuleOfficialMappingStatus,
  CurriculumModuleStatus,
  CurriculumOfficialComponentId,
  CurriculumVerificationRisk,
  GradeId,
  LearningPathwayId
} from "@/types";
import { SK_MATH_CURRICULUM_AREAS } from "./areas";
import { SK_MATH_CURRICULUM_CYCLES } from "./cycles";
import { SK_MATH_MODULE_OFFICIAL_MAPPINGS } from "./module-official-mapping";
import { SK_MATH_CURRICULUM_MODULES } from "./modules";
import { SK_MATH_OFFICIAL_CYCLE_1_OUTLINE } from "./official-cycle-1-outline";
import { SK_MATH_CYCLE_1_VERIFICATION_MATRIX } from "./verification-matrix";

export { SK_MATH_CURRICULUM_AREAS } from "./areas";
export { SK_MATH_CURRICULUM_CYCLES } from "./cycles";
export { SK_MATH_CURRICULUM_MODULES } from "./modules";
export { SK_MATH_MODULE_OFFICIAL_MAPPINGS } from "./module-official-mapping";
export { SK_MATH_OFFICIAL_SOURCES } from "./sources";
export { SK_MATH_OFFICIAL_CYCLE_1_OUTLINE } from "./official-cycle-1-outline";
export { SK_MATH_CYCLE_1_VERIFICATION_MATRIX } from "./verification-matrix";

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

export function getVerificationRowsByModule(moduleId: string) {
  return SK_MATH_CYCLE_1_VERIFICATION_MATRIX.filter((row) => row.moduleId === moduleId);
}

export function getVerificationRowsByRisk(risk: CurriculumVerificationRisk) {
  return SK_MATH_CYCLE_1_VERIFICATION_MATRIX.filter((row) => row.publicClaimRisk === risk);
}

export function getOfficialCycleOutline(cycleId: CurriculumCycleId) {
  return SK_MATH_OFFICIAL_CYCLE_1_OUTLINE.filter((section) => section.cycleId === cycleId);
}

export function getOfficialOutlineSectionsByComponent(officialComponentId: CurriculumOfficialComponentId) {
  return SK_MATH_OFFICIAL_CYCLE_1_OUTLINE.filter((section) => section.officialComponentId === officialComponentId);
}

export function getOfficialMappingsByModule(moduleId: string) {
  return SK_MATH_MODULE_OFFICIAL_MAPPINGS.filter((mapping) => mapping.moduleId === moduleId);
}

export function getOfficialMappingsByOutlineSection(officialOutlineSectionId: string) {
  return SK_MATH_MODULE_OFFICIAL_MAPPINGS.filter(
    (mapping) => mapping.officialOutlineSectionId === officialOutlineSectionId
  );
}

export function getOfficialMappingsByStatus(status: CurriculumModuleOfficialMappingStatus) {
  return SK_MATH_MODULE_OFFICIAL_MAPPINGS.filter((mapping) => mapping.status === status);
}

export function getUnverifiedCurriculumModules() {
  return SK_MATH_CURRICULUM_MODULES.filter((module) => module.verificationStatus !== "verified");
}
