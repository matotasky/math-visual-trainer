import { ParentProgress } from "@/components/parent/ParentProgress";
import { ParentSectionHeader } from "@/components/parent/ParentSectionHeader";
import { getRequestDictionary, getRequestLocale } from "@/lib/i18n/server";

export default async function ParentProgressPage() {
  const [dictionary, locale] = await Promise.all([getRequestDictionary(), getRequestLocale()]);

  return (
    <section className="py-8">
      <ParentSectionHeader
        title={dictionary.parent.progress.title}
        description={dictionary.parent.progress.description}
        eyebrow={dictionary.parent.eyebrow}
      />
      <ParentProgress labels={dictionary.parent.progress} locale={locale} />
    </section>
  );
}
