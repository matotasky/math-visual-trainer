type NumberLineVisualProps = {
  end?: number;
  highlighted?: number;
  label?: string;
  markers?: number[];
  start?: number;
};

export function NumberLineVisual({
  end = 10,
  highlighted,
  label = "Číselná os",
  markers = [],
  start = 0
}: NumberLineVisualProps) {
  const values = Array.from({ length: end - start + 1 }, (_, index) => start + index);

  return (
    <div aria-label={label} className="rounded-xl bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between border-b-4 border-slate-300 pb-3">
        {values.map((number) => {
          const active = number === highlighted || markers.includes(number);

          return (
            <span
              className={`inline-flex size-8 items-center justify-center rounded-full text-sm font-black ${
                active ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-700"
              }`}
              key={number}
            >
              {number}
            </span>
          );
        })}
      </div>
    </div>
  );
}
