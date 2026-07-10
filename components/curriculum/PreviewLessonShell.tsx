import type { ReactNode } from "react";
import Link from "next/link";

type PreviewLessonShellProps = {
  backHref?: string;
  backLabel?: string;
  children: ReactNode;
  conceptBadges?: string[];
  footer?: ReactNode;
  lessonNumber?: string;
  lessonSubtitle: string;
  lessonTitle: string;
  localOnlyNote?: string;
  parentTip?: string;
  totalLessonsInPath?: number;
};

const defaultLocalOnlyNote = "Táto lekcia je ukážka. Progres sa ukladá iba v tomto prehliadači.";
const noPressureNote = "Nejde o rýchlosť. Najprv sa pozeraj, rozmýšľaj a vysvetli si postup.";

export function PreviewLessonShell({
  backHref = "/child/curriculum",
  backLabel = "Späť na ukážkovú cestu",
  children,
  conceptBadges = [],
  footer,
  lessonNumber,
  lessonSubtitle,
  lessonTitle,
  localOnlyNote = defaultLocalOnlyNote,
  parentTip,
  totalLessonsInPath
}: PreviewLessonShellProps) {
  const stepLabel = lessonNumber && totalLessonsInPath ? `Lekcia ${lessonNumber} z ${totalLessonsInPath}` : "Preview lekcia";

  return (
    <section className="py-6">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-5 shadow-sm md:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <Link
                className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-black text-slate-700 shadow-sm transition hover:border-sky-300 hover:bg-sky-50"
                href={backHref}
              >
                {backLabel}
              </Link>
              <p className="mt-5 text-sm font-black uppercase text-sky-700">{stepLabel}</p>
              <h1 className="mt-3 text-3xl font-black leading-tight text-slate-950 md:text-5xl">{lessonTitle}</h1>
              <p className="mt-4 max-w-2xl text-lg font-semibold leading-8 text-slate-700">{lessonSubtitle}</p>
            </div>

            <aside className="rounded-2xl border border-white bg-white/90 p-4 shadow-sm lg:max-w-xs">
              <p className="text-sm font-black uppercase text-slate-500">Pokojná ukážka</p>
              <p className="mt-2 text-sm font-bold leading-6 text-slate-700">{localOnlyNote}</p>
            </aside>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            <InfoPill text="Táto lekcia je ukážka." />
            <InfoPill text="Ukladá sa iba v tomto prehliadači." />
            <InfoPill text="Nie je to hodnotenie." />
          </div>

          <p className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold leading-6 text-amber-950">
            {noPressureNote}
          </p>

          {conceptBadges.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {conceptBadges.map((badge) => (
                <span
                  className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-black uppercase text-emerald-900"
                  key={badge}
                >
                  {badge}
                </span>
              ))}
            </div>
          ) : null}

          {parentTip ? (
            <p className="mt-5 rounded-2xl border border-indigo-200 bg-indigo-50 p-4 text-sm font-bold leading-6 text-indigo-950">
              Tip pre rodiča: {parentTip}
            </p>
          ) : null}
        </div>

        {children}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            className="inline-flex min-h-11 w-fit items-center justify-center rounded-xl bg-slate-950 px-4 py-2 text-sm font-black text-white transition hover:bg-slate-800"
            href={backHref}
          >
            {backLabel}
          </Link>
          {footer ?? (
            <p className="text-sm font-semibold leading-6 text-slate-500">
              Nezapisuje sa do účtu a nie je súčasťou diagnostiky.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function InfoPill({ text }: { text: string }) {
  return <p className="rounded-2xl bg-white p-3 text-sm font-black leading-6 text-slate-700 shadow-sm">{text}</p>;
}
