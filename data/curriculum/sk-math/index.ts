import type {
  CurriculumAssessmentBlueprintStatus,
  CurriculumAreaId,
  CurriculumBlueprintReadinessGateStatus,
  CurriculumBlueprintReviewStatus,
  CurriculumCycleId,
  CurriculumLessonBlueprintStatus,
  CurriculumModuleOfficialMappingStatus,
  CurriculumModuleVerificationDecisionStatus,
  CurriculumModuleStatus,
  CurriculumOfficialComponentId,
  CurriculumPublicClaimRiskLevel,
  CurriculumReviewChecklistStatus,
  CurriculumReviewStatus,
  CurriculumVerificationRisk,
  GradeId,
  LearningPathwayId
} from "@/types";
import { SK_MATH_ASSESSMENT_BLUEPRINTS } from "./assessment-blueprints";
import { SK_MATH_BLUEPRINT_READINESS_GATES } from "./blueprint-readiness-gates";
import { SK_MATH_BLUEPRINT_REVIEW_EVIDENCE } from "./blueprint-review-evidence";
import { SK_MATH_CURRICULUM_AREAS } from "./areas";
import { SK_MATH_CURRICULUM_CYCLES } from "./cycles";
import { SK_MATH_LESSON_BLUEPRINTS } from "./lesson-blueprints";
import { SK_MATH_MODULE_OFFICIAL_MAPPINGS } from "./module-official-mapping";
import { SK_MATH_MODULE_VERIFICATION_DECISIONS } from "./module-verification-decisions";
import { SK_MATH_CURRICULUM_MODULES } from "./modules";
import { SK_MATH_OFFICIAL_CYCLE_1_OUTLINE } from "./official-cycle-1-outline";
import { SK_MATH_PUBLIC_WORDING_GUARDRAILS } from "./public-wording-guardrails";
import { SK_MATH_REVIEW_CHECKLIST } from "./review-checklist";
import { SK_MATH_REVIEW_EVIDENCE } from "./review-evidence";
import { SK_MATH_CYCLE_1_VERIFICATION_MATRIX } from "./verification-matrix";

export { SK_MATH_CURRICULUM_AREAS } from "./areas";
export { SK_MATH_CURRICULUM_CYCLES } from "./cycles";
export { SK_MATH_CURRICULUM_MODULES } from "./modules";
export { SK_MATH_ASSESSMENT_BLUEPRINTS } from "./assessment-blueprints";
export { SK_MATH_BLUEPRINT_READINESS_GATES } from "./blueprint-readiness-gates";
export { SK_MATH_BLUEPRINT_REVIEW_EVIDENCE } from "./blueprint-review-evidence";
export { SK_MATH_LESSON_BLUEPRINTS } from "./lesson-blueprints";
export { SK_MATH_MODULE_OFFICIAL_MAPPINGS } from "./module-official-mapping";
export { SK_MATH_MODULE_VERIFICATION_DECISIONS } from "./module-verification-decisions";
export { SK_MATH_OFFICIAL_SOURCES } from "./sources";
export { SK_MATH_OFFICIAL_CYCLE_1_OUTLINE } from "./official-cycle-1-outline";
export { SK_MATH_PUBLIC_WORDING_GUARDRAILS } from "./public-wording-guardrails";
export { SK_MATH_REVIEW_CHECKLIST } from "./review-checklist";
export { SK_MATH_REVIEW_EVIDENCE } from "./review-evidence";
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

export function getReviewEvidenceByModule(moduleId: string) {
  return SK_MATH_REVIEW_EVIDENCE.filter((evidence) => evidence.moduleId === moduleId);
}

export function getReviewEvidenceByStatus(status: CurriculumReviewStatus) {
  return SK_MATH_REVIEW_EVIDENCE.filter((evidence) => evidence.reviewStatus === status);
}

export function getReviewEvidenceByOutlineSection(officialOutlineSectionId: string) {
  return SK_MATH_REVIEW_EVIDENCE.filter(
    (evidence) => evidence.officialOutlineSectionId === officialOutlineSectionId
  );
}

export function getReviewChecklistByEvidence(reviewEvidenceId: string) {
  return SK_MATH_REVIEW_CHECKLIST.filter((item) => item.reviewEvidenceId === reviewEvidenceId);
}

export function getReviewChecklistByStatus(status: CurriculumReviewChecklistStatus) {
  return SK_MATH_REVIEW_CHECKLIST.filter((item) => item.status === status);
}

export function getModuleVerificationDecisionsByModule(moduleId: string) {
  return SK_MATH_MODULE_VERIFICATION_DECISIONS.filter((decision) => decision.moduleId === moduleId);
}

export function getModuleVerificationDecisionsByStatus(status: CurriculumModuleVerificationDecisionStatus) {
  return SK_MATH_MODULE_VERIFICATION_DECISIONS.filter((decision) => decision.decisionStatus === status);
}

