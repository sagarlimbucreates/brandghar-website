import Link from "next/link";
import { desc, eq, sql } from "drizzle-orm";
import { Mail, Phone, CheckCheck } from "lucide-react";
import { db, leads } from "@/db";
import { requirePermission, hasPermission } from "../../lib/rbac";
import {
  PageHeader,
  Card,
  Button,
  TableHeader,
  Th,
  Td,
  Badge,
} from "../../lib/ui";
import { markAllLeadsReadAction } from "./actions";

type SearchParams = Promise<{ filter?: string; status?: string }>;

const STATUS_META: Record<string, { label: string; tone: "accent" | "success" | "muted" }> = {
  pending: { label: "Pending", tone: "accent" },
  follow_up: { label: "Follow Up", tone: "muted" },
  re_follow: { label: "Re-Follow", tone: "muted" },
  converted: { label: "Converted", tone: "success" },
};

const SOURCE_LABELS: Record<string, string> = {
  hero_landing: "Landing hero",
  contact_page: "Contact page",
  navbar_cta: "Get a Quote",
};

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const me = await requirePermission("lead.view");
  const { filter, status } = await searchParams;
  const activeFilter = filter === "unread" || filter === "read" ? filter : "all";
  const activeStatus = status && status in STATUS_META ? status : "all";

  const canEdit = hasPermission(me, "lead.edit");

  // Counts
  const countsRow = await db
    .select({
      total: sql<number>`COUNT(*)`.as("total"),
      unread: sql<number>`SUM(CASE WHEN ${leads.isRead} = false THEN 1 ELSE 0 END)`.as("unread"),
      pending: sql<number>`SUM(CASE WHEN ${leads.status} = 'pending' THEN 1 ELSE 0 END)`.as("pending"),
      follow_up: sql<number>`SUM(CASE WHEN ${leads.status} = 'follow_up' THEN 1 ELSE 0 END)`.as("follow_up"),
      re_follow: sql<number>`SUM(CASE WHEN ${leads.status} = 're_follow' THEN 1 ELSE 0 END)`.as("re_follow"),
      converted: sql<number>`SUM(CASE WHEN ${leads.status} = 'converted' THEN 1 ELSE 0 END)`.as("converted"),
    })
    .from(leads);
  const total = countsRow[0]?.total ?? 0;
  const unread = countsRow[0]?.unread ?? 0;
  const read = total - unread;
  const statusCounts = {
    pending: countsRow[0]?.pending ?? 0,
    follow_up: countsRow[0]?.follow_up ?? 0,
    re_follow: countsRow[0]?.re_follow ?? 0,
    converted: countsRow[0]?.converted ?? 0,
  };

  // Filtered list
  let query = db.select().from(leads).$dynamic();
  if (activeFilter === "unread") {
    query = query.where(eq(leads.isRead, false));
  } else if (activeFilter === "read") {
    query = query.where(eq(leads.isRead, true));
  }
  if (activeStatus !== "all") {
    query = query.where(eq(leads.status, activeStatus));
  }
  const rows = await query.orderBy(desc(leads.createdAt));

  const readTabs = [
    { key: "all", label: `All (${total})` },
    { key: "unread", label: `Unread (${unread})` },
    { key: "read", label: `Read (${read})` },
  ] as const;

  const statusTabs = [
    { key: "all", label: `All` },
    { key: "pending", label: `Pending (${statusCounts.pending})` },
    { key: "follow_up", label: `Follow Up (${statusCounts.follow_up})` },
    { key: "re_follow", label: `Re-Follow (${statusCounts.re_follow})` },
    { key: "converted", label: `Converted (${statusCounts.converted})` },
  ] as const;

  function buildHref(newFilter: string, newStatus: string) {
    const params = new URLSearchParams();
    if (newFilter !== "all") params.set("filter", newFilter);
    if (newStatus !== "all") params.set("status", newStatus);
    const qs = params.toString();
    return `/dashboard/leads${qs ? `?${qs}` : ""}`;
  }

  return (
    <div>
      <PageHeader
        eyebrow="Pipeline"
        title="Leads"
        subtitle="Consultation requests submitted from the public site."
        actions={
          canEdit && unread > 0 ? (
            <form action={markAllLeadsReadAction}>
              <Button type="submit" variant="secondary">
                <CheckCheck size={14} /> Mark All Read
              </Button>
            </form>
          ) : undefined
        }
      />

      {/* Read/Unread filter tabs */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {readTabs.map((t) => (
          <Link
            key={t.key}
            href={buildHref(t.key, activeStatus)}
            className={`px-4 py-2 rounded-[4px] text-xs font-sans font-semibold transition-colors ${
              activeFilter === t.key
                ? "bg-[#E02020] text-white"
                : "bg-white border border-[#E5E5E5] text-[#555] hover:text-[#E02020] hover:border-[#E02020]/30"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      {/* Status filter tabs */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {statusTabs.map((t) => (
          <Link
            key={t.key}
            href={buildHref(activeFilter, t.key)}
            className={`px-4 py-2 rounded-[4px] text-xs font-sans font-semibold transition-colors ${
              activeStatus === t.key
                ? "bg-[#1A1A1A] text-white"
                : "bg-white border border-[#E5E5E5] text-[#555] hover:text-[#1A1A1A] hover:border-[#1A1A1A]/30"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      <Card className="overflow-hidden">
        {rows.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-[#888] font-sans">
              {activeFilter === "unread"
                ? "No unread leads. You're all caught up!"
                : activeFilter === "read"
                ? "No read leads yet."
                : "No leads yet. They'll appear here when someone submits the consultation form."}
            </p>
          </div>
        ) : (
          <table className="w-full">
            <TableHeader>
              <Th>&nbsp;</Th>
              <Th>Name</Th>
              <Th>Contact</Th>
              <Th>Service</Th>
              <Th>Status</Th>
              <Th>Source</Th>
              <Th>Received</Th>
            </TableHeader>
            <tbody>
              {rows.map((lead) => {
                const meta = STATUS_META[lead.status] ?? STATUS_META.pending;
                return (
                  <tr
                    key={lead.id}
                    className={`border-b border-[#E5E5E5] last:border-b-0 ${
                      !lead.isRead ? "bg-[#FFF0F0]/40" : ""
                    }`}
                  >
                    <Td>
                      {!lead.isRead && (
                        <div className="w-2.5 h-2.5 bg-[#E02020] rounded-full" />
                      )}
                    </Td>
                    <Td
                      className={`font-sans ${
                        !lead.isRead
                          ? "font-bold text-[#1A1A1A]"
                          : "font-medium text-[#555]"
                      }`}
                    >
                      <Link
                        href={`/dashboard/leads/${lead.id}`}
                        className="hover:text-[#E02020] transition-colors"
                      >
                        {lead.fullName}
                      </Link>
                    </Td>
                    <Td>
                      <div className="flex flex-col gap-1 text-xs">
                        <span className="flex items-center gap-1.5 text-[#555]">
                          <Phone size={11} className="text-[#888]" />
                          {lead.phone}
                        </span>
                        {lead.email && (
                          <span className="flex items-center gap-1.5 text-[#888]">
                            <Mail size={11} />
                            {lead.email}
                          </span>
                        )}
                      </div>
                    </Td>
                    <Td>
                      {lead.service ? (
                        <Badge>{lead.service}</Badge>
                      ) : (
                        <span className="text-xs text-[#888]">—</span>
                      )}
                    </Td>
                    <Td>
                      <Badge tone={meta.tone}>{meta.label}</Badge>
                    </Td>
                    <Td>
                      <span className="text-xs text-[#888]">
                        {SOURCE_LABELS[lead.source] ?? lead.source}
                      </span>
                    </Td>
                    <Td>
                      <span className="text-xs text-[#888]">
                        {new Date(lead.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
