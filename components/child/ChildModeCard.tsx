import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type ChildModeCardProps = {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

export function ChildModeCard({ href, label, description, icon: Icon }: ChildModeCardProps) {
  return (
    <Link className="block rounded-lg border border-sky-200 bg-white p-5 shadow-sm transition hover:border-sky-400" href={href}>
      <Icon aria-hidden="true" className="text-sky-700" size={28} />
      <h2 className="mt-4 text-xl font-bold text-slate-950">{label}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </Link>
  );
}
