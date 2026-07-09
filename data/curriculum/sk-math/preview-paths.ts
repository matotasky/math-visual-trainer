import {
  learningPathPreviewLessonsCopy,
  previewSkillsByLessonCopy
} from "@/data/curriculum/sk-math/preview-copy";
import type { PreviewLessonId } from "@/lib/curriculum/local-preview-progress";
import type { Locale } from "@/types";

export type PreviewPathId = "cycle_1_number_foundations";

export type PreviewPathLessonConfig = {
  id: PreviewLessonId;
  step: number;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  href: string;
  buttonLabel: Record<Locale, string>;
  skills: Record<Locale, string[]>;
};

export type PreviewPathConfig = {
  id: PreviewPathId;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  lessons: PreviewPathLessonConfig[];
};

export const previewLearningPaths: PreviewPathConfig[] = [
  {
    id: "cycle_1_number_foundations",
    title: {
      sk: "Základy čísel pre 1. cyklus",
      en: "Number foundations for cycle 1"
    },
    description: {
      sk: "Päť pokojne radených ukážkových lekcií od množstva po počítanie do 100.",
      en: "Five calm preview lessons from quantity to calculations up to 100."
    },
    lessons: learningPathPreviewLessonsCopy.map((lesson) => ({
      ...lesson,
      skills: previewSkillsByLessonCopy[lesson.id]
    }))
  }
];
