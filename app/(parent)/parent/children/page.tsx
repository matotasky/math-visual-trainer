import { ParentSectionHeader } from "@/components/parent/ParentSectionHeader";
import { getRequestDictionary } from "@/lib/i18n/server";

export default async function ParentChildrenPage() {
  const dictionary = await getRequestDictionary();

  return (
    <section className="py-8">
      <ParentSectionHeader
        title={dictionary.parent.children.title}
        description={dictionary.parent.children.description}
        eyebrow={dictionary.parent.eyebrow}
      />
    </section>
  );
}
