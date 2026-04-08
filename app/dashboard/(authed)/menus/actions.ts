"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { db, menus } from "@/db";
import { requirePermission } from "../../lib/rbac";
import { ICON_NAMES } from "../../lib/icons";

export type FormState = { error?: string; success?: string };

const schema = z.object({
  key: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[a-z0-9_-]+$/, {
      message: "Key must be lowercase alphanumeric, dashes, or underscores.",
    }),
  label: z.string().min(1).max(120),
  href: z.string().min(1).max(200),
  icon: z.string().refine((v) => (ICON_NAMES as string[]).includes(v), {
    message: "Unknown icon.",
  }),
  requiredGroup: z.string().max(50).optional().nullable(),
  parentId: z.string().optional().nullable(),
  sortOrder: z.coerce.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

const updateSchema = schema.extend({ id: z.string().min(1) });

export async function createMenuAction(
  _prev: FormState,
  fd: FormData
): Promise<FormState> {
  await requirePermission("menu.create");

  const parsed = schema.safeParse({
    key: fd.get("key"),
    label: fd.get("label"),
    href: fd.get("href"),
    icon: fd.get("icon"),
    requiredGroup: fd.get("requiredGroup") || null,
    parentId: fd.get("parentId") || null,
    sortOrder: fd.get("sortOrder") || 0,
    isActive: fd.get("isActive") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const existing = await db
    .select({ id: menus.id })
    .from(menus)
    .where(eq(menus.key, parsed.data.key))
    .limit(1);

  if (existing.length > 0) {
    return { error: "A menu with this key already exists." };
  }

  await db.insert(menus).values({
    id: randomUUID(),
    key: parsed.data.key,
    label: parsed.data.label,
    href: parsed.data.href,
    icon: parsed.data.icon,
    requiredGroup: parsed.data.requiredGroup ?? null,
    parentId: parsed.data.parentId ?? null,
    sortOrder: parsed.data.sortOrder,
    isActive: parsed.data.isActive,
  });

  revalidatePath("/dashboard/menus");
  revalidatePath("/dashboard", "layout");
  redirect("/dashboard/menus");
}

export async function updateMenuAction(
  _prev: FormState,
  fd: FormData
): Promise<FormState> {
  await requirePermission("menu.edit");

  const parsed = updateSchema.safeParse({
    id: fd.get("id"),
    key: fd.get("key"),
    label: fd.get("label"),
    href: fd.get("href"),
    icon: fd.get("icon"),
    requiredGroup: fd.get("requiredGroup") || null,
    parentId: fd.get("parentId") || null,
    sortOrder: fd.get("sortOrder") || 0,
    isActive: fd.get("isActive") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const { id, ...data } = parsed.data;

  // Guard against assigning a menu as its own parent or to one of its descendants.
  if (data.parentId === id) {
    return { error: "A menu cannot be its own parent." };
  }

  await db
    .update(menus)
    .set({
      ...data,
      requiredGroup: data.requiredGroup ?? null,
      parentId: data.parentId ?? null,
      updatedAt: new Date(),
    })
    .where(eq(menus.id, id));

  revalidatePath("/dashboard/menus");
  revalidatePath("/dashboard", "layout");
  redirect("/dashboard/menus");
}

export async function deleteMenuAction(fd: FormData) {
  await requirePermission("menu.delete");
  const id = String(fd.get("id") ?? "");
  if (!id) return;

  await db.delete(menus).where(eq(menus.id, id));
  revalidatePath("/dashboard/menus");
  revalidatePath("/dashboard", "layout");
  redirect("/dashboard/menus");
}
