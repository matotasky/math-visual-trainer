"use client";

import { useEffect, useState } from "react";
import { getChildProfile } from "@/lib/firestore";
import { getSelectedChildProfileId } from "@/lib/utils/childSelection";
import type { ChildProfile } from "@/types";
import { useAuth } from "./useAuth";

export function useChildProfile(): {
  selectedChild: ChildProfile | null;
  loading: boolean;
  error: string | null;
} {
  const { firebaseUser, loading: authLoading } = useAuth();
  const parentUserId = firebaseUser?.uid;
  const [selectedChild, setSelectedChild] = useState<ChildProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadSelectedChild() {
      if (authLoading) {
        return;
      }

      if (!parentUserId) {
        if (!cancelled) {
          setSelectedChild(null);
          setLoading(false);
        }
        return;
      }

      const selectedChildProfileId = getSelectedChildProfileId();

      if (!selectedChildProfileId) {
        if (!cancelled) {
          setSelectedChild(null);
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const profile = await getChildProfile(selectedChildProfileId);

        if (!cancelled) {
          setSelectedChild(profile);
        }
      } catch {
        if (!cancelled) {
          setSelectedChild(null);
          setError("child_profile_load_failed");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadSelectedChild();

    return () => {
      cancelled = true;
    };
  }, [authLoading, parentUserId]);

  return {
    selectedChild,
    loading,
    error
  };
}
