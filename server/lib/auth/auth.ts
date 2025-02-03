import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    database: "postgres",
    host: "database-1.c18usoe2cvhd.us-east-1.rds.amazonaws.com",
    port: 5432,
  }),
  emailAndPassword: {
    enabled: true,
  },
  // socialProviders: {
  //   facebook: {
  //     clientId: process.env.FACEBOOK_CLIENT_ID,
  //     clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  //     redirectURI:
  //   },
  // },
});
