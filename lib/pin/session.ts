const pinSessionPrefix = "math-visual-trainer:pin-session";

export function getPinSessionKey(parentUserId: string): string {
  return `${pinSessionPrefix}:${parentUserId}`;
}

export function hasActivePinSession(parentUserId: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.sessionStorage.getItem(getPinSessionKey(parentUserId)) === "unlocked";
}

export function setActivePinSession(parentUserId: string): void {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(getPinSessionKey(parentUserId), "unlocked");
}

export function clearActivePinSession(parentUserId: string): void {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.removeItem(getPinSessionKey(parentUserId));
}
