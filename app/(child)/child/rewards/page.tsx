import { RewardsDashboard } from "@/components/child/RewardsDashboard";
import { getRequestDictionary, getRequestLocale } from "@/lib/i18n/server";

export default async function RewardsPage() {
  const [dictionary, locale] = await Promise.all([getRequestDictionary(), getRequestLocale()]);

  return <RewardsDashboard labels={dictionary.child.rewardsDashboard} locale={locale} />;
}
