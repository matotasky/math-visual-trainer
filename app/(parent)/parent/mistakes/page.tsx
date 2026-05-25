import { ParentSectionHeader } from "@/components/parent/ParentSectionHeader";
import { getRequestDictionary } from "@/lib/i18n/server";

export default async function ParentMistakesPage() {
  const dictionary = await getRequestDictionary();

  return (
    <section className="py-8">
      <ParentSectionHeader
        title={dictionary.parent.mistakes.title}
        description={dictionary.parent.mistakes.description}
        eyebrow={dictionary.parent.eyebrow}
      />
    </section>
  );
}
