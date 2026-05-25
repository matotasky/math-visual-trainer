import { ParentSectionHeader } from "@/components/parent/ParentSectionHeader";

export default function ParentChildrenPage() {
  return (
    <section className="py-8">
      <ParentSectionHeader
        title="Children"
        description="Route skeleton for creating, selecting, and managing local child profiles under the parent account."
      />
    </section>
  );
}
