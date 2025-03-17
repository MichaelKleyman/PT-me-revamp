import { z } from "zod";

export type TAuthForm = {
  email: string;
  practiceName?: string;
};

export const authUrlSchema = z.object({
  authType: z.enum(["login", "register"]).optional(),
  userType: z.enum(["patient", "practitioner"]).optional(),
});

export type TUserType = z.infer<typeof authUrlSchema>;
