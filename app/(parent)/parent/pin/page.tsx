import { ParentSectionHeader } from "@/components/parent/ParentSectionHeader";

export default function ParentPinPage() {
  return (
    <section className="py-8">
      <ParentSectionHeader
        title="Parent PIN"
        description="Route skeleton for hashed PIN verification, failed attempt tracking, and temporary lockout."
      />
    </section>
  );
}
