"use client";

import type { LearningSession } from "@/types";

export function useCurrentSession(): {
  session: LearningSession | null;
  loading: boolean;
} {
  return {
    session: null,
    loading: false
  };
}
