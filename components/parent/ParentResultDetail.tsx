"use client";

import { ArrowLeft, CheckCircle2, Clock3, FileText, Loader2, Target, XCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  formatAttemptQuestion,
  summarizeResultSessions
} from "@/lib/analytics";
import { listAttemptsForSession, listChildProfiles } from "@/lib/firestore";
import { getLevelDisplayName } from "@/lib/math-engine/levelDisplay";
import { getSelectedChildProfileId, setSelectedChildProfileId } from "@/lib/utils/childSelection";
import type { ChildProfile, ExerciseAttempt, Locale } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import {
  formatResultDateTime,
  formatResultResponseTime,
  type ParentResultsLabels
} from "./ParentResults";

type ParentResultDetailProps = {
  labels: ParentResultsLabels;
  locale: Locale;
  sessionId: string;
};

function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

function attemptAnswerLabel(attempt: ExerciseAttempt, labels: ParentResultsLabels): string {
  return attempt.givenAnswer === null ? labels.detail.noAnswer : String(attempt.givenAnswer);
}

export function ParentResultDetail({ labels, locale, sessionId }: ParentResultDetailProps) {
  const { firebaseUser, loading: authLoading } = useAuth();
  const [profiles, setProfiles] = useState<ChildProfile[]>([]);
  const [selectedChildId, setSelectedChildId] = useState("");
  const [attempts, setAttempts] = useState<ExerciseAttempt[]>([]);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [loadError, setLoadError] = useState(false);

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
      setLoadingDetail(true);
      setLoadError(false);

      try {
        const nextAttempts = await listAttemptsForSession(selectedChildId, sessionId);

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
          setLoadingDetail(false);
        }
      }
    }

    void loadAttempts();

    return () => {
      cancelled = true;
    };
  }, [selectedChildId, sessionId]);

  const summary = useMemo(() => summarizeResultSessions(attempts)[0] ?? null, [attempts]);

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
          className="mt-5 inline-flex min-h-12 items-center justify-center rounded-md bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
          href="/parent/children"
        >
          {labels.createChildButton}
        </Link>
      </section>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
          href="/parent/results"
        >
          <ArrowLeft aria-hidden="true" size={16} />
          {labels.detail.backToResults}
        </Link>

        <label className="grid gap-2 text-sm font-bold text-slate-800 sm:min-w-64">
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
      </div>

      {loadError ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-900">
          {labels.detail.loadError}
        </div>
      ) : null}

      {loadingDetail ? (
        <div className="flex min-h-24 items-center gap-3 rounded-lg border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-600">
          <Loader2 aria-hidden="true" className="animate-spin" size={18} />
          {labels.detail.loadingDetail}
        </div>
      ) : null}

      {!loadingDetail && !summary ? (
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">{labels.detail.emptyTitle}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{labels.detail.emptyDescription}</p>
        </section>
      ) : null}

      {summary ? (
        <>
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-bold uppercase text-sky-700">{labels.detail.summaryTitle}</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">
              {labels.modes[summary.mode]} · {formatResultDateTime(summary.endedAt, locale)}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {getLevelDisplayName(summary.levelId, locale)} · {labels.topics[summary.primaryTopic]}
            </p>
          </section>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <DetailMetric icon={FileText} label={labels.table.tasks} value={String(summary.totalTasks)} />
            <DetailMetric icon={Target} label={labels.table.accuracy} value={formatPercent(summary.accuracy)} />
            <DetailMetric icon={CheckCircle2} label={labels.cards.tasks} value={`${summary.correctTasks}/${summary.totalTasks}`} />
            <DetailMetric icon={Clock3} label={labels.table.averageTime} value={formatResultResponseTime(summary.averageResponseTimeMs)} />
          </div>

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-left text-sm">
                <thead className="border-b border-slate-200 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="py-3 pr-4">{labels.detail.question}</th>
                    <th className="py-3 pr-4">{labels.detail.correctAnswer}</th>
                    <th className="py-3 pr-4">{labels.detail.givenAnswer}</th>
                    <th className="py-3 pr-4">{labels.detail.responseTime}</th>
                    <th className="py-3 pr-4">{labels.detail.visualModel}</th>
                    <th className="py-3 pr-4">{labels.detail.correctness}</th>
                  </tr>
                </thead>
                <tbody>
                  {attempts.map((attempt) => (
                    <tr key={attempt.id} className="border-b border-slate-100 last:border-0">
                      <td className="py-3 pr-4 font-semibold text-slate-950">{formatAttemptQuestion(attempt, locale)}</td>
                      <td className="py-3 pr-4 text-slate-700">{attempt.correctAnswer}</td>
                      <td className="py-3 pr-4 text-slate-700">{attemptAnswerLabel(attempt, labels)}</td>
                      <td className="py-3 pr-4 text-slate-700">{formatResultResponseTime(attempt.responseTimeMs)}</td>
                      <td className="py-3 pr-4 text-slate-700">{labels.visualModels[attempt.visualModel]}</td>
                      <td className="py-3 pr-4">
                        <span
                          className={
                            attempt.isCorrect
                              ? "inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800"
                              : "inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-800"
                          }
                        >
                          {attempt.isCorrect ? <CheckCircle2 aria-hidden="true" size={14} /> : <XCircle aria-hidden="true" size={14} />}
                          {attempt.isCorrect ? labels.detail.correct : labels.detail.incorrect}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}

function DetailMetric({
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
