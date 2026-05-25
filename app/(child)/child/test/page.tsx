import { PagePlaceholder } from "@/components/ui/PagePlaceholder";
import { getRequestDictionary } from "@/lib/i18n/server";

export default async function TestPage() {
  const dictionary = await getRequestDictionary();

  return (
    <PagePlaceholder
      title={dictionary.child.pages.test.title}
      description={dictionary.child.pages.test.description}
      eyebrow={dictionary.child.area}
    />
  );
}
