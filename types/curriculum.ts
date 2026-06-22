export type CurriculumCycleId = "cycle_1" | "cycle_2" | "cycle_3";

export type GradeId =
  | "grade_1"
  | "grade_2"
  | "grade_3"
  | "grade_4"
  | "grade_5"
  | "grade_6"
  | "grade_7"
  | "grade_8"
  | "grade_9";

export type CurriculumAreaId = "numbers_operations" | "relations_data" | "geometry";

export type CurriculumModuleStatus = "planned" | "active" | "coming_soon";

export type CurriculumVerificationStatus = "draft" | "source_identified" | "partially_verified" | "verified";

export type CurriculumVerificationRisk = "low" | "medium" | "high";

export type CurriculumOfficialSource = {
  id: string;
  title: string;
  url: string;
  sourceType: "page" | "pdf" | "portal";
  publisher: string;
  retrievedNote?: string;
};

export type CurriculumOfficialComponentId =
  | "official_numbers_operations"
  | "official_relations_data"
  | "official_geometry";

export type CurriculumOfficialCycleOutlineSection = {
  id: string;
  cycleId: CurriculumCycleId;
  officialComponentId: CurriculumOfficialComponentId;
  title: string;
  sourceId: string;
  pageRangeNote: string;
  summaryNote: string;
  mappingStatus: "not_mapped" | "partially_mapped" | "mapped";
};

export type CurriculumModuleOfficialMappingStatus = "candidate" | "needs_review" | "confirmed" | "rejected";

export type CurriculumModuleOfficialMapping = {
  moduleId: string;
  officialOutlineSectionId: string;
  status: CurriculumModuleOfficialMappingStatus;
  rationale: string;
  evidenceNotes: string[];
  reviewerNote: string;
};

export type CurriculumModuleVerificationDecisionStatus =
  | "not_started"
  | "needs_lesson_content"
  | "ready_for_review"
  | "approved_for_partial_verification"
  | "approved_for_verification"
  | "rejected";

export type CurriculumModuleVerificationDecision = {
  id: string;
  moduleId: string;
  decisionStatus: CurriculumModuleVerificationDecisionStatus;
  decisionType: "module_scope" | "lesson_content" | "assessment_content" | "full_module";
  relatedEvidenceIds: string[];
  relatedMappingModuleIds: string[];
  requiredBeforeVerified: string[];
  decisionNotes: string;
  decidedBy: string;
  decidedAt: string | null;
};

export type CurriculumPublicClaimRiskLevel = "safe" | "caution" | "blocked";

export type CurriculumPublicWordingGuardrail = {
  id: string;
  label: string;
  riskLevel: CurriculumPublicClaimRiskLevel;
  allowedWording: string[];
  blockedWording: string[];
  rationale: string;
};

export type CurriculumLessonBlueprintStatus = "draft" | "needs_review" | "reviewed" | "ready_for_child_preview";

export type CurriculumLessonBlueprintStepType =
  | "visual_intro"
  | "guided_practice"
  | "independent_practice"
  | "reflection"
  | "remediation_link";

export type CurriculumLessonBlueprintStep = {
  id: string;
  stepType: CurriculumLessonBlueprintStepType;
  title: string;
  intent: string;
  childFacingPromptDraft: string;
  teacherOrParentNote: string;
  linkedSkillTags: string[];
  verificationNote: string;
};

export type CurriculumLessonBlueprint = {
  id: string;
  moduleId: string;
  status: CurriculumLessonBlueprintStatus;
  title: string;
  learningGoal: string;
  prerequisites: string[];
  steps: CurriculumLessonBlueprintStep[];
  sourceEvidenceIds: string[];
  verificationDecisionIds: string[];
  publicReleaseNote: string;
};

export type CurriculumAssessmentBlueprintStatus = "draft" | "needs_review" | "reviewed" | "ready_for_child_preview";

export type CurriculumAssessmentItemIntent =
  | "concept_check"
  | "representation_check"
  | "comparison_check"
  | "ordering_check"
  | "misconception_probe";

