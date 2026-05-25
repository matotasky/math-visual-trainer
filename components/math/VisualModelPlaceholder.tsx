import type { VisualModel } from "@/types";

export function VisualModelPlaceholder({ model }: { model: VisualModel }) {
  return (
    <div className="grid aspect-square w-full max-w-xs place-items-center rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-600">
      {model}
    </div>
  );
}
