"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { db, teamMembers } from "@/db";
import { requirePermission } from "../../lib/rbac";
import { saveTeamPhoto, deleteTeamPhoto } from "./upload";

export type FormState = { error?: string; success?: string };

const baseSchema = z.object({
  fullName: z.string().min(1).max(120),
  role: z.string().min(1).max(120),
  bio: z.string().max(2000).optional().nullable(),
  linkedinUrl: z
    .string()
    .max(500)
    .optional()
    .nullable()
    .refine(
      (v) =>
        !v || v.startsWith("http://") || v.startsWith("https://") || v === "",
      { message: "LinkedIn URL must start with http:// or https://" }
    ),
  sortOrder: z.coerce.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

function nullable(v: FormDataEntryValue | null): string | null {
  if (v === null) return null;
  const s = String(v).trim();
  return s.length === 0 ? null : s;
}

function isFile(v: FormDataEntryValue | null): v is File {
  return (
    typeof v === "object" &&
    v !== null &&
    "size" in v &&
    "type" in v &&
    "arrayBuffer" in v
  );
}

export async function createTeamMemberAction(
  _prev: FormState,
  fd: FormData
): Promise<FormState> {
  await requirePermission("team.create");

  const parsed = baseSchema.safeParse({
    fullName: fd.get("fullName"),
    role: fd.get("role"),
    bio: nullable(fd.get("bio")),
    linkedinUrl: nullable(fd.get("linkedinUrl")),
    sortOrder: fd.get("sortOrder") || 0,
    isActive: fd.get("isActive") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  // Handle optional photo upload
  let photoUrl: string | null = null;
  const photoFile = fd.get("photoFile");
  if (isFile(photoFile) && photoFile.size > 0) {
    try {
      photoUrl = await saveTeamPhoto(photoFile);
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Failed to upload photo.",
      };
    }
  }

  await db.insert(teamMembers).values({
    id: randomUUID(),
    fullName: parsed.data.fullName,
    role: parsed.data.role,
    bio: parsed.data.bio ?? null,
    photoUrl,
    linkedinUrl: parsed.data.linkedinUrl ?? null,
    sortOrder: parsed.data.sortOrder,
    isActive: parsed.data.isActive,
  });

  revalidatePath("/dashboard/team");
  revalidatePath("/about-us/our-team");
  redirect("/dashboard/team");
}

export async function updateTeamMemberAction(
  _prev: FormState,
  fd: FormData
): Promise<FormState> {
  await requirePermission("team.edit");

  const id = String(fd.get("id") ?? "");
  if (!id) return { error: "Missing member id." };

  const parsed = baseSchema.safeParse({
    fullName: fd.get("fullName"),
    role: fd.get("role"),
    bio: nullable(fd.get("bio")),
    linkedinUrl: nullable(fd.get("linkedinUrl")),
    sortOrder: fd.get("sortOrder") || 0,
    isActive: fd.get("isActive") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  // Load current record so we know the previous photo.
  const current = await db
    .select()
    .from(teamMembers)
    .where(eq(teamMembers.id, id))
    .limit(1);
  if (current.length === 0) return { error: "Team member not found." };
  const existingPhoto = current[0].photoUrl;

  // Decide next photo URL:
  //   1. If a file was uploaded, save it and delete the old one.
  //   2. Else if "removePhoto" checkbox was set, clear and delete old.
  //   3. Else keep the existing photo.
  let nextPhotoUrl = existingPhoto;
  const removeRequested = fd.get("removePhoto") === "on";
  const photoFile = fd.get("photoFile");

  if (isFile(photoFile) && photoFile.size > 0) {
    try {
      nextPhotoUrl = await saveTeamPhoto(photoFile);
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Failed to upload photo.",
      };
    }
    if (existingPhoto && existingPhoto !== nextPhotoUrl) {
      await deleteTeamPhoto(existingPhoto);
    }
  } else if (removeRequested) {
    nextPhotoUrl = null;
    if (existingPhoto) await deleteTeamPhoto(existingPhoto);
  }

  await db
    .update(teamMembers)
    .set({
      fullName: parsed.data.fullName,
      role: parsed.data.role,
      bio: parsed.data.bio ?? null,
      linkedinUrl: parsed.data.linkedinUrl ?? null,
      sortOrder: parsed.data.sortOrder,
      isActive: parsed.data.isActive,
      photoUrl: nextPhotoUrl,
      updatedAt: new Date(),
    })
    .where(eq(teamMembers.id, id));

  revalidatePath("/dashboard/team");
  revalidatePath("/about-us/our-team");
  redirect("/dashboard/team");
}

export async function deleteTeamMemberAction(fd: FormData) {
  await requirePermission("team.delete");
  const id = String(fd.get("id") ?? "");
  if (!id) return;

  // Load to capture photo path for cleanup.
  const current = await db
    .select()
    .from(teamMembers)
    .where(eq(teamMembers.id, id))
    .limit(1);

  await db.delete(teamMembers).where(eq(teamMembers.id, id));

  if (current[0]?.photoUrl) {
    await deleteTeamPhoto(current[0].photoUrl);
  }

  revalidatePath("/dashboard/team");
  revalidatePath("/about-us/our-team");
  redirect("/dashboard/team");
}
