import type { ChildProfile } from "@/types";

export type CreateChildProfileInput = Pick<
  ChildProfile,
  "displayName" | "birthYear" | "schoolYear" | "dailyGoalMinutes"
>;

export async function listChildProfiles(_parentUserId: string): Promise<ChildProfile[]> {
  throw new Error("listChildProfiles will be implemented with paged Firestore reads.");
}

export async function createChildProfile(
  _parentUserId: string,
  _input: CreateChildProfileInput
): Promise<ChildProfile> {
  throw new Error("createChildProfile will be implemented after onboarding forms are added.");
}
