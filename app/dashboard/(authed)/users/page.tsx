import Link from "next/link";
import { eq, asc } from "drizzle-orm";
import { Plus, Pencil } from "lucide-react";
import { db, users, roles } from "@/db";
import { requirePermission, hasPermission } from "../../lib/rbac";
import { PageHeader, Card, Button, TableHeader, Th, Td, Badge } from "../../lib/ui";

export default async function UsersPage() {
  const me = await requirePermission("user.view");

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
    .orderBy(asc(users.fullName));

  const canCreate = hasPermission(me, "user.create");
  const canEdit = hasPermission(me, "user.edit");

  return (
    <div>
      <PageHeader
        eyebrow="User Management"
        title={`Users (${rows.length})`}
        subtitle="All staff accounts with their assigned roles."
        actions={
          canCreate && (
            <Button href="/dashboard/users/new">
              <Plus size={14} /> New User
            </Button>
          )
        }
      />

      <Card className="overflow-hidden">
        <table className="w-full">
          <TableHeader>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Status</Th>
            <Th>&nbsp;</Th>
          </TableHeader>
          <tbody>
            {rows.map((u) => (
              <tr key={u.id} className="border-b border-[#E5E5E5] last:border-b-0">
                <Td className="font-medium text-[#1A1A1A]">{u.fullName}</Td>
                <Td>{u.email}</Td>
                <Td>
                  <Badge>{u.roleName.replace("_", " ")}</Badge>
                </Td>
                <Td>
                  {u.isActive ? (
                    <Badge tone="success">Active</Badge>
                  ) : (
                    <Badge tone="muted">Disabled</Badge>
                  )}
                </Td>
                <Td className="text-right">
                  {canEdit && (
                    <Link
                      href={`/dashboard/users/${u.id}`}
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
