import {
  serial,
  text,
  pgSchema,
  index,
  timestamp,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

export const practitionersSchema = pgSchema("practitioners_schema");

export const practitionersTable = practitionersSchema.table(
  "practitioners",
  {
    id: serial("id").primaryKey(),
    kindeId: text("kinde_id").unique(), // Unique identifier for Kinde user
    practiceId: text("practice_id").unique().notNull(), // Id of the practice the practitioner belongs to
    admin: boolean("admin").default(false).notNull(), // Whether the practitioner is an admin of the practice
    name: text("name").notNull(),
    email: text("email").notNull(),
    licenseNumber: integer("licenseNumber").notNull(), // Not needed for patient
    userType: text("user_type", {
      enum: ["patient", "practitioner"] as const,
    }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  }
  // (table) => [index("name_idx").on(table.userType)] // TODO: Search up users based on some field (ex: user type? (Patient or Provider))
);

export type PractitionersInsert = typeof practitionersTable.$inferInsert;
