# MVP Route Inventory

This inventory describes visible MVP routes and their current boundaries. It is not a claim that every route is production-complete.

## Public And User-Facing Routes

| Route | Purpose | Audience | Local-only note | Link from public navigation? |
| --- | --- | --- | --- | --- |
| `/` | Public landing page and first-run entry. | Families evaluating the MVP. | No preview data is created here. | Yes. |
| `/child` | Child preview start page, optional local profile, and preview continuation. | Child with a parent. | The optional nickname, grade hint, and preview continuation are browser-local. | Yes. |
| `/parent` | Parent entry and local MVP context. | Parent. | Local preview information is not account analytics. | Yes. |
| `/about/local-data` | Public explanation of browser-local profile and preview progress. | Families evaluating the MVP. | Explains local data only; it does not read browser storage. | Yes. |
| `/child/curriculum` | Active number-foundations preview path. | Child with a parent. | Completion is stored only in this browser. | Yes. |
| `/child/curriculum/quantity-and-number-sense` | First local-only preview lesson. | Child. | No account progress, diagnostics, or Firestore writes. | Linked from the active path. |
| `/child/curriculum/number-line-and-comparison` | Second local-only preview lesson. | Child. | No account progress, diagnostics, or Firestore writes. | Linked from the active path. |
| `/child/curriculum/addition-subtraction-to-20` | Third local-only preview lesson. | Child. | No account progress, diagnostics, or Firestore writes. | Linked from the active path. |
| `/child/curriculum/make-10-and-bridge-through-10` | Fourth local-only preview lesson. | Child. | No account progress, diagnostics, or Firestore writes. | Linked from the active path. |
| `/child/curriculum/addition-subtraction-to-100` | Fifth local-only preview lesson. | Child. | No account progress, diagnostics, or Firestore writes. | Linked from the active path. |

## Separate Parent And Account Areas

Separate protected parent/account areas may exist elsewhere in the app, but they are not part of this local preview route inventory. The `/parent` entry remains the only parent-facing route listed here because it is part of the visible first-run shell.

## Internal Routes

| Route | Purpose | Audience | Local-only note | Link from public navigation? |
| --- | --- | --- | --- | --- |
| `/internal/preview-paths` | Read-only developer/product overview of active and draft preview paths. | Developer/product review. | Does not read or write child local progress. | No. |
| `/internal/mvp-smoke-test` | Read-only launch checklist and manual demo script. | Developer/product review. | Does not read or write child local progress. | No. |

Internal routes must not be linked from public, child, or parent navigation unless an explicit product decision changes that boundary. Local preview routes are not official verified curriculum claims.

## Framework States

`app/not-found.tsx`, `app/global-error.tsx`, and `app/(child)/child/curriculum/loading.tsx` are framework states, not normal navigation destinations. They provide safe fallback, error, and loading UI without reading or writing preview progress.
