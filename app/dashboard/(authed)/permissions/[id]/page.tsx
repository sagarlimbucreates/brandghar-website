import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, permissions } from "@/db";
import { requirePermission, hasPermission } from "../../../lib/rbac";
import { PageHeader, Card } from "../../../lib/ui";
import EditPermissionForm from "./EditPermissionForm";
import DeletePermissionForm from "./DeletePermissionForm";

type Params = Promise<{ id: string }>;

export default async function EditPermissionPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  const me = await requirePermission("permission.edit");

  const row = await db
    .select()
    .from(permissions)
    .where(eq(permissions.id, id))
    .limit(1);
  const perm = row[0];
  if (!perm) notFound();

  const canDelete = hasPermission(me, "permission.delete");

  return (
    <div className="max-w-2xl">
      <PageHeader
        eyebrow="Access Control"
        title="Edit Permission"
        subtitle={perm.key}
        backHref="/dashboard/permissions"
      />

      <Card className="p-8 mb-6">
        <EditPermissionForm
          permission={{
            id: perm.id,
            key: perm.key,
            group: perm.group,
            description: perm.description ?? "",
          }}
        />
      </Card>

      {canDelete && (
        <Card className="p-8 border-[#E02020]/30">
          <h2 className="text-sm font-sans font-bold text-[#CC0000] mb-2">
            Danger Zone
          </h2>
          <p className="text-xs text-[#888] font-sans mb-5">
            Deleting a permission will remove it from all roles. Code that
            references this key will deny access going forward.
          </p>
          <DeletePermissionForm permissionId={perm.id} />
        </Card>
      )}
    </div>
  );
}
