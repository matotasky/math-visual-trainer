import { ParentResultDetail } from "@/components/parent/ParentResultDetail";
import { ParentSectionHeader } from "@/components/parent/ParentSectionHeader";
import { getRequestDictionary, getRequestLocale } from "@/lib/i18n/server";

type ResultsDetailPageProps = {
  params: Promise<{
    sessionId: string;
  }>;
};

export default async function ResultsDetailPage({ params }: ResultsDetailPageProps) {
  const { sessionId } = await params;
  const [dictionary, locale] = await Promise.all([getRequestDictionary(), getRequestLocale()]);

  return (
    <section className="py-8">
      <ParentSectionHeader
        title={dictionary.parent.results.detailTitle}
        description={dictionary.parent.results.detailDescription.replace("{sessionId}", sessionId)}
        eyebrow={dictionary.parent.eyebrow}
      />
      <ParentResultDetail labels={dictionary.parent.results} locale={locale} sessionId={sessionId} />
    </section>
  );
}
