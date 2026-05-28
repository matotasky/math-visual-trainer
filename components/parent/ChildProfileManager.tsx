"use client";

import { ArrowRight, Baby, Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { useAuth } from "@/hooks/useAuth";
import { createChildProfile, listChildProfiles } from "@/lib/firestore";
import { getLevelDisplayName } from "@/lib/math-engine/levelDisplay";
import { setSelectedChildProfileId } from "@/lib/utils/childSelection";
import type { ChildProfile, Locale } from "@/types";

type ChildProfileManagerLabels = {
  createTitle: string;
  createDescription: string;
  nameLabel: string;
  namePlaceholder: string;
  birthYearLabel: string;
  schoolYearLabel: string;
  dailyGoalLabel: string;
  createButton: string;
  creatingButton: string;
  existingTitle: string;
  emptyTitle: string;
  emptyDescription: string;
  currentLevelLabel: string;
  dailyGoalValue: string;
  continueDiagnostic: string;
  continueChild: string;
  loadingProfiles: string;
  loadError: string;
  createError: string;
  nameRequired: string;
};

type ChildProfileManagerProps = {
  labels: ChildProfileManagerLabels;
  locale: Locale;
};

function optionalNumber(value: string): number | undefined {
  const trimmed = value.trim();

  if (!trimmed) {
    return undefined;
  }

  const parsed = Number(trimmed);

  return Number.isFinite(parsed) ? parsed : undefined;
}

export function ChildProfileManager({ labels, locale }: ChildProfileManagerProps) {
  const router = useRouter();
  const { firebaseUser } = useAuth();
  const [profiles, setProfiles] = useState<ChildProfile[]>([]);
  const [displayName, setDisplayName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [schoolYear, setSchoolYear] = useState("");
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState("10");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const parentUserId = firebaseUser?.uid;

    if (!parentUserId) {
      return;
    }

    const activeParentUserId = parentUserId;
    let cancelled = false;

    async function loadProfiles() {
      setLoading(true);
      setError(null);

      try {
        const nextProfiles = await listChildProfiles(activeParentUserId);

        if (!cancelled) {
          setProfiles(nextProfiles);
        }
      } catch {
        if (!cancelled) {
          setError(labels.loadError);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadProfiles();

    return () => {
      cancelled = true;
    };
  }, [firebaseUser?.uid, labels.loadError]);

  function selectChild(profile: ChildProfile) {
    setSelectedChildProfileId(profile.id);
    router.push(profile.diagnosticCompletedAt ? "/child" : "/child/diagnostic");
  }

  async function handleCreateProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!firebaseUser) {
      return;
    }

    if (!displayName.trim()) {
      setError(labels.nameRequired);
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const profile = await createChildProfile(firebaseUser.uid, {
        displayName,
        birthYear: optionalNumber(birthYear),
        schoolYear: optionalNumber(schoolYear),
        dailyGoalMinutes: optionalNumber(dailyGoalMinutes) ?? 10
      });

      setProfiles((currentProfiles) => [profile, ...currentProfiles]);
      setDisplayName("");
      setBirthYear("");
      setSchoolYear("");
      setDailyGoalMinutes("10");
      selectChild(profile);
    } catch {
      setError(labels.createError);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-sky-100 text-sky-700">
            <Baby aria-hidden="true" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-950">{labels.existingTitle}</h2>
            {loading ? <p className="mt-2 text-sm text-slate-600">{labels.loadingProfiles}</p> : null}
          </div>
        </div>

        {!loading && profiles.length === 0 ? (
          <div className="mt-6 rounded-md border border-dashed border-slate-300 p-5">
            <h3 className="font-semibold text-slate-950">{labels.emptyTitle}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{labels.emptyDescription}</p>
          </div>
        ) : null}

        {profiles.length > 0 ? (
          <div className="mt-6 grid gap-3">
            {profiles.map((profile) => (
              <article key={profile.id} className="rounded-md border border-slate-200 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-950">{profile.displayName}</h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {labels.currentLevelLabel}: {getLevelDisplayName(profile.currentLevelId, locale)}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {labels.dailyGoalValue.replace("{minutes}", String(profile.dailyGoalMinutes))}
                    </p>
                  </div>
                  <button
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                    type="button"
                    onClick={() => selectChild(profile)}
                  >
                    {profile.diagnosticCompletedAt ? labels.continueChild : labels.continueDiagnostic}
                    <ArrowRight aria-hidden="true" size={18} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold text-slate-950">{labels.createTitle}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{labels.createDescription}</p>

        <form className="mt-5 grid gap-4" onSubmit={(event) => void handleCreateProfile(event)}>
          <label className="grid gap-2 text-sm font-semibold text-slate-800">
            {labels.nameLabel}
            <input
              className="min-h-11 rounded-md border border-slate-300 px-3 text-base font-normal outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
              maxLength={60}
              placeholder={labels.namePlaceholder}
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-slate-800">
              {labels.birthYearLabel}
              <input
                className="min-h-11 rounded-md border border-slate-300 px-3 text-base font-normal outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                inputMode="numeric"
                value={birthYear}
                onChange={(event) => setBirthYear(event.target.value)}
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-slate-800">
              {labels.schoolYearLabel}
              <input
                className="min-h-11 rounded-md border border-slate-300 px-3 text-base font-normal outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                inputMode="numeric"
                value={schoolYear}
                onChange={(event) => setSchoolYear(event.target.value)}
              />
            </label>
          </div>

          <label className="grid gap-2 text-sm font-semibold text-slate-800">
            {labels.dailyGoalLabel}
            <input
              className="min-h-11 rounded-md border border-slate-300 px-3 text-base font-normal outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
              inputMode="numeric"
              value={dailyGoalMinutes}
              onChange={(event) => setDailyGoalMinutes(event.target.value)}
            />
          </label>

          {error ? (
            <p aria-live="polite" className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
              {error}
            </p>
          ) : null}

          <button
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={saving}
            type="submit"
          >
            {saving ? <Loader2 aria-hidden="true" className="animate-spin" size={18} /> : <Plus aria-hidden="true" size={18} />}
            {saving ? labels.creatingButton : labels.createButton}
          </button>
        </form>
      </section>
    </div>
  );
}
