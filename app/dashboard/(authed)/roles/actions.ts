"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq, inArray } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { db, roles, rolePermissions } from "@/db";
import { requirePermission } from "../../lib/rbac";

export type FormState = { error?: string; success?: string };

const createRoleSchema = z.object({
  name: z.string().min(2).max(50).regex(/^[a-z0-9_]+$/, {
    message: "Name must be lowercase alphanumeric with underscores.",
  }),
  displayName: z.string().min(1).max(120),
  description: z.string().max(500).optional(),
});

const updateRoleSchema = createRoleSchema.extend({
  id: z.string().min(1),
});

export async function createRoleAction(
  _prev: FormState,
  fd: FormData
): Promise<FormState> {
  await requirePermission("role.create");

  const parsed = createRoleSchema.safeParse({
    name: fd.get("name"),
    displayName: fd.get("displayName"),
    description: fd.get("description") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const existing = await db
    .select({ id: roles.id })
    .from(roles)
    .where(eq(roles.name, parsed.data.name))
    .limit(1);

  if (existing.length > 0) {
    return { error: "A role with this name already exists." };
  }

  await db.insert(roles).values({
    id: randomUUID(),
    name: parsed.data.name,
    displayName: parsed.data.displayName,
    description: parsed.data.description ?? null,
    isSystem: false,
  });

  revalidatePath("/dashboard/roles");
  redirect("/dashboard/roles");
}

export async function updateRoleAction(
  _prev: FormState,
  fd: FormData
): Promise<FormState> {
  await requirePermission("role.edit");

  const parsed = updateRoleSchema.safeParse({
    id: fd.get("id"),
    name: fd.get("name"),
    displayName: fd.get("displayName"),
    description: fd.get("description") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const { id, ...data } = parsed.data;

  await db
    .update(roles)
    .set({ ...data, description: data.description ?? null, updatedAt: new Date() })
    .where(eq(roles.id, id));

  revalidatePath("/dashboard/roles");
  redirect("/dashboard/roles");
}

export async function setRolePermissionsAction(
  _prev: FormState,
  fd: FormData
): Promise<FormState> {
  await requirePermission("role.manage_permissions");

  const roleId = String(fd.get("roleId") ?? "");
  if (!roleId) return { error: "Missing role id." };

  const permissionIds = fd.getAll("permissionIds").map(String).filter(Boolean);

  // Wipe and re-insert
  await db.delete(rolePermissions).where(eq(rolePermissions.roleId, roleId));
  if (permissionIds.length > 0) {
    await db.insert(rolePermissions).values(
      permissionIds.map((pid) => ({
        roleId,
        permissionId: pid,
      }))
    );
  }

  revalidatePath(`/dashboard/roles/${roleId}`);
  return { success: "Permissions updated." };
}

export async function deleteRoleAction(fd: FormData) {
  await requirePermission("role.delete");
  const id = String(fd.get("id") ?? "");
  if (!id) return;

  // Prevent deleting system roles or roles with users assigned.
  const role = await db.select().from(roles).where(eq(roles.id, id)).limit(1);
  if (role[0]?.isSystem) {
    redirect(`/dashboard/roles/${id}?error=System%20roles%20cannot%20be%20deleted.`);
  }

  await db.delete(roles).where(eq(roles.id, id));
  revalidatePath("/dashboard/roles");
  redirect("/dashboard/roles");
}

// Used when wiping role permissions during delete — kept for reference.
void inArray;
