"use client";

import { useMemo } from "react";
import { hasActivePinSession } from "@/lib/pin/session";

export function usePinGate(parentUserId?: string): {
  unlocked: boolean;
  loading: boolean;
} {
  return useMemo(
    () => ({
      unlocked: parentUserId ? hasActivePinSession(parentUserId) : false,
      loading: false
    }),
    [parentUserId]
  );
}
