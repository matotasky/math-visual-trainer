"use client";

import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type ChildBackNavigationLabels = {
  back: string;
  confirmTitle: string;
  confirmDescription: string;
  stay: string;
  leave: string;
};

type ChildBackNavigationProps = {
  labels: ChildBackNavigationLabels;
};

export function ChildBackNavigation({ labels }: ChildBackNavigationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (pathname === "/child") {
    return null;
  }

  function leavePage() {
    setConfirmOpen(false);
    router.push("/child");
  }

  return (
    <div className="mb-4">
      <button
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
        type="button"
        onClick={() => setConfirmOpen(true)}
      >
        <ArrowLeft aria-hidden="true" size={18} />
        {labels.back}
      </button>

      {confirmOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 px-4" role="presentation">
          <section
            aria-describedby="child-back-confirm-description"
            aria-labelledby="child-back-confirm-title"
            aria-modal="true"
            className="w-full max-w-sm rounded-lg border border-slate-200 bg-white p-5 shadow-xl"
            role="dialog"
          >
            <h2 className="text-lg font-bold text-slate-950" id="child-back-confirm-title">
              {labels.confirmTitle}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600" id="child-back-confirm-description">
              {labels.confirmDescription}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button
                className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                type="button"
                onClick={() => setConfirmOpen(false)}
              >
                {labels.stay}
              </button>
              <button
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                type="button"
                onClick={leavePage}
              >
                {labels.leave}
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
