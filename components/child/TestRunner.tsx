"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChildStateMessage } from "@/components/child/ChildStateMessage";
import { AnswerPad } from "@/components/math/AnswerPad";
import { ExerciseVisual } from "@/components/math/ExerciseVisual";
import { useChildProfile } from "@/hooks/useChildProfile";
import { completeLearningSession, createLearningSession, saveAttempt } from "@/lib/firestore";
import { generateExercise, validateAnswer } from "@/lib/math-engine";
import { getLevelDisplayName } from "@/lib/math-engine/levelDisplay";
import type { Exercise, ExerciseAttempt, Locale } from "@/types";

type TestRunnerLabels = {
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
  submitAnswer: string;
  saving: string;
  saveError: string;
  completeTitle: string;
  completeDescription: string;
  backToChild: string;
  goDiagnostic: string;
};

type TestRunnerProps = {
  labels: TestRunnerLabels;
  locale: Locale;
};

const testTaskCount = 10;

export function TestRunner({ labels, locale }: TestRunnerProps) {
  const { selectedChild, loading } = useChildProfile();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [answer, setAnswer] = useState("");
  const [taskIndex, setTaskIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sessionIdRef = useRef("");
  const responseTimeTotalRef = useRef(0);
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
        mode: "test",
        levelId: selectedChild.currentLevelId,
        locale
      });

      try {
        if (!sessionIdRef.current) {
          const session = await createLearningSession({
            childProfileId: selectedChild.id,
            mode: "test",
            topic: nextExercise.topic,
            levelId: nextExercise.levelId,
            startedAt: new Date(now)
          });

          sessionIdRef.current = session.id;
        }
      } catch {
        if (!cancelled) {
          setError(labels.saveError);
          setExercise(null);
        }
        return;
      }

      if (!cancelled) {
        startedAtRef.current = now;
        setExercise(nextExercise);
      }
    }

    void prepareExercise();

    return () => {
      cancelled = true;
    };
  }, [completed, labels.saveError, locale, selectedChild]);

  function createNextExercise() {
    if (!selectedChild) {
      return;
    }

    setExercise(
      generateExercise({
        childProfileId: selectedChild.id,
        mode: "test",
        levelId: selectedChild.currentLevelId,
        locale
      })
    );
    startedAtRef.current = Date.now();
  }

  async function submitAnswer(answerValue = answer) {
    if (!exercise || !selectedChild || saving || submittingRef.current || !answerValue.trim()) {
      return;
    }

    if (!sessionIdRef.current) {
      setError(labels.saveError);
      return;
    }

    const validation = validateAnswer(exercise, answerValue);
    const nextCorrectCount = correctCount + (validation.isCorrect ? 1 : 0);
    const responseTimeMs = Date.now() - startedAtRef.current;
    const attempt: ExerciseAttempt = {
      id: exercise.id,
      childProfileId: selectedChild.id,
      sessionId: sessionIdRef.current,
      topic: exercise.topic,
      levelId: exercise.levelId,
      mode: "test",
      questionType: exercise.questionType,
      operands: exercise.operands,
      operator: exercise.operator,
      correctAnswer: exercise.correctAnswer,
      givenAnswer: validation.normalizedAnswer,
      isCorrect: validation.isCorrect,
      responseTimeMs,
      usedHint: false,
      visualModel: exercise.visualModel,
      createdAt: new Date()
    };

    submittingRef.current = true;
    setSaving(true);
    setError(null);

    try {
      await saveAttempt(attempt);
      const nextResponseTimeTotal = responseTimeTotalRef.current + responseTimeMs;

      responseTimeTotalRef.current = nextResponseTimeTotal;
      setCorrectCount(nextCorrectCount);

      if (taskIndex + 1 >= testTaskCount) {
        try {
          await completeLearningSession(sessionIdRef.current, {
            endedAt: new Date(),
            totalTasks: testTaskCount,
            correctTasks: nextCorrectCount,
            averageResponseTimeMs: Math.round(nextResponseTimeTotal / testTaskCount)
          });
        } catch {
          setError(labels.saveError);
        }

        setCompleted(true);
        setAnswer("");
        return;
      }

      setTaskIndex((current) => current + 1);
      setAnswer("");
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
            .replace("{total}", String(testTaskCount))}
        </p>
        {error ? <p className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-800">{error}</p> : null}
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
    return <ChildStateMessage message={error ?? labels.loadingChild} />;
  }

  const progressLabel = labels.questionCount
    .replace("{current}", String(taskIndex + 1))
    .replace("{total}", String(testTaskCount));
  const progressPercent = ((taskIndex + 1) / testTaskCount) * 100;
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
          submitLabel={labels.submitAnswer}
          value={answer}
          onChange={setAnswer}
          onSubmit={(nextAnswer) => void submitAnswer(nextAnswer)}
        />

        {error ? <p className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-800">{error}</p> : null}
      </form>
    </section>
  );
}
