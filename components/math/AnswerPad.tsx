"use client";

import { Check, Delete, Loader2 } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import type { Exercise } from "@/types";

type AnswerPadProps = {
  clearLabel: string;
  disabled: boolean;
  exercise: Exercise;
  helperText: string;
  label: string;
  saving: boolean;
  savingLabel: string;
  submitLabel: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
};

function getMaxAnswerValue(exercise: Exercise): number {
  if (exercise.topic === "addition_to_20" || exercise.topic === "bridge_through_10") {
    return 20;
  }

  if (exercise.topic === "addition_to_5") {
    return 5;
  }

  return 10;
}

function appendDigit(currentValue: string, digit: string, maxValue: number): string {
  const nextValue = currentValue === "0" ? digit : `${currentValue}${digit}`;
  const parsedValue = Number(nextValue);

  if (!Number.isInteger(parsedValue) || parsedValue > maxValue) {
    return currentValue;
  }

  return nextValue;
}

export function AnswerPad({
  clearLabel,
  disabled,
  exercise,
  helperText,
  label,
  onChange,
  onSubmit,
  saving,
  savingLabel,
  submitLabel,
  value
}: AnswerPadProps) {
  const padRef = useRef<HTMLDivElement>(null);
  const maxValue = getMaxAnswerValue(exercise);
  const choices = useMemo(() => Array.from({ length: maxValue + 1 }, (_, index) => index), [maxValue]);
  const canSubmitTypedValue = value.trim().length > 0 && Number(value) <= maxValue;

  useEffect(() => {
    padRef.current?.focus();
  }, [exercise.id]);

  function chooseAnswer(choice: number) {
    if (disabled || saving) {
      return;
    }

    const nextValue = String(choice);

    onChange(nextValue);
    onSubmit(nextValue);
  }

  function submitTypedAnswer() {
    if (!canSubmitTypedValue || disabled || saving) {
      return;
    }

    onSubmit(value);
  }

  return (
    <div
      ref={padRef}
      className="mt-5 grid gap-4 outline-none"
      role="group"
      tabIndex={0}
      aria-label={label}
      onKeyDown={(event) => {
        if (/^\d$/.test(event.key)) {
          event.preventDefault();
          onChange(appendDigit(value, event.key, maxValue));
          return;
        }

        if (event.key === "Backspace") {
          event.preventDefault();
          onChange(value.slice(0, -1));
          return;
        }

        if (event.key === "Enter") {
          event.preventDefault();
          submitTypedAnswer();
        }
      }}
    >
      <div>
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        <p className="mt-1 text-xs font-medium text-slate-500">{helperText}</p>
      </div>

      <div className="min-h-16 rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-center text-4xl font-black text-slate-950">
        {value || "?"}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {choices.map((choice) => (
          <button
            key={choice}
            className="min-h-14 rounded-md border border-slate-200 bg-white text-2xl font-black text-slate-950 shadow-sm transition hover:border-emerald-400 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={disabled || saving}
            type="button"
            onClick={() => chooseAnswer(choice)}
          >
            {choice}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[64px_1fr] gap-2">
        <button
          className="inline-flex min-h-12 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={disabled || saving || !value}
          type="button"
          aria-label={clearLabel}
          onClick={() => onChange(value.slice(0, -1))}
        >
          <Delete aria-hidden="true" size={22} />
        </button>
        <button
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={disabled || saving || !canSubmitTypedValue}
          type="button"
          onClick={submitTypedAnswer}
        >
          {saving ? <Loader2 aria-hidden="true" className="animate-spin" size={18} /> : <Check aria-hidden="true" size={18} />}
          {saving ? savingLabel : submitLabel}
        </button>
      </div>
    </div>
  );
}
