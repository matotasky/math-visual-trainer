import { ChildHomeDashboard } from "@/components/child/ChildHomeDashboard";
import { getRequestDictionary } from "@/lib/i18n/server";

export default async function ChildHomePage() {
  const dictionary = await getRequestDictionary();

  return <ChildHomeDashboard labels={dictionary.child.home} />;
}
