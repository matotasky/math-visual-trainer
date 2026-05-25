import type { LevelDefinition, LevelId } from "@/types";

export const LEVELS = [
  {
    id: "L0_DIAGNOSTIC",
    label: "Diagnostic",
    description: "Friendly entry diagnostic with no time pressure.",
    topics: ["quantity_recognition", "number_matching", "addition_to_5"],
    visualModels: ["dots", "ten_frame"],
    timePressure: "none",
    minAttemptsForMastery: 0,
    targetAccuracy: 0
  },
  {
    id: "L1_QUANTITY_TO_5",
    label: "Quantities to 5",
    description: "Recognize small quantities and match numbers to visuals.",
    topics: ["quantity_recognition", "number_matching"],
    visualModels: ["dots", "groups"],
    timePressure: "none",
    minAttemptsForMastery: 20,
    targetAccuracy: 0.9,
    targetResponseTimeMs: 6000,
    unlocksAfter: "L0_DIAGNOSTIC"
  },
  {
    id: "L2_ADDITION_TO_5",
    label: "Addition to 5",
    description: "Build visual addition with small totals.",
    topics: ["addition_to_5"],
    visualModels: ["dots", "groups"],
    timePressure: "soft",
    minAttemptsForMastery: 30,
    targetAccuracy: 0.9,
    targetResponseTimeMs: 7000,
    unlocksAfter: "L1_QUANTITY_TO_5"
  },
  {
    id: "L3_QUANTITY_TO_10",
    label: "Quantities to 10",
    description: "Introduce ten-frame recognition and structured quantity.",
    topics: ["quantity_to_10"],
    visualModels: ["ten_frame", "dots"],
    timePressure: "soft",
    minAttemptsForMastery: 25,
    targetAccuracy: 0.9,
    targetResponseTimeMs: 7000,
    unlocksAfter: "L2_ADDITION_TO_5"
  },
  {
    id: "L4_MAKE_10",
    label: "Make 10",
    description: "Practice complements to 10 using ten-frame strategies.",
    topics: ["make_10"],
    visualModels: ["ten_frame"],
    timePressure: "soft",
    minAttemptsForMastery: 35,
    targetAccuracy: 0.9,
    targetResponseTimeMs: 6500,
    unlocksAfter: "L3_QUANTITY_TO_10"
  },
  {
    id: "L5_ADDITION_TO_10",
    label: "Addition to 10",
    description: "Strengthen addition facts to 10 with accuracy first.",
    topics: ["addition_to_10"],
    visualModels: ["ten_frame", "number_line", "none"],
    timePressure: "medium",
    minAttemptsForMastery: 45,
    targetAccuracy: 0.92,
    targetResponseTimeMs: 5000,
    unlocksAfter: "L4_MAKE_10"
  },
  {
    id: "L6_AUTOMATION_TO_10",
    label: "Automation to 10",
    description: "Automate addition and subtraction to 10 after stable accuracy.",
    topics: ["addition_to_10", "subtraction_to_10"],
    visualModels: ["number_line", "none"],
    timePressure: "high",
    minAttemptsForMastery: 60,
    targetAccuracy: 0.93,
    targetResponseTimeMs: 3500,
    unlocksAfter: "L5_ADDITION_TO_10"
  },
  {
    id: "L7_ADDITION_TO_20",
    label: "Addition to 20",
    description: "Bridge through 10 for addition beyond 10.",
    topics: ["addition_to_20", "bridge_through_10"],
    visualModels: ["ten_frame", "number_line", "groups"],
    timePressure: "medium",
    minAttemptsForMastery: 60,
    targetAccuracy: 0.9,
    targetResponseTimeMs: 7000,
    unlocksAfter: "L6_AUTOMATION_TO_10"
  }
] satisfies LevelDefinition[];

export const DEFAULT_LEVEL_ID: LevelId = "L0_DIAGNOSTIC";
