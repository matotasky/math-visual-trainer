import type { CurriculumVerificationMatrixRow } from "@/types";

const cycleOneSourceRefs = ["ministry_svp_2023", "ministry_math_informatics", "ministry_math_standard_pdf"];

const commonManualChecks = [
  "Confirm whether this module scope appears in the official Cycle 1 mathematics standard.",
  "Check expected performance/output wording.",
  "Check whether recommended grades are product navigation only and not official grade claims."
];

const commonEvidenceNotes = ["Official source identified; module-level mapping not yet verified."];

const commonNextAction =
  "Compare this module with the official mathematics PDF and update verification status only after manual review.";

export const SK_MATH_CYCLE_1_VERIFICATION_MATRIX: CurriculumVerificationMatrixRow[] = [
  {
    moduleId: "quantity_and_number_sense",
    cycleId: "cycle_1",
    areaId: "numbers_operations",
    currentStatus: "source_identified",
    sourceRefs: cycleOneSourceRefs,
    needsManualCheck: commonManualChecks,
    evidenceNotes: commonEvidenceNotes,
    publicClaimRisk: "medium",
    nextAction: commonNextAction
  },
  {
    moduleId: "number_line_and_comparison",
    cycleId: "cycle_1",
    areaId: "numbers_operations",
    currentStatus: "source_identified",
    sourceRefs: cycleOneSourceRefs,
    needsManualCheck: commonManualChecks,
    evidenceNotes: commonEvidenceNotes,
    publicClaimRisk: "medium",
    nextAction: commonNextAction
  },
  {
    moduleId: "addition_subtraction_to_20",
    cycleId: "cycle_1",
    areaId: "numbers_operations",
    currentStatus: "source_identified",
    sourceRefs: cycleOneSourceRefs,
    needsManualCheck: commonManualChecks,
    evidenceNotes: commonEvidenceNotes,
    publicClaimRisk: "medium",
    nextAction: commonNextAction
  },
  {
    moduleId: "make_10_and_bridge_through_10",
    cycleId: "cycle_1",
    areaId: "numbers_operations",
    currentStatus: "source_identified",
    sourceRefs: cycleOneSourceRefs,
    needsManualCheck: commonManualChecks,
    evidenceNotes: commonEvidenceNotes,
    publicClaimRisk: "medium",
    nextAction: commonNextAction
  },
  {
    moduleId: "addition_subtraction_to_100",
    cycleId: "cycle_1",
    areaId: "numbers_operations",
    currentStatus: "source_identified",
    sourceRefs: cycleOneSourceRefs,
    needsManualCheck: commonManualChecks,
    evidenceNotes: commonEvidenceNotes,
    publicClaimRisk: "medium",
    nextAction: commonNextAction
  },
  {
    moduleId: "multiplication_as_groups",
    cycleId: "cycle_1",
    areaId: "numbers_operations",
    currentStatus: "source_identified",
    sourceRefs: cycleOneSourceRefs,
    needsManualCheck: commonManualChecks,
    evidenceNotes: commonEvidenceNotes,
    publicClaimRisk: "medium",
    nextAction: commonNextAction
  },
  {
    moduleId: "division_as_sharing",
    cycleId: "cycle_1",
    areaId: "numbers_operations",
    currentStatus: "source_identified",
    sourceRefs: cycleOneSourceRefs,
    needsManualCheck: commonManualChecks,
    evidenceNotes: commonEvidenceNotes,
    publicClaimRisk: "medium",
    nextAction: commonNextAction
  },
  {
    moduleId: "word_problems_cycle_1",
    cycleId: "cycle_1",
    areaId: "numbers_operations",
    currentStatus: "source_identified",
    sourceRefs: cycleOneSourceRefs,
    needsManualCheck: commonManualChecks,
    evidenceNotes: commonEvidenceNotes,
    publicClaimRisk: "high",
    nextAction: commonNextAction
  },
  {
    moduleId: "number_patterns_cycle_1",
    cycleId: "cycle_1",
    areaId: "numbers_operations",
    currentStatus: "source_identified",
    sourceRefs: cycleOneSourceRefs,
    needsManualCheck: commonManualChecks,
    evidenceNotes: commonEvidenceNotes,
    publicClaimRisk: "medium",
    nextAction: commonNextAction
  },
  {
    moduleId: "basic_data_tables",
    cycleId: "cycle_1",
    areaId: "relations_data",
    currentStatus: "source_identified",
    sourceRefs: cycleOneSourceRefs,
    needsManualCheck: commonManualChecks,
    evidenceNotes: commonEvidenceNotes,
    publicClaimRisk: "high",
    nextAction: commonNextAction
  },
  {
    moduleId: "patterns_and_sequences_cycle_1",
    cycleId: "cycle_1",
    areaId: "relations_data",
    currentStatus: "source_identified",
    sourceRefs: cycleOneSourceRefs,
    needsManualCheck: commonManualChecks,
    evidenceNotes: commonEvidenceNotes,
    publicClaimRisk: "high",
    nextAction: commonNextAction
  },
  {
    moduleId: "simple_charts_cycle_1",
    cycleId: "cycle_1",
    areaId: "relations_data",
    currentStatus: "source_identified",
    sourceRefs: cycleOneSourceRefs,
    needsManualCheck: commonManualChecks,
    evidenceNotes: commonEvidenceNotes,
    publicClaimRisk: "high",
    nextAction: commonNextAction
  },
  {
    moduleId: "shapes_and_measurement_intro",
    cycleId: "cycle_1",
    areaId: "geometry",
    currentStatus: "source_identified",
    sourceRefs: cycleOneSourceRefs,
    needsManualCheck: commonManualChecks,
    evidenceNotes: commonEvidenceNotes,
    publicClaimRisk: "high",
    nextAction: commonNextAction
  },
  {
    moduleId: "plane_shapes_cycle_1",
    cycleId: "cycle_1",
    areaId: "geometry",
    currentStatus: "source_identified",
    sourceRefs: cycleOneSourceRefs,
    needsManualCheck: commonManualChecks,
    evidenceNotes: commonEvidenceNotes,
    publicClaimRisk: "high",
    nextAction: commonNextAction
  },
  {
    moduleId: "solids_and_spatial_orientation",
    cycleId: "cycle_1",
    areaId: "geometry",
    currentStatus: "source_identified",
    sourceRefs: cycleOneSourceRefs,
    needsManualCheck: commonManualChecks,
    evidenceNotes: commonEvidenceNotes,
    publicClaimRisk: "high",
    nextAction: commonNextAction
  },
  {
    moduleId: "length_mass_time_money_intro",
    cycleId: "cycle_1",
    areaId: "geometry",
    currentStatus: "source_identified",
    sourceRefs: cycleOneSourceRefs,
    needsManualCheck: commonManualChecks,
    evidenceNotes: commonEvidenceNotes,
    publicClaimRisk: "high",
    nextAction: commonNextAction
  },
  {
    moduleId: "symmetry_intro",
    cycleId: "cycle_1",
    areaId: "geometry",
    currentStatus: "source_identified",
    sourceRefs: cycleOneSourceRefs,
    needsManualCheck: commonManualChecks,
    evidenceNotes: commonEvidenceNotes,
    publicClaimRisk: "high",
    nextAction: commonNextAction
  }
];
