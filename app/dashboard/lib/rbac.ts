import "server-only";
import { redirect } from "next/navigation";
import { eq, and } from "drizzle-orm";
import { db, users, roles, permissions, rolePermissions, userPermissions } from "@/db";
import { getSession } from "./session";

export type AuthedUser = {
  id: string;
  email: string;
  fullName: string;
  roleName: string;
  permissions: string[];
};

/**
 * Resolves the effective permission set for a user:
 *   role_permissions ∪ user_permissions[grant] − user_permissions[deny]
 */
export async function getEffectivePermissions(userId: string): Promise<string[]> {
  const rolePermRows = await db
    .select({ key: permissions.key })
    .from(users)
    .innerJoin(rolePermissions, eq(rolePermissions.roleId, users.roleId))
    .innerJoin(permissions, eq(permissions.id, rolePermissions.permissionId))
    .where(eq(users.id, userId));

  const userPermRows = await db
    .select({ key: permissions.key, effect: userPermissions.effect })
    .from(userPermissions)
    .innerJoin(permissions, eq(permissions.id, userPermissions.permissionId))
    .where(eq(userPermissions.userId, userId));

  const set = new Set(rolePermRows.map((r) => r.key));
  for (const row of userPermRows) {
    if (row.effect === "grant") set.add(row.key);
    if (row.effect === "deny") set.delete(row.key);
  }
  return Array.from(set).sort();
}

/**
 * Loads the currently logged-in user fresh from the DB every call.
 * Returns null if not authenticated.
 */
export async function getCurrentUser(): Promise<AuthedUser | null> {
  const session = await getSession();
  if (!session.userId) return null;

  const rows = await db
    .select({
      id: users.id,
      email: users.email,
      fullName: users.fullName,
      isActive: users.isActive,
      roleName: roles.name,
    })
    .from(users)
    .innerJoin(roles, eq(roles.id, users.roleId))
    .where(and(eq(users.id, session.userId), eq(users.isActive, true)))
    .limit(1);

  const row = rows[0];
  if (!row) return null;

  const perms = await getEffectivePermissions(row.id);

  return {
    id: row.id,
    email: row.email,
    fullName: row.fullName,
    roleName: row.roleName,
    permissions: perms,
  };
}

/**
 * Use in server components / server actions that require authentication.
 * Redirects to /dashboard/login if the user is not signed in.
 */
export async function requireUser(): Promise<AuthedUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/dashboard/login");
  return user;
}

/**
 * Use in server components that require a specific permission.
 * Redirects unauthenticated users to login and unauthorized users to /dashboard.
 */
export async function requirePermission(permissionKey: string): Promise<AuthedUser> {
  const user = await requireUser();
  if (!user.permissions.includes(permissionKey)) {
    redirect("/dashboard?denied=" + encodeURIComponent(permissionKey));
  }
  return user;
}

export function hasPermission(user: AuthedUser, permissionKey: string): boolean {
  return user.permissions.includes(permissionKey);
}

export function hasAnyPermissionInGroup(user: AuthedUser, group: string): boolean {
  const prefix = `${group}.`;
  return user.permissions.some((p) => p === group || p.startsWith(prefix));
}
