export type CurriculumPreviewGuardResult = {
  canRenderPreview: boolean;
  canScore: boolean;
  canWriteProgress: boolean;
  canClaimVerified: boolean;
  warning: string;
};

export function getQuantityAndNumberSensePreviewGuard(): CurriculumPreviewGuardResult {
  return {
    canRenderPreview: true,
    canScore: false,
    canWriteProgress: false,
    canClaimVerified: false,
    warning:
      "Toto je ukážková lekcia. Nie je hodnotená, nezapisuje pokrok do účtu a ešte nie je finálne overená."
  };
}
