type ParentObservationTipsProps = {
  title: string;
  intro: string;
  tips: Array<{
    label: string;
    description: string;
  }>;
  note: string;
};

export function ParentObservationTips({ title, intro, tips, note }: ParentObservationTipsProps) {
  return (
    <section className="mt-6 rounded-2xl border border-teal-200 bg-teal-50 p-5 shadow-sm md:p-6">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-black text-slate-950">{title}</h2>
        <p className="mt-3 text-base font-semibold leading-7 text-slate-700">{intro}</p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {tips.map((tip) => (
          <article key={tip.label} className="rounded-xl border border-teal-100 bg-white p-4 shadow-sm">
            <h3 className="text-base font-black text-teal-950">{tip.label}</h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{tip.description}</p>
          </article>
        ))}
      </div>

      <p className="mt-5 rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold leading-6 text-slate-700">
        {note}
      </p>
    </section>
  );
}
