import { PracticeRunner } from "@/components/child/PracticeRunner";
import { getRequestDictionary, getRequestLocale } from "@/lib/i18n/server";

export default async function PracticePage() {
  const [dictionary, locale] = await Promise.all([getRequestDictionary(), getRequestLocale()]);

  return <PracticeRunner labels={dictionary.child.practiceRunner} locale={locale} />;
}
