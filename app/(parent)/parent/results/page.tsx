import { ParentResults } from "@/components/parent/ParentResults";
import { ParentSectionHeader } from "@/components/parent/ParentSectionHeader";
import { getRequestDictionary, getRequestLocale } from "@/lib/i18n/server";

export default async function ParentResultsPage() {
  const [dictionary, locale] = await Promise.all([getRequestDictionary(), getRequestLocale()]);

  return (
    <section className="py-8">
      <ParentSectionHeader
        title={dictionary.parent.results.title}
        description={dictionary.parent.results.description}
        eyebrow={dictionary.parent.eyebrow}
      />
      <ParentResults labels={dictionary.parent.results} locale={locale} />
    </section>
  );
}
