import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export default function NotFoundPage() {
  return (
    <PagePlaceholder
      title="Page not found"
      description="This route is not part of the current Math Visual Trainer flow."
      primaryHref="/landing"
      primaryLabel="Go to landing"
    />
  );
}
