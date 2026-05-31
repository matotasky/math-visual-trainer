"use client";

import {
  ArrowRight,
  Award,
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  Flame,
  Home,
  Loader2,
  Sparkles,
  Star,
  Target,
  Trophy,
  type LucideIcon,
  Zap
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ChildStateMessage } from "@/components/child/ChildStateMessage";
import { useChildProfile } from "@/hooks/useChildProfile";
import { listAttemptsPage } from "@/lib/firestore";
import { getLevelDisplayName } from "@/lib/math-engine/levelDisplay";
import { toLocalDateKey } from "@/lib/utils/date";
import type { ExerciseAttempt, ExerciseMode, Locale } from "@/types";

type RewardBadgeLabels = {
  title: string;
  description: string;
  progress: string;
};

type RewardsDashboardLabels = {
  title: string;
  description: string;
  loadingChild: string;
  loadingRewards: string;
  missingChild: string;
  loadError: string;
  currentLevel: string;
  rewardPoints: string;
  currentStreak: string;
  longestStreak: string;
  tasksToday: string;
  accuracyToday: string;
  dailyGoalTitle: string;
  dailyGoalProgress: string;
  dailyGoalComplete: string;
  keepGoingTitle: string;
  keepGoingDescription: string;
  emptyTitle: string;
  emptyDescription: string;
  badgesTitle: string;
  badgesDescription: string;
  unlocked: string;
  locked: string;
  backToChild: string;
  practiceButton: string;
  diagnosticButton: string;
  badges: {
    diagnostic: RewardBadgeLabels;
    firstTask: RewardBadgeLabels;
    dailyGoal: RewardBadgeLabels;
    accuracyDay: RewardBadgeLabels;
    streak3: RewardBadgeLabels;
    challenge: RewardBadgeLabels;
    testComplete: RewardBadgeLabels;
    hundredTasks: RewardBadgeLabels;
  };
};

type RewardsDashboardProps = {
  labels: RewardsDashboardLabels;
  locale: Locale;
};

type RewardBadge = {
  id: keyof RewardsDashboardLabels["badges"];
  icon: LucideIcon;
  labels: RewardBadgeLabels;
  unlocked: boolean;
  progress: string;
};

const rewardsAttemptPageSize = 120;
const millisecondsPerDay = 24 * 60 * 60 * 1000;

function attemptsForMode(attempts: ExerciseAttempt[], mode: ExerciseMode): ExerciseAttempt[] {
  return attempts.filter((attempt) => attempt.mode === mode);
}

function dateKeyForOffset(daysAgo: number): string {
  const date = new Date();

  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - daysAgo);

  return toLocalDateKey(date);
}

function dateKeyToDayNumber(dateKey: string): number {
  const [year = "0", month = "1", day = "1"] = dateKey.split("-");

  return Date.UTC(Number(year), Number(month) - 1, Number(day)) / millisecondsPerDay;
}

function calculateCurrentStreak(activeDateKeys: Set<string>): number {
  const todayKey = dateKeyForOffset(0);
  const yesterdayKey = dateKeyForOffset(1);

  if (!activeDateKeys.has(todayKey) && !activeDateKeys.has(yesterdayKey)) {
    return 0;
  }

  const startOffset = activeDateKeys.has(todayKey) ? 0 : 1;
  let streak = 0;

  for (let offset = startOffset; offset < 60; offset += 1) {
    if (!activeDateKeys.has(dateKeyForOffset(offset))) {
      break;
    }

    streak += 1;
  }

  return streak;
}

function calculateLongestStreak(activeDateKeys: Set<string>): number {
  const dayNumbers = [...activeDateKeys].map(dateKeyToDayNumber).sort((a, b) => a - b);
  let longestStreak = 0;
  let currentStreak = 0;
  let previousDay: number | null = null;

  for (const dayNumber of dayNumbers) {
    currentStreak = previousDay === null || dayNumber === previousDay + 1 ? currentStreak + 1 : 1;
    longestStreak = Math.max(longestStreak, currentStreak);
    previousDay = dayNumber;
  }

  return longestStreak;
}

function fillTemplate(template: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce(
    (current, [key, value]) => current.replace(`{${key}}`, String(value)),
    template
  );
}

function badgeTone(unlocked: boolean): string {
  return unlocked
    ? "border-emerald-200 bg-emerald-50"
    : "border-slate-200 bg-white";
}

