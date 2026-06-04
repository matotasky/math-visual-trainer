import { ParentSettings } from "@/components/parent/ParentSettings";
import { ParentSectionHeader } from "@/components/parent/ParentSectionHeader";
import { getRequestDictionary, getRequestLocale } from "@/lib/i18n/server";

export default async function ParentSettingsPage() {
  const [dictionary, locale] = await Promise.all([getRequestDictionary(), getRequestLocale()]);

  return (
    <section className="py-8">
      <ParentSectionHeader
        title={dictionary.parent.settings.title}
        description={dictionary.parent.settings.description}
        eyebrow={dictionary.parent.eyebrow}
      />
      <ParentSettings labels={dictionary.parent.settings} locale={locale} />
    </section>
  );
}
