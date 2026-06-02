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
        description: "Rýchly rodičovský pohľad na dennú aktivitu, presnosť, tempo, chyby a ďalší najlepší krok.",
        accuracyChart: "Presnosť v čase",
        masteryChart: "Zvládnutie tém",
        loadingProfiles: "Načítavam detské profily...",
        loadingDashboard: "Načítavam rodičovský prehľad...",
        loadError: "Prehľad sa nepodarilo načítať. Skontrolujte pripojenie a Firebase pravidlá.",
        noChildrenTitle: "Najprv vytvorte detský profil",
        noChildrenDescription: "Dashboard potrebuje aspoň jedno dieťa, aby mohol zobraziť pokrok, chyby a odporúčania.",
        createChildButton: "Vytvoriť dieťa",
        childSelectorLabel: "Aktívne dieťa",
        currentLevel: "Aktuálna úroveň: {level}",
        lastActivity: "Posledná aktivita",
        noActivity: "Zatiaľ žiadna aktivita",
        recentWindow: "Zobrazuje posledné uložené úlohy a posledných 14 dní",
        dataNote: "Free-tier poznámka: dashboard číta obmedzenú stránku posledných úloh. Súhrnné dokumenty môžeme napojiť v ďalšom kroku.",
        cards: {
          dailyStreak: "Séria dní",
          overallAccuracy: "Celková presnosť",
          averageResponseTime: "Priemerný čas",
          practiceMinutes: "Aktívne minúty",
          tasksToday: "Dnešný cieľ",
          currentLevel: "Úroveň"
        },
        charts: {
          accuracy: "Presnosť za 14 dní",
          responseTime: "Čas odpovede za 14 dní",
          attempts: "Úlohy za deň",
          topicMastery: "Zvládnutie podľa témy"
        },
        sections: {
          recommendedFocus: "Odporúčaný ďalší krok",
          levelControl: "Kontrola úrovne",
          topicMastery: "Témy",
          commonMistakes: "Najčastejšie chyby",
          recentTests: "Posledné testy"
        },
        emptyStates: {
          noAttempts: "Zatiaľ nie sú uložené žiadne úlohy. Nech dieťa začne diagnostikou alebo krátkym precvičovaním.",
          noMistakes: "Z posledných uložených úloh nevidím opakovanú chybu.",
          noTests: "Zatiaľ tu nie je dokončený test."
        },
        table: {
          topic: "Téma",
          accuracy: "Presnosť",
          averageTime: "Priemerný čas",
          tasks: "Úlohy",
          example: "Príklad",
          mistakes: "Chyby",
          errorRate: "Chybovosť",
          result: "Výsledok",
          date: "Dátum"
        },
        recommendations: {
          diagnostic: "Dokončite najprv diagnostiku. Bez nej by aplikácia hádala nesprávnu úroveň.",
          startPractice: "Začnite krátkym precvičovaním. Potrebujeme prvé uložené úlohy, aby sa ukázal vzor.",
          accuracy: "Presnosť je zatiaľ pod 80 %. Vráťte sa na učenie a vizuálne modely bez tlaku na rýchlosť.",
          make10: "Vidím náznak slabšieho dopĺňania do 10. Pomôže učenie s ten-frame a úlohy typu 8+2, 7+3, 6+4.",
          slowTopic: "Presnosť je dobrá, ale téma {topic} je pomalšia. Dajte krátke pokojné precvičovanie bez tlaku.",
          dailyGoal: "Dnes ešte nie je hotový denný rytmus. Stačí krátka séria úloh, nie dlhé sedenie.",
          challenge: "Dieťa má dnes stabilný výkon. Môže skúsiť krátku výzvu alebo ľahký test."
        },
        insights: {
          make10Issue: "Časté chyby pri dopĺňaní do 10 naznačujú slabšie make-10 porozumenie.",
          weakPairIssue: "Opakovaná chyba pri tomto páre naznačuje, že kombinácia ešte nie je stabilná.",
          slowButCorrect: "Odpovede bývajú správne, ale pomalšie. To skôr znamená pomalé uvažovanie než nepochopenie."
        },
        levelControl: {
          title: "Rodičovská kontrola úrovne",
          description: "Aplikácia odporučí úroveň podľa posledných úloh, ale rodič ju môže zvýšiť alebo znížiť podľa toho, čo vidí doma.",
          appRecommendation: "Odporúčanie aplikácie",
          recommendedLevel: "Odporúčaná úroveň: {level}",
          currentLevel: "Aktuálne nastavené: {level}",
          manualSelectLabel: "Nastaviť úroveň ručne",
          applyRecommendation: "Použiť odporúčanie",
          lowerLevel: "Znížiť o level",
          raiseLevel: "Zvýšiť o level",
          saving: "Ukladám...",
          saveError: "Úroveň sa nepodarilo uložiť. Skontrolujte pripojenie a Firebase pravidlá.",
          actionLabels: {
            keep: "Ponechať aktuálnu úroveň",
            raise: "Zvýšiť úroveň",
            lower: "Znížiť úroveň"
          },
          reasons: {
            needs_diagnostic: "Najprv je potrebné dokončiť diagnostiku. Bez nej by odporúčanie stálo na slabých dátach.",
            not_enough_data: "Zatiaľ je málo uložených úloh. Ponechajte úroveň a nazbierajte ešte krátku sériu.",
            ready_to_raise: "Presnosť, tempo aj počet úloh vyzerajú stabilne. Dieťa môže skúsiť vyššiu úroveň.",
            accuracy_low_lower: "Presnosť je nízka. Nižšia úroveň pomôže obnoviť porozumenie bez frustrácie.",
            accuracy_low_practice: "Presnosť ešte nie je stabilná. Najlepšie je zostať a precvičiť vizuálne stratégie.",
            slow_but_correct: "Dieťa odpovedá väčšinou správne, ale pomalšie. Rýchlosť ešte netlačme, úroveň ponechajme.",
            keep_building: "Výkon sa buduje. Aktuálna úroveň je zatiaľ vhodná."
          },
          stats: "Presnosť {accuracy}% · úlohy {attempts} · priemerný čas {time}"
        },
        levelReset: {
          title: "Vymazať postup levelu",
          description: "Vyberte konkrétnu úroveň a vymažte uložené úlohy iba z nej. Profil dieťaťa ani aktuálne nastavená úroveň sa nezmažú.",
          selectLabel: "Level, ktorý chcete vyčistiť",
          deleteButton: "Vymazať postup levelu",
          confirmTitle: "Naozaj vymazať tento postup?",
          confirmDescription: "Z levelu {level} sa odstránia uložené úlohy a prehľad sa prepočíta. Tento krok sa nedá vrátiť späť.",
          cancelButton: "Zrušiť",
          confirmButton: "Áno, vymazať",
          saving: "Mažem...",
          success: "Vymazané úlohy: {count}.",
          saveError: "Postup levelu sa nepodarilo vymazať. Skontrolujte pripojenie a Firebase pravidlá."
        },
        topics: {
          quantity_recognition: "Rozpoznávanie množstva",
          number_matching: "Priraďovanie čísla",
          addition_to_5: "Sčítanie do 5",
          quantity_to_10: "Množstvá do 10",
          make_10: "Dopĺňanie do 10",
          addition_to_10: "Sčítanie do 10",
          subtraction_to_10: "Odčítanie do 10",
          addition_to_20: "Sčítanie do 20",
          bridge_through_10: "Prechod cez 10"
        },
        modes: {
          diagnostic: "Diagnostika",
          learn: "Učenie",
          practice: "Precvičovanie",
          test: "Test",
          challenge: "Výzva"
        }
      },
      results: {
        title: "Výsledky",
        description: "Prehľad posledných sedení, testov a detailov úloh bez načítania celej histórie naraz.",
        detailTitle: "Detail výsledku",
        detailDescription: "Detail uložených úloh v sedení {sessionId}.",
        loadingProfiles: "Načítavam detské profily...",
        loadingResults: "Načítavam výsledky...",
        loadError: "Výsledky sa nepodarilo načítať. Skontrolujte pripojenie a Firebase pravidlá.",
        noChildrenTitle: "Najprv vytvorte detský profil",
        noChildrenDescription: "Výsledky potrebujú aspoň jedno dieťa s uloženými úlohami.",
        createChildButton: "Vytvoriť dieťa",
        childSelectorLabel: "Aktívne dieťa",
        filtersTitle: "Filtre výsledkov",
        modeFilterLabel: "Typ aktivity",
        topicFilterLabel: "Téma",
        dateFilterLabel: "Obdobie",
        allModes: "Všetky aktivity",
        allTopics: "Všetky témy",
        allDates: "Celá načítaná história",
        last7Days: "Posledných 7 dní",
        last14Days: "Posledných 14 dní",
        last30Days: "Posledných 30 dní",
        multipleTopics: "Viac tém",
        emptyTitle: "Zatiaľ tu nie sú výsledky",
        emptyDescription: "Keď dieťa dokončí diagnostiku, precvičovanie, test alebo výzvu, sedenie sa zobrazí tu.",
        dataNote: "Free-tier poznámka: stránka pracuje s obmedzenou stránkou posledných uložených úloh a z nich skladá sedenia.",
        previousPage: "Späť",
        nextPage: "Ďalej",
        pageStatus: "Strana {current} z {total}",
        cards: {
          sessions: "Sedenia",
          tests: "Testy",
          tasks: "Správne úlohy",
          averageAccuracy: "Priemerná presnosť",
          averageTime: "Priemerný čas"
        },
        table: {
          date: "Dátum",
          mode: "Aktivita",
          topic: "Téma",
          level: "Level",
          tasks: "Úlohy",
          accuracy: "Presnosť",
          averageTime: "Priemerný čas",
          detail: "Detail"
        },
        detail: {
          backToResults: "Späť na výsledky",
          loadingDetail: "Načítavam detail výsledku...",
          loadError: "Detail výsledku sa nepodarilo načítať. Skontrolujte pripojenie a Firebase pravidlá.",
          emptyTitle: "Výsledok sa nenašiel",
          emptyDescription: "Pre vybrané dieťa som nenašiel uložené úlohy s týmto sedením. Skúste vymeniť aktívne dieťa alebo sa vrátiť na výsledky.",
          summaryTitle: "Súhrn sedenia",
          question: "Otázka",
          correctAnswer: "Správna odpoveď",
          givenAnswer: "Odpoveď dieťaťa",
          responseTime: "Čas",
          visualModel: "Vizuálny model",
          correctness: "Výsledok",
          correct: "Správne",
          incorrect: "Nesprávne",
          noAnswer: "Bez odpovede"
        },
        topics: {
          quantity_recognition: "Rozpoznávanie množstva",
          number_matching: "Priraďovanie čísla",
          addition_to_5: "Sčítanie do 5",
          quantity_to_10: "Množstvá do 10",
          make_10: "Dopĺňanie do 10",
          addition_to_10: "Sčítanie do 10",
          subtraction_to_10: "Odčítanie do 10",
          addition_to_20: "Sčítanie do 20",
          bridge_through_10: "Prechod cez 10"
        },
        modes: {
          diagnostic: "Diagnostika",
          learn: "Učenie",
          practice: "Precvičovanie",
          test: "Test",
          challenge: "Výzva"
        },
        visualModels: {
          dots: "Bodky",
          ten_frame: "Ten-frame",
          number_line: "Číselná os",
          groups: "Skupiny",
          none: "Bez modelu"
        }
      },
      mistakes: {
        title: "Chyby",
        description: "Najčastejšie nesprávne príklady, slabé témy, pomalé správne odpovede a odporúčané precvičenie.",
        loadingProfiles: "Načítavam detské profily...",
        loadingMistakes: "Načítavam chyby...",
        loadError: "Chyby sa nepodarilo načítať. Skontrolujte pripojenie a Firebase pravidlá.",
        noChildrenTitle: "Najprv vytvorte detský profil",
        noChildrenDescription: "Analýza chýb potrebuje aspoň jedno dieťa s uloženými úlohami.",
        createChildButton: "Vytvoriť dieťa",
        childSelectorLabel: "Aktívne dieťa",
        filtersTitle: "Filtre chýb",
        topicFilterLabel: "Téma",
        dateFilterLabel: "Obdobie",
        allTopics: "Všetky témy",
        allDates: "Celá načítaná história",
        last7Days: "Posledných 7 dní",
        last14Days: "Posledných 14 dní",
        last30Days: "Posledných 30 dní",
        noAnswer: "Bez odpovede",
        dataNote: "Free-tier poznámka: stránka analyzuje obmedzenú stránku posledných uložených úloh. Agregované mistakeStats napojíme v ďalšom kroku.",
        emptyTitle: "Nevidím opakovanú chybu",
        emptyDescription: "V aktuálnom výbere nie sú opakované nesprávne odpovede. Ak dieťa ešte necvičilo, výsledky sa zobrazia po prvých uložených úlohách.",
        primaryInsightTitle: "Najpravdepodobnejšie vysvetlenie",
        cards: {
          totalMistakes: "Chybné úlohy",
          errorRate: "Chybovosť",
          repeatedExamples: "Opakované príklady",
          fastGuesses: "Rýchle tipovanie",
          slowCorrect: "Pomalé správne"
        },
        sections: {
          frequentMistakes: "Najčastejšie nesprávne príklady",
          weakestTopics: "Najslabšie témy",
          slowTopics: "Pomalé, ale správne témy"
        },
        table: {
          example: "Príklad",
          topic: "Téma",
          level: "Level",
          mistakes: "Chyby",
          attempts: "Úlohy",
          errorRate: "Chybovosť",
          commonWrongAnswers: "Časté odpovede",
          lastMistake: "Posledná chyba",
          averageWrongTime: "Priemerný čas",
          suggestion: "Odporúčanie"
        },
        insights: {
          weak_quantity_recognition: "Chyby pri rozpoznávaní množstva naznačujú, že dieťa ešte nemusí stabilne vidieť počet bez počítania po jednom.",
          wrong_pair_combination: "Opakovaná chyba pri rovnakom príklade naznačuje nestabilnú číselnú kombináciu.",
          weak_make_10: "Chyby pri pároch ako 8+2, 7+3 alebo 6+4 naznačujú slabšie dopĺňanie do 10.",
          counting_by_one_dependency: "Výkon môže naznačovať závislosť od počítania po jednom namiesto použitia stratégie.",
          fast_guessing: "Veľmi rýchle nesprávne odpovede vyzerajú skôr ako tipovanie než premyslený postup.",
          slow_but_correct: "Dieťa často odpovie správne, ale pomaly. To skôr znamená neistú automatizáciu než nepochopenie.",
          unknown: "Zatiaľ nevidím dosť silný vzor. Pomôže ešte krátke precvičovanie."
        },
        remediations: {
          weak_quantity_recognition: "Vráťte sa k bodkám, skupinám a pokojnej otázke „koľko vidíš?“ bez tlaku na čas.",
          wrong_pair_combination: "Dajte krátke cielené precvičovanie presne týchto príkladov s vizuálnym modelom.",
          weak_make_10: "Použite ten-frame a dopĺňanie do 10. Najprv nech dieťa ukáže, čo chýba do plnej desiatky.",
          counting_by_one_dependency: "Podporujte rozklad čísla a skupiny. Rýchlosť zatiaľ netlačte.",
          fast_guessing: "Spomaľte výzvy a testy. Uprednostnite presnosť a vysvetlenie pred rýchlym odoslaním odpovede.",
          slow_but_correct: "Nechajte rovnakú úroveň a pridajte krátke stabilizačné série. Cieľ je istota, nie skok na ťažší level.",
          unknown: "Nazbierajte ešte niekoľko úloh v precvičovaní, aby sa ukázal spoľahlivejší vzor."
        },
        topics: {
          quantity_recognition: "Rozpoznávanie množstva",
          number_matching: "Priraďovanie čísla",
          addition_to_5: "Sčítanie do 5",
          quantity_to_10: "Množstvá do 10",
          make_10: "Dopĺňanie do 10",
          addition_to_10: "Sčítanie do 10",
          subtraction_to_10: "Odčítanie do 10",
          addition_to_20: "Sčítanie do 20",
          bridge_through_10: "Prechod cez 10"
        }
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
        description: "A quick parent view of daily activity, accuracy, pacing, mistakes, and the next best step.",
        accuracyChart: "Accuracy over time",
        masteryChart: "Topic mastery",
        loadingProfiles: "Loading child profiles...",
        loadingDashboard: "Loading parent dashboard...",
        loadError: "Could not load the dashboard. Check your connection and Firebase rules.",
        noChildrenTitle: "Create a child profile first",
        noChildrenDescription: "The dashboard needs at least one child before it can show progress, mistakes, and recommendations.",
        createChildButton: "Create child",
        childSelectorLabel: "Active child",
        currentLevel: "Current level: {level}",
        lastActivity: "Last activity",
        noActivity: "No activity yet",
        recentWindow: "Showing recent saved tasks and the last 14 days",
        dataNote: "Free-tier note: this dashboard reads a limited page of recent tasks. Aggregate documents can be wired in the next pass.",
        cards: {
          dailyStreak: "Day streak",
          overallAccuracy: "Overall accuracy",
          averageResponseTime: "Average time",
          practiceMinutes: "Active minutes",
          tasksToday: "Daily goal",
          currentLevel: "Level"
        },
        charts: {
          accuracy: "14-day accuracy",
          responseTime: "14-day response time",
          attempts: "Tasks per day",
          topicMastery: "Mastery by topic"
        },
        sections: {
          recommendedFocus: "Recommended next step",
          levelControl: "Level control",
          topicMastery: "Topics",
          commonMistakes: "Most common mistakes",
          recentTests: "Recent tests"
        },
        emptyStates: {
          noAttempts: "No saved tasks yet. Have the child start with the diagnostic or a short practice round.",
          noMistakes: "No repeated mistake appears in the recent saved tasks.",
          noTests: "No completed test yet."
        },
        table: {
          topic: "Topic",
          accuracy: "Accuracy",
          averageTime: "Average time",
          tasks: "Tasks",
          example: "Example",
          mistakes: "Mistakes",
          errorRate: "Error rate",
          result: "Result",
          date: "Date"
        },
        recommendations: {
          diagnostic: "Finish the diagnostic first. Without it, the app would be guessing the child's level.",
          startPractice: "Start with a short practice round. We need the first saved tasks before patterns appear.",
          accuracy: "Accuracy is below 80%. Return to learning and visual models without speed pressure.",
          make10: "There are signs of weak make-10 understanding. Ten-frame learning and tasks like 8+2, 7+3, and 6+4 will help.",
          slowTopic: "Accuracy is good, but {topic} is slower. Try short calm practice without time pressure.",
          dailyGoal: "Today's rhythm is not finished yet. A short task set is enough, not a long session.",
          challenge: "Performance looks stable today. A short challenge or light test is appropriate."
        },
        insights: {
          make10Issue: "Frequent complement-to-10 mistakes suggest weak make-10 understanding.",
          weakPairIssue: "Repeated mistakes on this pair suggest the combination is not stable yet.",
          slowButCorrect: "Answers are often correct but slower. That suggests slow thinking rather than lack of understanding."
        },
        levelControl: {
          title: "Parent level control",
          description: "The app recommends a level from recent tasks, but the parent can raise or lower it based on what they see at home.",
          appRecommendation: "App recommendation",
          recommendedLevel: "Recommended level: {level}",
          currentLevel: "Currently set: {level}",
          manualSelectLabel: "Set level manually",
          applyRecommendation: "Apply recommendation",
          lowerLevel: "Lower one level",
          raiseLevel: "Raise one level",
          saving: "Saving...",
          saveError: "Could not save the level. Check your connection and Firebase rules.",
          actionLabels: {
            keep: "Keep current level",
            raise: "Raise level",
            lower: "Lower level"
          },
          reasons: {
            needs_diagnostic: "Finish the diagnostic first. Without it, the recommendation would be based on weak data.",
            not_enough_data: "There are not enough saved tasks yet. Keep the level and collect one short task set.",
            ready_to_raise: "Accuracy, pace, and task count look stable. The child can try a higher level.",
            accuracy_low_lower: "Accuracy is low. A lower level can rebuild understanding without frustration.",
            accuracy_low_practice: "Accuracy is not stable yet. Stay here and practice visual strategies.",
            slow_but_correct: "The child is mostly correct but slower. Do not push speed yet; keep the level.",
            keep_building: "Performance is still building. The current level is appropriate for now."
          },
          stats: "Accuracy {accuracy}% · tasks {attempts} · average time {time}"
        },
        levelReset: {
          title: "Delete level progress",
          description: "Select a specific level and remove saved tasks only from that level. The child profile and currently assigned level are not deleted.",
          selectLabel: "Level to clear",
          deleteButton: "Delete level progress",
          confirmTitle: "Delete this progress?",
          confirmDescription: "Saved tasks from {level} will be removed and the dashboard will recalculate. This cannot be undone.",
          cancelButton: "Cancel",
          confirmButton: "Yes, delete",
          saving: "Deleting...",
          success: "Deleted tasks: {count}.",
          saveError: "Could not delete level progress. Check your connection and Firebase rules."
        },
        topics: {
          quantity_recognition: "Quantity recognition",
          number_matching: "Number matching",
          addition_to_5: "Addition to 5",
          quantity_to_10: "Quantities to 10",
          make_10: "Make 10",
          addition_to_10: "Addition to 10",
          subtraction_to_10: "Subtraction to 10",
          addition_to_20: "Addition to 20",
          bridge_through_10: "Bridge through 10"
        },
        modes: {
          diagnostic: "Diagnostic",
          learn: "Learn",
          practice: "Practice",
          test: "Test",
          challenge: "Challenge"
        }
      },
      results: {
        title: "Results",
        description: "Recent sessions, tests, and task details without loading the full history at once.",
        detailTitle: "Result detail",
        detailDescription: "Saved task detail for session {sessionId}.",
        loadingProfiles: "Loading child profiles...",
        loadingResults: "Loading results...",
        loadError: "Could not load results. Check your connection and Firebase rules.",
        noChildrenTitle: "Create a child profile first",
        noChildrenDescription: "Results need at least one child with saved tasks.",
        createChildButton: "Create child",
        childSelectorLabel: "Active child",
        filtersTitle: "Result filters",
        modeFilterLabel: "Activity type",
        topicFilterLabel: "Topic",
        dateFilterLabel: "Date range",
        allModes: "All activities",
        allTopics: "All topics",
        allDates: "All loaded history",
        last7Days: "Last 7 days",
        last14Days: "Last 14 days",
        last30Days: "Last 30 days",
        multipleTopics: "Multiple topics",
        emptyTitle: "No results yet",
        emptyDescription: "When the child finishes a diagnostic, practice, test, or challenge session, it will appear here.",
        dataNote: "Free-tier note: this page reads a limited page of recent saved tasks and groups them into sessions.",
        previousPage: "Previous",
        nextPage: "Next",
        pageStatus: "Page {current} of {total}",
        cards: {
          sessions: "Sessions",
          tests: "Tests",
          tasks: "Correct tasks",
          averageAccuracy: "Average accuracy",
          averageTime: "Average time"
        },
        table: {
          date: "Date",
          mode: "Activity",
          topic: "Topic",
          level: "Level",
          tasks: "Tasks",
          accuracy: "Accuracy",
          averageTime: "Average time",
          detail: "Detail"
        },
        detail: {
          backToResults: "Back to results",
          loadingDetail: "Loading result detail...",
          loadError: "Could not load result detail. Check your connection and Firebase rules.",
          emptyTitle: "Result not found",
          emptyDescription: "I could not find saved tasks for this session under the selected child. Try switching the active child or returning to results.",
          summaryTitle: "Session summary",
          question: "Question",
          correctAnswer: "Correct answer",
          givenAnswer: "Child answer",
          responseTime: "Time",
          visualModel: "Visual model",
          correctness: "Result",
          correct: "Correct",
          incorrect: "Incorrect",
          noAnswer: "No answer"
        },
        topics: {
          quantity_recognition: "Quantity recognition",
          number_matching: "Number matching",
          addition_to_5: "Addition to 5",
          quantity_to_10: "Quantities to 10",
          make_10: "Make 10",
          addition_to_10: "Addition to 10",
          subtraction_to_10: "Subtraction to 10",
          addition_to_20: "Addition to 20",
          bridge_through_10: "Bridge through 10"
        },
        modes: {
          diagnostic: "Diagnostic",
          learn: "Learn",
          practice: "Practice",
          test: "Test",
          challenge: "Challenge"
        },
        visualModels: {
          dots: "Dots",
          ten_frame: "Ten-frame",
          number_line: "Number line",
          groups: "Groups",
          none: "No model"
        }
      },
      mistakes: {
        title: "Mistakes",
        description: "Frequent wrong examples, weak topics, slow correct answers, and recommended remediation.",
        loadingProfiles: "Loading child profiles...",
        loadingMistakes: "Loading mistakes...",
        loadError: "Could not load mistakes. Check your connection and Firebase rules.",
        noChildrenTitle: "Create a child profile first",
        noChildrenDescription: "Mistake analysis needs at least one child with saved tasks.",
        createChildButton: "Create child",
        childSelectorLabel: "Active child",
        filtersTitle: "Mistake filters",
        topicFilterLabel: "Topic",
        dateFilterLabel: "Date range",
        allTopics: "All topics",
        allDates: "All loaded history",
        last7Days: "Last 7 days",
        last14Days: "Last 14 days",
        last30Days: "Last 30 days",
        noAnswer: "No answer",
        dataNote: "Free-tier note: this page analyzes a limited page of recent saved tasks. Aggregate mistakeStats can be wired in the next pass.",
        emptyTitle: "No repeated mistake found",
        emptyDescription: "There are no repeated wrong answers in the current selection. If the child has not practiced yet, results will appear after saved tasks.",
        primaryInsightTitle: "Most likely explanation",
        cards: {
          totalMistakes: "Wrong tasks",
          errorRate: "Error rate",
          repeatedExamples: "Repeated examples",
          fastGuesses: "Fast guesses",
          slowCorrect: "Slow correct"
        },
        sections: {
          frequentMistakes: "Most frequent wrong examples",
          weakestTopics: "Weakest topics",
          slowTopics: "Slow but correct topics"
        },
        table: {
          example: "Example",
          topic: "Topic",
          level: "Level",
          mistakes: "Mistakes",
          attempts: "Tasks",
          errorRate: "Error rate",
          commonWrongAnswers: "Common answers",
          lastMistake: "Last mistake",
          averageWrongTime: "Average time",
          suggestion: "Suggestion"
        },
        insights: {
          weak_quantity_recognition: "Quantity-recognition mistakes suggest the child may not yet see quantities without counting one by one.",
          wrong_pair_combination: "Repeated mistakes on the same example suggest an unstable number pair.",
          weak_make_10: "Mistakes on pairs like 8+2, 7+3, or 6+4 suggest weak make-10 understanding.",
          counting_by_one_dependency: "Performance may suggest dependence on counting by one instead of using a strategy.",
          fast_guessing: "Very fast wrong answers look more like guessing than thoughtful work.",
          slow_but_correct: "The child often answers correctly but slowly. This suggests unstable automaticity rather than lack of understanding.",
          unknown: "There is not a strong pattern yet. A short practice round will help."
        },
        remediations: {
          weak_quantity_recognition: "Return to dots, groups, and calm “how many?” questions without time pressure.",
          wrong_pair_combination: "Use short targeted practice for these exact examples with a visual model.",
          weak_make_10: "Use ten-frames and complements to 10. First ask the child to show what is missing to fill ten.",
          counting_by_one_dependency: "Encourage decomposing numbers and seeing groups. Do not push speed yet.",
          fast_guessing: "Slow down challenges and tests. Prioritize accuracy and explanation before quick submission.",
          slow_but_correct: "Keep the same level and add short stabilization sets. The goal is confidence, not jumping ahead.",
          unknown: "Collect a few more practice tasks so a more reliable pattern can emerge."
        },
        topics: {
          quantity_recognition: "Quantity recognition",
          number_matching: "Number matching",
          addition_to_5: "Addition to 5",
          quantity_to_10: "Quantities to 10",
          make_10: "Make 10",
          addition_to_10: "Addition to 10",
          subtraction_to_10: "Subtraction to 10",
          addition_to_20: "Addition to 20",
          bridge_through_10: "Bridge through 10"
        }
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
