import type { DailyStats, MistakeStats, TopicMastery } from "@/types";

export type DashboardAggregates = {
  dailyStats: DailyStats[];
  mistakeStats: MistakeStats[];
  topicMastery: TopicMastery[];
};

export async function getDashboardAggregates(
  _childProfileId: string,
  _days: 7 | 14 | 30
): Promise<DashboardAggregates> {
  throw new Error("getDashboardAggregates will read aggregate documents only.");
}
