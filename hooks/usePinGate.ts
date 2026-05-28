"use client";

import { useEffect, useState } from "react";
import { hasActivePinSession, pinSessionChangedEventName } from "@/lib/pin/session";

export function usePinGate(parentUserId?: string): {
  unlocked: boolean;
  loading: boolean;
} {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    function refreshPinSession() {
      setUnlocked(parentUserId ? hasActivePinSession(parentUserId) : false);
    }

    refreshPinSession();
    window.addEventListener(pinSessionChangedEventName, refreshPinSession);
    window.addEventListener("storage", refreshPinSession);

    return () => {
      window.removeEventListener(pinSessionChangedEventName, refreshPinSession);
      window.removeEventListener("storage", refreshPinSession);
    };
  }, [parentUserId]);

  return {
    unlocked,
    loading: false
  };
}
