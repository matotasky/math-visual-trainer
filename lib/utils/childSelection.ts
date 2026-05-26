export const selectedChildProfileStorageKey = "math-visual-trainer:selected-child-profile-id";

export function getSelectedChildProfileId(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(selectedChildProfileStorageKey);
}

export function setSelectedChildProfileId(childProfileId: string): void {
  window.localStorage.setItem(selectedChildProfileStorageKey, childProfileId);
}
