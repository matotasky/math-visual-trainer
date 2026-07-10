import { RouteShell } from "@/components/layout/RouteShell";
import { MvpNavigation } from "@/components/navigation/MvpNavigation";
import { LandingPageContent } from "@/components/marketing/LandingPageContent";

export default function HomePage() {
  return (
    <RouteShell variant="public">
      <MvpNavigation />
      <LandingPageContent />
    </RouteShell>
  );
}
