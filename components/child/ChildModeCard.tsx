import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type ChildModeCardProps = {
  href: string;
  label: string;
  description: string;
  status?: string;
  tone?: "default" | "recommended" | "locked";
  icon: LucideIcon;
};

export function ChildModeCard({ href, label, description, status, tone = "default", icon: Icon }: ChildModeCardProps) {
  return (
    <Link
      className={
        tone === "recommended"
          ? "block rounded-lg border border-emerald-300 bg-emerald-50 p-5 shadow-sm transition hover:border-emerald-500"
          : tone === "locked"
            ? "block rounded-lg border border-slate-200 bg-slate-50 p-5 opacity-75 shadow-sm transition hover:border-slate-300"
            : "block rounded-lg border border-sky-200 bg-white p-5 shadow-sm transition hover:border-sky-400"
      }
      href={href}
    >
      <Icon aria-hidden="true" className="text-sky-700" size={28} />
      <h2 className="mt-4 text-xl font-bold text-slate-950">{label}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      {status ? (
        <p className="mt-4 inline-flex rounded-md bg-white px-3 py-1 text-xs font-bold uppercase text-slate-700 shadow-sm">
          {status}
        </p>
      ) : null}
    </Link>
  );
}
