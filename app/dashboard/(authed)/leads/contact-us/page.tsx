import { requirePermission } from "../../../lib/rbac";
import LeadsTable from "../_components/LeadsTable";

type SearchParams = Promise<{ filter?: string; status?: string }>;

export default async function ContactUsLeadsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const me = await requirePermission("lead.view");
  const { filter, status } = await searchParams;

  return (
    <LeadsTable
      user={me}
      source="contact_page"
      eyebrow="Leads"
      title="Contact Us"
      subtitle="Messages submitted via the Contact Us page form."
      filter={filter === "unread" || filter === "read" ? filter : "all"}
      status={status ?? "all"}
      basePath="/dashboard/leads/contact-us"
    />
  );
}
