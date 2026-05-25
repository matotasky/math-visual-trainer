import { BookOpen, ClipboardCheck, Dumbbell, Gift, Sparkles, Trophy } from "lucide-react";
import { ChildModeCard } from "@/components/child/ChildModeCard";
import { getRequestDictionary } from "@/lib/i18n/server";

const childModeConfig = [
  {
    href: "/child/diagnostic",
    key: "diagnostic",
    icon: ClipboardCheck
  },
  {
    href: "/child/learn",
    key: "learn",
    icon: BookOpen
  },
  {
    href: "/child/practice",
    key: "practice",
    icon: Dumbbell
  },
  {
    href: "/child/test",
    key: "test",
    icon: Trophy
  },
  {
    href: "/child/challenge",
    key: "challenge",
    icon: Sparkles
  },
  {
    href: "/child/rewards",
    key: "rewards",
    icon: Gift
  }
] as const;

export default async function ChildHomePage() {
  const dictionary = await getRequestDictionary();

  return (
    <section className="py-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase text-sky-700">{dictionary.child.area}</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">{dictionary.child.homeTitle}</h1>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {childModeConfig.map((mode) => {
          const text = dictionary.child.modes[mode.key];

          return <ChildModeCard key={mode.href} description={text.description} href={mode.href} icon={mode.icon} label={text.label} />;
        })}
      </div>
    </section>
  );
}
