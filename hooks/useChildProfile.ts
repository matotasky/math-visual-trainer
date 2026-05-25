"use client";

import type { ChildProfile } from "@/types";

export function useChildProfile(): {
  selectedChild: ChildProfile | null;
  loading: boolean;
  error: string | null;
} {
  return {
    selectedChild: null,
    loading: false,
    error: null
  };
}
