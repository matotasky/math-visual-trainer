"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  clearPreviewLessonProgress,
  getCompletedPreviewLessons,
  type PreviewLessonId
} from "@/lib/curriculum/local-preview-progress";

type PreviewLearningPathLesson = {
  id: PreviewLessonId;
  step: number;
  title: string;
  description: string;
  href: string;
  buttonLabel: string;
};

type PreviewLearningPathProgressLabels = {
  progressLabel: string;
  clearProgressLabel: string;
  completedLabel: string;
  currentLabel: string;
  readyLabel: string;
  previewBadgeLabel: string;
  skillsTitle: string;
  skillsSubtitle: string;
  skillsEmptyMessage: string;
  skillsLocalOnlyNote: string;
  recommendedTitle: string;
  recommendedContinuePrefix: string;
  recommendedAllDone: string;
  recommendedRestartLabel: string;
  recommendedStartLabel: string;
  recommendedContinueLabel: string;
  recommendedLocalOnlyNote: string;
  compactListTitle: string;
  compactOpenLabel: string;
  compactReviewLabel: string;
  currentRecommendedLabel: string;
  clearProgressAriaLabel: string;
  recommendedOpenAriaPrefix: string;
  restartAriaLabel: string;
  openLessonAriaPrefix: string;
  zeroProgressNote: string;
  allCompleteProgressNote: string;
  clearProgressHelpText: string;
  allCompleteHelperTitle: string;
  allCompleteHelperItems: string[];
  allCompleteHelperNote: string;
  progressLocalOnlyNote: string;
  reviewCompletedLessonLabel: string;
};

type PreviewLearningPathProgressProps = {
  lessons: PreviewLearningPathLesson[];
  labels?: Partial<PreviewLearningPathProgressLabels>;
  skillsByLesson?: Partial<Record<PreviewLessonId, string[]>>;
};

const defaultLabels: PreviewLearningPathProgressLabels = {
  progressLabel: "Lokálny progres",
  clearProgressLabel: "Vymazať lokálny progres",
  completedLabel: "Hotové",
  currentLabel: "Pokračuj",
  readyLabel: "Pripravené",
  previewBadgeLabel: "Ukážka",
  skillsTitle: "Čo už vieš",
  skillsSubtitle: "Podľa ukážkových lekcií dokončených v tomto prehliadači.",
  skillsEmptyMessage: "Dokonči prvú ukážkovú lekciu a tu sa zobrazí, čo si už precvičil/a.",
  skillsLocalOnlyNote: "Toto je iba lokálny prehľad, nie hodnotenie.",
  recommendedTitle: "Odporúčaný ďalší krok",
  recommendedContinuePrefix: "Pokračuj lekciou:",
  recommendedAllDone: "Výborne, dokončil/a si aktuálnu ukážkovú cestu.",
  recommendedRestartLabel: "Zopakovať od začiatku",
  recommendedStartLabel: "Začať",
  recommendedContinueLabel: "Pokračovať",
  compactListTitle: "Lekcie v tejto ceste",
  compactOpenLabel: "Otvoriť",
  compactReviewLabel: "Zopakovať",
  currentRecommendedLabel: "Odporúčané",
  clearProgressAriaLabel: "Vymazať lokálny progres tejto ukážkovej cesty",
  recommendedOpenAriaPrefix: "Otvoriť odporúčanú lekciu",
  restartAriaLabel: "Zopakovať ukážkovú cestu od začiatku",
  openLessonAriaPrefix: "Otvoriť lekciu",
  zeroProgressNote: "Ešte nič nie je dokončené. Začni prvou odporúčanou lekciou.",
  allCompleteProgressNote: "Výborne, všetky ukážkové lekcie v tejto ceste sú dokončené.",
  clearProgressHelpText: "Vymaže sa iba lokálny prehľad v tomto prehliadači.",
  allCompleteHelperTitle: "Čo ďalej?",
  allCompleteHelperItems: [
    "Zopakuj si cestu od začiatku.",
    "Vyber si lekciu, ktorá bola ťažšia.",
    "Daj si krátku pauzu a vráť sa neskôr."
  ],
  allCompleteHelperNote: "Toto je iba lokálne odporúčanie, nie hodnotenie.",
  progressLocalOnlyNote: "Ukladá sa iba v tomto prehliadači.",
  reviewCompletedLessonLabel: "Zopakovať",
  recommendedLocalOnlyNote: "Toto odporúčanie vychádza iba z lokálneho progresu v tomto prehliadači."
};

