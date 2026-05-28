"use client";

import { BookOpen, ClipboardCheck, Dumbbell, Gift, Loader2, Settings, Sparkles, Trophy } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ChildModeCard } from "@/components/child/ChildModeCard";
import { ChildStateMessage } from "@/components/child/ChildStateMessage";
import { useChildProfile } from "@/hooks/useChildProfile";
import { listAttemptsPage } from "@/lib/firestore";
import { getLevelDisplayName } from "@/lib/math-engine/levelDisplay";
import { toLocalDateKey } from "@/lib/utils/date";
import type { ExerciseAttempt, ExerciseMode, Locale } from "@/types";

type ChildHomeModeKey = "diagnostic" | "learn" | "practice" | "test" | "challenge" | "rewards";

type ChildHomeDashboardLabels = {
  area: string;
  homeTitle: string;
  loadingChild: string;
  loadingProgress: string;
  missingChild: string;
  parentArea: string;
  parentAreaDescription: string;
  dailyGoalTitle: string;
  dailyGoalProgress: string;
  dailyGoalComplete: string;
  currentLevel: string;
  todayAccuracy: string;
  attemptsToday: string;
  nextFocusTitle: string;
  nextFocusDiagnostic: string;
  nextFocusLearn: string;
  nextFocusPractice: string;
  nextFocusTest: string;
  nextFocusRewards: string;
  statuses: {
    startHere: string;
    ready: string;
    recommended: string;
    done: string;
    locked: string;
    todayCount: string;
    score: string;
    goal: string;
  };
  modes: Record<ChildHomeModeKey, { label: string; description: string }>;
};

type ChildHomeDashboardProps = {
  labels: ChildHomeDashboardLabels;
  locale: Locale;
};

const modeConfig = [
  {
    href: "/child/diagnostic",
    key: "diagnostic",
    icon: ClipboardCheck
  },
  {
    href: "/child/learn",
    key: "learn",
    icon: BookOpen
  },
  {
    href: "/child/practice",
    key: "practice",
    icon: Dumbbell
  },
  {
    href: "/child/test",
    key: "test",
    icon: Trophy
  },
  {
    href: "/child/challenge",
    key: "challenge",
    icon: Sparkles
  },
  {
    href: "/child/rewards",
    key: "rewards",
    icon: Gift
  }
] as const;

function attemptsForMode(attempts: ExerciseAttempt[], mode: ExerciseMode): ExerciseAttempt[] {
  return attempts.filter((attempt) => attempt.mode === mode);
}

