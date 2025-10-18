import {
  createKindeServerClient,
  GrantType,
} from "@kinde-oss/kinde-typescript-sdk";
import { Context } from "hono";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { SessionManager } from "./lib/types";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { patientsTable, PatientsInsert } from "./db/schema/patients";
import {
  PractitionersInsert,
  practitionersTable,
} from "./db/schema/practitioners";

// Client for authorization code flow
export const kindeClient = createKindeServerClient(
  GrantType.AUTHORIZATION_CODE,
  {
    authDomain: process.env.KINDE_DOMAIN!,
    clientId: process.env.KINDE_CLIENT_ID!,
    clientSecret: process.env.KINDE_CLIENT_SECRET!,
    redirectURL: process.env.KINDE_REDIRECT_URI!,
    logoutRedirectURL: process.env.KINDE_LOGOUT_REDIRECT_URI!,
  }
);

interface SessionStore {
  [key: string]: unknown;
}

const store: SessionStore = {};

export const sessionManager = (c: Context): SessionManager => ({
  async getSessionItem<T>(key: string): Promise<T | null> {
    const result = getCookie(c, key);
    if (!result) return null;
    return result as unknown as T;
  },
  async setSessionItem(key: string, value: unknown) {
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
    } as const;
    if (typeof value === "string") {
      setCookie(c, key, value, cookieOptions);
      store[key] = value;
    } else {
      setCookie(c, key, JSON.stringify(value), cookieOptions);
      store[key] = value;
    }
  },
  async removeSessionItem(key: string) {
    deleteCookie(c, key);
    delete store[key];
  },
  async destroySession() {
    ["it_token", "access_token", "user", "refresh_token"].forEach((key) => {
      deleteCookie(c, key);
      delete store[key];
    });
  },
});

type Env = {
  Variables: {
    user: PractitionersInsert | PatientsInsert;
  };
};

export const getUser = createMiddleware<Env>(async (c, next) => {
  try {
    const manager = sessionManager(c);
    const isAuthenticated = await kindeClient.isAuthenticated(manager);

    if (!isAuthenticated) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const userFromKinde = await kindeClient.getUserProfile(manager);

    // Check both tables for the user
    const [patient] = await db
      .select()
      .from(patientsTable)
      .where(eq(patientsTable.email, userFromKinde.email));

    const [practitioner] = await db
      .select()
      .from(practitionersTable)
      .where(eq(practitionersTable.email, userFromKinde.email));

    if (!patient && !practitioner) {
      return c.json({ error: "User not found in database" }, 404);
    }

    const user = patient || practitioner;
    console.log(user);
    c.set("user", user);
    await next();
  } catch (error) {
    console.error(error);
    return c.json({ error: "Unauthorized" }, 401);
  }
});

/** Get user type from the database by using the users email */
export const getUserTypeByEmail = async (email: string) => {
  const results = await db
    .select({
      userType: patientsTable.userType,
    })
    .from(patientsTable)
    .where(eq(patientsTable.email, email))
    .union(
      db
        .select({
          userType: practitionersTable.userType,
        })
        .from(practitionersTable)
        .where(eq(practitionersTable.email, email))
    );

  const [userInfo] = results;

  return userInfo.userType;
};
