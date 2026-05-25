export const FIRESTORE_COLLECTIONS = {
  users: "users",
  childProfiles: "childProfiles",
  parentChildLinks: "parentChildLinks",
  sessions: "sessions",
  attempts: "attempts",
  dailyStats: "dailyStats",
  topicMastery: "topicMastery",
  mistakeStats: "mistakeStats",
  streaks: "streaks",
  pinSettings: "pinSettings",
  notificationSettings: "notificationSettings"
} as const;

export type FirestoreCollectionName = keyof typeof FIRESTORE_COLLECTIONS;
