"use client";

import { PreviewCompletionPanel, type PreviewCompletionNextStep } from "@/components/curriculum/PreviewCompletionPanel";
import type { ReactNode } from "react";
import { useState } from "react";
import { markPreviewLessonCompleted } from "@/lib/curriculum/local-preview-progress";

type ActivityId =
  | "tensAndOnes"
  | "addTens"
  | "addTensAndOnes"
  | "subtractTens"
  | "addOnes"
  | "reflection";

type ActivityFeedback = {
  tone: "success" | "gentle";
  message: string;
};

type Activity = {
  id: ActivityId;
  title: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
  successMessage: string;
  gentleMessage: string;
  visual: ReactNode;
};

type PreviewCompletionProps = {
  nextStep?: PreviewCompletionNextStep;
};

const gentleMessage = "Skús sa pozrieť ešte raz. Výsledky sa neukladajú.";

const activities: Activity[] = [
  {
    id: "tensAndOnes",
    title: "1. Desiatky a jednotky",
    prompt: "Aké číslo ukazujú 3 desiatky a 4 jednotky?",
    options: ["34", "43", "30"],
    correctAnswer: "34",
    successMessage: "Áno, 3 desiatky a 4 jednotky tvoria číslo 34.",
    gentleMessage,
    visual: <PlaceValueBlocks tens={3} ones={4} />
  },
  {
    id: "addTens",
    title: "2. Sčítaj desiatky",
    prompt: "Koľko je 20 + 30?",
    options: ["40", "50", "60"],
    correctAnswer: "50",
    successMessage: "Áno, 2 desiatky a 3 desiatky je 5 desiatok.",
    gentleMessage,
    visual: <TensExpression leftTens={2} operator="+" rightTens={3} resultTens={5} />
  },
  {
    id: "addTensAndOnes",
    title: "3. Pridaj desiatky",
    prompt: "Koľko je 34 + 20?",
    options: ["44", "54", "64"],
    correctAnswer: "54",
    successMessage: "Áno, pridáme dve desiatky a jednotky zostanú rovnaké.",
    gentleMessage,
    visual: <PlaceValueOperation start="34" change="+20" result="54" note="desiatky sa zväčšia" />
  },
  {
    id: "subtractTens",
    title: "4. Odober desiatky",
    prompt: "Koľko je 67 - 30?",
    options: ["27", "37", "47"],
    correctAnswer: "37",
    successMessage: "Áno, odoberieme tri desiatky.",
    gentleMessage,
    visual: <PlaceValueOperation start="67" change="-30" result="37" note="desiatky sa zmenšia" />
  },
  {
    id: "addOnes",
    title: "5. Pridaj jednotky",
    prompt: "Koľko je 42 + 5?",
    options: ["45", "47", "52"],
    correctAnswer: "47",
    successMessage: "Áno, pridáme päť jednotiek.",
    gentleMessage,
    visual: <OnesOperation start="42" addedOnes={5} result="47" />
  },
  {
    id: "reflection",
    title: "6. Premýšľaj o čísle",
    prompt: "Povedz si nahlas: Pri dvojciferných číslach si všímam desiatky a jednotky.",
    options: ["Rozumiem"],
    correctAnswer: "Rozumiem",
    successMessage: "Výborne. Toto je iba ukážka bez hodnotenia.",
    gentleMessage: "Skús si vetu povedať pokojne nahlas.",
    visual: (
      <div className="rounded-xl bg-white p-5 text-center shadow-sm">
        <p className="text-5xl font-black text-slate-950">10 + 1</p>
        <p className="mt-2 text-base font-bold text-slate-700">desiatky a jednotky</p>
      </div>
    )
  }
];

const totalActivities = activities.length;

