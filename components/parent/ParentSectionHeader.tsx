type ParentSectionHeaderProps = {
  title: string;
  description: string;
  eyebrow: string;
};

export function ParentSectionHeader({ title, description, eyebrow }: ParentSectionHeaderProps) {
  return (
    <header className="mb-8">
      <p className="text-sm font-semibold uppercase text-emerald-700">{eyebrow}</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-950">{title}</h1>
      <p className="mt-3 max-w-3xl text-base leading-7 text-slate-700">{description}</p>
    </header>
  );
}
