import Link from "next/link";
import type { ReactNode } from "react";
import { ParentSectionHeader } from "@/components/parent/ParentSectionHeader";
import {
  SK_MATH_CURRICULUM_MODULES,
  SK_MATH_MODULE_OFFICIAL_MAPPINGS,
  SK_MATH_OFFICIAL_CYCLE_1_OUTLINE,
  SK_MATH_REVIEW_CHECKLIST,
  SK_MATH_REVIEW_EVIDENCE
} from "@/data/curriculum/sk-math";
import { getRequestLocale } from "@/lib/i18n/server";
import type {
  CurriculumModuleOfficialMappingStatus,
  CurriculumReviewChecklistStatus,
  CurriculumReviewDecisionRecommendation,
  CurriculumReviewStatus,
  CurriculumVerificationStatus,
  GradeId,
  LearningPathwayId,
  Locale
} from "@/types";

const moduleId = "quantity_and_number_sense";
const detailPath = "/parent/curriculum-verification";

const gradeLabels: Record<Locale, Record<GradeId, string>> = {
  sk: {
    grade_1: "1. ročník",
    grade_2: "2. ročník",
    grade_3: "3. ročník",
    grade_4: "4. ročník",
    grade_5: "5. ročník",
    grade_6: "6. ročník",
    grade_7: "7. ročník",
    grade_8: "8. ročník",
    grade_9: "9. ročník"
  },
  en: {
    grade_1: "Grade 1",
    grade_2: "Grade 2",
    grade_3: "Grade 3",
    grade_4: "Grade 4",
    grade_5: "Grade 5",
    grade_6: "Grade 6",
    grade_7: "Grade 7",
    grade_8: "Grade 8",
    grade_9: "Grade 9"
  }
};

