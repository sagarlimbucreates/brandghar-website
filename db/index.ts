import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import * as schema from "./schema";

// Required for Node.js runtime (Vercel Node functions, local scripts, `next dev`).
// Not used/required on the Edge runtime, where a native WebSocket exists.
if (typeof WebSocket === "undefined") {
  neonConfig.webSocketConstructor = ws;
}

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

// Reuse a single pool across HMR reloads in dev and across function invocations.
const globalForDb = globalThis as unknown as {
  neonPool: Pool | undefined;
};

const pool =
  globalForDb.neonPool ??
  new Pool({
    connectionString,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.neonPool = pool;
}

export const db = drizzle(pool, { schema });
export * from "./schema";
