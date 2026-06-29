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
};

type PreviewLearningPathProgressProps = {
  lessons: PreviewLearningPathLesson[];
  labels?: Partial<PreviewLearningPathProgressLabels>;
};

const defaultLabels: PreviewLearningPathProgressLabels = {
  progressLabel: "Lokálny progres",
  clearProgressLabel: "Vymazať lokálny progres",
  completedLabel: "Hotové",
  currentLabel: "Pokračuj",
  readyLabel: "Pripravené",
  previewBadgeLabel: "Ukážka"
};

export function PreviewLearningPathProgress({ labels = {}, lessons }: PreviewLearningPathProgressProps) {
  const resolvedLabels = { ...defaultLabels, ...labels };
  const [completedLessons, setCompletedLessons] = useState<PreviewLessonId[]>([]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setCompletedLessons(getCompletedPreviewLessons());
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const completedCount = lessons.filter((lesson) => completedLessons.includes(lesson.id)).length;
  const firstIncompleteIndex = lessons.findIndex((lesson) => !completedLessons.includes(lesson.id));

  function clearLocalProgress() {
    clearPreviewLessonProgress();
    setCompletedLessons([]);
  }

  return (
    <div className="mt-5 rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm md:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-black uppercase text-emerald-800">
          {resolvedLabels.progressLabel}: {completedCount} / {lessons.length}
        </p>
        <button
          className="min-h-10 w-fit rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
          onClick={clearLocalProgress}
          type="button"
        >
          {resolvedLabels.clearProgressLabel}
        </button>
      </div>

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
            <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm" key={lesson.id}>
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
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-slate-950 px-4 py-2 text-base font-black text-white transition hover:bg-slate-800"
                href={lesson.href}
              >
                {lesson.buttonLabel}
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
