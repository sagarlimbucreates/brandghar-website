"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { db, users } from "@/db";
import { requirePermission } from "../../lib/rbac";

export type FormState = { error?: string; success?: string };

const createUserSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(1).max(120),
  password: z.string().min(6).max(200),
  roleId: z.string().min(1),
  isActive: z.boolean().default(true),
});

const updateUserSchema = z.object({
  id: z.string().min(1),
  email: z.string().email(),
  fullName: z.string().min(1).max(120),
  roleId: z.string().min(1),
  isActive: z.boolean().default(true),
});

export async function createUserAction(
  _prev: FormState,
  fd: FormData
): Promise<FormState> {
  await requirePermission("user.create");

  const parsed = createUserSchema.safeParse({
    email: fd.get("email"),
    fullName: fd.get("fullName"),
    password: fd.get("password"),
    roleId: fd.get("roleId"),
    isActive: fd.get("isActive") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const existing = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, parsed.data.email))
    .limit(1);

  if (existing.length > 0) {
    return { error: "A user with this email already exists." };
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 10);

  await db.insert(users).values({
    id: randomUUID(),
    email: parsed.data.email,
    fullName: parsed.data.fullName,
    passwordHash,
    roleId: parsed.data.roleId,
    isActive: parsed.data.isActive,
    emailVerifiedAt: new Date(),
  });

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
}

export async function updateUserAction(
  _prev: FormState,
  fd: FormData
): Promise<FormState> {
  await requirePermission("user.edit");

  const parsed = updateUserSchema.safeParse({
    id: fd.get("id"),
    email: fd.get("email"),
    fullName: fd.get("fullName"),
    roleId: fd.get("roleId"),
    isActive: fd.get("isActive") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const { id, ...data } = parsed.data;

  await db
    .update(users)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(users.id, id));

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
}

export async function resetUserPasswordAction(
  _prev: FormState,
  fd: FormData
): Promise<FormState> {
  await requirePermission("user.edit");

  const id = String(fd.get("id") ?? "");
  const password = String(fd.get("password") ?? "");
  if (!id || password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await db
    .update(users)
    .set({ passwordHash, updatedAt: new Date() })
    .where(eq(users.id, id));

  revalidatePath(`/dashboard/users/${id}`);
  return { success: "Password updated." };
}

export async function deleteUserAction(fd: FormData) {
  await requirePermission("user.delete");
  const id = String(fd.get("id") ?? "");
  if (!id) return;

  await db.delete(users).where(eq(users.id, id));
  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
}
