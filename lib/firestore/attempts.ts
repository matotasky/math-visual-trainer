import { addDoc, collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { getFirestoreDb } from "@/lib/firebase";
import type { ExerciseAttempt } from "@/types";
import { FIRESTORE_COLLECTIONS } from "./collections";

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
  const attemptsQuery = query(
    collection(db, FIRESTORE_COLLECTIONS.attempts),
    where("childProfileId", "==", childProfileId),
    orderBy("createdAt", "desc"),
    limit(pageSize)
  );
  const snapshot = await getDocs(attemptsQuery);

  return snapshot.docs.map((document) => {
    const data = document.data();

    return {
      id: document.id,
      childProfileId: String(data.childProfileId),
      sessionId: String(data.sessionId),
      topic: data.topic,
      levelId: String(data.levelId),
      mode: data.mode,
      questionType: String(data.questionType),
      operands: Array.isArray(data.operands) ? data.operands.map(Number) : [],
      operator: data.operator,
      correctAnswer: Number(data.correctAnswer),
      givenAnswer: data.givenAnswer === null ? null : Number(data.givenAnswer),
      isCorrect: Boolean(data.isCorrect),
      responseTimeMs: Number(data.responseTimeMs),
      usedHint: Boolean(data.usedHint),
      visualModel: data.visualModel,
      createdAt: typeof data.createdAt?.toDate === "function" ? data.createdAt.toDate() : new Date()
    };
  });
}
