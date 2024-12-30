import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    database: "postgres",
    host: "ptme-postgres.cfa60we4agvr.us-east-2.rds.amazonaws.com",
    port: 5432,
  }),
  emailAndPassword: {
    enabled: true,
  },
});
