import { PagePlaceholder } from "@/components/ui/PagePlaceholder";
import { getRequestDictionary } from "@/lib/i18n/server";

export default async function NotFoundPage() {
  const dictionary = await getRequestDictionary();

  return (
    <PagePlaceholder
      title={dictionary.notFound.title}
      description={dictionary.notFound.description}
      eyebrow={dictionary.common.fallbackEyebrow}
      primaryHref="/landing"
      primaryLabel={dictionary.common.goToLanding}
    />
  );
}
