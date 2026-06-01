"use client";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Eye,
  FileText,
  Loader2,
  Target
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { summarizeResultSessions } from "@/lib/analytics";
import { listAttemptsPage, listChildProfiles } from "@/lib/firestore";
import { getLevelDisplayName } from "@/lib/math-engine/levelDisplay";
import { getSelectedChildProfileId, setSelectedChildProfileId } from "@/lib/utils/childSelection";
import type { ChildProfile, ExerciseAttempt, ExerciseMode, Locale, MathTopic, VisualModel } from "@/types";
import { useAuth } from "@/hooks/useAuth";

type FilterValue<T extends string> = T | "all";
type DateFilter = "all" | "7" | "14" | "30";

export type ParentResultsLabels = {
  title: string;
  description: string;
  detailTitle: string;
  detailDescription: string;
  loadingProfiles: string;
  loadingResults: string;
  loadError: string;
  noChildrenTitle: string;
  noChildrenDescription: string;
  createChildButton: string;
  childSelectorLabel: string;
  filtersTitle: string;
  modeFilterLabel: string;
  topicFilterLabel: string;
  dateFilterLabel: string;
  allModes: string;
  allTopics: string;
  allDates: string;
  last7Days: string;
  last14Days: string;
  last30Days: string;
  multipleTopics: string;
  emptyTitle: string;
  emptyDescription: string;
  dataNote: string;
  previousPage: string;
  nextPage: string;
  pageStatus: string;
  cards: {
    sessions: string;
    tests: string;
    tasks: string;
    averageAccuracy: string;
    averageTime: string;
  };
  table: {
    date: string;
    mode: string;
    topic: string;
    level: string;
    tasks: string;
    accuracy: string;
    averageTime: string;
    detail: string;
  };
  detail: {
    backToResults: string;
    loadingDetail: string;
    loadError: string;
    emptyTitle: string;
    emptyDescription: string;
    summaryTitle: string;
    question: string;
    correctAnswer: string;
    givenAnswer: string;
    responseTime: string;
    visualModel: string;
    correctness: string;
    correct: string;
    incorrect: string;
    noAnswer: string;
  };
  topics: Record<MathTopic, string>;
  modes: Record<ExerciseMode, string>;
  visualModels: Record<VisualModel, string>;
};

type ParentResultsProps = {
  labels: ParentResultsLabels;
  locale: Locale;
};

const resultAttemptPageSize = 240;
const sessionsPerPage = 8;

function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

export function formatResultResponseTime(ms: number): string {
  if (ms <= 0) {
    return "-";
  }

  return `${(ms / 1000).toFixed(1)} s`;
}

