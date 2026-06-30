"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import { markPreviewLessonCompleted } from "@/lib/curriculum/local-preview-progress";

type ActivityId = "joinGroups" | "addNumberLine" | "takeAway" | "subtractNumberLine" | "makeTen" | "reflection";

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

type PreviewCompletionNextStep = {
  href: string;
  label: string;
  description: string;
};

type PreviewCompletionProps = {
  nextStep?: PreviewCompletionNextStep;
};

const activities: Activity[] = [
  {
    id: "joinGroups",
    title: "1. Spoj skupiny",
    prompt: "Koľko je 3 + 2?",
    options: ["4", "5", "6"],
    correctAnswer: "5",
    successMessage: "Áno, 3 a 2 spolu je 5.",
    gentleMessage: "Skús sa pozrieť ešte raz. Výsledky sa neukladajú.",
    visual: <JoiningGroups />
  },
  {
    id: "addNumberLine",
    title: "2. Posuň sa dopredu",
    prompt: "Keď začneš na 4 a posunieš sa o 3 dopredu, kde skončíš?",
    options: ["6", "7", "8"],
    correctAnswer: "7",
    successMessage: "Áno, 4 + 3 = 7.",
    gentleMessage: "Skús sa pozrieť ešte raz. Výsledky sa neukladajú.",
    visual: <JumpNumberLine start={4} end={7} jumpLabel="+3" />
  },
  {
    id: "takeAway",
    title: "3. Odober časť",
    prompt: "Koľko zostane, keď z 8 odoberieme 3?",
    options: ["4", "5", "6"],
    correctAnswer: "5",
    successMessage: "Áno, zostane 5.",
    gentleMessage: "Skús sa pozrieť ešte raz. Výsledky sa neukladajú.",
    visual: <TakingAwayDots total={8} removed={3} />
  },
  {
    id: "subtractNumberLine",
    title: "4. Posuň sa späť",
    prompt: "Keď začneš na 9 a posunieš sa o 4 späť, kde skončíš?",
    options: ["4", "5", "6"],
    correctAnswer: "5",
    successMessage: "Áno, 9 - 4 = 5.",
    gentleMessage: "Skús sa pozrieť ešte raz. Výsledky sa neukladajú.",
    visual: <JumpNumberLine start={9} end={5} jumpLabel="-4" />
  },
  {
    id: "makeTen",
    title: "5. Doplň do 10",
    prompt: "Koľko treba doplniť k 7, aby bolo 10?",
    options: ["2", "3", "4"],
    correctAnswer: "3",
    successMessage: "Áno, 7 potrebuje ešte 3 do 10.",
    gentleMessage: "Skús sa pozrieť ešte raz. Výsledky sa neukladajú.",
    visual: <MakeTenFrame filled={7} />
  },
  {
    id: "reflection",
    title: "6. Premýšľaj o počítaní",
    prompt: "Povedz si nahlas: Sčítanie môže znamenať spájanie a odčítanie môže znamenať uberanie.",
    options: ["Rozumiem"],
    correctAnswer: "Rozumiem",
    successMessage: "Výborne. Toto je iba ukážka bez hodnotenia.",
    gentleMessage: "Skús si vetu povedať pokojne nahlas.",
    visual: (
      <div className="rounded-xl bg-white p-5 text-center shadow-sm">
        <p className="text-5xl font-black text-slate-950">+ a -</p>
        <p className="mt-2 text-base font-bold text-slate-700">spájanie · uberanie</p>
      </div>
    )
  }
];

const totalActivities = activities.length;