export type CurriculumAssessmentBlueprintItem = {
  id: string;
  intent: CurriculumAssessmentItemIntent;
  promptDraft: string;
  expectedUnderstanding: string;
  commonMistakes: string[];
  verificationNote: string;
};

export type CurriculumAssessmentBlueprint = {
  id: string;
  moduleId: string;
  status: CurriculumAssessmentBlueprintStatus;
  title: string;
  purpose: string;
  items: CurriculumAssessmentBlueprintItem[];
  sourceEvidenceIds: string[];
  verificationDecisionIds: string[];
  publicReleaseNote: string;
};

export type CurriculumBlueprintReviewStatus =
  | "not_started"
  | "evidence_needed"
  | "evidence_recorded"
  | "ready_for_decision";

export type CurriculumBlueprintReviewEvidence = {
  id: string;
  blueprintId: string;
  blueprintType: "lesson" | "assessment";
  moduleId: string;
  reviewStatus: CurriculumBlueprintReviewStatus;
  sourceEvidenceIds: string[];
  reviewFocus: string[];
  findings: string[];
  gaps: string[];
  reviewerNote: string;
  reviewedBy: string;
  reviewedAt: string | null;
};

export type CurriculumBlueprintReadinessGateStatus =
  | "blocked"
  | "needs_review"
  | "ready_for_internal_preview"
  | "ready_for_child_preview";

export type CurriculumBlueprintReadinessGate = {
  id: string;
  blueprintId: string;
  blueprintType: "lesson" | "assessment";
  moduleId: string;
  gateStatus: CurriculumBlueprintReadinessGateStatus;
  blockingReasons: string[];
  requiredActions: string[];
  releaseNote: string;
};

export type CurriculumReviewStatus = "not_started" | "in_review" | "evidence_recorded" | "ready_for_decision";

export type CurriculumReviewDecisionRecommendation =
  | "no_decision"
  | "needs_more_evidence"
  | "ready_to_confirm"
  | "do_not_confirm";

export type CurriculumReviewEvidence = {
  id: string;
  moduleId: string;
  officialOutlineSectionId: string;
  reviewStatus: CurriculumReviewStatus;
  sourceIds: string[];
  sourceQuoteOrReference: string;
  sourcePageHint?: string;
  officialWordingReference?: string;
  decisionRecommendation?: CurriculumReviewDecisionRecommendation;
  reviewNotes: string;
  reviewedBy: string;
  reviewedAt: string | null;
};

export type CurriculumReviewChecklistStatus = "open" | "checked" | "not_applicable";

export type CurriculumReviewChecklistItem = {
  id: string;
  reviewEvidenceId: string;
  label: string;
  description: string;
  status: CurriculumReviewChecklistStatus;
  sourceReference: string;
  sourcePageHint?: string;
  officialWordingReference?: string;
  decisionRecommendation?: CurriculumReviewDecisionRecommendation;
  reviewerNote: string;
};

export type CurriculumCycle = {
  id: CurriculumCycleId;
  title: string;
  description: string;
  grades: GradeId[];
};

export type CurriculumArea = {
  id: CurriculumAreaId;
  title: string;
  description: string;
};

export type CurriculumModule = {
  id: string;
  title: string;
  description: string;
  cycleId: CurriculumCycleId;
  recommendedGrades: GradeId[];
  areaId: CurriculumAreaId;
  prerequisites: string[];
  visualArithmeticRemediation: string[];
  status: CurriculumModuleStatus;
  sourceNote?: string;
  skillTags?: string[];
  verificationStatus?: CurriculumVerificationStatus;
  officialSourceRefs?: string[];
  officialCycleNote?: string;
};

export type CurriculumVerificationMatrixRow = {
  moduleId: string;
  cycleId: CurriculumCycleId;
  areaId: CurriculumAreaId;
  currentStatus: CurriculumVerificationStatus;
  sourceRefs: string[];
  needsManualCheck: string[];
  evidenceNotes: string[];
  publicClaimRisk: CurriculumVerificationRisk;
  nextAction: string;
};
