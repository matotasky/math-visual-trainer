import type { Locale } from "@/types";

export const dictionaries = {
  sk: {
    brand: "Math Visual Trainer",
    language: {
      label: "Jazyk",
      slovak: "Slovenčina",
      english: "Angličtina"
    },
    common: {
      loading: "Načítavam...",
      redirecting: "Presmerúvam...",
      goToLanding: "Späť na úvod",
      fallbackEyebrow: "Math Visual Trainer"
    },
    public: {
      landingTitle: "Math Visual Trainer",
      landingDescription: "Vizuálny tréner aritmetiky pre deti s diagnostikou, adaptívnym precvičovaním a prehľadom pre rodiča.",
      start: "Začať",
      loginTitle: "Prihlásenie rodiča",
      loginDescription: "Prihláste sa cez Google pomocou Firebase Authentication, aby ste mohli spravovať detské profily a sledovať pokrok.",
      signInWithGoogle: "Prihlásiť sa cez Google"
    },
    notFound: {
      title: "Stránka sa nenašla",
      description: "Táto stránka nie je súčasťou aktuálneho toku aplikácie Math Visual Trainer.",
      routeTitle: "Nenájdené",
      routeDescription: "Záložná stránka pre neznáme alebo nedostupné adresy."
    },
    child: {
      area: "Detská časť",
      homeTitle: "Vyber si matematickú aktivitu",
      modes: {
        diagnostic: {
          label: "Diagnostika",
          description: "Nájdeme najlepší štartovací bod."
        },
        learn: {
          label: "Učenie",
          description: "Najprv budujeme vizuálne stratégie."
        },
        practice: {
          label: "Precvičovanie",
          description: "Rozvíjame plynulosť s priateľskou spätnou väzbou."
        },
        test: {
          label: "Test",
          description: "Overíme zvládnutie bez pomocníkov."
        },
        challenge: {
          label: "Výzva",
          description: "Krátke rýchlostné kolá až po zvládnutí učiva."
        },
        rewards: {
          label: "Odmeny",
          description: "Pozri si sériu dní a pokrok."
        }
      },
      pages: {
        diagnostic: {
          title: "Diagnostika",
          description: "Základ obrazovky pre priateľskú vstupnú diagnostiku. Ďalší krok pripojí diagnostické úlohy, generovanie cvičení, časovanie a zaradenie úrovne."
        },
        learn: {
          title: "Učenie",
          description: "Základ obrazovky pre vizuálne vysvetlenia, pomocníkov, interaktívne príklady a bezpečné opakovanie."
        },
        practice: {
          title: "Precvičovanie",
          description: "Základ obrazovky pre adaptívne precvičovanie s meraním času, spätnou väzbou, ukladaním pokusov a aktualizáciou súhrnov."
        },
        test: {
          title: "Test",
          description: "Základ obrazovky pre pevne dlhé overenie zvládnutia bez pomocníkov a s výsledkami viditeľnými pre rodiča."
        },
        challenge: {
          title: "Výzva",
          description: "Základ obrazovky pre krátke časované kolá, ktoré sa odomknú až po stabilnom zvládnutí učiva."
        },
        rewards: {
          title: "Odmeny",
          description: "Základ obrazovky pre dennú sériu, míľniky a detsky zrozumiteľný pokrok."
        }
      }
    },
    parent: {
      eyebrow: "Rodičovská časť",
      pin: {
        title: "Rodičovský PIN",
        description: "Základ obrazovky pre overenie hashovaného PINu, sledovanie neúspešných pokusov a dočasné uzamknutie."
      },
      dashboard: {
        title: "Prehľad",
        description: "Základ obrazovky pre rodičovskú analytiku čítanú najmä zo súhrnných dokumentov: denné štatistiky, zvládnutie tém, chyby a séria dní.",
        accuracyChart: "Presnosť v čase",
        masteryChart: "Zvládnutie tém"
      },
      results: {
        title: "Výsledky",
        description: "Základ obrazovky pre stránkované sedenia, testy a detailný prehľad pokusov.",
        detailTitle: "Detail výsledku",
        detailDescription: "Základ obrazovky pre stránkované detaily pokusov v sedení {sessionId}."
      },
      mistakes: {
        title: "Chyby",
        description: "Základ obrazovky pre najčastejšie nesprávne príklady, vysvetlenie pravdepodobnej príčiny a odporúčané precvičenie."
      },
      progress: {
        title: "Pokrok",
        description: "Základ obrazovky pre trendy pokroku, poslednú aktivitu, sériu dní a posun úrovní.",
        attemptsPerDay: "Pokusy za deň",
        responseTime: "Čas odpovede",
        masteryByTopic: "Zvládnutie podľa témy"
      },
      settings: {
        title: "Nastavenia",
        description: "Základ obrazovky pre zmenu PINu, denné ciele, preferencie časového tlaku, správu detských profilov a budúce nastavenia notifikácií."
      },
      children: {
        title: "Deti",
        description: "Vytvorte detský profil a pokračujte do diagnostiky. Dieťa v MVP nepotrebuje vlastný Google účet.",
        createTitle: "Nový detský profil",
        createDescription: "Stačí meno a denný cieľ. Ostatné údaje môžete doplniť neskôr.",
        nameLabel: "Meno dieťaťa",
        namePlaceholder: "Napríklad Ema",
        birthYearLabel: "Rok narodenia",
        schoolYearLabel: "Ročník",
        dailyGoalLabel: "Denný cieľ v minútach",
        createButton: "Vytvoriť profil a začať diagnostiku",
        creatingButton: "Vytváram profil...",
        existingTitle: "Detské profily",
        emptyTitle: "Zatiaľ tu nie je žiadne dieťa",
        emptyDescription: "Vytvorte prvý profil, aby dieťa mohlo začať priateľskou diagnostikou.",
        currentLevelLabel: "Aktuálna úroveň",
        dailyGoalValue: "Denný cieľ: {minutes} min",
        continueDiagnostic: "Začať diagnostiku",
        continueChild: "Pokračovať",
        loadingProfiles: "Načítavam profily...",
        loadError: "Nepodarilo sa načítať detské profily. Skúste obnoviť stránku.",
        createError: "Profil sa nepodarilo vytvoriť. Skontrolujte pripojenie a Firebase pravidlá.",
        nameRequired: "Zadajte meno dieťaťa."
      }
    },
    validation: {
      childNameRequired: "Meno dieťaťa je povinné",
      pinDigits: "PIN musí mať 4 až 8 číslic",
      currentPinDigits: "Aktuálny PIN musí mať 4 až 8 číslic",
      nextPinDigits: "Nový PIN musí mať 4 až 8 číslic",
      confirmPinDigits: "Potvrdenie PINu musí mať 4 až 8 číslic",
      pinMismatch: "Zadané PINy sa musia zhodovať"
    },
    auth: {
      unexpectedError: "Nastala neočakávaná chyba pri prihlasovaní.",
      providerRequired: "useAuthContext musí byť použitý vo vnútri AuthProvider."
    }
  },
  en: {
    brand: "Math Visual Trainer",
    language: {
      label: "Language",
      slovak: "Slovak",
      english: "English"
    },
    common: {
      loading: "Loading...",
      redirecting: "Redirecting...",
      goToLanding: "Go to landing",
      fallbackEyebrow: "Math Visual Trainer"
    },
    public: {
      landingTitle: "Math Visual Trainer",
      landingDescription: "A visual arithmetic trainer for children with diagnostics, adaptive practice, and parent insight.",
      start: "Start",
      loginTitle: "Parent sign in",
      loginDescription: "Use Firebase Google Sign-In to manage child profiles and parent analytics.",
      signInWithGoogle: "Sign in with Google"
    },
    notFound: {
      title: "Page not found",
      description: "This route is not part of the current Math Visual Trainer flow.",
      routeTitle: "Not found",
      routeDescription: "Fallback route for unknown or unavailable pages."
    },
    child: {
      area: "Child area",
      homeTitle: "Choose a math activity",
      modes: {
        diagnostic: {
          label: "Diagnostic",
          description: "Find the best starting point."
        },
        learn: {
          label: "Learn",
          description: "Build visual strategies first."
        },
        practice: {
          label: "Practice",
          description: "Grow fluency with friendly feedback."
        },
        test: {
          label: "Test",
          description: "Check mastery without hints."
        },
        challenge: {
          label: "Challenge",
          description: "Short speed rounds after mastery."
        },
        rewards: {
          label: "Rewards",
          description: "See streak and progress rewards."
        }
      },
      pages: {
        diagnostic: {
          title: "Diagnostic",
          description: "Route skeleton for the friendly entry diagnostic. The next pass will connect diagnostic steps, exercise generation, timing, and placement logic."
        },
        learn: {
          title: "Learn",
          description: "Route skeleton for visual explanations, hints, interactive examples, and retry-friendly learning."
        },
        practice: {
          title: "Practice",
          description: "Route skeleton for adaptive practice with timed attempts, feedback, persistence, and aggregate updates."
        },
        test: {
          title: "Test",
          description: "Route skeleton for fixed-length mastery checks with no hints and parent-visible results."
        },
        challenge: {
          title: "Challenge",
          description: "Route skeleton for short timed rounds that unlock after stable mastery."
        },
        rewards: {
          title: "Rewards",
          description: "Route skeleton for daily streaks, milestones, and child-facing progress rewards."
        }
      }
    },
    parent: {
      eyebrow: "Parent area",
      pin: {
        title: "Parent PIN",
        description: "Route skeleton for hashed PIN verification, failed attempt tracking, and temporary lockout."
      },
      dashboard: {
        title: "Dashboard",
        description: "Route skeleton for aggregate-first parent analytics using daily stats, topic mastery, mistake stats, and streaks.",
        accuracyChart: "Accuracy over time",
        masteryChart: "Topic mastery"
      },
      results: {
        title: "Results",
        description: "Route skeleton for paginated sessions, tests, and detailed attempt review.",
        detailTitle: "Result detail",
        detailDescription: "Route skeleton for paginated attempt details in session {sessionId}."
      },
      mistakes: {
        title: "Mistakes",
        description: "Route skeleton for frequent wrong examples, likely issue explanations, and suggested remediation."
      },
      progress: {
        title: "Progress",
        description: "Route skeleton for progress trends, recent activity, streaks, and level advancement.",
        attemptsPerDay: "Attempts per day",
        responseTime: "Response time",
        masteryByTopic: "Mastery by topic"
      },
      settings: {
        title: "Settings",
        description: "Route skeleton for PIN changes, daily goals, time pressure preferences, child profile management, and phase 2 notification settings."
      },
      children: {
        title: "Children",
        description: "Create a child profile and continue to diagnostics. Children do not need their own Google account in the MVP.",
        createTitle: "New child profile",
        createDescription: "A name and daily goal are enough. You can fill in the rest later.",
        nameLabel: "Child name",
        namePlaceholder: "For example Emma",
        birthYearLabel: "Birth year",
        schoolYearLabel: "School year",
        dailyGoalLabel: "Daily goal in minutes",
        createButton: "Create profile and start diagnostics",
        creatingButton: "Creating profile...",
        existingTitle: "Child profiles",
        emptyTitle: "No child profile yet",
        emptyDescription: "Create the first profile so the child can begin with a friendly diagnostic.",
        currentLevelLabel: "Current level",
        dailyGoalValue: "Daily goal: {minutes} min",
        continueDiagnostic: "Start diagnostics",
        continueChild: "Continue",
        loadingProfiles: "Loading profiles...",
        loadError: "Could not load child profiles. Try refreshing the page.",
        createError: "Could not create the profile. Check your connection and Firebase rules.",
        nameRequired: "Enter the child's name."
      }
    },
    validation: {
      childNameRequired: "Child name is required",
      pinDigits: "PIN must be 4 to 8 digits",
      currentPinDigits: "Current PIN must be 4 to 8 digits",
      nextPinDigits: "New PIN must be 4 to 8 digits",
      confirmPinDigits: "Confirm PIN must be 4 to 8 digits",
      pinMismatch: "PIN entries must match"
    },
    auth: {
      unexpectedError: "An unexpected authentication error occurred.",
      providerRequired: "useAuthContext must be used within AuthProvider."
    }
  }
} as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
