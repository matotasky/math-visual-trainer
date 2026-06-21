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
