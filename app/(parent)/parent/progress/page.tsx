import { ChartPlaceholder } from "@/components/charts/ChartPlaceholder";
import { ParentSectionHeader } from "@/components/parent/ParentSectionHeader";
import { getRequestDictionary } from "@/lib/i18n/server";

export default async function ParentProgressPage() {
  const dictionary = await getRequestDictionary();

  return (
    <section className="py-8">
      <ParentSectionHeader
        title={dictionary.parent.progress.title}
        description={dictionary.parent.progress.description}
        eyebrow={dictionary.parent.eyebrow}
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <ChartPlaceholder label={dictionary.parent.progress.attemptsPerDay} />
        <ChartPlaceholder label={dictionary.parent.progress.responseTime} />
        <ChartPlaceholder label={dictionary.parent.progress.masteryByTopic} />
      </div>
    </section>
  );
}
