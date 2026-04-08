"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { db, ourCompanyPage, ourCompanyClients } from "@/db";
import { requirePermission } from "../../../lib/rbac";
import {
  saveClientLogo,
  deleteClientLogo,
  saveStoryImage,
  deleteStoryImage,
} from "../upload";

export type FormState = { error?: string; success?: string };

const SINGLETON_ID = "singleton";

function isFile(v: FormDataEntryValue | null): v is File {
  return (
    typeof v === "object" &&
    v !== null &&
    "size" in v &&
    "type" in v &&
    "arrayBuffer" in v
  );
}

function nullable(v: FormDataEntryValue | null): string | null {
  if (v === null) return null;
  const s = String(v).trim();
  return s.length === 0 ? null : s;
}

// ---------- Story (singleton) ----------

const storySchema = z.object({
  storyEyebrow: z.string().min(1).max(120),
  storyHeading: z.string().min(1).max(200),
  storyHeadingAccent: z.string().min(1).max(100),
  storyBody: z.string().min(10).max(10000),
  estYear: z.string().min(2).max(20),
});

export async function updateOurCompanyStoryAction(
  _prev: FormState,
  fd: FormData
): Promise<FormState> {
  await requirePermission("our_company.edit");

  const parsed = storySchema.safeParse({
    storyEyebrow: fd.get("storyEyebrow"),
    storyHeading: fd.get("storyHeading"),
    storyHeadingAccent: fd.get("storyHeadingAccent"),
    storyBody: fd.get("storyBody"),
    estYear: fd.get("estYear"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const currentRows = await db
    .select()
    .from(ourCompanyPage)
    .where(eq(ourCompanyPage.id, SINGLETON_ID))
    .limit(1);
  const current = currentRows[0];
  let storyImageUrl = current?.storyImageUrl ?? null;

  // Cover image: upload/remove
  const removeRequested = fd.get("removeStoryImage") === "on";
  const file = fd.get("storyImageFile");
  if (isFile(file) && file.size > 0) {
    try {
      storyImageUrl = await saveStoryImage(file);
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Failed to upload image.",
      };
    }
    if (current?.storyImageUrl && current.storyImageUrl !== storyImageUrl) {
      await deleteStoryImage(current.storyImageUrl);
    }
  } else if (removeRequested) {
    if (current?.storyImageUrl) await deleteStoryImage(current.storyImageUrl);
    storyImageUrl = null;
  }

  if (!current) {
    await db.insert(ourCompanyPage).values({
      id: SINGLETON_ID,
      ...parsed.data,
      storyImageUrl,
    });
  } else {
    await db
      .update(ourCompanyPage)
      .set({ ...parsed.data, storyImageUrl, updatedAt: new Date() })
      .where(eq(ourCompanyPage.id, SINGLETON_ID));
  }

  revalidatePath("/dashboard/about-us/our-company");
  revalidatePath("/about-us/our-company");
  return { success: "Story updated." };
}

// ---------- Clients ----------

const clientSchema = z.object({
  name: z.string().min(1).max(200),
  websiteUrl: z.string().max(500).optional().nullable(),
  sortOrder: z.coerce.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

const clientUpdateSchema = clientSchema.extend({ id: z.string().min(1) });

export async function createClientAction(
  _prev: FormState,
  fd: FormData
): Promise<FormState> {
  await requirePermission("our_company.edit");

  const parsed = clientSchema.safeParse({
    name: fd.get("name"),
    websiteUrl: nullable(fd.get("websiteUrl")),
    sortOrder: fd.get("sortOrder") || 0,
    isActive: fd.get("isActive") === "on",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  let logoUrl: string | null = null;
  const logoFile = fd.get("logoFile");
  if (isFile(logoFile) && logoFile.size > 0) {
    try {
      logoUrl = await saveClientLogo(logoFile);
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Failed to upload logo.",
      };
    }
  }

  await db.insert(ourCompanyClients).values({
    id: randomUUID(),
    name: parsed.data.name,
    websiteUrl: parsed.data.websiteUrl ?? null,
    logoUrl,
    sortOrder: parsed.data.sortOrder,
    isActive: parsed.data.isActive,
  });

  revalidatePath("/dashboard/about-us/our-company");
  revalidatePath("/about-us/our-company");
  redirect("/dashboard/about-us/our-company");
}

export async function updateClientAction(
  _prev: FormState,
  fd: FormData
): Promise<FormState> {
  await requirePermission("our_company.edit");

  const parsed = clientUpdateSchema.safeParse({
    id: fd.get("id"),
    name: fd.get("name"),
    websiteUrl: nullable(fd.get("websiteUrl")),
    sortOrder: fd.get("sortOrder") || 0,
    isActive: fd.get("isActive") === "on",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const { id, ...data } = parsed.data;

  const currentRows = await db
    .select()
    .from(ourCompanyClients)
    .where(eq(ourCompanyClients.id, id))
    .limit(1);
  if (currentRows.length === 0) return { error: "Client not found." };
  const current = currentRows[0];

  let logoUrl = current.logoUrl;
  const removeRequested = fd.get("removeLogo") === "on";
  const logoFile = fd.get("logoFile");
  if (isFile(logoFile) && logoFile.size > 0) {
    try {
      logoUrl = await saveClientLogo(logoFile);
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Failed to upload logo.",
      };
    }
    if (current.logoUrl && current.logoUrl !== logoUrl) {
      await deleteClientLogo(current.logoUrl);
    }
  } else if (removeRequested) {
    if (current.logoUrl) await deleteClientLogo(current.logoUrl);
    logoUrl = null;
  }

  await db
    .update(ourCompanyClients)
    .set({
      ...data,
      websiteUrl: data.websiteUrl ?? null,
      logoUrl,
      updatedAt: new Date(),
    })
    .where(eq(ourCompanyClients.id, id));

  revalidatePath("/dashboard/about-us/our-company");
  revalidatePath("/about-us/our-company");
  redirect("/dashboard/about-us/our-company");
}

export async function deleteClientAction(fd: FormData) {
  await requirePermission("our_company.edit");
  const id = String(fd.get("id") ?? "");
  if (!id) return;

  const currentRows = await db
    .select()
    .from(ourCompanyClients)
    .where(eq(ourCompanyClients.id, id))
    .limit(1);

  await db.delete(ourCompanyClients).where(eq(ourCompanyClients.id, id));

  if (currentRows[0]?.logoUrl) {
    await deleteClientLogo(currentRows[0].logoUrl);
  }

  revalidatePath("/dashboard/about-us/our-company");
  revalidatePath("/about-us/our-company");
  redirect("/dashboard/about-us/our-company");
}
