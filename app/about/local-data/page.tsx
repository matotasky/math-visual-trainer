import type { Metadata } from "next";
import Link from "next/link";
import { MvpFooter } from "@/components/layout/MvpFooter";
import { RouteShell } from "@/components/layout/RouteShell";
import { MvpNavigation } from "@/components/navigation/MvpNavigation";
import { MvpCallout } from "@/components/ui/MvpCallout";

export const metadata: Metadata = {
  title: "Lokálne údaje | Math Visual Trainer",
  description: "Ako Math Visual Trainer používa lokálny profil a lokálny progres v prehliadači."
};

const sections = [
  {
    title: "Čo sa ukladá lokálne",
    items: ["voliteľná prezývka dieťaťa", "orientačný ročník", "zoznam dokončených ukážkových lekcií"]
  },
  {
    title: "Čo sa z lokálnej ukážky neposiela",
    items: [
      "lokálny profil sa neposiela do Firestore",
      "lokálny progres nie je účet",
      "lokálny progres nie je diagnostika ani mastery",
      "lokálny progres nevytvára attempts, sessions, aggregates ani dashboard údaje"
    ]
  },
  {
    title: "Kde údaje zostávajú",
    items: [
      "zostávajú iba v aktuálnom prehliadači a zariadení",
      "medzi zariadeniami sa nesynchronizujú",
      "vymazanie údajov prehliadača ich môže odstrániť"
    ]
  },
  {
    title: "Ako ich vymazať",
    items: [
      "lokálny profil možno vymazať na /child alebo /parent",
      "lokálny progres možno vymazať na /child/curriculum",
      "nejde o vymazanie rodičovského účtu alebo Firestore údajov"
    ]
  },
  {
    title: "Dôležité hranice",
    items: [
      "preview nie je plne overená oficiálna mapa ŠVP",
      "lokálny progres neslúži ako známka, diagnostika alebo odborné hodnotenie"
    ]
  }
] as const;

export default function LocalDataPage() {
  return (
    <RouteShell variant="public">
      <MvpNavigation />
      <section className="max-w-4xl py-4">
        <p className="text-sm font-black uppercase text-sky-700">Súkromie v ukážke</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950">Lokálne údaje a súkromie</h1>
        <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-slate-700">
          Ukážková verzia Math Visual Trainer používa pre časť funkcií iba úložisko vo vašom prehliadači.
        </p>

        <div className="mt-8 grid gap-4">
          {sections.map((section) => (
            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" key={section.title}>
              <h2 className="text-xl font-black text-slate-950">{section.title}</h2>
              <ul className="mt-3 grid list-disc gap-2 pl-5 text-sm font-semibold leading-6 text-slate-700">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <MvpCallout tone="sky">
          Lokálne údaje sú pomôcka pre ukážku. Nezastupujú rodičovský účet ani údaje uložené vo Firestore.
        </MvpCallout>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link className="inline-flex min-h-12 items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800" href="/child">
            Prejsť na detskú ukážku
          </Link>
          <Link className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800 transition hover:border-sky-300 hover:bg-sky-50" href="/child/curriculum">
            Otvoriť ukážkovú cestu
          </Link>
          <Link className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800 transition hover:border-sky-300 hover:bg-sky-50" href="/">
            Späť na domov
          </Link>
        </div>
      </section>
      <MvpFooter />
    </RouteShell>
  );
}
