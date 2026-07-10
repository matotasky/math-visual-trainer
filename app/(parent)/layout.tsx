import type { ReactNode } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { RouteShell } from "@/components/layout/RouteShell";
import { MvpNavigation } from "@/components/navigation/MvpNavigation";
import { ParentNavigation } from "@/components/parent/ParentNavigation";
import { ParentPinBoundary } from "@/components/parent/ParentPinBoundary";
import { getRequestDictionary } from "@/lib/i18n/server";

export default async function ParentLayout({ children }: { children: ReactNode }) {
  const dictionary = await getRequestDictionary();

  return (
    <ProtectedRoute
      loadingLabel={dictionary.common.loading}
      publicPaths={["/parent"]}
      redirectingLabel={dictionary.common.redirecting}
    >
      <ParentPinBoundary publicPaths={["/parent"]} redirectingLabel={dictionary.common.redirecting}>
        <RouteShell variant="parent">
          <MvpNavigation />
          <ParentNavigation labels={dictionary.parent.navigation} />
          {children}
        </RouteShell>
      </ParentPinBoundary>
    </ProtectedRoute>
  );
}
