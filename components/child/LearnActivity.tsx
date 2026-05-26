"use client";

import { CheckCircle2, Eye, EyeOff, Loader2, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChildStateMessage } from "@/components/child/ChildStateMessage";
import { ExerciseVisual } from "@/components/math/ExerciseVisual";
import { useChildProfile } from "@/hooks/useChildProfile";
import { generateExercise } from "@/lib/math-engine";
import type { Exercise, Locale, MathTopic } from "@/types";

type LearnActivityLabels = {
  title: string;
  description: string;
  loadingChild: string;
  missingChild: string;
  needDiagnostic: string;
  selectedLevel: string;
  progressLabel: string;
  visualHint: string;
  strategyTitle: string;
  quantityStrategy: string;
  additionStrategy: string;
  make10Strategy: string;
  subtractionStrategy: string;
  answerLabel: string;
  showAnswer: string;
  hideAnswer: string;
  nextExample: string;
  finishLesson: string;
  completeTitle: string;
  completeDescription: string;
  backToChild: string;
  goDiagnostic: string;
};

type LearnActivityProps = {
  labels: LearnActivityLabels;
  locale: Locale;
};

const lessonExampleCount = 8;

function strategyForTopic(topic: MathTopic, labels: LearnActivityLabels): string {
  if (topic === "make_10" || topic === "bridge_through_10") {
    return labels.make10Strategy;
  }

  if (topic === "subtraction_to_10") {
    return labels.subtractionStrategy;
  }

  if (topic === "quantity_recognition" || topic === "quantity_to_10" || topic === "number_matching") {
    return labels.quantityStrategy;
  }

  return labels.additionStrategy;
}

export function LearnActivity({ labels, locale }: LearnActivityProps) {
  const { selectedChild, loading } = useChildProfile();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [exampleIndex, setExampleIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function prepareExercise() {
      if (completed || !selectedChild || !selectedChild.diagnosticCompletedAt) {
        if (!cancelled) {
          setExercise(null);
        }
        return;
      }

      const nextExercise = generateExercise({
        childProfileId: selectedChild.id,
        mode: "learn",
        levelId: selectedChild.currentLevelId,
        locale
      });

      if (!cancelled) {
        setExercise(nextExercise);
        setShowAnswer(false);
      }
    }

    void prepareExercise();

    return () => {
      cancelled = true;
    };
  }, [completed, exampleIndex, locale, selectedChild]);

  function nextExample() {
    if (!selectedChild) {
      return;
    }

    if (exampleIndex + 1 >= lessonExampleCount) {
      setCompleted(true);
      setShowAnswer(false);
      return;
    }

    setExampleIndex((current) => current + 1);
  }

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

  if (!selectedChild.diagnosticCompletedAt) {
    return <ChildStateMessage actionHref="/child/diagnostic" actionLabel={labels.goDiagnostic} message={labels.needDiagnostic} />;
  }

  if (completed) {
    return (
      <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-6">
        <CheckCircle2 aria-hidden="true" className="text-emerald-700" size={36} />
        <h1 className="mt-4 text-3xl font-bold text-slate-950">{labels.completeTitle}</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700">{labels.completeDescription}</p>
        <Link
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-md bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
          href="/child"
        >
          {labels.backToChild}
        </Link>
      </section>
    );
  }

  if (!exercise) {
    return <ChildStateMessage message={labels.loadingChild} />;
  }

  const progressLabel = labels.progressLabel
    .replace("{current}", String(exampleIndex + 1))
    .replace("{total}", String(lessonExampleCount));
  const progressPercent = ((exampleIndex + 1) / lessonExampleCount) * 100;

  return (
    <section className="grid gap-6 py-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="rounded-lg border border-sky-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-bold uppercase text-sky-700">
            {labels.selectedLevel.replace("{level}", selectedChild.currentLevelId)}
          </p>
          <p className="text-sm font-bold text-slate-700">{progressLabel}</p>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-emerald-600 transition-all" style={{ width: `${progressPercent}%` }} />
        </div>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">{labels.title}</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700">{labels.description}</p>

        <div className="mt-8 flex min-h-64 items-center justify-center rounded-lg bg-sky-50">
          <ExerciseVisual exercise={exercise} />
        </div>

        <p className="mt-5 rounded-md border border-sky-200 bg-sky-50 p-4 text-sm font-medium leading-6 text-sky-950">
          {labels.visualHint}
        </p>
      </div>

      <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-lg font-bold text-slate-950">{exercise.prompt}</p>
        <div className="mt-5 rounded-md border border-emerald-200 bg-emerald-50 p-4">
          <h2 className="text-sm font-bold uppercase text-emerald-800">{labels.strategyTitle}</h2>
          <p className="mt-2 text-sm leading-6 text-emerald-950">{strategyForTopic(exercise.topic, labels)}</p>
        </div>

        {showAnswer ? (
          <p className="mt-5 rounded-md border border-slate-200 bg-slate-50 p-4 text-2xl font-bold text-slate-950">
            {labels.answerLabel.replace("{answer}", String(exercise.correctAnswer))}
          </p>
        ) : null}

        <div className="mt-6 grid gap-3">
          <button
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            type="button"
            onClick={() => setShowAnswer((current) => !current)}
          >
            {showAnswer ? <EyeOff aria-hidden="true" size={18} /> : <Eye aria-hidden="true" size={18} />}
            {showAnswer ? labels.hideAnswer : labels.showAnswer}
          </button>
          <button
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            type="button"
            onClick={nextExample}
          >
            <RefreshCcw aria-hidden="true" size={18} />
            {exampleIndex + 1 >= lessonExampleCount ? labels.finishLesson : labels.nextExample}
          </button>
        </div>
      </aside>
    </section>
  );
}
