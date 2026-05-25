import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";

export default function LoginPage() {
  return (
    <section className="flex min-h-[60vh] flex-col justify-center gap-6">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase text-emerald-700">Math Visual Trainer</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-950 sm:text-5xl">Parent sign in</h1>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Use Firebase Google Sign-In to manage child profiles and parent analytics.
        </p>
      </div>
      <GoogleSignInButton />
    </section>
  );
}
