import { PagePlaceholder } from "@/components/ui/PagePlaceholder";
import { getRequestDictionary } from "@/lib/i18n/server";

export default async function NotFoundRoutePage() {
  const dictionary = await getRequestDictionary();

  return (
    <PagePlaceholder
      title={dictionary.notFound.routeTitle}
      description={dictionary.notFound.routeDescription}
      eyebrow={dictionary.common.fallbackEyebrow}
      primaryHref="/landing"
      primaryLabel={dictionary.common.goToLanding}
    />
  );
}
