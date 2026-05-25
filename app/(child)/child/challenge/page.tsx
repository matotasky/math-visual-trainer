import { PagePlaceholder } from "@/components/ui/PagePlaceholder";
import { getRequestDictionary } from "@/lib/i18n/server";

export default async function ChallengePage() {
  const dictionary = await getRequestDictionary();

  return (
    <PagePlaceholder
      title={dictionary.child.pages.challenge.title}
      description={dictionary.child.pages.challenge.description}
      eyebrow={dictionary.child.area}
    />
  );
}
