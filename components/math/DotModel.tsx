function DotGroup({ className, count }: { className: string; count: number }) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {Array.from({ length: Math.max(count, 1) }).map((_, index) => (
        <span key={index} className={`h-9 w-9 rounded-full shadow-sm sm:h-10 sm:w-10 ${className}`} />
      ))}
    </div>
  );
}

export function DotModel({ count, secondaryCount = 0 }: { count: number; secondaryCount?: number }) {
  if (secondaryCount > 0) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4 rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <DotGroup className="bg-sky-500" count={count} />
        <span className="text-3xl font-black text-slate-500">+</span>
        <DotGroup className="bg-emerald-500" count={secondaryCount} />
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <DotGroup className="bg-sky-500" count={count} />
    </div>
  );
}
