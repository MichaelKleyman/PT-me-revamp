import {
  serial,
  text,
  pgSchema,
  index,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const usersSchema = pgSchema("users_schema");

export const usersTable = usersSchema.table(
  "users",
  {
    id: serial("id").primaryKey(),
    kindeId: text("kinde_id").unique(), // Unique identifier for Kinde user
    name: text("name").notNull(),
    email: text("email").notNull(),
    address: text("address"), // Not needed for practitioner
    licenseNumber: integer("licenseNumber"), // Not needed for patient
    userType: text("user_type", {
      enum: ["Patient", "Provider"] as const,
    }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [index("name_idx").on(table.userType)] // Search up users based on user type? (Patient or Provider)
);

export type UserInsert = typeof usersTable.$inferInsert;
