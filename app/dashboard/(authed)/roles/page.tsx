import Link from "next/link";
import { asc, eq, sql } from "drizzle-orm";
import { Plus, Pencil } from "lucide-react";
import { db, roles, users, rolePermissions } from "@/db";
import { requirePermission, hasPermission } from "../../lib/rbac";
import { PageHeader, Card, Button, TableHeader, Th, Td, Badge } from "../../lib/ui";

export default async function RolesPage() {
  const me = await requirePermission("role.view");

  const rows = await db
    .select({
      id: roles.id,
      name: roles.name,
      displayName: roles.displayName,
      description: roles.description,
      isSystem: roles.isSystem,
      userCount: sql<number>`COUNT(DISTINCT ${users.id})`.as("user_count"),
      permCount: sql<number>`COUNT(DISTINCT ${rolePermissions.permissionId})`.as("perm_count"),
    })
    .from(roles)
    .leftJoin(users, eq(users.roleId, roles.id))
    .leftJoin(rolePermissions, eq(rolePermissions.roleId, roles.id))
    .groupBy(roles.id)
    .orderBy(asc(roles.name));

  const canCreate = hasPermission(me, "role.create");
  const canEdit = hasPermission(me, "role.edit");

  return (
    <div>
      <PageHeader
        eyebrow="Access Control"
        title={`Roles (${rows.length})`}
        subtitle="Roles group permissions and are assigned to users."
        actions={
          canCreate && (
            <Button href="/dashboard/roles/new">
              <Plus size={14} /> New Role
            </Button>
          )
        }
      />

      <Card className="overflow-hidden">
        <table className="w-full">
          <TableHeader>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Users</Th>
            <Th>Permissions</Th>
            <Th>Type</Th>
            <Th>&nbsp;</Th>
          </TableHeader>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-[#E5E5E5] last:border-b-0">
                <Td className="font-medium text-[#1A1A1A]">
                  <div>{r.displayName}</div>
                  <div className="text-xs text-[#888] font-mono mt-0.5">{r.name}</div>
                </Td>
                <Td className="max-w-xs truncate">{r.description ?? "—"}</Td>
                <Td>{r.userCount}</Td>
                <Td>{r.permCount}</Td>
                <Td>
                  {r.isSystem ? (
                    <Badge tone="muted">System</Badge>
                  ) : (
                    <Badge tone="accent">Custom</Badge>
                  )}
                </Td>
                <Td className="text-right">
                  {canEdit && (
                    <Link
                      href={`/dashboard/roles/${r.id}`}
                      className="inline-flex items-center gap-1 text-xs text-[#E02020] hover:text-[#FF3333] font-sans font-semibold"
                    >
                      <Pencil size={12} /> Edit
                    </Link>
                  )}
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
