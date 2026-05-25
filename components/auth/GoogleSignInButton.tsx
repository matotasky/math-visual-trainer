"use client";

import { LogIn } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function GoogleSignInButton({ label }: { label: string }) {
  const { error, loading, signInWithGoogle } = useAuth();

  return (
    <div className="flex flex-col items-start gap-3">
      <button
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-emerald-700 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={loading}
        type="button"
        onClick={() => void signInWithGoogle()}
      >
        <LogIn aria-hidden="true" size={20} />
        {label}
      </button>
      {error ? (
        <p aria-live="polite" className="max-w-xl rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
          {error}
        </p>
      ) : null}
    </div>
  );
}
