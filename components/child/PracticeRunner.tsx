"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChildStateMessage } from "@/components/child/ChildStateMessage";
import { AnswerPad } from "@/components/math/AnswerPad";
import { ExerciseVisual } from "@/components/math/ExerciseVisual";
import { useChildProfile } from "@/hooks/useChildProfile";
import { saveAttempt } from "@/lib/firestore";
import { generateExercise, validateAnswer } from "@/lib/math-engine";
import { getLevelDisplayName } from "@/lib/math-engine/levelDisplay";
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
  clearAnswer: string;
  checkAnswer: string;
  nextQuestion: string;
  finishPractice: string;
  saving: string;
  correctFeedback: string;
  incorrectFeedback: string;
  saveError: string;
  completeTitle: string;
  completeDescription: string;
  backToChild: string;
  goDiagnostic: string;
};

type PracticeRunnerProps = {
  labels: PracticeRunnerLabels;
  locale: Locale;
};

const practiceTaskCount = 10;

export function PracticeRunner({ labels, locale }: PracticeRunnerProps) {
  const { selectedChild, loading } = useChildProfile();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [answer, setAnswer] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attemptCount, setAttemptCount] = useState(1);
  const [correctCount, setCorrectCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const sessionIdRef = useRef("");
  const startedAtRef = useRef(0);
  const submittingRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function prepareExercise() {
      if (completed || !selectedChild || !selectedChild.diagnosticCompletedAt) {
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
  }, [completed, locale, selectedChild]);

  function createNextExercise() {
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
    setError(null);
    setAttemptCount((current) => current + 1);
    startedAtRef.current = Date.now();
  }

  async function submitAnswer(answerValue = answer) {
    if (!exercise || !selectedChild || saving || submittingRef.current || !answerValue.trim()) {
      return;
    }

    const validation = validateAnswer(exercise, answerValue);
    const nextCorrectCount = correctCount + (validation.isCorrect ? 1 : 0);
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

    submittingRef.current = true;
    setSaving(true);
    setError(null);

    try {
      await saveAttempt(attempt);
      setCorrectCount(nextCorrectCount);

      if (attemptCount >= practiceTaskCount) {
        setCompleted(true);
        setAnswer("");
        return;
      }

      createNextExercise();
    } catch {
      setError(labels.saveError);
    } finally {
      submittingRef.current = false;
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

  if (completed) {
    return (
      <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-6">
        <CheckCircle2 aria-hidden="true" className="text-emerald-700" size={36} />
        <h1 className="mt-4 text-3xl font-bold text-slate-950">{labels.completeTitle}</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700">
          {labels.completeDescription
            .replace("{correct}", String(correctCount))
            .replace("{total}", String(practiceTaskCount))}
        </p>
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

  const progressLabel = labels.questionCount
    .replace("{current}", String(attemptCount))
    .replace("{total}", String(practiceTaskCount));
  const progressPercent = (attemptCount / practiceTaskCount) * 100;
  const currentLevelName = getLevelDisplayName(selectedChild.currentLevelId, locale);

  return (
    <section className="grid gap-6 py-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="rounded-lg border border-sky-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-bold uppercase text-sky-700">
            {labels.selectedLevel.replace("{level}", currentLevelName)}
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
      </div>

      <form
        className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
        onSubmit={(event) => {
          event.preventDefault();
          void submitAnswer();
        }}
      >
        <p className="text-sm font-bold uppercase text-slate-500">{progressLabel}</p>
        <p className="mt-3 text-lg font-bold text-slate-950">{exercise.prompt}</p>

        <AnswerPad
          clearLabel={labels.clearAnswer}
          disabled={saving}
          exercise={exercise}
          helperText={labels.answerPlaceholder}
          label={labels.answerLabel}
          saving={saving}
          savingLabel={labels.saving}
          submitLabel={labels.checkAnswer}
          value={answer}
          onChange={setAnswer}
          onSubmit={(nextAnswer) => void submitAnswer(nextAnswer)}
        />

        {error ? <p className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-800">{error}</p> : null}
      </form>
    </section>
  );
}
