import Link from "next/link";
import { getLearningPathway } from "@/data/pathways";
import { getRequestLocale } from "@/lib/i18n/server";

const pathway = getLearningPathway("arithmetic_fluency");

export default async function FluencyPage() {
  const locale = await getRequestLocale();
  const isSlovak = locale === "sk";

  return (
    <section className="py-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase text-sky-700">
          {isSlovak ? "Cesta učenia" : "Learning pathway"}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">
          {isSlovak ? "Počtová plynulosť" : pathway.title}
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-700">
          {isSlovak
            ? "Táto cesta je pre deti, ktoré už rozumejú základom a potrebujú počítať istejšie, presnejšie a postupne rýchlejšie. Rýchlosť je dôležitá až po stabilnej presnosti."
            : "This path is for children who understand the concepts and need steadier, more accurate, and gradually faster arithmetic. Speed comes after stable accuracy."}
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Link
          className="rounded-lg border border-sky-200 bg-white p-5 shadow-sm transition hover:border-sky-400"
          href="/child/practice"
        >
          <h2 className="text-xl font-bold text-slate-950">{isSlovak ? "Precvičovanie" : "Practice"}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {isSlovak ? "Budovať presnosť a stabilitu." : "Build accuracy and stability."}
          </p>
        </Link>

        <Link
          className="rounded-lg border border-sky-200 bg-white p-5 shadow-sm transition hover:border-sky-400"
          href="/child/test"
        >
          <h2 className="text-xl font-bold text-slate-950">{isSlovak ? "Test" : "Test"}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {isSlovak ? "Overiť zvládnutie bez pomôcok." : "Check mastery without hints."}
          </p>
        </Link>

        <Link
          className="rounded-lg border border-emerald-300 bg-emerald-50 p-5 shadow-sm transition hover:border-emerald-500"
          href="/child/challenge"
        >
          <h2 className="text-xl font-bold text-slate-950">{isSlovak ? "Výzva" : "Challenge"}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {isSlovak ? "Krátke rýchle kolo po zvládnutí základov." : "A short speed round after the basics are stable."}
          </p>
        </Link>
      </div>
    </section>
  );
}
