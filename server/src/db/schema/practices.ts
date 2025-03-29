import {
  serial,
  text,
  pgSchema,
  index,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const practicesSchema = pgSchema("practices_schema");

export const practicesTable = practicesSchema.table(
  "practices",
  {
    id: serial("id").primaryKey(),
    practiceName: text("practiceName"),
    email: text("email").notNull(),
    address: text("address").notNull(),
    adminIds: integer("admin_ids").array().default([]),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [index("id_idx").on(table.id)] // Search up practices based on id?
);

export type PracticesInsert = typeof practicesTable.$inferInsert;
