"use client";

import {
  Activity,
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Loader2,
  Target,
  Trash2,
  TrendingUp
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { LEVELS } from "@/data/levels";
import { useAuth } from "@/hooks/useAuth";
import {
  deleteAttemptsForLevel,
  getDashboardAggregates,
  listAttemptsPage,
  listChildProfiles,
  updateChildLevel,
  type DashboardAggregates
} from "@/lib/firestore";
import { recommendLevelAdjustmentFromMastery } from "@/lib/math-engine";
import { getLevelDisplayName } from "@/lib/math-engine/levelDisplay";
import { getSelectedChildProfileId, setSelectedChildProfileId } from "@/lib/utils/childSelection";
import { toLocalDateKey } from "@/lib/utils/date";
import type {
  ChildProfile,
  DailyStats,
  ExerciseAttempt,
  ExerciseMode,
  LevelId,
  Locale,
  MathTopic,
  MistakeStats,
  Streak,
  TopicMastery
} from "@/types";

type ParentDashboardLabels = {
  title: string;
  description: string;
  accuracyChart: string;
  masteryChart: string;
  loadingProfiles: string;
  loadingDashboard: string;
  loadError: string;
  noChildrenTitle: string;
  noChildrenDescription: string;
  createChildButton: string;
  childSelectorLabel: string;
  currentLevel: string;
  lastActivity: string;
  noActivity: string;
  recentWindow: string;
  dataNote: string;
  cards: {
    dailyStreak: string;
    overallAccuracy: string;
    averageResponseTime: string;
    practiceMinutes: string;
    tasksToday: string;
    currentLevel: string;
  };
  charts: {
    accuracy: string;
    responseTime: string;
    attempts: string;
    topicMastery: string;
  };
  sections: {
    recommendedFocus: string;
    levelControl: string;
    topicMastery: string;
    commonMistakes: string;
    recentTests: string;
  };
  emptyStates: {
    noAttempts: string;
    noMistakes: string;
    noTests: string;
  };
  table: {
    topic: string;
    accuracy: string;
    averageTime: string;
    tasks: string;
    example: string;
    mistakes: string;
    errorRate: string;
    result: string;
    date: string;
  };
  recommendations: {
    diagnostic: string;
    startPractice: string;
    accuracy: string;
    make10: string;
    slowTopic: string;
    dailyGoal: string;
    challenge: string;
  };
  insights: {
    make10Issue: string;
    weakPairIssue: string;
    slowButCorrect: string;
  };
  levelControl: {
    title: string;
    description: string;
    appRecommendation: string;
    recommendedLevel: string;
    currentLevel: string;
    manualSelectLabel: string;
    applyRecommendation: string;
    lowerLevel: string;
    raiseLevel: string;
    saving: string;
    saveError: string;
    actionLabels: Record<"keep" | "raise" | "lower", string>;
    reasons: Record<
      | "needs_diagnostic"
      | "not_enough_data"
      | "ready_to_raise"
      | "accuracy_low_lower"
      | "accuracy_low_practice"
      | "slow_but_correct"
      | "keep_building",
      string
    >;
    stats: string;
  };
  levelReset: {
    title: string;
    description: string;
    selectLabel: string;
    deleteButton: string;
    confirmTitle: string;
    confirmDescription: string;
    cancelButton: string;
    confirmButton: string;
    saving: string;
    success: string;
    saveError: string;
  };
  topics: Record<MathTopic, string>;
  modes: Record<ExerciseMode, string>;
};

type ParentDashboardProps = {
  labels: ParentDashboardLabels;
  locale: Locale;
};

type DailyChartRow = {
  dateKey: string;
  label: string;
  accuracy: number;
  responseTimeSeconds: number;
  tasks: number;
};

type TopicSummary = {
  topic: MathTopic;
  attempts: number;
  correct: number;
  accuracy: number;
  averageResponseTimeMs: number;
  masteryScore: number;
  mistakes: number;
};

type MistakeSummary = {
  operandKey: string;
  topic: MathTopic;
  wrongCount: number;
  totalCount: number;
  errorRate: number;
  likelyIssue: string;
};

type TestSummary = {
  sessionId: string;
  createdAt: Date;
  totalTasks: number;
  correctTasks: number;
  averageResponseTimeMs: number;
};

const recentTestAttemptPageSize = 60;
const chartDays = 14;
const emptyDailyStats: DailyStats[] = [];
const emptyMistakeStats: MistakeStats[] = [];
const emptyTopicMastery: TopicMastery[] = [];

function dateKeyForOffset(daysAgo: number): string {
  const date = new Date();

  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - daysAgo);

  return toLocalDateKey(date);
}

