import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/child", label: "Dieťa" },
  { href: "/parent", label: "Rodič" },
  { href: "/child/curriculum", label: "Ukážková cesta" }
] as const;

export function MvpNavigation() {
  return (
    <nav className="mb-6 rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link className="text-base font-black text-slate-950" href="/">
          Math Visual Trainer
        </Link>
        <div className="flex flex-wrap gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              className="inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-900"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
