# Free-Tier Strategy

## Constraint

The MVP must run without paid subscriptions. It must be compatible with GitHub Free, Vercel Hobby, Firebase Authentication, and Firestore free-tier usage.

## Firestore Reads

Dashboard screens should read aggregate documents:

- `childProfiles`
- `dailyStats`
- `topicMastery`
- `mistakeStats`
- `streaks`

Detailed attempts are read only in history views and must be paginated.

## Firestore Writes

Each meaningful answer writes one raw attempt. Aggregate updates happen at the same logical boundary so dashboard reads stay cheap.

Potential write pattern per attempt:

- 1 attempt write
- 1 topic mastery update
- 1 daily stats update
- 0 or 1 mistake stats update
- 0 or 1 streak update per completed meaningful activity

The implementation should batch related writes where possible.

## Realtime Listeners

Avoid realtime listeners by default. Use one-time reads for parent dashboards and settings. Realtime subscriptions can be added only for screens where live updates are needed.

## Chart Ranges

Charts should default to recent ranges:

- 7 days
- 14 days
- 30 days

The dashboard must not query complete history.

## No Paid Dependencies

Do not add:

- Paid APIs
- AI APIs
- Stripe
- Paid analytics
- Paid monitoring
- Paid email
- Paid SMS
- Commercial UI templates

Phase 2 notification architecture may support Web Push or Firebase Cloud Messaging, but notifications are not required for MVP.
