import Link from "next/link";
import { MarketingCard } from "@/components/ui/MarketingCard";
import { MvpCallout } from "@/components/ui/MvpCallout";
import { SectionHeader } from "@/components/ui/SectionHeader";

const readyItems = [
  "5 ukážkových lekcií pre základy čísel a počítania",
  "Lokálny progres v prehliadači",
  "Rodičovské odporúčania k domácemu precvičovaniu",
  "Príprava na širšie učivo a diagnostiku"
] as const;

const firstRunSteps = [
  {
    title: "Otvor detskú ukážku",
    description: "Nie je potrebné prihlásenie."
  },
  {
    title: "Voliteľne zadaj prezývku",
    description: "Profil zostane iba v tomto prehliadači."
  },
  {
    title: "Dokonči prvú lekciu",
    description: "Aplikácia si lokálne zapamätá, kde pokračovať."
  }
] as const;

export function LandingPageContent() {
  return (
    <section className="space-y-10 py-6">
      <section className="overflow-hidden rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-6 shadow-sm sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase text-sky-700">Math Visual Trainer</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
              Matematika najprv vizuálne, potom rýchlo.
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-slate-700">
              Pomáhame deťom porozumieť číslam cez obrázky, číselnú os a pokojné kroky bez tlaku na
              čas.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800"
                href="/child/curriculum"
              >
                Vyskúšať detskú ukážku
              </Link>
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800 transition hover:border-sky-300 hover:bg-sky-50"
                href="/parent"
              >
                Pozrieť rodičovský prehľad
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white bg-white/80 p-5 shadow-sm">
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 20 }, (_, index) => (
                <span
                  aria-hidden="true"
                  className={
                    index < 13
                      ? "aspect-square rounded-full bg-emerald-500"
                      : "aspect-square rounded-full bg-sky-100"
                  }
                  key={index}
                />
              ))}
            </div>
            <div className="mt-5 rounded-2xl bg-slate-950 p-4 text-white">
              <p className="text-sm font-bold text-sky-100">Pokojný postup</p>
              <p className="mt-2 text-2xl font-black">vidím → rozumiem → trénujem</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase text-emerald-700">Prvý štart</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">Začni za 2 minúty</h2>
            <p className="mt-3 text-base font-semibold leading-7 text-slate-700">
              Rýchla ukážka funguje bez účtu a bez platených služieb.
            </p>
            <Link
              className="mt-5 inline-flex min-h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800"
              href="/child"
            >
              Začať teraz
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {firstRunSteps.map((step, index) => (
              <article className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4" key={step.title}>
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-emerald-600 text-sm font-black text-white">
                  {index + 1}
                </span>
                <h3 className="mt-3 text-lg font-black text-slate-950">{step.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <MarketingCard title="Vizuálne porozumenie">
          Dieťa najprv vidí množstvo, skupiny, číselnú os a desiatky s jednotkami.
        </MarketingCard>
        <MarketingCard title="Bez časového tlaku">
          Rýchlosť má zmysel až vtedy, keď dieťa rozumie postupu.
        </MarketingCard>
        <MarketingCard title="Pre rodiča zrozumiteľne">
          Rodič vidí, čo dieťa práve trénuje a ako ho pokojne sprevádzať.
        </MarketingCard>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
        <SectionHeader
          eyebrow="MVP preview"
          title="Čo je dnes pripravené"
          description="Viditeľná ukážka jadra produktu bez platených služieb a bez tlaku na rýchlosť."
        />
        <MvpCallout tone="emerald">
          <ul className="grid gap-3">
            {readyItems.map((item) => (
              <li className="flex gap-3" key={item}>
                <span aria-hidden="true" className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </MvpCallout>
      </section>

      <MvpCallout tone="amber">
        Ukážka zatiaľ nepredstavuje oficiálne overenú mapu celého učiva.
      </MvpCallout>
    </section>
  );
}
