import { SessionManager } from "@kinde-oss/kinde-typescript-sdk";
import { UserType } from "./types";
import { db } from "../db";
import { UserInsert, usersTable } from "../db/schema/users";
import { PracticesInsert, practicesTable } from "../db/schema/practices";
import { kindeClient } from "../kinde";

export const createUser = async (session: SessionManager) => {
  try {
    const userType = await session.getSessionItem("userType");
    const email = (await session.getSessionItem("email")) || "";
    const practiceName = (await session.getSessionItem("practiceName")) || "";
    const address = await session.getSessionItem("address");
    const licenseNumber = await session.getSessionItem("licenseNumber");
    const practitionerName = await session.getSessionItem("practitionerName");

    const isProvider = userType === UserType.Provider;

    const userInsertData: UserInsert = {
      name: String(practitionerName || ""),
      email: String(email || ""),
      userType: !isProvider ? "Patient" : "Provider",
      ...(isProvider ? { licenseNumber: Number(licenseNumber) } : {}),
      ...(!isProvider ? { address: String(address ?? "") } : {}),
    };
    const newUser = await db
      .insert(usersTable)
      .values(userInsertData)
      .returning({ id: usersTable.id });

    if (isProvider) {
      const newAdminIds = [newUser[0].id];
      const practiceInsertData: PracticesInsert = {
        practiceName: String(practiceName || ""),
        email: String(email || ""),
        address: String(address || ""),
        adminIds: newAdminIds,
      };
      await db.insert(practicesTable).values(practiceInsertData);
    }

    return !isProvider ? "patient" : "practice";
  } catch (error) {
    console.log(">>>>ERROR: ", error);
  }
};