function dateFromDateKey(dateKey: string): Date | null {
  const [year, month, day] = dateKey.split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
}

function getVisibleCurrentStreak(streak: Streak | null): number {
  if (!streak) {
    return 0;
  }

  const todayKey = dateKeyForOffset(0);
  const yesterdayKey = dateKeyForOffset(1);

  if (streak.lastActivityDate !== todayKey && streak.lastActivityDate !== yesterdayKey) {
    return 0;
  }

  return streak.currentStreak;
}

function getLastActivityDate(streak: Streak | null, dailyStats: DailyStats[]): Date | null {
  const streakDate = streak?.lastActivityDate ? dateFromDateKey(streak.lastActivityDate) : null;

  if (streakDate) {
    return streakDate;
  }

  const lastDailyStat = [...dailyStats].sort((a, b) => b.date.localeCompare(a.date))[0];

  return lastDailyStat ? dateFromDateKey(lastDailyStat.date) : null;
}

function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

function formatResponseTime(ms: number): string {
  if (ms <= 0) {
    return "-";
  }

  return `${(ms / 1000).toFixed(1)} s`;
}

function formatDateTime(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "sk" ? "sk-SK" : "en-US", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}

function formatDateOnly(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "sk" ? "sk-SK" : "en-US", {
    dateStyle: "medium"
  }).format(date);
}

function formatDateLabel(dateKey: string): string {
  return dateKey.slice(5);
}

function fillTemplate(template: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce(
    (current, [key, value]) => current.replace(`{${key}}`, String(value)),
    template
  );
}

function isLevelId(value: string): value is LevelId {
  return LEVELS.some((level) => level.id === value);
}

function getLevelIndex(levelId: string): number {
  const index = LEVELS.findIndex((level) => level.id === levelId);

  return index >= 0 ? index : 0;
}

function calculateDailyRows(dailyStats: DailyStats[]): DailyChartRow[] {
  const dateKeys = Array.from({ length: chartDays }, (_, index) => dateKeyForOffset(chartDays - 1 - index));
  const dailyStatsByDate = new Map(dailyStats.map((stats) => [stats.date, stats]));

  return dateKeys.map((dateKey) => {
    const stats = dailyStatsByDate.get(dateKey);
    const attemptsCount = stats?.attemptsCount ?? 0;
    const correctAttempts = stats?.correctAttempts ?? 0;

    return {
      dateKey,
      label: formatDateLabel(dateKey),
      accuracy: attemptsCount === 0 ? 0 : Math.round((correctAttempts / attemptsCount) * 100),
      responseTimeSeconds: attemptsCount === 0 ? 0 : Number(((stats?.averageResponseTimeMs ?? 0) / 1000).toFixed(1)),
      tasks: attemptsCount
    };
  });
}

function summarizeTopics(topicMastery: TopicMastery[]): TopicSummary[] {
  const grouped = new Map<MathTopic, TopicMastery[]>();

  for (const mastery of topicMastery) {
    grouped.set(mastery.topic, [...(grouped.get(mastery.topic) ?? []), mastery]);
  }

  return [...grouped.entries()]
    .map(([topic, masteryRows]) => {
      const attempts = masteryRows.reduce((total, mastery) => total + mastery.attemptsCount, 0);
      const correct = Math.round(
        masteryRows.reduce((total, mastery) => total + mastery.accuracy * mastery.attemptsCount, 0)
      );
      const totalResponseTimeMs = masteryRows.reduce(
        (total, mastery) => total + mastery.averageResponseTimeMs * mastery.attemptsCount,
        0
      );
      const totalMastery = masteryRows.reduce(
        (total, mastery) => total + mastery.masteryScore * mastery.attemptsCount,
        0
      );

      return {
        topic,
        attempts,
        correct,
        accuracy: attempts === 0 ? 0 : Math.round((correct / attempts) * 100),
        averageResponseTimeMs: attempts === 0 ? 0 : Math.round(totalResponseTimeMs / attempts),
        masteryScore: attempts === 0 ? 0 : Math.round((totalMastery / attempts) * 100),
        mistakes: attempts - correct
      };
    })
    .sort((a, b) => a.accuracy - b.accuracy || b.attempts - a.attempts);
}

