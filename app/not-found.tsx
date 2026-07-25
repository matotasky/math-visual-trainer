import Link from "next/link";
import { MvpFooter } from "@/components/layout/MvpFooter";
import { RouteShell } from "@/components/layout/RouteShell";
import { MvpNavigation } from "@/components/navigation/MvpNavigation";

export default function NotFoundPage() {
  return (
    <RouteShell variant="public">
      <MvpNavigation />
      <section className="mx-auto max-w-2xl py-16 text-center">
        <p className="text-sm font-black uppercase text-sky-700">404</p>
        <h1 className="mt-3 text-4xl font-black text-slate-950">Túto stránku sme nenašli</h1>
        <p className="mt-4 text-base font-semibold leading-7 text-slate-700">
          Odkaz môže byť neaktuálny alebo stránka ešte nie je súčasťou ukážky.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
          <Link className="inline-flex min-h-12 items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white" href="/">
            Späť na domov
          </Link>
          <Link className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800" href="/child">
            Otvoriť detskú ukážku
          </Link>
          <Link className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800" href="/child/curriculum">
            Otvoriť ukážkovú cestu
          </Link>
        </div>
      </section>
      <MvpFooter />
    </RouteShell>
  );
}
