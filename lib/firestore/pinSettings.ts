import {
  addDoc,
  collection,
  deleteField,
  doc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
  type DocumentData
} from "firebase/firestore";
import { getFirestoreDb } from "@/lib/firebase";
import { hashPin, verifyPin } from "@/lib/pin/hash";
import type { PinSettings, PinVerificationResult } from "@/types";
import { FIRESTORE_COLLECTIONS } from "./collections";

const maxFailedAttempts = 5;
const lockoutMinutes = 5;

function readDate(value: unknown): Date | undefined {
  if (value instanceof Date) {
    return value;
  }

  if (typeof value === "object" && value !== null && "toDate" in value && typeof value.toDate === "function") {
    return value.toDate() as Date;
  }

  return undefined;
}

function mapPinSettings(id: string, data: DocumentData): PinSettings {
  return {
    id,
    parentUserId: String(data.parentUserId ?? ""),
    pinHash: String(data.pinHash ?? ""),
    pinUpdatedAt: readDate(data.pinUpdatedAt) ?? new Date(),
    failedAttempts: typeof data.failedAttempts === "number" ? data.failedAttempts : 0,
    lockedUntil: readDate(data.lockedUntil)
  };
}

export async function getPinSettings(parentUserId: string): Promise<PinSettings | null> {
  const db = getFirestoreDb();
  const pinSettingsQuery = query(
    collection(db, FIRESTORE_COLLECTIONS.pinSettings),
    where("parentUserId", "==", parentUserId),
    limit(1)
  );
  const snapshot = await getDocs(pinSettingsQuery);
  const firstDocument = snapshot.docs[0];

  return firstDocument ? mapPinSettings(firstDocument.id, firstDocument.data()) : null;
}

export async function createPinSettings(parentUserId: string, pin: string): Promise<PinSettings> {
  const db = getFirestoreDb();
  const now = new Date();
  const pinSettingsData = {
    parentUserId,
    pinHash: await hashPin(pin, parentUserId),
    pinUpdatedAt: now,
    failedAttempts: 0
  };
  const pinSettingsRef = await addDoc(collection(db, FIRESTORE_COLLECTIONS.pinSettings), pinSettingsData);

  return {
    id: pinSettingsRef.id,
    ...pinSettingsData
  };
}

export async function verifyParentPin(parentUserId: string, pin: string): Promise<PinVerificationResult> {
  const settings = await getPinSettings(parentUserId);

  if (!settings) {
    return { status: "missing" };
  }

  if (settings.lockedUntil && settings.lockedUntil.getTime() > Date.now()) {
    return { status: "locked", lockedUntil: settings.lockedUntil };
  }

  const db = getFirestoreDb();
  const settingsRef = doc(db, FIRESTORE_COLLECTIONS.pinSettings, settings.id);
  const pinMatches = await verifyPin(pin, parentUserId, settings.pinHash);

  if (pinMatches) {
    await updateDoc(settingsRef, {
      failedAttempts: 0,
      lockedUntil: deleteField()
    });

    return { status: "success" };
  }

  const nextFailedAttempts = settings.failedAttempts + 1;

  if (nextFailedAttempts >= maxFailedAttempts) {
    const lockedUntil = new Date(Date.now() + lockoutMinutes * 60 * 1000);

    await updateDoc(settingsRef, {
      failedAttempts: nextFailedAttempts,
      lockedUntil
    });

    return { status: "locked", lockedUntil };
  }

  await updateDoc(settingsRef, {
    failedAttempts: nextFailedAttempts,
    lockedUntil: deleteField()
  });

  return {
    status: "invalid",
    remainingAttempts: maxFailedAttempts - nextFailedAttempts
  };
}
