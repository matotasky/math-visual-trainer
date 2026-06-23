"use client";

import type { ReactNode } from "react";
import { useState } from "react";

type ActivityId = "quantity" | "compare" | "numberLine" | "reflection";

type ActivityFeedback = {
  tone: "success" | "gentle";
  message: string;
};

const feedbackByActivity: Record<ActivityId, Record<string, ActivityFeedback>> = {
  quantity: {
    "3": {
      tone: "gentle",
      message: "Skús ich spočítať ešte raz. Výsledky sa neukladajú."
    },
    "5": {
      tone: "success",
      message: "Áno, je ich 5."
    },
    "6": {
      tone: "gentle",
      message: "Skús ich spočítať ešte raz. Výsledky sa neukladajú."
    }
  },
  compare: {
    "Vľavo": {
      tone: "gentle",
      message: "Pozri sa ešte raz na obe skupiny. Výsledky sa neukladajú."
    },
    "Vpravo": {
      tone: "success",
      message: "Áno, vpravo je viac bodiek."
    },
    Rovnako: {
      tone: "gentle",
      message: "Skús porovnať počet bodiek v oboch skupinách ešte raz."
    }
  },
  numberLine: {
    "2": {
      tone: "gentle",
      message: "Skús sa pozrieť na číslo hneď napravo od 3."
    },
    "4": {
      tone: "success",
      message: "Áno, hneď za číslom 3 je číslo 4."
    },
    "5": {
      tone: "gentle",
      message: "Si blízko. Hľadaj číslo hneď za 3, nie ďalej."
    }
  },
  reflection: {
    rozumiem: {
      tone: "success",
      message: "Výborne. Toto je iba ukážka bez hodnotenia."
    }
  }
};