const pathwayLabels: Record<Locale, Record<LearningPathwayId, string>> = {
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

const verificationStatusLabels: Record<Locale, Record<CurriculumVerificationStatus, string>> = {
  sk: {
    draft: "Draft",
    source_identified: "Zdroj identifikovaný",
    partially_verified: "Čiastočne overené",
    verified: "Overené"
  },
  en: {
    draft: "Draft",
    source_identified: "Source identified",
    partially_verified: "Partially verified",
    verified: "Verified"
  }
};

const mappingStatusLabels: Record<Locale, Record<CurriculumModuleOfficialMappingStatus, string>> = {
  sk: {
    candidate: "Návrh",
    needs_review: "Vyžaduje kontrolu",
    confirmed: "Potvrdené",
    rejected: "Zamietnuté"
  },
  en: {
    candidate: "Candidate",
    needs_review: "Needs review",
    confirmed: "Confirmed",
    rejected: "Rejected"
  }
};

const reviewStatusLabels: Record<Locale, Record<CurriculumReviewStatus, string>> = {
  sk: {
    not_started: "Nezačaté",
    in_review: "Prebieha kontrola",
    evidence_recorded: "Dôkazy doplnené",
    ready_for_decision: "Pripravené na rozhodnutie"
  },
  en: {
    not_started: "Not started",
    in_review: "In review",
    evidence_recorded: "Evidence recorded",
    ready_for_decision: "Ready for decision"
  }
};

const checklistStatusLabels: Record<Locale, Record<CurriculumReviewChecklistStatus, string>> = {
  sk: {
    open: "Otvorené",
    checked: "Skontrolované",
    not_applicable: "Netýka sa"
  },
  en: {
    open: "Open",
    checked: "Checked",
    not_applicable: "Not applicable"
  }
};

const decisionRecommendationLabels: Record<Locale, Record<CurriculumReviewDecisionRecommendation, string>> = {
  sk: {
    no_decision: "Bez rozhodnutia",
    needs_more_evidence: "Treba viac dôkazov",
    ready_to_confirm: "Pripravené na potvrdenie",
    do_not_confirm: "Nepotvrdzovať"
  },
  en: {
    no_decision: "No decision",
    needs_more_evidence: "Needs more evidence",
    ready_to_confirm: "Ready to confirm",
    do_not_confirm: "Do not confirm"
  }
};

const moduleText = {
  sk: {
    title: "Množstvo a porozumenie číslam",
    description: "Buduje význam čísla, rozpoznávanie množstva a porovnávanie čísel."
  },
  en: {
    title: "Quantity and number sense",
    description: "Builds early number meaning, quantity recognition, and number comparison."
  }
} satisfies Record<Locale, { title: string; description: string }>;

export default async function QuantityAndNumberSenseReviewPage() {
  const locale = await getRequestLocale();
  const isSlovak = locale === "sk";
  const curriculumModule = SK_MATH_CURRICULUM_MODULES.find((item) => item.id === moduleId);
  const mapping = SK_MATH_MODULE_OFFICIAL_MAPPINGS.find((item) => item.moduleId === moduleId);
  const outlineSection = mapping
    ? SK_MATH_OFFICIAL_CYCLE_1_OUTLINE.find((section) => section.id === mapping.officialOutlineSectionId)
    : undefined;
  const reviewEvidence = SK_MATH_REVIEW_EVIDENCE.find((item) => item.moduleId === moduleId);
  const checklistItems = reviewEvidence
    ? SK_MATH_REVIEW_CHECKLIST.filter((item) => item.reviewEvidenceId === reviewEvidence.id)
    : [];

  if (!curriculumModule || !mapping || !outlineSection || !reviewEvidence) {
    return (
      <section className="py-8">
        <ParentSectionHeader
          eyebrow={isSlovak ? "Rodič / produkt" : "Parent / product"}
          title={isSlovak ? "Review detail nie je dostupný" : "Review detail is unavailable"}
          description={
            isSlovak
              ? "Niektoré read-only review dáta chýbajú. Skontroluj curriculum scaffold."
              : "Some read-only review data is missing. Check the curriculum scaffold."
          }
        />
        <BackLink isSlovak={isSlovak} />
      </section>
    );
  }

  const localizedModule = moduleText[locale];

  return (
    <section className="py-8">
      <ParentSectionHeader
        eyebrow={isSlovak ? "Rodič / produkt" : "Parent / product"}
        title={isSlovak ? "Review: Množstvo a porozumenie číslam" : "Review: Quantity and number sense"}
        description={
          isSlovak
            ? "Read-only detail pre manuálnu kontrolu jedného draft curriculum modulu."
            : "Read-only detail for manually reviewing one draft curriculum module."
        }
      />

      <div className="grid gap-6">
        <section className="rounded-lg border border-amber-200 bg-amber-50 p-5">
          <h2 className="text-lg font-bold text-slate-950">
            {isSlovak ? "Toto ešte nie je overenie" : "This is not verification yet"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-amber-950">
            {isSlovak
              ? "Stránka iba zhromažďuje draft modul, kandidátske mapovanie, evidence scaffold a checklist na jednom mieste. Nič nezapisuje a nemení žiadny status."
              : "This page only gathers the draft module, candidate mapping, evidence scaffold, and checklist in one place. It writes nothing and changes no status."}
          </p>
        </section>

        <SectionCard title={isSlovak ? "Modul" : "Module"}>
          <dl className="grid gap-4 text-sm md:grid-cols-2">
            <Field label="ID" value={curriculumModule.id} />
            <Field
              label={isSlovak ? "Stav overenia" : "Verification status"}
              value={verificationStatusLabels[locale][curriculumModule.verificationStatus ?? "draft"]}
            />
            <Field label={isSlovak ? "Názov" : "Title"} value={localizedModule.title} />
            <Field
              label={isSlovak ? "Odporúčané ročníky" : "Recommended grades"}
              value={curriculumModule.recommendedGrades.map((grade) => gradeLabels[locale][grade]).join(", ")}
            />
            <div className="md:col-span-2">
              <dt className="font-bold text-slate-800">{isSlovak ? "Popis" : "Description"}</dt>
              <dd className="mt-1 leading-6 text-slate-600">{localizedModule.description}</dd>
            </div>
            <div className="md:col-span-2">
              <dt className="font-bold text-slate-800">{isSlovak ? "Remediačné cesty" : "Remediation pathways"}</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {curriculumModule.visualArithmeticRemediation.map((pathwayId) => (
                  <span
                    key={pathwayId}
                    className="inline-flex rounded-md bg-emerald-50 px-2 py-1 text-xs font-bold uppercase text-emerald-800"
                  >
                    {pathwayLabels[locale][pathwayId as LearningPathwayId] ?? pathwayId}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </SectionCard>

        <SectionCard title={isSlovak ? "Oficiálne mapovanie" : "Official mapping"}>
          <dl className="grid gap-4 text-sm md:grid-cols-2">
            <Field label={isSlovak ? "Oficiálna sekcia" : "Official outline section"} value={outlineSection.title} />
            <Field
              label={isSlovak ? "Stav mapovania" : "Mapping status"}
              value={mappingStatusLabels[locale][mapping.status]}
            />
            <div className="md:col-span-2">
              <dt className="font-bold text-slate-800">{isSlovak ? "Rationale" : "Rationale"}</dt>
              <dd className="mt-1 leading-6 text-slate-600">{mapping.rationale}</dd>
            </div>
            <div className="md:col-span-2">
              <dt className="font-bold text-slate-800">{isSlovak ? "Poznámka reviewera" : "Reviewer note"}</dt>
              <dd className="mt-1 leading-6 text-slate-600">{mapping.reviewerNote}</dd>
            </div>
          </dl>
        </SectionCard>

        <SectionCard title={isSlovak ? "Dôkazy z manuálneho overenia" : "Review evidence"}>
          <dl className="grid gap-4 text-sm md:grid-cols-2">
            <Field
              label={isSlovak ? "Stav review" : "Review status"}
              value={reviewStatusLabels[locale][reviewEvidence.reviewStatus]}
            />
            <Field label={isSlovak ? "Zdrojové ID" : "Source IDs"} value={reviewEvidence.sourceIds.join(", ")} />
            <Field
              label={isSlovak ? "Citát alebo referencia" : "Quote or reference"}
              value={reviewEvidence.sourceQuoteOrReference || (isSlovak ? "nedoplnené" : "not added")}
            />
            <Field
              label={isSlovak ? "Kontrolór" : "Reviewer"}
              value={reviewEvidence.reviewedBy || (isSlovak ? "nepriradené" : "not assigned")}
            />
            <Field
              label={isSlovak ? "Dátum kontroly" : "Reviewed at"}
              value={reviewEvidence.reviewedAt ?? (isSlovak ? "neskontrolované" : "not reviewed")}
            />
            <div className="md:col-span-2">
              <dt className="font-bold text-slate-800">{isSlovak ? "Poznámky" : "Review notes"}</dt>
              <dd className="mt-1 leading-6 text-slate-600">{reviewEvidence.reviewNotes}</dd>
            </div>
          </dl>
        </SectionCard>

        <SectionCard title={isSlovak ? "PDF referencie" : "PDF reference placeholders"}>
          <dl className="grid gap-4 text-sm md:grid-cols-2">
            <Field
              label={isSlovak ? "Pomôcka k strane" : "Source page hint"}
              value={reviewEvidence.sourcePageHint || (isSlovak ? "nedoplnené" : "not added")}
            />
            <Field
              label={isSlovak ? "Oficiálna formulácia" : "Official wording reference"}
              value={reviewEvidence.officialWordingReference || (isSlovak ? "nedoplnené" : "not added")}
            />
            <Field
              label={isSlovak ? "Odporúčanie rozhodnutia" : "Decision recommendation"}
              value={decisionRecommendationLabels[locale][reviewEvidence.decisionRecommendation ?? "no_decision"]}
            />
          </dl>
        </SectionCard>

        <SectionCard title={isSlovak ? "Checklist" : "Checklist"}>
          <div className="grid gap-3">
            {checklistItems.map((item) => (
              <article key={item.id} className="rounded-md border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-950">{item.label}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                  </div>
                  <span className="inline-flex w-fit rounded-md bg-white px-2 py-1 text-xs font-bold uppercase text-slate-600 shadow-sm">
                    {checklistStatusLabels[locale][item.status]}
                  </span>
                </div>
                <dl className="mt-3 grid gap-3 text-xs sm:grid-cols-2">
                  <Field
                    label={isSlovak ? "Pomôcka k strane" : "Source page hint"}
                    value={item.sourcePageHint || (isSlovak ? "nedoplnené" : "not added")}
                  />
                  <Field
                    label={isSlovak ? "Oficiálna formulácia" : "Official wording reference"}
                    value={item.officialWordingReference || (isSlovak ? "nedoplnené" : "not added")}
                  />
                  <Field
                    label={isSlovak ? "Odporúčanie rozhodnutia" : "Decision recommendation"}
                    value={decisionRecommendationLabels[locale][item.decisionRecommendation ?? "no_decision"]}
                  />
                  <Field
                    label={isSlovak ? "Zdrojová referencia" : "Source reference"}
                    value={item.sourceReference || (isSlovak ? "nedoplnené" : "not added")}
                  />
                  <Field
                    label={isSlovak ? "Poznámka reviewera" : "Reviewer note"}
                    value={item.reviewerNote || (isSlovak ? "nedoplnené" : "not added")}
                  />
                </dl>
              </article>
            ))}
          </div>
        </SectionCard>

        <BackLink isSlovak={isSlovak} />
      </div>
    </section>
  );
}

function SectionCard({ children, title }: { children: ReactNode; title: string }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-bold text-slate-950">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-bold text-slate-800">{label}</dt>
      <dd className="mt-1 break-words leading-6 text-slate-600">{value}</dd>
    </div>
  );
}

function BackLink({ isSlovak }: { isSlovak: boolean }) {
  return (
    <Link
      className="inline-flex min-h-11 w-fit items-center justify-center rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
      href={detailPath}
    >
      {isSlovak ? "Späť na overenie učiva" : "Back to curriculum verification"}
    </Link>
  );
}
