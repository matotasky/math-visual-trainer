"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ChildStateMessage } from "@/components/child/ChildStateMessage";
import { ExerciseVisual } from "@/components/math/ExerciseVisual";
import { useChildProfile } from "@/hooks/useChildProfile";
import { saveAttempt } from "@/lib/firestore";
import { generateExercise, validateAnswer } from "@/lib/math-engine";
import type { Exercise, ExerciseAttempt, Locale } from "@/types";

type PracticeRunnerLabels = {
  title: string;
  description: string;
  loadingChild: string;
  missingChild: string;
  needDiagnostic: string;
  selectedLevel: string;
  questionCount: string;
  answerLabel: string;
  answerPlaceholder: string;
  checkAnswer: string;
  nextQuestion: string;
  saving: string;
  correctFeedback: string;
  incorrectFeedback: string;
  saveError: string;
  goDiagnostic: string;
};

type PracticeRunnerProps = {
  labels: PracticeRunnerLabels;
  locale: Locale;
};

export function PracticeRunner({ labels, locale }: PracticeRunnerProps) {
  const { selectedChild, loading } = useChildProfile();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attemptCount, setAttemptCount] = useState(1);
  const sessionIdRef = useRef("");
  const startedAtRef = useRef(0);

  useEffect(() => {
    let cancelled = false;

    async function prepareExercise() {
      if (!selectedChild || !selectedChild.diagnosticCompletedAt) {
        if (!cancelled) {
          setExercise(null);
        }
        return;
      }

      const now = Date.now();
      const nextExercise = generateExercise({
        childProfileId: selectedChild.id,
        mode: "practice",
        levelId: selectedChild.currentLevelId,
        locale
      });

      if (!cancelled) {
        sessionIdRef.current = sessionIdRef.current || `practice-${now}`;
        startedAtRef.current = now;
        setExercise(nextExercise);
      }
    }

    void prepareExercise();

    return () => {
      cancelled = true;
    };
  }, [locale, selectedChild]);

  function nextExercise() {
    if (!selectedChild) {
      return;
    }

    setExercise(
      generateExercise({
        childProfileId: selectedChild.id,
        mode: "practice",
        levelId: selectedChild.currentLevelId,
        locale
      })
    );
    setAnswer("");
    setFeedback(null);
    setError(null);
    setAttemptCount((current) => current + 1);
    startedAtRef.current = Date.now();
  }

  async function submitAnswer() {
    if (!exercise || !selectedChild || saving) {
      return;
    }

    const validation = validateAnswer(exercise, answer);
    const attempt: ExerciseAttempt = {
      id: exercise.id,
      childProfileId: selectedChild.id,
      sessionId: sessionIdRef.current,
      topic: exercise.topic,
      levelId: exercise.levelId,
      mode: "practice",
      questionType: exercise.questionType,
      operands: exercise.operands,
      operator: exercise.operator,
      correctAnswer: exercise.correctAnswer,
      givenAnswer: validation.normalizedAnswer,
      isCorrect: validation.isCorrect,
      responseTimeMs: Date.now() - startedAtRef.current,
      usedHint: false,
      visualModel: exercise.visualModel,
      createdAt: new Date()
    };

    setSaving(true);
    setError(null);

    try {
      await saveAttempt(attempt);
      setFeedback(validation.isCorrect ? "correct" : "incorrect");
    } catch {
      setError(labels.saveError);
    } finally {
      setSaving(false);
    }
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

  if (!exercise) {
    return <ChildStateMessage message={labels.loadingChild} />;
  }

  return (
    <section className="grid gap-6 py-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="rounded-lg border border-sky-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-bold uppercase text-sky-700">
          {labels.selectedLevel.replace("{level}", selectedChild.currentLevelId)}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">{labels.title}</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700">{labels.description}</p>

        <div className="mt-8 flex min-h-64 items-center justify-center rounded-lg bg-sky-50">
          <ExerciseVisual exercise={exercise} />
        </div>
      </div>

      <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-bold uppercase text-slate-500">
          {labels.questionCount.replace("{current}", String(attemptCount))}
        </p>
        <p className="mt-3 text-lg font-bold text-slate-950">{exercise.prompt}</p>

        <label className="mt-5 grid gap-2 text-sm font-semibold text-slate-800">
          {labels.answerLabel}
          <input
            className="min-h-14 rounded-md border border-slate-300 px-4 text-2xl font-bold outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            inputMode="numeric"
            placeholder={labels.answerPlaceholder}
            value={answer}
            onChange={(event) => {
              setAnswer(event.target.value);
              setFeedback(null);
            }}
          />
        </label>

        {feedback ? (
          <p
            className={
              feedback === "correct"
                ? "mt-4 inline-flex items-center gap-2 font-semibold text-emerald-700"
                : "mt-4 font-semibold text-sky-700"
            }
          >
            {feedback === "correct" ? <CheckCircle2 aria-hidden="true" size={18} /> : null}
            {feedback === "correct" ? labels.correctFeedback : labels.incorrectFeedback}
          </p>
        ) : null}

        {error ? <p className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-800">{error}</p> : null}

        <div className="mt-6 grid gap-3">
          {!feedback ? (
            <button
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={saving || !answer.trim()}
              type="button"
              onClick={() => void submitAnswer()}
            >
              {saving ? <Loader2 aria-hidden="true" className="animate-spin" size={18} /> : null}
              {saving ? labels.saving : labels.checkAnswer}
            </button>
          ) : (
            <button
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              type="button"
              onClick={nextExercise}
            >
              {labels.nextQuestion}
            </button>
          )}
        </div>
      </aside>
    </section>
  );
}
