import { asc } from "drizzle-orm";
import { db, roles } from "@/db";
import { requirePermission } from "../../../lib/rbac";
import { PageHeader, Card } from "../../../lib/ui";
import NewUserForm from "./NewUserForm";

export default async function NewUserPage() {
  await requirePermission("user.create");
  const roleRows = await db.select().from(roles).orderBy(asc(roles.name));

  return (
    <div className="max-w-2xl">
      <PageHeader
        eyebrow="User Management"
        title="New User"
        subtitle="Create a new staff account."
        backHref="/dashboard/users"
      />
      <Card className="p-8">
        <NewUserForm
          roleOptions={roleRows.map((r) => ({
            value: r.id,
            label: r.displayName,
          }))}
        />
      </Card>
    </div>
  );
}
