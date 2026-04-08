import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, ourCompanyClients } from "@/db";
import { requirePermission } from "../../../../../lib/rbac";
import { PageHeader, Card } from "../../../../../lib/ui";
import EditClientForm from "./EditClientForm";
import DeleteClientForm from "./DeleteClientForm";

type Params = Promise<{ id: string }>;

export default async function EditClientPage({ params }: { params: Params }) {
  const { id } = await params;
  await requirePermission("our_company.edit");

  const row = await db
    .select()
    .from(ourCompanyClients)
    .where(eq(ourCompanyClients.id, id))
    .limit(1);
  const client = row[0];
  if (!client) notFound();

  return (
    <div className="max-w-2xl">
      <PageHeader
        eyebrow="Our Company"
        title="Edit Client"
        subtitle={client.name}
        backHref="/dashboard/about-us/our-company"
      />

      <Card className="p-8 mb-6">
        <EditClientForm
          client={{
            id: client.id,
            name: client.name,
            websiteUrl: client.websiteUrl ?? "",
            logoUrl: client.logoUrl,
            sortOrder: client.sortOrder,
            isActive: client.isActive,
          }}
        />
      </Card>

      <Card className="p-8 border-[#E02020]/30">
        <h2 className="text-sm font-sans font-bold text-[#CC0000] mb-2">
          Danger Zone
        </h2>
        <p className="text-xs text-[#888] font-sans mb-5">
          Permanently delete this client. The logo file will also be removed
          from disk.
        </p>
        <DeleteClientForm clientId={client.id} />
      </Card>
    </div>
  );
}