export function PreviewLearningPathProgress({
  labels = {},
  lessons,
  skillsByLesson
}: PreviewLearningPathProgressProps) {
  const resolvedLabels = { ...defaultLabels, ...labels };
  const [completedLessons, setCompletedLessons] = useState<PreviewLessonId[]>([]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setCompletedLessons(getCompletedPreviewLessons());
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const completedCount = lessons.filter((lesson) => completedLessons.includes(lesson.id)).length;
  const isAllComplete = lessons.length > 0 && completedCount === lessons.length;
  const firstIncompleteIndex = lessons.findIndex((lesson) => !completedLessons.includes(lesson.id));
  const firstIncompleteLesson = firstIncompleteIndex >= 0 ? lessons[firstIncompleteIndex] : undefined;
  const firstLesson = lessons[0];
  const progressStateNote =
    completedCount === 0
      ? resolvedLabels.zeroProgressNote
      : isAllComplete
        ? resolvedLabels.allCompleteProgressNote
        : null;
  const recommendedButtonLabel =
    completedCount === 0 ? resolvedLabels.recommendedStartLabel : resolvedLabels.recommendedContinueLabel;
  const completedLessonIds = new Set(completedLessons);
  const completedSkills = lessons.flatMap((lesson) =>
    completedLessonIds.has(lesson.id) ? (skillsByLesson?.[lesson.id] ?? []) : []
  );
  const uniqueCompletedSkills = [...new Set(completedSkills)];

  function clearLocalProgress() {
    clearPreviewLessonProgress();
    setCompletedLessons([]);
  }

  return (
    <div className="mt-5 rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm md:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase text-emerald-800">
            {resolvedLabels.progressLabel}: {completedCount} / {lessons.length}
          </p>
          <p className="mt-1 text-xs font-bold uppercase tracking-wide text-emerald-700">
            {resolvedLabels.progressLocalOnlyNote}
          </p>
        </div>
        <div className="flex flex-col gap-1 sm:items-end">
          <button
            aria-label={resolvedLabels.clearProgressAriaLabel}
            className="min-h-10 w-fit rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
            onClick={clearLocalProgress}
            type="button"
          >
            {resolvedLabels.clearProgressLabel}
          </button>
          <p className="max-w-64 text-xs font-semibold leading-5 text-slate-500 sm:text-right">
            {resolvedLabels.clearProgressHelpText}
          </p>
        </div>
      </div>
      {progressStateNote ? (
        <p className="mt-3 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm font-bold leading-6 text-emerald-950">
          {progressStateNote}
        </p>
      ) : null}

      <section className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 md:p-5">
        <p className="text-sm font-black uppercase text-amber-800">{resolvedLabels.recommendedTitle}</p>
        {firstIncompleteLesson ? (
          <div className="mt-3 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div>
              <p className="text-sm font-bold leading-6 text-amber-950">
                {resolvedLabels.recommendedContinuePrefix}
              </p>
              <h3 className="mt-1 text-2xl font-black leading-8 text-slate-950">{firstIncompleteLesson.title}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
                {firstIncompleteLesson.description}
              </p>
            </div>
            <Link
              aria-label={`${resolvedLabels.recommendedOpenAriaPrefix}: ${firstIncompleteLesson.title}`}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-base font-black text-white transition hover:bg-slate-800 md:w-fit"
              href={firstIncompleteLesson.href}
            >
              {recommendedButtonLabel}
            </Link>
          </div>
        ) : firstLesson ? (
          <div className="mt-3 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <p className="text-base font-bold leading-7 text-amber-950">{resolvedLabels.recommendedAllDone}</p>
            <Link
              aria-label={resolvedLabels.restartAriaLabel}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-base font-black text-white transition hover:bg-slate-800 md:w-fit"
              href={firstLesson.href}
            >
              {resolvedLabels.recommendedRestartLabel}
            </Link>
          </div>
        ) : null}
        <p className="mt-4 text-xs font-bold uppercase tracking-wide text-amber-800">
          {resolvedLabels.recommendedLocalOnlyNote}
        </p>
      </section>

      {isAllComplete ? (
        <section className="mt-4 rounded-2xl border border-indigo-200 bg-indigo-50 p-4 md:p-5">
          <h3 className="text-lg font-black text-slate-950">{resolvedLabels.allCompleteHelperTitle}</h3>
          <ul className="mt-3 grid gap-2">
            {resolvedLabels.allCompleteHelperItems.map((item) => (
              <li className="rounded-xl bg-white px-3 py-2 text-sm font-bold leading-6 text-slate-700 shadow-sm" key={item}>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs font-bold uppercase tracking-wide text-indigo-800">
            {resolvedLabels.allCompleteHelperNote}
          </p>
        </section>
      ) : null}

      <section className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h3 className="text-base font-black text-slate-950">{resolvedLabels.compactListTitle}</h3>
        <div className="mt-3 grid gap-2">
          {lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const isCurrent = !isCompleted && index === firstIncompleteIndex;
            const statusLabel = isCompleted
              ? resolvedLabels.completedLabel
              : isCurrent
                ? resolvedLabels.currentLabel
                : resolvedLabels.readyLabel;

            return (
              <div
                className={`grid gap-3 rounded-xl border p-3 shadow-sm sm:grid-cols-[auto_minmax(0,1fr)_auto_auto] sm:items-center ${
                  isCurrent
                    ? "border-amber-300 bg-amber-50 ring-1 ring-amber-200"
                    : "border-slate-200 bg-white"
                }`}
                key={lesson.id}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-sm font-black text-white">
                  {lesson.step}
                </span>
                <div>
                  <p className="text-sm font-black leading-6 text-slate-900">{lesson.title}</p>
                  {isCurrent ? (
                    <p className="mt-1 text-xs font-black uppercase tracking-wide text-amber-800">
                      {resolvedLabels.currentRecommendedLabel}
                    </p>
                  ) : null}
                </div>
                <span
                  className={`inline-flex w-fit rounded-md px-3 py-1 text-xs font-black uppercase ${
                    isCompleted
                      ? "bg-emerald-700 text-white"
                      : isCurrent
                        ? "bg-sky-100 text-sky-800"
                        : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {statusLabel}
                </span>
                <Link
                  aria-label={`${resolvedLabels.openLessonAriaPrefix}: ${lesson.title}`}
                  className="inline-flex min-h-10 w-fit items-center justify-center rounded-lg bg-slate-950 px-3 py-2 text-sm font-black text-white transition hover:bg-slate-800"
                  href={lesson.href}
                >
                  {isCompleted ? resolvedLabels.compactReviewLabel : resolvedLabels.compactOpenLabel}
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {lessons.map((lesson, index) => {
          const isCompleted = completedLessons.includes(lesson.id);
          const isCurrent = !isCompleted && index === firstIncompleteIndex;
          const statusLabel = isCompleted
            ? resolvedLabels.completedLabel
            : isCurrent
              ? resolvedLabels.currentLabel
              : resolvedLabels.readyLabel;

          return (
            <article
              className={`rounded-2xl border p-5 shadow-sm ${
                isCurrent
                  ? "border-amber-300 bg-amber-50 ring-1 ring-amber-200"
                  : "border-emerald-200 bg-emerald-50"
              }`}
              key={lesson.id}
            >
              {isCurrent ? (
                <span className="mb-3 inline-flex rounded-full bg-amber-200 px-3 py-1 text-xs font-black uppercase text-amber-900">
                  {resolvedLabels.currentRecommendedLabel}
                </span>
              ) : null}
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-emerald-600 text-lg font-black text-white">
                  {lesson.step}
                </span>
                <div className="flex flex-col items-end gap-2">
                  <span className="inline-flex rounded-md bg-white px-3 py-1 text-xs font-bold uppercase text-emerald-800">
                    {resolvedLabels.previewBadgeLabel}
                  </span>
                  <span
                    className={`inline-flex rounded-md px-3 py-1 text-xs font-black uppercase ${
                      isCompleted
                        ? "bg-emerald-700 text-white"
                        : isCurrent
                          ? "bg-sky-100 text-sky-800"
                          : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {statusLabel}
                  </span>
                </div>
              </div>
              <h3 className="mt-4 text-xl font-black leading-7 text-slate-950">{lesson.title}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{lesson.description}</p>
              <Link
                aria-label={`${resolvedLabels.openLessonAriaPrefix}: ${lesson.title}`}
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-slate-950 px-4 py-2 text-base font-black text-white transition hover:bg-slate-800"
                href={lesson.href}
              >
                {isCompleted ? resolvedLabels.reviewCompletedLessonLabel : lesson.buttonLabel}
              </Link>
            </article>
          );
        })}
      </div>

      {skillsByLesson ? (
        <section className="mt-5 rounded-2xl border border-sky-200 bg-sky-50 p-4 md:p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-2xl font-black text-slate-950">{resolvedLabels.skillsTitle}</h3>
              <p className="mt-1 text-sm font-semibold leading-6 text-sky-950">
                {resolvedLabels.skillsSubtitle}
              </p>
            </div>
            <span className="inline-flex w-fit rounded-full bg-white px-3 py-1 text-xs font-black uppercase text-sky-800 shadow-sm">
              {completedCount} / {lessons.length}
            </span>
          </div>

          {uniqueCompletedSkills.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {uniqueCompletedSkills.map((skill) => (
                <span
                  className="rounded-xl border border-white bg-white px-3 py-2 text-sm font-bold leading-6 text-slate-800 shadow-sm"
                  key={skill}
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-4 rounded-xl border border-white bg-white p-4 text-sm font-bold leading-6 text-slate-700 shadow-sm">
              {resolvedLabels.skillsEmptyMessage}
            </p>
          )}

          <p className="mt-4 text-xs font-bold uppercase tracking-wide text-sky-800">
            {resolvedLabels.skillsLocalOnlyNote}
          </p>
        </section>
      ) : null}
    </div>
  );
}
