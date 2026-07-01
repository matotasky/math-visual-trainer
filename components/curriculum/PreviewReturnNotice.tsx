"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function PreviewReturnNotice() {
  const searchParams = useSearchParams();
  const [dismissed, setDismissed] = useState(false);

  const isVisible = searchParams.get("previewCompleted") === "1" && !dismissed;

  if (!isVisible) {
    return null;
  }

  return (
    <section className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm md:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-base font-black leading-7 text-emerald-950">
            Hotovo. Lokálny progres sa aktualizoval v tomto prehliadači.
          </p>
          <p className="mt-1 text-sm font-semibold leading-6 text-emerald-900">
            Nie je to hodnotenie ani zápis do účtu.
          </p>
        </div>
        <button
          className="min-h-11 w-fit rounded-xl bg-emerald-700 px-4 py-2 text-sm font-black text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-200"
          onClick={() => setDismissed(true)}
          type="button"
        >
          Rozumiem
        </button>
      </div>
    </section>
  );
}
