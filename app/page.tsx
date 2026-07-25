import type { Metadata } from "next";
import { MvpFooter } from "@/components/layout/MvpFooter";
import { RouteShell } from "@/components/layout/RouteShell";
import { MvpNavigation } from "@/components/navigation/MvpNavigation";
import { LandingPageContent } from "@/components/marketing/LandingPageContent";

export const metadata: Metadata = {
  title: "Math Visual Trainer",
  description: "Vizuálne matematické precvičovanie pre deti bez tlaku na čas."
};

export default function HomePage() {
  return (
    <RouteShell variant="public">
      <MvpNavigation />
      <LandingPageContent />
      <MvpFooter />
    </RouteShell>
  );
}
