import { ChallengeRunner } from "@/components/child/ChallengeRunner";
import { getRequestDictionary, getRequestLocale } from "@/lib/i18n/server";

export default async function ChallengePage() {
  const [dictionary, locale] = await Promise.all([getRequestDictionary(), getRequestLocale()]);

  return <ChallengeRunner labels={dictionary.child.challengeRunner} locale={locale} />;
}
