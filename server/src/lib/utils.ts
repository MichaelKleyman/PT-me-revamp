import { SessionManager } from "@kinde-oss/kinde-typescript-sdk";
import { UserType } from "./types";
import { db } from "../db";
import { UserInsert, usersTable } from "../db/schema/users";
import { PracticesInsert, practicesTable } from "../db/schema/practices";

export const createUser = async (session: SessionManager) => {
  const userType = await session.getSessionItem("userType");
  const email = (await session.getSessionItem("email")) || "";
  const practiceName = (await session.getSessionItem("practiceName")) || "";
  const address = await session.getSessionItem("address");
  const licenseNumber = await session.getSessionItem("licenseNumber");
  const practitionerName = await session.getSessionItem("practitionerName");

  const isProvider = userType === UserType.Provider;

  if (isProvider) {
    const practiceInsertData: PracticesInsert = {
      practiceName: String(practiceName || ""),
      email: String(email || ""),
      address: String(address || ""),
    };
    await db.insert(practicesTable).values(practiceInsertData);
  }

  const userInsertData: UserInsert = {
    name: String(practitionerName || ""),
    email: String(email || ""),
    userType: !isProvider ? "Patient" : "Provider",
    ...(isProvider ? { licenseNumber: Number(licenseNumber) } : {}),
    ...(!isProvider ? { address: String(address ?? "") } : {}),
  };

  await db.insert(usersTable).values(userInsertData);
};
