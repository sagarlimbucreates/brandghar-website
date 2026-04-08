import { requirePermission } from "../../../lib/rbac";
import { PageHeader, Card } from "../../../lib/ui";
import NewRoleForm from "./NewRoleForm";

export default async function NewRolePage() {
  await requirePermission("role.create");
  return (
    <div className="max-w-2xl">
      <PageHeader
        eyebrow="Access Control"
        title="New Role"
        subtitle="Define a new role that can be assigned to users."
        backHref="/dashboard/roles"
      />
      <Card className="p-8">
        <NewRoleForm />
      </Card>
    </div>
  );
}
