type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeader({ description, eyebrow, title }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <p className="text-sm font-black uppercase text-sky-700">{eyebrow}</p> : null}
      <h2 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">{title}</h2>
      {description ? <p className="mt-3 text-base font-semibold leading-7 text-slate-700">{description}</p> : null}
    </div>
  );
}
