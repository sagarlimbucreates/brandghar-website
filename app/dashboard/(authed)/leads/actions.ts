"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db, leads } from "@/db";
import { requirePermission, requireUser } from "../../lib/rbac";

export async function markLeadReadAction(fd: FormData) {
  await requirePermission("lead.edit");
  const me = await requireUser();
  const id = String(fd.get("id") ?? "");
  if (!id) return;

  await db
    .update(leads)
    .set({ isRead: true, readAt: new Date(), readBy: me.id })
    .where(eq(leads.id, id));

  revalidatePath("/dashboard/leads");
  revalidatePath(`/dashboard/leads/${id}`);
}

export async function markLeadUnreadAction(fd: FormData) {
  await requirePermission("lead.edit");
  const id = String(fd.get("id") ?? "");
  if (!id) return;

  await db
    .update(leads)
    .set({ isRead: false, readAt: null, readBy: null })
    .where(eq(leads.id, id));

  revalidatePath("/dashboard/leads");
  revalidatePath(`/dashboard/leads/${id}`);
}

export async function markAllLeadsReadAction() {
  await requirePermission("lead.edit");
  const me = await requireUser();

  await db
    .update(leads)
    .set({ isRead: true, readAt: new Date(), readBy: me.id })
    .where(eq(leads.isRead, false));

  revalidatePath("/dashboard/leads");
}

const VALID_STATUSES = ["pending", "follow_up", "re_follow", "converted"] as const;

export async function updateLeadStatusAction(fd: FormData) {
  await requirePermission("lead.edit");
  const id = String(fd.get("id") ?? "");
  const status = String(fd.get("status") ?? "");
  if (!id || !VALID_STATUSES.includes(status as (typeof VALID_STATUSES)[number])) return;

  await db
    .update(leads)
    .set({ status })
    .where(eq(leads.id, id));

  revalidatePath("/dashboard/leads");
  revalidatePath(`/dashboard/leads/${id}`);
}

export async function deleteLeadAction(fd: FormData) {
  await requirePermission("lead.delete");
  const id = String(fd.get("id") ?? "");
  if (!id) return;

  await db.delete(leads).where(eq(leads.id, id));
  revalidatePath("/dashboard/leads");
  redirect("/dashboard/leads");
}
