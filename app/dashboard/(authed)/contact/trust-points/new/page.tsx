import { requirePermission } from "../../../../lib/rbac";
import { PageHeader, Card } from "../../../../lib/ui";
import { ICON_NAMES } from "../../../../lib/icons";
import NewTrustPointForm from "./NewTrustPointForm";

export default async function NewTrustPointPage() {
  await requirePermission("contact_page.edit");
  return (
    <div className="max-w-2xl">
      <PageHeader
        eyebrow="Contact Page"
        title="New Trust Point"
        subtitle="Add a reason to trust Brandghar, shown in the contact page bottom section."
        backHref="/dashboard/contact"
      />
      <Card className="p-8">
        <NewTrustPointForm iconOptions={[...ICON_NAMES]} />
      </Card>
    </div>
  );
}
