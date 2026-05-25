import type { ReactNode } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { RouteShell } from "@/components/layout/RouteShell";
import { getRequestDictionary } from "@/lib/i18n/server";

export default async function ParentLayout({ children }: { children: ReactNode }) {
  const dictionary = await getRequestDictionary();

  return (
    <ProtectedRoute loadingLabel={dictionary.common.loading} redirectingLabel={dictionary.common.redirecting}>
      <RouteShell variant="parent">{children}</RouteShell>
    </ProtectedRoute>
  );
}
