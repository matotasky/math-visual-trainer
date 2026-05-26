"use client";

import {
  browserLocalPersistence,
  getRedirectResult,
  onAuthStateChanged,
  setPersistence,
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

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Nastala neočakávaná chyba pri prihlasovaní.";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const auth = getFirebaseAuth();

      void getRedirectResult(auth).catch((authError: unknown) => {
        setError(getErrorMessage(authError));
        setLoading(false);
      });

      return onAuthStateChanged(
        auth,
        (nextUser) => {
          setFirebaseUser(nextUser);
          setLoading(false);
        },
        (authError) => {
          setError(getErrorMessage(authError));
          setLoading(false);
        }
      );
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
      await setPersistence(auth, browserLocalPersistence);
      await signInWithRedirect(auth, getGoogleAuthProvider());
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
