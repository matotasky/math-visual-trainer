import type {
  CurriculumAreaId,
  CurriculumCycleId,
  CurriculumModuleStatus,
  GradeId,
  LearningPathwayId,
  Locale
} from "@/types";

export const curriculumPageHeroCopy: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    description: string;
    scaffoldWarning: string;
    sourcePreparation: string;
    localOnlyHelper: string;
  }
> = {
  sk: {
    eyebrow: "Čoskoro",
    title: "Školské učivo",
    description:
      "Táto časť pripravuje appku na slovenské vzdelávacie cykly, ročníkové filtrovanie pre rodičov a budúce odporúčania podľa potrieb dieťaťa.",
    scaffoldWarning: "Toto je pracovný scaffold, nie finálna oficiálna mapa učiva.",
    sourcePreparation:
      "Obsah školského učiva zatiaľ pripravujeme. Najprv overujeme témy podľa oficiálnych podkladov.",
    localOnlyHelper: "Ukážkové lekcie nižšie slúžia len na lokálne vyskúšanie práce s číslami."
  },
  en: {
    eyebrow: "Coming soon",
    title: "School Curriculum",
    description:
      "This section prepares the app for Slovak learning cycles, parent-friendly grade navigation, and future recommendations based on each child's needs.",
    scaffoldWarning: "This is a working scaffold, not a final official curriculum map.",
    sourcePreparation: "School curriculum content is being prepared. We are checking topics against official sources first.",
    localOnlyHelper: "The preview lessons below are only for trying number practice locally."
  }
};

export const curriculumPreviewPathCopy: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    localOnlyNote: string;
    sequenceNote: string;
  }
> = {
  sk: {
    eyebrow: "Ukážková cesta",
    title: "Začni tu",
    subtitle: "Od porozumenia číslam k prvým stratégiám počítania.",
    localOnlyNote: "Toto je iba lokálny progres v tomto prehliadači. Nie je to hodnotenie, diagnostika ani zápis do účtu.",
    sequenceNote: "Toto je praktická ukážková cesta učenia, nie oficiálne overené poradie celého učiva."
  },
  en: {
    eyebrow: "Preview path",
    title: "Start here",
    subtitle: "From understanding numbers to first calculation strategies.",
    localOnlyNote: "No scoring. Results are saved only in this browser.",
    sequenceNote: "This is a practical preview learning path, not an officially verified sequence of the whole curriculum."
  }
};

export const curriculumChildSectionCopy: Record<Locale, { eyebrow: string; subtitle: string }> = {
  sk: {
    eyebrow: "Pre dieťa",
    subtitle: "Začni odporúčanou lekciou a pracuj pokojne krok za krokom."
  },
  en: {
    eyebrow: "For the child",
    subtitle: "Start with the recommended lesson and work calmly step by step."
  }
};

export const curriculumParentSectionCopy: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
  }
> = {
  sk: {
    eyebrow: "Pre rodiča",
    title: "Ako dieťa sprevádzať",
    subtitle: "Krátke odporúčania, ako dieťa sprevádzať bez tlaku na rýchlosť alebo hodnotenie."
  },
  en: {
    eyebrow: "For the parent",
    title: "How to support the child",
    subtitle: "Short suggestions for supporting the child without pressure for speed or grading."
  }
};

export const curriculumCycleSectionCopy: Record<Locale, { title: string; description: string }> = {
  sk: {
    title: "Vzdelávacie cykly",
    description:
      "Vzdelávacie cykly rozdeľujú učivo na väčšie obdobia. Nemusia byť rovnako dlhé. V appke ich používame ako orientačnú mapu tém, nie ako tvrdý zámok podľa ročníka."
  },
  en: {
    title: "Learning cycles",
    description:
      "Learning cycles divide curriculum into broader stages. They do not have to be equal-length blocks. In the app, we use them as an orientation map of topics, not as a hard grade lock."
  }
};

export const curriculumModulePreviewCopy: Record<
  Locale,
  {
    title: string;
    description: string;
    draftLabel: string;
    previewLessonBadge: string;
    openLessonLabel: string;
    backLinkLabel: string;
  }
> = {
  sk: {
    title: "Pracovný náhľad modulov pre 1. cyklus",
    description: "Zatiaľ ide o pracovný náhľad tém. Ukážkové lekcie budeme postupne rozširovať.",
    draftLabel: "Draft",
    previewLessonBadge: "Ukážková lekcia",
    openLessonLabel: "Otvoriť lekciu",
    backLinkLabel: "Späť na detský prehľad"
  },
  en: {
    title: "Working module preview for cycle 1",
    description: "This is a working topic preview for now. Preview lessons will expand gradually.",
    draftLabel: "Draft",
    previewLessonBadge: "Preview lesson",
    openLessonLabel: "Open lesson",
    backLinkLabel: "Back to child home"
  }
};

export const curriculumCycleLabels: Record<Locale, Record<CurriculumCycleId, { title: string; grades: string }>> = {
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

export const curriculumCycleDescriptions: Record<Locale, Record<CurriculumCycleId, string>> = {
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

export const curriculumGradeLabels: Record<Locale, Record<GradeId, string>> = {
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

export const curriculumAreaOrder: CurriculumAreaId[] = ["numbers_operations", "relations_data", "geometry"];

export const curriculumAreaCopy: Record<Locale, Record<CurriculumAreaId, { title: string; description: string }>> = {
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

export const curriculumRemediationLabels: Record<Locale, Record<LearningPathwayId, string>> = {
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

export const curriculumStatusLabelCopy: Record<Locale, Record<CurriculumModuleStatus, string>> = {
  sk: {
    active: "Aktívne",
    planned: "Plánované",
    coming_soon: "Čoskoro"
  },
  en: {
    active: "Active",
    planned: "Planned",
    coming_soon: "Coming soon"
  }
};

export const curriculumModuleTextSk: Record<string, { title: string; description: string }> = {
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

export const curriculumPreviewLessonByModuleId: Record<string, { href: string; copy: Record<Locale, string> }> = {
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
