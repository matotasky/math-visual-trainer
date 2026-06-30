"use client";

import { PreviewCompletionPanel, type PreviewCompletionNextStep } from "@/components/curriculum/PreviewCompletionPanel";
import type { ReactNode } from "react";
import { useState } from "react";
import { markPreviewLessonCompleted } from "@/lib/curriculum/local-preview-progress";

type ActivityId = "makeTenFromEight" | "splitSeven" | "bridgeEightFive" | "finishEightFive" | "bridgeNineFour" | "reflection";

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
    id: "makeTenFromEight",
    title: "1. Doplň do 10",
    prompt: "Koľko treba doplniť k 8, aby bolo 10?",
    options: ["1", "2", "3"],
    correctAnswer: "2",
    successMessage: "Áno, 8 potrebuje ešte 2 do 10.",
    gentleMessage,
    visual: <TenFrame filled={8} />
  },
  {
    id: "splitSeven",
    title: "2. Rozlož číslo 7",
    prompt: "Ako môžeme rozložiť číslo 7?",
    options: ["5 a 2", "6 a 3", "4 a 4"],
    correctAnswer: "5 a 2",
    successMessage: "Áno, 7 môžeme rozložiť na 5 a 2.",
    gentleMessage,
    visual: <SplitDots leftCount={5} rightCount={2} />
  },
  {
    id: "bridgeEightFive",
    title: "3. Prechod cez 10",
    prompt: "Pri 8 + 5 najprv doplníme 8 do 10. Koľko zoberieme z 5?",
    options: ["1", "2", "3"],
    correctAnswer: "2",
    successMessage: "Áno, z 5 zoberieme 2 a vznikne 10.",
    gentleMessage,
    visual: <BridgeExpression parts={["8", "+", "5", "=", "8", "+", "2", "+", "3"]} />
  },
  {
    id: "finishEightFive",
    title: "4. Dokonči príklad",
    prompt: "Keď máme 10 a ešte 3, koľko je spolu?",
    options: ["12", "13", "14"],
    correctAnswer: "13",
    successMessage: "Áno, 10 + 3 = 13.",
    gentleMessage,
    visual: <BridgeExpression parts={["10", "+", "3", "=", "13"]} />
  },
  {
    id: "bridgeNineFour",
    title: "5. Skús ďalší príklad",
    prompt: "Pri 9 + 4 najprv doplníme 9 do 10. Koľko ešte zostane zo 4?",
    options: ["2", "3", "4"],
    correctAnswer: "3",
    successMessage: "Áno, zoberieme 1 do 10 a zostanú ešte 3.",
    gentleMessage,
    visual: <BridgeExpression parts={["9", "+", "4", "=", "9", "+", "1", "+", "3"]} />
  },
  {
    id: "reflection",
    title: "6. Premýšľaj o stratégii",
    prompt: "Povedz si nahlas: Keď počítam cez 10, najprv doplním do 10 a potom pridám zvyšok.",
    options: ["Rozumiem"],
    correctAnswer: "Rozumiem",
    successMessage: "Výborne. Toto je iba ukážka bez hodnotenia.",
    gentleMessage: "Skús si vetu povedať pokojne nahlas.",
    visual: (
      <div className="rounded-xl bg-white p-5 text-center shadow-sm">
        <p className="text-5xl font-black text-slate-950">10</p>
        <p className="mt-2 text-base font-bold text-slate-700">najprv do 10, potom zvyšok</p>
      </div>
    )
  }
];

const totalActivities = activities.length;

export function Make10BridgeThrough10Preview({ nextStep }: PreviewCompletionProps) {
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
    markPreviewLessonCompleted("make_10_and_bridge_through_10");
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
            <li>Vieš doplniť číslo do 10.</li>
            <li>Vieš rozložiť číslo na časti.</li>
            <li>Vieš použiť 10 ako pomocný krok.</li>
            <li>Vieš dopočítať zvyšok po desiatke.</li>
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

function TenFrame({ filled }: { filled: number }) {
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
      <p className="mt-4 text-center text-sm font-bold text-slate-700">Osem máme, dve miesta doplníme.</p>
    </div>
  );
}

function SplitDots({ leftCount, rightCount }: { leftCount: number; rightCount: number }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <div className="flex items-center justify-center gap-4">
        <DotGroup count={leftCount} />
        <span className="text-3xl font-black text-slate-700">+</span>
        <DotGroup count={rightCount} />
      </div>
      <p className="mt-4 text-center text-sm font-bold text-slate-700">
        {leftCount} a {rightCount} spolu tvoria {leftCount + rightCount}.
      </p>
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

function BridgeExpression({ parts }: { parts: string[] }) {
  return (
    <div className="rounded-xl bg-white p-5 text-center shadow-sm">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {parts.map((part, index) => (
          <span
            className={`inline-flex min-h-12 min-w-12 items-center justify-center rounded-xl px-3 text-2xl font-black ${
              part === "+" || part === "=" ? "bg-white text-slate-500" : "bg-sky-100 text-sky-950"
            }`}
            key={`${part}-${index}`}
          >
            {part}
          </span>
        ))}
      </div>
      <p className="mt-4 text-sm font-bold text-slate-700">Najprv vytvoríme 10, potom pridáme zvyšok.</p>
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
