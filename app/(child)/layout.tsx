import type { ReactNode } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { RouteShell } from "@/components/layout/RouteShell";

export default function ChildLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <RouteShell variant="child">{children}</RouteShell>
    </ProtectedRoute>
  );
}
