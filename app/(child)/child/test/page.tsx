import { TestRunner } from "@/components/child/TestRunner";
import { getRequestDictionary, getRequestLocale } from "@/lib/i18n/server";

export default async function TestPage() {
  const [dictionary, locale] = await Promise.all([getRequestDictionary(), getRequestLocale()]);

  return <TestRunner labels={dictionary.child.testRunner} locale={locale} />;
}
