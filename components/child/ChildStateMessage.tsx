import Link from "next/link";

type ChildStateMessageProps = {
  actionHref?: string;
  actionLabel?: string;
  message: string;
};

export function ChildStateMessage({ actionHref, actionLabel, message }: ChildStateMessageProps) {
  return (
    <section className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm font-medium text-amber-900">
      <p>{message}</p>
      {actionHref && actionLabel ? (
        <Link
          className="mt-4 inline-flex min-h-11 items-center justify-center rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
          href={actionHref}
        >
          {actionLabel}
        </Link>
      ) : null}
    </section>
  );
}
