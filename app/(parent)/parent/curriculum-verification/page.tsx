import Link from "next/link";
import { ParentSectionHeader } from "@/components/parent/ParentSectionHeader";
import {
  SK_MATH_CURRICULUM_MODULES,
  SK_MATH_CYCLE_1_VERIFICATION_MATRIX,
  SK_MATH_MODULE_OFFICIAL_MAPPINGS,
  SK_MATH_OFFICIAL_CYCLE_1_OUTLINE,
  SK_MATH_OFFICIAL_SOURCES,
  SK_MATH_REVIEW_EVIDENCE
} from "@/data/curriculum/sk-math";
import { getRequestLocale } from "@/lib/i18n/server";
import type {
  CurriculumAreaId,
  CurriculumModuleOfficialMappingStatus,
  CurriculumOfficialCycleOutlineSection,
  CurriculumReviewStatus,
  CurriculumVerificationRisk,
  CurriculumVerificationStatus,
  Locale
} from "@/types";

const areaLabels: Record<Locale, Record<CurriculumAreaId, string>> = {
  sk: {
    numbers_operations: "Čísla a operácie",
    relations_data: "Vzťahy a dáta",
    geometry: "Geometria"
  },
  en: {
    numbers_operations: "Numbers and operations",
    relations_data: "Relations and data",
    geometry: "Geometry"
  }
};

const riskLabels: Record<Locale, Record<CurriculumVerificationRisk, string>> = {
  sk: {
    high: "Vysoké riziko tvrdení",
    medium: "Stredné riziko tvrdení",
    low: "Nízke riziko tvrdení"
  },
  en: {
    high: "High public claim risk",
    medium: "Medium public claim risk",
    low: "Low public claim risk"
  }
};

