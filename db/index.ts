import "server-only";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";
import path from "node:path";

const DB_PATH = path.join(process.cwd(), "db", "brandghar.db");

// Reuse a single connection across HMR reloads in dev.
const globalForDb = globalThis as unknown as {
  sqlite: Database.Database | undefined;
};

const sqlite = globalForDb.sqlite ?? new Database(DB_PATH);
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");

if (process.env.NODE_ENV !== "production") {
  globalForDb.sqlite = sqlite;
}

export const db = drizzle(sqlite, { schema });
export * from "./schema";
