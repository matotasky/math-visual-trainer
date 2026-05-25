import type { MeaningfulActivityInput } from "@/types";

export function isMeaningfulActivity(input: MeaningfulActivityInput): boolean {
  return input.completedSession || input.attemptsCount >= 8 || input.activeMinutes >= 5;
}
