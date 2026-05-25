"use client";

import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
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
  const router = useRouter();
  const pathname = usePathname();

  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const auth = getFirebaseAuth();

      return onAuthStateChanged(
        auth,
        (nextUser) => {
          setFirebaseUser(nextUser);
          setLoading(false);

          if (nextUser && pathname === "/login") {
            router.replace("/parent/dashboard");
          }
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
  }, [pathname, router]);

  const signInWithGoogle = useCallback(async () => {
    setError(null);
    setLoading(true);

    try {
      const result = await signInWithPopup(getFirebaseAuth(), getGoogleAuthProvider());

      setFirebaseUser(result.user);

      if (pathname === "/login") {
        router.replace("/");
      }
    } catch (authError) {
      setError(getErrorMessage(authError));
    } finally {
      setLoading(false);
    }
  }, [pathname, router]);

  const signOut = useCallback(async () => {
    setError(null);
    try {
      await firebaseSignOut(getFirebaseAuth());
      router.replace("/login");
    } catch (authError) {
      setError(getErrorMessage(authError));
    }
  }, [router]);

  const value = useMemo(
    () => ({
      firebaseUser,
      loading,
      error,
      signInWithGoogle,
      signOut,
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