export function AdditionSubtractionTo100Preview({ nextStep }: PreviewCompletionProps) {
  const [answers, setAnswers] = useState<Partial<Record<ActivityId, string>>>({});
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completionMessageVisible, setCompletionMessageVisible] = useState(false);

  const currentActivity = activities[currentStepIndex];
  const completedActivities = activities.filter((activity) => answers[activity.id] === activity.correctAnswer).length;
  const allActivitiesComplete = completedActivities === totalActivities;
  const selectedAnswer = answers[currentActivity.id];
  const currentFeedback = getFeedback(currentActivity, selectedAnswer);
  const currentStepComplete = selectedAnswer === currentActivity.correctAnswer;

  function selectAnswer(activityId: ActivityId, value: string) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [activityId]: value
    }));
    setCompletionMessageVisible(false);
  }

  function goToPreviousStep() {
    setCurrentStepIndex((index) => Math.max(0, index - 1));
  }

  function goToNextStep() {
    setCurrentStepIndex((index) => Math.min(totalActivities - 1, index + 1));
  }

  function completePreviewLesson() {
    markPreviewLessonCompleted("addition_subtraction_to_100");
    setCompletionMessageVisible(true);
  }

  return (
    <section className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm md:p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase text-emerald-800">
            Preview lekcia - iba lokálne v tomto prehliadači.
          </p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">Mini lekcia krok za krokom</h2>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-emerald-950">
            Klikni na odpoveď a uvidíš len priateľskú spätnú väzbu. Nie je to test a do účtu sa nič nezapisuje.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex w-fit rounded-full bg-white px-3 py-1 text-xs font-bold uppercase text-emerald-800 shadow-sm">
            Krok {currentStepIndex + 1} z {totalActivities}
          </span>
          <span className="inline-flex w-fit rounded-full bg-white px-3 py-1 text-xs font-bold uppercase text-emerald-800 shadow-sm">
            Hotové: {completedActivities} / {totalActivities}
          </span>
        </div>
      </div>

      <article className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-black text-slate-950">{currentActivity.title}</h3>
              {currentStepComplete ? (
                <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-black uppercase text-emerald-800">
                  hotovo
                </span>
              ) : null}
            </div>
            <p className="mt-3 text-2xl font-black leading-9 text-slate-900">{currentActivity.prompt}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {currentActivity.options.map((option) => (
                <button
                  className={`min-h-14 min-w-24 rounded-xl border px-5 py-3 text-xl font-black transition focus:outline-none focus:ring-4 focus:ring-sky-200 ${
                    selectedAnswer === option
                      ? "border-slate-950 bg-slate-950 text-white"
                      : "border-slate-200 bg-white text-slate-950 hover:border-sky-400 hover:bg-sky-50"
                  }`}
                  key={option}
                  onClick={() => selectAnswer(currentActivity.id, option)}
                  type="button"
                >
                  {option}
                </button>
              ))}
            </div>
            {currentFeedback ? (
              <p
                className={`mt-4 rounded-xl border p-4 text-base font-bold leading-7 ${
                  currentFeedback.tone === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-950"
                    : "border-sky-200 bg-sky-50 text-sky-950"
                }`}
              >
                {currentFeedback.message}
              </p>
            ) : null}
          </div>
          <div>{currentActivity.visual}</div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            className="min-h-12 rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-black text-slate-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={currentStepIndex === 0}
            onClick={goToPreviousStep}
            type="button"
          >
            Späť
          </button>
          <button
            className="min-h-12 rounded-xl bg-slate-950 px-5 py-3 text-base font-black text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={currentStepIndex === totalActivities - 1}
            onClick={goToNextStep}
            type="button"
          >
            Ďalej
          </button>
        </div>
      </article>

      {allActivitiesComplete ? (
        <section className="mt-5 rounded-2xl border border-emerald-300 bg-white p-5 shadow-sm">
          <h3 className="text-2xl font-black text-emerald-950">Dokončil/a si mini lekciu.</h3>
          <ul className="mt-4 grid gap-2 text-base font-semibold leading-7 text-slate-700">
            <li>Vieš rozlíšiť desiatky a jednotky.</li>
            <li>Vieš sčítať celé desiatky.</li>
            <li>Vieš pridať alebo odobrať desiatky.</li>
            <li>Vieš pridať jednotky bez prechodu cez desiatku.</li>
          </ul>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              className="min-h-14 rounded-xl bg-emerald-700 px-5 py-3 text-lg font-black text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-200"
              onClick={completePreviewLesson}
              type="button"
            >
              Dokončiť lekciu
            </button>
          </div>
          <PreviewCompletionPanel isVisible={completionMessageVisible} nextStep={nextStep} />
        </section>
      ) : null}
    </section>
  );
}

