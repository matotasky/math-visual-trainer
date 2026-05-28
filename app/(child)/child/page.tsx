import { ChildHomeDashboard } from "@/components/child/ChildHomeDashboard";
import { getRequestDictionary, getRequestLocale } from "@/lib/i18n/server";

export default async function ChildHomePage() {
  const [dictionary, locale] = await Promise.all([getRequestDictionary(), getRequestLocale()]);

  return <ChildHomeDashboard labels={dictionary.child.home} locale={locale} />;
}
