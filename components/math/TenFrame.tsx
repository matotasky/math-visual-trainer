export function TenFrame({ filled }: { filled: number }) {
  return (
    <div className="grid grid-cols-5 gap-2 rounded-lg bg-white p-4 shadow-sm ring-1 ring-slate-200">
      {Array.from({ length: 10 }).map((_, index) => (
        <span
          key={index}
          className={index < filled ? "h-12 w-12 rounded-md bg-emerald-500" : "h-12 w-12 rounded-md border-2 border-slate-200 bg-white"}
        />
      ))}
    </div>
  );
}
