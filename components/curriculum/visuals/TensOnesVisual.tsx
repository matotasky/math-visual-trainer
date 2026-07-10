type TensOnesVisualProps = {
  ones: number;
  tens: number;
  label?: string;
};

export function TensOnesVisual({ label = "Desiatky a jednotky", ones, tens }: TensOnesVisualProps) {
  return (
    <div aria-label={label} className="rounded-xl bg-white p-5 shadow-sm">
      <div className="flex items-end justify-center gap-3">
        <div className="grid gap-2">
          <p className="text-center text-xs font-black uppercase text-slate-500">desiatky</p>
          <div className="flex gap-2">
            {Array.from({ length: tens }, (_, index) => (
              <span
                aria-hidden="true"
                className="inline-flex h-24 w-8 items-center justify-center rounded-lg bg-emerald-500 text-sm font-black text-white shadow-sm"
                key={`ten-${index}`}
              >
                10
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-2">
          <p className="text-center text-xs font-black uppercase text-slate-500">jednotky</p>
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: ones }, (_, index) => (
              <span aria-hidden="true" className="size-7 rounded-full bg-sky-500 shadow-sm" key={`one-${index}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
