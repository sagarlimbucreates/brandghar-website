import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import type { Logger } from "drizzle-orm";
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

// ---------------------------------------------------------------------------
// Query middleware
// ---------------------------------------------------------------------------
// Every drizzle call lands in Pool.query under the hood. We wrap that single
// entry point so we get: timing, dev-time logging, redacted params, and a
// consistent error shape carrying the offending SQL. Call sites don't change.

const isDev = process.env.NODE_ENV !== "production";
const SLOW_QUERY_MS = Number(process.env.DB_SLOW_QUERY_MS ?? 250);

function truncate(sql: string, max = 240): string {
  const flat = sql.replace(/\s+/g, " ").trim();
  return flat.length > max ? `${flat.slice(0, max)}…` : flat;
}

function redactParams(params: readonly unknown[] | undefined): unknown[] {
  if (!params) return [];
  return params.map((p) => {
    if (p == null) return p;
    if (typeof p === "string" && p.length > 80) return `${p.slice(0, 77)}…`;
    if (p instanceof Buffer) return `<Buffer ${p.length}b>`;
    return p;
  });
}

export class DbQueryError extends Error {
  constructor(
    message: string,
    readonly sql: string,
    readonly params: unknown[],
    readonly cause: unknown,
  ) {
    super(message);
    this.name = "DbQueryError";
  }
}

function installQueryMiddleware(pool: Pool): Pool {
  const originalQuery = pool.query.bind(pool) as (
    ...args: unknown[]
  ) => Promise<unknown>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (pool as any).query = async function patchedQuery(...args: unknown[]) {
    const started = performance.now();
    const first = args[0] as
      | string
      | { text: string; values?: readonly unknown[] };
    const sql = typeof first === "string" ? first : first?.text ?? "";
    const params =
      typeof first === "string"
        ? (args[1] as readonly unknown[] | undefined)
        : first?.values;

    try {
      const result = await originalQuery(...args);
      const ms = performance.now() - started;

      if (isDev) {
        // eslint-disable-next-line no-console
        console.log(
          `[db] ${ms.toFixed(1)}ms  ${truncate(sql)}`,
          params && params.length ? redactParams(params) : "",
        );
      } else if (ms > SLOW_QUERY_MS) {
        // eslint-disable-next-line no-console
        console.warn(
          `[db] slow query ${ms.toFixed(0)}ms  ${truncate(sql)}`,
        );
      }

      return result;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(
        `[db] query failed  ${truncate(sql)}`,
        redactParams(params),
        err,
      );
      throw new DbQueryError(
        err instanceof Error ? err.message : "database query failed",
        sql,
        redactParams(params),
        err,
      );
    }
  };

  pool.on("error", (err: Error) => {
    // eslint-disable-next-line no-console
    console.error("[db] pool error", err);
  });

  return pool;
}

// Drizzle's own logger sits on top of the pool wrapper and pretty-prints the
// bound SQL that drizzle built, which is handy when the raw Pool.query text
// looks like "select ... $1, $2" with placeholders.
const drizzleLogger: Logger | undefined = isDev
  ? {
      logQuery(query, params) {
        // eslint-disable-next-line no-console
        console.debug(`[db:drizzle] ${truncate(query)}`, redactParams(params));
      },
    }
  : undefined;

// ---------------------------------------------------------------------------
// Pool + drizzle client (singletons across HMR / serverless invocations)
// ---------------------------------------------------------------------------

const globalForDb = globalThis as unknown as {
  neonPool: Pool | undefined;
};

const pool =
  globalForDb.neonPool ??
  installQueryMiddleware(
    new Pool({
      connectionString,
    }),
  );

if (process.env.NODE_ENV !== "production") {
  globalForDb.neonPool = pool;
}

export const db = drizzle(pool, { schema, logger: drizzleLogger });
export * from "./schema";
