import { PagePlaceholder } from "@/components/ui/PagePlaceholder";
import { getRequestDictionary } from "@/lib/i18n/server";

export default async function LandingPage() {
  const dictionary = await getRequestDictionary();

  return (
    <PagePlaceholder
      title={dictionary.public.landingTitle}
      description={dictionary.public.landingDescription}
      eyebrow={dictionary.common.fallbackEyebrow}
      primaryHref="/login"
      primaryLabel={dictionary.public.start}
    />
  );
}
