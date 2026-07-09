import { Suspense } from "react";
import Link from "next/link";
import { ChildQuickStart } from "@/components/curriculum/ChildQuickStart";
import { ParentLocalProgressNote } from "@/components/curriculum/ParentLocalProgressNote";
import { ParentObservationTips } from "@/components/curriculum/ParentObservationTips";
import { ParentPreviewGuide } from "@/components/curriculum/ParentPreviewGuide";
import { PreviewLearningPathProgress } from "@/components/curriculum/PreviewLearningPathProgress";
import { PreviewReturnNotice } from "@/components/curriculum/PreviewReturnNotice";
import {
  SK_MATH_CURRICULUM_CYCLES,
  getCurriculumModulesByCycle
} from "@/data/curriculum/sk-math";
import {
  curriculumAreaOrder,
  curriculumChildSectionCopy,
  curriculumCycleSectionCopy,
  curriculumModulePreviewCopy,
  curriculumPageHeroCopy,
  curriculumParentSectionCopy,
  curriculumPreviewPathCopy
} from "@/data/curriculum/sk-math/page-copy";
import {
  childQuickStartCopy,
  learningPathPreviewLessonsCopy,
  parentLocalProgressNoteCopy,
  parentObservationTipsCopy,
  parentPreviewGuideCopy,
  previewSkillsByLessonCopy
} from "@/data/curriculum/sk-math/preview-copy";
import {
  getCurriculumPreviewLesson,
  getCurriculumRemediationLabel,
  getCurriculumStatusLabel,
  getLocalizedCurriculumArea,
  getLocalizedCurriculumModuleText,
  getLocalizedCycleDescription,
  getLocalizedCycleLabel,
  getLocalizedGradeLabel
} from "@/lib/curriculum/curriculum-page-copy";
import { getPreviewLearningPathLabels } from "@/lib/curriculum/preview-learning-path-labels";
import { getRequestLocale } from "@/lib/i18n/server";
import type { PreviewLessonId } from "@/lib/curriculum/local-preview-progress";

