# Preview Learning Path Maintenance

This checklist is for developer/product maintenance of local-only preview learning paths.

Preview paths are not diagnostics, account progress, mastery, Firestore data, or verified curriculum content.

## Add a New Preview Path

- Add the path id to `PreviewPathId` in `data/curriculum/sk-math/preview-paths.ts`.
- Choose `active` or `draft` status.
- Add localized path `title` and `description` for `sk` and `en`.
- Add localized `audienceNote` and `localOnlyNote`.
- Add ordered lessons with stable `step` values from `1..n`.
- Keep all lesson `href` values stable and route-backed.
- Add localized skill summaries for every lesson.
- Run `validatePreviewLearningPaths()` manually or through a future test.
- Update related documentation.

Draft paths may have no lessons while routes and lesson content are still being planned.

Active paths must have at least one lesson.

Do not render draft paths publicly until a later block intentionally enables them.

## Add a New Lesson

- Add a stable `PreviewLessonId` only when the lesson is intentionally part of local preview progress.
- Add localized lesson `title`, `description`, and `buttonLabel`.
- Add localized skills for `sk` and `en`.
- Keep the route local-only unless a later explicit block connects it elsewhere.
- Do not change existing lesson completion logic unless explicitly requested.

## Local-Only Constraints

- Do not add Firestore writes.
- Do not add backend writes.
- Do not add account progress.
- Do not add parent dashboard updates.
- Do not add session, attempt, or aggregate writes.
- Do not add diagnostic scoring.
- Do not add mastery progression.
- Do not add paid services or paid APIs.

## Read-only internal preview path index

The internal route `/internal/preview-paths` is for developer/product review only.

It lists active and draft preview paths, shows path metadata and lesson rows, and shows validation issues from `validatePreviewLearningPaths()`.

The route must remain read-only. Do not add forms, mutation buttons, stateful client behavior, `localStorage` writes, Firestore writes, diagnostics, mastery, account progress, dashboard writes, attempts, sessions, or aggregates.

Do not link this route from child-facing UI unless a later explicit product decision intentionally enables that.

Do not let this route change the selected preview path in `/child/curriculum`.

Do not add `/internal/preview-paths` to public, child, or parent MVP navigation. Child-facing MVP pages should only link to active preview experiences.

## Copy Localization

- Every path needs Slovak and English title and description.
- Every lesson needs Slovak and English title, description, and button label.
- Every lesson needs Slovak and English skill summaries.
- Child-facing copy should stay calm, non-evaluative, and clear about local-only behavior.

## Stable Hrefs

- Lesson `href` values should point to existing child curriculum preview routes.
- Do not repurpose a route for a different lesson meaning.
- Keep completed local progress ids stable unless an explicit migration plan exists.

## Shared Lesson Shell and Visual Helpers

- Preview lesson route pages should use the shared lesson shell for consistent child-facing structure.
- The shared shell must remain presentational and must not write local progress automatically.
- Lesson completion writes must stay explicit inside the lesson component and must remain browser-local only.
- Visual helpers must remain presentational. Do not add state, `localStorage`, Firestore, diagnostic scoring, mastery, attempts, sessions, aggregates, or dashboard behavior to them.
- Do not use visual helpers to imply verified curriculum alignment.

## Skills Mapping

- Skills are friendly summaries, not assessment outcomes.
- Skills are derived only from browser-local completion state.
- Skills must not imply diagnostic certainty or official curriculum verification.

## Verification Claims

- Do not claim official curriculum alignment unless the module and content have been manually reviewed.
- Do not change `verificationStatus` as part of preview path maintenance.
- Do not describe Visual Arithmetic remediation as an official curriculum requirement.
- Do not imply official verification from a draft preview path.

## Manual Smoke Test for `/child/curriculum`

- Open `/child/curriculum`.
- Confirm the preview path renders five lessons.
- Confirm local progress still appears as browser-local only.
- Open each lesson route and confirm it still loads.
- Complete a lesson and confirm progress updates only in the current browser.
- Clear local progress and confirm the path resets locally.
- Confirm parent guidance, cycles, and module preview still render.
- Confirm no Firestore, diagnostics, mastery, or dashboard data changes.
