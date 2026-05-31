import { ParentDashboard } from "@/components/parent/ParentDashboard";
import { ParentSectionHeader } from "@/components/parent/ParentSectionHeader";
import { getRequestDictionary, getRequestLocale } from "@/lib/i18n/server";

export default async function ParentDashboardPage() {
  const [dictionary, locale] = await Promise.all([getRequestDictionary(), getRequestLocale()]);

  return (
    <section className="py-8">
      <ParentSectionHeader
        title={dictionary.parent.dashboard.title}
        description={dictionary.parent.dashboard.description}
        eyebrow={dictionary.parent.eyebrow}
      />
      <ParentDashboard labels={dictionary.parent.dashboard} locale={locale} />
    </section>
  );
}