function isMake10LikeMistake(stats: MistakeStats): boolean {
  if (stats.topic === "make_10") {
    return true;
  }

  if (stats.operator !== "+") {
    return false;
  }

  const operands = stats.operandKey.split("+").map(Number);

  return operands.length > 1 && operands.every(Number.isFinite) && operands.reduce((sum, operand) => sum + operand, 0) === 10;
}

function summarizeMistakes(mistakeStats: MistakeStats[], labels: ParentDashboardLabels): MistakeSummary[] {
  return mistakeStats
    .map((stats) => {
      return {
        operandKey: stats.operandKey,
        topic: stats.topic,
        wrongCount: stats.wrongCount,
        totalCount: stats.totalCount,
        errorRate: stats.totalCount === 0 ? 0 : Math.round((stats.wrongCount / stats.totalCount) * 100),
        likelyIssue: isMake10LikeMistake(stats)
          ? labels.insights.make10Issue
          : labels.insights.weakPairIssue
      };
    })
    .filter((summary) => summary.wrongCount > 0)
    .sort((a, b) => b.wrongCount - a.wrongCount || b.errorRate - a.errorRate)
    .slice(0, 5);
}

function summarizeTests(attempts: ExerciseAttempt[]): TestSummary[] {
  const grouped = new Map<string, ExerciseAttempt[]>();

  for (const attempt of attempts.filter((candidate) => candidate.mode === "test")) {
    grouped.set(attempt.sessionId, [...(grouped.get(attempt.sessionId) ?? []), attempt]);
  }

  return [...grouped.entries()]
    .map(([sessionId, sessionAttempts]) => {
      const correctTasks = sessionAttempts.filter((attempt) => attempt.isCorrect).length;
      const totalResponseTimeMs = sessionAttempts.reduce((total, attempt) => total + attempt.responseTimeMs, 0);
      const createdAt = sessionAttempts.reduce(
        (latest, attempt) => (attempt.createdAt > latest ? attempt.createdAt : latest),
        sessionAttempts[0]?.createdAt ?? new Date()
      );

      return {
        sessionId,
        createdAt,
        totalTasks: sessionAttempts.length,
        correctTasks,
        averageResponseTimeMs: sessionAttempts.length === 0 ? 0 : Math.round(totalResponseTimeMs / sessionAttempts.length)
      };
    })
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 3);
}

function calculateRecommendation(
  child: ChildProfile,
  totalAttempts: number,
  overallAccuracy: number,
  currentStreak: number,
  tasksToday: number,
  dailyGoalTasks: number,
  topicSummaries: TopicSummary[],
  mistakeSummaries: MistakeSummary[],
  labels: ParentDashboardLabels
): string {
  if (!child.diagnosticCompletedAt) {
    return labels.recommendations.diagnostic;
  }

  if (totalAttempts === 0) {
    return labels.recommendations.startPractice;
  }

  if (mistakeSummaries.some((mistake) => mistake.topic === "make_10" || mistake.likelyIssue === labels.insights.make10Issue)) {
    return labels.recommendations.make10;
  }

  if (overallAccuracy < 80) {
    return labels.recommendations.accuracy;
  }

  const slowTopic = topicSummaries.find((topic) => topic.averageResponseTimeMs > 8000 && topic.accuracy >= 80);

  if (slowTopic) {
    return fillTemplate(labels.recommendations.slowTopic, {
      topic: labels.topics[slowTopic.topic]
    });
  }

  if (tasksToday < dailyGoalTasks || currentStreak === 0) {
    return labels.recommendations.dailyGoal;
  }

  return labels.recommendations.challenge;
}

