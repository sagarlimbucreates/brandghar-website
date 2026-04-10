import { requirePermission } from "../../../lib/rbac";
import LeadsTable from "../_components/LeadsTable";

type SearchParams = Promise<{ filter?: string; status?: string }>;

export default async function QuotesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const me = await requirePermission("lead.view");
  const { filter, status } = await searchParams;

  return (
    <LeadsTable
      user={me}
      source="navbar_cta"
      eyebrow="Leads"
      title="Get a Quote"
      subtitle="Inquiries submitted via the Get a Quote modal."
      filter={filter === "unread" || filter === "read" ? filter : "all"}
      status={status ?? "all"}
      basePath="/dashboard/leads/quotes"
    />
  );
}
