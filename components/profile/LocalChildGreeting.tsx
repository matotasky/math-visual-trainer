"use client";

import { useSyncExternalStore } from "react";
import {
  getLocalChildGradeLabel,
  getLocalChildProfile,
  subscribeToLocalChildProfileChanges,
} from "@/lib/local-child-profile";

type LocalChildGreetingProps = {
  fallbackTitle?: string;
  fallbackSubtitle?: string;
};

export function LocalChildGreeting({
  fallbackSubtitle = "Môžeš si vytvoriť lokálny profil, ale ukážka funguje aj bez neho.",
  fallbackTitle = "Ahoj"
}: LocalChildGreetingProps) {
  const profile = useSyncExternalStore(subscribeToLocalChildProfileChanges, getLocalChildProfile, () => null);

  return (
    <section className="rounded-3xl border border-sky-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-black uppercase text-sky-700">Lokálny profil</p>
      <h2 className="mt-2 text-3xl font-black text-slate-950">{profile ? `Ahoj, ${profile.nickname}` : fallbackTitle}</h2>
      <p className="mt-2 text-sm font-bold leading-6 text-slate-600">
        {profile ? `${getLocalChildGradeLabel(profile.grade)} · lokálny profil` : fallbackSubtitle}
      </p>
    </section>
  );
}
