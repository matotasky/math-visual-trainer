import Link from "next/link";
import {
  SK_MATH_CURRICULUM_CYCLES,
  getCurriculumArea,
  getCurriculumModulesByCycle
} from "@/data/curriculum/sk-math";
import { getLearningPathway } from "@/data/pathways";
import { getRequestLocale } from "@/lib/i18n/server";
import type { CurriculumCycleId, CurriculumModuleStatus, GradeId, Locale } from "@/types";

const pathway = getLearningPathway("school_curriculum");

const cycleLabels: Record<Locale, Record<CurriculumCycleId, { title: string; grades: string }>> = {
  sk: {
    cycle_1: {
      title: "1. cyklus",
      grades: "1. - 3. ročník"
    },
    cycle_2: {
      title: "2. cyklus",
      grades: "4. - 5. ročník"
    },
    cycle_3: {
      title: "3. cyklus",
      grades: "6. - 9. ročník"
    }
  },
  en: {
    cycle_1: {
      title: "1st cycle",
      grades: "1st - 3rd grade"
    },
    cycle_2: {
      title: "2nd cycle",
      grades: "4th - 5th grade"
    },
    cycle_3: {
      title: "3rd cycle",
      grades: "6th - 9th grade"
    }
  }
};

const gradeLabels: Record<Locale, Record<GradeId, string>> = {
  sk: {
    grade_1: "1.",
    grade_2: "2.",
    grade_3: "3.",
    grade_4: "4.",
    grade_5: "5.",
    grade_6: "6.",
    grade_7: "7.",
    grade_8: "8.",
    grade_9: "9."
  },
  en: {
    grade_1: "G1",
    grade_2: "G2",
    grade_3: "G3",
    grade_4: "G4",
    grade_5: "G5",
    grade_6: "G6",
    grade_7: "G7",
    grade_8: "G8",
    grade_9: "G9"
  }
};

const moduleTextSk: Record<string, { title: string; description: string }> = {
  quantity_and_number_sense: {
    title: "Množstvo a porozumenie číslam",
    description: "Buduje význam čísla, rozpoznávanie množstva a porovnávanie čísel."
  },
  addition_subtraction_to_20: {
    title: "Sčítanie a odčítanie do 20",
    description: "Pripravuje základné sčítanie a odčítanie do 20 so stratégiami."
  },
  make_10_and_bridge_through_10: {
    title: "Doplnenie do 10 a prechod cez 10",
    description: "Prepája rozklady do 10 so stratégiou prechodu cez desiatku."
  },
  multiplication_as_groups: {
    title: "Násobenie ako skupiny",
    description: "Pripravuje násobenie cez opakované skupiny a vizuálnu štruktúru."
  },
  basic_data_tables: {
    title: "Jednoduché tabuľky údajov",
    description: "Zoznamuje dieťa s tabuľkami a čítaním menších súborov dát."
  },
  shapes_and_measurement_intro: {
    title: "Tvary a prvé meranie",
    description: "Zoznamuje dieťa s tvarmi, priestorovým jazykom a prvým meraním."
  }
};

function getStatusLabel(status: CurriculumModuleStatus, locale: Locale): string {
  if (locale === "sk") {
    return status === "active" ? "Aktívne" : status === "planned" ? "Plánované" : "Čoskoro";
  }

  return status === "active" ? "Active" : status === "planned" ? "Planned" : "Coming soon";
}

function getAreaTitle(areaId: Parameters<typeof getCurriculumArea>[0], locale: Locale): string {
  const area = getCurriculumArea(areaId);

  if (locale === "sk") {
    if (area.id === "numbers_operations") {
      return "Čísla a operácie";
    }

    if (area.id === "relations_data") {
      return "Vzťahy a dáta";
    }

    return "Geometria";
  }

  return area.title;
}

export default async function CurriculumPage() {
  const locale = await getRequestLocale();
  const isSlovak = locale === "sk";
  const starterModules = getCurriculumModulesByCycle("cycle_1");

  return (
    <section className="py-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase text-sky-700">
          {isSlovak ? "Čoskoro" : "Coming soon"}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">
          {isSlovak ? "Školské učivo" : pathway.title}
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-700">
          {isSlovak
            ? "Táto časť je zatiaľ curriculum scaffold. Pripravuje appku na slovenské vzdelávacie cykly, ročníkové filtrovanie pre rodičov a budúce odporúčania podľa potrieb dieťaťa."
            : "This section is currently a curriculum scaffold. It prepares the app for Slovak learning cycles, parent-friendly grade navigation, and future recommendations based on each child's needs."}
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {SK_MATH_CURRICULUM_CYCLES.map((cycle) => {
          const label = cycleLabels[locale][cycle.id];

          return (
            <section key={cycle.id} className="rounded-lg border border-sky-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-bold text-slate-950">{label.title}</h2>
              <p className="mt-1 text-sm font-semibold text-sky-700">{label.grades}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {isSlovak
                  ? "Budúce moduly budú naviazané na cyklus, nie tvrdý zámok podľa ročníka."
                  : cycle.description}
              </p>
            </section>
          );
        })}
      </div>

      <section className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              {isSlovak ? "Náhľad modulov pre 1. cyklus" : "Starter modules for cycle 1"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {isSlovak
                ? "Toto nie je kompletná oficiálna mapa učiva. Je to iba prvý dátový rámec pre ďalšie bloky."
                : "This is not a complete official curriculum map. It is only the first data scaffold for future blocks."}
            </p>
          </div>
          <span className="inline-flex rounded-md bg-white px-3 py-1 text-xs font-bold uppercase text-slate-700 shadow-sm">
            {isSlovak ? "Scaffold" : "Scaffold"}
          </span>
        </div>

        <div className="mt-5 grid gap-3">
          {starterModules.map((module) => {
            const text = isSlovak ? (moduleTextSk[module.id] ?? module) : module;

            return (
              <article key={module.id} className="rounded-md border border-slate-200 bg-white p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-950">{text.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{text.description}</p>
                  </div>
                  <span className="inline-flex w-fit rounded-md bg-sky-50 px-3 py-1 text-xs font-bold uppercase text-sky-800">
                    {getStatusLabel(module.status, locale)}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                  <span className="rounded-md bg-slate-100 px-2 py-1">{getAreaTitle(module.areaId, locale)}</span>
                  <span className="rounded-md bg-slate-100 px-2 py-1">
                    {module.recommendedGrades.map((grade) => gradeLabels[locale][grade]).join(", ")}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <Link
        className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        href="/child"
      >
        {isSlovak ? "Späť na detský prehľad" : "Back to child home"}
      </Link>
    </section>
  );
}
