export type NotificationChannel = "web_push" | "firebase_cloud_messaging";

export type NotificationSettings = {
  id: string;
  parentUserId: string;
  enabled: boolean;
  channels: NotificationChannel[];
  updatedAt: Date;
};

export function notificationsArePhaseTwo(): true {
  return true;
}
