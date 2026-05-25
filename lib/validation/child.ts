import { z } from "zod";

export const childProfileSchema = z.object({
  displayName: z.string().trim().min(1, "Child name is required").max(60),
  birthYear: z.coerce.number().int().min(2008).max(new Date().getFullYear()).optional(),
  schoolYear: z.coerce.number().int().min(0).max(12).optional(),
  dailyGoalMinutes: z.coerce.number().int().min(5).max(60)
});

export type ChildProfileFormValues = z.infer<typeof childProfileSchema>;
