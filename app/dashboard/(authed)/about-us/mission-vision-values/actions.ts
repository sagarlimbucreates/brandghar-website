"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { db, missionVisionPage, coreValues } from "@/db";
import { requirePermission } from "../../../lib/rbac";

export type FormState = { error?: string; success?: string };

const SINGLETON_ID = "singleton";

// ---------- Mission / Vision singleton ----------

const mvvSchema = z.object({
  missionText: z.string().min(10).max(5000),
  visionText: z.string().min(10).max(5000),
});

export async function updateMissionVisionAction(
  _prev: FormState,
  fd: FormData
): Promise<FormState> {
  await requirePermission("mission_vision.edit");

  const parsed = mvvSchema.safeParse({
    missionText: fd.get("missionText"),
    visionText: fd.get("visionText"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const current = await db
    .select()
    .from(missionVisionPage)
    .where(eq(missionVisionPage.id, SINGLETON_ID))
    .limit(1);

  if (current.length === 0) {
    await db.insert(missionVisionPage).values({
      id: SINGLETON_ID,
      ...parsed.data,
    });
  } else {
    await db
      .update(missionVisionPage)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(missionVisionPage.id, SINGLETON_ID));
  }

  revalidatePath("/dashboard/about-us/mission-vision-values");
  revalidatePath("/about-us/mission-vision-values");
  return { success: "Mission & vision updated." };
}

// ---------- Core values CRUD ----------

const valueSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  icon: z.string().min(1).max(50),
  sortOrder: z.coerce.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

const valueUpdateSchema = valueSchema.extend({ id: z.string().min(1) });

export async function createCoreValueAction(
  _prev: FormState,
  fd: FormData
): Promise<FormState> {
  await requirePermission("mission_vision.edit");

  const parsed = valueSchema.safeParse({
    title: fd.get("title"),
    description: fd.get("description"),
    icon: fd.get("icon"),
    sortOrder: fd.get("sortOrder") || 0,
    isActive: fd.get("isActive") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  await db.insert(coreValues).values({
    id: randomUUID(),
    ...parsed.data,
  });

  revalidatePath("/dashboard/about-us/mission-vision-values");
  revalidatePath("/about-us/mission-vision-values");
  redirect("/dashboard/about-us/mission-vision-values");
}

export async function updateCoreValueAction(
  _prev: FormState,
  fd: FormData
): Promise<FormState> {
  await requirePermission("mission_vision.edit");

  const parsed = valueUpdateSchema.safeParse({
    id: fd.get("id"),
    title: fd.get("title"),
    description: fd.get("description"),
    icon: fd.get("icon"),
    sortOrder: fd.get("sortOrder") || 0,
    isActive: fd.get("isActive") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const { id, ...data } = parsed.data;

  await db
    .update(coreValues)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(coreValues.id, id));

  revalidatePath("/dashboard/about-us/mission-vision-values");
  revalidatePath("/about-us/mission-vision-values");
  redirect("/dashboard/about-us/mission-vision-values");
}

export async function deleteCoreValueAction(fd: FormData) {
  await requirePermission("mission_vision.edit");
  const id = String(fd.get("id") ?? "");
  if (!id) return;

  await db.delete(coreValues).where(eq(coreValues.id, id));

  revalidatePath("/dashboard/about-us/mission-vision-values");
  revalidatePath("/about-us/mission-vision-values");
  redirect("/dashboard/about-us/mission-vision-values");
}
