import type { ReactNode } from "react";

type MvpCalloutProps = {
  title?: string;
  children: ReactNode;
  tone?: "sky" | "emerald" | "amber" | "slate";
};

const toneClasses = {
  amber: "border-amber-200 bg-amber-50 text-amber-950",
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-950",
  sky: "border-sky-200 bg-sky-50 text-sky-950",
  slate: "border-slate-200 bg-slate-50 text-slate-800"
} as const;

export function MvpCallout({ children, title, tone = "sky" }: MvpCalloutProps) {
  return (
    <section className={`rounded-2xl border p-5 ${toneClasses[tone]}`}>
      {title ? <h2 className="text-lg font-black">{title}</h2> : null}
      <div className={title ? "mt-2 text-sm font-semibold leading-6" : "text-sm font-semibold leading-6"}>
        {children}
      </div>
    </section>
  );
}
