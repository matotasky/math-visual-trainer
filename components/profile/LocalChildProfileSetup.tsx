"use client";

import { useState, useSyncExternalStore } from "react";
import {
  clearLocalChildProfile,
  getLocalChildGradeLabel,
  getLocalChildProfile,
  saveLocalChildProfile,
  subscribeToLocalChildProfileChanges,
  type LocalChildProfile
} from "@/lib/local-child-profile";

const grades: LocalChildProfile["grade"][] = ["grade_1", "grade_2", "grade_3", "grade_4", "grade_5"];

export function LocalChildProfileSetup() {
  const profile = useSyncExternalStore(subscribeToLocalChildProfileChanges, getLocalChildProfile, () => null);
  const [editing, setEditing] = useState(false);
  const [nickname, setNickname] = useState("");
  const [grade, setGrade] = useState<LocalChildProfile["grade"]>("grade_1");

  function handleSave() {
    const savedProfile = saveLocalChildProfile({ nickname, grade });
    setNickname(savedProfile.nickname);
    setGrade(savedProfile.grade);
    setEditing(false);
  }

  function handleClear() {
    clearLocalChildProfile();
    setNickname("");
    setGrade("grade_1");
    setEditing(true);
  }

  function handleEdit() {
    if (profile) {
      setNickname(profile.nickname);
      setGrade(profile.grade);
    }

    setEditing(true);
  }

  const showForm = editing || !profile;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <p className="text-sm font-black uppercase text-emerald-700">MVP lokálne</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">Lokálny profil dieťaťa</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
          Pomôže nám osloviť dieťa menom a ukázať ročník. Ukladá sa iba v tomto prehliadači.
        </p>
      </div>

      {profile && !showForm ? (
        <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm font-black uppercase text-emerald-800">Uložený lokálny profil</p>
          <p className="mt-2 text-2xl font-black text-slate-950">{profile.nickname}</p>
          <p className="mt-1 text-sm font-bold text-slate-700">{getLocalChildGradeLabel(profile.grade)}</p>
          <p className="mt-3 text-sm font-semibold leading-6 text-emerald-950">
            Tento profil nie je účet a neposiela sa na server.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button
              className="min-h-11 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-black text-slate-800 transition hover:bg-slate-50"
              onClick={handleEdit}
              type="button"
            >
              Upraviť
            </button>
            <button
              className="min-h-11 rounded-xl border border-rose-200 bg-white px-4 py-2 text-sm font-black text-rose-700 transition hover:bg-rose-50"
              onClick={handleClear}
              type="button"
            >
              Vymazať lokálny profil
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-5 grid gap-4">
          <label className="grid gap-2 text-sm font-black text-slate-800">
            Meno alebo prezývka
            <input
              className="min-h-12 rounded-xl border border-slate-300 bg-white px-4 py-2 text-base font-semibold text-slate-950 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              maxLength={32}
              onChange={(event) => setNickname(event.target.value)}
              placeholder="Dieťa"
              type="text"
              value={nickname}
            />
          </label>

          <label className="grid gap-2 text-sm font-black text-slate-800">
            Ročník
            <select
              className="min-h-12 rounded-xl border border-slate-300 bg-white px-4 py-2 text-base font-semibold text-slate-950 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              onChange={(event) => setGrade(event.target.value as LocalChildProfile["grade"])}
              value={grade}
            >
              {grades.map((gradeOption) => (
                <option key={gradeOption} value={gradeOption}>
                  {getLocalChildGradeLabel(gradeOption)}
                </option>
              ))}
            </select>
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              className="min-h-12 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800"
              onClick={handleSave}
              type="button"
            >
              Uložiť lokálny profil
            </button>
            {profile ? (
              <button
                className="min-h-12 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800 transition hover:bg-slate-50"
                onClick={() => setEditing(false)}
                type="button"
              >
                Zrušiť
              </button>
            ) : null}
          </div>
          <p className="rounded-2xl border border-sky-200 bg-sky-50 p-3 text-sm font-bold leading-6 text-sky-950">
            Tento profil nie je účet a neposiela sa na server.
          </p>
        </div>
      )}
    </section>
  );
}
