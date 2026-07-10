"use client";

import { PreviewLessonCompletionPanel } from "@/components/curriculum/PreviewLessonCompletionPanel";

export type PreviewCompletionNextStep = {
  href: string;
  label: string;
  description: string;
};

type PreviewCompletionPanelProps = {
  isVisible: boolean;
  nextStep?: PreviewCompletionNextStep;
  finalMessage?: string;
};

export function PreviewCompletionPanel({
  finalMessage = "Dokončil/a si prvú ukážkovú cestu.",
  isVisible,
  nextStep
}: PreviewCompletionPanelProps) {
  if (!isVisible) {
    return null;
  }

  return <PreviewLessonCompletionPanel finalMessage={finalMessage} nextStep={nextStep} />;
}
