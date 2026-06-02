"use client";

import {
  Activity,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Layers3,
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
import { summarizeProgress } from "@/lib/analytics";
import { listAttemptsPage, listChildProfiles } from "@/lib/firestore";
import { recommendLevelAdjustment } from "@/lib/math-engine";
import { getLevelDisplayName } from "@/lib/math-engine/levelDisplay";
import { getSelectedChildProfileId, setSelectedChildProfileId } from "@/lib/utils/childSelection";
import { useAuth } from "@/hooks/useAuth";
import type { ChildProfile, ExerciseAttempt, LevelId, Locale, MathTopic } from "@/types";
import type { LevelAdjustmentAction, LevelAdjustmentReason } from "@/lib/math-engine/levelAdjustment";

type DateFilter = "all" | "7" | "14" | "30";

type ParentProgressLabels = {
  title: string;
  description: string;
  loadingProfiles: string;
  loadingProgress: string;
  loadError: string;
  noChildrenTitle: string;
  noChildrenDescription: string;
  createChildButton: string;
  childSelectorLabel: string;
  dateFilterLabel: string;
  allDates: string;
  last7Days: string;
  last14Days: string;
  last30Days: string;
  currentBadge: string;
  currentLevel: string;
  lastActivity: string;
  noActivity: string;
  dataNote: string;
  emptyTitle: string;
  emptyDescription: string;
  cards: {
    currentStreak: string;
    longestStreak: string;
    activeDays: string;
    totalTasks: string;
    overallAccuracy: string;
    averageResponseTime: string;
    currentLevel: string;
  };
  charts: {
    attemptsPerDay: string;
    accuracyOverTime: string;
    responseTime: string;
    masteryByTopic: string;
  };
  sections: {
    recommendation: string;
    levelProgress: string;
    topicProgress: string;
    dailyActivity: string;
  };
  table: {
    date: string;
    tasks: string;
    accuracy: string;
    correct: string;
    averageTime: string;
    topic: string;
    mastery: string;
    level: string;
  };
  levelRecommendation: {
    title: string;
    currentLevel: string;
    recommendedLevel: string;
    appRecommendation: string;
    stats: string;
    actionLabels: Record<LevelAdjustmentAction, string>;
    reasons: Record<LevelAdjustmentReason, string>;
  };
  topics: Record<MathTopic, string>;
};

type ParentProgressProps = {
  labels: ParentProgressLabels;
  locale: Locale;
};

const progressAttemptPageSize = 320;

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

function matchesDateFilter(date: Date, filter: DateFilter): boolean {
  if (filter === "all") {
    return true;
  }

  const days = Number(filter);
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  startDate.setDate(startDate.getDate() - (days - 1));

  return date >= startDate;
}

function dayCountForFilter(filter: DateFilter): number {
  return filter === "7" ? 7 : filter === "14" ? 14 : 30;
}

function fillTemplate(template: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce(
    (current, [key, value]) => current.replace(`{${key}}`, String(value)),
    template
  );
}

export function ParentProgress({ labels, locale }: ParentProgressProps) {
  const { firebaseUser, loading: authLoading } = useAuth();
  const [profiles, setProfiles] = useState<ChildProfile[]>([]);
  const [selectedChildId, setSelectedChildId] = useState("");
  const [attempts, setAttempts] = useState<ExerciseAttempt[]>([]);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [dateFilter, setDateFilter] = useState<DateFilter>("30");

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
          }
        }
      } catch {
        if (!cancelled) {
          setLoadError(true);
          setProfiles([]);
          setSelectedChildId("");
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
      setLoadingProgress(true);
      setLoadError(false);

      try {
        const nextAttempts = await listAttemptsPage(selectedChildId, progressAttemptPageSize);

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
          setLoadingProgress(false);
        }
      }
    }

    void loadAttempts();

    return () => {
      cancelled = true;
    };
  }, [selectedChildId]);

  const selectedChild = profiles.find((profile) => profile.id === selectedChildId) ?? null;
  const filteredAttempts = useMemo(
    () => attempts.filter((attempt) => matchesDateFilter(attempt.createdAt, dateFilter)),
    [attempts, dateFilter]
  );
  const progress = useMemo(
    () => summarizeProgress(filteredAttempts, dayCountForFilter(dateFilter)),
    [dateFilter, filteredAttempts]
  );
  const levelRecommendation = selectedChild
    ? recommendLevelAdjustment({ childProfile: selectedChild, attempts: filteredAttempts })
    : null;
  const currentLevelName = selectedChild ? getLevelDisplayName(selectedChild.currentLevelId, locale) : "";
  const recommendedLevelName = levelRecommendation
    ? getLevelDisplayName(levelRecommendation.recommendedLevelId, locale)
    : "";
  const activeDailyRows = progress.dailyRows.filter((row) => row.attempts > 0).slice(-10).reverse();

  function selectChild(childProfileId: string) {
    setSelectedChildId(childProfileId);
    setSelectedChildProfileId(childProfileId);
    setAttempts([]);
    setLoadError(false);
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
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[minmax(220px,320px)_1fr]">
          <label className="grid gap-2 text-sm font-bold text-slate-800">
            {labels.childSelectorLabel}
            <select
              className="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
              value={selectedChildId}
              onChange={(event) => selectChild(event.target.value)}
            >
              {profiles.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.displayName}
                </option>
              ))}
            </select>
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-slate-800">
              {labels.dateFilterLabel}
              <select
                className="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                value={dateFilter}
                onChange={(event) => setDateFilter(event.target.value as DateFilter)}
              >
                <option value="30">{labels.last30Days}</option>
                <option value="14">{labels.last14Days}</option>
                <option value="7">{labels.last7Days}</option>
                <option value="all">{labels.allDates}</option>
              </select>
            </label>
            <div className="grid content-end gap-1 text-sm text-slate-600 sm:text-right">
              <p className="font-semibold text-slate-950">
                {labels.currentLevel.replace("{level}", currentLevelName)}
              </p>
              <p>
                {labels.lastActivity}: {progress.lastActivityAt ? formatDateTime(progress.lastActivityAt, locale) : labels.noActivity}
              </p>
            </div>
          </div>
        </div>
      </section>

      {loadError ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-900">
          {labels.loadError}
        </div>
      ) : null}

      {loadingProgress ? (
        <div className="flex min-h-24 items-center gap-3 rounded-lg border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-600">
          <Loader2 aria-hidden="true" className="animate-spin" size={18} />
          {labels.loadingProgress}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-7">
        <ProgressMetric icon={CalendarDays} label={labels.cards.currentStreak} value={String(progress.currentStreak)} />
        <ProgressMetric icon={TrendingUp} label={labels.cards.longestStreak} value={String(progress.longestStreak)} />
        <ProgressMetric icon={Activity} label={labels.cards.activeDays} value={String(progress.activeDays)} />
        <ProgressMetric icon={Target} label={labels.cards.totalTasks} value={String(progress.totalAttempts)} />
        <ProgressMetric icon={CheckCircle2} label={labels.cards.overallAccuracy} value={formatPercent(progress.overallAccuracy)} />
        <ProgressMetric icon={Clock3} label={labels.cards.averageResponseTime} value={formatResponseTime(progress.averageResponseTimeMs)} />
        <ProgressMetric icon={Layers3} label={labels.cards.currentLevel} value={currentLevelName} />
      </div>

      {progress.totalAttempts === 0 ? (
        <section className="rounded-lg border border-sky-200 bg-sky-50 p-5">
          <h2 className="text-xl font-bold text-slate-950">{labels.emptyTitle}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-700">{labels.emptyDescription}</p>
        </section>
      ) : null}

      {selectedChild && levelRecommendation ? (
        <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
          <div className="flex items-start gap-3">
            <TrendingUp aria-hidden="true" className="mt-1 text-emerald-700" size={22} />
            <div>
              <p className="text-sm font-bold uppercase text-emerald-800">{labels.sections.recommendation}</p>
              <h2 className="mt-2 text-xl font-bold text-slate-950">{labels.levelRecommendation.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {labels.levelRecommendation.appRecommendation}: {labels.levelRecommendation.actionLabels[levelRecommendation.action]}
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-700">
                {labels.levelRecommendation.currentLevel.replace("{level}", currentLevelName)}
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-700">
                {labels.levelRecommendation.recommendedLevel.replace("{level}", recommendedLevelName)}
              </p>
              <p className="mt-2 text-sm leading-6 text-emerald-950">
                {labels.levelRecommendation.reasons[levelRecommendation.reason]}
              </p>
              <p className="mt-2 text-xs font-bold uppercase text-slate-500">
                {fillTemplate(labels.levelRecommendation.stats, {
                  accuracy: Math.round(levelRecommendation.accuracy * 100),
                  attempts: levelRecommendation.attemptsCount,
                  time: formatResponseTime(levelRecommendation.averageResponseTimeMs)
                })}
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <div className="grid gap-4 xl:grid-cols-2">
        <ChartPanel title={labels.charts.attemptsPerDay}>
          <ResponsiveContainer height={260} width="100%">
            <BarChart data={progress.dailyRows}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" tickLine={false} />
              <YAxis allowDecimals={false} />
              <Tooltip formatter={(value) => [value, labels.table.tasks]} />
              <Bar dataKey="attempts" fill="#0284c7" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel title={labels.charts.accuracyOverTime}>
          <ResponsiveContainer height={260} width="100%">
            <LineChart data={progress.dailyRows}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" tickLine={false} />
              <YAxis allowDecimals={false} domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
              <Tooltip formatter={(value) => [`${value}%`, labels.table.accuracy]} />
              <Line dataKey="accuracy" dot={false} stroke="#047857" strokeWidth={3} type="monotone" />
            </LineChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel title={labels.charts.responseTime}>
          <ResponsiveContainer height={260} width="100%">
            <LineChart data={progress.dailyRows}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" tickLine={false} />
              <YAxis allowDecimals={false} tickFormatter={(value) => `${value}s`} />
              <Tooltip formatter={(value) => [`${value}s`, labels.table.averageTime]} />
              <Line dataKey="responseTimeSeconds" dot={false} stroke="#7c3aed" strokeWidth={3} type="monotone" />
            </LineChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel title={labels.charts.masteryByTopic}>
          <ResponsiveContainer height={260} width="100%">
            <BarChart data={progress.topicRows.slice(0, 6).map((row) => ({ ...row, label: labels.topics[row.topic] }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" tick={false} tickLine={false} />
              <YAxis allowDecimals={false} domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
              <Tooltip formatter={(value) => [`${value}%`, labels.table.mastery]} />
              <Bar dataKey="masteryScore" fill="#0f766e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartPanel>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(320px,460px)]">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">{labels.sections.levelProgress}</h2>
          <div className="mt-4 grid gap-3">
            {progress.levelRows.map((level) => (
              <LevelProgressRow
                key={level.levelId}
                currentLevelId={selectedChild?.currentLevelId ?? "L0_DIAGNOSTIC"}
                label={getLevelDisplayName(level.levelId, locale)}
                level={level}
                currentBadge={labels.currentBadge}
              />
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">{labels.sections.topicProgress}</h2>
          {progress.topicRows.length === 0 ? (
            <p className="mt-3 text-sm leading-6 text-slate-600">{labels.emptyDescription}</p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[420px] text-left text-sm">
                <thead className="border-b border-slate-200 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="py-3 pr-4">{labels.table.topic}</th>
                    <th className="py-3 pr-4">{labels.table.mastery}</th>
                    <th className="py-3 pr-4">{labels.table.tasks}</th>
                    <th className="py-3 pr-4">{labels.table.averageTime}</th>
                  </tr>
                </thead>
                <tbody>
                  {progress.topicRows.map((topic) => (
                    <tr key={topic.topic} className="border-b border-slate-100 last:border-0">
                      <td className="py-3 pr-4 font-semibold text-slate-950">{labels.topics[topic.topic]}</td>
                      <td className="py-3 pr-4 text-slate-700">{formatPercent(topic.masteryScore)}</td>
                      <td className="py-3 pr-4 text-slate-700">{topic.attempts}</td>
                      <td className="py-3 pr-4 text-slate-700">{formatResponseTime(topic.averageResponseTimeMs)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold text-slate-950">{labels.sections.dailyActivity}</h2>
        {activeDailyRows.length === 0 ? (
          <p className="mt-3 text-sm leading-6 text-slate-600">{labels.emptyDescription}</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="border-b border-slate-200 text-xs uppercase text-slate-500">
                <tr>
                  <th className="py-3 pr-4">{labels.table.date}</th>
                  <th className="py-3 pr-4">{labels.table.tasks}</th>
                  <th className="py-3 pr-4">{labels.table.correct}</th>
                  <th className="py-3 pr-4">{labels.table.accuracy}</th>
                  <th className="py-3 pr-4">{labels.table.averageTime}</th>
                </tr>
              </thead>
              <tbody>
                {activeDailyRows.map((row) => (
                  <tr key={row.dateKey} className="border-b border-slate-100 last:border-0">
                    <td className="py-3 pr-4 font-semibold text-slate-950">{row.dateKey}</td>
                    <td className="py-3 pr-4 text-slate-700">{row.attempts}</td>
                    <td className="py-3 pr-4 text-slate-700">{row.correct}</td>
                    <td className="py-3 pr-4 text-slate-700">{formatPercent(row.accuracy)}</td>
                    <td className="py-3 pr-4 text-slate-700">{row.responseTimeSeconds ? `${row.responseTimeSeconds.toFixed(1)} s` : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <p className="text-xs font-semibold uppercase text-slate-500">{labels.dataNote}</p>
    </div>
  );
}

function ProgressMetric({
  icon: Icon,
  label,
  value
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
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

function LevelProgressRow({
  currentLevelId,
  currentBadge,
  label,
  level
}: {
  currentLevelId: string;
  currentBadge: string;
  label: string;
  level: {
    levelId: LevelId;
    attempts: number;
    correct: number;
    accuracy: number;
    averageResponseTimeMs: number;
  };
}) {
  const isCurrent = level.levelId === currentLevelId;
  const widthPercent = Math.min(100, level.accuracy);

  return (
    <article className={isCurrent ? "rounded-md border border-emerald-300 bg-emerald-50 p-4" : "rounded-md border border-slate-200 p-4"}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-bold text-slate-950">{label}</h3>
          <p className="mt-1 text-sm text-slate-600">
            {level.correct}/{level.attempts} | {formatPercent(level.accuracy)} | {formatResponseTime(level.averageResponseTimeMs)}
          </p>
        </div>
        {isCurrent ? (
          <span className="inline-flex min-h-8 items-center justify-center rounded-full bg-emerald-700 px-3 text-xs font-bold uppercase text-white">
            {currentBadge}
          </span>
        ) : null}
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-emerald-600" style={{ width: `${widthPercent}%` }} />
      </div>
    </article>
  );
}
