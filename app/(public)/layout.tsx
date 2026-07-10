import type { ReactNode } from "react";
import { RouteShell } from "@/components/layout/RouteShell";
import { MvpNavigation } from "@/components/navigation/MvpNavigation";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <RouteShell variant="public">
      <MvpNavigation />
      {children}
    </RouteShell>
  );
}
