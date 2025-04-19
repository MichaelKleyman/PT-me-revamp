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

export const createUser = async (session: SessionManager) => {
  try {
    const userType = await session.getSessionItem("userType");
    const email = (await session.getSessionItem("email")) || "";
    const practiceName = (await session.getSessionItem("practiceName")) || "";
    const address = await session.getSessionItem("address");
    const licenseNumber = await session.getSessionItem("licenseNumber");
    const practitionerName = await session.getSessionItem("practitionerName");

    const isPractitioner = userType === UserType.Practitioner;
    const isPatient = userType === UserType.Patient;

    if (isPractitioner) {
      const practitionerInsertData: PractitionersInsert = {
        name: String(practitionerName || ""),
        email: String(email || ""),
        userType: UserType.Practitioner,
        licenseNumber: Number(licenseNumber),
      };

      // Create practitioner
      const newPractitioner = await db
        .insert(practitionersTable)
        .values(practitionerInsertData)
        .returning({ id: practitionersTable.id });

      // Add practitioner as admin to the practice
      const newAdminIds = [newPractitioner[0].id];

      // Create Practice
      const practiceInsertData: PracticesInsert = {
        practiceName: String(practiceName || ""),
        email: String(email || ""),
        address: String(address || ""),
        adminIds: newAdminIds,
      };

      const newPractice = await db
        .insert(practicesTable)
        .values(practiceInsertData)
        .returning({ id: practicesTable.id });

      // Update practitioner with practice ID (converting to string)
      await db
        .update(practitionersTable)
        .set({ practiceId: String(newPractice[0].id) })
        .where(eq(practitionersTable.id, newPractitioner[0].id));
    } else if (isPatient) {
      const patientInsertData: PatientsInsert = {
        name: String(practitionerName || ""),
        email: String(email || ""),
        userType: UserType.Patient,
        address: String(address ?? ""),
      };
      await db.insert(patientsTable).values(patientInsertData);

      //TODO: iterate on more new patient logic here
    }

    const userTypePath = !isPractitioner ? "patient" : "practice";
    return userTypePath;
  } catch (error) {
    console.log(">>>>ERROR: ", error);
  }
};
