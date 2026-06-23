import Link from "next/link";
import { QuantityNumberSensePreview } from "@/components/curriculum/QuantityNumberSensePreview";
import { SK_MATH_LESSON_BLUEPRINTS } from "@/data/curriculum/sk-math";
import { getQuantityAndNumberSensePreviewGuard } from "@/lib/curriculum/preview-guards";
import type { CurriculumLessonBlueprintStep, CurriculumLessonBlueprintStepType } from "@/types";

const moduleId = "quantity_and_number_sense";

const stepTypeLabels: Record<CurriculumLessonBlueprintStepType, string> = {
  visual_intro: "Pozri sa",
  guided_practice: "Skús spolu so mnou",
  independent_practice: "Skús sám/sama",
  reflection: "Povedz vlastnými slovami",
  remediation_link: "Pomocná poznámka"
};

const friendlyExplanations: Record<string, string> = {
  qns_visual_intro_quantity: "Číslo nám môže povedať, koľko vecí je v skupine.",
  qns_guided_compare: "Keď porovnávame, hľadáme, kde je viac, menej alebo rovnako.",
  qns_number_line_position: "Na číselnej osi vidíme, čo je pred číslom a čo je za ním.",
  qns_reflection_language: "Keď číslo vysvetlíš vlastnými slovami, lepšie mu rozumieš.",
  qns_visual_arithmetic_remediation:
    "Ak je niečo ťažké, môže pomôcť viac obrázkov, bodiek a pokojné vizuálne skúšanie."
};

const localizedStepTitles: Record<string, string> = {
  qns_visual_intro_quantity: "Číslo ako množstvo",
  qns_guided_compare: "Porovnaj dve skupiny",
  qns_number_line_position: "Číslo na číselnej osi",
  qns_reflection_language: "Vysvetli číslo",
  qns_visual_arithmetic_remediation: "Vizuálna pomoc"
};

export default function QuantityAndNumberSensePreviewPage() {
  const previewGuard = getQuantityAndNumberSensePreviewGuard();
  const lessonBlueprint = SK_MATH_LESSON_BLUEPRINTS.find((blueprint) => blueprint.moduleId === moduleId);

  if (!lessonBlueprint || !previewGuard.canRenderPreview) {
    return (
      <section className="py-8">
        <div className="mx-auto max-w-3xl rounded-lg border border-amber-200 bg-amber-50 p-5">
          <h1 className="text-2xl font-bold text-slate-950">Ukážka nie je dostupná</h1>
          <p className="mt-2 text-sm leading-6 text-amber-950">
            Táto preview lekcia sa momentálne nedá zobraziť.
          </p>
          <BackLink />
        </div>
      </section>
    );
  }

  return (
    <section className="py-6">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl border border-sky-200 bg-sky-50 p-5 shadow-sm md:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <span className="inline-flex w-fit rounded-full bg-white px-3 py-1 text-xs font-bold uppercase text-sky-800 shadow-sm">
                Preview lekcia
              </span>
              <h1 className="mt-4 text-3xl font-black text-slate-950 md:text-5xl">
                Množstvo a porozumenie číslam
              </h1>
              <p className="mt-4 max-w-2xl text-lg font-semibold leading-8 text-slate-700">
                Učíme sa rozumieť tomu, čo číslo znamená.
              </p>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-sm font-bold uppercase text-slate-500">Bez skóre</p>
              <p className="mt-1 text-sm leading-6 text-slate-700">Nebudeš hodnotený/á.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <InfoPill text="Táto lekcia je zatiaľ ukážka." />
            <InfoPill text="Môžeš si ju pozrieť, ale výsledky sa neukladajú." />
            <InfoPill text="Nebudeš hodnotený/á." />
          </div>

          <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-950">
            {previewGuard.warning}
          </p>
        </div>

        <QuantityNumberSensePreview />

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase text-emerald-700">Čo si vyskúšaš</p>
              <h2 className="mt-1 text-2xl font-black text-slate-950">Malé kroky bez časového tlaku</h2>
            </div>
            <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase text-slate-700">
              {lessonBlueprint.steps.length} krokov
            </span>
          </div>

          <div className="mt-5 grid gap-4">
            {lessonBlueprint.steps.map((step, index) => (
              <LessonStepCard key={step.id} index={index + 1} step={step} />
            ))}
          </div>
        </section>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <BackLink />
          <p className="text-sm leading-6 text-slate-500">
            Toto je iba náhľad lekcie. Nezapisuje pokrok a nie je súčasťou diagnostiky.
          </p>
        </div>
      </div>
    </section>
  );
}

