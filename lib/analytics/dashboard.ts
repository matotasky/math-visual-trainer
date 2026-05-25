import type { DashboardAggregates } from "@/lib/firestore";

export type DashboardSummary = {
  overallAccuracy: number;
  averageResponseTimeMs: number;
  practiceMinutes: number;
};

export function summarizeDashboardAggregates(aggregates: DashboardAggregates): DashboardSummary {
  const totals = aggregates.dailyStats.reduce(
    (current, day) => ({
      attempts: current.attempts + day.attemptsCount,
      correct: current.correct + day.correctAttempts,
      responseTime: current.responseTime + day.totalResponseTimeMs,
      activeMinutes: current.activeMinutes + day.activeMinutes
    }),
    { attempts: 0, correct: 0, responseTime: 0, activeMinutes: 0 }
  );

  return {
    overallAccuracy: totals.attempts === 0 ? 0 : totals.correct / totals.attempts,
    averageResponseTimeMs: totals.attempts === 0 ? 0 : Math.round(totals.responseTime / totals.attempts),
    practiceMinutes: totals.activeMinutes
  };
}
