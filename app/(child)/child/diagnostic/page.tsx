import { PagePlaceholder } from "@/components/ui/PagePlaceholder";
import { getRequestDictionary } from "@/lib/i18n/server";

export default async function DiagnosticPage() {
  const dictionary = await getRequestDictionary();

  return (
    <PagePlaceholder
      title={dictionary.child.pages.diagnostic.title}
      description={dictionary.child.pages.diagnostic.description}
      eyebrow={dictionary.child.area}
    />
  );
}
