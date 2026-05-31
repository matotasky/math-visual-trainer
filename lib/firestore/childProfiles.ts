import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where, type DocumentData } from "firebase/firestore";
import { DEFAULT_LEVEL_ID } from "@/data/levels";
import { getFirestoreDb } from "@/lib/firebase";
import type { ChildProfile } from "@/types";
import { FIRESTORE_COLLECTIONS } from "./collections";

export type CreateChildProfileInput = Pick<
  ChildProfile,
  "displayName" | "birthYear" | "schoolYear" | "dailyGoalMinutes"
>;

function readOptionalNumber(value: unknown): number | undefined {
  return typeof value === "number" ? value : undefined;
}

function readDate(value: unknown): Date {
  if (value instanceof Date) {
    return value;
  }

  if (typeof value === "object" && value !== null && "toDate" in value && typeof value.toDate === "function") {
    return value.toDate() as Date;
  }

  return new Date();
}

function mapChildProfile(id: string, data: DocumentData): ChildProfile {
  const currentLevelId =
    typeof data.currentLevelId === "string" ? (data.currentLevelId as ChildProfile["currentLevelId"]) : DEFAULT_LEVEL_ID;

  return {
    id,
    parentUserId: String(data.parentUserId ?? ""),
    linkedChildUserId: typeof data.linkedChildUserId === "string" ? data.linkedChildUserId : undefined,
    displayName: String(data.displayName ?? ""),
    birthYear: readOptionalNumber(data.birthYear),
    schoolYear: readOptionalNumber(data.schoolYear),
    currentLevelId,
    dailyGoalMinutes: typeof data.dailyGoalMinutes === "number" ? data.dailyGoalMinutes : 10,
    diagnosticCompletedAt: data.diagnosticCompletedAt ? readDate(data.diagnosticCompletedAt) : undefined,
    createdAt: readDate(data.createdAt),
    updatedAt: readDate(data.updatedAt)
  };
}

export async function createChildProfile(
  parentUserId: string,
  input: CreateChildProfileInput
): Promise<ChildProfile> {
  const db = getFirestoreDb();
  const now = new Date();
  const childProfileData = {
    parentUserId,
    displayName: input.displayName.trim(),
    currentLevelId: DEFAULT_LEVEL_ID,
    dailyGoalMinutes: input.dailyGoalMinutes,
    createdAt: now,
    updatedAt: now,
    ...(typeof input.birthYear === "number" ? { birthYear: input.birthYear } : {}),
    ...(typeof input.schoolYear === "number" ? { schoolYear: input.schoolYear } : {})
  };

  const childProfileRef = await addDoc(collection(db, FIRESTORE_COLLECTIONS.childProfiles), childProfileData);

  await addDoc(collection(db, FIRESTORE_COLLECTIONS.parentChildLinks), {
    parentUserId,
    childProfileId: childProfileRef.id,
    relationship: "parent",
    createdAt: now
  });

  return {
    id: childProfileRef.id,
    ...childProfileData
  };
}

export async function listChildProfiles(parentUserId: string): Promise<ChildProfile[]> {
  const db = getFirestoreDb();
  const childProfilesQuery = query(
    collection(db, FIRESTORE_COLLECTIONS.childProfiles),
    where("parentUserId", "==", parentUserId)
  );
  const snapshot = await getDocs(childProfilesQuery);

  return snapshot.docs
    .map((document) => mapChildProfile(document.id, document.data()))
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function getChildProfile(childProfileId: string): Promise<ChildProfile | null> {
  const db = getFirestoreDb();
  const snapshot = await getDoc(doc(db, FIRESTORE_COLLECTIONS.childProfiles, childProfileId));

  if (!snapshot.exists()) {
    return null;
  }

  return mapChildProfile(snapshot.id, snapshot.data());
}

export async function completeChildDiagnostic(childProfileId: string, currentLevelId: ChildProfile["currentLevelId"]): Promise<void> {
  const db = getFirestoreDb();
  const now = new Date();

  await updateDoc(doc(db, FIRESTORE_COLLECTIONS.childProfiles, childProfileId), {
    currentLevelId,
    diagnosticCompletedAt: now,
    updatedAt: now
  });
}

export async function updateChildLevel(childProfileId: string, currentLevelId: ChildProfile["currentLevelId"]): Promise<void> {
  const db = getFirestoreDb();

  await updateDoc(doc(db, FIRESTORE_COLLECTIONS.childProfiles, childProfileId), {
    currentLevelId,
    updatedAt: new Date()
  });
}
