import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, contactTrustPoints } from "@/db";
import { requirePermission } from "../../../../lib/rbac";
import { PageHeader, Card } from "../../../../lib/ui";
import { ICON_NAMES } from "../../../../lib/icons";
import EditTrustPointForm from "./EditTrustPointForm";
import DeleteTrustPointForm from "./DeleteTrustPointForm";

type Params = Promise<{ id: string }>;

export default async function EditTrustPointPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  await requirePermission("contact_page.edit");

  const row = await db
    .select()
    .from(contactTrustPoints)
    .where(eq(contactTrustPoints.id, id))
    .limit(1);
  const trust = row[0];
  if (!trust) notFound();

  return (
    <div className="max-w-2xl">
      <PageHeader
        eyebrow="Contact Page"
        title="Edit Trust Point"
        subtitle={trust.text}
        backHref="/dashboard/contact"
      />

      <Card className="p-8 mb-6">
        <EditTrustPointForm
          trust={{
            id: trust.id,
            text: trust.text,
            icon: trust.icon,
            sortOrder: trust.sortOrder,
            isActive: trust.isActive,
          }}
          iconOptions={[...ICON_NAMES]}
        />
      </Card>

      <Card className="p-8 border-[#E02020]/30">
        <h2 className="text-sm font-sans font-bold text-[#CC0000] mb-2">
          Danger Zone
        </h2>
        <p className="text-xs text-[#888] font-sans mb-5">
          Permanently delete this trust point.
        </p>
        <DeleteTrustPointForm trustId={trust.id} />
      </Card>
    </div>
  );
}