function PlaceValueBlocks({ ones, tens }: { ones: number; tens: number }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <div className="flex items-end justify-center gap-3">
        <div className="grid gap-2">
          <p className="text-center text-xs font-black uppercase text-slate-500">desiatky</p>
          <div className="flex gap-2">
            {Array.from({ length: tens }, (_, index) => (
              <span
                className="inline-flex h-24 w-8 items-center justify-center rounded-lg bg-emerald-500 text-sm font-black text-white shadow-sm"
                key={`ten-${index}`}
              >
                10
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-2">
          <p className="text-center text-xs font-black uppercase text-slate-500">jednotky</p>
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: ones }, (_, index) => (
              <span className="size-7 rounded-full bg-sky-500 shadow-sm" key={`one-${index}`} />
            ))}
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-sm font-bold text-slate-700">
        {tens} desiatky a {ones} jednotky.
      </p>
    </div>
  );
}

function TensExpression({
  leftTens,
  operator,
  resultTens,
  rightTens
}: {
  leftTens: number;
  operator: "+" | "-";
  resultTens: number;
  rightTens: number;
}) {
  return (
    <div className="rounded-xl bg-white p-5 text-center shadow-sm">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <TensStack count={leftTens} />
        <span className="text-3xl font-black text-slate-500">{operator}</span>
        <TensStack count={rightTens} />
        <span className="text-3xl font-black text-slate-500">=</span>
        <TensStack count={resultTens} />
      </div>
      <p className="mt-4 text-sm font-bold text-slate-700">Počítame celé desiatky.</p>
    </div>
  );
}

function TensStack({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }, (_, index) => (
        <span
          className="inline-flex h-16 w-6 items-center justify-center rounded-md bg-emerald-500 text-xs font-black text-white shadow-sm"
          key={`tens-stack-${count}-${index}`}
        >
          10
        </span>
      ))}
    </div>
  );
}

function PlaceValueOperation({
  change,
  note,
  result,
  start
}: {
  change: string;
  note: string;
  result: string;
  start: string;
}) {
  return (
    <div className="rounded-xl bg-white p-5 text-center shadow-sm">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {[start, change, "=", result].map((part) => (
          <span
            className="inline-flex min-h-14 min-w-16 items-center justify-center rounded-xl bg-sky-100 px-4 text-3xl font-black text-sky-950"
            key={part}
          >
            {part}
          </span>
        ))}
      </div>
      <p className="mt-4 text-sm font-bold text-slate-700">{note}</p>
    </div>
  );
}

function OnesOperation({ addedOnes, result, start }: { addedOnes: number; result: string; start: string }) {
  return (
    <div className="rounded-xl bg-white p-5 text-center shadow-sm">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="inline-flex min-h-14 min-w-16 items-center justify-center rounded-xl bg-sky-100 px-4 text-3xl font-black text-sky-950">
          {start}
        </span>
        <span className="text-3xl font-black text-slate-500">+</span>
        <div className="flex flex-wrap justify-center gap-2">
          {Array.from({ length: addedOnes }, (_, index) => (
            <span className="size-7 rounded-full bg-sky-500 shadow-sm" key={`added-one-${index}`} />
          ))}
        </div>
        <span className="text-3xl font-black text-slate-500">=</span>
        <span className="inline-flex min-h-14 min-w-16 items-center justify-center rounded-xl bg-emerald-100 px-4 text-3xl font-black text-emerald-950">
          {result}
        </span>
      </div>
      <p className="mt-4 text-sm font-bold text-slate-700">Jednotky pridáme k jednotkám.</p>
    </div>
  );
}

function getFeedback(activity: Activity, selectedAnswer?: string): ActivityFeedback | undefined {
  if (!selectedAnswer) {
    return undefined;
  }

  if (selectedAnswer === activity.correctAnswer) {
    return {
      tone: "success",
      message: activity.successMessage
    };
  }

  return {
    tone: "gentle",
    message: activity.gentleMessage
  };
}