export function QuantityNumberSensePreview() {
  const [answers, setAnswers] = useState<Partial<Record<ActivityId, string>>>({});
  const [completionMessageVisible, setCompletionMessageVisible] = useState(false);

  const completedActivities = [
    answers.quantity === "5",
    answers.compare === "Vpravo",
    answers.numberLine === "4",
    answers.reflection === "rozumiem"
  ].filter(Boolean).length;
  const allActivitiesComplete = completedActivities === 4;

  function selectAnswer(activityId: ActivityId, value: string) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [activityId]: value
    }));
  }

  function completePreviewLesson() {
    // Completion persistence intentionally skipped until child profile write path is finalized.
    setCompletionMessageVisible(true);
  }

  return (
    <section className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm md:p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase text-emerald-800">Preview lekcia — výsledky sa neukladajú.</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">Skús si to nanečisto</h2>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-emerald-950">
            Klikni na odpoveď a uvidíš len priateľskú spätnú väzbu. Nič sa nehodnotí a nič sa nikam nezapisuje.
          </p>
        </div>
        <span className="inline-flex w-fit rounded-full bg-white px-3 py-1 text-xs font-bold uppercase text-emerald-800 shadow-sm">
          Hotové: {completedActivities} / 4
        </span>
      </div>

      <div className="mt-5 grid gap-4">
        <ActivityCard
          feedback={getFeedback("quantity", answers.quantity)}
          prompt="Koľko bodiek vidíš?"
          title="1. Množstvo"
          visual={<DotGroup count={5} />}
        >
          <AnswerButtons
            activityId="quantity"
            options={["3", "5", "6"]}
            selectedAnswer={answers.quantity}
            selectAnswer={selectAnswer}
          />
        </ActivityCard>

        <ActivityCard
          feedback={getFeedback("compare", answers.compare)}
          prompt="Kde je viac?"
          title="2. Porovnaj skupiny"
          visual={
            <div className="grid grid-cols-2 gap-5">
              <VisualGroup label="Vľavo">
                <DotGroup count={4} />
              </VisualGroup>
              <VisualGroup label="Vpravo">
                <DotGroup count={6} />
              </VisualGroup>
            </div>
          }
        >
          <AnswerButtons
            activityId="compare"
            options={["Vľavo", "Vpravo", "Rovnako"]}
            selectedAnswer={answers.compare}
            selectAnswer={selectAnswer}
          />
        </ActivityCard>

        <ActivityCard
          feedback={getFeedback("numberLine", answers.numberLine)}
          prompt="Čo je hneď za číslom 3?"
          title="3. Číselná os"
          visual={<NumberLine />}
        >
          <AnswerButtons
            activityId="numberLine"
            options={["2", "4", "5"]}
            selectedAnswer={answers.numberLine}
            selectAnswer={selectAnswer}
          />
        </ActivityCard>

        <ActivityCard
          feedback={getFeedback("reflection", answers.reflection)}
          prompt="Povedz si nahlas: Číslo 4 môže znamenať štyri veci alebo štvrté miesto."
          title="4. Premýšľaj o čísle"
          visual={
            <div className="rounded-xl bg-white p-5 text-center shadow-sm">
              <p className="text-6xl font-black text-slate-950">4</p>
              <p className="mt-2 text-base font-bold text-slate-700">štyri veci · štvrté miesto</p>
            </div>
          }
        >
          <button
            className="min-h-14 rounded-xl bg-slate-950 px-5 py-3 text-lg font-black text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300"
            onClick={() => selectAnswer("reflection", "rozumiem")}
            type="button"
          >
            Rozumiem
          </button>
        </ActivityCard>
      </div>

      {allActivitiesComplete ? (
        <section className="mt-5 rounded-2xl border border-emerald-300 bg-white p-5 shadow-sm">
          <h3 className="text-2xl font-black text-emerald-950">Výborne, dokončil/a si ukážkovú lekciu.</h3>
          <p className="mt-2 text-base font-semibold leading-7 text-slate-700">Výsledky neslúžia ako test.</p>
          <button
            className="mt-4 min-h-14 rounded-xl bg-emerald-700 px-5 py-3 text-lg font-black text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-200"
            onClick={completePreviewLesson}
            type="button"
          >
            Dokončiť lekciu
          </button>
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

function ActivityCard({
  children,
  feedback,
  prompt,
  title,
  visual
}: {
  children: ReactNode;
  feedback?: ActivityFeedback;
  prompt: string;
  title: string;
  visual: ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-center">
        <div>
          <h3 className="text-xl font-black text-slate-950">{title}</h3>
          <p className="mt-3 text-2xl font-black leading-9 text-slate-900">{prompt}</p>
          <div className="mt-4 flex flex-wrap gap-3">{children}</div>
          {feedback ? (
            <p
              className={`mt-4 rounded-xl border p-4 text-base font-bold leading-7 ${
                feedback.tone === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-950"
                  : "border-sky-200 bg-sky-50 text-sky-950"
              }`}
            >
              {feedback.message}
            </p>
          ) : null}
        </div>
        <div>{visual}</div>
      </div>
    </article>
  );
}

function AnswerButtons({
  activityId,
  options,
  selectedAnswer,
  selectAnswer
}: {
  activityId: ActivityId;
  options: string[];
  selectedAnswer?: string;
  selectAnswer: (activityId: ActivityId, value: string) => void;
}) {
  return options.map((option) => (
    <button
      className={`min-h-14 min-w-24 rounded-xl border px-5 py-3 text-xl font-black transition focus:outline-none focus:ring-4 focus:ring-sky-200 ${
        selectedAnswer === option
          ? "border-slate-950 bg-slate-950 text-white"
          : "border-slate-200 bg-white text-slate-950 hover:border-sky-400 hover:bg-sky-50"
      }`}
      key={option}
      onClick={() => selectAnswer(activityId, option)}
      type="button"
    >
      {option}
    </button>
  ));
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

function NumberLine() {
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
      <p className="mt-3 text-center text-sm font-bold text-slate-700">Hľadáme číslo hneď za 3.</p>
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

function getFeedback(activityId: ActivityId, selectedAnswer?: string) {
  if (!selectedAnswer) {
    return undefined;
  }

  return feedbackByActivity[activityId][selectedAnswer];
}
