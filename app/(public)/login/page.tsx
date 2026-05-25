import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { getRequestDictionary } from "@/lib/i18n/server";

export default async function LoginPage() {
  const dictionary = await getRequestDictionary();

  return (
    <section className="flex min-h-[60vh] flex-col justify-center gap-6">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase text-emerald-700">{dictionary.common.fallbackEyebrow}</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-950 sm:text-5xl">{dictionary.public.loginTitle}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          {dictionary.public.loginDescription}
        </p>
      </div>
      <GoogleSignInButton label={dictionary.public.signInWithGoogle} />
    </section>
  );
}
