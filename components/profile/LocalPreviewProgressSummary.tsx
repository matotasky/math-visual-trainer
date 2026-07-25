"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import {
  getLocalPreviewPathProgress,
  type LocalPreviewPathProgress
} from "@/lib/curriculum/local-preview-path-progress";
import { subscribeToPreviewLessonProgressChanges } from "@/lib/curriculum/local-preview-progress";
import {
  getLocalChildProfile,
  subscribeToLocalChildProfileChanges,
} from "@/lib/local-child-profile";

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

export function LocalPreviewProgressSummary() {
  const progressSnapshot = useSyncExternalStore(
    subscribeToPreviewLessonProgressChanges,
    getProgressSnapshot,
    getServerProgressSnapshot
  );
  const progress = JSON.parse(progressSnapshot) as LocalPreviewPathProgress;
  const profile = useSyncExternalStore(subscribeToLocalChildProfileChanges, getLocalChildProfile, () => null);
  const suggestion =
    progress.completedCount === 0
      ? "Začni prvou lekciou."
      : progress.isComplete
        ? "Môžeš si cestu zopakovať od začiatku."
        : "Pokračuj ďalšou odporúčanou lekciou.";
  const buttonLabel =
    progress.completedCount === 0
      ? "Začať ukážkovú cestu"
      : progress.isComplete
        ? "Zopakovať cestu"
        : "Pokračovať";

  return (
    <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
      <p className="text-sm font-black uppercase text-emerald-800">Lokálny progres</p>
      <h2 className="mt-2 text-3xl font-black text-slate-950">
        {progress.completedCount} / {progress.totalCount}
      </h2>
      <p className="mt-2 text-sm font-bold leading-6 text-emerald-950">
        {profile ? `${profile.nickname}: ` : ""}
        {suggestion}
      </p>
      <p className="mt-3 rounded-xl bg-white px-3 py-2 text-sm font-bold leading-6 text-slate-800 shadow-sm">
        Ďalšia lekcia: {progress.nextLessonTitle}
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Link
          className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800 sm:w-fit"
          href={progress.nextLessonHref}
        >
          {buttonLabel}
        </Link>
        <Link
          className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-emerald-300 bg-white px-5 py-3 text-sm font-black text-emerald-900 transition hover:bg-emerald-100 sm:w-fit"
          href="/child/curriculum"
        >
          Otvoriť celú cestu
        </Link>
      </div>
      <p className="mt-4 text-xs font-bold uppercase leading-5 text-emerald-900">
        Iba v tomto prehliadači. Nie je to diagnostika ani účet.
      </p>
    </section>
  );
}
