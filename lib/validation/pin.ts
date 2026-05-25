import { z } from "zod";

export const pinSchema = z.object({
  pin: z.string().regex(/^\d{4,8}$/, "PIN musí mať 4 až 8 číslic")
});

export const changePinSchema = z
  .object({
    currentPin: z.string().regex(/^\d{4,8}$/, "Aktuálny PIN musí mať 4 až 8 číslic"),
    nextPin: z.string().regex(/^\d{4,8}$/, "Nový PIN musí mať 4 až 8 číslic"),
    confirmPin: z.string().regex(/^\d{4,8}$/, "Potvrdenie PINu musí mať 4 až 8 číslic")
  })
  .refine((value) => value.nextPin === value.confirmPin, {
    message: "Zadané PINy sa musia zhodovať",
    path: ["confirmPin"]
  });

export type PinFormValues = z.infer<typeof pinSchema>;
export type ChangePinFormValues = z.infer<typeof changePinSchema>;
