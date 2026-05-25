export function ChartPlaceholder({ label }: { label: string }) {
  return (
    <div className="grid min-h-64 place-items-center rounded-lg border border-dashed border-slate-300 bg-white text-sm font-medium text-slate-500">
      {label}
    </div>
  );
}
