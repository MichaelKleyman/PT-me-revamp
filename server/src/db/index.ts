import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

// const pool = new Pool({
//   host: process.env.DATABASE_HOST!,
//   port: parseInt(process.env.DATABASE_PORT!),
//   user: process.env.DATABASE_USER!,
//   password: process.env.DATABASE_PASSWORD!,
//   database: process.env.DATABASE_NAME!,
//   ssl: { rejectUnauthorized: false },
// });

export const db = drizzle(process.env.DATABASE_URL!);
