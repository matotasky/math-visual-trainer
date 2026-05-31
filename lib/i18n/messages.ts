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
      home: {
        area: "Detská časť",
        homeTitle: "Tvoj dnešný matematický plán",
        loadingChild: "Načítavam vybrané dieťa...",
        loadingProgress: "Načítavam posledný postup...",
        missingChild: "Najprv vyberte alebo vytvorte detský profil v rodičovskej časti.",
        parentArea: "Rodič",
        parentAreaDescription: "Rodičovská časť je chránená PINom.",
        dailyGoalTitle: "Denný cieľ",
        dailyGoalProgress: "{completed} z {goal} úloh dnes",
        dailyGoalComplete: "Cieľ splnený",
        currentLevel: "Úroveň: {level}",
        todayAccuracy: "Dnešná presnosť: {accuracy}%",
        attemptsToday: "Dnešné úlohy: {count}",
        nextFocusTitle: "Čo teraz?",
        nextFocusDiagnostic: "Začni diagnostikou, aby sme vybrali správnu úroveň.",
        nextFocusLearn: "Daj si ešte krátke učenie a posilni vizuálnu stratégiu.",
        nextFocusPractice: "Najlepšie bude krátke precvičovanie.",
        nextFocusTest: "Precvičovanie máš rozbehnuté. Skús krátky test.",
        nextFocusRewards: "Denný cieľ je hotový. Pozri si odmeny alebo si daj ďalšie učenie.",
        statuses: {
          startHere: "Začni tu",
          ready: "Pripravené",
          recommended: "Odporúčané",
          done: "Dokončené",
          locked: "Najprv diagnostika",
          todayCount: "{count} z {total} dnes",
          score: "{correct} z {total} naposledy",
          goal: "{completed} z {goal} úloh"
        },
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
        }
      },
      navigation: {
        back: "Späť",
        confirmTitle: "Chceš sa vrátiť?",
        confirmDescription: "Rozpracovaný postup na tejto stránke sa stratí.",
        stay: "Zostať tu",
        leave: "Vrátiť sa"
      },
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
          description: "Základ obrazovky pre adaptívne precvičovanie s meraním času, spätnou väzbou, ukladaním úloh a aktualizáciou súhrnov."
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
      },
      diagnosticRunner: {
        title: "Poďme zistiť, čo už vieš",
        description: "Nie je to známkovaný test. Len sa pozrieme, ktoré obrázky a príklady sú pre teba najlepšie na začiatok.",
        questionCount: "Otázka {current} z {total}",
        answerLabel: "Tvoja odpoveď",
        answerPlaceholder: "Napíš číslo",
        checkAnswer: "Skontrolovať",
        nextQuestion: "Ďalšia otázka",
        finish: "Dokončiť diagnostiku",
        saving: "Ukladám...",
        correctFeedback: "Výborne, to sedí.",
        tryAgainFeedback: "Ďakujem, ideme ďalej pokojne ďalej.",
        completeTitle: "Diagnostika je hotová",
        completeDescription: "Vybrali sme vhodný štartovací bod. Teraz môže dieťa pokračovať učením alebo precvičovaním.",
        continueButton: "Pokračovať do detskej časti",
        missingChild: "Najprv vyberte alebo vytvorte detský profil v rodičovskej časti.",
        saveError: "Nepodarilo sa uložiť odpoveď. Skontrolujte pripojenie a Firebase pravidlá."
      },
      learnRunner: {
        title: "Učenie bez časového tlaku",
        description: "Najprv sa pozri na obrázok, potom si všimni čísla. Rýchlosť príde neskôr.",
        loadingChild: "Načítavam vybrané dieťa...",
        missingChild: "Najprv vyberte dieťa v rodičovskej časti.",
        needDiagnostic: "Najprv dokončite diagnostiku, aby sme vybrali správnu úroveň.",
        selectedLevel: "Úroveň: {level}",
        progressLabel: "Príklad {current} z {total}",
        visualHint: "Pozri sa na skupiny. Nemusíš počítať po jednom, ak vieš rozpoznať tvar alebo doplniť do 10.",
        strategyTitle: "Skús túto stratégiu",
        quantityStrategy: "Najprv hľadaj malé skupiny. Potom ich spoj do jedného čísla.",
        additionStrategy: "Prvé číslo si nechaj v hlave a druhé pridaj pomocou obrázka.",
        make10Strategy: "Pozri, koľko miest chýba do plnej desiatky.",
        subtractionStrategy: "Začni na väčšom čísle a sleduj, koľko krokov ide späť.",
        answerLabel: "Správna odpoveď je {answer}",
        showAnswer: "Ukázať odpoveď",
        hideAnswer: "Skryť odpoveď",
        nextExample: "Ďalší príklad",
        finishLesson: "Dokončiť učenie",
        completeTitle: "Učenie je hotové",
        completeDescription: "Prešli ste všetky príklady tejto krátkej lekcie. Teraz môžete pokračovať precvičovaním alebo sa vrátiť na prehľad.",
        backToChild: "Späť na prehľad",
        goDiagnostic: "Ísť na diagnostiku"
      },
      practiceRunner: {
        title: "Precvičovanie",
        description: "Odpovedz pokojne. Úlohy idú hneď za sebou a výsledok uvidíš na konci.",
        loadingChild: "Načítavam vybrané dieťa...",
        missingChild: "Najprv vyberte dieťa v rodičovskej časti.",
        needDiagnostic: "Najprv dokončite diagnostiku, potom začne precvičovanie na správnej úrovni.",
        selectedLevel: "Úroveň: {level}",
        questionCount: "Úloha {current} z {total}",
        answerLabel: "Tvoja odpoveď",
        answerPlaceholder: "Napíš číslo",
        checkAnswer: "Odoslať",
        nextQuestion: "Ďalšia úloha",
        finishPractice: "Dokončiť precvičovanie",
        saving: "Ukladám...",
        correctFeedback: "Výborne, to sedí.",
        incorrectFeedback: "Dobrá práca, ideme ďalej a ešte to posilníme.",
        saveError: "Nepodarilo sa uložiť odpoveď. Skontrolujte pripojenie a Firebase pravidlá.",
        completeTitle: "Precvičovanie je hotové",
        completeDescription: "Dokončili ste krátku sériu úloh. Správne odpovede: {correct} z {total}.",
        backToChild: "Späť na prehľad",
        goDiagnostic: "Ísť na diagnostiku"
      },
      testRunner: {
        title: "Test",
        description: "Odpovedz bez pomocníkov. Výsledok sa zobrazí až na konci.",
        loadingChild: "Načítavam vybrané dieťa...",
        missingChild: "Najprv vyberte dieťa v rodičovskej časti.",
        needDiagnostic: "Najprv dokončite diagnostiku, potom sa otvorí test na správnej úrovni.",
        selectedLevel: "Úroveň: {level}",
        questionCount: "Úloha {current} z {total}",
        answerLabel: "Tvoja odpoveď",
        answerPlaceholder: "Napíš číslo",
        submitAnswer: "Odoslať odpoveď",
        saving: "Ukladám...",
        saveError: "Nepodarilo sa uložiť odpoveď. Skontrolujte pripojenie a Firebase pravidlá.",
        completeTitle: "Test je hotový",
        completeDescription: "Výsledok testu: {correct} z {total} správne.",
        backToChild: "Späť na prehľad",
        goDiagnostic: "Ísť na diagnostiku"
      },
      challengeRunner: {
        title: "Výzva",
        description: "Krátke časované kolo. Snaž sa pokojne a zbieraj XP za každú úlohu.",
        loadingChild: "Načítavam vybrané dieťa...",
        missingChild: "Najprv vyberte dieťa v rodičovskej časti.",
        needDiagnostic: "Najprv dokončite diagnostiku, potom sa otvorí výzva na správnej úrovni.",
        selectedLevel: "Úroveň: {level}",
        questionCount: "Úloha {current} z {total}",
        timeLeft: "Zostáva {seconds} s",
        scoreLabel: "{score} XP",
        answerLabel: "Tvoja odpoveď",
        answerPlaceholder: "Napíš číslo",
        submitAnswer: "Odoslať",
        saving: "Ukladám...",
        saveError: "Nepodarilo sa uložiť odpoveď. Skontrolujte pripojenie a Firebase pravidlá.",
        completeTitle: "Výzva je hotová",
        completeDescription: "Skóre: {score} XP. Správne úlohy: {correct} z {total}.",
        backToChild: "Späť na prehľad",
        goDiagnostic: "Ísť na diagnostiku"
      },
      rewardsDashboard: {
        title: "Odmeny",
        description: "Pozri sa, čo sa ti podarilo. Odmeny ukazujú pokojný pokrok, nie len rýchlosť.",
        loadingChild: "Načítavam vybrané dieťa...",
        loadingRewards: "Načítavam odmeny...",
        missingChild: "Najprv vyberte dieťa v rodičovskej časti.",
        loadError: "Odmeny sa nepodarilo načítať. Skontrolujte pripojenie a Firebase pravidlá.",
        currentLevel: "Úroveň: {level}",
        rewardPoints: "Body odmeny",
        currentStreak: "Séria dní",
        longestStreak: "Najdlhšia séria",
        tasksToday: "Dnešné úlohy: {count}",
        accuracyToday: "Dnešná presnosť",
        dailyGoalTitle: "Denný cieľ",
        dailyGoalProgress: "{completed} z {goal} úloh dnes",
        dailyGoalComplete: "Cieľ splnený",
        keepGoingTitle: "Chceš získať ďalšiu odmenu?",
        keepGoingDescription: "Najistejšia cesta je krátke precvičovanie. Presnosť je dôležitejšia ako ponáhľanie.",
        emptyTitle: "Odmeny čakajú na prvý krok",
        emptyDescription: "Začni diagnostikou a potom sa odomknú prvé odznaky za úlohy, cieľ a sériu dní.",
        badgesTitle: "Odznaky",
        badgesDescription: "Odznaky sa odomykajú za pravidelné učenie, presnosť a dokončené úlohy.",
        unlocked: "Získané",
        locked: "Čaká",
        backToChild: "Späť na prehľad",
        practiceButton: "Pokračovať precvičovaním",
        diagnosticButton: "Začať diagnostiku",
        badges: {
          diagnostic: {
            title: "Prieskumník",
            description: "Dokonči diagnostiku a nájdi správny štart.",
            progress: "{current} z {target}"
          },
          firstTask: {
            title: "Prvá úloha",
            description: "Vyrieš svoju prvú uloženú úlohu.",
            progress: "{current} z {target}"
          },
          dailyGoal: {
            title: "Denný cieľ",
            description: "Splň dnešný cieľ v úlohách.",
            progress: "{current} z {target}"
          },
          accuracyDay: {
            title: "Presný deň",
            description: "Udrž aspoň 80 % presnosť pri piatich úlohách.",
            progress: "Presnosť {accuracy}% pri {current} z {target} úloh"
          },
          streak3: {
            title: "Tri dni po sebe",
            description: "Precvičuj v troch dňoch za sebou.",
            progress: "{current} z {target} dní"
          },
          challenge: {
            title: "Výzva prijatá",
            description: "Dokonči aspoň jednu úlohu vo výzve.",
            progress: "{current} z {target}"
          },
          testComplete: {
            title: "Testový hrdina",
            description: "Dokonči aspoň jeden test.",
            progress: "{current} z {target}"
          },
          hundredTasks: {
            title: "100 úloh",
            description: "Nazbieraj sto uložených úloh.",
            progress: "{current} z {target}"
          }
        }
      }
    },
    parent: {
      eyebrow: "Rodičovská časť",
      navigation: {
        childArea: "Detská časť",
        dashboard: "Prehľad",
        children: "Deti",
        results: "Výsledky",
        mistakes: "Chyby",
        progress: "Pokrok",
        settings: "Nastavenia"
      },
      pin: {
        title: "Rodičovský PIN",
        description: "Zadajte alebo nastavte PIN, aby sa otvorila rodičovská časť."
      },
      pinGate: {
        title: "Rodičovský PIN",
        description: "Rodičovská časť je oddelená od detskej časti krátkym PINom.",
        setupTitle: "Nastavte rodičovský PIN",
        setupDescription: "PIN slúži ako detská bariéra. Skutočná bezpečnostná vrstva je Google prihlásenie a Firebase pravidlá.",
        enterTitle: "Zadajte rodičovský PIN",
        enterDescription: "Po overení sa otvorí rodičovský prehľad.",
        resetTitle: "Reset rodičovského PINu",
        resetDescription: "PIN nie je možné poslať emailom, pretože ho neukladáme v čitateľnej podobe. Prihlásený rodič môže nastaviť nový PIN.",
        pinLabel: "PIN",
        pinPlaceholder: "4 až 8 číslic",
        confirmPinLabel: "Potvrdiť PIN",
        unlockButton: "Odomknúť",
        createButton: "Vytvoriť PIN",
        resetButton: "Nastaviť nový PIN",
        forgotPin: "Zabudli ste PIN?",
        cancelReset: "Späť na zadanie PINu",
        loading: "Načítavam PIN nastavenia...",
        saving: "Overujem...",
        pinRequired: "PIN musí mať 4 až 8 číslic.",
        pinMismatch: "PIN a potvrdenie PINu sa musia zhodovať.",
        invalidPin: "Nesprávny PIN. Zostáva pokusov: {remaining}.",
        lockedMessage: "Príliš veľa pokusov. Skúste znova po {time}.",
        loadError: "PIN sa nepodarilo overiť. Skontrolujte pripojenie a Firebase pravidlá."
      },
      dashboard: {
        title: "Prehľad",
        description: "Základ obrazovky pre rodičovskú analytiku čítanú najmä zo súhrnných dokumentov: denné štatistiky, zvládnutie tém, chyby a séria dní.",
        accuracyChart: "Presnosť v čase",
        masteryChart: "Zvládnutie tém"
      },
      results: {
        title: "Výsledky",
        description: "Základ obrazovky pre stránkované sedenia, testy a detailný prehľad úloh.",
        detailTitle: "Detail výsledku",
        detailDescription: "Základ obrazovky pre stránkované detaily úloh v sedení {sessionId}."
      },
      mistakes: {
        title: "Chyby",
        description: "Základ obrazovky pre najčastejšie nesprávne príklady, vysvetlenie pravdepodobnej príčiny a odporúčané precvičenie."
      },
      progress: {
        title: "Pokrok",
        description: "Základ obrazovky pre trendy pokroku, poslednú aktivitu, sériu dní a posun úrovní.",
        attemptsPerDay: "Úlohy za deň",
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
        dailyGoalLabel: "Denný cieľ v úlohách",
        createButton: "Vytvoriť profil a začať diagnostiku",
        creatingButton: "Vytváram profil...",
        existingTitle: "Detské profily",
        emptyTitle: "Zatiaľ tu nie je žiadne dieťa",
        emptyDescription: "Vytvorte prvý profil, aby dieťa mohlo začať priateľskou diagnostikou.",
        currentLevelLabel: "Aktuálna úroveň",
        dailyGoalValue: "Denný cieľ: {tasks} úloh",
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
      home: {
        area: "Child area",
        homeTitle: "Your math plan today",
        loadingChild: "Loading the selected child...",
        loadingProgress: "Loading recent progress...",
        missingChild: "Select or create a child profile in the parent area first.",
        parentArea: "Parent",
        parentAreaDescription: "The parent area is protected by a PIN.",
        dailyGoalTitle: "Daily goal",
        dailyGoalProgress: "{completed} of {goal} tasks today",
        dailyGoalComplete: "Goal complete",
        currentLevel: "Level: {level}",
        todayAccuracy: "Today's accuracy: {accuracy}%",
        attemptsToday: "Tasks today: {count}",
        nextFocusTitle: "What now?",
        nextFocusDiagnostic: "Start with the diagnostic so we can choose the right level.",
        nextFocusLearn: "Try a short learning round to strengthen the visual strategy.",
        nextFocusPractice: "A short practice round is the best next step.",
        nextFocusTest: "Practice is underway. Try a short test.",
        nextFocusRewards: "The daily goal is complete. Check rewards or do more learning.",
        statuses: {
          startHere: "Start here",
          ready: "Ready",
          recommended: "Recommended",
          done: "Done",
          locked: "Diagnostic first",
          todayCount: "{count} of {total} today",
          score: "{correct} of {total} last time",
          goal: "{completed} of {goal} tasks"
        },
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
        }
      },
      navigation: {
        back: "Back",
        confirmTitle: "Go back?",
        confirmDescription: "Progress on this page will be lost.",
        stay: "Stay here",
        leave: "Go back"
      },
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
      },
      diagnosticRunner: {
        title: "Let's see what you know",
        description: "This is not a graded test. We are just finding the best pictures and exercises to start with.",
        questionCount: "Question {current} of {total}",
        answerLabel: "Your answer",
        answerPlaceholder: "Type a number",
        checkAnswer: "Check",
        nextQuestion: "Next question",
        finish: "Finish diagnostic",
        saving: "Saving...",
        correctFeedback: "Great, that matches.",
        tryAgainFeedback: "Thanks, let's calmly keep going.",
        completeTitle: "Diagnostic complete",
        completeDescription: "We picked a good starting point. The child can now continue with learning or practice.",
        continueButton: "Continue to child area",
        missingChild: "Select or create a child profile in the parent area first.",
        saveError: "Could not save the answer. Check your connection and Firebase rules."
      },
      learnRunner: {
        title: "Learn without time pressure",
        description: "Look at the picture first, then notice the numbers. Speed can come later.",
        loadingChild: "Loading the selected child...",
        missingChild: "Select a child in the parent area first.",
        needDiagnostic: "Finish the diagnostic first so we can choose the right level.",
        selectedLevel: "Level: {level}",
        progressLabel: "Example {current} of {total}",
        visualHint: "Look for groups. You do not need to count one by one if you can recognize the shape or complete 10.",
        strategyTitle: "Try this strategy",
        quantityStrategy: "Look for small groups first. Then combine them into one number.",
        additionStrategy: "Keep the first number in your head and add the second using the picture.",
        make10Strategy: "Look at how many spaces are missing to fill the ten-frame.",
        subtractionStrategy: "Start on the larger number and watch how many steps go back.",
        answerLabel: "The answer is {answer}",
        showAnswer: "Show answer",
        hideAnswer: "Hide answer",
        nextExample: "Next example",
        finishLesson: "Finish lesson",
        completeTitle: "Lesson complete",
        completeDescription: "You finished every example in this short lesson. You can now practice or return to the child overview.",
        backToChild: "Back to overview",
        goDiagnostic: "Go to diagnostic"
      },
      practiceRunner: {
        title: "Practice",
        description: "Answer calmly. Tasks continue right away and the result appears at the end.",
        loadingChild: "Loading the selected child...",
        missingChild: "Select a child in the parent area first.",
        needDiagnostic: "Finish the diagnostic first, then practice starts at the right level.",
        selectedLevel: "Level: {level}",
        questionCount: "Task {current} of {total}",
        answerLabel: "Your answer",
        answerPlaceholder: "Type a number",
        checkAnswer: "Submit",
        nextQuestion: "Next task",
        finishPractice: "Finish practice",
        saving: "Saving...",
        correctFeedback: "Great, that matches.",
        incorrectFeedback: "Good work, let's keep strengthening it.",
        saveError: "Could not save the answer. Check your connection and Firebase rules.",
        completeTitle: "Practice complete",
        completeDescription: "You finished the short task set. Correct answers: {correct} of {total}.",
        backToChild: "Back to overview",
        goDiagnostic: "Go to diagnostic"
      },
      testRunner: {
        title: "Test",
        description: "Answer without hints. The result appears at the end.",
        loadingChild: "Loading the selected child...",
        missingChild: "Select a child in the parent area first.",
        needDiagnostic: "Finish the diagnostic first, then the test opens at the right level.",
        selectedLevel: "Level: {level}",
        questionCount: "Task {current} of {total}",
        answerLabel: "Your answer",
        answerPlaceholder: "Type a number",
        submitAnswer: "Submit answer",
        saving: "Saving...",
        saveError: "Could not save the answer. Check your connection and Firebase rules.",
        completeTitle: "Test complete",
        completeDescription: "Test score: {correct} of {total} correct.",
        backToChild: "Back to overview",
        goDiagnostic: "Go to diagnostic"
      },
      challengeRunner: {
        title: "Challenge",
        description: "A short timed round. Stay calm and collect XP for each task.",
        loadingChild: "Loading the selected child...",
        missingChild: "Select a child in the parent area first.",
        needDiagnostic: "Finish the diagnostic first, then the challenge opens at the right level.",
        selectedLevel: "Level: {level}",
        questionCount: "Task {current} of {total}",
        timeLeft: "{seconds}s left",
        scoreLabel: "{score} XP",
        answerLabel: "Your answer",
        answerPlaceholder: "Type a number",
        submitAnswer: "Submit",
        saving: "Saving...",
        saveError: "Could not save the answer. Check your connection and Firebase rules.",
        completeTitle: "Challenge complete",
        completeDescription: "Score: {score} XP. Correct tasks: {correct} of {total}.",
        backToChild: "Back to overview",
        goDiagnostic: "Go to diagnostic"
      },
      rewardsDashboard: {
        title: "Rewards",
        description: "See what went well. Rewards celebrate calm progress, not only speed.",
        loadingChild: "Loading the selected child...",
        loadingRewards: "Loading rewards...",
        missingChild: "Select a child in the parent area first.",
        loadError: "Could not load rewards. Check your connection and Firebase rules.",
        currentLevel: "Level: {level}",
        rewardPoints: "Reward points",
        currentStreak: "Day streak",
        longestStreak: "Best streak",
        tasksToday: "Tasks today: {count}",
        accuracyToday: "Today's accuracy",
        dailyGoalTitle: "Daily goal",
        dailyGoalProgress: "{completed} of {goal} tasks today",
        dailyGoalComplete: "Goal complete",
        keepGoingTitle: "Want another reward?",
        keepGoingDescription: "The best next step is short practice. Accuracy matters more than rushing.",
        emptyTitle: "Rewards are waiting for the first step",
        emptyDescription: "Start with the diagnostic, then badges unlock for tasks, goals, and day streaks.",
        badgesTitle: "Badges",
        badgesDescription: "Badges unlock through steady learning, accuracy, and completed tasks.",
        unlocked: "Earned",
        locked: "Waiting",
        backToChild: "Back to overview",
        practiceButton: "Continue practice",
        diagnosticButton: "Start diagnostic",
        badges: {
          diagnostic: {
            title: "Explorer",
            description: "Finish the diagnostic and find the right starting point.",
            progress: "{current} of {target}"
          },
          firstTask: {
            title: "First task",
            description: "Solve your first saved task.",
            progress: "{current} of {target}"
          },
          dailyGoal: {
            title: "Daily goal",
            description: "Complete today's task goal.",
            progress: "{current} of {target}"
          },
          accuracyDay: {
            title: "Accurate day",
            description: "Keep at least 80% accuracy across five tasks.",
            progress: "{accuracy}% accuracy with {current} of {target} tasks"
          },
          streak3: {
            title: "Three days in a row",
            description: "Practice on three days in a row.",
            progress: "{current} of {target} days"
          },
          challenge: {
            title: "Challenge accepted",
            description: "Complete at least one challenge task.",
            progress: "{current} of {target}"
          },
          testComplete: {
            title: "Test hero",
            description: "Complete at least one test.",
            progress: "{current} of {target}"
          },
          hundredTasks: {
            title: "100 tasks",
            description: "Collect one hundred saved tasks.",
            progress: "{current} of {target}"
          }
        }
      }
    },
    parent: {
      eyebrow: "Parent area",
      navigation: {
        childArea: "Child area",
        dashboard: "Dashboard",
        children: "Children",
        results: "Results",
        mistakes: "Mistakes",
        progress: "Progress",
        settings: "Settings"
      },
      pin: {
        title: "Parent PIN",
        description: "Enter or set a PIN to open the parent area."
      },
      pinGate: {
        title: "Parent PIN",
        description: "The parent area is separated from the child area by a short PIN.",
        setupTitle: "Set parent PIN",
        setupDescription: "The PIN is a child barrier. Google sign-in and Firebase rules are the real security layer.",
        enterTitle: "Enter parent PIN",
        enterDescription: "After verification, the parent dashboard will open.",
        resetTitle: "Reset parent PIN",
        resetDescription: "The PIN cannot be emailed because it is not stored in readable form. The signed-in parent can set a new PIN.",
        pinLabel: "PIN",
        pinPlaceholder: "4 to 8 digits",
        confirmPinLabel: "Confirm PIN",
        unlockButton: "Unlock",
        createButton: "Create PIN",
        resetButton: "Set new PIN",
        forgotPin: "Forgot PIN?",
        cancelReset: "Back to PIN entry",
        loading: "Loading PIN settings...",
        saving: "Checking...",
        pinRequired: "PIN must be 4 to 8 digits.",
        pinMismatch: "PIN and confirmation must match.",
        invalidPin: "Incorrect PIN. Remaining attempts: {remaining}.",
        lockedMessage: "Too many attempts. Try again after {time}.",
        loadError: "Could not verify the PIN. Check your connection and Firebase rules."
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
        attemptsPerDay: "Tasks per day",
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
        dailyGoalLabel: "Daily goal in tasks",
        createButton: "Create profile and start diagnostics",
        creatingButton: "Creating profile...",
        existingTitle: "Child profiles",
        emptyTitle: "No child profile yet",
        emptyDescription: "Create the first profile so the child can begin with a friendly diagnostic.",
        currentLevelLabel: "Current level",
        dailyGoalValue: "Daily goal: {tasks} tasks",
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
