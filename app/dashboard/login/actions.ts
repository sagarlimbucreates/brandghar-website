"use server";

import { redirect } from "next/navigation";
import { eq, and } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db, users, roles } from "@/db";
import { getSession } from "../lib/session";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  next: z.string().optional(),
});

export type LoginState = {
  error?: string;
};

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    next: formData.get("next") || undefined,
  });

  if (!parsed.success) {
    return { error: "Please enter a valid email and password." };
  }

  const { email, password, next } = parsed.data;

  const rows = await db
    .select({
      id: users.id,
      email: users.email,
      passwordHash: users.passwordHash,
      isActive: users.isActive,
      roleName: roles.name,
    })
    .from(users)
    .innerJoin(roles, eq(roles.id, users.roleId))
    .where(and(eq(users.email, email)))
    .limit(1);

  const user = rows[0];

  // Generic error to avoid enumeration.
  const GENERIC = "Invalid email or password.";

  if (!user || !user.isActive) {
    return { error: GENERIC };
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return { error: GENERIC };
  }

  // Update last login
  await db
    .update(users)
    .set({ lastLoginAt: new Date(), failedLoginCount: 0 })
    .where(eq(users.id, user.id));

  const session = await getSession();
  session.userId = user.id;
  session.email = user.email;
  session.roleName = user.roleName;
  await session.save();

  const target =
    next && next.startsWith("/dashboard") ? next : "/dashboard";
  redirect(target);
}

export async function logoutAction() {
  const session = await getSession();
  session.destroy();
  redirect("/dashboard/login");
}
