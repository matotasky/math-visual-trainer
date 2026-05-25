"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { getLoginRedirect } from "@/lib/auth/redirects";
import { useAuth } from "@/hooks/useAuth";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { firebaseUser, loading } = useAuth();

  useEffect(() => {
    if (!loading && !firebaseUser) {
      router.replace(getLoginRedirect(pathname));
    }
  }, [firebaseUser, loading, pathname, router]);

  if (loading) {
    return <div className="p-6 text-sm text-slate-600">Loading...</div>;
  }

  if (!firebaseUser) {
    return <div className="p-6 text-sm text-slate-600">Redirecting...</div>;
  }

  return children;
}
