import { ChartPlaceholder } from "@/components/charts/ChartPlaceholder";
import { ParentSectionHeader } from "@/components/parent/ParentSectionHeader";

export default function ParentProgressPage() {
  return (
    <section className="py-8">
      <ParentSectionHeader
        title="Progress"
        description="Route skeleton for progress trends, recent activity, streaks, and level advancement."
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <ChartPlaceholder label="Attempts per day" />
        <ChartPlaceholder label="Response time" />
        <ChartPlaceholder label="Mastery by topic" />
      </div>
    </section>
  );
}
