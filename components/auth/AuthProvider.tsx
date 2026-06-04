"use client";

import {
  browserLocalPersistence,
  getRedirectResult,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signInWithRedirect,
  signOut as firebaseSignOut,
  type User
} from "firebase/auth";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getFirebaseAuth, getGoogleAuthProvider } from "@/lib/firebase";

type AuthContextValue = {
  firebaseUser: User | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const authErrorMessages: Record<string, string> = {
  "auth/popup-closed-by-user": "Prihlasovacie okno bolo zavreté pred dokončením prihlasenia.",
  "auth/cancelled-popup-request": "Prihlásenie už prebieha v inom okne.",
  "auth/unauthorized-domain": "Táto doména nie je povolená vo Firebase Authentication.",
  "auth/web-storage-unsupported": "Prehliadač nepovoľuje uloženie prihlásenia. Skúste povoliť cookies a lokálne úložisko."
};

function getAuthErrorCode(error: unknown): string | null {
  if (typeof error !== "object" || error === null || !("code" in error)) {
    return null;
  }

  const { code } = error as { code?: unknown };

  return typeof code === "string" ? code : null;
}

function getErrorMessage(error: unknown): string {
  const code = getAuthErrorCode(error);

  if (code && authErrorMessages[code]) {
    return authErrorMessages[code];
  }

  return error instanceof Error ? error.message : "Nastala neočakávaná chyba pri prihlasovaní.";
}

function shouldFallbackToRedirect(error: unknown): boolean {
  const code = getAuthErrorCode(error);

  return code === "auth/popup-blocked" || code === "auth/operation-not-supported-in-this-environment";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const auth = getFirebaseAuth();
      let cancelled = false;
      let redirectSettled = false;
      let authStateSettled = false;

      function markReady() {
        if (!cancelled && redirectSettled && authStateSettled) {
          setLoading(false);
        }
      }

      void getRedirectResult(auth)
        .then((result) => {
          if (!cancelled && result?.user) {
            setFirebaseUser(result.user);
          }
        })
        .catch((authError: unknown) => {
          if (!cancelled) {
            setError(getErrorMessage(authError));
          }
        })
        .finally(() => {
          redirectSettled = true;
          markReady();
        });

      const unsubscribe = onAuthStateChanged(
        auth,
        (nextUser) => {
          if (!cancelled) {
            setFirebaseUser(nextUser);
            authStateSettled = true;
            markReady();
          }
        },
        (authError) => {
          if (!cancelled) {
            setError(getErrorMessage(authError));
            authStateSettled = true;
            markReady();
          }
        }
      );

      return () => {
        cancelled = true;
        unsubscribe();
      };
    } catch (authError) {
      window.setTimeout(() => {
        setError(getErrorMessage(authError));
        setLoading(false);
      }, 0);

      return undefined;
    }
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setError(null);
    setLoading(true);

    try {
      const auth = getFirebaseAuth();
      const provider = getGoogleAuthProvider();

      await setPersistence(auth, browserLocalPersistence);

      try {
        const result = await signInWithPopup(auth, provider);
        setFirebaseUser(result.user);
        setLoading(false);
      } catch (popupError) {
        if (shouldFallbackToRedirect(popupError)) {
          await signInWithRedirect(auth, provider);
          return;
        }

        throw popupError;
      }
    } catch (authError) {
      setError(getErrorMessage(authError));
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    setError(null);

    try {
      await firebaseSignOut(getFirebaseAuth());
    } catch (authError) {
      setError(getErrorMessage(authError));
    }
  }, []);

  const value = useMemo(
    () => ({
      firebaseUser,
      loading,
      error,
      signInWithGoogle,
      signOut
    }),
    [error, firebaseUser, loading, signInWithGoogle, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext musí byť použitý vo vnútri AuthProvider.");
  }

  return context;
}
