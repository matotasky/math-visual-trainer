type ChildQuickStartProps = {
  title: string;
  steps: string[];
  note: string;
};

export function ChildQuickStart({ title, steps, note }: ChildQuickStartProps) {
  return (
    <section className="mt-5 rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm md:p-5">
      <h3 className="text-xl font-black text-slate-950">{title}</h3>

      <ol className="mt-4 grid gap-3 md:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-3 rounded-xl bg-emerald-50 p-3 text-sm font-bold leading-6 text-slate-700">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-black text-white">
              {index + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>

      <p className="mt-4 rounded-xl bg-sky-50 p-3 text-sm font-bold leading-6 text-sky-950">{note}</p>
    </section>
  );
}
