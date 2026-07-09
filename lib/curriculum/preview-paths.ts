import {
  previewLearningPaths,
  type PreviewPathId
} from "@/data/curriculum/sk-math/preview-paths";
import type { PreviewLessonId } from "@/lib/curriculum/local-preview-progress";
import type { Locale } from "@/types";

export function getLocalizedPreviewPath(pathId: PreviewPathId, locale: Locale) {
  const path = previewLearningPaths.find((previewPath) => previewPath.id === pathId) ?? previewLearningPaths[0];

  return {
    id: path.id,
    status: path.status,
    title: path.title[locale],
    description: path.description[locale],
    audienceNote: path.audienceNote[locale],
    localOnlyNote: path.localOnlyNote[locale],
    lessons: path.lessons.map((lesson) => ({
      id: lesson.id,
      step: lesson.step,
      title: lesson.title[locale],
      description: lesson.description[locale],
      href: lesson.href,
      buttonLabel: lesson.buttonLabel[locale]
    })),
    skillsByLesson: Object.fromEntries(
      path.lessons.map((lesson) => [lesson.id, lesson.skills[locale]])
    ) as Record<PreviewLessonId, string[]>
  };
}

export type { PreviewPathId };