export function AdditionSubtractionTo20Preview({ nextStep }: PreviewCompletionProps) {
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
    markPreviewLessonCompleted("addition_subtraction_to_20");
    setCompletionMessageVisible(true);
  }

  return (
    <section className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm md:p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase text-emerald-800">
            Preview lekcia — iba lokálne v tomto prehliadači.
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
            <li>Vieš spojiť dve skupiny.</li>
            <li>Vieš sa posúvať dopredu na číselnej osi.</li>
            <li>Vieš odobrať časť skupiny.</li>
            <li>Vieš doplniť do 10.</li>
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
          {completionMessageVisible ? (
            <div className="mt-4 grid gap-3">
              <div className="rounded-xl border border-sky-200 bg-sky-50 p-4">
                <p className="text-base font-bold leading-7 text-sky-950">
                  Hotovo. Táto ukážka je uložená iba v tomto prehliadači.
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-sky-900">
                  Nie je to test. Do účtu sa nič nezapisuje.
                </p>
              </div>
              {nextStep ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                  <p className="text-sm font-black uppercase text-emerald-800">Ďalší krok</p>
                  <p className="mt-2 text-base font-bold leading-7 text-emerald-950">{nextStep.description}</p>
                  <Link
                    className="mt-4 inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-lg font-black text-white transition hover:bg-slate-800 sm:w-fit"
                    href={nextStep.href}
                  >
                    {nextStep.label}
                  </Link>
                </div>
              ) : (
                <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-base font-bold leading-7 text-emerald-950">
                  Dokončil/a si prvú ukážkovú cestu.
                </p>
              )}
            </div>
          ) : null}
        </section>
      ) : null}
    </section>
  );
}

function JoiningGroups() {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <div className="flex items-center justify-center gap-4">
        <DotGroup count={3} />
        <span className="text-3xl font-black text-slate-700">+</span>
        <DotGroup count={2} />
      </div>
      <p className="mt-4 text-center text-sm font-bold text-slate-700">Spojíme dve skupiny.</p>
    </div>
  );
}

function DotGroup({ count }: { count: number }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {Array.from({ length: count }, (_, index) => (
        <span className="size-8 rounded-full bg-emerald-500 shadow-sm" key={`${count}-${index}`} />
      ))}
    </div>
  );
}

function TakingAwayDots({ total, removed }: { total: number; removed: number }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <div className="mx-auto grid w-fit grid-cols-4 gap-3">
        {Array.from({ length: total }, (_, index) => {
          const isRemoved = index >= total - removed;

          return (
            <span
              className={`relative size-8 rounded-full shadow-sm ${
                isRemoved ? "border-2 border-slate-300 bg-white" : "bg-emerald-500"
              }`}
              key={index}
            >
              {isRemoved ? (
                <span className="absolute left-1/2 top-1/2 h-1 w-9 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-slate-400" />
              ) : null}
            </span>
          );
        })}
      </div>
      <p className="mt-4 text-center text-sm font-bold text-slate-700">Tri bodky odoberieme.</p>
    </div>
  );
}

function MakeTenFrame({ filled }: { filled: number }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <div className="mx-auto grid w-fit grid-cols-5 gap-2">
        {Array.from({ length: 10 }, (_, index) => {
          const isFilled = index < filled;

          return (
            <span
              className={`size-9 rounded-lg border-2 ${
                isFilled ? "border-emerald-500 bg-emerald-500" : "border-sky-300 bg-sky-50"
              }`}
              key={index}
            />
          );
        })}
      </div>
      <p className="mt-4 text-center text-sm font-bold text-slate-700">Sedem už máme, tri miesta doplníme.</p>
    </div>
  );
}

function JumpNumberLine({ end, jumpLabel, start }: { end: number; jumpLabel: string; start: number }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <div className="grid grid-cols-11 gap-1 border-b-4 border-slate-300 pb-3">
        {Array.from({ length: 11 }, (_, number) => {
          const isEdge = number === start || number === end;

          return (
            <span
              className={`inline-flex size-6 items-center justify-center rounded-full text-xs font-black ${
                isEdge ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-700"
              }`}
              key={number}
            >
              {number}
            </span>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-center gap-3 rounded-xl bg-sky-50 p-3 text-lg font-black text-sky-950">
        <span>{start}</span>
        <span>{jumpLabel}</span>
        <span>→</span>
        <span>{end}</span>
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
