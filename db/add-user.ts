/**
 * Ad-hoc script to add a user. Edit the values below and run:
 *   npx tsx db/add-user.ts
 */
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import path from "node:path";
import * as schema from "./schema";

const EMAIL = "admin@gmail.com";
const PASSWORD = "test@#123";
const FULL_NAME = "Admin";
const ROLE = "super_admin"; // full access to all menus and permissions

const DB_PATH = path.join(process.cwd(), "db", "brandghar.db");
const sqlite = new Database(DB_PATH);
sqlite.pragma("foreign_keys = ON");
const db = drizzle(sqlite, { schema });

async function main() {
  const role = db
    .select()
    .from(schema.roles)
    .where(eq(schema.roles.name, ROLE))
    .get();

  if (!role) {
    throw new Error(`Role "${ROLE}" not found. Run db:seed first.`);
  }

  const existing = db
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, EMAIL))
    .get();

  if (existing) {
    console.log(`× User ${EMAIL} already exists — skipping.`);
    return;
  }

  const passwordHash = await bcrypt.hash(PASSWORD, 10);

  db.insert(schema.users)
    .values({
      id: randomUUID(),
      email: EMAIL,
      passwordHash,
      fullName: FULL_NAME,
      roleId: role.id,
      emailVerifiedAt: new Date(),
      isActive: true,
    })
    .run();

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
  .finally(() => sqlite.close());
