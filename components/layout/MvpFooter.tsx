import Link from "next/link";

const links = [
  { href: "/", label: "Domov" },
  { href: "/child", label: "Dieťa" },
  { href: "/parent", label: "Rodič" },
  { href: "/about/local-data", label: "Lokálne údaje" }
] as const;

export function MvpFooter() {
  return (
    <footer className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-600">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-black text-slate-950">Math Visual Trainer</p>
          <p className="mt-1 font-semibold">Vizuálna matematická ukážka bez tlaku na čas.</p>
        </div>
        <nav aria-label="Pätičková navigácia" className="flex flex-wrap gap-x-4 gap-y-2">
          {links.map((link) => (
            <Link className="font-bold text-slate-700 underline-offset-4 hover:text-sky-800 hover:underline" href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <p className="mt-5 border-t border-slate-100 pt-4 text-xs font-semibold leading-5 text-slate-500">
        Ukážka nie je plne overená oficiálna mapa celého učiva.
      </p>
    </footer>
  );
}
