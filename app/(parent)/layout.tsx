import type { ReactNode } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { RouteShell } from "@/components/layout/RouteShell";
import { ParentNavigation } from "@/components/parent/ParentNavigation";
import { ParentPinBoundary } from "@/components/parent/ParentPinBoundary";
import { getRequestDictionary } from "@/lib/i18n/server";

export default async function ParentLayout({ children }: { children: ReactNode }) {
  const dictionary = await getRequestDictionary();

  return (
    <ProtectedRoute loadingLabel={dictionary.common.loading} redirectingLabel={dictionary.common.redirecting}>
      <ParentPinBoundary redirectingLabel={dictionary.common.redirecting}>
        <RouteShell variant="parent">
          <ParentNavigation labels={dictionary.parent.navigation} />
          {children}
        </RouteShell>
      </ParentPinBoundary>
    </ProtectedRoute>
  );
}
