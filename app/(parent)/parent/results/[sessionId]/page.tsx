import { ParentSectionHeader } from "@/components/parent/ParentSectionHeader";

type ResultsDetailPageProps = {
  params: Promise<{
    sessionId: string;
  }>;
};

export default async function ResultsDetailPage({ params }: ResultsDetailPageProps) {
  const { sessionId } = await params;

  return (
    <section className="py-8">
      <ParentSectionHeader
        title="Result detail"
        description={`Route skeleton for paginated attempt details in session ${sessionId}.`}
      />
    </section>
  );
}
