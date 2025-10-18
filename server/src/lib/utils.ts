import { SessionManager } from "@kinde-oss/kinde-typescript-sdk";
import { UserType } from "./types";
import { db } from "../db";
import { PracticesInsert, practicesTable } from "../db/schema/practices";
import {
  PractitionersInsert,
  practitionersTable,
} from "../db/schema/practitioners";
import { PatientsInsert, patientsTable } from "../db/schema/patients";
import { eq } from "drizzle-orm";

/** Gets the user type based on registration data */
export const getUserType = async (session: SessionManager) => {
  const userTypeFromSession = await session.getSessionItem("userType");
  const isPractitioner = userTypeFromSession === UserType.Practitioner;
  const isPatient = userTypeFromSession === UserType.Patient;
  console.log({ isPatient });

  const userType = isPractitioner ? UserType.Practitioner : UserType.Patient;
  const userTypePath = !isPractitioner ? "patient" : "practice";
  return { userType, userTypePath };
};

/** Create the user based on session info */
export const createUser = async (
  session: SessionManager,
  userType: UserType
) => {
  try {
    const email = (await session.getSessionItem("email")) || "";
    const practiceName = (await session.getSessionItem("practiceName")) || "";
    const address = await session.getSessionItem("address");
    const licenseNumber = await session.getSessionItem("licenseNumber");
    const practitionerName = await session.getSessionItem("practitionerName");
    const patientFirstName = await session.getSessionItem("patientFirstName");
    const patientLastName = await session.getSessionItem("patientLastName");

    const isPractitioner = userType === UserType.Practitioner;
    const isPatient = userType === UserType.Patient;

    if (isPractitioner) {
      // Create Practice
      const practiceInsertData: PracticesInsert = {
        practiceName: String(practiceName || ""),
        email: String(email || ""),
        address: String(address || ""),
        adminIds: [],
      };

      const newPractice = await db
        .insert(practicesTable)
        .values(practiceInsertData)
        .returning({ id: practicesTable.id });

      const practitionerInsertData: PractitionersInsert = {
        name: String(practitionerName || ""),
        email: String(email || ""),
        userType: UserType.Practitioner,
        licenseNumber: Number(licenseNumber),
        practiceId: String(newPractice[0].id),
      };

      // Create practitioner
      const newPractitioner = await db
        .insert(practitionersTable)
        .values(practitionerInsertData)
        .returning({ id: practitionersTable.id });

      // Add practitioner as admin to the practice
      const newAdminIds = [newPractitioner[0].id];
      await db
        .update(practicesTable)
        .set({ adminIds: newAdminIds })
        .where(eq(practicesTable.id, newPractice[0].id));
    } else if (isPatient) {
      const patientInsertData: PatientsInsert = {
        // TODO change this to handle patient name and registration soon
        firstName: String(patientFirstName || ""),
        lastName: String(patientLastName || ""),
        email: String(email || ""),
        userType: UserType.Patient,
        address: String(address ?? ""),
      };
      await db.insert(patientsTable).values(patientInsertData);

      //TODO: iterate on more new patient logic here
    }
  } catch (error) {
    console.error("Database error during user creation:", error);
  }
};
