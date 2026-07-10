import type { ReactNode } from "react";

type MarketingCardProps = {
  title: string;
  children: ReactNode;
  eyebrow?: string;
};

export function MarketingCard({ children, eyebrow, title }: MarketingCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {eyebrow ? <p className="text-xs font-black uppercase tracking-wide text-sky-700">{eyebrow}</p> : null}
      <h3 className="mt-2 text-xl font-black text-slate-950">{title}</h3>
      <div className="mt-3 text-sm font-semibold leading-6 text-slate-600">{children}</div>
    </article>
  );
}
