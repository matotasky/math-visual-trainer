import { getCompletedPreviewLessons, type PreviewLessonId } from "@/lib/curriculum/local-preview-progress";
import { getLocalizedPreviewPath } from "@/lib/curriculum/preview-paths";
import type { Locale } from "@/types";

const fallbackLessonId: PreviewLessonId = "quantity_and_number_sense";
const fallbackLessonHref = "/child/curriculum/quantity-and-number-sense";
const fallbackLessonTitle = "Množstvo a porozumenie číslam";

export type LocalPreviewPathProgress = {
  completedCount: number;
  totalCount: number;
  nextLessonHref: string;
  nextLessonTitle: string;
  nextLessonId: PreviewLessonId;
  isComplete: boolean;
};

export function getLocalPreviewPathProgress(locale: Locale = "sk"): LocalPreviewPathProgress {
  const path = getLocalizedPreviewPath("cycle_1_number_foundations", locale);
  const completedLessons = new Set(getCompletedPreviewLessons());
  const completedCount = path.lessons.filter((lesson) => completedLessons.has(lesson.id)).length;
  const isComplete = path.lessons.length > 0 && completedCount === path.lessons.length;
  const fallbackLesson = {
    id: fallbackLessonId,
    href: fallbackLessonHref,
    title: fallbackLessonTitle
  };
  const nextLesson = path.lessons.find((lesson) => !completedLessons.has(lesson.id)) ?? path.lessons[0] ?? fallbackLesson;

  return {
    completedCount,
    totalCount: path.lessons.length,
    nextLessonHref: nextLesson.href,
    nextLessonTitle: nextLesson.title,
    nextLessonId: nextLesson.id,
    isComplete
  };
}
