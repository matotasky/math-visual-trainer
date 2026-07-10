"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { getLoginRedirect } from "@/lib/auth/redirects";
import { useAuth } from "@/hooks/useAuth";

export function ProtectedRoute({
  children,
  loadingLabel,
  publicPathPrefixes = [],
  publicPaths = [],
  redirectingLabel
}: {
  children: ReactNode;
  loadingLabel: string;
  publicPathPrefixes?: string[];
  publicPaths?: string[];
  redirectingLabel: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { firebaseUser, loading } = useAuth();
  const isPublicRoute = publicPaths.includes(pathname) || publicPathPrefixes.some((prefix) => pathname.startsWith(prefix));

  useEffect(() => {
    if (!isPublicRoute && !loading && !firebaseUser) {
      router.replace(getLoginRedirect(pathname));
    }
  }, [firebaseUser, isPublicRoute, loading, pathname, router]);

  if (isPublicRoute) {
    return children;
  }

  if (loading) {
    return <div className="p-6 text-sm text-slate-600">{loadingLabel}</div>;
  }

  if (!firebaseUser) {
    return <div className="p-6 text-sm text-slate-600">{redirectingLabel}</div>;
  }

  return children;
}
