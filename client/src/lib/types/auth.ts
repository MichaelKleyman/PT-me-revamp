import { z } from "zod";

export type TAuthRegisterForm = {
  email: string;
  practiceName: string;
  address: string;
  practitionerName: string;
  licenseNumber: string | null;
  userType: TUserType["userType"];
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

export const UserTypeEnum = ["patient", "practitioner"] as const;
export type UserType = (typeof UserTypeEnum)[number];

export type BaseUser = {
  /** Unique id for the user in the database */
  id?: number;
  /** Unique id from Kinde authentication service */
  kindeId?: string | null;
  /** ID of the practice the user belongs to */
  practiceId?: string | null;
  /** First name of the user */
  firstName: string;
  /** Middle name of the user */
  middleName?: string | null;
  /** Last name of the user */
  lastName: string;
  /** Email address of the user */
  email: string;
  /** Type of user, patient or practitioner */
  userType: UserType;
  /** Timestamp when the user was created */
  createdAt?: string | null;
};

// Define specific user types
export type Patient = BaseUser & {
  /** Physical address of the patient */
  address: string;
  /** Exercise ID's of the patients exercises  */
  exerciseIds?: number[];
};

export type Practitioner = BaseUser & {
  /** Whether the practitioner has admin privileges in their practice */
  admin?: boolean;
  /** License number of the practitioner */
  licenseNumber: number;
};

export type Practice = {
  /** Unique id for the practice */
  id: number;
  /** Name of the practice */
  practiceName: string;
  /** Email address of the practice */
  email: string;
  /** Physical address of the practice */
  address: string;
  /** Array of practitioner IDs who have admin privileges */
  adminIds: number[];
};

export type User = Patient | Practitioner;
