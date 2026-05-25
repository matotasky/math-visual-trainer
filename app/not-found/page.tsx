import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export default function NotFoundRoutePage() {
  return (
    <PagePlaceholder
      title="Not found"
      description="Fallback route for unknown or unavailable pages."
      primaryHref="/landing"
      primaryLabel="Go to landing"
    />
  );
}