export function RewardsDashboard({ labels, locale }: RewardsDashboardProps) {
  const { selectedChild, loading } = useChildProfile();
  const [recentAttempts, setRecentAttempts] = useState<ExerciseAttempt[]>([]);
  const [rewardsLoading, setRewardsLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadRewards() {
      if (!selectedChild) {
        if (!cancelled) {
          setRecentAttempts([]);
        }
        return;
      }

      setRewardsLoading(true);
      setLoadError(false);

      try {
        const attempts = await listAttemptsPage(selectedChild.id, rewardsAttemptPageSize);

        if (!cancelled) {
          setRecentAttempts(attempts);
        }
      } catch {
        if (!cancelled) {
          setRecentAttempts([]);
          setLoadError(true);
        }
      } finally {
        if (!cancelled) {
          setRewardsLoading(false);
        }
      }
    }

    void loadRewards();

    return () => {
      cancelled = true;
    };
  }, [selectedChild]);

  const todayAttempts = useMemo(() => {
    const todayKey = toLocalDateKey();

    return recentAttempts.filter((attempt) => toLocalDateKey(attempt.createdAt) === todayKey);
  }, [recentAttempts]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center gap-3 text-sm font-medium text-slate-600">
        <Loader2 aria-hidden="true" className="animate-spin" size={18} />
        {labels.loadingChild}
      </div>
    );
  }

  if (!selectedChild) {
    return <ChildStateMessage message={labels.missingChild} />;
  }

  const currentLevelName = getLevelDisplayName(selectedChild.currentLevelId, locale);
  const activeDateKeys = new Set(recentAttempts.map((attempt) => toLocalDateKey(attempt.createdAt)));
  const currentStreak = calculateCurrentStreak(activeDateKeys);
  const longestStreak = calculateLongestStreak(activeDateKeys);
  const dailyGoalTasks = Math.max(1, selectedChild.dailyGoalMinutes);
  const tasksToday = todayAttempts.length;
  const correctToday = todayAttempts.filter((attempt) => attempt.isCorrect).length;
  const accuracyToday = tasksToday === 0 ? 0 : Math.round((correctToday / tasksToday) * 100);
  const dailyGoalPercent = Math.min(100, (tasksToday / dailyGoalTasks) * 100);
  const goalComplete = tasksToday >= dailyGoalTasks;
  const correctTasks = recentAttempts.filter((attempt) => attempt.isCorrect).length;
  const challengeAttempts = attemptsForMode(recentAttempts, "challenge");
  const challengeAttemptsToday = attemptsForMode(todayAttempts, "challenge");
  const testSessionsCount = new Set(attemptsForMode(recentAttempts, "test").map((attempt) => attempt.sessionId)).size;
  const challengeXp = challengeAttempts.reduce((total, attempt) => total + (attempt.isCorrect ? 10 : 2), 0);
  const rewardPoints =
    correctTasks * 5
    + challengeXp
    + (selectedChild.diagnosticCompletedAt ? 10 : 0)
    + currentStreak * 10
    + (goalComplete ? 20 : 0);
  const totalTasks = recentAttempts.length;
  const hasAnyTask = totalTasks > 0;

  const badges: RewardBadge[] = [
    {
      id: "diagnostic",
      icon: BadgeCheck,
      labels: labels.badges.diagnostic,
      unlocked: Boolean(selectedChild.diagnosticCompletedAt),
      progress: fillTemplate(labels.badges.diagnostic.progress, {
        current: selectedChild.diagnosticCompletedAt ? 1 : 0,
        target: 1
      })
    },
    {
      id: "firstTask",
      icon: Star,
      labels: labels.badges.firstTask,
      unlocked: hasAnyTask,
      progress: fillTemplate(labels.badges.firstTask.progress, {
        current: Math.min(totalTasks, 1),
        target: 1
      })
    },
    {
      id: "dailyGoal",
      icon: Target,
      labels: labels.badges.dailyGoal,
      unlocked: goalComplete,
      progress: fillTemplate(labels.badges.dailyGoal.progress, {
        current: Math.min(tasksToday, dailyGoalTasks),
        target: dailyGoalTasks
      })
    },
    {
      id: "accuracyDay",
      icon: CheckCircle2,
      labels: labels.badges.accuracyDay,
      unlocked: tasksToday >= 5 && accuracyToday >= 80,
      progress: fillTemplate(labels.badges.accuracyDay.progress, {
        accuracy: accuracyToday,
        current: Math.min(tasksToday, 5),
        target: 5
      })
    },
    {
      id: "streak3",
      icon: Flame,
      labels: labels.badges.streak3,
      unlocked: currentStreak >= 3,
      progress: fillTemplate(labels.badges.streak3.progress, {
        current: Math.min(currentStreak, 3),
        target: 3
      })
    },
    {
      id: "challenge",
      icon: Zap,
      labels: labels.badges.challenge,
      unlocked: challengeAttemptsToday.length > 0,
      progress: fillTemplate(labels.badges.challenge.progress, {
        current: Math.min(challengeAttemptsToday.length, 1),
        target: 1
      })
    },
    {
      id: "testComplete",
      icon: Trophy,
      labels: labels.badges.testComplete,
      unlocked: testSessionsCount > 0,
      progress: fillTemplate(labels.badges.testComplete.progress, {
        current: Math.min(testSessionsCount, 1),
        target: 1
      })
    },
    {
      id: "hundredTasks",
      icon: Award,
      labels: labels.badges.hundredTasks,
      unlocked: totalTasks >= 100,
      progress: fillTemplate(labels.badges.hundredTasks.progress, {
        current: Math.min(totalTasks, 100),
        target: 100
      })
    }
  ];

  return (
    <section className="py-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase text-sky-700">
            {labels.currentLevel.replace("{level}", currentLevelName)}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">{labels.title}</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700">{labels.description}</p>
        </div>
        <Link
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          href="/child"
        >
          <Home aria-hidden="true" size={18} />
          {labels.backToChild}
        </Link>
      </div>

      {loadError ? (
        <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-900">
          {labels.loadError}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-lg border border-sky-200 bg-white p-5 shadow-sm">
          <Sparkles aria-hidden="true" className="text-sky-700" size={26} />
          <p className="mt-4 text-sm font-bold uppercase text-slate-500">{labels.rewardPoints}</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{rewardPoints}</p>
        </article>
        <article className="rounded-lg border border-emerald-200 bg-white p-5 shadow-sm">
          <Flame aria-hidden="true" className="text-emerald-700" size={26} />
          <p className="mt-4 text-sm font-bold uppercase text-slate-500">{labels.currentStreak}</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{currentStreak}</p>
        </article>
        <article className="rounded-lg border border-amber-200 bg-white p-5 shadow-sm">
          <CalendarCheck aria-hidden="true" className="text-amber-700" size={26} />
          <p className="mt-4 text-sm font-bold uppercase text-slate-500">{labels.longestStreak}</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{longestStreak}</p>
        </article>
        <article className="rounded-lg border border-violet-200 bg-white p-5 shadow-sm">
          <CheckCircle2 aria-hidden="true" className="text-violet-700" size={26} />
          <p className="mt-4 text-sm font-bold uppercase text-slate-500">{labels.accuracyToday}</p>
          <p className="mt-2 text-3xl font-bold text-slate-950">{accuracyToday}%</p>
        </article>
      </div>

      <section className="mt-5 rounded-lg border border-emerald-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-950">{labels.dailyGoalTitle}</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {fillTemplate(labels.dailyGoalProgress, { completed: tasksToday, goal: dailyGoalTasks })}
            </p>
          </div>
          <p className="text-sm font-bold text-emerald-700">
            {goalComplete ? labels.dailyGoalComplete : labels.tasksToday.replace("{count}", String(tasksToday))}
          </p>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-emerald-600 transition-all" style={{ width: `${dailyGoalPercent}%` }} />
        </div>
      </section>

      {!hasAnyTask && !selectedChild.diagnosticCompletedAt ? (
        <section className="mt-5 rounded-lg border border-sky-200 bg-sky-50 p-5">
          <h2 className="text-xl font-bold text-slate-950">{labels.emptyTitle}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-700">{labels.emptyDescription}</p>
          <Link
            className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            href="/child/diagnostic"
          >
            {labels.diagnosticButton}
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </section>
      ) : null}

      <section className="mt-8">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">{labels.badgesTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{labels.badgesDescription}</p>
          </div>
          {rewardsLoading ? (
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600">
              <Loader2 aria-hidden="true" className="animate-spin" size={16} />
              {labels.loadingRewards}
            </p>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {badges.map((badge) => {
            const Icon = badge.icon;

            return (
              <article key={badge.id} className={`rounded-lg border p-5 shadow-sm ${badgeTone(badge.unlocked)}`}>
                <div className="flex items-start justify-between gap-3">
                  <Icon aria-hidden="true" className={badge.unlocked ? "text-emerald-700" : "text-slate-400"} size={28} />
                  <span
                    className={
                      badge.unlocked
                        ? "rounded-md bg-emerald-700 px-2 py-1 text-xs font-bold uppercase text-white"
                        : "rounded-md bg-slate-100 px-2 py-1 text-xs font-bold uppercase text-slate-600"
                    }
                  >
                    {badge.unlocked ? labels.unlocked : labels.locked}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-950">{badge.labels.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{badge.labels.description}</p>
                <p className="mt-4 text-sm font-bold text-slate-800">{badge.progress}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-8 rounded-lg border border-sky-200 bg-sky-50 p-5">
        <h2 className="text-xl font-bold text-slate-950">{labels.keepGoingTitle}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-700">{labels.keepGoingDescription}</p>
        <Link
          className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
          href={selectedChild.diagnosticCompletedAt ? "/child/practice" : "/child/diagnostic"}
        >
          {selectedChild.diagnosticCompletedAt ? labels.practiceButton : labels.diagnosticButton}
          <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </section>
    </section>
  );
}
