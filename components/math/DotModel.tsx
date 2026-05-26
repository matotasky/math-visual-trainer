export function DotModel({ count }: { count: number }) {
  return (
    <div className="grid grid-cols-5 gap-3 rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200">
      {Array.from({ length: Math.max(count, 1) }).map((_, index) => (
        <span key={index} className="h-10 w-10 rounded-full bg-sky-500 shadow-sm" />
      ))}
    </div>
  );
}
