import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

// Create a standard PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  ssl: true,
});

// Use the node-postgres adapter with Drizzle
export const db = drizzle(pool);
