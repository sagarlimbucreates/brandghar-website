/**
 * Ad-hoc script to add a user. Edit the values below and run:
 *   npx tsx db/add-user.ts
 */
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import ws from "ws";
import * as schema from "./schema";

if (typeof WebSocket === "undefined") {
  neonConfig.webSocketConstructor = ws;
}

const EMAIL = "admin@gmail.com";
const PASSWORD = "test@#123";
const FULL_NAME = "Admin";
const ROLE = "super_admin";

const connectionString =
  process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const pool = new Pool({ connectionString });
const db = drizzle(pool, { schema });

async function main() {
  const roleRows = await db
    .select()
    .from(schema.roles)
    .where(eq(schema.roles.name, ROLE))
    .limit(1);
  const role = roleRows[0];

  if (!role) {
    throw new Error(`Role "${ROLE}" not found. Run db:seed first.`);
  }

  const existing = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, EMAIL))
    .limit(1);

  if (existing.length > 0) {
    console.log(`× User ${EMAIL} already exists — skipping.`);
    return;
  }

  const passwordHash = await bcrypt.hash(PASSWORD, 10);

  await db.insert(schema.users).values({
    id: randomUUID(),
    email: EMAIL,
    passwordHash,
    fullName: FULL_NAME,
    roleId: role.id,
    emailVerifiedAt: new Date(),
    isActive: true,
  });

  console.log(`✓ Created user`);
  console.log(`  email:    ${EMAIL}`);
  console.log(`  password: ${PASSWORD}`);
  console.log(`  role:     ${ROLE}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
  });
