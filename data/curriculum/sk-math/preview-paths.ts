import {
  learningPathPreviewLessonsCopy,
  previewSkillsByLessonCopy
} from "@/data/curriculum/sk-math/preview-copy";
import type { PreviewLessonId } from "@/lib/curriculum/local-preview-progress";
import type { Locale } from "@/types";

export type PreviewPathId = "cycle_1_number_foundations" | "cycle_1_geometry_foundations";

export type PreviewPathStatus = "active" | "draft";

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
  status: PreviewPathStatus;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  audienceNote: Record<Locale, string>;
  localOnlyNote: Record<Locale, string>;
  lessons: PreviewPathLessonConfig[];
};

export const previewLearningPaths: PreviewPathConfig[] = [
  {
    id: "cycle_1_number_foundations",
    status: "active",
    title: {
      sk: "Základy čísel pre 1. cyklus",
      en: "Number foundations for cycle 1"
    },
    description: {
      sk: "Päť pokojne radených ukážkových lekcií od množstva po počítanie do 100.",
      en: "Five calm preview lessons from quantity to calculations up to 100."
    },
    audienceNote: {
      sk: "Pre dieťa a rodiča na pokojné domáce vyskúšanie.",
      en: "For a child and parent to try calmly at home."
    },
    localOnlyNote: {
      sk: "Táto cesta používa iba lokálny progres v prehliadači.",
      en: "This path uses only browser-local progress."
    },
    lessons: learningPathPreviewLessonsCopy.map((lesson) => ({
      ...lesson,
      skills: previewSkillsByLessonCopy[lesson.id]
    }))
  },
  {
    id: "cycle_1_geometry_foundations",
    status: "draft",
    title: {
      sk: "Tvary a priestor pre 1. cyklus",
      en: "Shapes and space for cycle 1"
    },
    description: {
      sk: "Budúca ukážková cesta pre tvary, orientáciu v priestore a prvé meranie.",
      en: "A future preview path for shapes, spatial orientation, and first measurement."
    },
    audienceNote: {
      sk: "Príprava pre pokojné domáce vizuálne precvičovanie geometrie.",
      en: "Preparation for calm visual geometry practice at home."
    },
    localOnlyNote: {
      sk: "Po aktivovaní bude cesta používať iba lokálny progres v prehliadači.",
      en: "When activated, this path will use only browser-local progress."
    },
    lessons: []
  }
];