export function ParentDashboard({ labels, locale }: ParentDashboardProps) {
  const { firebaseUser, loading: authLoading } = useAuth();
  const [profiles, setProfiles] = useState<ChildProfile[]>([]);
  const [selectedChildId, setSelectedChildId] = useState("");
  const [dashboardAggregates, setDashboardAggregates] = useState<DashboardAggregates | null>(null);
  const [recentAttempts, setRecentAttempts] = useState<ExerciseAttempt[]>([]);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [loadingDashboard, setLoadingDashboard] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [levelSaving, setLevelSaving] = useState(false);
  const [levelError, setLevelError] = useState(false);
  const [resetLevelId, setResetLevelId] = useState<LevelId>("L0_DIAGNOSTIC");
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [resetSaving, setResetSaving] = useState(false);
  const [resetError, setResetError] = useState(false);
  const [lastResetCount, setLastResetCount] = useState<number | null>(null);

  useEffect(() => {
    const parentUserId = firebaseUser?.uid;

    if (authLoading || !parentUserId) {
      return;
    }

    const activeParentUserId = parentUserId;
    let cancelled = false;

    async function loadProfiles() {
      setLoadingProfiles(true);
      setLoadError(false);

      try {
        const nextProfiles = await listChildProfiles(activeParentUserId);
        const storedChildId = getSelectedChildProfileId();
        const nextSelectedChild = nextProfiles.find((profile) => profile.id === storedChildId) ?? nextProfiles[0];

        if (!cancelled) {
          setProfiles(nextProfiles);
          setSelectedChildId(nextSelectedChild?.id ?? "");
          setResetLevelId(nextSelectedChild?.currentLevelId ?? "L0_DIAGNOSTIC");

          if (nextSelectedChild) {
            setSelectedChildProfileId(nextSelectedChild.id);
          } else {
            setDashboardAggregates(null);
            setRecentAttempts([]);
          }
        }
      } catch {
        if (!cancelled) {
          setLoadError(true);
          setProfiles([]);
          setSelectedChildId("");
          setDashboardAggregates(null);
          setRecentAttempts([]);
        }
      } finally {
        if (!cancelled) {
          setLoadingProfiles(false);
        }
      }
    }

    void loadProfiles();

    return () => {
      cancelled = true;
    };
  }, [authLoading, firebaseUser?.uid]);

  useEffect(() => {
    if (!selectedChildId) {
      return;
    }

    let cancelled = false;

    async function loadDashboard() {
      setLoadingDashboard(true);
      setLoadError(false);

      try {
        const nextAggregates = await getDashboardAggregates(selectedChildId, chartDays);
        let nextRecentAttempts: ExerciseAttempt[] = [];

        try {
          nextRecentAttempts = await listAttemptsPage(selectedChildId, recentTestAttemptPageSize);
        } catch {
          nextRecentAttempts = [];
        }

        if (!cancelled) {
          setDashboardAggregates(nextAggregates);
          setRecentAttempts(nextRecentAttempts);
        }
      } catch {
        if (!cancelled) {
          setLoadError(true);
          setDashboardAggregates(null);
          setRecentAttempts([]);
        }
      } finally {
        if (!cancelled) {
          setLoadingDashboard(false);
        }
      }
    }

    void loadDashboard();

    return () => {
      cancelled = true;
    };
  }, [selectedChildId]);

  const selectedChild = profiles.find((profile) => profile.id === selectedChildId) ?? null;
  const dailyStats = dashboardAggregates?.dailyStats ?? emptyDailyStats;
  const topicMastery = dashboardAggregates?.topicMastery ?? emptyTopicMastery;
  const mistakeStats = dashboardAggregates?.mistakeStats ?? emptyMistakeStats;
  const streak = dashboardAggregates?.streak ?? null;
  const todayKey = toLocalDateKey();
  const todayStats = dailyStats.find((stats) => stats.date === todayKey);
  const totalAttempts = dailyStats.reduce((total, stats) => total + stats.attemptsCount, 0);
  const correctAttempts = dailyStats.reduce((total, stats) => total + stats.correctAttempts, 0);
  const totalResponseTimeMs = dailyStats.reduce((total, stats) => total + stats.totalResponseTimeMs, 0);
  const overallAccuracy = totalAttempts === 0 ? 0 : Math.round((correctAttempts / totalAttempts) * 100);
  const averageResponseTimeMs = totalAttempts === 0 ? 0 : Math.round(totalResponseTimeMs / totalAttempts);
  const activeMinutes = dailyStats.reduce((total, stats) => total + stats.activeMinutes, 0);
  const currentStreak = getVisibleCurrentStreak(streak);
  const dailyGoalTasks = selectedChild ? Math.max(1, selectedChild.dailyGoalMinutes) : 1;
  const currentLevelName = selectedChild ? getLevelDisplayName(selectedChild.currentLevelId, locale) : "";
  const currentLevelIndex = selectedChild ? getLevelIndex(selectedChild.currentLevelId) : 0;
  const previousLevel = LEVELS[currentLevelIndex - 1];
  const nextLevel = LEVELS[currentLevelIndex + 1];
  const lastActivity = getLastActivityDate(streak, dailyStats);

  const dailyRows = useMemo(() => calculateDailyRows(dailyStats), [dailyStats]);
  const topicSummaries = useMemo(() => summarizeTopics(topicMastery), [topicMastery]);
  const mistakeSummaries = useMemo(() => summarizeMistakes(mistakeStats, labels), [mistakeStats, labels]);
  const testSummaries = useMemo(() => summarizeTests(recentAttempts), [recentAttempts]);
  const recommendation = selectedChild
    ? calculateRecommendation(
      selectedChild,
      totalAttempts,
      overallAccuracy,
      currentStreak,
      todayStats?.attemptsCount ?? 0,
      dailyGoalTasks,
      topicSummaries,
      mistakeSummaries,
      labels
    )
    : "";
  const levelRecommendation = selectedChild
    ? recommendLevelAdjustmentFromMastery({ childProfile: selectedChild, mistakeStats, topicMastery })
    : null;
  const recommendedLevelName = levelRecommendation
    ? getLevelDisplayName(levelRecommendation.recommendedLevelId, locale)
    : "";
  const resetLevelName = getLevelDisplayName(resetLevelId, locale);

  function selectChild(childProfileId: string) {
    const nextSelectedChild = profiles.find((profile) => profile.id === childProfileId);

    setSelectedChildId(childProfileId);
    setSelectedChildProfileId(childProfileId);
    setResetLevelId(nextSelectedChild?.currentLevelId ?? "L0_DIAGNOSTIC");
    setDashboardAggregates(null);
    setRecentAttempts([]);
    setLevelError(false);
    setResetError(false);
    setResetConfirmOpen(false);
    setLastResetCount(null);
  }

  async function changeLevel(nextLevelId: LevelId) {
    if (!selectedChild || levelSaving || nextLevelId === selectedChild.currentLevelId) {
      return;
    }

    setLevelSaving(true);
    setLevelError(false);

    try {
      await updateChildLevel(selectedChild.id, nextLevelId);
      setProfiles((currentProfiles) =>
        currentProfiles.map((profile) =>
          profile.id === selectedChild.id
            ? {
              ...profile,
              currentLevelId: nextLevelId,
              updatedAt: new Date()
            }
            : profile
        )
      );
    } catch {
      setLevelError(true);
    } finally {
      setLevelSaving(false);
    }
  }

  async function resetLevelProgress() {
    if (!selectedChild || resetSaving) {
      return;
    }

    setResetSaving(true);
    setResetError(false);
    setLastResetCount(null);

    try {
      const deletedCount = await deleteAttemptsForLevel(selectedChild.id, resetLevelId);

      setRecentAttempts((currentAttempts) => currentAttempts.filter((attempt) => attempt.levelId !== resetLevelId));
      setDashboardAggregates((currentAggregates) =>
        currentAggregates
          ? {
            ...currentAggregates,
            mistakeStats: currentAggregates.mistakeStats.filter((stats) => stats.levelId !== resetLevelId),
            topicMastery: currentAggregates.topicMastery.filter((mastery) => mastery.levelId !== resetLevelId)
          }
          : currentAggregates
      );
      setLastResetCount(deletedCount);
      setResetConfirmOpen(false);
    } catch {
      setResetError(true);
    } finally {
      setResetSaving(false);
    }
  }

  if (authLoading || loadingProfiles) {
    return (
      <div className="flex min-h-48 items-center gap-3 text-sm font-semibold text-slate-600">
        <Loader2 aria-hidden="true" className="animate-spin" size={18} />
        {labels.loadingProfiles}
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <section className="rounded-lg border border-sky-200 bg-sky-50 p-5">
        <h2 className="text-xl font-bold text-slate-950">{labels.noChildrenTitle}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-700">{labels.noChildrenDescription}</p>
        <Link
          className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
          href="/parent/children"
        >
          {labels.createChildButton}
          <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </section>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:flex-row lg:items-end lg:justify-between">
        <div className="grid gap-2">
          <label className="text-sm font-bold text-slate-800" htmlFor="parent-dashboard-child">
            {labels.childSelectorLabel}
          </label>
          <select
            className="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            id="parent-dashboard-child"
            value={selectedChildId}
            onChange={(event) => selectChild(event.target.value)}
          >
            {profiles.map((profile) => (
              <option key={profile.id} value={profile.id}>
                {profile.displayName}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-1 text-sm text-slate-600 lg:text-right">
          <p className="font-semibold text-slate-950">
            {labels.currentLevel.replace("{level}", currentLevelName)}
          </p>
          <p>
            {labels.lastActivity}: {lastActivity ? formatDateOnly(lastActivity, locale) : labels.noActivity}
          </p>
          <p className="text-xs font-semibold uppercase text-slate-500">{labels.recentWindow}</p>
        </div>
      </div>

      {loadError ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-900">
          {labels.loadError}
        </div>
      ) : null}

      {loadingDashboard ? (
        <div className="flex min-h-32 items-center gap-3 rounded-lg border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-600">
          <Loader2 aria-hidden="true" className="animate-spin" size={18} />
          {labels.loadingDashboard}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        <MetricCard icon={CalendarDays} label={labels.cards.dailyStreak} value={String(currentStreak)} />
        <MetricCard icon={CheckCircle2} label={labels.cards.overallAccuracy} value={formatPercent(overallAccuracy)} />
        <MetricCard icon={Clock3} label={labels.cards.averageResponseTime} value={formatResponseTime(averageResponseTimeMs)} />
        <MetricCard icon={Activity} label={labels.cards.practiceMinutes} value={String(activeMinutes)} />
        <MetricCard icon={Target} label={labels.cards.tasksToday} value={`${todayStats?.attemptsCount ?? 0}/${dailyGoalTasks}`} />
        <MetricCard icon={BarChart3} label={labels.cards.currentLevel} value={currentLevelName} />
      </div>

      {totalAttempts === 0 ? (
        <section className="rounded-lg border border-sky-200 bg-sky-50 p-5">
          <h2 className="text-xl font-bold text-slate-950">{labels.sections.recommendedFocus}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-700">{labels.emptyStates.noAttempts}</p>
        </section>
      ) : null}

      <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
        <div className="flex items-start gap-3">
          <TrendingUp aria-hidden="true" className="mt-1 text-emerald-700" size={24} />
          <div>
            <h2 className="text-xl font-bold text-slate-950">{labels.sections.recommendedFocus}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">{recommendation}</p>
          </div>
        </div>
      </section>

      {selectedChild && levelRecommendation ? (
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase text-sky-700">{labels.sections.levelControl}</p>
              <h2 className="mt-2 text-xl font-bold text-slate-950">{labels.levelControl.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{labels.levelControl.description}</p>

              <div className="mt-4 grid gap-3 rounded-md border border-sky-200 bg-sky-50 p-4">
                <p className="text-sm font-bold text-sky-950">
                  {labels.levelControl.appRecommendation}: {labels.levelControl.actionLabels[levelRecommendation.action]}
                </p>
                <p className="text-sm leading-6 text-slate-700">
                  {labels.levelControl.recommendedLevel.replace("{level}", recommendedLevelName)}
                </p>
                <p className="text-sm leading-6 text-slate-700">
                  {labels.levelControl.reasons[levelRecommendation.reason]}
                </p>
                <p className="text-xs font-bold uppercase text-slate-500">
                  {fillTemplate(labels.levelControl.stats, {
                    accuracy: Math.round(levelRecommendation.accuracy * 100),
                    attempts: levelRecommendation.attemptsCount,
                    time: formatResponseTime(levelRecommendation.averageResponseTimeMs)
                  })}
                </p>
              </div>
            </div>

            <div className="w-full max-w-md rounded-md border border-slate-200 p-4">
              <p className="text-sm font-bold text-slate-950">
                {labels.levelControl.currentLevel.replace("{level}", currentLevelName)}
              </p>

              <label className="mt-4 grid gap-2 text-sm font-semibold text-slate-800">
                {labels.levelControl.manualSelectLabel}
                <select
                  className="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                  disabled={levelSaving}
                  value={selectedChild.currentLevelId}
                  onChange={(event) => {
                    if (isLevelId(event.target.value)) {
                      void changeLevel(event.target.value);
                    }
                  }}
                >
                  {LEVELS.map((level) => (
                    <option key={level.id} value={level.id}>
                      {getLevelDisplayName(level.id, locale)}
                    </option>
                  ))}
                </select>
              </label>

              {levelError ? (
                <p className="mt-3 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-800">
                  {labels.levelControl.saveError}
                </p>
              ) : null}

              <div className="mt-4 grid gap-2">
                <button
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={levelSaving || !previousLevel}
                  type="button"
                  onClick={() => {
                    if (previousLevel) {
                      void changeLevel(previousLevel.id);
                    }
                  }}
                >
                  <ArrowDown aria-hidden="true" size={16} />
                  {labels.levelControl.lowerLevel}
                </button>
                <button
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={levelSaving || !nextLevel}
                  type="button"
                  onClick={() => {
                    if (nextLevel) {
                      void changeLevel(nextLevel.id);
                    }
                  }}
                >
                  <ArrowUp aria-hidden="true" size={16} />
                  {labels.levelControl.raiseLevel}
                </button>
                <button
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={levelSaving || levelRecommendation.recommendedLevelId === selectedChild.currentLevelId}
                  type="button"
                  onClick={() => void changeLevel(levelRecommendation.recommendedLevelId)}
                >
                  {levelSaving ? <Loader2 aria-hidden="true" className="animate-spin" size={16} /> : <CheckCircle2 aria-hidden="true" size={16} />}
                  {levelSaving ? labels.levelControl.saving : labels.levelControl.applyRecommendation}
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {selectedChild ? (
        <section className="rounded-lg border border-amber-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase text-amber-700">{labels.levelReset.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{labels.levelReset.description}</p>
            </div>

            <div className="w-full max-w-md rounded-md border border-slate-200 p-4">
              <label className="grid gap-2 text-sm font-semibold text-slate-800">
                {labels.levelReset.selectLabel}
                <select
                  className="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                  disabled={resetSaving}
                  value={resetLevelId}
                  onChange={(event) => {
                    if (isLevelId(event.target.value)) {
                      setResetLevelId(event.target.value);
                      setResetConfirmOpen(false);
                      setResetError(false);
                      setLastResetCount(null);
                    }
                  }}
                >
                  {LEVELS.map((level) => (
                    <option key={level.id} value={level.id}>
                      {getLevelDisplayName(level.id, locale)}
                    </option>
                  ))}
                </select>
              </label>

              {resetError ? (
                <p className="mt-3 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-800">
                  {labels.levelReset.saveError}
                </p>
              ) : null}

              {lastResetCount !== null ? (
                <p className="mt-3 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm font-medium text-emerald-900">
                  {fillTemplate(labels.levelReset.success, { count: lastResetCount })}
                </p>
              ) : null}

              {resetConfirmOpen ? (
                <div className="mt-4 rounded-md border border-amber-300 bg-amber-50 p-4">
                  <h3 className="font-bold text-slate-950">{labels.levelReset.confirmTitle}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {fillTemplate(labels.levelReset.confirmDescription, { level: resetLevelName })}
                  </p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <button
                      className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={resetSaving}
                      type="button"
                      onClick={() => setResetConfirmOpen(false)}
                    >
                      {labels.levelReset.cancelButton}
                    </button>
                    <button
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-red-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
                      disabled={resetSaving}
                      type="button"
                      onClick={() => void resetLevelProgress()}
                    >
                      {resetSaving ? <Loader2 aria-hidden="true" className="animate-spin" size={16} /> : <Trash2 aria-hidden="true" size={16} />}
                      {resetSaving ? labels.levelReset.saving : labels.levelReset.confirmButton}
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-red-300 px-4 py-2 text-sm font-semibold text-red-800 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={resetSaving}
                  type="button"
                  onClick={() => setResetConfirmOpen(true)}
                >
                  <Trash2 aria-hidden="true" size={16} />
                  {labels.levelReset.deleteButton}
                </button>
              )}
            </div>
          </div>
        </section>
      ) : null}

      <div className="grid gap-4 xl:grid-cols-2">
        <ChartPanel title={labels.charts.accuracy}>
          <ResponsiveContainer height={260} width="100%">
            <LineChart data={dailyRows}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" tickLine={false} />
              <YAxis allowDecimals={false} domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
              <Tooltip formatter={(value) => [`${value}%`, labels.charts.accuracy]} />
              <Line dataKey="accuracy" dot={false} stroke="#047857" strokeWidth={3} type="monotone" />
            </LineChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel title={labels.charts.responseTime}>
          <ResponsiveContainer height={260} width="100%">
            <LineChart data={dailyRows}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" tickLine={false} />
              <YAxis allowDecimals={false} tickFormatter={(value) => `${value}s`} />
              <Tooltip formatter={(value) => [`${value}s`, labels.charts.responseTime]} />
              <Line dataKey="responseTimeSeconds" dot={false} stroke="#0369a1" strokeWidth={3} type="monotone" />
            </LineChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel title={labels.charts.attempts}>
          <ResponsiveContainer height={260} width="100%">
            <BarChart data={dailyRows}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" tickLine={false} />
              <YAxis allowDecimals={false} />
              <Tooltip formatter={(value) => [value, labels.charts.attempts]} />
              <Bar dataKey="tasks" fill="#0284c7" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel title={labels.charts.topicMastery}>
          <ResponsiveContainer height={260} width="100%">
            <BarChart data={topicSummaries.slice(0, 6).map((topic) => ({ ...topic, label: labels.topics[topic.topic] }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" tick={false} tickLine={false} />
              <YAxis allowDecimals={false} domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
              <Tooltip formatter={(value) => [`${value}%`, labels.charts.topicMastery]} labelFormatter={(label) => String(label)} />
              <Bar dataKey="masteryScore" fill="#7c3aed" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">{labels.sections.topicMastery}</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="border-b border-slate-200 text-xs uppercase text-slate-500">
                <tr>
                  <th className="py-3 pr-4">{labels.table.topic}</th>
                  <th className="py-3 pr-4">{labels.table.accuracy}</th>
                  <th className="py-3 pr-4">{labels.table.averageTime}</th>
                  <th className="py-3 pr-4">{labels.table.tasks}</th>
                </tr>
              </thead>
              <tbody>
                {topicSummaries.map((topic) => (
                  <tr key={topic.topic} className="border-b border-slate-100 last:border-0">
                    <td className="py-3 pr-4 font-semibold text-slate-950">{labels.topics[topic.topic]}</td>
                    <td className="py-3 pr-4 text-slate-700">{formatPercent(topic.accuracy)}</td>
                    <td className="py-3 pr-4 text-slate-700">{formatResponseTime(topic.averageResponseTimeMs)}</td>
                    <td className="py-3 pr-4 text-slate-700">{topic.attempts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">{labels.sections.commonMistakes}</h2>
          {mistakeSummaries.length === 0 ? (
            <p className="mt-3 text-sm leading-6 text-slate-600">{labels.emptyStates.noMistakes}</p>
          ) : (
            <div className="mt-4 grid gap-3">
              {mistakeSummaries.map((mistake) => (
                <article key={`${mistake.topic}-${mistake.operandKey}`} className="rounded-md border border-amber-200 bg-amber-50 p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle aria-hidden="true" className="mt-1 text-amber-700" size={18} />
                    <div>
                      <h3 className="font-bold text-slate-950">{mistake.operandKey}</h3>
                      <p className="mt-1 text-sm text-slate-700">
                        {labels.topics[mistake.topic]} · {labels.table.mistakes}: {mistake.wrongCount}/{mistake.totalCount} · {labels.table.errorRate}: {mistake.errorRate}%
                      </p>
                      <p className="mt-2 text-sm leading-6 text-amber-950">{mistake.likelyIssue}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold text-slate-950">{labels.sections.recentTests}</h2>
        {testSummaries.length === 0 ? (
          <p className="mt-3 text-sm leading-6 text-slate-600">{labels.emptyStates.noTests}</p>
        ) : (
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {testSummaries.map((test) => (
              <article key={test.sessionId} className="rounded-md border border-slate-200 p-4">
                <p className="text-sm font-semibold text-slate-500">{formatDateTime(test.createdAt, locale)}</p>
                <p className="mt-2 text-2xl font-bold text-slate-950">
                  {test.correctTasks}/{test.totalTasks}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {labels.table.averageTime}: {formatResponseTime(test.averageResponseTimeMs)}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      <p className="text-xs font-semibold uppercase text-slate-500">{labels.dataNote}</p>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <Icon aria-hidden="true" className="text-sky-700" size={22} />
      <p className="mt-3 text-xs font-bold uppercase text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-950">{value}</p>
    </article>
  );
}

function ChartPanel({ children, title }: { children: ReactNode; title: string }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-slate-950">{title}</h2>
      {children}
    </section>
  );
}