export function getPublicWordingGuardrailsByRisk(riskLevel: CurriculumPublicClaimRiskLevel) {
  return SK_MATH_PUBLIC_WORDING_GUARDRAILS.filter((guardrail) => guardrail.riskLevel === riskLevel);
}

export function getLessonBlueprintsByModule(moduleId: string) {
  return SK_MATH_LESSON_BLUEPRINTS.filter((blueprint) => blueprint.moduleId === moduleId);
}

export function getLessonBlueprintsByStatus(status: CurriculumLessonBlueprintStatus) {
  return SK_MATH_LESSON_BLUEPRINTS.filter((blueprint) => blueprint.status === status);
}

export function getAssessmentBlueprintsByModule(moduleId: string) {
  return SK_MATH_ASSESSMENT_BLUEPRINTS.filter((blueprint) => blueprint.moduleId === moduleId);
}

export function getAssessmentBlueprintsByStatus(status: CurriculumAssessmentBlueprintStatus) {
  return SK_MATH_ASSESSMENT_BLUEPRINTS.filter((blueprint) => blueprint.status === status);
}

export function getBlueprintReviewEvidenceByBlueprint(blueprintId: string) {
  return SK_MATH_BLUEPRINT_REVIEW_EVIDENCE.filter((evidence) => evidence.blueprintId === blueprintId);
}

export function getBlueprintReviewEvidenceByModule(moduleId: string) {
  return SK_MATH_BLUEPRINT_REVIEW_EVIDENCE.filter((evidence) => evidence.moduleId === moduleId);
}

export function getBlueprintReviewEvidenceByStatus(status: CurriculumBlueprintReviewStatus) {
  return SK_MATH_BLUEPRINT_REVIEW_EVIDENCE.filter((evidence) => evidence.reviewStatus === status);
}

export function getBlueprintReadinessGatesByBlueprint(blueprintId: string) {
  return SK_MATH_BLUEPRINT_READINESS_GATES.filter((gate) => gate.blueprintId === blueprintId);
}

export function getBlueprintReadinessGatesByModule(moduleId: string) {
  return SK_MATH_BLUEPRINT_READINESS_GATES.filter((gate) => gate.moduleId === moduleId);
}

export function getBlueprintReadinessGatesByStatus(status: CurriculumBlueprintReadinessGateStatus) {
  return SK_MATH_BLUEPRINT_READINESS_GATES.filter((gate) => gate.gateStatus === status);
}

export function getCurriculumVerificationSummary() {
  const cycleOneModules = SK_MATH_CURRICULUM_MODULES.filter((module) => module.cycleId === "cycle_1");
  const modulesWithRecordedEvidence = new Set(
    SK_MATH_REVIEW_EVIDENCE.filter((evidence) => evidence.reviewStatus === "evidence_recorded").map(
      (evidence) => evidence.moduleId
    )
  );

  return {
    totalCycleOneModules: cycleOneModules.length,
    modulesWithRecordedEvidence: modulesWithRecordedEvidence.size,
    confirmedMappings: SK_MATH_MODULE_OFFICIAL_MAPPINGS.filter((mapping) => mapping.status === "confirmed").length,
    verifiedModules: cycleOneModules.filter((module) => module.verificationStatus === "verified").length,
    modulesNeedingLessonContent: SK_MATH_MODULE_VERIFICATION_DECISIONS.filter(
      (decision) => decision.decisionStatus === "needs_lesson_content"
    ).length,
    blockedPublicClaimsCount: SK_MATH_PUBLIC_WORDING_GUARDRAILS.filter(
      (guardrail) => guardrail.riskLevel === "blocked"
    ).length,
    cautionPublicClaimsCount: SK_MATH_PUBLIC_WORDING_GUARDRAILS.filter(
      (guardrail) => guardrail.riskLevel === "caution"
    ).length,
    lessonBlueprintsDraft: SK_MATH_LESSON_BLUEPRINTS.filter((blueprint) => blueprint.status === "draft").length,
    assessmentBlueprintsDraft: SK_MATH_ASSESSMENT_BLUEPRINTS.filter((blueprint) => blueprint.status === "draft").length,
    blueprintReviewsNeedingEvidence: SK_MATH_BLUEPRINT_REVIEW_EVIDENCE.filter(
      (evidence) => evidence.reviewStatus === "evidence_needed"
    ).length,
    blueprintReadinessBlocked: SK_MATH_BLUEPRINT_READINESS_GATES.filter((gate) => gate.gateStatus === "blocked").length
  };
}

export function getUnverifiedCurriculumModules() {
  return SK_MATH_CURRICULUM_MODULES.filter((module) => module.verificationStatus !== "verified");
}
