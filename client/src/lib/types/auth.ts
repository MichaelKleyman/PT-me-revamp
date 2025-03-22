import { z } from "zod";

export type TAuthRegisterForm = {
  email: string;
  practiceName: string;
  address: string;
  practitionerName: string;
  licenseNumber: string | null;
};

export type TAuthLoginForm = {
  email: string;
  practitionerName: string;
};

export const authUrlSchema = z.object({
  authType: z.enum(["login", "register"]).optional(),
  userType: z.enum(["patient", "practitioner"]).optional(),
});

export type TUserType = z.infer<typeof authUrlSchema>;
