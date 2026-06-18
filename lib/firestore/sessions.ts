import { addDoc, collection, doc, getDocs, limit, orderBy, query, updateDoc, where } from "firebase/firestore";
import { getFirestoreDb } from "@/lib/firebase";
import type { ExerciseMode, LearningSession, MathTopic } from "@/types";
import { FIRESTORE_COLLECTIONS } from "./collections";

export type CreateLearningSessionInput = {
  childProfileId: string;
  mode: ExerciseMode;
  topic: MathTopic;
  levelId: string;
  startedAt?: Date;
};

export type CompleteLearningSessionSummary = {
  endedAt?: Date;
  totalTasks: number;
  correctTasks: number;
  averageResponseTimeMs: number;
};

function readNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function readDate(value: unknown, fallback = new Date()): Date {
  if (value instanceof Date) {
    return value;
  }

  if (typeof value === "object" && value !== null && "toDate" in value && typeof value.toDate === "function") {
    return value.toDate() as Date;
  }

  return fallback;
}

function mapLearningSessionDocument(id: string, data: Record<string, unknown>): LearningSession {
  const endedAt = data.endedAt ? readDate(data.endedAt) : undefined;
  const session = {
    id,
    childProfileId: String(data.childProfileId ?? ""),
    mode: data.mode as ExerciseMode,
    topic: data.topic as MathTopic,
    levelId: String(data.levelId ?? ""),
    startedAt: readDate(data.startedAt),
    totalTasks: readNumber(data.totalTasks),
    correctTasks: readNumber(data.correctTasks),
    averageResponseTimeMs: readNumber(data.averageResponseTimeMs),
    completed: Boolean(data.completed)
  };

  return endedAt ? { ...session, endedAt } : session;
}

export async function createLearningSession(input: CreateLearningSessionInput): Promise<LearningSession> {
  const db = getFirestoreDb();
  const startedAt = input.startedAt ?? new Date();
  const sessionData = {
    childProfileId: input.childProfileId,
    mode: input.mode,
    topic: input.topic,
    levelId: input.levelId,
    startedAt,
    totalTasks: 0,
    correctTasks: 0,
    averageResponseTimeMs: 0,
    completed: false
  };
  const sessionRef = await addDoc(collection(db, FIRESTORE_COLLECTIONS.sessions), sessionData);

  return {
    id: sessionRef.id,
    ...sessionData
  };
}

export async function completeLearningSession(
  sessionId: string,
  summary: CompleteLearningSessionSummary
): Promise<void> {
  const db = getFirestoreDb();

  await updateDoc(doc(db, FIRESTORE_COLLECTIONS.sessions, sessionId), {
    endedAt: summary.endedAt ?? new Date(),
    totalTasks: summary.totalTasks,
    correctTasks: summary.correctTasks,
    averageResponseTimeMs: summary.averageResponseTimeMs,
    completed: true
  });
}

export async function listRecentSessions(
  childProfileId: string,
  limitCount: number
): Promise<LearningSession[]> {
  const db = getFirestoreDb();
  const sessionsQuery = query(
    collection(db, FIRESTORE_COLLECTIONS.sessions),
    where("childProfileId", "==", childProfileId),
    orderBy("startedAt", "desc"),
    limit(limitCount)
  );
  const snapshot = await getDocs(sessionsQuery);

  return snapshot.docs.map((document) => mapLearningSessionDocument(document.id, document.data()));
}
