import Link from "next/link";
import { MarketingCard } from "@/components/ui/MarketingCard";
import { MvpCallout } from "@/components/ui/MvpCallout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getRequestLocale } from "@/lib/i18n/server";

const copy = {
  en: {
    title: "Parent overview",
    subtitle: "A helper for calm math practice at home.",
    cards: [
      {
        title: "What the child can try",
        body: "A five-lesson preview path from quantity to calculations up to 100.",
        cta: "Start child preview"
      },
      {
        title: "How to watch understanding",
        body: "Notice whether the child can explain what they see and whether pictures or the number line help."
      },
      {
        title: "What is not assessment yet",
        body: "Local preview progress is not diagnostics, a grade, or an official assessment."
      }
    ],
    statusTitle: "MVP status",
    status: [
      "The child preview works without sign-in.",
      "Local progress exists only in this browser.",
      "The account parent dashboard is a separate protected area.",
      "Official curriculum mapping will be marked only after manual verification."
    ],
    cta: "Launch child preview"
  },
  sk: {
    title: "Rodičovský prehľad",
    subtitle: "Pomôcka na pokojné domáce precvičovanie matematiky.",
    cards: [
      {
        title: "Čo môže dieťa vyskúšať",
        body: "Ukážkovú cestu s piatimi lekciami od množstva po počítanie do 100.",
        cta: "Spustiť detskú ukážku"
      },
      {
        title: "Ako sledovať porozumenie",
        body: "Všímajte si, či dieťa vie vysvetliť, čo vidí, či používa obrázok alebo číselnú os."
      },
      {
        title: "Čo zatiaľ nie je hodnotenie",
        body: "Lokálny progres v ukážke nie je diagnostika, známka ani oficiálne hodnotenie."
      }
    ],
    statusTitle: "MVP stav",
    status: [
      "Detská ukážka funguje bez prihlásenia.",
      "Lokálny progres je iba v tomto prehliadači.",
      "Rodičovský dashboard s účtom je samostatná chránená časť.",
      "Oficiálne mapovanie učiva bude označené až po manuálnom overení."
    ],
    cta: "Spustiť detskú ukážku"
  }
} as const;

export default async function ParentIndexPage() {
  const locale = await getRequestLocale();
  const labels = copy[locale];

  return (
    <section className="space-y-8 py-6">
      <SectionHeader title={labels.title} description={labels.subtitle} eyebrow="Rodič" />

      <div className="grid gap-4 lg:grid-cols-3">
        {labels.cards.map((card) => (
          <MarketingCard key={card.title} title={card.title}>
            <p>{card.body}</p>
            {"cta" in card ? (
              <Link
                className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-950 px-4 py-2 text-sm font-black text-white transition hover:bg-slate-800"
                href="/child/curriculum"
              >
                {card.cta}
              </Link>
            ) : null}
          </MarketingCard>
        ))}
      </div>

      <MvpCallout title={labels.statusTitle} tone="sky">
        <ul className="grid gap-3">
          {labels.status.map((item) => (
            <li className="flex gap-3" key={item}>
              <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-sky-700" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <Link
          className="mt-5 inline-flex min-h-12 items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800"
          href="/child/curriculum"
        >
          {labels.cta}
        </Link>
      </MvpCallout>
    </section>
  );
}
