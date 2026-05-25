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

## Future-Ready Decisions

- `parentChildLinks` supports future child accounts and shared guardians.
- `notificationSettings` is documented for phase 2 but not required for MVP.
- Exercise generation is centralized so new visual models can be added without route rewrites.
- Mastery logic is deterministic and testable outside React.

## Ambiguities Resolved

- The scaffold uses root `app/` instead of `src/app/` to match the requested folder structure.
- The MVP uses client Firebase SDKs. Server-side admin SDK is avoided to keep setup simple and zero-budget.
- Parent dashboard route skeletons are present now, but charts are deferred until services and aggregate documents are implemented.
- No paid monitoring, email, SMS, payment, or AI service is included.
