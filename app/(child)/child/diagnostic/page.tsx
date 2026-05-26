import { DiagnosticRunner } from "@/components/child/DiagnosticRunner";
import { getRequestDictionary } from "@/lib/i18n/server";

export default async function DiagnosticPage() {
  const dictionary = await getRequestDictionary();

  return <DiagnosticRunner labels={dictionary.child.diagnosticRunner} />;
}
