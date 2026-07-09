import { previewLearningPaths } from "@/data/curriculum/sk-math/preview-paths";
import type { Locale } from "@/types";

export type PreviewPathValidationIssue = {
  pathId: string;
  message: string;
};

const requiredLocales: Locale[] = ["sk", "en"];
const validStatuses = new Set(["active", "draft"]);

function hasText(value: string | undefined): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

function addLocalizedTextIssues(
  issues: PreviewPathValidationIssue[],
  pathId: string,
  label: string,
  values: Partial<Record<Locale, string>>
) {
  requiredLocales.forEach((locale) => {
    if (!hasText(values[locale])) {
      issues.push({
        pathId,
        message: `${label} is missing ${locale} text.`
      });
    }
  });
}

export function validatePreviewLearningPaths(): PreviewPathValidationIssue[] {
  const issues: PreviewPathValidationIssue[] = [];

  previewLearningPaths.forEach((path) => {
    const pathId = path.id || "unknown_preview_path";

    if (!hasText(path.id)) {
      issues.push({
        pathId,
        message: "Preview path id is missing."
      });
    }

    addLocalizedTextIssues(issues, pathId, "Preview path title", path.title);
    addLocalizedTextIssues(issues, pathId, "Preview path description", path.description);
    addLocalizedTextIssues(issues, pathId, "Preview path audience note", path.audienceNote);
    addLocalizedTextIssues(issues, pathId, "Preview path local-only note", path.localOnlyNote);

    if (!validStatuses.has(path.status)) {
      issues.push({
        pathId,
        message: `Preview path status "${path.status}" must be active or draft.`
      });
    }

    if (path.status === "active" && path.lessons.length === 0) {
      issues.push({
        pathId,
        message: "Active preview path must contain at least one lesson."
      });
    }

    const lessonIds = new Set<string>();

    path.lessons.forEach((lesson, index) => {
      const expectedStep = index + 1;
      const lessonLabel = lesson.id || `lesson_at_index_${index}`;

      if (lessonIds.has(lesson.id)) {
        issues.push({
          pathId,
          message: `Lesson id "${lesson.id}" is duplicated within the path.`
        });
      }

      lessonIds.add(lesson.id);

      if (lesson.step !== expectedStep) {
        issues.push({
          pathId,
          message: `Lesson "${lessonLabel}" has step ${lesson.step}; expected ${expectedStep}.`
        });
      }

      addLocalizedTextIssues(issues, pathId, `Lesson "${lessonLabel}" title`, lesson.title);
      addLocalizedTextIssues(issues, pathId, `Lesson "${lessonLabel}" description`, lesson.description);
      addLocalizedTextIssues(issues, pathId, `Lesson "${lessonLabel}" button label`, lesson.buttonLabel);

      if (!hasText(lesson.href)) {
        issues.push({
          pathId,
          message: `Lesson "${lessonLabel}" href is missing.`
        });
      }

      requiredLocales.forEach((locale) => {
        const skills = lesson.skills[locale];

        if (!Array.isArray(skills) || skills.length === 0 || skills.some((skill) => !hasText(skill))) {
          issues.push({
            pathId,
            message: `Lesson "${lessonLabel}" skills are missing or empty for ${locale}.`
          });
        }
      });
    });
  });

  return issues;
}
