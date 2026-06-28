import Link from "next/link";
import {
  SK_MATH_CURRICULUM_CYCLES,
  getCurriculumModulesByCycle
} from "@/data/curriculum/sk-math";
import { getLearningPathway } from "@/data/pathways";
import { getRequestLocale } from "@/lib/i18n/server";
import type {
  CurriculumAreaId,
  CurriculumCycleId,
  CurriculumModule,
  CurriculumModuleStatus,
  GradeId,
  LearningPathwayId,
  Locale
} from "@/types";

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

const areaOrder: CurriculumAreaId[] = ["numbers_operations", "relations_data", "geometry"];

const areaText: Record<Locale, Record<CurriculumAreaId, { title: string; description: string }>> = {
  sk: {
    numbers_operations: {
      title: "Čísla a operácie",
      description: "Číselné predstavy, stratégie počítania, slovné úlohy a plynulosť."
    },
    relations_data: {
      title: "Vzťahy a dáta",
      description: "Vzory, postupnosti, tabuľky a jednoduché grafické zobrazenia dát."
    },
    geometry: {
      title: "Geometria",
      description: "Tvary, telesá, orientácia v priestore, meranie a symetria."
    }
  },
  en: {
    numbers_operations: {
      title: "Numbers and operations",
      description: "Number sense, calculation strategies, word problems, and fluency."
    },
    relations_data: {
      title: "Relations and data",
      description: "Patterns, sequences, tables, and simple visual data displays."
    },
    geometry: {
      title: "Geometry",
      description: "Shapes, solids, spatial orientation, measurement, and symmetry."
    }
  }
};

const remediationLabels: Record<Locale, Record<LearningPathwayId, string>> = {
  sk: {
    visual_arithmetic: "Vizuálna aritmetika",
    arithmetic_fluency: "Počtová plynulosť",
    school_curriculum: "Školské učivo"
  },
  en: {
    visual_arithmetic: "Visual Arithmetic",
    arithmetic_fluency: "Arithmetic Fluency",
    school_curriculum: "School Curriculum"
  }
};

const moduleTextSk: Record<string, { title: string; description: string }> = {
  quantity_and_number_sense: {
    title: "Množstvo a porozumenie číslam",
    description: "Buduje význam čísla, rozpoznávanie množstva a porovnávanie čísel."
  },
  number_line_and_comparison: {
    title: "Číselná os a porovnávanie",
    description: "Používa číselnú os na porovnávanie, usporiadanie a hľadanie čísel."
  },
  addition_subtraction_to_20: {
    title: "Sčítanie a odčítanie do 20",
    description: "Pripravuje základné sčítanie a odčítanie do 20 so stratégiami."
  },
  make_10_and_bridge_through_10: {
    title: "Doplnenie do 10 a prechod cez 10",
    description: "Prepája rozklady do 10 so stratégiou prechodu cez desiatku."
  },
  addition_subtraction_to_100: {
    title: "Sčítanie a odčítanie do 100",
    description: "Rozširuje stratégie počítania na dvojciferné čísla do 100."
  },
  multiplication_as_groups: {
    title: "Násobenie ako skupiny",
    description: "Pripravuje násobenie cez opakované skupiny a vizuálnu štruktúru."
  },
  division_as_sharing: {
    title: "Delenie ako rozdeľovanie",
    description: "Predstavuje delenie ako férové rozdeľovanie a tvorenie skupín."
  },
  word_problems_cycle_1: {
    title: "Slovné úlohy pre 1. cyklus",
    description: "Prepája počítanie s krátkymi situáciami z bežného života."
  },
  number_patterns_cycle_1: {
    title: "Číselné vzory pre 1. cyklus",
    description: "Buduje počítanie po krokoch, jednoduché vzory a číselné štruktúry."
  },
  basic_data_tables: {
    title: "Jednoduché tabuľky údajov",
    description: "Zoznamuje dieťa s tabuľkami a čítaním menších súborov dát."
  },
  patterns_and_sequences_cycle_1: {
    title: "Vzory a postupnosti pre 1. cyklus",
    description: "Skúma opakujúce sa vzory, rastúce vzory a jednoduché postupnosti."
  },
  simple_charts_cycle_1: {
    title: "Jednoduché grafy pre 1. cyklus",
    description: "Pripravuje jednoduché grafy a detské otázky k dátam."
  },
  shapes_and_measurement_intro: {
    title: "Tvary a prvé meranie",
    description: "Zoznamuje dieťa s tvarmi, priestorovým jazykom a prvým meraním."
  },
  plane_shapes_cycle_1: {
    title: "Rovinné útvary pre 1. cyklus",
    description: "Rozpoznáva a porovnáva základné rovinné útvary a ich vlastnosti."
  },
  solids_and_spatial_orientation: {
    title: "Telesá a orientácia v priestore",
    description: "Predstavuje základné telesá, polohu a orientáciu v priestore."
  },
  length_mass_time_money_intro: {
    title: "Dĺžka, hmotnosť, čas a peniaze",
    description: "Buduje praktické meranie s bežnými jednotkami a situáciami."
  },
  symmetry_intro: {
    title: "Úvod do symetrie",
    description: "Predstavuje symetriu cez vizuálne párovanie a jednoduché tvary."
  }
};

