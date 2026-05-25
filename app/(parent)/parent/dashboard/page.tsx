import { ChartPlaceholder } from "@/components/charts/ChartPlaceholder";
import { ParentSectionHeader } from "@/components/parent/ParentSectionHeader";

export default function ParentDashboardPage() {
  return (
    <section className="py-8">
      <ParentSectionHeader
        title="Dashboard"
        description="Route skeleton for aggregate-first parent analytics using daily stats, topic mastery, mistake stats, and streaks."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <ChartPlaceholder label="Accuracy over time" />
        <ChartPlaceholder label="Topic mastery" />
      </div>
    </section>
  );
}
