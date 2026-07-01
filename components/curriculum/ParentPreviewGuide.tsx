type ParentPreviewGuideProps = {
  title: string;
  intro: string;
  bullets: string[];
  note: string;
};

export function ParentPreviewGuide({ title, intro, bullets, note }: ParentPreviewGuideProps) {
  return (
    <section className="mt-8 rounded-2xl border border-indigo-200 bg-indigo-50 p-5 shadow-sm md:p-6">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-black text-slate-950">{title}</h2>
        <p className="mt-3 text-base font-semibold leading-7 text-slate-700">{intro}</p>
      </div>

      <ul className="mt-5 grid gap-3 md:grid-cols-2">
        {bullets.map((bullet) => (
          <li key={bullet} className="rounded-xl border border-indigo-100 bg-white p-4 text-sm font-bold leading-6 text-slate-700 shadow-sm">
            {bullet}
          </li>
        ))}
      </ul>

      <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-950">
        {note}
      </p>
    </section>
  );
}
