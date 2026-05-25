import type { ReactNode } from "react";
import { RouteShell } from "@/components/layout/RouteShell";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return <RouteShell variant="public">{children}</RouteShell>;
}