export function formatResultDateTime(date: Date, locale: Locale): string {
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

function sessionTopicLabel(topics: MathTopic[], labels: ParentResultsLabels): string {
  if (topics.length <= 1) {
    return labels.topics[topics[0] ?? "addition_to_5"];
  }

  return `${labels.multipleTopics}: ${topics.slice(0, 3).map((topic) => labels.topics[topic]).join(", ")}`;
}

function weightedAverageResponseTime(sessions: ReturnType<typeof summarizeResultSessions>): number {
  const totalTasks = sessions.reduce((total, session) => total + session.totalTasks, 0);

  if (totalTasks === 0) {
    return 0;
  }

  const weightedTime = sessions.reduce(
    (total, session) => total + session.averageResponseTimeMs * session.totalTasks,
    0
  );

  return Math.round(weightedTime / totalTasks);
}

export function ParentResults({ labels, locale }: ParentResultsProps) {
  const { firebaseUser, loading: authLoading } = useAuth();
  const [profiles, setProfiles] = useState<ChildProfile[]>([]);
  const [selectedChildId, setSelectedChildId] = useState("");
  const [attempts, setAttempts] = useState<ExerciseAttempt[]>([]);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [loadingResults, setLoadingResults] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [modeFilter, setModeFilter] = useState<FilterValue<ExerciseMode>>("all");
  const [topicFilter, setTopicFilter] = useState<FilterValue<MathTopic>>("all");
  const [dateFilter, setDateFilter] = useState<DateFilter>("30");
  const [currentPage, setCurrentPage] = useState(1);

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
      setLoadingResults(true);
      setLoadError(false);

      try {
        const nextAttempts = await listAttemptsPage(selectedChildId, resultAttemptPageSize);

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
          setLoadingResults(false);
        }
      }
    }

    void loadAttempts();

    return () => {
      cancelled = true;
    };
  }, [selectedChildId]);

  const sessions = useMemo(() => summarizeResultSessions(attempts), [attempts]);
  const filteredSessions = useMemo(
    () =>
      sessions.filter((session) => {
        const modeMatches = modeFilter === "all" || session.mode === modeFilter;
        const topicMatches = topicFilter === "all" || session.topics.includes(topicFilter);
        const dateMatches = matchesDateFilter(session.endedAt, dateFilter);

        return modeMatches && topicMatches && dateMatches;
      }),
    [dateFilter, modeFilter, sessions, topicFilter]
  );
  const totalPages = Math.max(1, Math.ceil(filteredSessions.length / sessionsPerPage));
  const activePage = Math.min(currentPage, totalPages);
  const visibleSessions = filteredSessions.slice((activePage - 1) * sessionsPerPage, activePage * sessionsPerPage);
  const totalTasks = filteredSessions.reduce((total, session) => total + session.totalTasks, 0);
  const totalCorrect = filteredSessions.reduce((total, session) => total + session.correctTasks, 0);
  const averageAccuracy = totalTasks === 0 ? 0 : Math.round((totalCorrect / totalTasks) * 100);
  const averageResponseTime = weightedAverageResponseTime(filteredSessions);
  const testCount = filteredSessions.filter((session) => session.mode === "test").length;

  function selectChild(childProfileId: string) {
    setSelectedChildId(childProfileId);
    setSelectedChildProfileId(childProfileId);
    setAttempts([]);
    setLoadError(false);
    setCurrentPage(1);
  }

  function updateModeFilter(value: FilterValue<ExerciseMode>) {
    setModeFilter(value);
    setCurrentPage(1);
  }

  function updateTopicFilter(value: FilterValue<MathTopic>) {
    setTopicFilter(value);
    setCurrentPage(1);
  }

  function updateDateFilter(value: DateFilter) {
    setDateFilter(value);
    setCurrentPage(1);
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

          <div>
            <h2 className="text-lg font-bold text-slate-950">{labels.filtersTitle}</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <label className="grid gap-2 text-sm font-semibold text-slate-800">
                {labels.modeFilterLabel}
                <select
                  className="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                  value={modeFilter}
                  onChange={(event) => updateModeFilter(event.target.value as FilterValue<ExerciseMode>)}
                >
                  <option value="all">{labels.allModes}</option>
                  {Object.entries(labels.modes).map(([mode, label]) => (
                    <option key={mode} value={mode}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-semibold text-slate-800">
                {labels.topicFilterLabel}
                <select
                  className="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                  value={topicFilter}
                  onChange={(event) => updateTopicFilter(event.target.value as FilterValue<MathTopic>)}
                >
                  <option value="all">{labels.allTopics}</option>
                  {Object.entries(labels.topics).map(([topic, label]) => (
                    <option key={topic} value={topic}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-semibold text-slate-800">
                {labels.dateFilterLabel}
                <select
                  className="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                  value={dateFilter}
                  onChange={(event) => updateDateFilter(event.target.value as DateFilter)}
                >
                  <option value="30">{labels.last30Days}</option>
                  <option value="14">{labels.last14Days}</option>
                  <option value="7">{labels.last7Days}</option>
                  <option value="all">{labels.allDates}</option>
                </select>
              </label>
            </div>
          </div>
        </div>
      </section>

      {loadError ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-900">
          {labels.loadError}
        </div>
      ) : null}

      {loadingResults ? (
        <div className="flex min-h-24 items-center gap-3 rounded-lg border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-600">
          <Loader2 aria-hidden="true" className="animate-spin" size={18} />
          {labels.loadingResults}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <ResultMetric icon={FileText} label={labels.cards.sessions} value={String(filteredSessions.length)} />
        <ResultMetric icon={Target} label={labels.cards.tests} value={String(testCount)} />
        <ResultMetric icon={CheckCircle2} label={labels.cards.tasks} value={`${totalCorrect}/${totalTasks}`} />
        <ResultMetric icon={CheckCircle2} label={labels.cards.averageAccuracy} value={formatPercent(averageAccuracy)} />
        <ResultMetric icon={Clock3} label={labels.cards.averageTime} value={formatResultResponseTime(averageResponseTime)} />
      </div>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        {filteredSessions.length === 0 ? (
          <div className="rounded-md border border-dashed border-slate-300 p-5">
            <h2 className="text-xl font-bold text-slate-950">{labels.emptyTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{labels.emptyDescription}</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] text-left text-sm">
                <thead className="border-b border-slate-200 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="py-3 pr-4">{labels.table.date}</th>
                    <th className="py-3 pr-4">{labels.table.mode}</th>
                    <th className="py-3 pr-4">{labels.table.topic}</th>
                    <th className="py-3 pr-4">{labels.table.level}</th>
                    <th className="py-3 pr-4">{labels.table.tasks}</th>
                    <th className="py-3 pr-4">{labels.table.accuracy}</th>
                    <th className="py-3 pr-4">{labels.table.averageTime}</th>
                    <th className="py-3 pr-4">{labels.table.detail}</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleSessions.map((session) => (
                    <tr key={session.sessionId} className="border-b border-slate-100 last:border-0">
                      <td className="py-3 pr-4 text-slate-700">{formatResultDateTime(session.endedAt, locale)}</td>
                      <td className="py-3 pr-4 font-semibold text-slate-950">{labels.modes[session.mode]}</td>
                      <td className="py-3 pr-4 text-slate-700">{sessionTopicLabel(session.topics, labels)}</td>
                      <td className="py-3 pr-4 text-slate-700">{getLevelDisplayName(session.levelId, locale)}</td>
                      <td className="py-3 pr-4 text-slate-700">{session.totalTasks}</td>
                      <td className="py-3 pr-4 text-slate-700">{formatPercent(session.accuracy)}</td>
                      <td className="py-3 pr-4 text-slate-700">{formatResultResponseTime(session.averageResponseTimeMs)}</td>
                      <td className="py-3 pr-4">
                        <Link
                          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                          href={`/parent/results/${encodeURIComponent(session.sessionId)}`}
                        >
                          <Eye aria-hidden="true" size={16} />
                          {labels.table.detail}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold text-slate-600">
                {labels.pageStatus
                  .replace("{current}", String(activePage))
                  .replace("{total}", String(totalPages))}
              </p>
              <div className="flex gap-2">
                <button
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={activePage <= 1}
                  type="button"
                  onClick={() => setCurrentPage(Math.max(1, activePage - 1))}
                >
                  <ArrowLeft aria-hidden="true" size={16} />
                  {labels.previousPage}
                </button>
                <button
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={activePage >= totalPages}
                  type="button"
                  onClick={() => setCurrentPage(Math.min(totalPages, activePage + 1))}
                >
                  {labels.nextPage}
                  <ArrowRight aria-hidden="true" size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </section>

      <p className="text-xs font-semibold uppercase text-slate-500">{labels.dataNote}</p>
    </div>
  );
}

function ResultMetric({
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
