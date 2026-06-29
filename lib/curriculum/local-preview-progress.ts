export type PreviewLessonId =
  | "quantity_and_number_sense"
  | "number_line_and_comparison"
  | "addition_subtraction_to_20";

const STORAGE_KEY = "math_visual_trainer_preview_progress_v1";

const previewLessonIds = new Set<PreviewLessonId>([
  "quantity_and_number_sense",
  "number_line_and_comparison",
  "addition_subtraction_to_20"
]);

function isPreviewLessonId(value: unknown): value is PreviewLessonId {
  return typeof value === "string" && previewLessonIds.has(value as PreviewLessonId);
}

export function getCompletedPreviewLessons(): PreviewLessonId[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return [];
    }

    const parsedValue: unknown = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return [...new Set(parsedValue.filter(isPreviewLessonId))];
  } catch {
    return [];
  }
}

export function markPreviewLessonCompleted(lessonId: PreviewLessonId): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const completedLessons = getCompletedPreviewLessons();
    const nextCompletedLessons = completedLessons.includes(lessonId)
      ? completedLessons
      : [...completedLessons, lessonId];

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextCompletedLessons));
  } catch {
    // Local preview progress is a convenience only. Ignore unavailable storage.
  }
}

export function isPreviewLessonCompleted(lessonId: PreviewLessonId): boolean {
  return getCompletedPreviewLessons().includes(lessonId);
}

export function clearPreviewLessonProgress(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Local preview progress is a convenience only. Ignore unavailable storage.
  }
}
