import {
  curriculumAreaCopy,
  curriculumCycleDescriptions,
  curriculumCycleLabels,
  curriculumGradeLabels,
  curriculumModuleTextSk,
  curriculumPreviewLessonByModuleId,
  curriculumRemediationLabels,
  curriculumStatusLabelCopy
} from "@/data/curriculum/sk-math/page-copy";
import type {
  CurriculumAreaId,
  CurriculumCycleId,
  CurriculumModule,
  CurriculumModuleStatus,
  GradeId,
  LearningPathwayId,
  Locale
} from "@/types";

export function getCurriculumStatusLabel(status: CurriculumModuleStatus, locale: Locale): string {
  return curriculumStatusLabelCopy[locale][status];
}

export function getLocalizedCurriculumArea(areaId: CurriculumAreaId, locale: Locale) {
  return curriculumAreaCopy[locale][areaId];
}

export function getLocalizedCycleLabel(cycleId: CurriculumCycleId, locale: Locale) {
  return curriculumCycleLabels[locale][cycleId];
}

export function getLocalizedCycleDescription(cycleId: CurriculumCycleId, locale: Locale): string {
  return curriculumCycleDescriptions[locale][cycleId];
}

export function getLocalizedGradeLabel(gradeId: GradeId, locale: Locale): string {
  return curriculumGradeLabels[locale][gradeId];
}

export function getLocalizedCurriculumModuleText(module: CurriculumModule, locale: Locale) {
  return locale === "sk" ? (curriculumModuleTextSk[module.id] ?? module) : module;
}

export function getCurriculumPreviewLesson(moduleId: string) {
  return curriculumPreviewLessonByModuleId[moduleId];
}

export function getCurriculumRemediationLabel(pathwayId: string, locale: Locale): string {
  return curriculumRemediationLabels[locale][pathwayId as LearningPathwayId] ?? pathwayId;
}
