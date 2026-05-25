# Data Model

## Collections

Required Firestore collections:

- `users`
- `childProfiles`
- `parentChildLinks`
- `sessions`
- `attempts`
- `dailyStats`
- `topicMastery`
- `mistakeStats`
- `streaks`
- `pinSettings`
- `notificationSettings` for phase 2 placeholders

## Ownership

Parent-owned documents must include `parentUserId` when directly owned by a parent. Child-scoped documents must include `childProfileId` and must point to a child profile owned by the authenticated parent.

## Raw Attempts

`attempts` stores detailed history:

- topic
- level
- operands
- operator
- correct answer
- given answer
- correctness
- response time
- visual model
- hint usage
- created timestamp

Attempts are used for paginated detail views and aggregate updates. They are not loaded in bulk for dashboards.

## Aggregates

`dailyStats` supports charts for recent activity and free-tier-friendly dashboard reads.

`topicMastery` stores mastery snapshots by child, topic, and level.

`mistakeStats` stores operand-pair and topic error patterns.

`streaks` stores local date based streak state.

## Date Strategy

Firestore timestamps are used for event ordering. Local date strings in `YYYY-MM-DD` format are stored for streak and daily stat grouping.

## Future Child Accounts

`ChildProfile.linkedChildUserId` is optional. `parentChildLinks` can later support a child account or additional guardians without replacing existing child profile documents.
