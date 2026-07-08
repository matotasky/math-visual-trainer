type ParentLocalProgressNoteProps = {
  title: string;
  description: string;
  items: string[];
  note: string;
};

export function ParentLocalProgressNote({
  description,
  items,
  note,
  title
}: ParentLocalProgressNoteProps) {
  return (
    <section className="mt-5 rounded-2xl border border-cyan-200 bg-cyan-50 p-5 shadow-sm">
      <h3 className="text-xl font-black text-slate-950">{title}</h3>
      <p className="mt-2 text-sm font-semibold leading-6 text-cyan-950">{description}</p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <li
            className="rounded-xl border border-white bg-white px-3 py-2 text-sm font-bold leading-6 text-slate-700 shadow-sm"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-4 rounded-xl border border-cyan-100 bg-white p-3 text-sm font-bold leading-6 text-cyan-950">
        {note}
      </p>
    </section>
  );
}
