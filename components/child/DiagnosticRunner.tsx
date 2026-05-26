"use client";

import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { DIAGNOSTIC_STEPS } from "@/data/diagnostic";
import { generateExercise, validateAnswer } from "@/lib/math-engine";
import { completeChildDiagnostic, saveAttempt } from "@/lib/firestore";
import type { Exercise, ExerciseAttempt, LevelId } from "@/types";
import { DotModel } from "@/components/math/DotModel";
import { NumberLine } from "@/components/math/NumberLine";
import { TenFrame } from "@/components/math/TenFrame";

type DiagnosticRunnerLabels = {
  title: string;
  description: string;
  questionCount: string;
  answerLabel: string;
  answerPlaceholder: string;
  checkAnswer: string;
  nextQuestion: string;
  finish: string;
  saving: string;
  correctFeedback: string;
  tryAgainFeedback: string;
  completeTitle: string;
  completeDescription: string;
  continueButton: string;
  missingChild: string;
  saveError: string;
};

type DiagnosticRunnerProps = {
  labels: DiagnosticRunnerLabels;
};

const selectedChildStorageKey = "math-visual-trainer:selected-child-profile-id";
const diagnosticQuestionCount = 12;

const diagnosticPlan = DIAGNOSTIC_STEPS.flatMap((step) =>
  Array.from({ length: step.id === "subtraction-to-10" ? 1 : 2 }).map(() => step)
).slice(0, diagnosticQuestionCount);

function getSelectedChildProfileId(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(selectedChildStorageKey);
}

function createExercise(childProfileId: string, stepIndex: number): Exercise {
  const step = diagnosticPlan[stepIndex] ?? diagnosticPlan[0];

  return generateExercise({
    childProfileId,
    mode: "diagnostic",
    levelId: "L0_DIAGNOSTIC",
    topic: step.topic,
    preferredVisualModel: step.visualModel
  });
}

function pickStartingLevel(attempts: ExerciseAttempt[]): LevelId {
  const accuracy = attempts.length === 0 ? 0 : attempts.filter((attempt) => attempt.isCorrect).length / attempts.length;
  const additionTo10Correct = attempts.some((attempt) => attempt.topic === "addition_to_10" && attempt.isCorrect);
  const make10Correct = attempts.some((attempt) => attempt.topic === "make_10" && attempt.isCorrect);
  const additionTo5Correct = attempts.some((attempt) => attempt.topic === "addition_to_5" && attempt.isCorrect);
  const quantityTo10Correct = attempts.some((attempt) => attempt.topic === "quantity_to_10" && attempt.isCorrect);

  if (accuracy >= 0.85 && additionTo10Correct && make10Correct) {
    return "L5_ADDITION_TO_10";
  }

  if (accuracy >= 0.75 && make10Correct) {
    return "L4_MAKE_10";
  }

  if (accuracy >= 0.65 && quantityTo10Correct) {
    return "L3_QUANTITY_TO_10";
  }

  if (accuracy >= 0.55 && additionTo5Correct) {
    return "L2_ADDITION_TO_5";
  }

  return "L1_QUANTITY_TO_5";
}

function renderVisualModel(exercise: Exercise) {
  const primary = exercise.operands[0] ?? 0;

  if (exercise.visualModel === "ten_frame") {
    return <TenFrame filled={primary} />;
  }

  if (exercise.visualModel === "number_line") {
    return <NumberLine end={exercise.correctAnswer} start={primary} />;
  }

  return <DotModel count={primary} />;
}

