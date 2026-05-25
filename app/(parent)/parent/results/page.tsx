import { ParentSectionHeader } from "@/components/parent/ParentSectionHeader";
import { getRequestDictionary } from "@/lib/i18n/server";

export default async function ParentResultsPage() {
  const dictionary = await getRequestDictionary();

  return (
    <section className="py-8">
      <ParentSectionHeader
        title={dictionary.parent.results.title}
        description={dictionary.parent.results.description}
        eyebrow={dictionary.parent.eyebrow}
      />
    </section>
  );
}
