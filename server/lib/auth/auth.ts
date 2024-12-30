import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    database: "postgres",
    host: "localhost",
    port: 5431,
  }),
  emailAndPassword: {
    enabled: true,
  },
});
