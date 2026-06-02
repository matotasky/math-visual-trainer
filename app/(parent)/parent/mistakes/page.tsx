import { ParentMistakes } from "@/components/parent/ParentMistakes";
import { ParentSectionHeader } from "@/components/parent/ParentSectionHeader";
import { getRequestDictionary, getRequestLocale } from "@/lib/i18n/server";

export default async function ParentMistakesPage() {
  const [dictionary, locale] = await Promise.all([getRequestDictionary(), getRequestLocale()]);

  return (
    <section className="py-8">
      <ParentSectionHeader
        title={dictionary.parent.mistakes.title}
        description={dictionary.parent.mistakes.description}
        eyebrow={dictionary.parent.eyebrow}
      />
      <ParentMistakes labels={dictionary.parent.mistakes} locale={locale} />
    </section>
  );
}
