import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, coreValues } from "@/db";
import { requirePermission } from "../../../../../lib/rbac";
import { PageHeader, Card } from "../../../../../lib/ui";
import { ICON_NAMES } from "../../../../../lib/icons";
import EditCoreValueForm from "./EditCoreValueForm";
import DeleteCoreValueForm from "./DeleteCoreValueForm";

type Params = Promise<{ id: string }>;

export default async function EditCoreValuePage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  await requirePermission("mission_vision.edit");

  const row = await db
    .select()
    .from(coreValues)
    .where(eq(coreValues.id, id))
    .limit(1);
  const value = row[0];
  if (!value) notFound();

  return (
    <div className="max-w-2xl">
      <PageHeader
        eyebrow="Core Values"
        title="Edit Core Value"
        subtitle={value.title}
        backHref="/dashboard/about-us/mission-vision-values"
      />

      <Card className="p-8 mb-6">
        <EditCoreValueForm
          value={{
            id: value.id,
            title: value.title,
            description: value.description,
            icon: value.icon,
            sortOrder: value.sortOrder,
            isActive: value.isActive,
          }}
          iconOptions={[...ICON_NAMES]}
        />
      </Card>

      <Card className="p-8 border-[#E02020]/30">
        <h2 className="text-sm font-sans font-bold text-[#CC0000] mb-2">
          Danger Zone
        </h2>
        <p className="text-xs text-[#888] font-sans mb-5">
          Permanently delete this core value.
        </p>
        <DeleteCoreValueForm valueId={value.id} />
      </Card>
    </div>
  );
}
