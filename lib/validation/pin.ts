import { z } from "zod";

export const pinSchema = z.object({
  pin: z.string().regex(/^\d{4,8}$/, "PIN must be 4 to 8 digits")
});

export const changePinSchema = z
  .object({
    currentPin: z.string().regex(/^\d{4,8}$/, "Current PIN must be 4 to 8 digits"),
    nextPin: z.string().regex(/^\d{4,8}$/, "New PIN must be 4 to 8 digits"),
    confirmPin: z.string().regex(/^\d{4,8}$/, "Confirm PIN must be 4 to 8 digits")
  })
  .refine((value) => value.nextPin === value.confirmPin, {
    message: "PIN entries must match",
    path: ["confirmPin"]
  });

export type PinFormValues = z.infer<typeof pinSchema>;
export type ChangePinFormValues = z.infer<typeof changePinSchema>;
