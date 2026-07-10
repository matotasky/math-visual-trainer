"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { getCompletedPreviewLessons } from "@/lib/curriculum/local-preview-progress";
import {
  getLocalChildProfile,
  subscribeToLocalChildProfileChanges,
} from "@/lib/local-child-profile";

const totalLessons = 5;

export function LocalPreviewProgressSummary() {
  const completedCount = useSyncExternalStore(
    () => () => undefined,
    () => getCompletedPreviewLessons().length,
    () => 0
  );
  const profile = useSyncExternalStore(subscribeToLocalChildProfileChanges, getLocalChildProfile, () => null);
  const suggestion =
    completedCount === 0
      ? "Začni prvou lekciou."
      : completedCount < totalLessons
        ? "Pokračuj ďalšou lekciou."
        : "Môžeš si cestu zopakovať.";
  const buttonLabel =
    completedCount === 0 ? "Začať ukážkovú cestu" : completedCount < totalLessons ? "Pokračovať" : "Zopakovať cestu";

  return (
    <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
      <p className="text-sm font-black uppercase text-emerald-800">Lokálny progres</p>
      <h2 className="mt-2 text-3xl font-black text-slate-950">
        {completedCount} / {totalLessons}
      </h2>
      <p className="mt-2 text-sm font-bold leading-6 text-emerald-950">
        {profile ? `${profile.nickname}: ` : ""}
        {suggestion}
      </p>
      <Link
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800 sm:w-fit"
        href="/child/curriculum"
      >
        {buttonLabel}
      </Link>
      <p className="mt-4 text-xs font-bold uppercase leading-5 text-emerald-900">
        Iba v tomto prehliadači. Nie je to diagnostika ani účet.
      </p>
    </section>
  );
}
