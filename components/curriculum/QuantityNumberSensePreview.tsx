"use client";

import { PreviewCompletionPanel, type PreviewCompletionNextStep } from "@/components/curriculum/PreviewCompletionPanel";
import type { ReactNode } from "react";
import { useState } from "react";
import { markPreviewLessonCompleted } from "@/lib/curriculum/local-preview-progress";

type ActivityId = "quantity" | "compare" | "sameQuantity" | "afterNumber" | "beforeNumber" | "reflection";

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

const activities: Activity[] = [
  {
    id: "quantity",
    title: "1. Množstvo",
    prompt: "Koľko bodiek vidíš?",
    options: ["3", "5", "6"],
    correctAnswer: "5",
    successMessage: "Áno, je ich 5.",
    gentleMessage: "Skús ich spočítať ešte raz. Výsledky sa neukladajú.",
    visual: <DotGroup count={5} />
  },
  {
    id: "compare",
    title: "2. Porovnaj skupiny",
    prompt: "Kde je viac?",
    options: ["Vľavo", "Vpravo", "Rovnako"],
    correctAnswer: "Vpravo",
    successMessage: "Áno, vpravo je viac bodiek.",
    gentleMessage: "Pozri sa ešte raz na obe skupiny. Výsledky sa neukladajú.",
    visual: (
      <div className="grid grid-cols-2 gap-5">
        <VisualGroup label="Vľavo">
          <DotGroup count={4} />
        </VisualGroup>
        <VisualGroup label="Vpravo">
          <DotGroup count={6} />
        </VisualGroup>
      </div>
    )
  },
  {
    id: "sameQuantity",
    title: "3. Rovnaký počet",
    prompt: "Majú skupiny rovnaký počet?",
    options: ["Áno", "Nie"],
    correctAnswer: "Áno",
    successMessage: "Áno. Aj keď vyzerajú inak, počet je rovnaký.",
    gentleMessage: "Skús spočítať bodky v oboch skupinách. Výsledky sa neukladajú.",
    visual: (
      <div className="grid grid-cols-2 gap-5">
        <VisualGroup label="Roztiahnuté">
          <SpreadDotGroup />
        </VisualGroup>
        <VisualGroup label="Pri sebe">
          <DotGroup count={5} />
        </VisualGroup>
      </div>
    )
  },
  {
    id: "afterNumber",
    title: "4. Číslo za",
    prompt: "Čo je hneď za číslom 3?",
    options: ["2", "4", "5"],
    correctAnswer: "4",
    successMessage: "Áno, hneď za číslom 3 je číslo 4.",
    gentleMessage: "Skús sa pozrieť na číslo hneď napravo od 3.",
    visual: <NumberLine focus="after" />
  },
  {
    id: "beforeNumber",
    title: "5. Číslo pred",
    prompt: "Čo je hneď pred číslom 3?",
    options: ["1", "2", "4"],
    correctAnswer: "2",
    successMessage: "Áno, hneď pred číslom 3 je číslo 2.",
    gentleMessage: "Skús sa pozrieť na číslo hneď naľavo od 3.",
    visual: <NumberLine focus="before" />
  },
  {
    id: "reflection",
    title: "6. Premýšľaj o čísle",
    prompt: "Povedz si nahlas: Číslo 4 môže znamenať štyri veci alebo štvrté miesto.",
    options: ["Rozumiem"],
    correctAnswer: "Rozumiem",
    successMessage: "Výborne. Toto je iba ukážka bez hodnotenia.",
    gentleMessage: "Skús si vetu povedať pokojne nahlas.",
    visual: (
      <div className="rounded-xl bg-white p-5 text-center shadow-sm">
        <p className="text-6xl font-black text-slate-950">4</p>
        <p className="mt-2 text-base font-bold text-slate-700">štyri veci · štvrté miesto</p>
      </div>
    )
  }
];

const totalActivities = activities.length;

export function QuantityNumberSensePreview({ nextStep }: PreviewCompletionProps) {
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
    markPreviewLessonCompleted("quantity_and_number_sense");
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
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-center">
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
            <li>Rozumieš, že číslo môže znamenať počet.</li>
            <li>Vieš porovnať dve skupiny.</li>
            <li>Vieš, že rozloženie bodiek nemusí meniť počet.</li>
            <li>Vieš nájsť číslo pred a za na číselnej osi.</li>
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

function DotGroup({ count }: { count: number }) {
  return (
    <div className="mx-auto grid w-fit grid-cols-3 gap-3">
      {Array.from({ length: count }, (_, index) => (
        <span key={`${count}-${index}`} className="size-9 rounded-full bg-emerald-500 shadow-sm" />
      ))}
    </div>
  );
}

function SpreadDotGroup() {
  return (
    <div className="mx-auto grid w-36 grid-cols-4 gap-3">
      {[0, 1, 2, 3, 4].map((dot) => (
        <span
          key={dot}
          className={`size-8 rounded-full bg-emerald-500 shadow-sm ${dot === 1 ? "translate-y-3" : ""} ${
            dot === 3 ? "translate-x-3" : ""
          }`}
        />
      ))}
    </div>
  );
}

function NumberLine({ focus }: { focus: "before" | "after" }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between border-b-4 border-slate-300 pb-3">
        {[0, 1, 2, 3, 4, 5].map((number) => (
          <span
            className={`inline-flex size-10 items-center justify-center rounded-full text-base font-black ${
              number === 3 ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-700"
            }`}
            key={number}
          >
            {number}
          </span>
        ))}
      </div>
      <p className="mt-3 text-center text-sm font-bold text-slate-700">
        {focus === "before" ? "Hľadáme číslo hneď pred 3." : "Hľadáme číslo hneď za 3."}
      </p>
    </div>
  );
}

function VisualGroup({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4 text-center">
      {children}
      <p className="mt-3 text-sm font-black text-slate-700">{label}</p>
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
