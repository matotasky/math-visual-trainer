"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePinGate } from "@/hooks/usePinGate";

type ParentPinBoundaryProps = {
  children: ReactNode;
  redirectingLabel: string;
};

export function ParentPinBoundary({ children, redirectingLabel }: ParentPinBoundaryProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { firebaseUser, loading: authLoading } = useAuth();
  const { unlocked } = usePinGate(firebaseUser?.uid);
  const isPinPage = pathname === "/parent/pin";

  useEffect(() => {
    if (authLoading || isPinPage || unlocked || !firebaseUser) {
      return;
    }

    router.replace(`/parent/pin?next=${encodeURIComponent(pathname)}`);
  }, [authLoading, firebaseUser, isPinPage, pathname, router, unlocked]);

  if (!isPinPage && !unlocked) {
    return <div className="p-6 text-sm text-slate-600">{redirectingLabel}</div>;
  }

  return children;
}
