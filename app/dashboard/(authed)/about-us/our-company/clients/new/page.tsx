import { requirePermission } from "../../../../../lib/rbac";
import { PageHeader, Card } from "../../../../../lib/ui";
import NewClientForm from "./NewClientForm";

export default async function NewClientPage() {
  await requirePermission("our_company.edit");
  return (
    <div className="max-w-2xl">
      <PageHeader
        eyebrow="Our Company"
        title="New Client"
        subtitle="Add a client logo to the public page."
        backHref="/dashboard/about-us/our-company"
      />
      <Card className="p-8">
        <NewClientForm />
      </Card>
    </div>
  );
}
