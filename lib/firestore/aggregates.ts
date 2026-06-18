import type { DailyStats, MathTopic, MistakeStats, Streak, TopicMastery } from "@/types";

export type DashboardAggregates = {
  dailyStats: DailyStats[];
  mistakeStats: MistakeStats[];
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
  _childProfileId: string,
  _days: 7 | 14 | 30
): Promise<DashboardAggregates> {
  void _childProfileId;
  void _days;

  throw new Error("getDashboardAggregates will read aggregate documents only.");
}
