import { requirePermission } from "../../../lib/rbac";
import { PageHeader, Card } from "../../../lib/ui";
import NewPermissionForm from "./NewPermissionForm";

export default async function NewPermissionPage() {
  await requirePermission("permission.create");
  return (
    <div className="max-w-2xl">
      <PageHeader
        eyebrow="Access Control"
        title="New Permission"
        subtitle="Define a new permission key that roles can grant."
        backHref="/dashboard/permissions"
      />
      <Card className="p-8">
        <NewPermissionForm />
      </Card>
    </div>
  );
}