export function ChildHomeDashboard({ labels, locale }: ChildHomeDashboardProps) {
  const { selectedChild, loading } = useChildProfile();
  const [recentAttempts, setRecentAttempts] = useState<ExerciseAttempt[]>([]);
  const [progressLoading, setProgressLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadProgress() {
      if (!selectedChild) {
        if (!cancelled) {
          setRecentAttempts([]);
        }
        return;
      }

      const activeChildProfileId = selectedChild.id;

      setProgressLoading(true);

      try {
        const attempts = await listAttemptsPage(activeChildProfileId, 60);

        if (!cancelled) {
          setRecentAttempts(attempts);
        }
      } catch {
        if (!cancelled) {
          setRecentAttempts([]);
        }
      } finally {
        if (!cancelled) {
          setProgressLoading(false);
        }
      }
    }

    void loadProgress();

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

  const activeChild = selectedChild;
  const currentLevelName = getLevelDisplayName(activeChild.currentLevelId, locale);
  const completedTasks = todayAttempts.length;
  const dailyGoalTasks = Math.max(1, activeChild.dailyGoalMinutes);
  const dailyGoalPercent = Math.min(100, (completedTasks / dailyGoalTasks) * 100);
  const correctToday = todayAttempts.filter((attempt) => attempt.isCorrect).length;
  const accuracyToday = todayAttempts.length === 0 ? 0 : Math.round((correctToday / todayAttempts.length) * 100);
  const practiceToday = attemptsForMode(todayAttempts, "practice");
  const testAttempts = attemptsForMode(recentAttempts, "test");
  const lastTestSessionId = testAttempts[0]?.sessionId;
  const lastTestAttempts = lastTestSessionId ? testAttempts.filter((attempt) => attempt.sessionId === lastTestSessionId) : [];
  const lastTestCorrect = lastTestAttempts.filter((attempt) => attempt.isCorrect).length;

  const nextFocus = !activeChild.diagnosticCompletedAt
    ? labels.nextFocusDiagnostic
    : practiceToday.length === 0
      ? labels.nextFocusPractice
      : testAttempts.length === 0
        ? labels.nextFocusTest
        : completedTasks < dailyGoalTasks
          ? labels.nextFocusLearn
          : labels.nextFocusRewards;

  function statusForMode(mode: ChildHomeModeKey): string {
    if (mode === "diagnostic") {
      return activeChild.diagnosticCompletedAt ? labels.statuses.done : labels.statuses.startHere;
    }

    if (!activeChild.diagnosticCompletedAt && mode !== "rewards") {
      return labels.statuses.locked;
    }

    if (mode === "learn") {
      return completedTasks < dailyGoalTasks ? labels.statuses.recommended : labels.statuses.ready;
    }

    if (mode === "practice") {
      return labels.statuses.todayCount.replace("{count}", String(practiceToday.length)).replace("{total}", "10");
    }

    if (mode === "test") {
      return lastTestAttempts.length > 0
        ? labels.statuses.score.replace("{correct}", String(lastTestCorrect)).replace("{total}", String(lastTestAttempts.length))
        : labels.statuses.ready;
    }

    if (mode === "challenge") {
      return labels.statuses.ready;
    }

    return labels.statuses.goal.replace("{completed}", String(completedTasks)).replace("{goal}", String(dailyGoalTasks));
  }

  function toneForMode(mode: ChildHomeModeKey): "default" | "recommended" | "locked" {
    if (!activeChild.diagnosticCompletedAt && mode !== "diagnostic" && mode !== "rewards") {
      return "locked";
    }

    if (!activeChild.diagnosticCompletedAt && mode === "diagnostic") {
      return "recommended";
    }

    if (activeChild.diagnosticCompletedAt && mode === "practice" && practiceToday.length === 0) {
      return "recommended";
    }

    return "default";
  }

  return (
    <section className="py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-sky-700">{labels.area}</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">{labels.homeTitle}</h1>
          <p className="mt-2 text-sm font-semibold text-slate-600">
            {activeChild.displayName} - {labels.currentLevel.replace("{level}", currentLevelName)}
          </p>
        </div>
        <Link
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          href="/parent/pin?next=/parent/dashboard"
        >
          <Settings aria-hidden="true" size={18} />
          {labels.parentArea}
        </Link>
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(260px,340px)]">
        <section className="rounded-lg border border-emerald-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-950">{labels.dailyGoalTitle}</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                {labels.dailyGoalProgress.replace("{completed}", String(completedTasks)).replace("{goal}", String(dailyGoalTasks))}
              </p>
            </div>
            <p className="text-sm font-bold text-emerald-700">
              {dailyGoalPercent >= 100 ? labels.dailyGoalComplete : `${Math.round(dailyGoalPercent)}%`}
            </p>
          </div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full rounded-full bg-emerald-600 transition-all" style={{ width: `${dailyGoalPercent}%` }} />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <p className="rounded-md bg-sky-50 p-3 text-sm font-semibold text-sky-950">
              {labels.attemptsToday.replace("{count}", String(todayAttempts.length))}
            </p>
            <p className="rounded-md bg-sky-50 p-3 text-sm font-semibold text-sky-950">
              {labels.todayAccuracy.replace("{accuracy}", String(accuracyToday))}
            </p>
          </div>
        </section>

        <aside className="rounded-lg border border-sky-200 bg-sky-50 p-5">
          <h2 className="text-lg font-bold text-slate-950">{labels.nextFocusTitle}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-700">{nextFocus}</p>
          <p className="mt-4 text-xs font-semibold uppercase text-slate-500">
            {progressLoading ? labels.loadingProgress : labels.parentAreaDescription}
          </p>
        </aside>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modeConfig.map((mode) => {
          const text = labels.modes[mode.key];

          return (
            <ChildModeCard
              key={mode.href}
              description={text.description}
              href={mode.href}
              icon={mode.icon}
              label={text.label}
              status={statusForMode(mode.key)}
              tone={toneForMode(mode.key)}
            />
          );
        })}
      </div>
    </section>
  );
}
