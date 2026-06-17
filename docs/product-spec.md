# Product Spec

## Product

Math Visual Trainer is a child-friendly arithmetic learning platform for visual understanding, guided practice, diagnostic testing, adaptive progression, and parent insight.

The MVP must work without paid subscriptions. The target stack is GitHub Free, Vercel Hobby, Firebase Authentication, and Firestore on a free-tier-compatible setup.

## Users

Primary user: a child learning early arithmetic.

Secondary user: a parent who manages child profiles and reviews progress, mistakes, test results, response time, and daily activity.

## MVP Assumptions

- The parent signs in with Google through Firebase Authentication.
- The parent creates one or more local child profiles.
- A child profile does not need its own Firebase Auth account in the MVP.
- The data model supports a future linked child Google account through `linkedChildUserId`.
- Parent-only routes are protected by Firebase Auth and a child-resistant PIN gate.

## Modes

Diagnostic mode determines a child's starting level with friendly, low-pressure tasks:

- Quantity recognition and number matching as a quick foundation check
- Addition and subtraction to 10
- Make 10
- Bridge through 10
- Addition and subtraction to 20
- Whole tens to 100
- Simple two-digit arithmetic without regrouping

Low-number tasks are retained for remediation, but the default training path for an older child starts with addition and subtraction to 10 rather than counting to 5.

Learn mode teaches with visual explanations, hints, and retries without time pressure.

Practice mode builds fluency with mild time tracking, immediate feedback, targeted tasks, and stored attempts.

Test mode measures mastery with fixed task counts, timed answers, no hints, final scores, and parent-visible reports.

Challenge mode motivates speed only after sufficient mastery. It uses short timed rounds, XP-like scoring, and streak contribution.

## Required Routes

Public:

- `/landing`
- `/login`

Child:

- `/child`
- `/child/diagnostic`
- `/child/learn`
- `/child/practice`
- `/child/test`
- `/child/challenge`
- `/child/rewards`

Parent:

- `/parent/pin`
- `/parent/dashboard`
- `/parent/results`
- `/parent/mistakes`
- `/parent/progress`
- `/parent/settings`
- `/parent/children`

Fallback:

- `/not-found`

## MVP Success Criteria

- A parent can authenticate with Google.
- A parent can create and select a child profile.
- A child can complete diagnostic, learn, practice, test, and challenge flows.
- Attempts are persisted with timing, correctness, operands, topic, level, visual model, and hint usage.
- Aggregates support low-read parent dashboards.
- Parent analytics show mastery, progress, slow topics, mistakes, and recommended next focus.
- The app avoids paid APIs and paid operational dependencies.
