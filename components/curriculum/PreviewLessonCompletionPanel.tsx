import Link from "next/link";

type PreviewCompletionNextStep = {
  href: string;
  label: string;
  description: string;
};

type PreviewLessonCompletionPanelProps = {
  finalMessage?: string;
  nextStep?: PreviewCompletionNextStep;
};

export function PreviewLessonCompletionPanel({
  finalMessage = "Dokončil/a si prvú ukážkovú cestu.",
  nextStep
}: PreviewLessonCompletionPanelProps) {
  return (
    <div className="mt-4 grid gap-3">
      <div className="rounded-xl border border-sky-200 bg-sky-50 p-4">
        <p className="text-base font-bold leading-7 text-sky-950">
          Hotovo. Lekcia je označená ako dokončená iba v tomto prehliadači.
        </p>
        <p className="mt-2 text-sm font-semibold leading-6 text-sky-900">
          Nie je to hodnotenie. Nezapisuje sa do účtu.
        </p>
      </div>

      <Link
        className="inline-flex min-h-14 w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-lg font-black text-slate-900 transition hover:border-sky-300 hover:bg-sky-50 sm:w-fit"
        href="/child/curriculum?previewCompleted=1"
      >
        Späť na ukážkovú cestu
      </Link>

      {nextStep ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <p className="text-sm font-black uppercase text-emerald-800">Ďalší krok</p>
          <p className="mt-2 text-base font-bold leading-7 text-emerald-950">{nextStep.description}</p>
          <Link
            className="mt-4 inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-lg font-black text-white transition hover:bg-slate-800 sm:w-fit"
            href={nextStep.href}
          >
            {nextStep.label}
          </Link>
        </div>
      ) : (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-base font-bold leading-7 text-emerald-950">
          {finalMessage}
        </p>
      )}
    </div>
  );
}
