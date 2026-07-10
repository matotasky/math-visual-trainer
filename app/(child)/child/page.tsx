import Link from "next/link";
import { MarketingCard } from "@/components/ui/MarketingCard";
import { MvpCallout } from "@/components/ui/MvpCallout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getRequestLocale } from "@/lib/i18n/server";

const copy = {
  en: {
    title: "Hi, let us practice math",
    subtitle: "Choose a path and work at your own pace.",
    primaryTitle: "Preview path: Number foundations",
    primaryDescription: "Start with quantity, continue with the number line and first calculations.",
    primaryCta: "Continue the preview path",
    cards: [
      ["Visual Arithmetic", "Pictures, groups, and the number line.", "Ready in preview"],
      ["School Curriculum", "Topic overview by learning cycles.", "Open"],
      ["Calm Practice", "No timers, understanding first.", "Open"]
    ],
    localOnly: "Preview progress is stored only in this browser."
  },
  sk: {
    title: "Ahoj, poďme trénovať matematiku",
    subtitle: "Vyber si cestu a pracuj vlastným tempom.",
    primaryTitle: "Ukážková cesta: Základy čísel",
    primaryDescription: "Začni množstvom, pokračuj číselnou osou a prvým počítaním.",
    primaryCta: "Pokračovať v ukážkovej ceste",
    cards: [
      ["Vizuálna aritmetika", "Obrázky, skupiny a číselná os.", "Pripravené v ukážke"],
      ["Školské učivo", "Prehľad tém podľa cyklov.", "Otvoriť"],
      ["Pokojný tréning", "Bez stopiek, najprv porozumenie.", "Otvoriť"]
    ],
    localOnly: "Ukážkový progres sa ukladá iba v tomto prehliadači."
  }
} as const;

export default async function ChildHomePage() {
  const locale = await getRequestLocale();
  const labels = copy[locale];

  return (
    <section className="space-y-8 py-6">
      <SectionHeader title={labels.title} description={labels.subtitle} eyebrow="Dieťa" />

      <section className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-6 shadow-sm sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase text-emerald-700">MVP ukážka</p>
            <h2 className="mt-2 text-3xl font-black text-slate-950">{labels.primaryTitle}</h2>
            <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-slate-700">
              {labels.primaryDescription}
            </p>
            <Link
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800"
              href="/child/curriculum"
            >
              {labels.primaryCta}
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-2 rounded-3xl bg-white p-4 shadow-sm">
            {Array.from({ length: 16 }, (_, index) => (
              <span
                aria-hidden="true"
                className={index < 10 ? "aspect-square rounded-xl bg-sky-500" : "aspect-square rounded-xl bg-emerald-100"}
                key={index}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        {labels.cards.map(([title, description, badge]) => (
          <MarketingCard eyebrow={badge} key={title} title={title}>
            <p>{description}</p>
            <Link
              className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-black text-slate-800 transition hover:border-sky-300 hover:bg-sky-50"
              href="/child/curriculum"
            >
              {badge}
            </Link>
          </MarketingCard>
        ))}
      </div>

      <MvpCallout tone="emerald">{labels.localOnly}</MvpCallout>
    </section>
  );
}
