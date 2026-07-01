import { Suspense } from "react";
import Link from "next/link";
import { ChildQuickStart } from "@/components/curriculum/ChildQuickStart";
import { ParentObservationTips } from "@/components/curriculum/ParentObservationTips";
import { ParentPreviewGuide } from "@/components/curriculum/ParentPreviewGuide";
import { PreviewLearningPathProgress } from "@/components/curriculum/PreviewLearningPathProgress";
import { PreviewReturnNotice } from "@/components/curriculum/PreviewReturnNotice";
import {
  SK_MATH_CURRICULUM_CYCLES,
  getCurriculumModulesByCycle
} from "@/data/curriculum/sk-math";
import { getLearningPathway } from "@/data/pathways";
import { localPreviewWordingSk } from "@/lib/curriculum/preview-wording";
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
import type { PreviewLessonId } from "@/lib/curriculum/local-preview-progress";

const pathway = getLearningPathway("school_curriculum");

const cycleLabels: Record<Locale, Record<CurriculumCycleId, { title: string; grades: string }>> = {
  sk: {
    cycle_1: {
      title: "1. cyklus",
      grades: "1. – 3. ročník"
    },
    cycle_2: {
      title: "2. cyklus",
      grades: "4. – 5. ročník"
    },
    cycle_3: {
      title: "3. cyklus",
      grades: "6. – 9. ročník"
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

const cycleDescriptions: Record<Locale, Record<CurriculumCycleId, string>> = {
  sk: {
    cycle_1: "Základy čísel, porovnávanie, prvé počítanie, tvary a jednoduché dáta.",
    cycle_2: "Rozšírenie počítania, stratégie, meranie, geometria a práca s dátami.",
    cycle_3: "Vyššia matematika, vzťahy, algebraické myslenie, geometria a štatistika."
  },
  en: {
    cycle_1: "Number foundations, comparison, first calculations, shapes, and simple data.",
    cycle_2: "Extended calculation, strategies, measurement, geometry, and work with data.",
    cycle_3: "Higher mathematics, relationships, algebraic thinking, geometry, and statistics."
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
  },
  addition_subtraction_to_20: {
    href: "/child/curriculum/addition-subtraction-to-20",
    copy: {
      sk: "Tretia ukážková lekcia bez hodnotenia.",
      en: "Third preview lesson without scoring."
    }
  },
  make_10_and_bridge_through_10: {
    href: "/child/curriculum/make-10-and-bridge-through-10",
    copy: {
      sk: "Štvrtá ukážková lekcia bez hodnotenia.",
      en: "Fourth preview lesson without scoring."
    }
  },
  addition_subtraction_to_100: {
    href: "/child/curriculum/addition-subtraction-to-100",
    copy: {
      sk: "Piata ukážková lekcia bez hodnotenia.",
      en: "Fifth preview lesson without scoring."
    }
  }
};

const learningPathPreviewLessons: Array<{
  id: PreviewLessonId;
  step: number;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  href: string;
  buttonLabel: Record<Locale, string>;
}> = [
  {
    id: "quantity_and_number_sense",
    step: 1,
    title: {
      sk: "Množstvo a porozumenie číslam",
      en: "Quantity and number sense"
    },
    description: {
      sk: "Najprv si ukážeme, že číslo znamená počet, poradie a miesto na číselnej osi.",
      en: "First, we show that a number can mean quantity, order, and a place on the number line."
    },
    href: "/child/curriculum/quantity-and-number-sense",
    buttonLabel: {
      sk: "Začať",
      en: "Start"
    }
  },
  {
    id: "number_line_and_comparison",
    step: 2,
    title: {
      sk: "Číselná os a porovnávanie",
      en: "Number line and comparison"
    },
    description: {
      sk: "Potom budeme hľadať čísla na osi, porovnávať ich a usporiadať.",
      en: "Then we find numbers on the line, compare them, and put them in order."
    },
    href: "/child/curriculum/number-line-and-comparison",
    buttonLabel: {
      sk: "Pokračovať",
      en: "Continue"
    }
  },
  {
    id: "addition_subtraction_to_20",
    step: 3,
    title: {
      sk: "Sčítanie a odčítanie do 20",
      en: "Addition and subtraction to 20"
    },
    description: {
      sk: "Nakoniec spojíme skupiny, budeme uberať a dopĺňať do 10.",
      en: "Finally, we join groups, take away, and make 10."
    },
    href: "/child/curriculum/addition-subtraction-to-20",
    buttonLabel: {
      sk: "Pokračovať",
      en: "Continue"
    }
  },
  {
    id: "make_10_and_bridge_through_10",
    step: 4,
    title: {
      sk: "Doplnenie do 10 a prechod cez 10",
      en: "Make 10 and bridge through 10"
    },
    description: {
      sk: "Precvičíme rozklad čísla, doplnenie do 10 a prvé počítanie cez desiatku.",
      en: "We practice splitting numbers, making 10, and first calculations across 10."
    },
    href: "/child/curriculum/make-10-and-bridge-through-10",
    buttonLabel: {
      sk: "Pokračovať",
      en: "Continue"
    }
  },
  {
    id: "addition_subtraction_to_100",
    step: 5,
    title: {
      sk: "Sčítanie a odčítanie do 100",
      en: "Addition and subtraction to 100"
    },
    description: {
      sk: "Začneme pracovať s desiatkami a jednotkami pri dvojciferných číslach.",
      en: "We start working with tens and ones in two-digit numbers."
    },
    href: "/child/curriculum/addition-subtraction-to-100",
    buttonLabel: {
      sk: "Pokračovať",
      en: "Continue"
    }
  }
];

const previewSkillsByLesson: Record<PreviewLessonId, Record<Locale, string[]>> = {
  quantity_and_number_sense: {
    sk: ["Rozpoznáš množstvo.", "Vieš porovnať dve skupiny.", "Vieš nájsť číslo pred a za."],
    en: ["You can recognize quantity.", "You can compare two groups.", "You can find the number before and after."]
  },
  number_line_and_comparison: {
    sk: ["Vieš použiť číselnú os.", "Vieš porovnať väčšie a menšie číslo.", "Vieš usporiadať čísla."],
    en: ["You can use a number line.", "You can compare bigger and smaller numbers.", "You can order numbers."]
  },
  addition_subtraction_to_20: {
    sk: ["Vieš spojiť dve skupiny.", "Vieš odobrať časť skupiny.", "Vieš doplniť do 10."],
    en: ["You can join two groups.", "You can take away part of a group.", "You can make 10."]
  },
  make_10_and_bridge_through_10: {
    sk: ["Vieš doplniť číslo do 10.", "Vieš rozložiť číslo na časti.", "Vieš použiť 10 ako pomocný krok."],
    en: ["You can complete a number to 10.", "You can split a number into parts.", "You can use 10 as a helper step."]
  },
  addition_subtraction_to_100: {
    sk: ["Vieš rozlíšiť desiatky a jednotky.", "Vieš sčítať celé desiatky.", "Vieš pridať alebo odobrať desiatky."],
    en: ["You can tell tens and ones apart.", "You can add whole tens.", "You can add or take away tens."]
  }
};

const childQuickStartText: Record<
  Locale,
  {
    title: string;
    steps: string[];
    note: string;
  }
> = {
  sk: {
    title: "Rýchly štart",
    steps: [
      "Klikni na odporúčanú lekciu.",
      "Pozeraj sa na obrázky a vyber odpoveď.",
      "Po dokončení sa vráť späť na túto cestu."
    ],
    note: "Nemusíš sa ponáhľať. Toto nie je známka ani test."
  },
  en: {
    title: "Quick start",
    steps: [
      "Click the recommended lesson.",
      "Look at the pictures and choose an answer.",
      "After finishing, return to this path."
    ],
    note: "You do not need to hurry. This is not a grade or a test."
  }
};

const parentPreviewGuideText: Record<
  Locale,
  {
    title: string;
    intro: string;
    bullets: string[];
    note: string;
  }
> = {
  sk: {
    title: "Ako túto ukážkovú cestu používať doma",
    intro:
      "Táto cesta je určená na pokojné precvičovanie. Dieťa nemusí ísť rýchlo ani všetko zvládnuť na prvýkrát.",
    bullets: [
      "Nechajte dieťa nahlas povedať, čo vidí.",
      "Ak sa pomýli, vráťte sa k obrázku alebo číselnej osi.",
      "Neriešte čas. Dôležité je porozumenie.",
      "Po jednej lekcii si dajte krátku pauzu.",
      "Lokálny progres je iba pomôcka v tomto prehliadači."
    ],
    note:
      "Táto ukážková cesta nie je diagnostika ani hodnotenie. Nenahrádza školu, učiteľa ani odborné vyšetrenie."
  },
  en: {
    title: "How to use this preview path at home",
    intro:
      "This path is meant for calm practice. The child does not need to be fast or get everything right on the first try.",
    bullets: [
      "Let the child say out loud what they see.",
      "If they make a mistake, return to the picture or number line.",
      "Do not focus on speed. Understanding matters most.",
      "After one lesson, take a short break.",
      "Local progress is only a helper in this browser."
    ],
    note:
      "This preview path is not diagnostics or assessment. It does not replace school, a teacher, or professional evaluation."
  }
};

const parentObservationTipsText: Record<
  Locale,
  {
    title: string;
    intro: string;
    tips: Array<{
      label: string;
      description: string;
    }>;
    note: string;
  }
> = {
  sk: {
    title: "Na čo sa pozerať pri dieťati",
    intro:
      "Pri domácom precvičovaní si všímajte skôr spôsob rozmýšľania než počet správnych odpovedí.",
    tips: [
      {
        label: "Vie vysvetliť, čo vidí?",
        description:
          "Nech dieťa ukáže skupiny, body, číselnú os alebo desiatky a jednotky vlastnými slovami."
      },
      {
        label: "Pomáha mu obrázok?",
        description:
          "Ak odpoveď nevie hneď, vráťte sa k vizuálu. Cieľom je porozumenie, nie hádanie."
      },
      {
        label: "Používa stratégiu?",
        description:
          "Všímajte si, či si pomáha doplnením do 10, rozkladom čísla alebo číselnou osou."
      },
      {
        label: "Nie je toho naraz veľa?",
        description:
          "Ak dieťa stráca pozornosť, ukončite lekciu a pokračujte neskôr."
      }
    ],
    note:
      "Toto nie je diagnostika. Panel slúži iba ako pomôcka pre rodiča pri pokojnom domácom precvičovaní."
  },
  en: {
    title: "What to notice while your child practices",
    intro:
      "During home practice, focus more on how the child thinks than on the number of correct answers.",
    tips: [
      {
        label: "Can they explain what they see?",
        description:
          "Let the child point to groups, dots, the number line, or tens and ones in their own words."
      },
      {
        label: "Does the visual help?",
        description:
          "If they do not know the answer right away, return to the visual. The goal is understanding, not guessing."
      },
      {
        label: "Are they using a strategy?",
        description:
          "Notice whether they use making 10, splitting a number, or the number line."
      },
      {
        label: "Is it too much at once?",
        description:
          "If the child loses attention, stop the lesson and continue later."
      }
    ],
    note:
      "This is not diagnostics. The panel is only a parent helper for calm home practice."
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
  const localizedLearningPathPreviewLessons = learningPathPreviewLessons.map((lesson) => ({
    id: lesson.id,
    step: lesson.step,
    title: lesson.title[locale],
    description: lesson.description[locale],
    href: lesson.href,
    buttonLabel: lesson.buttonLabel[locale]
  }));
  const localizedPreviewSkillsByLesson: Record<PreviewLessonId, string[]> = {
    quantity_and_number_sense: previewSkillsByLesson.quantity_and_number_sense[locale],
    number_line_and_comparison: previewSkillsByLesson.number_line_and_comparison[locale],
    addition_subtraction_to_20: previewSkillsByLesson.addition_subtraction_to_20[locale],
    make_10_and_bridge_through_10: previewSkillsByLesson.make_10_and_bridge_through_10[locale],
    addition_subtraction_to_100: previewSkillsByLesson.addition_subtraction_to_100[locale]
  };

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

      <section className="mt-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase text-emerald-700">{isSlovak ? "Ukážková cesta" : "Preview path"}</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">{isSlovak ? "Začni tu" : "Start here"}</h2>
            <p className="mt-2 max-w-2xl text-base font-semibold leading-7 text-slate-700">
              {isSlovak
                ? "Od porozumenia číslam k prvým stratégiám počítania."
                : "From understanding numbers to first calculation strategies."}
            </p>
          </div>
          <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-bold leading-6 text-emerald-950">
            {isSlovak
              ? localPreviewWordingSk.localProgressNote
              : "No scoring. Results are saved only in this browser."}
          </p>
        </div>

        <div className="mt-6 max-w-3xl">
          <p className="text-sm font-black uppercase text-emerald-700">
            {isSlovak ? "Pre dieťa" : "For the child"}
          </p>
          <p className="mt-2 text-base font-semibold leading-7 text-slate-700">
            {isSlovak
              ? "Začni odporúčanou lekciou a pracuj pokojne krok za krokom."
              : "Start with the recommended lesson and work calmly step by step."}
          </p>
        </div>

        <ChildQuickStart {...childQuickStartText[locale]} />

        <Suspense fallback={null}>
          <PreviewReturnNotice />
        </Suspense>

        <PreviewLearningPathProgress
          labels={{
            progressLabel: isSlovak ? "Lokálny progres" : "Local progress",
            clearProgressLabel: isSlovak ? "Vymazať lokálny progres" : "Clear local progress",
            completedLabel: isSlovak ? "Hotové" : "Done",
            currentLabel: isSlovak ? "Pokračuj" : "Continue",
            readyLabel: isSlovak ? "Pripravené" : "Ready",
            previewBadgeLabel: isSlovak ? "Ukážka" : "Preview",
            skillsTitle: isSlovak ? "Čo už vieš" : "What you already know",
            skillsSubtitle: isSlovak
              ? "Podľa ukážkových lekcií dokončených v tomto prehliadači."
              : "Based on preview lessons completed in this browser.",
            skillsEmptyMessage: isSlovak
              ? "Dokonči prvú ukážkovú lekciu a tu sa zobrazí, čo si už precvičil/a."
              : "Complete the first preview lesson and this area will show what you have practiced.",
            skillsLocalOnlyNote: isSlovak
              ? "Toto je iba lokálny prehľad, nie hodnotenie."
              : "This is only a local summary, not an assessment.",
            recommendedTitle: isSlovak ? "Odporúčaný ďalší krok" : "Recommended next step",
            recommendedContinuePrefix: isSlovak ? "Pokračuj lekciou:" : "Continue with:",
            recommendedAllDone: isSlovak
              ? "Výborne, dokončil/a si aktuálnu ukážkovú cestu."
              : "Great, you completed the current preview path.",
            recommendedRestartLabel: isSlovak ? "Zopakovať od začiatku" : "Start again",
            recommendedStartLabel: isSlovak ? "Začať" : "Start",
            recommendedContinueLabel: isSlovak ? "Pokračovať" : "Continue",
            recommendedLocalOnlyNote: isSlovak
              ? "Toto odporúčanie vychádza iba z lokálneho progresu v tomto prehliadači."
              : "This recommendation is based only on local progress in this browser."
          }}
          lessons={localizedLearningPathPreviewLessons}
          skillsByLesson={localizedPreviewSkillsByLesson}
        />

        <p className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold leading-6 text-slate-700 shadow-sm">
          {isSlovak
            ? "Toto je praktická ukážková cesta učenia, nie oficiálne overené poradie celého učiva."
            : "This is a practical preview learning path, not an officially verified sequence of the whole curriculum."}
        </p>
      </section>

      <section className="mt-8">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase text-indigo-700">
            {isSlovak ? "Pre rodiča" : "For the parent"}
          </p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">
            {isSlovak
              ? "Ako dieťa sprevádzať"
              : "How to support the child"}
          </h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">
            {isSlovak
              ? "Krátke odporúčania, ako dieťa sprevádzať bez tlaku na rýchlosť alebo hodnotenie."
              : "Short suggestions for supporting the child without pressure for speed or grading."}
          </p>
        </div>

        <ParentPreviewGuide {...parentPreviewGuideText[locale]} />
        <ParentObservationTips {...parentObservationTipsText[locale]} />
      </section>

      <section className="mt-8">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-black text-slate-950">
            {isSlovak ? "Vzdelávacie cykly" : "Learning cycles"}
          </h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">
            {isSlovak
              ? "Vzdelávacie cykly rozdeľujú učivo na väčšie obdobia. Nemusia byť rovnako dlhé. V appke ich používame ako orientačnú mapu tém, nie ako tvrdý zámok podľa ročníka."
              : "Learning cycles divide curriculum into broader stages. They do not have to be equal-length blocks. In the app, we use them as an orientation map of topics, not as a hard grade lock."}
          </p>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {SK_MATH_CURRICULUM_CYCLES.map((cycle) => {
            const label = cycleLabels[locale][cycle.id];

            return (
              <section key={cycle.id} className="rounded-lg border border-sky-200 bg-white p-5 shadow-sm">
                <h3 className="text-xl font-bold text-slate-950">{label.title}</h3>
                <p className="mt-1 text-sm font-semibold text-sky-700">{label.grades}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{cycleDescriptions[locale][cycle.id]}</p>
              </section>
            );
          })}
        </div>
      </section>

      <section className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              {isSlovak ? "Pracovný náhľad modulov pre 1. cyklus" : "Working module preview for cycle 1"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {isSlovak
                ? "Zatiaľ ide o pracovný náhľad tém. Ukážkové lekcie budeme postupne rozširovať."
                : "This is a working topic preview for now. Preview lessons will expand gradually."}
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
