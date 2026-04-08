import Link from "next/link";
import Image from "next/image";
import { asc } from "drizzle-orm";
import { Plus, Pencil, User as UserIcon } from "lucide-react";
import { db, teamMembers } from "@/db";
import { requirePermission, hasPermission } from "../../lib/rbac";
import { PageHeader, Card, Button, TableHeader, Th, Td, Badge } from "../../lib/ui";

export default async function TeamPage() {
  const me = await requirePermission("team.view");

  const rows = await db
    .select()
    .from(teamMembers)
    .orderBy(asc(teamMembers.sortOrder), asc(teamMembers.fullName));

  const canCreate = hasPermission(me, "team.create");
  const canEdit = hasPermission(me, "team.edit");

  return (
    <div>
      <PageHeader
        eyebrow="Website Content"
        title={`Team (${rows.length})`}
        subtitle="Public team members shown on /about-us/our-team."
        actions={
          canCreate && (
            <Button href="/dashboard/team/new">
              <Plus size={14} /> New Member
            </Button>
          )
        }
      />

      <Card className="overflow-hidden">
        <table className="w-full">
          <TableHeader>
            <Th>Sort</Th>
            <Th>Photo</Th>
            <Th>Name</Th>
            <Th>Role</Th>
            <Th>Status</Th>
            <Th>&nbsp;</Th>
          </TableHeader>
          <tbody>
            {rows.map((m) => (
              <tr key={m.id} className="border-b border-[#E5E5E5] last:border-b-0">
                <Td className="font-mono text-[#888]">{m.sortOrder}</Td>
                <Td>
                  {m.photoUrl ? (
                    <Image
                      src={m.photoUrl}
                      alt={m.fullName}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover border border-[#E5E5E5]"
                      unoptimized
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#F7F7F7] border border-[#E5E5E5] flex items-center justify-center">
                      <UserIcon size={16} className="text-[#888]" />
                    </div>
                  )}
                </Td>
                <Td className="font-medium text-[#1A1A1A]">{m.fullName}</Td>
                <Td>{m.role}</Td>
                <Td>
                  {m.isActive ? (
                    <Badge tone="success">Visible</Badge>
                  ) : (
                    <Badge tone="muted">Hidden</Badge>
                  )}
                </Td>
                <Td className="text-right">
                  {canEdit && (
                    <Link
                      href={`/dashboard/team/${m.id}`}
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
