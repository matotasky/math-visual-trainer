import Link from "next/link";

type PagePlaceholderProps = {
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
};

export function PagePlaceholder({ title, description, primaryHref, primaryLabel }: PagePlaceholderProps) {
  return (
    <section className="flex min-h-[60vh] flex-col justify-center gap-6">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase text-emerald-700">Math Visual Trainer</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-950 sm:text-5xl">{title}</h1>
        <p className="mt-4 text-lg leading-8 text-slate-700">{description}</p>
      </div>
      {primaryHref && primaryLabel ? (
        <Link
          className="inline-flex w-fit items-center justify-center rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          href={primaryHref}
        >
          {primaryLabel}
        </Link>
      ) : null}
    </section>
  );
}
