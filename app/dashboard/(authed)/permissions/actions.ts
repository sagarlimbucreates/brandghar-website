"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { db, permissions } from "@/db";
import { requirePermission } from "../../lib/rbac";

export type FormState = { error?: string; success?: string };

const schema = z.object({
  key: z
    .string()
    .min(3)
    .max(100)
    .regex(/^[a-z0-9_]+\.[a-z0-9_]+$/, {
      message: "Key must be in the format group.action (e.g. blog.edit).",
    }),
  group: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[a-z0-9_]+$/, { message: "Group must be lowercase alphanumeric." }),
  description: z.string().max(500).optional(),
});

const updateSchema = schema.extend({ id: z.string().min(1) });

export async function createPermissionAction(
  _prev: FormState,
  fd: FormData
): Promise<FormState> {
  await requirePermission("permission.create");

  const parsed = schema.safeParse({
    key: fd.get("key"),
    group: fd.get("group"),
    description: fd.get("description") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const existing = await db
    .select({ id: permissions.id })
    .from(permissions)
    .where(eq(permissions.key, parsed.data.key))
    .limit(1);

  if (existing.length > 0) {
    return { error: "A permission with this key already exists." };
  }

  await db.insert(permissions).values({
    id: randomUUID(),
    key: parsed.data.key,
    group: parsed.data.group,
    description: parsed.data.description ?? null,
  });

  revalidatePath("/dashboard/permissions");
  redirect("/dashboard/permissions");
}

export async function updatePermissionAction(
  _prev: FormState,
  fd: FormData
): Promise<FormState> {
  await requirePermission("permission.edit");

  const parsed = updateSchema.safeParse({
    id: fd.get("id"),
    key: fd.get("key"),
    group: fd.get("group"),
    description: fd.get("description") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const { id, ...data } = parsed.data;

  await db
    .update(permissions)
    .set({ ...data, description: data.description ?? null })
    .where(eq(permissions.id, id));

  revalidatePath("/dashboard/permissions");
  redirect("/dashboard/permissions");
}

export async function deletePermissionAction(fd: FormData) {
  await requirePermission("permission.delete");
  const id = String(fd.get("id") ?? "");
  if (!id) return;

  await db.delete(permissions).where(eq(permissions.id, id));
  revalidatePath("/dashboard/permissions");
  redirect("/dashboard/permissions");
}
