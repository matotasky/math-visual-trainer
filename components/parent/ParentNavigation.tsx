"use client";

import { BarChart3, Home, LineChart, ListChecks, Settings, TriangleAlert, UsersRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type ParentNavigationLabels = {
  childArea: string;
  dashboard: string;
  children: string;
  results: string;
  mistakes: string;
  progress: string;
  settings: string;
};

type ParentNavigationProps = {
  labels: ParentNavigationLabels;
};

const parentLinks = [
  { href: "/parent/dashboard", key: "dashboard", icon: BarChart3 },
  { href: "/parent/children", key: "children", icon: UsersRound },
  { href: "/parent/results", key: "results", icon: ListChecks },
  { href: "/parent/mistakes", key: "mistakes", icon: TriangleAlert },
  { href: "/parent/progress", key: "progress", icon: LineChart },
  { href: "/parent/settings", key: "settings", icon: Settings }
] as const;

export function ParentNavigation({ labels }: ParentNavigationProps) {
  const pathname = usePathname();
  const isPinPage = pathname === "/parent/pin";

  return (
    <nav className="mb-6 flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <Link
        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-sky-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-800"
        href="/child"
      >
        <Home aria-hidden="true" size={18} />
        {labels.childArea}
      </Link>

      {!isPinPage ? (
        <div className="flex flex-wrap gap-2">
          {parentLinks.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                className={
                  active
                    ? "inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-slate-950 px-3 py-2 text-sm font-semibold text-white"
                    : "inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                }
                href={item.href}
              >
                <Icon aria-hidden="true" size={16} />
                {labels[item.key]}
              </Link>
            );
          })}
        </div>
      ) : null}
    </nav>
  );
}
