export function TenFrame({ added = 0, filled }: { added?: number; filled: number }) {
  const firstCount = Math.max(0, Math.min(10, filled));
  const secondCount = Math.max(0, Math.min(10 - firstCount, added));

  return (
    <div className="grid grid-cols-5 gap-2 rounded-lg bg-white p-4 shadow-sm ring-1 ring-slate-200">
      {Array.from({ length: 10 }).map((_, index) => (
        <span
          key={index}
          className={
            index < firstCount
              ? "h-12 w-12 rounded-md bg-sky-500"
              : index < firstCount + secondCount
                ? "h-12 w-12 rounded-md bg-emerald-500"
                : "h-12 w-12 rounded-md border-2 border-slate-200 bg-white"
          }
        />
      ))}
    </div>
  );
}
