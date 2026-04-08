import { requirePermission } from "../../../../../lib/rbac";
import { PageHeader, Card } from "../../../../../lib/ui";
import { ICON_NAMES } from "../../../../../lib/icons";
import NewCoreValueForm from "./NewCoreValueForm";

export default async function NewCoreValuePage() {
  await requirePermission("mission_vision.edit");
  return (
    <div className="max-w-2xl">
      <PageHeader
        eyebrow="Core Values"
        title="New Core Value"
        subtitle="Add a value to the public page."
        backHref="/dashboard/about-us/mission-vision-values"
      />
      <Card className="p-8">
        <NewCoreValueForm iconOptions={[...ICON_NAMES]} />
      </Card>
    </div>
  );
}
