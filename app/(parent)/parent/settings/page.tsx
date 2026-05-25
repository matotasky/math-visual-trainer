import { ParentSectionHeader } from "@/components/parent/ParentSectionHeader";
import { getRequestDictionary } from "@/lib/i18n/server";

export default async function ParentSettingsPage() {
  const dictionary = await getRequestDictionary();

  return (
    <section className="py-8">
      <ParentSectionHeader
        title={dictionary.parent.settings.title}
        description={dictionary.parent.settings.description}
        eyebrow={dictionary.parent.eyebrow}
      />
    </section>
  );
}
