export type PinSettings = {
  id: string;
  parentUserId: string;
  pinHash: string;
  pinUpdatedAt: Date;
  failedAttempts: number;
  lockedUntil?: Date;
};

export type PinVerificationResult =
  | { status: "success" }
  | { status: "missing" }
  | { status: "invalid"; remainingAttempts: number }
  | { status: "locked"; lockedUntil: Date };
