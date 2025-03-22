import { serial, text, pgSchema, index, timestamp } from "drizzle-orm/pg-core";

export const usersSchema = pgSchema("users_schema");

export const usersTable = usersSchema.table(
  "users",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    address: text("address"), // Not needed for practitioner
    licenseNumber: text("licenseNumber"), // Not needed for patient
    userType: text("user_type", {
      enum: ["Patient", "Provider"] as const,
    }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [index("name_idx").on(table.userType)] // Search up users based on user type? (Patient or Provider)
);
