"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import {
  getLocalPreviewPathProgress,
  type LocalPreviewPathProgress
} from "@/lib/curriculum/local-preview-path-progress";
import { subscribeToPreviewLessonProgressChanges } from "@/lib/curriculum/local-preview-progress";

function getProgressSnapshot() {
  return JSON.stringify(getLocalPreviewPathProgress("sk"));
}

function getServerProgressSnapshot() {
  return JSON.stringify({
    completedCount: 0,
    totalCount: 5,
    nextLessonHref: "/child/curriculum/quantity-and-number-sense",
    nextLessonTitle: "Množstvo a porozumenie číslam",
    nextLessonId: "quantity_and_number_sense",
    isComplete: false
  } satisfies LocalPreviewPathProgress);
}

export function PreviewContinueCard() {
  const progressSnapshot = useSyncExternalStore(
    subscribeToPreviewLessonProgressChanges,
    getProgressSnapshot,
    getServerProgressSnapshot
  );
  const progress = JSON.parse(progressSnapshot) as LocalPreviewPathProgress;
  const message =
    progress.completedCount === 0
      ? "Začni prvou ukážkovou lekciou."
      : progress.isComplete
        ? "Cestu si môžeš zopakovať od začiatku."
        : "Ďalší odporúčaný krok je pripravený.";

  return (
    <section className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm md:p-5">
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div>
          <p className="text-sm font-black uppercase text-emerald-800">
            Lokálny progres: {progress.completedCount} / {progress.totalCount}
          </p>
          <h3 className="mt-2 text-2xl font-black text-slate-950">Pokračuj, kde si skončil/a</h3>
          <p className="mt-2 text-sm font-bold leading-6 text-emerald-950">{message}</p>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
            Ďalšia lekcia: {progress.nextLessonTitle}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
          <Link
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800"
            href={progress.nextLessonHref}
          >
            {progress.completedCount === 0 ? "Začať" : progress.isComplete ? "Zopakovať" : "Pokračovať"}
          </Link>
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-emerald-300 bg-white px-4 py-2 text-sm font-black text-emerald-900 transition hover:bg-emerald-100"
            href="#preview-lesson-list"
          >
            Pozrieť lekcie
          </Link>
        </div>
      </div>
      <p className="mt-4 text-xs font-bold uppercase tracking-wide text-emerald-800">
        Iba lokálne v tomto prehliadači. Nie je to hodnotenie ani zápis do účtu.
      </p>
    </section>
  );
}
