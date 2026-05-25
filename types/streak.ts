export type Streak = {
  id: string;
  childProfileId: string;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string;
  activeDays: string[];
  updatedAt: Date;
};

export type MeaningfulActivityInput = {
  completedSession: boolean;
  attemptsCount: number;
  activeMinutes: number;
};
