import * as schema from "@/db/schema";
import Database from "better-sqlite3";
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/better-sqlite3";

dotenv.config({ path: ".env" }); // Ensure env vars are loaded if needed specifically, though Next.js handles .env usually

// Singleton pattern for Next.js hot reloading
const globalForDb = global as unknown as {
  db: ReturnType<typeof drizzle<typeof schema>> | undefined;
};

const sqlite = new Database("ricette.db");
export const db = globalForDb.db ?? drizzle(sqlite, { schema });

if (process.env.NODE_ENV !== "production") globalForDb.db = db;
