import type { PreviewLessonId } from "@/lib/curriculum/local-preview-progress";
import type { Locale } from "@/types";

export const learningPathPreviewLessonsCopy: Array<{
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

export const previewSkillsByLessonCopy: Record<PreviewLessonId, Record<Locale, string[]>> = {
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

export const childQuickStartCopy: Record<
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

export const parentPreviewGuideCopy: Record<
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

export const parentLocalProgressNoteCopy: Record<
  Locale,
  {
    title: string;
    description: string;
    items: string[];
    note: string;
  }
> = {
  sk: {
    title: "Ako funguje lokálny progres",
    description: "Ukážková cesta si pamätá dokončené lekcie iba v tomto prehliadači.",
    items: [
      "Neukladá sa do účtu.",
      "Nezobrazuje sa v rodičovskom dashboarde.",
      "Nie je to hodnotenie ani diagnostika.",
      "Po vymazaní dát prehliadača môže zmiznúť.",
      "Po zmene prehliadača alebo zariadenia sa nemusí preniesť."
    ],
    note:
      "Lokálny progres slúži iba na pohodlné pokračovanie v tejto ukážkovej ceste."
  },
  en: {
    title: "How local progress works",
    description: "The preview path remembers completed lessons only in this browser.",
    items: [
      "It is not saved to the account.",
      "It is not shown in the parent dashboard.",
      "It is not assessment or diagnostics.",
      "It may disappear when browser data is cleared.",
      "It may not transfer to another browser or device."
    ],
    note: "Local progress is only a helper for continuing this preview path."
  }
};

export const parentObservationTipsCopy: Record<
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
