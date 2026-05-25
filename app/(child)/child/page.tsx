import { BookOpen, ClipboardCheck, Dumbbell, Gift, Sparkles, Trophy } from "lucide-react";
import { ChildModeCard } from "@/components/child/ChildModeCard";

const childModes = [
  {
    href: "/child/diagnostic",
    label: "Diagnostic",
    description: "Find the best starting point.",
    icon: ClipboardCheck
  },
  {
    href: "/child/learn",
    label: "Learn",
    description: "Build visual strategies first.",
    icon: BookOpen
  },
  {
    href: "/child/practice",
    label: "Practice",
    description: "Grow fluency with friendly feedback.",
    icon: Dumbbell
  },
  {
    href: "/child/test",
    label: "Test",
    description: "Check mastery without hints.",
    icon: Trophy
  },
  {
    href: "/child/challenge",
    label: "Challenge",
    description: "Short speed rounds after mastery.",
    icon: Sparkles
  },
  {
    href: "/child/rewards",
    label: "Rewards",
    description: "See streak and progress rewards.",
    icon: Gift
  }
] as const;

export default function ChildHomePage() {
  return (
    <section className="py-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase text-sky-700">Child area</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">Choose a math activity</h1>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {childModes.map((mode) => (
          <ChildModeCard key={mode.href} {...mode} />
        ))}
      </div>
    </section>
  );
}
