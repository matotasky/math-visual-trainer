"use client";

import { Bell, KeyRound, Loader2, Save, ShieldCheck, SlidersHorizontal, UsersRound } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  listChildProfiles,
  resetPinSettings,
  updateChildProfileSettings,
  verifyParentPin
} from "@/lib/firestore";
import { getSelectedChildProfileId, setSelectedChildProfileId } from "@/lib/utils/childSelection";
import type { ChildProfile, Locale, TimePressure } from "@/types";

type TimePressureSelectValue = "level_default" | TimePressure;

type ParentSettingsLabels = {
  title: string;
  description: string;
  loading: string;
  loadError: string;
  noChildrenTitle: string;
  noChildrenDescription: string;
  createChildButton: string;
  childSectionTitle: string;
  childSectionDescription: string;
  childSelectorLabel: string;
  dailyGoalLabel: string;
  dailyGoalHelp: string;
  timePressureLabel: string;
  timePressureHelp: string;
  savePreferences: string;
  savingPreferences: string;
  preferencesSaved: string;
  preferencesError: string;
  dailyGoalInvalid: string;
  timePressureOptions: Record<TimePressureSelectValue, string>;
  pinSectionTitle: string;
  pinSectionDescription: string;
  currentPinLabel: string;
  nextPinLabel: string;
  confirmPinLabel: string;
  pinPlaceholder: string;
  changePin: string;
  changingPin: string;
  pinSaved: string;
  pinSaveError: string;
  pinDigits: string;
  pinMismatch: string;
  pinInvalid: string;
  pinLocked: string;
  notificationsTitle: string;
  notificationsStatus: string;
  notificationsDescription: string;
  webPushPlaceholder: string;
  fcmPlaceholder: string;
  manageChildrenTitle: string;
  manageChildrenDescription: string;
  manageChildrenButton: string;
};

const defaultTimePressureValue = "level_default" satisfies TimePressureSelectValue;
const timePressureValues = ["none", "soft", "medium", "high"] satisfies TimePressure[];

function isPin(value: string): boolean {
  return /^\d{4,8}$/.test(value);
}

function fillTemplate(template: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce(
    (current, [key, value]) => current.replace(`{${key}}`, String(value)),
    template
  );
}

function formatDateTime(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "sk" ? "sk-SK" : "en-US", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}

