import { addDoc, collection, doc, getDocs, limit, orderBy, query, runTransaction, where, writeBatch } from "firebase/firestore";
import { getFirestoreDb } from "@/lib/firebase";
import { calculateMastery } from "@/lib/math-engine/mastery";
import { getOperandKey } from "@/lib/math-engine/mistakes";
import type { DailyStats, ExerciseAttempt, MathTopic, MistakeStats, Streak, TopicMastery } from "@/types";
import {
  calculateNextStreak,
  getDailyStatsId,
  getLocalDateKey,
  getMistakeStatsId,
  getStreakId,
  getTopicMasteryId,
  mergeUniqueTopic
} from "./aggregates";
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

function readTopics(value: unknown): MathTopic[] {
  return Array.isArray(value) ? value.filter((topic): topic is MathTopic => typeof topic === "string") : [];
}

function readCommonWrongAnswers(value: unknown): Record<string, number> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value)
      .filter(([, count]) => typeof count === "number" && Number.isFinite(count))
      .map(([answer, count]) => [answer, count])
  );
}

function buildAttemptData(attempt: ExerciseAttempt) {
  return {
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
}

function buildDailyStats(
  id: string,
  attempt: ExerciseAttempt,
  data: Record<string, unknown> | undefined,
  dateKey: string,
  updatedAt: Date
): DailyStats {
  const previousAttempts = readNumber(data?.attemptsCount);
  const attemptsCount = previousAttempts + 1;
  const correctAttempts = readNumber(data?.correctAttempts) + (attempt.isCorrect ? 1 : 0);
  const totalResponseTimeMs = readNumber(data?.totalResponseTimeMs) + attempt.responseTimeMs;

  return {
    id,
    childProfileId: attempt.childProfileId,
    date: dateKey,
    sessionsCount: Math.max(readNumber(data?.sessionsCount), 1),
    attemptsCount,
    correctAttempts,
    totalResponseTimeMs,
    averageResponseTimeMs: Math.round(totalResponseTimeMs / attemptsCount),
    activeMinutes: Math.max(1, Math.ceil(totalResponseTimeMs / 60000)),
    topicsPracticed: mergeUniqueTopic(readTopics(data?.topicsPracticed), attempt.topic),
    createdAt: data ? readDate(data.createdAt, updatedAt) : updatedAt,
    updatedAt
  };
}

function buildTopicMastery(
  id: string,
  attempt: ExerciseAttempt,
  data: Record<string, unknown> | undefined,
  updatedAt: Date
): TopicMastery {
  const previousAttempts = readNumber(data?.attemptsCount);
  const attemptsCount = previousAttempts + 1;
  const previousCorrect = Math.round(readNumber(data?.accuracy) * previousAttempts);
  const correctCount = previousCorrect + (attempt.isCorrect ? 1 : 0);
  const previousTotalResponseTime = readNumber(data?.averageResponseTimeMs) * previousAttempts;
  const averageResponseTimeMs = Math.round((previousTotalResponseTime + attempt.responseTimeMs) / attemptsCount);
  const accuracy = correctCount / attemptsCount;
  const recentAccuracy = previousAttempts === 0
    ? (attempt.isCorrect ? 1 : 0)
    : readNumber(data?.recentAccuracy, accuracy) * 0.7 + (attempt.isCorrect ? 0.3 : 0);
  const correctStreak = attempt.isCorrect ? readNumber(data?.correctStreak) + 1 : 0;
  const mastery = calculateMastery({
    accuracy,
    averageResponseTimeMs,
    attemptsCount,
    correctStreak,
    recentAccuracy,
    mistakePenalty: attempt.isCorrect ? 0 : 0.08
  });

  return {
    id,
    childProfileId: attempt.childProfileId,
    topic: attempt.topic,
    levelId: attempt.levelId,
    accuracy,
    averageResponseTimeMs,
    attemptsCount,
    correctStreak,
    recentAccuracy,
    masteryScore: mastery.masteryScore,
    lastPracticedAt: attempt.createdAt,
    updatedAt
  };
}

function buildMistakeStats(
  id: string,
  attempt: ExerciseAttempt,
  data: Record<string, unknown> | undefined,
  operandKey: string
): MistakeStats {
  const commonWrongAnswers = readCommonWrongAnswers(data?.commonWrongAnswers);

  if (!attempt.isCorrect && attempt.givenAnswer !== null) {
    const answerKey = String(attempt.givenAnswer);
    commonWrongAnswers[answerKey] = (commonWrongAnswers[answerKey] ?? 0) + 1;
  }

  const mistakeStats = {
    id,
    childProfileId: attempt.childProfileId,
    topic: attempt.topic,
    levelId: attempt.levelId,
    operandKey,
    wrongCount: readNumber(data?.wrongCount) + (attempt.isCorrect ? 0 : 1),
    totalCount: readNumber(data?.totalCount) + 1,
    lastMistakeAt: attempt.isCorrect ? readDate(data?.lastMistakeAt, new Date(0)) : attempt.createdAt,
    commonWrongAnswers
  };

  return attempt.operator ? { ...mistakeStats, operator: attempt.operator } : mistakeStats;
}

function mapStreakData(id: string, data: Record<string, unknown> | undefined): Streak | null {
  if (!data) {
    return null;
  }

  return {
    id,
    childProfileId: String(data.childProfileId ?? ""),
    currentStreak: readNumber(data.currentStreak),
    longestStreak: readNumber(data.longestStreak),
    lastActivityDate: typeof data.lastActivityDate === "string" ? data.lastActivityDate : "",
    activeDays: Array.isArray(data.activeDays) ? data.activeDays.filter((day): day is string => typeof day === "string") : [],
    updatedAt: readDate(data.updatedAt)
  };
}

export async function saveAttempt(attempt: ExerciseAttempt): Promise<void> {
  const db = getFirestoreDb();

  await addDoc(collection(db, FIRESTORE_COLLECTIONS.attempts), buildAttemptData(attempt));
}

export async function saveAttemptAndUpdateAggregates(attempt: ExerciseAttempt): Promise<void> {
  const db = getFirestoreDb();
  const attemptRef = doc(collection(db, FIRESTORE_COLLECTIONS.attempts));
  const dateKey = getLocalDateKey(attempt.createdAt);
  const operandKey = getOperandKey(attempt.operands, attempt.operator);
  const dailyStatsId = getDailyStatsId(attempt.childProfileId, dateKey);
  const topicMasteryId = getTopicMasteryId(attempt.childProfileId, attempt.topic, attempt.levelId);
  const mistakeStatsId = getMistakeStatsId(attempt.childProfileId, attempt.topic, operandKey);
  const streakId = getStreakId(attempt.childProfileId);
  const dailyStatsRef = doc(db, FIRESTORE_COLLECTIONS.dailyStats, dailyStatsId);
  const topicMasteryRef = doc(db, FIRESTORE_COLLECTIONS.topicMastery, topicMasteryId);
  const mistakeStatsRef = doc(db, FIRESTORE_COLLECTIONS.mistakeStats, mistakeStatsId);
  const streakRef = doc(db, FIRESTORE_COLLECTIONS.streaks, streakId);

  await runTransaction(db, async (transaction) => {
    const [dailyStatsSnapshot, topicMasterySnapshot, mistakeStatsSnapshot, streakSnapshot] = await Promise.all([
      transaction.get(dailyStatsRef),
      transaction.get(topicMasteryRef),
      transaction.get(mistakeStatsRef),
      transaction.get(streakRef)
    ]);
    const updatedAt = new Date();
    const dailyStats = buildDailyStats(dailyStatsId, attempt, dailyStatsSnapshot.data(), dateKey, updatedAt);
    const topicMastery = buildTopicMastery(topicMasteryId, attempt, topicMasterySnapshot.data(), updatedAt);
    const mistakeStats = buildMistakeStats(mistakeStatsId, attempt, mistakeStatsSnapshot.data(), operandKey);
    const streak = calculateNextStreak(
      attempt.childProfileId,
      mapStreakData(streakId, streakSnapshot.data()),
      dateKey,
      updatedAt
    );

    transaction.set(attemptRef, buildAttemptData(attempt));
    transaction.set(dailyStatsRef, dailyStats);
    transaction.set(topicMasteryRef, topicMastery);
    transaction.set(mistakeStatsRef, mistakeStats);
    transaction.set(streakRef, streak);
  });
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
