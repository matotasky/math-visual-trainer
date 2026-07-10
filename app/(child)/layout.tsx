import type { ReactNode } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ChildBackNavigation } from "@/components/child/ChildBackNavigation";
import { RouteShell } from "@/components/layout/RouteShell";
import { MvpNavigation } from "@/components/navigation/MvpNavigation";
import { getRequestDictionary } from "@/lib/i18n/server";

export default async function ChildLayout({ children }: { children: ReactNode }) {
  const dictionary = await getRequestDictionary();

  return (
    <ProtectedRoute
      loadingLabel={dictionary.common.loading}
      publicPathPrefixes={["/child/curriculum"]}
      publicPaths={["/child"]}
      redirectingLabel={dictionary.common.redirecting}
    >
      <RouteShell variant="child">
        <MvpNavigation />
        <ChildBackNavigation labels={dictionary.child.navigation} />
        {children}
      </RouteShell>
    </ProtectedRoute>
  );
}
