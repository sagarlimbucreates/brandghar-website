"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { db, contactPage, contactTrustPoints } from "@/db";
import { requirePermission } from "../../lib/rbac";

export type FormState = { error?: string; success?: string };

const SINGLETON_ID = "singleton";

function nullable(v: FormDataEntryValue | null): string | null {
  if (v === null) return null;
  const s = String(v).trim();
  return s.length === 0 ? null : s;
}

// ---------- Contact page singleton ----------

const pageSchema = z.object({
  heroEyebrow: z.string().min(1).max(120),
  heroHeading: z.string().min(1).max(200),
  heroHeadingAccent: z.string().min(1).max(200),
  heroSubtitle: z.string().min(10).max(2000),
  phoneNumber: z.string().min(3).max(60),
  phoneHours: z.string().max(120).optional().nullable(),
  locationLabel: z.string().min(1).max(200),
  locationUrl: z.string().max(500).optional().nullable(),
  emailAddress: z.string().email().max(200),
  emailReplyNote: z.string().max(200).optional().nullable(),
  mapEmbedUrl: z.string().max(2000).optional().nullable(),
  instagramUrl: z.string().max(500).optional().nullable(),
  facebookUrl: z.string().max(500).optional().nullable(),
  tiktokUrl: z.string().max(500).optional().nullable(),
  linkedinUrl: z.string().max(500).optional().nullable(),
  quickHelpHeading: z.string().min(1).max(120),
  whatsappUrl: z.string().max(500).optional().nullable(),
});

export async function updateContactPageAction(
  _prev: FormState,
  fd: FormData
): Promise<FormState> {
  await requirePermission("contact_page.edit");

  const parsed = pageSchema.safeParse({
    heroEyebrow: fd.get("heroEyebrow"),
    heroHeading: fd.get("heroHeading"),
    heroHeadingAccent: fd.get("heroHeadingAccent"),
    heroSubtitle: fd.get("heroSubtitle"),
    phoneNumber: fd.get("phoneNumber"),
    phoneHours: nullable(fd.get("phoneHours")),
    locationLabel: fd.get("locationLabel"),
    locationUrl: nullable(fd.get("locationUrl")),
    emailAddress: fd.get("emailAddress"),
    emailReplyNote: nullable(fd.get("emailReplyNote")),
    mapEmbedUrl: nullable(fd.get("mapEmbedUrl")),
    instagramUrl: nullable(fd.get("instagramUrl")),
    facebookUrl: nullable(fd.get("facebookUrl")),
    tiktokUrl: nullable(fd.get("tiktokUrl")),
    linkedinUrl: nullable(fd.get("linkedinUrl")),
    quickHelpHeading: fd.get("quickHelpHeading"),
    whatsappUrl: nullable(fd.get("whatsappUrl")),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const data = {
    ...parsed.data,
    phoneHours: parsed.data.phoneHours ?? null,
    locationUrl: parsed.data.locationUrl ?? null,
    emailReplyNote: parsed.data.emailReplyNote ?? null,
    mapEmbedUrl: parsed.data.mapEmbedUrl ?? null,
    instagramUrl: parsed.data.instagramUrl ?? null,
    facebookUrl: parsed.data.facebookUrl ?? null,
    tiktokUrl: parsed.data.tiktokUrl ?? null,
    linkedinUrl: parsed.data.linkedinUrl ?? null,
    whatsappUrl: parsed.data.whatsappUrl ?? null,
  };

  const current = await db
    .select()
    .from(contactPage)
    .where(eq(contactPage.id, SINGLETON_ID))
    .limit(1);

  if (current.length === 0) {
    await db.insert(contactPage).values({ id: SINGLETON_ID, ...data });
  } else {
    await db
      .update(contactPage)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(contactPage.id, SINGLETON_ID));
  }

  revalidatePath("/dashboard/contact");
  revalidatePath("/contact");
  return { success: "Contact page updated." };
}

// ---------- Trust points CRUD ----------

const trustSchema = z.object({
  text: z.string().min(1).max(200),
  icon: z.string().min(1).max(50),
  sortOrder: z.coerce.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

const trustUpdateSchema = trustSchema.extend({ id: z.string().min(1) });

export async function createTrustPointAction(
  _prev: FormState,
  fd: FormData
): Promise<FormState> {
  await requirePermission("contact_page.edit");

  const parsed = trustSchema.safeParse({
    text: fd.get("text"),
    icon: fd.get("icon"),
    sortOrder: fd.get("sortOrder") || 0,
    isActive: fd.get("isActive") === "on",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  await db.insert(contactTrustPoints).values({
    id: randomUUID(),
    ...parsed.data,
  });

  revalidatePath("/dashboard/contact");
  revalidatePath("/contact");
  redirect("/dashboard/contact");
}

export async function updateTrustPointAction(
  _prev: FormState,
  fd: FormData
): Promise<FormState> {
  await requirePermission("contact_page.edit");

  const parsed = trustUpdateSchema.safeParse({
    id: fd.get("id"),
    text: fd.get("text"),
    icon: fd.get("icon"),
    sortOrder: fd.get("sortOrder") || 0,
    isActive: fd.get("isActive") === "on",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const { id, ...data } = parsed.data;

  await db
    .update(contactTrustPoints)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(contactTrustPoints.id, id));

  revalidatePath("/dashboard/contact");
  revalidatePath("/contact");
  redirect("/dashboard/contact");
}

export async function deleteTrustPointAction(fd: FormData) {
  await requirePermission("contact_page.edit");
  const id = String(fd.get("id") ?? "");
  if (!id) return;

  await db.delete(contactTrustPoints).where(eq(contactTrustPoints.id, id));
  revalidatePath("/dashboard/contact");
  revalidatePath("/contact");
  redirect("/dashboard/contact");
}
