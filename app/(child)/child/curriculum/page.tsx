import Link from "next/link";
import { getLearningPathway } from "@/data/pathways";
import { getRequestLocale } from "@/lib/i18n/server";

const pathway = getLearningPathway("school_curriculum");

export default async function CurriculumPage() {
  const locale = await getRequestLocale();
  const isSlovak = locale === "sk";

  return (
    <section className="py-8">
      <div className="max-w-3xl rounded-lg border border-slate-200 bg-slate-50 p-6">
        <p className="text-sm font-semibold uppercase text-sky-700">
          {isSlovak ? "Čoskoro" : "Coming soon"}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">
          {isSlovak ? "Školské učivo" : pathway.title}
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-700">
          {isSlovak
            ? "Táto cesta bude neskôr usporiadaná podľa slovenských ročníkov a vzdelávacích cyklov. Rodičom pomôže nájsť učivo podľa školy, ale dieťa nebude zamknuté len podľa ročníka."
            : "This pathway will later be organized around Slovak primary school grades and learning cycles. It will help parents navigate school topics without locking children rigidly to one grade."}
        </p>
        <Link
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          href="/child"
        >
          {isSlovak ? "Späť na detský prehľad" : "Back to child home"}
        </Link>
      </div>
    </section>
  );
}
