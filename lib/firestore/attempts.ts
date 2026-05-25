import type { ExerciseAttempt } from "@/types";

export async function saveAttempt(_attempt: ExerciseAttempt): Promise<void> {
  throw new Error("saveAttempt will write the raw attempt and trigger aggregate updates.");
}

export async function listAttemptsPage(
  _childProfileId: string,
  _pageSize: number
): Promise<ExerciseAttempt[]> {
  throw new Error("listAttemptsPage will use ordered, paginated Firestore queries.");
}
