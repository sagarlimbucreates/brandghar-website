import { notFound } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { db, users, roles } from "@/db";
import { requirePermission, hasPermission } from "../../../lib/rbac";
import { PageHeader, Card } from "../../../lib/ui";
import EditUserForm from "./EditUserForm";
import ResetPasswordForm from "./ResetPasswordForm";
import DeleteUserForm from "./DeleteUserForm";

type Params = Promise<{ id: string }>;

export default async function EditUserPage({ params }: { params: Params }) {
  const { id } = await params;
  const me = await requirePermission("user.edit");

  const row = await db.select().from(users).where(eq(users.id, id)).limit(1);
  const user = row[0];
  if (!user) notFound();

  const roleRows = await db.select().from(roles).orderBy(asc(roles.name));
  const canDelete = hasPermission(me, "user.delete");

  return (
    <div className="max-w-2xl">
      <PageHeader
        eyebrow="User Management"
        title="Edit User"
        subtitle={user.email}
        backHref="/dashboard/users"
      />

      <Card className="p-8 mb-6">
        <h2 className="text-sm font-sans font-bold text-[#1A1A1A] mb-5">
          Profile
        </h2>
        <EditUserForm
          user={{
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            roleId: user.roleId,
            isActive: user.isActive,
          }}
          roleOptions={roleRows.map((r) => ({
            value: r.id,
            label: r.displayName,
          }))}
        />
      </Card>

      <Card className="p-8 mb-6">
        <h2 className="text-sm font-sans font-bold text-[#1A1A1A] mb-5">
          Reset Password
        </h2>
        <ResetPasswordForm userId={user.id} />
      </Card>

      {canDelete && me.id !== user.id && (
        <Card className="p-8 border-[#E02020]/30">
          <h2 className="text-sm font-sans font-bold text-[#CC0000] mb-2">
            Danger Zone
          </h2>
          <p className="text-xs text-[#888] font-sans mb-5">
            Permanently delete this user. This action cannot be undone.
          </p>
          <DeleteUserForm userId={user.id} />
        </Card>
      )}
    </div>
  );
}
