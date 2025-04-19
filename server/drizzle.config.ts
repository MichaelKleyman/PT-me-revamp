import { Config, defineConfig } from "drizzle-kit";

/** Development environment configuration file */
export default defineConfig({
  out: "./drizzle",
  schema: [
    "./src/db/schema/patients.ts",
    "./src/db/schema/practitioners.ts",
    "./src/db/schema/practices.ts",
  ],
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  schemaFilter: [
    "public",
    "patientsSchema",
    "practitionersSchema",
    "practicesSchema",
  ],
}) satisfies Config;
