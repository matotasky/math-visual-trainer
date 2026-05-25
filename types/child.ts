import type { LevelId, TimePressure } from "./math";

export type ChildProfile = {
  id: string;
  parentUserId: string;
  linkedChildUserId?: string;
  displayName: string;
  birthYear?: number;
  schoolYear?: number;
  currentLevelId: LevelId;
  dailyGoalMinutes: number;
  timePressurePreference?: TimePressure;
  diagnosticCompletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type ParentChildLink = {
  id: string;
  parentUserId: string;
  childProfileId: string;
  relationship: "parent" | "guardian";
  createdAt: Date;
};
