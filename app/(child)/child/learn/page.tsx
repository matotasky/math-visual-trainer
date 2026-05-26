import { LearnActivity } from "@/components/child/LearnActivity";
import { getRequestDictionary, getRequestLocale } from "@/lib/i18n/server";

export default async function LearnPage() {
  const [dictionary, locale] = await Promise.all([getRequestDictionary(), getRequestLocale()]);

  return <LearnActivity labels={dictionary.child.learnRunner} locale={locale} />;
}
