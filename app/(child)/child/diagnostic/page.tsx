import { DiagnosticRunner } from "@/components/child/DiagnosticRunner";
import { getRequestDictionary, getRequestLocale } from "@/lib/i18n/server";

export default async function DiagnosticPage() {
  const [dictionary, locale] = await Promise.all([getRequestDictionary(), getRequestLocale()]);

  return <DiagnosticRunner labels={dictionary.child.diagnosticRunner} locale={locale} />;
}
