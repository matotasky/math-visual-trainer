import { ChartPlaceholder } from "@/components/charts/ChartPlaceholder";
import { ParentSectionHeader } from "@/components/parent/ParentSectionHeader";
import { getRequestDictionary } from "@/lib/i18n/server";

export default async function ParentDashboardPage() {
  const dictionary = await getRequestDictionary();

  return (
    <section className="py-8">
      <ParentSectionHeader
        title={dictionary.parent.dashboard.title}
        description={dictionary.parent.dashboard.description}
        eyebrow={dictionary.parent.eyebrow}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <ChartPlaceholder label={dictionary.parent.dashboard.accuracyChart} />
        <ChartPlaceholder label={dictionary.parent.dashboard.masteryChart} />
      </div>
    </section>
  );
}
