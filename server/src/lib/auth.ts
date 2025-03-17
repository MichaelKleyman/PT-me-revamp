import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ["http://localhost:5173/"],
  // advanced: {
  //   defaultCookieAttributes: {
  //     secure: true,
  //     httpOnly: true,≈
  //     sameSite: "none",
  //   },
  // },
  // socialProviders: {
  //   facebook: {
  //     clientId: process.env.FACEBOOK_CLIENT_ID,
  //     clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  //     redirectURI:
  //   },
  // },
});
