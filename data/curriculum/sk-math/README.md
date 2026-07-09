# Slovak Math Curriculum Data

This folder contains read-only curriculum and preview-path scaffold data for Math Visual Trainer.

## Files

- `areas.ts`: Slovak math curriculum area scaffold.
- `cycles.ts`: learning cycle scaffold.
- `modules.ts`: draft curriculum module map.
- `sources.ts`: official source metadata.
- `official-cycle-1-outline.ts`: read-only official Cycle 1 outline scaffold.
- `module-official-mapping.ts`: candidate or confirmed module-to-outline mappings.
- `verification-matrix.ts`: manual verification matrix.
- `review-evidence.ts`: manual evidence scaffold.
- `review-checklist.ts`: manual review checklist scaffold.
- `lesson-blueprints.ts`: draft lesson blueprint planning data.
- `assessment-blueprints.ts`: draft assessment blueprint planning data.
- `page-copy.ts`: localized static copy for `/child/curriculum`.
- `preview-copy.ts`: localized copy shared by preview learning path UI and parent/child guidance.
- `preview-paths.ts`: reusable local-only preview learning path model.

## Preview Path Data

`preview-paths.ts` defines reusable local-only preview learning paths. A preview path groups ordered mini-lessons, localized lesson copy, stable route hrefs, button labels, and local skill summary text.

The current path is `cycle_1_number_foundations`.

## Preview Copy

`preview-copy.ts` stores localized child and parent copy used by the preview path UI. It keeps `/child/curriculum` focused on composition instead of large inline copy objects.

## Page Copy

`page-copy.ts` stores static localized page copy such as cycle labels, area labels, module preview labels, and scaffold warnings.

## Must Stay Local-Only

Preview path data is only for browser-local preview UX. It must not create or imply account progress.

Do not add these here:

- Firestore writes
- `localStorage` writes
- diagnostic scoring
- mastery updates
- account progress
- parent dashboard updates
- paid services

## Adding a Future Preview Path Safely

1. Add a new path id to `PreviewPathId`.
2. Add lessons with localized `title`, `description`, `buttonLabel`, and `skills`.
3. Keep lesson `href` values stable and route-backed.
4. Verify no backend writes, account progress, diagnostics, mastery updates, or dashboard updates are introduced.
5. Update `docs/curriculum-sk-math-scaffold.md` and `docs/preview-learning-path-maintenance.md`.
