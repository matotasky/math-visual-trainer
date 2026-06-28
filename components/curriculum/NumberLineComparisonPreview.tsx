"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";

type ActivityId = "findNumber" | "biggerNumber" | "smallerNumber" | "orderNumbers" | "neighbors" | "reflection";

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

const activities: Activity[] = [
  {
    id: "findNumber",
    title: "1. Nájdi číslo",
    prompt: "Ktoré číslo je označené?",
    options: ["5", "6", "7"],
    correctAnswer: "6",
    successMessage: "Áno, označené je číslo 6.",
    gentleMessage: "Skús sa pozrieť ešte raz. Výsledky sa neukladajú.",
    visual: <NumberLine highlighted={6} />
  },
  {
    id: "biggerNumber",
    title: "2. Väčšie číslo",
    prompt: "Ktoré číslo je väčšie?",
    options: ["4", "8"],
    correctAnswer: "8",
    successMessage: "Áno, 8 je väčšie ako 4.",
    gentleMessage: "Skús sa pozrieť ešte raz. Výsledky sa neukladajú.",
    visual: <NumberCards left="4" right="8" />
  },
  {
    id: "smallerNumber",
    title: "3. Menšie číslo",
    prompt: "Ktoré číslo je menšie?",
    options: ["3", "9"],
    correctAnswer: "3",
    successMessage: "Áno, 3 je menšie ako 9.",
    gentleMessage: "Skús sa pozrieť ešte raz. Výsledky sa neukladajú.",
    visual: <NumberCards left="3" right="9" />
  },
  {
    id: "orderNumbers",
    title: "4. Usporiadaj čísla",
    prompt: "Ktoré poradie je od najmenšieho po najväčšie?",
    options: ["2, 5, 9", "9, 5, 2", "5, 2, 9"],
    correctAnswer: "2, 5, 9",
    successMessage: "Áno, čísla rastú zľava doprava.",
    gentleMessage: "Skús sa pozrieť ešte raz. Výsledky sa neukladajú.",
    visual: <NumberLine markers={[2, 5, 9]} />
  },
  {
    id: "neighbors",
    title: "5. Pred a za",
    prompt: "Čo je hneď pred a hneď za číslom 7?",
    options: ["6 a 8", "5 a 8", "6 a 9"],
    correctAnswer: "6 a 8",
    successMessage: "Áno, pred 7 je 6 a za 7 je 8.",
    gentleMessage: "Skús sa pozrieť ešte raz. Výsledky sa neukladajú.",
    visual: <NumberLine highlighted={7} />
  },
  {
    id: "reflection",
    title: "6. Premýšľaj o osi",
    prompt: "Povedz si nahlas: Na číselnej osi väčšie čísla ležia viac vpravo.",
    options: ["Rozumiem"],
    correctAnswer: "Rozumiem",
    successMessage: "Výborne. Toto je iba ukážka bez hodnotenia.",
    gentleMessage: "Skús si vetu povedať pokojne nahlas.",
    visual: (
      <div className="rounded-xl bg-white p-5 text-center shadow-sm">
        <p className="text-5xl font-black text-slate-950">0 → 10</p>
        <p className="mt-2 text-base font-bold text-slate-700">väčšie čísla sú viac vpravo</p>
      </div>
    )
  }
];

const totalActivities = activities.length;

export function NumberLineComparisonPreview() {
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
    // Completion is intentionally local-only; no scoring or progress write happens here.
    setCompletionMessageVisible(true);
  }

  return (
    <section className="mt-6 rounded-2xl border border-sky-200 bg-sky-50 p-5 shadow-sm md:p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase text-sky-800">Preview lekcia — výsledky sa neukladajú.</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">Mini lekcia krok za krokom</h2>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-sky-950">
            Klikni na odpoveď a uvidíš len priateľskú spätnú väzbu. Nič sa nehodnotí a nič sa nikam nezapisuje.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex w-fit rounded-full bg-white px-3 py-1 text-xs font-bold uppercase text-sky-800 shadow-sm">
            Krok {currentStepIndex + 1} z {totalActivities}
          </span>
          <span className="inline-flex w-fit rounded-full bg-white px-3 py-1 text-xs font-bold uppercase text-sky-800 shadow-sm">
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
            <li>Vieš nájsť číslo na číselnej osi.</li>
            <li>Vieš porovnať väčšie a menšie číslo.</li>
            <li>Vieš usporiadať čísla.</li>
            <li>Vieš nájsť číslo pred a za.</li>
          </ul>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              className="min-h-14 rounded-xl bg-emerald-700 px-5 py-3 text-lg font-black text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-200"
              onClick={completePreviewLesson}
              type="button"
            >
              Dokončiť lekciu
            </button>
            <Link
              className="inline-flex min-h-14 items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-lg font-black text-white transition hover:bg-slate-800"
              href="/child/curriculum"
            >
              Späť na školské učivo
            </Link>
          </div>
          {completionMessageVisible ? (
            <p className="mt-4 rounded-xl border border-sky-200 bg-sky-50 p-4 text-base font-bold leading-7 text-sky-950">
              Hotovo. Táto ukážka sa zatiaľ neukladá.
            </p>
          ) : null}
        </section>
      ) : null}
    </section>
  );
}

function NumberLine({ highlighted, markers = [] }: { highlighted?: number; markers?: number[] }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <div className="grid grid-cols-11 gap-1 border-b-4 border-slate-300 pb-3">
        {Array.from({ length: 11 }, (_, number) => {
          const isHighlighted = number === highlighted;
          const isMarked = markers.includes(number);

          return (
            <span
              className={`inline-flex size-6 items-center justify-center rounded-full text-xs font-black ${
                isHighlighted || isMarked ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-700"
              }`}
              key={number}
            >
              {number}
            </span>
          );
        })}
      </div>
      <p className="mt-3 text-center text-sm font-bold text-slate-700">Číselná os od 0 do 10</p>
    </div>
  );
}

function NumberCards({ left, right }: { left: string; right: string }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-xl bg-white p-5 text-center shadow-sm">
        <p className="text-sm font-bold uppercase text-slate-500">Prvé číslo</p>
        <p className="mt-2 text-6xl font-black text-slate-950">{left}</p>
      </div>
      <div className="rounded-xl bg-white p-5 text-center shadow-sm">
        <p className="text-sm font-bold uppercase text-slate-500">Druhé číslo</p>
        <p className="mt-2 text-6xl font-black text-slate-950">{right}</p>
      </div>
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