const previewLessonByModuleId: Record<string, { href: string; copy: Record<Locale, string> }> = {
  quantity_and_number_sense: {
    href: "/child/curriculum/quantity-and-number-sense",
    copy: {
      sk: "Prvá ukážková lekcia bez hodnotenia.",
      en: "First preview lesson without scoring."
    }
  },
  number_line_and_comparison: {
    href: "/child/curriculum/number-line-and-comparison",
    copy: {
      sk: "Druhá ukážková lekcia bez hodnotenia.",
      en: "Second preview lesson without scoring."
    }
  }
};

function getStatusLabel(status: CurriculumModuleStatus, locale: Locale): string {
  if (locale === "sk") {
    return status === "active" ? "Aktívne" : status === "planned" ? "Plánované" : "Čoskoro";
  }

  return status === "active" ? "Active" : status === "planned" ? "Planned" : "Coming soon";
}

function getModuleText(module: CurriculumModule, locale: Locale) {
  return locale === "sk" ? (moduleTextSk[module.id] ?? module) : module;
}

export default async function CurriculumPage() {
  const locale = await getRequestLocale();
  const isSlovak = locale === "sk";
  const cycleOneModules = getCurriculumModulesByCycle("cycle_1");

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
            ? "Táto časť pripravuje appku na slovenské vzdelávacie cykly, ročníkové filtrovanie pre rodičov a budúce odporúčania podľa potrieb dieťaťa."
            : "This section prepares the app for Slovak learning cycles, parent-friendly grade navigation, and future recommendations based on each child's needs."}
        </p>
        <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-950">
          {isSlovak
            ? "Toto je pracovný scaffold, nie finálna oficiálna mapa učiva."
            : "This is a working scaffold, not a final official curriculum map."}
        </p>
        <p className="mt-3 rounded-lg border border-sky-200 bg-sky-50 p-4 text-sm font-semibold leading-6 text-sky-950">
          {isSlovak
            ? "Obsah školského učiva zatiaľ pripravujeme. Najprv overujeme témy podľa oficiálnych podkladov."
            : "School curriculum content is being prepared. We are checking topics against official sources first."}
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
              {isSlovak ? "Pracovný náhľad modulov pre 1. cyklus" : "Working module preview for cycle 1"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {isSlovak
                ? "Moduly sú zoskupené podľa oblasti. Ukážkové lekcie sú dostupné bez hodnotenia."
                : "Modules are grouped by area. Preview lessons are available without scoring."}
            </p>
          </div>
          <span className="inline-flex rounded-md bg-white px-3 py-1 text-xs font-bold uppercase text-slate-700 shadow-sm">
            {isSlovak ? "Draft" : "Draft"}
          </span>
        </div>

        <div className="mt-6 grid gap-5">
          {areaOrder.map((areaId) => {
            const area = areaText[locale][areaId];
            const modules = cycleOneModules.filter((module) => module.areaId === areaId);

            return (
              <section key={areaId} className="rounded-lg border border-slate-200 bg-white p-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-950">{area.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{area.description}</p>
                </div>

                <div className="mt-4 grid gap-3">
                  {modules.map((module) => {
                    const text = getModuleText(module, locale);
                    const previewLesson = previewLessonByModuleId[module.id];

                    return (
                      <article key={module.id} className="rounded-md border border-slate-200 bg-slate-50 p-4">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h4 className="text-lg font-bold text-slate-950">{text.title}</h4>
                            <p className="mt-1 text-sm leading-6 text-slate-600">{text.description}</p>
                          </div>
                          <div className="flex w-fit flex-wrap gap-2">
                            <span className="inline-flex rounded-md bg-sky-50 px-3 py-1 text-xs font-bold uppercase text-sky-800">
                              {getStatusLabel(module.status, locale)}
                            </span>
                            {previewLesson ? (
                              <span className="inline-flex rounded-md bg-emerald-50 px-3 py-1 text-xs font-bold uppercase text-emerald-800">
                                {isSlovak ? "Ukážková lekcia" : "Preview lesson"}
                              </span>
                            ) : null}
                          </div>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                          <span className="rounded-md bg-white px-2 py-1 shadow-sm">
                            {module.recommendedGrades.map((grade) => gradeLabels[locale][grade]).join(", ")}
                          </span>
                          {module.visualArithmeticRemediation.map((pathwayId) => (
                            <span key={pathwayId} className="rounded-md bg-emerald-50 px-2 py-1 text-emerald-800">
                              {remediationLabels[locale][pathwayId as LearningPathwayId]}
                            </span>
                          ))}
                        </div>
                        {previewLesson ? (
                          <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                            <p className="text-sm font-semibold leading-6 text-emerald-950">
                              {previewLesson.copy[locale]}
                            </p>
                            <Link
                              className="mt-3 inline-flex min-h-11 items-center justify-center rounded-md bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800"
                              href={previewLesson.href}
                            >
                              {isSlovak ? "Otvoriť lekciu" : "Open lesson"}
                            </Link>
                          </div>
                        ) : null}
                      </article>
                    );
                  })}
                </div>
              </section>
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
