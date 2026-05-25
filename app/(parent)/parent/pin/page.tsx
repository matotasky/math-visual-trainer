import { ParentSectionHeader } from "@/components/parent/ParentSectionHeader";
import { getRequestDictionary } from "@/lib/i18n/server";

export default async function ParentPinPage() {
  const dictionary = await getRequestDictionary();

  return (
    <section className="py-8">
      <ParentSectionHeader
        title={dictionary.parent.pin.title}
        description={dictionary.parent.pin.description}
        eyebrow={dictionary.parent.eyebrow}
      />
    </section>
  );
}
