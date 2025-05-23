import { Config, defineConfig } from "drizzle-kit";

/** Development environment configuration file */
export default defineConfig({
  out: "./drizzle",
  schema: ["./src/db/schema/users.ts", "./src/db/schema/practices.ts"],
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  schemaFilter: ["public", "usersSchema", "practicesSchema"],
}) satisfies Config;
