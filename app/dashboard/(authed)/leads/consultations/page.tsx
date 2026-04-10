import { requirePermission } from "../../../lib/rbac";
import LeadsTable from "../_components/LeadsTable";

type SearchParams = Promise<{ filter?: string; status?: string }>;

export default async function ConsultationsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const me = await requirePermission("lead.view");
  const { filter, status } = await searchParams;

  return (
    <LeadsTable
      user={me}
      source="hero_landing"
      eyebrow="Leads"
      title="Free Consultation"
      subtitle="Requests submitted via the landing page hero form."
      filter={filter === "unread" || filter === "read" ? filter : "all"}
      status={status ?? "all"}
      basePath="/dashboard/leads/consultations"
    />
  );
}
