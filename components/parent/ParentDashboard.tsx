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
import { listAttemptsPage, listChildProfiles, updateChildLevel } from "@/lib/firestore";
import { getOperandKey, recommendLevelAdjustment } from "@/lib/math-engine";
import { getLevelDisplayName } from "@/lib/math-engine/levelDisplay";
import { getSelectedChildProfileId, setSelectedChildProfileId } from "@/lib/utils/childSelection";
import { toLocalDateKey } from "@/lib/utils/date";
import type { ChildProfile, ExerciseAttempt, ExerciseMode, LevelId, Locale, MathTopic } from "@/types";

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

const dashboardAttemptPageSize = 120;
const chartDays = 14;

function dateKeyForOffset(daysAgo: number): string {
  const date = new Date();

  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - daysAgo);

  return toLocalDateKey(date);
}

function calculateCurrentStreak(attempts: ExerciseAttempt[]): number {
  const activeDateKeys = new Set(attempts.map((attempt) => toLocalDateKey(attempt.createdAt)));
  const todayKey = dateKeyForOffset(0);
  const yesterdayKey = dateKeyForOffset(1);

  if (!activeDateKeys.has(todayKey) && !activeDateKeys.has(yesterdayKey)) {
    return 0;
  }

  const startOffset = activeDateKeys.has(todayKey) ? 0 : 1;
  let streak = 0;

  for (let offset = startOffset; offset < chartDays * 3; offset += 1) {
    if (!activeDateKeys.has(dateKeyForOffset(offset))) {
      break;
    }

    streak += 1;
  }

  return streak;
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

function calculateDailyRows(attempts: ExerciseAttempt[]): DailyChartRow[] {
  const dateKeys = Array.from({ length: chartDays }, (_, index) => dateKeyForOffset(chartDays - 1 - index));

  return dateKeys.map((dateKey) => {
    const dayAttempts = attempts.filter((attempt) => toLocalDateKey(attempt.createdAt) === dateKey);
    const correct = dayAttempts.filter((attempt) => attempt.isCorrect).length;
    const totalResponseTimeMs = dayAttempts.reduce((total, attempt) => total + attempt.responseTimeMs, 0);

    return {
      dateKey,
      label: formatDateLabel(dateKey),
      accuracy: dayAttempts.length === 0 ? 0 : Math.round((correct / dayAttempts.length) * 100),
      responseTimeSeconds: dayAttempts.length === 0 ? 0 : Number((totalResponseTimeMs / dayAttempts.length / 1000).toFixed(1)),
      tasks: dayAttempts.length
    };
  });
}

function summarizeTopics(attempts: ExerciseAttempt[]): TopicSummary[] {
  const grouped = new Map<MathTopic, ExerciseAttempt[]>();

  for (const attempt of attempts) {
    grouped.set(attempt.topic, [...(grouped.get(attempt.topic) ?? []), attempt]);
  }

  return [...grouped.entries()]
    .map(([topic, topicAttempts]) => {
      const correct = topicAttempts.filter((attempt) => attempt.isCorrect).length;
      const totalResponseTimeMs = topicAttempts.reduce((total, attempt) => total + attempt.responseTimeMs, 0);

      return {
        topic,
        attempts: topicAttempts.length,
        correct,
        accuracy: topicAttempts.length === 0 ? 0 : Math.round((correct / topicAttempts.length) * 100),
        averageResponseTimeMs: topicAttempts.length === 0 ? 0 : Math.round(totalResponseTimeMs / topicAttempts.length),
        mistakes: topicAttempts.length - correct
      };
    })
    .sort((a, b) => a.accuracy - b.accuracy || b.attempts - a.attempts);
}

function summarizeMistakes(attempts: ExerciseAttempt[], labels: ParentDashboardLabels): MistakeSummary[] {
  const grouped = new Map<string, ExerciseAttempt[]>();

  for (const attempt of attempts) {
    const key = `${attempt.topic}:${getOperandKey(attempt.operands, attempt.operator)}`;
    grouped.set(key, [...(grouped.get(key) ?? []), attempt]);
  }

  return [...grouped.values()]
    .map((groupAttempts) => {
      const firstAttempt = groupAttempts[0];
      const wrongCount = groupAttempts.filter((attempt) => !attempt.isCorrect).length;
      const totalCount = groupAttempts.length;
      const operandKey = firstAttempt ? getOperandKey(firstAttempt.operands, firstAttempt.operator) : "";
      const topic = firstAttempt?.topic ?? "addition_to_5";
      const make10Like =
        topic === "make_10"
        || groupAttempts.some((attempt) => attempt.operator === "+" && attempt.operands.reduce((sum, operand) => sum + operand, 0) === 10);
      const slowCorrect = groupAttempts.some((attempt) => attempt.isCorrect && attempt.responseTimeMs > 8000);

      return {
        operandKey,
        topic,
        wrongCount,
        totalCount,
        errorRate: totalCount === 0 ? 0 : Math.round((wrongCount / totalCount) * 100),
        likelyIssue: make10Like
          ? labels.insights.make10Issue
          : slowCorrect
            ? labels.insights.slowButCorrect
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
  const [attempts, setAttempts] = useState<ExerciseAttempt[]>([]);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [loadingAttempts, setLoadingAttempts] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [levelSaving, setLevelSaving] = useState(false);
  const [levelError, setLevelError] = useState(false);

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

          if (nextSelectedChild) {
            setSelectedChildProfileId(nextSelectedChild.id);
          } else {
            setAttempts([]);
          }
        }
      } catch {
        if (!cancelled) {
          setLoadError(true);
          setProfiles([]);
          setSelectedChildId("");
          setAttempts([]);
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

    async function loadAttempts() {
      setLoadingAttempts(true);
      setLoadError(false);

      try {
        const nextAttempts = await listAttemptsPage(selectedChildId, dashboardAttemptPageSize);

        if (!cancelled) {
          setAttempts(nextAttempts);
        }
      } catch {
        if (!cancelled) {
          setLoadError(true);
          setAttempts([]);
        }
      } finally {
        if (!cancelled) {
          setLoadingAttempts(false);
        }
      }
    }

    void loadAttempts();

    return () => {
      cancelled = true;
    };
  }, [selectedChildId]);

  const selectedChild = profiles.find((profile) => profile.id === selectedChildId) ?? null;
  const todayKey = toLocalDateKey();
  const todayAttempts = attempts.filter((attempt) => toLocalDateKey(attempt.createdAt) === todayKey);
  const totalAttempts = attempts.length;
  const correctAttempts = attempts.filter((attempt) => attempt.isCorrect).length;
  const totalResponseTimeMs = attempts.reduce((total, attempt) => total + attempt.responseTimeMs, 0);
  const overallAccuracy = totalAttempts === 0 ? 0 : Math.round((correctAttempts / totalAttempts) * 100);
  const averageResponseTimeMs = totalAttempts === 0 ? 0 : Math.round(totalResponseTimeMs / totalAttempts);
  const activeMinutes = totalAttempts === 0 ? 0 : Math.max(1, Math.ceil(totalResponseTimeMs / 60000));
  const currentStreak = calculateCurrentStreak(attempts);
  const dailyGoalTasks = selectedChild ? Math.max(1, selectedChild.dailyGoalMinutes) : 1;
  const currentLevelName = selectedChild ? getLevelDisplayName(selectedChild.currentLevelId, locale) : "";
  const currentLevelIndex = selectedChild ? getLevelIndex(selectedChild.currentLevelId) : 0;
  const previousLevel = LEVELS[currentLevelIndex - 1];
  const nextLevel = LEVELS[currentLevelIndex + 1];
  const lastActivity = attempts[0]?.createdAt;

  const dailyRows = useMemo(() => calculateDailyRows(attempts), [attempts]);
  const topicSummaries = useMemo(() => summarizeTopics(attempts), [attempts]);
  const mistakeSummaries = useMemo(() => summarizeMistakes(attempts, labels), [attempts, labels]);
  const testSummaries = useMemo(() => summarizeTests(attempts), [attempts]);
  const recommendation = selectedChild
    ? calculateRecommendation(
      selectedChild,
      totalAttempts,
      overallAccuracy,
      currentStreak,
      todayAttempts.length,
      dailyGoalTasks,
      topicSummaries,
      mistakeSummaries,
      labels
    )
    : "";
  const levelRecommendation = selectedChild
    ? recommendLevelAdjustment({ childProfile: selectedChild, attempts })
    : null;
  const recommendedLevelName = levelRecommendation
    ? getLevelDisplayName(levelRecommendation.recommendedLevelId, locale)
    : "";

  function selectChild(childProfileId: string) {
    setSelectedChildId(childProfileId);
    setSelectedChildProfileId(childProfileId);
    setAttempts([]);
    setLevelError(false);
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
            {labels.lastActivity}: {lastActivity ? formatDateTime(lastActivity, locale) : labels.noActivity}
          </p>
          <p className="text-xs font-semibold uppercase text-slate-500">{labels.recentWindow}</p>
        </div>
      </div>

      {loadError ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-900">
          {labels.loadError}
        </div>
      ) : null}

      {loadingAttempts ? (
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
        <MetricCard icon={Target} label={labels.cards.tasksToday} value={`${todayAttempts.length}/${dailyGoalTasks}`} />
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
              <Tooltip formatter={(value) => [`${value}%`, labels.table.accuracy]} labelFormatter={(label) => String(label)} />
              <Bar dataKey="accuracy" fill="#7c3aed" radius={[6, 6, 0, 0]} />
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
