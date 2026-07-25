# MVP Launch Readiness

Math Visual Trainer is now shaped as a visibly launchable MVP shell around the existing local-only curriculum preview path.

## Ready Now

- Public landing page at `/`.
- Child starting page at `/child`.
- Local-only child curriculum preview path at `/child/curriculum`.
- Five preview mini-lessons for number foundations.
- Parent-facing MVP entry page at `/parent`.
- Read-only internal preview path index at `/internal/preview-paths`.

## Local-Only Behavior

- Preview lesson completion is stored only in the current browser.
- Local preview progress is not account progress.
- Local preview progress is not diagnostic scoring.
- Local preview progress is not mastery or progression.
- Local preview progress does not write to Firestore, attempts, sessions, aggregates, or the parent dashboard.

## Child Lesson Experience

All five preview lessons now share a consistent lesson shell, calm local-only wording, parent tips, and a visible route back to the preview path.

Activities inside a lesson use local React state for the current step, selected answers, and friendly feedback.

Lesson completion remains browser-local preview completion through the existing local preview progress helper. It does not change diagnostics, mastery, Firestore, attempts, sessions, aggregates, account progress, or dashboard data.

## Local Child Profile MVP

The MVP can store an optional child nickname and grade in browser `localStorage` under `math_visual_trainer_local_child_profile_v1`.

This local child profile is a convenience for trying the app. It is not account data, not a secure identity, and is not sent to Firestore.

The profile does not affect diagnostics, mastery, attempts, sessions, aggregates, dashboard data, official curriculum decisions, or lesson unlocking.

Clearing browser data can remove the profile.

Smoke test notes:
- Create a local child profile on `/child`.
- Confirm the greeting and local progress summary appear on `/child`.
- Confirm `/parent` can show, edit, and clear the same browser-local profile.
- Confirm `/child/curriculum` still works without a profile.

## MVP Smoke Test Page

`/internal/mvp-smoke-test` is a read-only manual launch checklist for developer/product review.

It lists launch routes and readiness statuses, including ready, manual check, and blocked items.

The page does not write data and does not change local child profile, preview progress, Firestore, diagnostics, mastery, attempts, sessions, aggregates, dashboard data, or account progress.

It must not be shown as child-facing UI and must not be linked from public, child, or parent navigation.

## Not Yet Production-Grade

- The local preview path is not a full curriculum product.
- Parent account analytics remain separate from the local preview experience.
- Official Slovak curriculum mapping is not publicly verified.
- Diagnostic, mastery, and account progress must not be inferred from local preview completion.

## Smoke Test Routes

- `/`
- `/child`
- `/child/curriculum`
- `/child/curriculum/quantity-and-number-sense`
- `/child/curriculum/number-line-and-comparison`
- `/child/curriculum/addition-subtraction-to-20`
- `/child/curriculum/make-10-and-bridge-through-10`
- `/child/curriculum/addition-subtraction-to-100`
- `/parent`
- `/internal/preview-paths`

## No-Claims Rule

Do not claim official Slovak curriculum alignment until the relevant modules, lesson content, assessment content, and public wording have been manually verified.

Use wording such as preview, draft, scaffold, local-only, or in preparation until verification is complete.

## No-Backend-Expansion Rule

Do not add new backend writes, Firestore collections, Cloud Functions, Admin SDK usage, paid services, email, SMS, payment flows, or analytics integrations before an explicit product decision.

The MVP shell is UI, navigation, and copy. It does not expand persistence or account data behavior.
