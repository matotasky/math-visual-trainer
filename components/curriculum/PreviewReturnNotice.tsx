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
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
        <div>
          <h3 className="text-xl font-black text-emerald-950">Lekcia dokončená</h3>
          <p className="mt-2 text-sm font-semibold leading-6 text-emerald-900">
            Progres sa uložil iba v tomto prehliadači. Môžeš pokračovať ďalšou odporúčanou
            lekciou.
          </p>
          <p className="mt-1 text-sm font-semibold leading-6 text-emerald-900">
            Nie je to hodnotenie ani zápis do účtu.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row md:flex-col">
          <a
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-950 px-4 py-2 text-sm font-black text-white transition hover:bg-slate-800"
            href="#preview-next-step"
          >
            Pozrieť odporúčaný ďalší krok
          </a>
          <button
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-emerald-300 bg-white px-4 py-2 text-sm font-black text-emerald-900 transition hover:bg-emerald-100 focus:outline-none focus:ring-4 focus:ring-emerald-200"
            onClick={() => setDismissed(true)}
            type="button"
          >
            Rozumiem
          </button>
        </div>
      </div>
    </section>
  );
}
