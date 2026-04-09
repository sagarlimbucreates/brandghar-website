import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { migrate } from "drizzle-orm/neon-serverless/migrator";
import ws from "ws";

if (typeof WebSocket === "undefined") {
  neonConfig.webSocketConstructor = ws;
}

// Migrations should run against the direct (non-pooled) endpoint when available,
// because DDL/transactions behave better without PgBouncer in transaction mode.
const connectionString =
  process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

async function main() {
  const pool = new Pool({ connectionString });
  const db = drizzle(pool);

  console.log("→ running migrations…");
  await migrate(db, { migrationsFolder: "./db/migrations" });
  console.log("✓ migrations applied");

  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
