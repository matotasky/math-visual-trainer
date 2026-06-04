"use client";

import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const postLoginPathKey = "math-visual-trainer:post-login-path";

function consumePostLoginPath(): string | null {
  try {
    const storedPath = window.sessionStorage.getItem(postLoginPathKey);
    window.sessionStorage.removeItem(postLoginPathKey);

    return storedPath;
  } catch {
    return null;
  }
}

function savePostLoginPath(nextPath: string) {
  try {
    window.sessionStorage.setItem(postLoginPathKey, nextPath);
  } catch {
    // Sign-in must still work when browser storage is restricted.
  }
}

export function GoogleSignInButton({ label, nextPath }: { label: string; nextPath: string }) {
  const router = useRouter();
  const { error, firebaseUser, loading, signInWithGoogle } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (loading || !firebaseUser) {
      return;
    }

    const storedPath = consumePostLoginPath();
    router.replace(storedPath ?? nextPath);
    router.refresh();
  }, [firebaseUser, loading, nextPath, router]);

  async function handleSignIn() {
    setIsSubmitting(true);
    savePostLoginPath(nextPath);

    try {
      await signInWithGoogle();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-3">
      <button
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-emerald-700 px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={loading || isSubmitting}
        type="button"
        onClick={() => void handleSignIn()}
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
