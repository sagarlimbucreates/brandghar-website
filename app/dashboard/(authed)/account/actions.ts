"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db, users } from "@/db";
import { requireUser } from "../../lib/rbac";
import { getSession } from "../../lib/session";

export type FormState = { error?: string; success?: string };

// ---------- Profile update ----------

const profileSchema = z.object({
  fullName: z.string().min(1).max(120),
});

export async function updateProfileAction(
  _prev: FormState,
  fd: FormData
): Promise<FormState> {
  const me = await requireUser();

  const parsed = profileSchema.safeParse({
    fullName: fd.get("fullName"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  await db
    .update(users)
    .set({ fullName: parsed.data.fullName, updatedAt: new Date() })
    .where(eq(users.id, me.id));

  revalidatePath("/dashboard", "layout");
  return { success: "Profile updated." };
}

// ---------- Password change ----------

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required."),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters."),
    confirmPassword: z.string().min(1, "Please confirm the new password."),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "New password and confirmation do not match.",
    path: ["confirmPassword"],
  })
  .refine((d) => d.newPassword !== d.currentPassword, {
    message: "New password must be different from current password.",
    path: ["newPassword"],
  });

export async function changePasswordAction(
  _prev: FormState,
  fd: FormData
): Promise<FormState> {
  const me = await requireUser();

  const parsed = passwordSchema.safeParse({
    currentPassword: fd.get("currentPassword"),
    newPassword: fd.get("newPassword"),
    confirmPassword: fd.get("confirmPassword"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  // Re-fetch the user row to verify the current password.
  const rows = await db
    .select({ id: users.id, passwordHash: users.passwordHash })
    .from(users)
    .where(eq(users.id, me.id))
    .limit(1);

  const user = rows[0];
  if (!user) {
    return { error: "User not found." };
  }

  const ok = await bcrypt.compare(parsed.data.currentPassword, user.passwordHash);
  if (!ok) {
    return { error: "Current password is incorrect." };
  }

  const newHash = await bcrypt.hash(parsed.data.newPassword, 10);
  await db
    .update(users)
    .set({ passwordHash: newHash, updatedAt: new Date() })
    .where(eq(users.id, me.id));

  return { success: "Password updated successfully." };
}

// ---------- Logout (account page convenience) ----------

export async function accountLogoutAction() {
  const session = await getSession();
  session.destroy();
  const { redirect } = await import("next/navigation");
  redirect("/dashboard/login");
}