export function DiagnosticRunner({ labels }: DiagnosticRunnerProps) {
  const router = useRouter();
  const childProfileIdRef = useRef<string | null>(null);
  const sessionIdRef = useRef("");
  const [stepIndex, setStepIndex] = useState(0);
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [attempts, setAttempts] = useState<ExerciseAttempt[]>([]);
  const [lastAttempt, setLastAttempt] = useState<ExerciseAttempt | null>(null);
  const [completed, setCompleted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const startedAtRef = useRef(0);

  useEffect(() => {
    const selectedChildProfileId = getSelectedChildProfileId();
    childProfileIdRef.current = selectedChildProfileId;
    sessionIdRef.current = `diagnostic-${Date.now()}`;

    if (selectedChildProfileId) {
      window.setTimeout(() => {
        setExercise(createExercise(selectedChildProfileId, 0));
      }, 0);
      startedAtRef.current = Date.now();
    }
  }, []);

  if (!exercise) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm font-medium text-amber-900">
        {labels.missingChild}
      </div>
    );
  }

  const progressLabel = labels.questionCount
    .replace("{current}", String(stepIndex + 1))
    .replace("{total}", String(diagnosticPlan.length));

  async function submitAnswer() {
    if (!exercise || saving) {
      return;
    }

    const validation = validateAnswer(exercise, answer);
    const activeChildProfileId = childProfileIdRef.current;

    if (!activeChildProfileId) {
      setError(labels.missingChild);
      return;
    }

    const attempt: ExerciseAttempt = {
      id: exercise.id,
      childProfileId: activeChildProfileId,
      sessionId: sessionIdRef.current,
      topic: exercise.topic,
      levelId: exercise.levelId,
      mode: "diagnostic",
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
      setAttempts((currentAttempts) => [...currentAttempts, attempt]);
      setLastAttempt(attempt);
      setFeedback(validation.isCorrect ? "correct" : "incorrect");
    } catch {
      setError(labels.saveError);
    } finally {
      setSaving(false);
    }
  }

  async function goNext() {
    const nextStepIndex = stepIndex + 1;
    const activeChildProfileId = childProfileIdRef.current;

    if (!activeChildProfileId) {
      setError(labels.missingChild);
      return;
    }

    if (nextStepIndex >= diagnosticPlan.length) {
      setSaving(true);
      setError(null);

      try {
        const completedAttempts = lastAttempt && !attempts.some((attempt) => attempt.id === lastAttempt.id)
          ? [...attempts, lastAttempt]
          : attempts;
        const nextLevelId = pickStartingLevel(completedAttempts);
        await completeChildDiagnostic(activeChildProfileId, nextLevelId);
        setCompleted(true);
      } catch {
        setError(labels.saveError);
      } finally {
        setSaving(false);
      }

      return;
    }

    setStepIndex(nextStepIndex);
    setExercise(createExercise(activeChildProfileId, nextStepIndex));
    setAnswer("");
    setFeedback(null);
    setLastAttempt(null);
    startedAtRef.current = Date.now();
  }

  if (completed) {
    return (
      <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-6">
        <CheckCircle2 aria-hidden="true" className="text-emerald-700" size={36} />
        <h1 className="mt-4 text-3xl font-bold text-slate-950">{labels.completeTitle}</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700">{labels.completeDescription}</p>
        <button
          className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
          type="button"
          onClick={() => router.push("/child")}
        >
          {labels.continueButton}
          <ArrowRight aria-hidden="true" size={18} />
        </button>
      </section>
    );
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="rounded-lg border border-sky-200 bg-sky-50 p-5">
        <p className="text-sm font-bold uppercase text-sky-700">{progressLabel}</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">{labels.title}</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700">{labels.description}</p>

        <div className="mt-8 flex min-h-64 items-center justify-center">{renderVisualModel(exercise)}</div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-lg font-bold text-slate-950">{exercise.prompt}</p>
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
          <p className={feedback === "correct" ? "mt-4 font-semibold text-emerald-700" : "mt-4 font-semibold text-sky-700"}>
            {feedback === "correct" ? labels.correctFeedback : labels.tryAgainFeedback}
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
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={saving}
              type="button"
              onClick={() => void goNext()}
            >
              {saving ? <Loader2 aria-hidden="true" className="animate-spin" size={18} /> : null}
              {stepIndex + 1 >= diagnosticPlan.length ? labels.finish : labels.nextQuestion}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
