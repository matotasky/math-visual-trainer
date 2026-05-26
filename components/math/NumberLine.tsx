export function NumberLine({ start, end }: { start: number; end: number }) {
  const max = Math.max(10, start, end);

  return (
    <div className="w-full rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-end justify-between gap-1">
        {Array.from({ length: max + 1 }).map((_, index) => (
          <div key={index} className="flex min-w-0 flex-1 flex-col items-center gap-2">
            <span className={index === start || index === end ? "h-7 w-7 rounded-full bg-sky-500" : "h-3 w-3 rounded-full bg-slate-300"} />
            <span className="text-xs font-semibold text-slate-600">{index}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