const sourceTypeLabels: Record<Locale, Record<"page" | "pdf" | "portal", string>> = {
  sk: {
    page: "Stránka",
    pdf: "PDF",
    portal: "Portál"
  },
  en: {
    page: "Page",
    pdf: "PDF",
    portal: "Portal"
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

const mappingStatusLabels: Record<
  Locale,
  Record<CurriculumOfficialCycleOutlineSection["mappingStatus"], string>
> = {
  sk: {
    not_mapped: "Nenamapované",
    partially_mapped: "Čiastočne namapované",
    mapped: "Namapované"
  },
  en: {
    not_mapped: "Not mapped",
    partially_mapped: "Partially mapped",
    mapped: "Mapped"
  }
};

const candidateMappingStatusLabels: Record<Locale, Record<CurriculumModuleOfficialMappingStatus, string>> = {
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

const riskOrder: CurriculumVerificationRisk[] = ["high", "medium", "low"];

function getModuleTitle(moduleId: string) {
  return SK_MATH_CURRICULUM_MODULES.find((module) => module.id === moduleId)?.title ?? moduleId;
}

export default async function ParentCurriculumVerificationPage() {
  const locale = await getRequestLocale();
  const isSlovak = locale === "sk";
  const cycleOneModules = SK_MATH_CURRICULUM_MODULES.filter((module) => module.cycleId === "cycle_1");
  const totalCycleOneModules = cycleOneModules.length;
  const verifiedModulesCount = cycleOneModules.filter((module) => module.verificationStatus === "verified").length;
  const sourceIdentifiedCount = cycleOneModules.filter(
    (module) => module.verificationStatus === "source_identified"
  ).length;
  const highRiskPublicClaimCount = SK_MATH_CYCLE_1_VERIFICATION_MATRIX.filter(
    (row) => row.publicClaimRisk === "high"
  ).length;

  return (
    <section className="py-8">
      <ParentSectionHeader
        eyebrow={isSlovak ? "Rodič / produkt" : "Parent / product"}
        title={isSlovak ? "Overenie školského učiva" : "Curriculum verification"}
        description={
          isSlovak
            ? "Interný čítací prehľad zdrojov a manuálnej overovacej matice pre slovenské matematické učivo."
            : "Read-only internal view of sources and the manual verification matrix for Slovak math curriculum work."
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label={isSlovak ? "Moduly 1. cyklu" : "Cycle 1 modules"} value={totalCycleOneModules} />
        <MetricCard label={isSlovak ? "Overené" : "Verified"} value={verifiedModulesCount} />
        <MetricCard label={isSlovak ? "Zdroj identifikovaný" : "Source identified"} value={sourceIdentifiedCount} />
        <MetricCard label={isSlovak ? "Vysoké riziko tvrdení" : "High claim risk"} value={highRiskPublicClaimCount} />
      </div>

      <section className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-5">
        <h2 className="text-lg font-bold text-slate-950">
          {isSlovak ? "Poznámka k verejným tvrdeniam" : "Public claim note"}
        </h2>
        <p className="mt-2 text-sm leading-6 text-amber-950">
          {isSlovak
            ? "Zdroj identifikovaný znamená, že máme uložené oficiálne podklady. Neznamená to ešte, že konkrétny modul je overený alebo že môžeme verejne tvrdiť úplný súlad so ŠVP."
            : "Source identified means official materials are recorded. It does not mean a module is verified yet or that public full-alignment claims are safe."}
        </p>
      </section>

      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold text-slate-950">
          {isSlovak ? "Identifikované oficiálne zdroje" : "Identified official sources"}
        </h2>
        <div className="mt-4 grid gap-3">
          {Object.values(SK_MATH_OFFICIAL_SOURCES).map((source) => (
            <article key={source.id} className="rounded-md border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <a
                  className="text-sm font-semibold text-sky-800 underline-offset-4 hover:underline"
                  href={source.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  {source.title}
                </a>
                <span className="inline-flex w-fit rounded-md bg-white px-2 py-1 text-xs font-bold uppercase text-slate-600 shadow-sm">
                  {sourceTypeLabels[locale][source.sourceType]}
                </span>
              </div>
              <p className="mt-1 text-xs font-semibold text-slate-500">{source.publisher}</p>
              {source.retrievedNote ? (
                <p className="mt-2 text-xs leading-5 text-slate-500">{source.retrievedNote}</p>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold text-slate-950">
          {isSlovak ? "Oficiálny rámec 1. cyklu" : "Official Cycle 1 outline"}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {isSlovak
            ? "Tieto sekcie zachytávajú hlavné komponenty z oficiálneho PDF. Produktové moduly ešte nie sú manuálne namapované."
            : "These sections capture the main components from the official PDF. Product modules are not manually mapped yet."}
        </p>
        <div className="mt-4 grid gap-3">
          {SK_MATH_OFFICIAL_CYCLE_1_OUTLINE.map((section) => (
            <article key={section.id} className="rounded-md border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-950">{section.title}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase text-slate-500">{section.sourceId}</p>
                </div>
                <span className="inline-flex w-fit rounded-md bg-white px-2 py-1 text-xs font-bold uppercase text-slate-600 shadow-sm">
                  {mappingStatusLabels[locale][section.mappingStatus]}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{section.pageRangeNote}</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{section.summaryNote}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold text-slate-950">
          {isSlovak ? "Návrh mapovania modulov" : "Candidate module mapping"}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {isSlovak
            ? "Toto je iba návrh mapovania. Neznamená overenie súladu so ŠVP."
            : "This is candidate mapping only. It does not mean official curriculum alignment is verified."}
        </p>
        <div className="mt-4 grid gap-4">
          {SK_MATH_OFFICIAL_CYCLE_1_OUTLINE.map((section) => {
            const mappings = SK_MATH_MODULE_OFFICIAL_MAPPINGS.filter(
              (mapping) => mapping.officialOutlineSectionId === section.id
            );

            return (
              <section key={section.id} className="rounded-md border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-base font-bold text-slate-950">{section.title}</h3>
                  <span className="text-xs font-bold uppercase text-slate-500">
                    {mappings.length} {isSlovak ? "modulov" : "modules"}
                  </span>
                </div>
                <div className="mt-3 divide-y divide-slate-200 rounded-md border border-slate-200 bg-white">
                  {mappings.map((mapping) => (
                    <article key={mapping.moduleId} className="p-3">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-slate-950">{getModuleTitle(mapping.moduleId)}</h4>
                          <p className="mt-1 text-sm leading-6 text-slate-600">{mapping.rationale}</p>
                        </div>
                        <span className="inline-flex w-fit rounded-md bg-sky-50 px-2 py-1 text-xs font-bold uppercase text-sky-800">
                          {candidateMappingStatusLabels[locale][mapping.status]}
                        </span>
                      </div>
                      <p className="mt-2 text-xs leading-5 text-slate-500">{mapping.reviewerNote}</p>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold text-slate-950">
          {isSlovak ? "Dôkazy z manuálneho overenia" : "Manual review evidence"}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {isSlovak
            ? "Dôkazy zatiaľ nie sú doplnené. Táto časť len pripravuje miesto na manuálne overenie."
            : "Evidence is not added yet. This section only prepares a place for manual verification."}
        </p>
        <div className="mt-4 grid gap-3">
          {SK_MATH_REVIEW_EVIDENCE.map((evidence) => (
            <article key={evidence.id} className="rounded-md border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-950">{getModuleTitle(evidence.moduleId)}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase text-slate-500">
                    {evidence.officialOutlineSectionId}
                  </p>
                </div>
                <span className="inline-flex w-fit rounded-md bg-white px-2 py-1 text-xs font-bold uppercase text-slate-600 shadow-sm">
                  {reviewStatusLabels[locale][evidence.reviewStatus]}
                </span>
              </div>
              <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="font-bold text-slate-800">{isSlovak ? "Kontrolór" : "Reviewer"}</dt>
                  <dd className="mt-1 text-slate-600">
                    {evidence.reviewedBy || (isSlovak ? "nepriradené" : "not assigned")}
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-slate-800">{isSlovak ? "Dátum kontroly" : "Reviewed at"}</dt>
                  <dd className="mt-1 text-slate-600">
                    {evidence.reviewedAt ?? (isSlovak ? "neskontrolované" : "not reviewed")}
                  </dd>
                </div>
              </dl>
              <p className="mt-3 text-sm leading-6 text-slate-700">{evidence.reviewNotes}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-950">
              {isSlovak ? "Manuálna overovacia matica" : "Manual verification matrix"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {isSlovak
                ? "Riadky sú zoskupené podľa rizika verejného tvrdenia. Slúžia ako checklist pred zmenou stavu modulu."
                : "Rows are grouped by public claim risk. They act as a checklist before changing module status."}
            </p>
          </div>
          <Link
            className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            href="/parent/dashboard"
          >
            {isSlovak ? "Späť na prehľad" : "Back to dashboard"}
          </Link>
        </div>

        <div className="mt-5 grid gap-5">
          {riskOrder.map((risk) => {
            const rows = SK_MATH_CYCLE_1_VERIFICATION_MATRIX.filter((row) => row.publicClaimRisk === risk);

            if (rows.length === 0) {
              return null;
            }

            return (
              <section key={risk} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg font-bold text-slate-950">{riskLabels[locale][risk]}</h3>
                  <span className="text-xs font-bold uppercase text-slate-500">
                    {rows.length} {isSlovak ? "riadkov" : "rows"}
                  </span>
                </div>

                <div className="mt-4 grid gap-3">
                  {rows.map((row) => (
                    <article key={row.moduleId} className="rounded-md border border-slate-200 bg-white p-4">
                      <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                          <h4 className="text-base font-bold text-slate-950">{getModuleTitle(row.moduleId)}</h4>
                          <p className="mt-1 text-xs font-semibold uppercase text-slate-500">
                            {areaLabels[locale][row.areaId]} · {row.moduleId}
                          </p>
                        </div>
                        <span className="inline-flex w-fit rounded-md bg-sky-50 px-3 py-1 text-xs font-bold uppercase text-sky-800">
                          {verificationStatusLabels[locale][row.currentStatus]}
                        </span>
                      </div>

                      <div className="mt-3 grid gap-3 text-sm leading-6 text-slate-600 lg:grid-cols-2">
                        <div>
                          <p className="font-bold text-slate-800">
                            {isSlovak ? "Čo treba manuálne skontrolovať" : "Manual checks needed"}
                          </p>
                          <ul className="mt-1 list-disc space-y-1 pl-5">
                            {row.needsManualCheck.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">
                            {isSlovak ? "Ďalší krok" : "Next action"}
                          </p>
                          <p className="mt-1">{row.nextAction}</p>
                          <p className="mt-3 text-xs font-semibold uppercase text-slate-500">
                            {isSlovak ? "Zdroje" : "Sources"}: {row.sourceRefs.join(", ")}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </section>
  );
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
    </article>
  );
}
