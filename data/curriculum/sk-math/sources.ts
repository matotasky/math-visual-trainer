import type { CurriculumOfficialSource } from "@/types";

export const SK_MATH_OFFICIAL_SOURCES = {
  ministrySvp2023: {
    id: "ministry_svp_2023",
    title: "Štátny vzdelávací program pre základné vzdelávanie (2023)",
    url: "https://www.minedu.sk/statny-vzdelavaci-program-pre-zakladne-vzdelavanie/",
    sourceType: "page",
    publisher: "Ministerstvo školstva, výskumu, vývoja a mládeže SR",
    retrievedNote: "Ministry source page for the 2023 state educational programme."
  },
  ministryMathInformatics: {
    id: "ministry_math_informatics",
    title: "Matematika a informatika",
    url: "https://www.minedu.sk/matematika-a-informatika/",
    sourceType: "page",
    publisher: "Ministerstvo školstva, výskumu, vývoja a mládeže SR",
    retrievedNote: "Ministry mathematics and informatics source page."
  },
  ministryMathStandardPdf: {
    id: "ministry_math_standard_pdf",
    title: "Matematika (.pdf, 03.01.2024)",
    url: "https://www.minedu.sk/data/att/490/28441.a209a3.pdf",
    sourceType: "pdf",
    publisher: "Ministerstvo školstva, výskumu, vývoja a mládeže SR",
    retrievedNote:
      "Direct PDF URL identified from the Ministry Matematika a informatika page. The PDF is listed as Matematika (.pdf, 870.79 kB), dated 03.01.2024. Module-level mapping still requires manual verification."
  },
  vzdelavanie21NewSvp: {
    id: "vzdelavanie21_new_svp",
    title: "Nový štátny vzdelávací program",
    url: "https://vzdelavanie21.sk/novy-statny-vzdelavaci-program/",
    sourceType: "portal",
    publisher: "Vzdelávanie 21",
    retrievedNote: "Contextual implementation information for the new state educational programme."
  }
} as const satisfies Record<string, CurriculumOfficialSource>;