export function ParentSettings({ labels, locale }: { labels: ParentSettingsLabels; locale: Locale }) {
  const { firebaseUser, loading: authLoading } = useAuth();
  const [profiles, setProfiles] = useState<ChildProfile[]>([]);
  const [selectedChildId, setSelectedChildId] = useState("");
  const [dailyGoalTasks, setDailyGoalTasks] = useState("10");
  const [timePressurePreference, setTimePressurePreference] =
    useState<TimePressureSelectValue>(defaultTimePressureValue);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [savingPreferences, setSavingPreferences] = useState(false);
  const [preferencesMessage, setPreferencesMessage] = useState<string | null>(null);
  const [preferencesError, setPreferencesError] = useState<string | null>(null);
  const [currentPin, setCurrentPin] = useState("");
  const [nextPin, setNextPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [changingPin, setChangingPin] = useState(false);
  const [pinMessage, setPinMessage] = useState<string | null>(null);
  const [pinError, setPinError] = useState<string | null>(null);

  const selectedChild = profiles.find((profile) => profile.id === selectedChildId) ?? null;

  const loadChildFormValues = useCallback((childProfile: ChildProfile) => {
    setDailyGoalTasks(String(Math.max(1, childProfile.dailyGoalMinutes)));
    setTimePressurePreference(childProfile.timePressurePreference ?? defaultTimePressureValue);
    setPreferencesMessage(null);
    setPreferencesError(null);
  }, []);

  useEffect(() => {
    const parentUserId = firebaseUser?.uid;

    if (authLoading || !parentUserId) {
      return;
    }

    const activeParentUserId = parentUserId;
    let cancelled = false;

    async function loadProfiles() {
      setLoadingProfiles(true);
      setLoadError(false);

      try {
        const nextProfiles = await listChildProfiles(activeParentUserId);
        const storedChildId = getSelectedChildProfileId();
        const nextSelectedChild = nextProfiles.find((profile) => profile.id === storedChildId) ?? nextProfiles[0];

        if (!cancelled) {
          setProfiles(nextProfiles);
          setSelectedChildId(nextSelectedChild?.id ?? "");

          if (nextSelectedChild) {
            setSelectedChildProfileId(nextSelectedChild.id);
            loadChildFormValues(nextSelectedChild);
          }
        }
      } catch {
        if (!cancelled) {
          setLoadError(true);
          setProfiles([]);
          setSelectedChildId("");
        }
      } finally {
        if (!cancelled) {
          setLoadingProfiles(false);
        }
      }
    }

    void loadProfiles();

    return () => {
      cancelled = true;
    };
  }, [authLoading, firebaseUser?.uid, loadChildFormValues]);

  function selectChild(childProfileId: string) {
    const nextSelectedChild = profiles.find((profile) => profile.id === childProfileId);

    setSelectedChildId(childProfileId);
    setSelectedChildProfileId(childProfileId);

    if (nextSelectedChild) {
      loadChildFormValues(nextSelectedChild);
    }
  }

  async function saveChildPreferences() {
    if (!selectedChild) {
      return;
    }

    const parsedGoal = Number(dailyGoalTasks);

    setPreferencesMessage(null);
    setPreferencesError(null);

    if (!Number.isInteger(parsedGoal) || parsedGoal < 1 || parsedGoal > 50) {
      setPreferencesError(labels.dailyGoalInvalid);
      return;
    }

    setSavingPreferences(true);

    try {
      const nextTimePressure =
        timePressurePreference === defaultTimePressureValue ? null : timePressurePreference;

      await updateChildProfileSettings(selectedChild.id, {
        dailyGoalMinutes: parsedGoal,
        timePressurePreference: nextTimePressure
      });

      setProfiles((currentProfiles) =>
        currentProfiles.map((profile) =>
          profile.id === selectedChild.id
            ? {
                ...profile,
                dailyGoalMinutes: parsedGoal,
                timePressurePreference: nextTimePressure ?? undefined,
                updatedAt: new Date()
              }
            : profile
        )
      );
      setPreferencesMessage(labels.preferencesSaved);
    } catch {
      setPreferencesError(labels.preferencesError);
    } finally {
      setSavingPreferences(false);
    }
  }

  async function changePin() {
    const parentUserId = firebaseUser?.uid;

    if (!parentUserId) {
      return;
    }

    setPinMessage(null);
    setPinError(null);

    if (!isPin(currentPin) || !isPin(nextPin) || !isPin(confirmPin)) {
      setPinError(labels.pinDigits);
      return;
    }

    if (nextPin !== confirmPin) {
      setPinError(labels.pinMismatch);
      return;
    }

    setChangingPin(true);

    try {
      const verification = await verifyParentPin(parentUserId, currentPin);

      if (verification.status === "locked") {
        setPinError(fillTemplate(labels.pinLocked, { time: formatDateTime(verification.lockedUntil, locale) }));
        return;
      }

      if (verification.status === "invalid") {
        setPinError(fillTemplate(labels.pinInvalid, { remaining: verification.remainingAttempts }));
        return;
      }

      if (verification.status === "missing" || verification.status === "success") {
        await resetPinSettings(parentUserId, nextPin);
        setCurrentPin("");
        setNextPin("");
        setConfirmPin("");
        setPinMessage(labels.pinSaved);
      }
    } catch {
      setPinError(labels.pinSaveError);
    } finally {
      setChangingPin(false);
    }
  }

  if (authLoading || loadingProfiles) {
    return (
      <div className="flex min-h-48 items-center gap-3 text-sm font-semibold text-slate-600">
        <Loader2 aria-hidden="true" className="animate-spin" size={18} />
        {labels.loading}
      </div>
    );
  }

  if (loadError) {
    return (
      <section className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm font-semibold text-amber-900">
        {labels.loadError}
      </section>
    );
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <SlidersHorizontal aria-hidden="true" className="mt-1 text-emerald-700" size={22} />
          <div>
            <h2 className="text-xl font-bold text-slate-950">{labels.childSectionTitle}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{labels.childSectionDescription}</p>
          </div>
        </div>

        {profiles.length === 0 ? (
          <div className="mt-5 rounded-lg border border-sky-200 bg-sky-50 p-4">
            <h3 className="font-bold text-slate-950">{labels.noChildrenTitle}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">{labels.noChildrenDescription}</p>
            <Link
              className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
              href="/parent/children"
            >
              <UsersRound aria-hidden="true" size={18} />
              {labels.createChildButton}
            </Link>
          </div>
        ) : (
          <div className="mt-5 grid gap-4">
            <label className="grid gap-2 text-sm font-bold text-slate-800">
              {labels.childSelectorLabel}
              <select
                className="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                value={selectedChildId}
                onChange={(event) => selectChild(event.target.value)}
              >
                {profiles.map((profile) => (
                  <option key={profile.id} value={profile.id}>
                    {profile.displayName}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-bold text-slate-800">
              {labels.dailyGoalLabel}
              <input
                className="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                inputMode="numeric"
                max={50}
                min={1}
                type="number"
                value={dailyGoalTasks}
                onChange={(event) => {
                  setDailyGoalTasks(event.target.value);
                  setPreferencesMessage(null);
                  setPreferencesError(null);
                }}
              />
              <span className="text-xs font-medium leading-5 text-slate-500">{labels.dailyGoalHelp}</span>
            </label>

            <label className="grid gap-2 text-sm font-bold text-slate-800">
              {labels.timePressureLabel}
              <select
                className="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                value={timePressurePreference}
                onChange={(event) => {
                  setTimePressurePreference(event.target.value as TimePressureSelectValue);
                  setPreferencesMessage(null);
                  setPreferencesError(null);
                }}
              >
                <option value={defaultTimePressureValue}>{labels.timePressureOptions.level_default}</option>
                {timePressureValues.map((value) => (
                  <option key={value} value={value}>
                    {labels.timePressureOptions[value]}
                  </option>
                ))}
              </select>
              <span className="text-xs font-medium leading-5 text-slate-500">{labels.timePressureHelp}</span>
            </label>

            {preferencesError ? (
              <p aria-live="polite" className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
                {preferencesError}
              </p>
            ) : null}
            {preferencesMessage ? (
              <p aria-live="polite" className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900">
                {preferencesMessage}
              </p>
            ) : null}

            <button
              className="inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={savingPreferences}
              type="button"
              onClick={() => void saveChildPreferences()}
            >
              {savingPreferences ? <Loader2 aria-hidden="true" className="animate-spin" size={18} /> : <Save aria-hidden="true" size={18} />}
              {savingPreferences ? labels.savingPreferences : labels.savePreferences}
            </button>
          </div>
        )}
      </section>

      <div className="grid gap-5">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <KeyRound aria-hidden="true" className="mt-1 text-emerald-700" size={22} />
            <div>
              <h2 className="text-xl font-bold text-slate-950">{labels.pinSectionTitle}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{labels.pinSectionDescription}</p>
            </div>
          </div>

          <div className="mt-5 grid gap-4">
            <PinInput
              label={labels.currentPinLabel}
              placeholder={labels.pinPlaceholder}
              value={currentPin}
              onChange={setCurrentPin}
            />
            <PinInput label={labels.nextPinLabel} placeholder={labels.pinPlaceholder} value={nextPin} onChange={setNextPin} />
            <PinInput
              label={labels.confirmPinLabel}
              placeholder={labels.pinPlaceholder}
              value={confirmPin}
              onChange={setConfirmPin}
            />

            {pinError ? (
              <p aria-live="polite" className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
                {pinError}
              </p>
            ) : null}
            {pinMessage ? (
              <p aria-live="polite" className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900">
                {pinMessage}
              </p>
            ) : null}

            <button
              className="inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={changingPin}
              type="button"
              onClick={() => void changePin()}
            >
              {changingPin ? <Loader2 aria-hidden="true" className="animate-spin" size={18} /> : <ShieldCheck aria-hidden="true" size={18} />}
              {changingPin ? labels.changingPin : labels.changePin}
            </button>
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <Bell aria-hidden="true" className="mt-1 text-sky-700" size={22} />
            <div>
              <h2 className="text-xl font-bold text-slate-950">{labels.notificationsTitle}</h2>
              <p className="mt-2 text-sm font-bold uppercase text-sky-700">{labels.notificationsStatus}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{labels.notificationsDescription}</p>
            </div>
          </div>
          <div className="mt-4 grid gap-2 text-sm text-slate-700">
            <p className="rounded-md bg-slate-50 px-3 py-2">{labels.webPushPlaceholder}</p>
            <p className="rounded-md bg-slate-50 px-3 py-2">{labels.fcmPlaceholder}</p>
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <UsersRound aria-hidden="true" className="mt-1 text-emerald-700" size={22} />
            <div>
              <h2 className="text-xl font-bold text-slate-950">{labels.manageChildrenTitle}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{labels.manageChildrenDescription}</p>
              <Link
                className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                href="/parent/children"
              >
                <UsersRound aria-hidden="true" size={18} />
                {labels.manageChildrenButton}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function PinInput({
  label,
  onChange,
  placeholder,
  value
}: {
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-800">
      {label}
      <input
        autoComplete="off"
        className="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
        inputMode="numeric"
        maxLength={8}
        minLength={4}
        placeholder={placeholder}
        type="password"
        value={value}
        onChange={(event) => onChange(event.target.value.replace(/\D/g, ""))}
      />
    </label>
  );
}
