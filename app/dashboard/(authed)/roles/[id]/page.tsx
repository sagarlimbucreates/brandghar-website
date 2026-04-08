import { notFound } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { db, roles, permissions, rolePermissions } from "@/db";
import { requirePermission, hasPermission } from "../../../lib/rbac";
import { PageHeader, Card, FormAlert } from "../../../lib/ui";
import EditRoleForm from "./EditRoleForm";
import RolePermissionsForm from "./RolePermissionsForm";
import DeleteRoleForm from "./DeleteRoleForm";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ error?: string }>;

export default async function EditRolePage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const me = await requirePermission("role.edit");

  const row = await db.select().from(roles).where(eq(roles.id, id)).limit(1);
  const role = row[0];
  if (!role) notFound();

  const allPerms = await db
    .select()
    .from(permissions)
    .orderBy(asc(permissions.group), asc(permissions.key));

  const assigned = await db
    .select({ permissionId: rolePermissions.permissionId })
    .from(rolePermissions)
    .where(eq(rolePermissions.roleId, id));

  const assignedIds = new Set(assigned.map((a) => a.permissionId));

  // Group permissions for the UI
  const permsByGroup = allPerms.reduce<
    Record<string, typeof allPerms>
  >((acc, p) => {
    acc[p.group] ??= [];
    acc[p.group].push(p);
    return acc;
  }, {});

  const canManagePerms = hasPermission(me, "role.manage_permissions");
  const canDelete = hasPermission(me, "role.delete") && !role.isSystem;

  return (
    <div className="max-w-3xl">
      <PageHeader
        eyebrow="Access Control"
        title="Edit Role"
        subtitle={role.displayName}
        backHref="/dashboard/roles"
      />

      <FormAlert error={error} />

      <Card className="p-8 mb-6">
        <h2 className="text-sm font-sans font-bold text-[#1A1A1A] mb-5">
          Details
        </h2>
        <EditRoleForm
          role={{
            id: role.id,
            name: role.name,
            displayName: role.displayName,
            description: role.description ?? "",
            isSystem: role.isSystem,
          }}
        />
      </Card>

      {canManagePerms && (
        <Card className="p-8 mb-6">
          <h2 className="text-sm font-sans font-bold text-[#1A1A1A] mb-1">
            Permissions
          </h2>
          <p className="text-xs text-[#888] font-sans mb-5">
            Toggle which permissions this role grants.
          </p>
          <RolePermissionsForm
            roleId={role.id}
            permsByGroup={permsByGroup}
            assignedIds={Array.from(assignedIds)}
          />
        </Card>
      )}

      {canDelete && (
        <Card className="p-8 border-[#E02020]/30">
          <h2 className="text-sm font-sans font-bold text-[#CC0000] mb-2">
            Danger Zone
          </h2>
          <p className="text-xs text-[#888] font-sans mb-5">
            Permanently delete this role. Users currently assigned to it must
            be reassigned first, or deletion will fail.
          </p>
          <DeleteRoleForm roleId={role.id} />
        </Card>
      )}
    </div>
  );
}
