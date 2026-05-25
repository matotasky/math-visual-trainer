"use client";

import { LogIn } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function GoogleSignInButton() {
  const { loading, signInWithGoogle } = useAuth();

  return (
    <button
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-emerald-700 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
      disabled={loading}
      type="button"
      onClick={() => void signInWithGoogle()}
    >
      <LogIn aria-hidden="true" size={20} />
      Sign in with Google
    </button>
  );
}
