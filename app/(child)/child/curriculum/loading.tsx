export default function CurriculumLoading() {
  return (
    <section aria-busy="true" className="animate-pulse py-8">
      <p className="text-sm font-black uppercase text-sky-700">Načítavam ukážkovú cestu…</p>
      <div className="mt-3 h-10 max-w-md rounded-lg bg-slate-200" />
      <div className="mt-4 h-20 max-w-3xl rounded-xl bg-slate-100" />
      <div className="mt-8 h-40 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="h-5 w-40 rounded bg-emerald-100" />
        <div className="mt-4 h-10 w-3/4 rounded bg-slate-100" />
        <div className="mt-4 h-12 w-48 rounded-xl bg-slate-200" />
      </div>
      <div className="mt-6 grid gap-3">
        {[1, 2, 3, 4, 5].map((item) => (
          <div className="h-20 rounded-xl border border-slate-200 bg-white" key={item} />
        ))}
      </div>
    </section>
  );
}
