import { PagePlaceholder } from "@/components/ui/PagePlaceholder";
import { getRequestDictionary } from "@/lib/i18n/server";

export default async function RewardsPage() {
  const dictionary = await getRequestDictionary();

  return (
    <PagePlaceholder
      title={dictionary.child.pages.rewards.title}
      description={dictionary.child.pages.rewards.description}
      eyebrow={dictionary.child.area}
    />
  );
}
