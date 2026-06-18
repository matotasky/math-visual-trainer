import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where
} from "firebase/firestore";
import { getFirestoreDb } from "@/lib/firebase";
import type { DailyStats, MathOperator, MathTopic, MistakeStats, Streak, TopicMastery } from "@/types";
import { FIRESTORE_COLLECTIONS } from "./collections";

export type DashboardAggregates = {
  dailyStats: DailyStats[];
  mistakeStats: MistakeStats[];
  streak: Streak | null;
  topicMastery: TopicMastery[];
};

const maxStoredActiveDays = 60;

function padDatePart(value: number): string {
  return String(value).padStart(2, "0");
}

export function getLocalDateKey(date = new Date()): string {
  return [
    date.getFullYear(),
    padDatePart(date.getMonth() + 1),
    padDatePart(date.getDate())
  ].join("-");
}

function parseDateKey(dateKey: string): Date | null {
  const [year, month, day] = dateKey.split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
}

function getPreviousDateKey(dateKey: string): string | null {
  const date = parseDateKey(dateKey);

  if (!date) {
    return null;
  }

  date.setDate(date.getDate() - 1);

  return getLocalDateKey(date);
}

function getDateKeyForOffset(daysAgo: number): string {
  const date = new Date();

  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - daysAgo);

  return getLocalDateKey(date);
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

function mapDailyStatsDocument(id: string, data: Record<string, unknown>): DailyStats {
  return {
    id,
    childProfileId: String(data.childProfileId ?? ""),
    date: String(data.date ?? ""),
    sessionsCount: readNumber(data.sessionsCount),
    attemptsCount: readNumber(data.attemptsCount),
    correctAttempts: readNumber(data.correctAttempts),
    totalResponseTimeMs: readNumber(data.totalResponseTimeMs),
    averageResponseTimeMs: readNumber(data.averageResponseTimeMs),
    activeMinutes: readNumber(data.activeMinutes),
    topicsPracticed: readTopics(data.topicsPracticed),
    createdAt: readDate(data.createdAt),
    updatedAt: readDate(data.updatedAt)
  };
}

function mapTopicMasteryDocument(id: string, data: Record<string, unknown>): TopicMastery {
  return {
    id,
    childProfileId: String(data.childProfileId ?? ""),
    topic: data.topic as MathTopic,
    levelId: String(data.levelId ?? ""),
    accuracy: readNumber(data.accuracy),
    averageResponseTimeMs: readNumber(data.averageResponseTimeMs),
    attemptsCount: readNumber(data.attemptsCount),
    correctStreak: readNumber(data.correctStreak),
    recentAccuracy: readNumber(data.recentAccuracy),
    masteryScore: readNumber(data.masteryScore),
    lastPracticedAt: readDate(data.lastPracticedAt),
    updatedAt: readDate(data.updatedAt)
  };
}

function mapMistakeStatsDocument(id: string, data: Record<string, unknown>): MistakeStats {
  const operator = data.operator === "+" || data.operator === "-" ? data.operator as MathOperator : undefined;
  const stats = {
    id,
    childProfileId: String(data.childProfileId ?? ""),
    topic: data.topic as MathTopic,
    levelId: String(data.levelId ?? ""),
    operandKey: String(data.operandKey ?? ""),
    wrongCount: readNumber(data.wrongCount),
    totalCount: readNumber(data.totalCount),
    lastMistakeAt: readDate(data.lastMistakeAt, new Date(0)),
    commonWrongAnswers: readCommonWrongAnswers(data.commonWrongAnswers)
  };

  return operator ? { ...stats, operator } : stats;
}

function mapStreakDocument(id: string, data: Record<string, unknown>): Streak {
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

export function getDailyStatsId(childProfileId: string, dateKey: string): string {
  return `${childProfileId}_${dateKey}`;
}

export function getTopicMasteryId(childProfileId: string, topic: MathTopic, levelId: string): string {
  return `${childProfileId}_${topic}_${levelId}`;
}

export function getMistakeStatsId(childProfileId: string, topic: MathTopic, operandKey: string): string {
  return `${childProfileId}_${topic}_${operandKey}`;
}

export function getStreakId(childProfileId: string): string {
  return childProfileId;
}

export function mergeUniqueTopic(topics: MathTopic[], topic: MathTopic): MathTopic[] {
  return [...new Set([...topics, topic])];
}

export function calculateNextStreak(
  childProfileId: string,
  currentStreak: Streak | null,
  activityDateKey: string,
  updatedAt = new Date()
): Streak {
  const previousActivityDate = currentStreak?.lastActivityDate;
  const previousDayKey = getPreviousDateKey(activityDateKey);
  const currentStreakCount =
    previousActivityDate === activityDateKey
      ? Math.max(currentStreak?.currentStreak ?? 0, 1)
      : previousActivityDate && previousActivityDate === previousDayKey
        ? (currentStreak?.currentStreak ?? 0) + 1
        : 1;
  const activeDays = [...new Set([...(currentStreak?.activeDays ?? []), activityDateKey])]
    .sort()
    .slice(-maxStoredActiveDays);

  return {
    id: getStreakId(childProfileId),
    childProfileId,
    currentStreak: currentStreakCount,
    longestStreak: Math.max(currentStreak?.longestStreak ?? 0, currentStreakCount),
    lastActivityDate: activityDateKey,
    activeDays,
    updatedAt
  };
}

export async function getDashboardAggregates(
  childProfileId: string,
  days: 7 | 14 | 30
): Promise<DashboardAggregates> {
  const db = getFirestoreDb();
  const todayKey = getDateKeyForOffset(0);
  const startDateKey = getDateKeyForOffset(days - 1);
  const dailyStatsQuery = query(
    collection(db, FIRESTORE_COLLECTIONS.dailyStats),
    where("childProfileId", "==", childProfileId),
    where("date", ">=", startDateKey),
    where("date", "<=", todayKey),
    orderBy("date", "asc"),
    limit(days)
  );
  const topicMasteryQuery = query(
    collection(db, FIRESTORE_COLLECTIONS.topicMastery),
    where("childProfileId", "==", childProfileId)
  );
  const mistakeStatsQuery = query(
    collection(db, FIRESTORE_COLLECTIONS.mistakeStats),
    where("childProfileId", "==", childProfileId),
    orderBy("wrongCount", "desc"),
    limit(20)
  );
  const streakRef = doc(db, FIRESTORE_COLLECTIONS.streaks, getStreakId(childProfileId));
  const [dailyStatsSnapshot, topicMasterySnapshot, mistakeStatsSnapshot, streakSnapshot] = await Promise.all([
    getDocs(dailyStatsQuery),
    getDocs(topicMasteryQuery),
    getDocs(mistakeStatsQuery),
    getDoc(streakRef)
  ]);

  return {
    dailyStats: dailyStatsSnapshot.docs.map((document) => mapDailyStatsDocument(document.id, document.data())),
    mistakeStats: mistakeStatsSnapshot.docs.map((document) => mapMistakeStatsDocument(document.id, document.data())),
    streak: streakSnapshot.exists() ? mapStreakDocument(streakSnapshot.id, streakSnapshot.data()) : null,
    topicMastery: topicMasterySnapshot.docs.map((document) => mapTopicMasteryDocument(document.id, document.data()))
  };
}
