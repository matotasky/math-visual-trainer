import Link from "next/link";
import type { ReactNode } from "react";
import { ParentSectionHeader } from "@/components/parent/ParentSectionHeader";
import {
  SK_MATH_ASSESSMENT_BLUEPRINTS,
  SK_MATH_BLUEPRINT_READINESS_GATES,
  SK_MATH_BLUEPRINT_REVIEW_EVIDENCE,
  SK_MATH_CHILD_FACING_RELEASE_PLANS,
  SK_MATH_CURRICULUM_MODULES,
  SK_MATH_INTERNAL_PREVIEWS,
  SK_MATH_INTERNAL_PREVIEW_REVIEW_RESOLUTIONS,
  SK_MATH_INTERNAL_PREVIEW_SAFETY_CHECKS,
  SK_MATH_LESSON_BLUEPRINTS,
  SK_MATH_MODULE_OFFICIAL_MAPPINGS,
  SK_MATH_MODULE_VERIFICATION_DECISIONS,
  SK_MATH_OFFICIAL_CYCLE_1_OUTLINE,
  SK_MATH_REVIEW_CHECKLIST,
  SK_MATH_REVIEW_EVIDENCE
} from "@/data/curriculum/sk-math";
import { getQuantityAndNumberSensePreviewGuard } from "@/lib/curriculum/preview-guards";
import { getRequestLocale } from "@/lib/i18n/server";
import type {
  CurriculumAssessmentBlueprintStatus,
  CurriculumAssessmentItemIntent,
  CurriculumBlueprintReadinessGate,
  CurriculumBlueprintReadinessGateStatus,
  CurriculumBlueprintReviewEvidence,
  CurriculumBlueprintReviewStatus,
  CurriculumChildFacingReleasePlan,
  CurriculumChildFacingReleasePlanStatus,
  CurriculumInternalPreviewReviewResolutionStatus,
  CurriculumInternalPreviewSafetyCheckStatus,
  CurriculumInternalPreviewItemType,
  CurriculumInternalPreviewStatus,
  CurriculumLessonBlueprintStatus,
  CurriculumLessonBlueprintStepType,
  CurriculumModuleOfficialMappingStatus,
  CurriculumModuleVerificationDecision,
  CurriculumModuleVerificationDecisionStatus,
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

const moduleDecisionStatusLabels: Record<Locale, Record<CurriculumModuleVerificationDecisionStatus, string>> = {
  sk: {
    not_started: "Nezačaté",
    needs_lesson_content: "Treba obsah lekcií",
    ready_for_review: "Pripravené na review",
    approved_for_partial_verification: "Schválené na čiastočné overenie",
    approved_for_verification: "Schválené na overenie",
    rejected: "Zamietnuté"
  },
  en: {
    not_started: "Not started",
    needs_lesson_content: "Needs lesson content",
    ready_for_review: "Ready for review",
    approved_for_partial_verification: "Approved for partial verification",
    approved_for_verification: "Approved for verification",
    rejected: "Rejected"
  }
};

const moduleDecisionTypeLabels: Record<Locale, Record<CurriculumModuleVerificationDecision["decisionType"], string>> =
  {
    sk: {
      module_scope: "Rozsah modulu",
      lesson_content: "Obsah lekcií",
      assessment_content: "Obsah hodnotenia",
      full_module: "Celý modul"
    },
    en: {
      module_scope: "Module scope",
      lesson_content: "Lesson content",
      assessment_content: "Assessment content",
      full_module: "Full module"
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

const lessonBlueprintStatusLabels: Record<Locale, Record<CurriculumLessonBlueprintStatus, string>> = {
  sk: {
    draft: "Draft",
    needs_review: "Treba review",
    reviewed: "Skontrolované",
    ready_for_child_preview: "Pripravené na child preview"
  },
  en: {
    draft: "Draft",
    needs_review: "Needs review",
    reviewed: "Reviewed",
    ready_for_child_preview: "Ready for child preview"
  }
};

const lessonStepTypeLabels: Record<Locale, Record<CurriculumLessonBlueprintStepType, string>> = {
  sk: {
    visual_intro: "Vizuálny úvod",
    guided_practice: "Vedené precvičenie",
    independent_practice: "Samostatné precvičenie",
    reflection: "Reflexia",
    remediation_link: "Remediačný odkaz"
  },
  en: {
    visual_intro: "Visual intro",
    guided_practice: "Guided practice",
    independent_practice: "Independent practice",
    reflection: "Reflection",
    remediation_link: "Remediation link"
  }
};

const assessmentBlueprintStatusLabels: Record<Locale, Record<CurriculumAssessmentBlueprintStatus, string>> = {
  sk: {
    draft: "Draft",
    needs_review: "Treba review",
    reviewed: "Skontrolované",
    ready_for_child_preview: "Pripravené na child preview"
  },
  en: {
    draft: "Draft",
    needs_review: "Needs review",
    reviewed: "Reviewed",
    ready_for_child_preview: "Ready for child preview"
  }
};

const assessmentIntentLabels: Record<Locale, Record<CurriculumAssessmentItemIntent, string>> = {
  sk: {
    concept_check: "Kontrola konceptu",
    representation_check: "Kontrola reprezentácie",
    comparison_check: "Kontrola porovnania",
    ordering_check: "Kontrola usporiadania",
    misconception_probe: "Sonda omylu"
  },
  en: {
    concept_check: "Concept check",
    representation_check: "Representation check",
    comparison_check: "Comparison check",
    ordering_check: "Ordering check",
    misconception_probe: "Misconception probe"
  }
};

const blueprintReviewStatusLabels: Record<Locale, Record<CurriculumBlueprintReviewStatus, string>> = {
  sk: {
    not_started: "Nezačaté",
    evidence_needed: "Treba dôkazy",
    evidence_recorded: "Dôkazy doplnené",
    ready_for_decision: "Pripravené na rozhodnutie"
  },
  en: {
    not_started: "Not started",
    evidence_needed: "Evidence needed",
    evidence_recorded: "Evidence recorded",
    ready_for_decision: "Ready for decision"
  }
};

const blueprintReadinessGateStatusLabels: Record<Locale, Record<CurriculumBlueprintReadinessGateStatus, string>> = {
  sk: {
    blocked: "Blokované",
    needs_review: "Treba review",
    ready_for_internal_preview: "Pripravené na interný preview",
    ready_for_child_preview: "Pripravené na child preview"
  },
  en: {
    blocked: "Blocked",
    needs_review: "Needs review",
    ready_for_internal_preview: "Ready for internal preview",
    ready_for_child_preview: "Ready for child preview"
  }
};

const internalPreviewStatusLabels: Record<Locale, Record<CurriculumInternalPreviewStatus, string>> = {
  sk: {
    internal_only: "Iba interne",
    blocked: "Blokované",
    ready_for_internal_review: "Pripravené na interný review"
  },
  en: {
    internal_only: "Internal only",
    blocked: "Blocked",
    ready_for_internal_review: "Ready for internal review"
  }
};

const internalPreviewItemTypeLabels: Record<Locale, Record<CurriculumInternalPreviewItemType, string>> = {
  sk: {
    lesson_step_preview: "Preview kroku lekcie",
    assessment_item_preview: "Preview hodnotiacej položky",
    safety_note: "Bezpečnostná poznámka"
  },
  en: {
    lesson_step_preview: "Lesson step preview",
    assessment_item_preview: "Assessment item preview",
    safety_note: "Safety note"
  }
};

const internalPreviewSafetyCheckStatusLabels: Record<
  Locale,
  Record<CurriculumInternalPreviewSafetyCheckStatus, string>
> = {
  sk: {
    pass: "Pass",
    warning: "Upozornenie",
    blocked: "Blokované"
  },
  en: {
    pass: "Pass",
    warning: "Warning",
    blocked: "Blocked"
  }
};

const internalPreviewReviewResolutionStatusLabels: Record<
  Locale,
  Record<CurriculumInternalPreviewReviewResolutionStatus, string>
> = {
  sk: {
    not_started: "Nezačaté",
    issues_recorded: "Problémy zaznamenané",
    ready_for_internal_review: "Pripravené na interný review",
    blocked_for_release: "Blokované pre release"
  },
  en: {
    not_started: "Not started",
    issues_recorded: "Issues recorded",
    ready_for_internal_review: "Ready for internal review",
    blocked_for_release: "Blocked for release"
  }
};

const childFacingReleasePlanStatusLabels: Record<Locale, Record<CurriculumChildFacingReleasePlanStatus, string>> = {
  sk: {
    not_started: "Nezačaté",
    draft_plan: "Draft plán",
    ready_for_shell: "Pripravené na shell",
    blocked: "Blokované"
  },
  en: {
    not_started: "Not started",
    draft_plan: "Draft plan",
    ready_for_shell: "Ready for shell",
    blocked: "Blocked"
  }
};

const releaseScopeLabels: Record<Locale, Record<CurriculumChildFacingReleasePlan["releaseScope"], string>> = {
  sk: {
    lesson_shell_only: "Iba shell lekcie",
    lesson_with_practice: "Lekcia s precvičovaním",
    lesson_with_assessment: "Lekcia s hodnotením"
  },
  en: {
    lesson_shell_only: "Lesson shell only",
    lesson_with_practice: "Lesson with practice",
    lesson_with_assessment: "Lesson with assessment"
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
  const verificationDecision = SK_MATH_MODULE_VERIFICATION_DECISIONS.find((decision) => decision.moduleId === moduleId);
  const reviewEvidence = SK_MATH_REVIEW_EVIDENCE.find((item) => item.moduleId === moduleId);
  const checklistItems = reviewEvidence
    ? SK_MATH_REVIEW_CHECKLIST.filter((item) => item.reviewEvidenceId === reviewEvidence.id)
    : [];
  const lessonBlueprint = SK_MATH_LESSON_BLUEPRINTS.find((blueprint) => blueprint.moduleId === moduleId);
  const assessmentBlueprint = SK_MATH_ASSESSMENT_BLUEPRINTS.find((blueprint) => blueprint.moduleId === moduleId);
  const lessonBlueprintReviewEvidence = lessonBlueprint
    ? SK_MATH_BLUEPRINT_REVIEW_EVIDENCE.find((evidence) => evidence.blueprintId === lessonBlueprint.id)
    : undefined;
  const lessonBlueprintGate = lessonBlueprint
    ? SK_MATH_BLUEPRINT_READINESS_GATES.find((gate) => gate.blueprintId === lessonBlueprint.id)
    : undefined;
  const assessmentBlueprintReviewEvidence = assessmentBlueprint
    ? SK_MATH_BLUEPRINT_REVIEW_EVIDENCE.find((evidence) => evidence.blueprintId === assessmentBlueprint.id)
    : undefined;
  const assessmentBlueprintGate = assessmentBlueprint
    ? SK_MATH_BLUEPRINT_READINESS_GATES.find((gate) => gate.blueprintId === assessmentBlueprint.id)
    : undefined;
  const internalPreview = SK_MATH_INTERNAL_PREVIEWS.find((preview) => preview.moduleId === moduleId);
  const internalPreviewSafetyChecks = internalPreview
    ? SK_MATH_INTERNAL_PREVIEW_SAFETY_CHECKS.filter((check) => check.previewId === internalPreview.id)
    : [];
  const internalPreviewReviewResolution = internalPreview
    ? SK_MATH_INTERNAL_PREVIEW_REVIEW_RESOLUTIONS.find((resolution) => resolution.previewId === internalPreview.id)
    : undefined;
  const childFacingReleasePlan = SK_MATH_CHILD_FACING_RELEASE_PLANS.find((plan) => plan.moduleId === moduleId);
  const previewGuard = getQuantityAndNumberSensePreviewGuard();

  if (
    !curriculumModule ||
    !mapping ||
    !outlineSection ||
    !verificationDecision ||
    !reviewEvidence ||
    !lessonBlueprint ||
    !assessmentBlueprint ||
    !lessonBlueprintReviewEvidence ||
    !lessonBlueprintGate ||
    !assessmentBlueprintReviewEvidence ||
    !assessmentBlueprintGate ||
    !internalPreview ||
    !internalPreviewReviewResolution ||
    !childFacingReleasePlan
  ) {
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

        <SectionCard title={isSlovak ? "Rozhodnutie k overeniu" : "Verification decision"}>
          <dl className="grid gap-4 text-sm md:grid-cols-2">
            <Field
              label={isSlovak ? "Stav rozhodnutia" : "Decision status"}
              value={moduleDecisionStatusLabels[locale][verificationDecision.decisionStatus]}
            />
            <Field
              label={isSlovak ? "Typ rozhodnutia" : "Decision type"}
              value={moduleDecisionTypeLabels[locale][verificationDecision.decisionType]}
            />
            <Field
              label={isSlovak ? "Súvisiace evidence ID" : "Related evidence IDs"}
              value={verificationDecision.relatedEvidenceIds.join(", ")}
            />
            <Field
              label={isSlovak ? "Súvisiace mapping moduly" : "Related mapping module IDs"}
              value={verificationDecision.relatedMappingModuleIds.join(", ")}
            />
            <Field
              label={isSlovak ? "Rozhodol" : "Decided by"}
              value={verificationDecision.decidedBy || (isSlovak ? "nepriradené" : "not assigned")}
            />
            <Field
              label={isSlovak ? "Dátum rozhodnutia" : "Decided at"}
              value={verificationDecision.decidedAt ?? (isSlovak ? "nerozhodnuté" : "not decided")}
            />
            <div className="md:col-span-2">
              <dt className="font-bold text-slate-800">
                {isSlovak ? "Potrebné pred verified" : "Required before verified"}
              </dt>
              <dd className="mt-2">
                <ul className="list-disc space-y-1 pl-5 leading-6 text-slate-600">
                  {verificationDecision.requiredBeforeVerified.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className="md:col-span-2">
              <dt className="font-bold text-slate-800">{isSlovak ? "Poznámky" : "Decision notes"}</dt>
              <dd className="mt-1 leading-6 text-slate-600">{verificationDecision.decisionNotes}</dd>
            </div>
          </dl>
        </SectionCard>

        <SectionCard title={isSlovak ? "Blueprint lekcie" : "Lesson blueprint"}>
          <dl className="grid gap-4 text-sm md:grid-cols-2">
            <Field label={isSlovak ? "Názov" : "Title"} value={lessonBlueprint.title} />
            <Field
              label={isSlovak ? "Stav" : "Status"}
              value={lessonBlueprintStatusLabels[locale][lessonBlueprint.status]}
            />
            <div className="md:col-span-2">
              <dt className="font-bold text-slate-800">{isSlovak ? "Cieľ učenia" : "Learning goal"}</dt>
              <dd className="mt-1 leading-6 text-slate-600">{lessonBlueprint.learningGoal}</dd>
            </div>
            <Field
              label={isSlovak ? "Predpoklady" : "Prerequisites"}
              value={lessonBlueprint.prerequisites.join(", ")}
            />
            <Field
              label={isSlovak ? "Súvisiace evidence ID" : "Source evidence IDs"}
              value={lessonBlueprint.sourceEvidenceIds.join(", ")}
            />
            <Field
              label={isSlovak ? "Súvisiace decision ID" : "Verification decision IDs"}
              value={lessonBlueprint.verificationDecisionIds.join(", ")}
            />
            <div className="md:col-span-2">
              <dt className="font-bold text-slate-800">{isSlovak ? "Poznámka k vydaniu" : "Public release note"}</dt>
              <dd className="mt-1 leading-6 text-slate-600">{lessonBlueprint.publicReleaseNote}</dd>
            </div>
          </dl>

          <div className="mt-5 grid gap-3">
            {lessonBlueprint.steps.map((step) => (
              <article key={step.id} className="rounded-md border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-950">{step.title}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase text-slate-500">{step.id}</p>
                  </div>
                  <span className="inline-flex w-fit rounded-md bg-white px-2 py-1 text-xs font-bold uppercase text-slate-600 shadow-sm">
                    {lessonStepTypeLabels[locale][step.stepType]}
                  </span>
                </div>
                <dl className="mt-3 grid gap-3 text-sm md:grid-cols-2">
                  <div>
                    <dt className="font-bold text-slate-800">{isSlovak ? "Zámer" : "Intent"}</dt>
                    <dd className="mt-1 leading-6 text-slate-600">{step.intent}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-slate-800">
                      {isSlovak ? "Draft promptu pre dieťa" : "Child prompt draft"}
                    </dt>
                    <dd className="mt-1 leading-6 text-slate-600">
                      {step.childFacingPromptDraft || (isSlovak ? "nedoplnené" : "not added")}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-bold text-slate-800">
                      {isSlovak ? "Poznámka pre rodiča/učiteľa" : "Parent or teacher note"}
                    </dt>
                    <dd className="mt-1 leading-6 text-slate-600">{step.teacherOrParentNote}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-slate-800">{isSlovak ? "Skill tagy" : "Skill tags"}</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {step.linkedSkillTags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex rounded-md bg-sky-50 px-2 py-1 text-xs font-bold uppercase text-sky-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </dd>
                  </div>
                  <div className="md:col-span-2">
                    <dt className="font-bold text-slate-800">{isSlovak ? "Poznámka k overeniu" : "Verification note"}</dt>
                    <dd className="mt-1 leading-6 text-slate-600">{step.verificationNote}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <BlueprintReviewEvidencePanel
              evidence={lessonBlueprintReviewEvidence}
              isSlovak={isSlovak}
              locale={locale}
            />
            <BlueprintReadinessGatePanel gate={lessonBlueprintGate} isSlovak={isSlovak} locale={locale} />
          </div>
        </SectionCard>

        <SectionCard title={isSlovak ? "Blueprint hodnotenia" : "Assessment blueprint"}>
          <dl className="grid gap-4 text-sm md:grid-cols-2">
            <Field label={isSlovak ? "Názov" : "Title"} value={assessmentBlueprint.title} />
            <Field
              label={isSlovak ? "Stav" : "Status"}
              value={assessmentBlueprintStatusLabels[locale][assessmentBlueprint.status]}
            />
            <div className="md:col-span-2">
              <dt className="font-bold text-slate-800">{isSlovak ? "Účel" : "Purpose"}</dt>
              <dd className="mt-1 leading-6 text-slate-600">{assessmentBlueprint.purpose}</dd>
            </div>
            <Field
              label={isSlovak ? "Súvisiace evidence ID" : "Source evidence IDs"}
              value={assessmentBlueprint.sourceEvidenceIds.join(", ")}
            />
            <Field
              label={isSlovak ? "Súvisiace decision ID" : "Verification decision IDs"}
              value={assessmentBlueprint.verificationDecisionIds.join(", ")}
            />
            <div className="md:col-span-2">
              <dt className="font-bold text-slate-800">{isSlovak ? "Poznámka k vydaniu" : "Public release note"}</dt>
              <dd className="mt-1 leading-6 text-slate-600">{assessmentBlueprint.publicReleaseNote}</dd>
            </div>
          </dl>

          <div className="mt-5 grid gap-3">
            {assessmentBlueprint.items.map((item) => (
              <article key={item.id} className="rounded-md border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-950">{item.promptDraft}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase text-slate-500">{item.id}</p>
                  </div>
                  <span className="inline-flex w-fit rounded-md bg-white px-2 py-1 text-xs font-bold uppercase text-slate-600 shadow-sm">
                    {assessmentIntentLabels[locale][item.intent]}
                  </span>
                </div>
                <dl className="mt-3 grid gap-3 text-sm md:grid-cols-2">
                  <div>
                    <dt className="font-bold text-slate-800">
                      {isSlovak ? "Očakávané porozumenie" : "Expected understanding"}
                    </dt>
                    <dd className="mt-1 leading-6 text-slate-600">{item.expectedUnderstanding}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-slate-800">{isSlovak ? "Časté chyby" : "Common mistakes"}</dt>
                    <dd className="mt-1 leading-6 text-slate-600">{item.commonMistakes.join(", ")}</dd>
                  </div>
                  <div className="md:col-span-2">
                    <dt className="font-bold text-slate-800">{isSlovak ? "Poznámka k overeniu" : "Verification note"}</dt>
                    <dd className="mt-1 leading-6 text-slate-600">{item.verificationNote}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <BlueprintReviewEvidencePanel
              evidence={assessmentBlueprintReviewEvidence}
              isSlovak={isSlovak}
              locale={locale}
            />
            <BlueprintReadinessGatePanel gate={assessmentBlueprintGate} isSlovak={isSlovak} locale={locale} />
          </div>
        </SectionCard>

        <SectionCard title={isSlovak ? "Interné preview" : "Internal preview"}>
          <dl className="grid gap-4 text-sm md:grid-cols-2">
            <Field label={isSlovak ? "Názov" : "Title"} value={internalPreview.title} />
            <Field
              label={isSlovak ? "Stav" : "Status"}
              value={internalPreviewStatusLabels[locale][internalPreview.status]}
            />
            <Field
              label={isSlovak ? "Zdrojový lesson blueprint" : "Source lesson blueprint"}
              value={internalPreview.sourceLessonBlueprintId}
            />
            <Field
              label={isSlovak ? "Zdrojový assessment blueprint" : "Source assessment blueprint"}
              value={internalPreview.sourceAssessmentBlueprintId}
            />
            <div className="md:col-span-2">
              <dt className="font-bold text-slate-800">{isSlovak ? "Release warning" : "Release warning"}</dt>
              <dd className="mt-1 leading-6 text-slate-600">{internalPreview.releaseWarning}</dd>
            </div>
          </dl>

          <div className="mt-5 grid gap-3">
            {internalPreview.items.map((item) => (
              <article key={item.id} className="rounded-md border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-950">{item.title}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase text-slate-500">
                      {item.sourceBlueprintId} · {item.sourceItemId}
                    </p>
                  </div>
                  <span className="inline-flex w-fit rounded-md bg-white px-2 py-1 text-xs font-bold uppercase text-slate-600 shadow-sm">
                    {internalPreviewItemTypeLabels[locale][item.itemType]}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-700">{item.previewText}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.safetyNote}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title={isSlovak ? "Bezpečnostné kontroly interného preview" : "Internal preview safety checks"}
        >
          <div className="grid gap-3">
            {internalPreviewSafetyChecks.map((check) => (
              <article key={check.id} className="rounded-md border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-950">{check.label}</h3>
                    <p className="mt-1 text-xs font-semibold uppercase text-slate-500">{check.id}</p>
                  </div>
                  <span className="inline-flex w-fit rounded-md bg-white px-2 py-1 text-xs font-bold uppercase text-slate-600 shadow-sm">
                    {internalPreviewSafetyCheckStatusLabels[locale][check.status]}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-700">{check.finding}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{check.requiredAction}</p>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title={isSlovak ? "Vyhodnotenie interného preview" : "Internal preview review resolution"}>
          <dl className="grid gap-4 text-sm md:grid-cols-2">
            <Field
              label={isSlovak ? "Stav" : "Status"}
              value={internalPreviewReviewResolutionStatusLabels[locale][internalPreviewReviewResolution.status]}
            />
            <Field
              label={isSlovak ? "Kontrolór" : "Reviewer"}
              value={internalPreviewReviewResolution.reviewedBy || (isSlovak ? "nepriradené" : "not assigned")}
            />
            <Field
              label={isSlovak ? "Dátum review" : "Reviewed at"}
              value={internalPreviewReviewResolution.reviewedAt ?? (isSlovak ? "neskontrolované" : "not reviewed")}
            />
            <div className="md:col-span-2">
              <dt className="font-bold text-slate-800">{isSlovak ? "Rozhodnutie reviewera" : "Reviewer decision"}</dt>
              <dd className="mt-1 leading-6 text-slate-600">
                {internalPreviewReviewResolution.reviewerDecision}
              </dd>
            </div>
          </dl>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <ListBlock
              title={isSlovak ? "Prijaté zistenia" : "Accepted findings"}
              items={internalPreviewReviewResolution.acceptedFindings}
            />
            <ListBlock
              title={isSlovak ? "Otvorené problémy" : "Open issues"}
              items={internalPreviewReviewResolution.openIssues}
            />
            <ListBlock
              title={isSlovak ? "Release blokátory" : "Release blockers"}
              items={internalPreviewReviewResolution.releaseBlockers}
            />
          </div>
        </SectionCard>

        <SectionCard title={isSlovak ? "Plán child-facing releasu" : "Child-facing release plan"}>
          <dl className="grid gap-4 text-sm md:grid-cols-2">
            <Field label={isSlovak ? "Plánovaná route" : "Planned route"} value={childFacingReleasePlan.plannedRoute} />
            <Field
              label={isSlovak ? "Stav" : "Status"}
              value={childFacingReleasePlanStatusLabels[locale][childFacingReleasePlan.status]}
            />
            <Field
              label={isSlovak ? "Rozsah releasu" : "Release scope"}
              value={releaseScopeLabels[locale][childFacingReleasePlan.releaseScope]}
            />
            <Field
              label={isSlovak ? "Musí zostať vypnuté" : "Must remain disabled"}
              value={childFacingReleasePlan.mustRemainDisabled ? "true" : "false"}
            />
            <div className="md:col-span-2">
              <dt className="font-bold text-slate-800">{isSlovak ? "Poznámka k releasu" : "Release notes"}</dt>
              <dd className="mt-1 leading-6 text-slate-600">{childFacingReleasePlan.releaseNotes}</dd>
            </div>
          </dl>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <ListBlock
              title={isSlovak ? "Potrebné pred zapnutím" : "Required before enable"}
              items={childFacingReleasePlan.requiredBeforeEnable}
            />
            <ListBlock title={isSlovak ? "Non-goals" : "Non-goals"} items={childFacingReleasePlan.nonGoals} />
          </div>
          <div className="mt-5 rounded-md border border-sky-200 bg-sky-50 p-4">
            <p className="text-sm font-bold text-sky-950">
              {isSlovak ? "Preview only — bez skórovania a bez Firestore zápisov" : "Preview only — no scoring, no Firestore writes"}
            </p>
            <p className="mt-2 text-sm leading-6 text-sky-950">
              {isSlovak
                ? "Interaktívny preview existuje iba lokálne v prehliadači. Nezapisuje pokrok, nevytvára pokusy a nemení diagnostiku."
                : "Interactive preview exists only locally in the browser. It does not persist progress, create attempts, or change diagnostics."}
            </p>
            <Link
              className="mt-3 inline-flex min-h-10 w-fit items-center justify-center rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              href="/child/curriculum/quantity-and-number-sense"
            >
              {isSlovak ? "Otvoriť detský preview" : "Open child preview"}
            </Link>
          </div>
        </SectionCard>

        <SectionCard title={isSlovak ? "Preview guard" : "Preview guard"}>
          <dl className="grid gap-4 text-sm md:grid-cols-2">
            <Field label="canRenderPreview" value={String(previewGuard.canRenderPreview)} />
            <Field label="canScore" value={String(previewGuard.canScore)} />
            <Field label="canWriteProgress" value={String(previewGuard.canWriteProgress)} />
            <Field label="canClaimVerified" value={String(previewGuard.canClaimVerified)} />
            <div className="md:col-span-2">
              <dt className="font-bold text-slate-800">{isSlovak ? "Upozornenie" : "Warning"}</dt>
              <dd className="mt-1 leading-6 text-slate-600">{previewGuard.warning}</dd>
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

function BlueprintReviewEvidencePanel({
  evidence,
  isSlovak,
  locale
}: {
  evidence: CurriculumBlueprintReviewEvidence;
  isSlovak: boolean;
  locale: Locale;
}) {
  return (
    <section className="rounded-md border border-slate-200 bg-slate-50 p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-950">
            {isSlovak ? "Review dôkazy blueprintu" : "Blueprint review evidence"}
          </h3>
          <p className="mt-1 text-xs font-semibold uppercase text-slate-500">{evidence.id}</p>
        </div>
        <span className="inline-flex w-fit rounded-md bg-white px-2 py-1 text-xs font-bold uppercase text-slate-600 shadow-sm">
          {blueprintReviewStatusLabels[locale][evidence.reviewStatus]}
        </span>
      </div>
      <dl className="mt-3 grid gap-3 text-sm">
        <Field
          label={isSlovak ? "Súvisiace evidence ID" : "Source evidence IDs"}
          value={evidence.sourceEvidenceIds.join(", ")}
        />
        <Field
          label={isSlovak ? "Kontrolór" : "Reviewer"}
          value={evidence.reviewedBy || (isSlovak ? "nepriradené" : "not assigned")}
        />
        <Field
          label={isSlovak ? "Dátum review" : "Reviewed at"}
          value={evidence.reviewedAt ?? (isSlovak ? "neskontrolované" : "not reviewed")}
        />
      </dl>
      <ListBlock title={isSlovak ? "Review focus" : "Review focus"} items={evidence.reviewFocus} />
      <ListBlock
        title={isSlovak ? "Zistenia" : "Findings"}
        emptyText={isSlovak ? "zatiaľ nedoplnené" : "not added yet"}
        items={evidence.findings}
      />
      <ListBlock title={isSlovak ? "Medzery" : "Gaps"} items={evidence.gaps} />
      <p className="mt-3 text-sm leading-6 text-slate-700">{evidence.reviewerNote}</p>
    </section>
  );
}

function BlueprintReadinessGatePanel({
  gate,
  isSlovak,
  locale
}: {
  gate: CurriculumBlueprintReadinessGate;
  isSlovak: boolean;
  locale: Locale;
}) {
  return (
    <section className="rounded-md border border-slate-200 bg-slate-50 p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-950">
            {isSlovak ? "Readiness gate blueprintu" : "Blueprint readiness gate"}
          </h3>
          <p className="mt-1 text-xs font-semibold uppercase text-slate-500">{gate.id}</p>
        </div>
        <span className="inline-flex w-fit rounded-md bg-rose-50 px-2 py-1 text-xs font-bold uppercase text-rose-800">
          {blueprintReadinessGateStatusLabels[locale][gate.gateStatus]}
        </span>
      </div>
      <ListBlock title={isSlovak ? "Blokujúce dôvody" : "Blocking reasons"} items={gate.blockingReasons} />
      <ListBlock title={isSlovak ? "Povinné akcie" : "Required actions"} items={gate.requiredActions} />
      <p className="mt-3 text-sm leading-6 text-slate-700">{gate.releaseNote}</p>
    </section>
  );
}

function ListBlock({ emptyText, items, title }: { emptyText?: string; items: string[]; title: string }) {
  return (
    <div className="mt-3 text-sm">
      <p className="font-bold text-slate-800">{title}</p>
      {items.length > 0 ? (
        <ul className="mt-1 list-disc space-y-1 pl-5 leading-6 text-slate-600">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-1 leading-6 text-slate-500">{emptyText ?? "not added"}</p>
      )}
    </div>
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
