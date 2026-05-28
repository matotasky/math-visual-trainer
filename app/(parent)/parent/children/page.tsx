import { ChildProfileManager } from "@/components/parent/ChildProfileManager";
import { ParentSectionHeader } from "@/components/parent/ParentSectionHeader";
import { getRequestDictionary, getRequestLocale } from "@/lib/i18n/server";

export default async function ParentChildrenPage() {
  const [dictionary, locale] = await Promise.all([getRequestDictionary(), getRequestLocale()]);

  return (
    <section className="py-8">
      <ParentSectionHeader
        title={dictionary.parent.children.title}
        description={dictionary.parent.children.description}
        eyebrow={dictionary.parent.eyebrow}
      />
      <ChildProfileManager labels={dictionary.parent.children} locale={locale} />
    </section>
  );
}
