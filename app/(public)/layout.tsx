import type { ReactNode } from "react";
import { MvpFooter } from "@/components/layout/MvpFooter";
import { RouteShell } from "@/components/layout/RouteShell";
import { MvpNavigation } from "@/components/navigation/MvpNavigation";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <RouteShell variant="public">
      <MvpNavigation />
      {children}
      <MvpFooter />
    </RouteShell>
  );
}
