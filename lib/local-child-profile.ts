export type LocalChildProfile = {
  nickname: string;
  grade: "grade_1" | "grade_2" | "grade_3" | "grade_4" | "grade_5";
  createdAt: string;
  updatedAt: string;
};

const STORAGE_KEY = "math_visual_trainer_local_child_profile_v1";
const PROFILE_CHANGED_EVENT = "math-visual-trainer-local-child-profile-changed";
const allowedGrades = new Set<LocalChildProfile["grade"]>([
  "grade_1",
  "grade_2",
  "grade_3",
  "grade_4",
  "grade_5"
]);

const gradeLabels: Record<LocalChildProfile["grade"], string> = {
  grade_1: "1. ročník",
  grade_2: "2. ročník",
  grade_3: "3. ročník",
  grade_4: "4. ročník",
  grade_5: "5. ročník"
};

let cachedProfile: LocalChildProfile | null | undefined;

export function getLocalChildProfile(): LocalChildProfile | null {
  if (cachedProfile !== undefined) {
    return cachedProfile;
  }

  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      cachedProfile = null;
      return cachedProfile;
    }

    const parsedValue: unknown = JSON.parse(storedValue);

    if (!isLocalChildProfile(parsedValue)) {
      cachedProfile = null;
      return cachedProfile;
    }

    cachedProfile = parsedValue;
    return cachedProfile;
  } catch {
    cachedProfile = null;
    return cachedProfile;
  }
}

export function saveLocalChildProfile(input: {
  nickname: string;
  grade: LocalChildProfile["grade"];
}): LocalChildProfile {
  const existingProfile = getLocalChildProfile();
  const now = new Date().toISOString();
  const profile: LocalChildProfile = {
    nickname: normalizeNickname(input.nickname),
    grade: allowedGrades.has(input.grade) ? input.grade : "grade_1",
    createdAt: existingProfile?.createdAt ?? now,
    updatedAt: now
  };
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      cachedProfile = profile;
      notifyProfileChanged();
    } catch {
      // Local profile is a browser convenience only. Ignore unavailable storage.
    }
  }

  return profile;
}

export function clearLocalChildProfile(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(STORAGE_KEY);
    cachedProfile = null;
    notifyProfileChanged();
  } catch {
    // Local profile is a browser convenience only. Ignore unavailable storage.
  }
}

export function getLocalChildGradeLabel(grade: LocalChildProfile["grade"]): string {
  return gradeLabels[grade];
}

export function subscribeToLocalChildProfileChanges(callback: () => void): () => void {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  function handleStorage(event: StorageEvent) {
    if (event.key === STORAGE_KEY) {
      cachedProfile = undefined;
      callback();
    }
  }

  window.addEventListener(PROFILE_CHANGED_EVENT, callback);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(PROFILE_CHANGED_EVENT, callback);
    window.removeEventListener("storage", handleStorage);
  };
}

function normalizeNickname(nickname: string): string {
  const trimmedNickname = nickname.trim().slice(0, 32);

  return trimmedNickname.length > 0 ? trimmedNickname : "Dieťa";
}

function isLocalChildProfile(value: unknown): value is LocalChildProfile {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<LocalChildProfile>;

  return (
    typeof candidate.nickname === "string" &&
    candidate.nickname.length > 0 &&
    candidate.nickname.length <= 32 &&
    typeof candidate.createdAt === "string" &&
    typeof candidate.updatedAt === "string" &&
    typeof candidate.grade === "string" &&
    allowedGrades.has(candidate.grade)
  );
}

function notifyProfileChanged() {
  window.dispatchEvent(new Event(PROFILE_CHANGED_EVENT));
}
