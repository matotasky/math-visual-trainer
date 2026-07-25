# Architecture

## Architecture Goals

The application is structured as a production-oriented MVP, not a throwaway prototype. The first implementation favors clear ownership boundaries:

- Route files define navigation entry points only.
- UI components live in `components/`.
- Firebase client setup lives in `lib/firebase/`.
- Firestore calls live in `lib/firestore/`.
- Math generation and progression logic live in `lib/math-engine/`.
- Streak logic lives in `lib/streaks/`.
- PIN hashing and lockout logic live in `lib/pin/`.
- Shared domain models live in `types/`.
- Stable curriculum configuration lives in `data/`.

## Framework Decision

Use Next.js App Router with TypeScript and Tailwind CSS. The initial scaffold keeps routes simple and client-side Firebase auth focused in a provider. Firebase Auth and Firestore rules are the real security boundary.

Firebase SDKs are initialized lazily through getter functions to avoid build-time failures when environment variables are not present during static analysis.

## Route Groups

The root `app/` directory uses route groups:

- `app/(public)` for login and landing
- `app/(child)` for child learning routes
- `app/(parent)` for parent routes

Route groups keep the URLs clean while allowing separate layouts later.

## Auth Decision

MVP authentication uses Firebase Authentication with Google Sign-In for parents only. Child profiles are Firestore documents scoped to a parent account. A future child account can be linked through `ChildProfile.linkedChildUserId`.

Client route guards will provide user experience redirects. Firestore rules must enforce ownership because client guards are not security controls.

## Localization Decision

The MVP supports Slovak and English from the start. Slovak is the default locale. The server chooses a locale by checking, in order:

1. The explicit `mvt_locale` cookie set by the language switcher.
2. Vercel's `x-vercel-ip-country` request header when available.
3. The browser `Accept-Language` header.
4. Slovak as the fallback.

English is selected automatically for common English-speaking country codes or English browser preference. Slovak is selected for Slovakia, Czechia, and all unknown regions by default. This avoids paid geolocation APIs and keeps localization compatible with Vercel Hobby.

User-visible strings live in `lib/i18n/messages.ts`. Future feature work should add text to the dictionary instead of hardcoding copy in route components.

## Parent PIN Decision

The PIN gate is a child barrier, not the primary security layer. PIN hashes are stored in Firestore and compared client-side with the Web Crypto API. The default PIN is never shown in the UI and must be initialized during onboarding or settings flow.

The PIN module will support:

- Hashing with SHA-256 plus parent-scoped salt input
- Failed attempt tracking
- Temporary lockout after repeated failure
- Session-scoped unlock state in browser storage

## Data Flow

Exercise flow:

1. A route requests the next activity from `lib/math-engine`.
2. The child answers a generated exercise.
3. Validation creates an `ExerciseAttempt`.
4. Firestore service writes the raw attempt.
5. Aggregate services update `topicMastery`, `dailyStats`, `mistakeStats`, and `streaks`.
6. Parent dashboards read aggregates, not all raw attempts.

Dashboard flow:

1. Read selected child profile.
2. Read recent daily stats for the selected range.
3. Read topic mastery documents.
4. Read mistake aggregate documents.
5. Read streak document.
6. Read paginated sessions or attempts only in detailed history views.

## Firestore Cost Strategy

The dashboard must not load all attempts. Attempts are append-only details. Aggregates are updated when sessions and attempts are saved.

Realtime listeners are not used by default. One-time reads are preferred for dashboard screens. Detailed attempts must be paginated.

## Local MVP Runtime Boundaries

The local child profile is `localStorage` only. It stores a browser-local nickname and grade hint for MVP testing and does not create account data.

Preview lesson completion is also `localStorage` only. It is a browser-local convenience for the child preview path, not diagnostic scoring, mastery, or account progress.

Internal launch and smoke-test pages are read-only. They may list routes, statuses, validation notes, and maintenance warnings, but they must not write to Firestore or browser storage.

No new backend writes, Firestore collections, diagnostic scoring, mastery updates, attempts, sessions, aggregates, or dashboard writes should be introduced before an explicit product decision.

## Future-Ready Decisions

- `parentChildLinks` supports future child accounts and shared guardians.
- `notificationSettings` is documented for phase 2 but not required for MVP.
- Exercise generation is centralized so new visual models can be added without route rewrites.
- Mastery logic is deterministic and testable outside React.
- Curriculum levels use stable code IDs and a legacy mapping so existing child profiles created under the original low-number path can move into the newer fluency path without a Firestore migration.

## Ambiguities Resolved

- The scaffold uses root `app/` instead of `src/app/` to match the requested folder structure.
- The MVP uses client Firebase SDKs. Server-side admin SDK is avoided to keep setup simple and zero-budget.
- Parent dashboard route skeletons are present now, but charts are deferred until services and aggregate documents are implemented.
- Low-number tasks are diagnostic/remedial support, not the default path for a third-grade learner. The main progression starts with addition/subtraction to 10 and moves through two-digit and three-digit fluency.
- No paid monitoring, email, SMS, payment, or AI service is included.
