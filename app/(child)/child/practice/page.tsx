import { PagePlaceholder } from "@/components/ui/PagePlaceholder";
import { getRequestDictionary } from "@/lib/i18n/server";

export default async function PracticePage() {
  const dictionary = await getRequestDictionary();

  return (
    <PagePlaceholder
      title={dictionary.child.pages.practice.title}
      description={dictionary.child.pages.practice.description}
      eyebrow={dictionary.child.area}
    />
  );
}