export default async function CurriculumPage() {
  const locale = await getRequestLocale();
  const heroCopy = curriculumPageHeroCopy[locale];
  const previewPathCopy = curriculumPreviewPathCopy[locale];
  const childSectionCopy = curriculumChildSectionCopy[locale];
  const parentSectionCopy = curriculumParentSectionCopy[locale];
  const cycleSectionCopy = curriculumCycleSectionCopy[locale];
  const modulePreviewCopy = curriculumModulePreviewCopy[locale];
  const cycleOneModules = getCurriculumModulesByCycle("cycle_1");
  const localizedLearningPathPreviewLessons = learningPathPreviewLessonsCopy.map((lesson) => ({
    id: lesson.id,
    step: lesson.step,
    title: lesson.title[locale],
    description: lesson.description[locale],
    href: lesson.href,
    buttonLabel: lesson.buttonLabel[locale]
  }));
  const localizedPreviewSkillsByLesson = Object.fromEntries(
    learningPathPreviewLessonsCopy.map((lesson) => [lesson.id, previewSkillsByLessonCopy[lesson.id][locale]])
  ) as Record<PreviewLessonId, string[]>;

  return (
    <section className="py-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase text-sky-700">{heroCopy.eyebrow}</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">{heroCopy.title}</h1>
        <p className="mt-4 text-base leading-7 text-slate-700">{heroCopy.description}</p>
        <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-950">
          {heroCopy.scaffoldWarning}
        </p>
        <p className="mt-3 rounded-lg border border-sky-200 bg-sky-50 p-4 text-sm font-semibold leading-6 text-sky-950">
          {heroCopy.sourcePreparation}
        </p>
        <p className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold leading-6 text-emerald-950">
          {heroCopy.localOnlyHelper}
        </p>
      </div>

      <section className="mt-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase text-emerald-700">{previewPathCopy.eyebrow}</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">{previewPathCopy.title}</h2>
            <p className="mt-2 max-w-2xl text-base font-semibold leading-7 text-slate-700">
              {previewPathCopy.subtitle}
            </p>
          </div>
          <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-bold leading-6 text-emerald-950">
            {previewPathCopy.localOnlyNote}
          </p>
        </div>

        <div className="mt-6 max-w-3xl">
          <p className="text-sm font-black uppercase text-emerald-700">{childSectionCopy.eyebrow}</p>
          <p className="mt-2 text-base font-semibold leading-7 text-slate-700">
            {childSectionCopy.subtitle}
          </p>
        </div>

        <ChildQuickStart {...childQuickStartCopy[locale]} />

        <Suspense fallback={null}>
          <PreviewReturnNotice />
        </Suspense>

        <PreviewLearningPathProgress
          labels={getPreviewLearningPathLabels(locale)}
          lessons={localizedLearningPathPreviewLessons}
          skillsByLesson={localizedPreviewSkillsByLesson}
        />

        <p className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold leading-6 text-slate-700 shadow-sm">
          {previewPathCopy.sequenceNote}
        </p>
      </section>

      <section className="mt-8">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase text-indigo-700">{parentSectionCopy.eyebrow}</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">{parentSectionCopy.title}</h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">
            {parentSectionCopy.subtitle}
          </p>
        </div>

        <ParentPreviewGuide {...parentPreviewGuideCopy[locale]} />
        <ParentLocalProgressNote {...parentLocalProgressNoteCopy[locale]} />
        <ParentObservationTips {...parentObservationTipsCopy[locale]} />
      </section>

      <section className="mt-8">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-black text-slate-950">{cycleSectionCopy.title}</h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">
            {cycleSectionCopy.description}
          </p>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {SK_MATH_CURRICULUM_CYCLES.map((cycle) => {
            const label = getLocalizedCycleLabel(cycle.id, locale);

            return (
              <section key={cycle.id} className="rounded-lg border border-sky-200 bg-white p-5 shadow-sm">
                <h3 className="text-xl font-bold text-slate-950">{label.title}</h3>
                <p className="mt-1 text-sm font-semibold text-sky-700">{label.grades}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {getLocalizedCycleDescription(cycle.id, locale)}
                </p>
              </section>
            );
          })}
        </div>
      </section>

      <section className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">{modulePreviewCopy.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{modulePreviewCopy.description}</p>
          </div>
          <span className="inline-flex rounded-md bg-white px-3 py-1 text-xs font-bold uppercase text-slate-700 shadow-sm">
            {modulePreviewCopy.draftLabel}
          </span>
        </div>

        <div className="mt-6 grid gap-5">
          {curriculumAreaOrder.map((areaId) => {
            const area = getLocalizedCurriculumArea(areaId, locale);
            const modules = cycleOneModules.filter((module) => module.areaId === areaId);

            return (
              <section key={areaId} className="rounded-lg border border-slate-200 bg-white p-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-950">{area.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{area.description}</p>
                </div>

                <div className="mt-4 grid gap-3">
                  {modules.map((module) => {
                    const text = getLocalizedCurriculumModuleText(module, locale);
                    const previewLesson = getCurriculumPreviewLesson(module.id);

                    return (
                      <article key={module.id} className="rounded-md border border-slate-200 bg-slate-50 p-4">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h4 className="text-lg font-bold text-slate-950">{text.title}</h4>
                            <p className="mt-1 text-sm leading-6 text-slate-600">{text.description}</p>
                          </div>
                          <div className="flex w-fit flex-wrap gap-2">
                            <span className="inline-flex rounded-md bg-sky-50 px-3 py-1 text-xs font-bold uppercase text-sky-800">
                              {getCurriculumStatusLabel(module.status, locale)}
                            </span>
                            {previewLesson ? (
                              <span className="inline-flex rounded-md bg-emerald-50 px-3 py-1 text-xs font-bold uppercase text-emerald-800">
                                {modulePreviewCopy.previewLessonBadge}
                              </span>
                            ) : null}
                          </div>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                          <span className="rounded-md bg-white px-2 py-1 shadow-sm">
                            {module.recommendedGrades.map((grade) => getLocalizedGradeLabel(grade, locale)).join(", ")}
                          </span>
                          {module.visualArithmeticRemediation.map((pathwayId) => (
                            <span key={pathwayId} className="rounded-md bg-emerald-50 px-2 py-1 text-emerald-800">
                              {getCurriculumRemediationLabel(pathwayId, locale)}
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
                              {modulePreviewCopy.openLessonLabel}
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
        {modulePreviewCopy.backLinkLabel}
      </Link>
    </section>
  );
}
