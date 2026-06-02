"use client";

import { AlertTriangle, ArrowRight, CheckCircle2, Clock3, Loader2, Target, TrendingDown, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { summarizeMistakeAnalysis } from "@/lib/analytics";
import { listAttemptsPage, listChildProfiles } from "@/lib/firestore";
import { getLevelDisplayName } from "@/lib/math-engine/levelDisplay";
import { getSelectedChildProfileId, setSelectedChildProfileId } from "@/lib/utils/childSelection";
import { useAuth } from "@/hooks/useAuth";
import type { ChildProfile, ExerciseAttempt, Locale, MathTopic, MistakeCategory } from "@/types";

type FilterValue<T extends string> = T | "all";
type DateFilter = "all" | "7" | "14" | "30";

type ParentMistakesLabels = {
  title: string;
  description: string;
  loadingProfiles: string;
  loadingMistakes: string;
  loadError: string;
  noChildrenTitle: string;
  noChildrenDescription: string;
  createChildButton: string;
  childSelectorLabel: string;
  filtersTitle: string;
  topicFilterLabel: string;
  dateFilterLabel: string;
  allTopics: string;
  allDates: string;
  last7Days: string;
  last14Days: string;
  last30Days: string;
  noAnswer: string;
  dataNote: string;
  emptyTitle: string;
  emptyDescription: string;
  primaryInsightTitle: string;
  cards: {
    totalMistakes: string;
    errorRate: string;
    repeatedExamples: string;
    fastGuesses: string;
    slowCorrect: string;
  };
  sections: {
    frequentMistakes: string;
    weakestTopics: string;
    slowTopics: string;
  };
  table: {
    example: string;
    topic: string;
    level: string;
    mistakes: string;
    attempts: string;
    errorRate: string;
    commonWrongAnswers: string;
    lastMistake: string;
    averageWrongTime: string;
    suggestion: string;
  };
  insights: Record<MistakeCategory, string>;
  remediations: Record<MistakeCategory, string>;
  topics: Record<MathTopic, string>;
};

type ParentMistakesProps = {
  labels: ParentMistakesLabels;
  locale: Locale;
};

const mistakeAttemptPageSize = 260;

function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

function formatResponseTime(ms: number): string {
  if (ms <= 0) {
    return "-";
  }

  return `${(ms / 1000).toFixed(1)} s`;
}

function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "sk" ? "sk-SK" : "en-US", {
    dateStyle: "medium"
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

function commonWrongAnswersLabel(
  answers: Array<{ answer: string; count: number }>,
  labels: ParentMistakesLabels
): string {
  if (answers.length === 0) {
    return "-";
  }

  return answers
    .map((answer) => `${answer.answer === "no_answer" ? labels.noAnswer : answer.answer} (${answer.count})`)
    .join(", ");
}

export function ParentMistakes({ labels, locale }: ParentMistakesProps) {
  const { firebaseUser, loading: authLoading } = useAuth();
  const [profiles, setProfiles] = useState<ChildProfile[]>([]);
  const [selectedChildId, setSelectedChildId] = useState("");
  const [attempts, setAttempts] = useState<ExerciseAttempt[]>([]);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [loadingMistakes, setLoadingMistakes] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [topicFilter, setTopicFilter] = useState<FilterValue<MathTopic>>("all");
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
      setLoadingMistakes(true);
      setLoadError(false);

      try {
        const nextAttempts = await listAttemptsPage(selectedChildId, mistakeAttemptPageSize);

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
          setLoadingMistakes(false);
        }
      }
    }

    void loadAttempts();

    return () => {
      cancelled = true;
    };
  }, [selectedChildId]);

  const filteredAttempts = useMemo(
    () =>
      attempts.filter((attempt) => {
        const topicMatches = topicFilter === "all" || attempt.topic === topicFilter;
        const dateMatches = matchesDateFilter(attempt.createdAt, dateFilter);

        return topicMatches && dateMatches;
      }),
    [attempts, dateFilter, topicFilter]
  );
  const analysis = useMemo(() => summarizeMistakeAnalysis(filteredAttempts), [filteredAttempts]);
  const errorRate = analysis.totalAttempts === 0 ? 0 : Math.round((analysis.wrongAttempts / analysis.totalAttempts) * 100);
  const visiblePatterns = analysis.repeatedPatterns.slice(0, 10);

  function selectChild(childProfileId: string) {
    setSelectedChildId(childProfileId);
    setSelectedChildProfileId(childProfileId);
    setAttempts([]);
    setLoadError(false);
  }

  function updateTopicFilter(value: FilterValue<MathTopic>) {
    setTopicFilter(value);
  }

  function updateDateFilter(value: DateFilter) {
    setDateFilter(value);
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
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
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

      {loadingMistakes ? (
        <div className="flex min-h-24 items-center gap-3 rounded-lg border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-600">
          <Loader2 aria-hidden="true" className="animate-spin" size={18} />
          {labels.loadingMistakes}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <MistakeMetric icon={AlertTriangle} label={labels.cards.totalMistakes} value={String(analysis.wrongAttempts)} />
        <MistakeMetric icon={TrendingDown} label={labels.cards.errorRate} value={formatPercent(errorRate)} />
        <MistakeMetric icon={Target} label={labels.cards.repeatedExamples} value={String(analysis.repeatedPatterns.length)} />
        <MistakeMetric icon={Zap} label={labels.cards.fastGuesses} value={String(analysis.fastGuesses)} />
        <MistakeMetric icon={Clock3} label={labels.cards.slowCorrect} value={String(analysis.slowCorrectAttempts)} />
      </div>

      <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
        <div className="flex items-start gap-3">
          <CheckCircle2 aria-hidden="true" className="mt-1 text-emerald-700" size={22} />
          <div>
            <h2 className="text-xl font-bold text-slate-950">{labels.primaryInsightTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">{labels.insights[analysis.primaryCategory]}</p>
            <p className="mt-2 text-sm leading-6 text-emerald-950">{labels.remediations[analysis.primaryCategory]}</p>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold text-slate-950">{labels.sections.frequentMistakes}</h2>
        {visiblePatterns.length === 0 ? (
          <div className="mt-4 rounded-md border border-dashed border-slate-300 p-5">
            <h3 className="font-bold text-slate-950">{labels.emptyTitle}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{labels.emptyDescription}</p>
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="border-b border-slate-200 text-xs uppercase text-slate-500">
                <tr>
                  <th className="py-3 pr-4">{labels.table.example}</th>
                  <th className="py-3 pr-4">{labels.table.topic}</th>
                  <th className="py-3 pr-4">{labels.table.level}</th>
                  <th className="py-3 pr-4">{labels.table.mistakes}</th>
                  <th className="py-3 pr-4">{labels.table.errorRate}</th>
                  <th className="py-3 pr-4">{labels.table.commonWrongAnswers}</th>
                  <th className="py-3 pr-4">{labels.table.averageWrongTime}</th>
                  <th className="py-3 pr-4">{labels.table.lastMistake}</th>
                  <th className="py-3 pr-4">{labels.table.suggestion}</th>
                </tr>
              </thead>
              <tbody>
                {visiblePatterns.map((pattern) => (
                  <tr key={pattern.id} className="border-b border-slate-100 last:border-0">
                    <td className="py-3 pr-4 font-bold text-slate-950">{pattern.operandKey}</td>
                    <td className="py-3 pr-4 text-slate-700">{labels.topics[pattern.topic]}</td>
                    <td className="py-3 pr-4 text-slate-700">{getLevelDisplayName(pattern.levelId, locale)}</td>
                    <td className="py-3 pr-4 text-slate-700">
                      {pattern.wrongCount}/{pattern.totalCount}
                    </td>
                    <td className="py-3 pr-4 text-slate-700">{formatPercent(pattern.errorRate)}</td>
                    <td className="py-3 pr-4 text-slate-700">{commonWrongAnswersLabel(pattern.commonWrongAnswers, labels)}</td>
                    <td className="py-3 pr-4 text-slate-700">{formatResponseTime(pattern.averageWrongResponseTimeMs)}</td>
                    <td className="py-3 pr-4 text-slate-700">{formatDate(pattern.lastMistakeAt, locale)}</td>
                    <td className="py-3 pr-4 text-slate-700">{labels.remediations[pattern.primaryCategory]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">{labels.sections.weakestTopics}</h2>
          {analysis.weakestTopics.length === 0 ? (
            <p className="mt-3 text-sm leading-6 text-slate-600">{labels.emptyDescription}</p>
          ) : (
            <div className="mt-4 grid gap-3">
              {analysis.weakestTopics.map((topic) => (
                <article key={topic.topic} className="rounded-md border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-bold text-slate-950">{labels.topics[topic.topic]}</h3>
                    <p className="text-sm font-bold text-red-700">{formatPercent(topic.errorRate)}</p>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    {labels.table.mistakes}: {topic.wrongCount}/{topic.totalCount} · {labels.table.averageWrongTime}: {formatResponseTime(topic.averageResponseTimeMs)}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">{labels.sections.slowTopics}</h2>
          {analysis.slowTopics.length === 0 ? (
            <p className="mt-3 text-sm leading-6 text-slate-600">{labels.insights.slow_but_correct}</p>
          ) : (
            <div className="mt-4 grid gap-3">
              {analysis.slowTopics.map((topic) => (
                <article key={topic.topic} className="rounded-md border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-bold text-slate-950">{labels.topics[topic.topic]}</h3>
                    <p className="text-sm font-bold text-sky-700">{formatResponseTime(topic.averageResponseTimeMs)}</p>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    {labels.cards.slowCorrect}: {topic.correctCount}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      <p className="text-xs font-semibold uppercase text-slate-500">{labels.dataNote}</p>
    </div>
  );
}

function MistakeMetric({
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
