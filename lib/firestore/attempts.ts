import { addDoc, collection, getDocs, limit, orderBy, query, where, writeBatch } from "firebase/firestore";
import { getFirestoreDb } from "@/lib/firebase";
import type { ExerciseAttempt } from "@/types";
import { FIRESTORE_COLLECTIONS } from "./collections";

function mapAttemptDocument(id: string, data: Record<string, unknown>): ExerciseAttempt {
  return {
    id,
    childProfileId: String(data.childProfileId),
    sessionId: String(data.sessionId),
    topic: data.topic as ExerciseAttempt["topic"],
    levelId: String(data.levelId),
    mode: data.mode as ExerciseAttempt["mode"],
    questionType: String(data.questionType),
    operands: Array.isArray(data.operands) ? data.operands.map(Number) : [],
    operator: data.operator === "+" || data.operator === "-" ? data.operator : undefined,
    correctAnswer: Number(data.correctAnswer),
    givenAnswer: data.givenAnswer === null ? null : Number(data.givenAnswer),
    isCorrect: Boolean(data.isCorrect),
    responseTimeMs: Number(data.responseTimeMs),
    usedHint: Boolean(data.usedHint),
    visualModel: data.visualModel as ExerciseAttempt["visualModel"],
    createdAt:
      typeof (data.createdAt as { toDate?: unknown } | undefined)?.toDate === "function"
        ? ((data.createdAt as { toDate: () => Date }).toDate())
        : new Date()
  };
}

function sortAttemptsByNewest(attempts: ExerciseAttempt[]): ExerciseAttempt[] {
  return [...attempts].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

function sortAttemptsByOldest(attempts: ExerciseAttempt[]): ExerciseAttempt[] {
  return [...attempts].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
}

export async function saveAttempt(attempt: ExerciseAttempt): Promise<void> {
  const db = getFirestoreDb();
  const attemptData = {
    childProfileId: attempt.childProfileId,
    sessionId: attempt.sessionId,
    topic: attempt.topic,
    levelId: attempt.levelId,
    mode: attempt.mode,
    questionType: attempt.questionType,
    operands: attempt.operands,
    ...(attempt.operator ? { operator: attempt.operator } : {}),
    correctAnswer: attempt.correctAnswer,
    givenAnswer: attempt.givenAnswer,
    isCorrect: attempt.isCorrect,
    responseTimeMs: attempt.responseTimeMs,
    usedHint: attempt.usedHint,
    visualModel: attempt.visualModel,
    createdAt: attempt.createdAt
  };

  await addDoc(collection(db, FIRESTORE_COLLECTIONS.attempts), attemptData);
}

export async function listAttemptsPage(
  childProfileId: string,
  pageSize: number
): Promise<ExerciseAttempt[]> {
  const db = getFirestoreDb();

  try {
    const attemptsQuery = query(
      collection(db, FIRESTORE_COLLECTIONS.attempts),
      where("childProfileId", "==", childProfileId),
      orderBy("createdAt", "desc"),
      limit(pageSize)
    );
    const snapshot = await getDocs(attemptsQuery);

    return snapshot.docs.map((document) => mapAttemptDocument(document.id, document.data()));
  } catch {
    const fallbackQuery = query(
      collection(db, FIRESTORE_COLLECTIONS.attempts),
      where("childProfileId", "==", childProfileId),
      limit(Math.max(pageSize, 120))
    );
    const snapshot = await getDocs(fallbackQuery);

    return sortAttemptsByNewest(snapshot.docs.map((document) => mapAttemptDocument(document.id, document.data()))).slice(0, pageSize);
  }
}

export async function deleteAttemptsForLevel(childProfileId: string, levelId: string): Promise<number> {
  const db = getFirestoreDb();
  const attemptsQuery = query(
    collection(db, FIRESTORE_COLLECTIONS.attempts),
    where("childProfileId", "==", childProfileId),
    where("levelId", "==", levelId)
  );
  const snapshot = await getDocs(attemptsQuery);
  const documents = snapshot.docs;
  const batchSize = 450;

  for (let index = 0; index < documents.length; index += batchSize) {
    const batch = writeBatch(db);

    for (const document of documents.slice(index, index + batchSize)) {
      batch.delete(document.ref);
    }

    await batch.commit();
  }

  return documents.length;
}

export async function listAttemptsForSession(
  childProfileId: string,
  sessionId: string
): Promise<ExerciseAttempt[]> {
  const db = getFirestoreDb();
  const attemptsQuery = query(
    collection(db, FIRESTORE_COLLECTIONS.attempts),
    where("childProfileId", "==", childProfileId),
    where("sessionId", "==", sessionId)
  );
  const snapshot = await getDocs(attemptsQuery);

  return sortAttemptsByOldest(snapshot.docs.map((document) => mapAttemptDocument(document.id, document.data())));
}
