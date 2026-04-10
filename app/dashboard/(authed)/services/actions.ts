"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { db, services } from "@/db";
import { requirePermission } from "../../lib/rbac";

function parseJSON(val: string, fallback: unknown) {
  try {
    return JSON.parse(val);
  } catch {
    return fallback;
  }
}

function str(fd: FormData, key: string): string {
  return String(fd.get(key) ?? "").trim();
}

function extractServiceData(fd: FormData) {
  return {
    slug: str(fd, "slug"),
    title: str(fd, "title"),
    eyebrow: str(fd, "eyebrow") || "Our Service",
    heading: str(fd, "heading"),
    headingAccent: str(fd, "headingAccent"),
    description: str(fd, "description"),
    secondaryDescription: str(fd, "secondaryDescription") || null,
    heroImageUrl: str(fd, "heroImageUrl") || null,
    icon: str(fd, "icon") || "Briefcase",
    shortDescription: str(fd, "shortDescription"),
    bullets: parseJSON(str(fd, "bullets"), []),
    cardImageUrl: str(fd, "cardImageUrl") || null,
    problems: parseJSON(str(fd, "problems"), []),
    deliverables: parseJSON(str(fd, "deliverables"), []),
    processSteps: parseJSON(str(fd, "processSteps"), []),
    extraSections: parseJSON(str(fd, "extraSections"), []),
    ctaHeading: str(fd, "ctaHeading"),
    ctaDescription: str(fd, "ctaDescription") || null,
    ctaButtonText: str(fd, "ctaButtonText") || "Connect with Us",
    ctaButtonHref: str(fd, "ctaButtonHref") || "/#contact",
    sortOrder: Number(fd.get("sortOrder")) || 0,
    isActive: fd.get("isActive") === "on",
  };
}

export async function createServiceAction(fd: FormData) {
  await requirePermission("service.create");
  const data = extractServiceData(fd);

  await db.insert(services).values({
    id: randomUUID(),
    ...data,
  });

  revalidatePath("/dashboard/services");
  redirect("/dashboard/services");
}

export async function updateServiceAction(fd: FormData) {
  await requirePermission("service.edit");
  const id = str(fd, "id");
  if (!id) return;
  const data = extractServiceData(fd);

  await db
    .update(services)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(services.id, id));

  revalidatePath("/dashboard/services");
  revalidatePath(`/dashboard/services/${id}`);
  revalidatePath(`/services/${data.slug}`);
  redirect("/dashboard/services");
}

export async function deleteServiceAction(fd: FormData) {
  await requirePermission("service.delete");
  const id = str(fd, "id");
  if (!id) return;

  await db.delete(services).where(eq(services.id, id));

  revalidatePath("/dashboard/services");
  redirect("/dashboard/services");
}
