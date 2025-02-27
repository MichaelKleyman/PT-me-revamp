import "dotenv/config";
import { defineConfig } from "drizzle-kit";

/** Development environment configuration file */
export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/auth-schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.DATABASE_HOST!,
    port: parseInt(process.env.DATABASE_PORT!),
    user: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME!,
    ssl: { rejectUnauthorized: false },
  },
});
