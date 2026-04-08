import Link from "next/link";
import { asc } from "drizzle-orm";
import { Plus, Pencil } from "lucide-react";
import { db, permissions } from "@/db";
import { requirePermission, hasPermission } from "../../lib/rbac";
import { PageHeader, Card, Button } from "../../lib/ui";

export default async function PermissionsPage() {
  const me = await requirePermission("permission.view");

  const rows = await db
    .select()
    .from(permissions)
    .orderBy(asc(permissions.group), asc(permissions.key));

  const byGroup = rows.reduce<Record<string, typeof rows>>((acc, p) => {
    acc[p.group] ??= [];
    acc[p.group].push(p);
    return acc;
  }, {});

  const canCreate = hasPermission(me, "permission.create");
  const canEdit = hasPermission(me, "permission.edit");

  return (
    <div>
      <PageHeader
        eyebrow="Access Control"
        title={`Permissions (${rows.length})`}
        subtitle="Granular permission keys that are assigned to roles."
        actions={
          canCreate && (
            <Button href="/dashboard/permissions/new">
              <Plus size={14} /> New Permission
            </Button>
          )
        }
      />

      <div className="space-y-6">
        {Object.entries(byGroup).map(([group, perms]) => (
          <Card key={group} className="p-6">
            <h2 className="text-xs font-sans font-semibold uppercase tracking-[0.1em] text-[#E02020] mb-4">
              {group} ({perms.length})
            </h2>
            <div className="divide-y divide-[#E5E5E5]">
              {perms.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between py-3"
                >
                  <div className="min-w-0">
                    <code className="text-sm font-mono text-[#1A1A1A] font-semibold block truncate">
                      {p.key}
                    </code>
                    {p.description && (
                      <p className="text-xs text-[#888] font-sans mt-0.5">
                        {p.description}
                      </p>
                    )}
                  </div>
                  {canEdit && (
                    <Link
                      href={`/dashboard/permissions/${p.id}`}
                      className="inline-flex items-center gap-1 text-xs text-[#E02020] hover:text-[#FF3333] font-sans font-semibold shrink-0 ml-4"
                    >
                      <Pencil size={12} /> Edit
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