function LessonStepCard({ index, step }: { index: number; step: CurriculumLessonBlueprintStep }) {
  const isSupportStep = step.stepType === "remediation_link";

  return (
    <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 md:p-5">
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px] md:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex size-9 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-white">
              {index}
            </span>
            <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold uppercase text-slate-600 shadow-sm">
              {stepTypeLabels[step.stepType]}
            </span>
          </div>
          <h3 className="mt-3 text-xl font-black text-slate-950">{localizedStepTitles[step.id] ?? step.title}</h3>
          <p className="mt-2 text-base leading-7 text-slate-700">{friendlyExplanations[step.id] ?? step.intent}</p>
          {step.childFacingPromptDraft ? (
            <p className="mt-3 rounded-lg border border-sky-100 bg-white p-4 text-lg font-bold leading-7 text-sky-950">
              {step.childFacingPromptDraft}
            </p>
          ) : null}
          {isSupportStep ? (
            <p className="mt-3 rounded-lg border border-emerald-100 bg-emerald-50 p-4 text-sm font-semibold leading-6 text-emerald-950">
              Toto je len pomocná poznámka. Nikam ťa automaticky neposielame.
            </p>
          ) : null}
        </div>
        <StepVisual stepId={step.id} />
      </div>
    </article>
  );
}

function StepVisual({ stepId }: { stepId: string }) {
  if (stepId === "qns_guided_compare") {
    return (
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="grid grid-cols-2 gap-4">
          <DotGroup count={4} />
          <DotGroup count={6} />
        </div>
        <p className="mt-3 text-center text-sm font-bold text-slate-700">Kde je viac?</p>
      </div>
    );
  }

  if (stepId === "qns_number_line_position") {
    return (
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between border-b-4 border-slate-300 pb-2">
          {[0, 1, 2, 3, 4, 5].map((number) => (
            <span
              key={number}
              className={`inline-flex size-8 items-center justify-center rounded-full text-sm font-black ${
                number === 3 ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-700"
              }`}
            >
              {number}
            </span>
          ))}
        </div>
        <p className="mt-3 text-center text-sm font-bold text-slate-700">Čo je pred 3 a za 3?</p>
      </div>
    );
  }

  if (stepId === "qns_reflection_language") {
    return (
      <div className="rounded-xl bg-white p-4 text-center shadow-sm">
        <p className="text-5xl font-black text-slate-950">4</p>
        <p className="mt-2 text-sm font-bold text-slate-700">Štyri veci. Štvrté miesto. Viac ako tri.</p>
      </div>
    );
  }

  if (stepId === "qns_visual_arithmetic_remediation") {
    return (
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <DotGroup count={5} />
        <p className="mt-3 text-center text-sm font-bold text-emerald-800">Pomôžu bodky a obrázky.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <DotGroup count={5} />
      <p className="mt-3 text-center text-sm font-bold text-slate-700">Koľko ich vidíš?</p>
    </div>
  );
}

function DotGroup({ count }: { count: number }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {Array.from({ length: count }, (_, index) => (
        <span key={index} className="size-7 rounded-full bg-emerald-500 shadow-sm" />
      ))}
    </div>
  );
}

function InfoPill({ text }: { text: string }) {
  return <p className="rounded-xl bg-white p-3 text-sm font-bold leading-6 text-slate-700 shadow-sm">{text}</p>;
}

function BackLink() {
  return (
    <Link
      className="inline-flex min-h-11 w-fit items-center justify-center rounded-md bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800"
      href="/child/curriculum"
    >
      Späť na školské učivo
    </Link>
  );
}
