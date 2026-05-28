"use client";

import { KeyRound, Loader2, Lock } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { useAuth } from "@/hooks/useAuth";
import { createPinSettings, getPinSettings, resetPinSettings, verifyParentPin } from "@/lib/firestore";
import { setActivePinSession } from "@/lib/pin/session";

type ParentPinGateLabels = {
  title: string;
  description: string;
  setupTitle: string;
  setupDescription: string;
  enterTitle: string;
  enterDescription: string;
  resetTitle: string;
  resetDescription: string;
  pinLabel: string;
  pinPlaceholder: string;
  confirmPinLabel: string;
  unlockButton: string;
  createButton: string;
  resetButton: string;
  forgotPin: string;
  cancelReset: string;
  loading: string;
  saving: string;
  pinRequired: string;
  pinMismatch: string;
  invalidPin: string;
  lockedMessage: string;
  loadError: string;
};

type ParentPinGateProps = {
  labels: ParentPinGateLabels;
};

function safeNextPath(value: string | null): string {
  if (!value || !value.startsWith("/parent") || value.startsWith("/parent/pin")) {
    return "/parent/dashboard";
  }

  return value;
}

function formatTime(value: Date): string {
  return value.toLocaleTimeString("sk-SK", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

export function ParentPinGate({ labels }: ParentPinGateProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { firebaseUser } = useAuth();
  const [hasPin, setHasPin] = useState<boolean | null>(null);
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetMode, setResetMode] = useState(false);

  const nextPath = safeNextPath(searchParams.get("next"));
  const settingPin = !hasPin || resetMode;

  useEffect(() => {
    let cancelled = false;

    async function loadPinSettings() {
      const parentUserId = firebaseUser?.uid;

      if (!parentUserId) {
        if (!cancelled) {
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const settings = await getPinSettings(parentUserId);

        if (!cancelled) {
          setHasPin(Boolean(settings));
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

    void loadPinSettings();

    return () => {
      cancelled = true;
    };
  }, [firebaseUser?.uid, labels.loadError]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!firebaseUser || saving) {
      return;
    }

    if (!/^\d{4,8}$/.test(pin)) {
      setError(labels.pinRequired);
      return;
    }

    setSaving(true);
    setError(null);

    try {
      if (settingPin) {
        if (pin !== confirmPin) {
          setError(labels.pinMismatch);
          return;
        }

        if (resetMode) {
          await resetPinSettings(firebaseUser.uid, pin);
        } else {
          await createPinSettings(firebaseUser.uid, pin);
        }

        setActivePinSession(firebaseUser.uid);
        router.replace(nextPath);
        return;
      }

      const result = await verifyParentPin(firebaseUser.uid, pin);

      if (result.status === "success") {
        setActivePinSession(firebaseUser.uid);
        router.replace(nextPath);
        return;
      }

      if (result.status === "locked") {
        setError(labels.lockedMessage.replace("{time}", formatTime(result.lockedUntil)));
        return;
      }

      setError(labels.invalidPin.replace("{remaining}", String(result.status === "invalid" ? result.remainingAttempts : 0)));
    } catch {
      setError(labels.loadError);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
          <Loader2 aria-hidden="true" className="animate-spin" size={18} />
          {labels.loading}
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-md rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid h-12 w-12 place-items-center rounded-md bg-slate-100 text-slate-800">
        {hasPin && !resetMode ? <Lock aria-hidden="true" size={24} /> : <KeyRound aria-hidden="true" size={24} />}
      </div>
      <h2 className="mt-4 text-2xl font-bold text-slate-950">
        {resetMode ? labels.resetTitle : hasPin ? labels.enterTitle : labels.setupTitle}
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        {resetMode ? labels.resetDescription : hasPin ? labels.enterDescription : labels.setupDescription}
      </p>

      <form className="mt-5 grid gap-4" onSubmit={(event) => void handleSubmit(event)}>
        <label className="grid gap-2 text-sm font-semibold text-slate-800">
          {labels.pinLabel}
          <input
            className="min-h-12 rounded-md border border-slate-300 px-4 text-xl font-bold tracking-widest outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            inputMode="numeric"
            maxLength={8}
            placeholder={labels.pinPlaceholder}
            type="password"
            value={pin}
            onChange={(event) => {
              setPin(event.target.value);
              setError(null);
            }}
          />
        </label>

        {settingPin ? (
          <label className="grid gap-2 text-sm font-semibold text-slate-800">
            {labels.confirmPinLabel}
            <input
              className="min-h-12 rounded-md border border-slate-300 px-4 text-xl font-bold tracking-widest outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
              inputMode="numeric"
              maxLength={8}
              placeholder={labels.pinPlaceholder}
              type="password"
              value={confirmPin}
              onChange={(event) => {
                setConfirmPin(event.target.value);
                setError(null);
              }}
            />
          </label>
        ) : null}

        {error ? (
          <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-800">{error}</p>
        ) : null}

        <button
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={saving}
          type="submit"
        >
          {saving ? <Loader2 aria-hidden="true" className="animate-spin" size={18} /> : null}
          {saving ? labels.saving : resetMode ? labels.resetButton : hasPin ? labels.unlockButton : labels.createButton}
        </button>

        {hasPin ? (
          <button
            className="text-sm font-semibold text-slate-700 underline-offset-4 hover:underline"
            type="button"
            onClick={() => {
              setResetMode((current) => !current);
              setPin("");
              setConfirmPin("");
              setError(null);
            }}
          >
            {resetMode ? labels.cancelReset : labels.forgotPin}
          </button>
        ) : null}
      </form>
    </section>
  );
}
