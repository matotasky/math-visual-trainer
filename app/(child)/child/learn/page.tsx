import { PagePlaceholder } from "@/components/ui/PagePlaceholder";
import { getRequestDictionary } from "@/lib/i18n/server";

export default async function LearnPage() {
  const dictionary = await getRequestDictionary();

  return (
    <PagePlaceholder
      title={dictionary.child.pages.learn.title}
      description={dictionary.child.pages.learn.description}
      eyebrow={dictionary.child.area}
    />
  );
}
