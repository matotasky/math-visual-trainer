import Link from "next/link";
import { getLearningPathway } from "@/data/pathways";
import { getRequestLocale } from "@/lib/i18n/server";

const pathway = getLearningPathway("visual_arithmetic");

export default async function VisualArithmeticPage() {
  const locale = await getRequestLocale();
  const isSlovak = locale === "sk";

  return (
    <section className="py-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase text-sky-700">
          {isSlovak ? "Cesta učenia" : "Learning pathway"}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">
          {isSlovak ? "Vizuálna aritmetika" : pathway.title}
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-700">
          {isSlovak
            ? "Táto cesta buduje porozumenie číslam cez bodky, desaťové rámiky, zoskupovanie a premýšľanie cez 10. Je to základ pre deti, ktoré potrebujú najprv vidieť, čo sa pri počítaní deje."
            : "This path builds number understanding through dots, ten-frames, grouping, and make-10 thinking. It is the foundation for children who need to see what arithmetic means before practicing speed."}
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          className="rounded-lg border border-emerald-300 bg-emerald-50 p-5 shadow-sm transition hover:border-emerald-500"
          href="/child/diagnostic"
        >
          <h2 className="text-xl font-bold text-slate-950">{isSlovak ? "Začať diagnostikou" : "Start diagnostic"}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {isSlovak
              ? "Aplikácia zistí, odkiaľ má dieťa začať."
              : "The app checks where the child should begin."}
          </p>
        </Link>

        <Link
          className="rounded-lg border border-sky-200 bg-white p-5 shadow-sm transition hover:border-sky-400"
          href="/child/practice"
        >
          <h2 className="text-xl font-bold text-slate-950">{isSlovak ? "Precvičovať" : "Practice"}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {isSlovak
              ? "Pokračovať v aktuálnych vizuálnych úlohách."
              : "Continue with the current visual exercises."}
          </p>
        </Link>
      </div>
    </section>
  );
}
