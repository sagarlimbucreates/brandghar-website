import Link from "next/link";
import { desc, eq, and, sql } from "drizzle-orm";
import { Mail, Phone, CheckCheck } from "lucide-react";
import { db, leads } from "@/db";
import { hasPermission } from "../../../lib/rbac";
import {
  PageHeader,
  Card,
  Button,
  TableHeader,
  Th,
  Td,
  Badge,
} from "../../../lib/ui";
import { markAllLeadsReadAction } from "../actions";

type Props = {
  user: { id: string; email: string; fullName: string; roleName: string; permissions: string[] };
  source?: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  filter: string;
  status: string;
  basePath: string;
};

const STATUS_META: Record<
  string,
  { label: string; tone: "accent" | "success" | "muted" }
> = {
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

export default async function LeadsTable({
  user,
  source,
  eyebrow,
  title,
  subtitle,
  filter: activeFilter,
  status: activeStatus,
  basePath,
}: Props) {
  const canEdit = hasPermission(user, "lead.edit");

  // Build where conditions
  const conditions = [];
  if (source) conditions.push(eq(leads.source, source));
  if (activeFilter === "unread") conditions.push(eq(leads.isRead, false));
  else if (activeFilter === "read") conditions.push(eq(leads.isRead, true));
  if (activeStatus !== "all" && activeStatus in STATUS_META)
    conditions.push(eq(leads.status, activeStatus));

  // Build source condition for counts
  const sourceCondition = source
    ? sql`AND ${leads.source} = ${source}`
    : sql``;

  // Counts
  const countsRow = await db
    .select({
      total: sql<number>`COUNT(*) FILTER (WHERE true ${sourceCondition})`.as(
        "total",
      ),
      unread:
        sql<number>`COUNT(*) FILTER (WHERE ${leads.isRead} = false ${sourceCondition})`.as(
          "unread",
        ),
      pending:
        sql<number>`COUNT(*) FILTER (WHERE ${leads.status} = 'pending' ${sourceCondition})`.as(
          "pending",
        ),
      follow_up:
        sql<number>`COUNT(*) FILTER (WHERE ${leads.status} = 'follow_up' ${sourceCondition})`.as(
          "follow_up",
        ),
      re_follow:
        sql<number>`COUNT(*) FILTER (WHERE ${leads.status} = 're_follow' ${sourceCondition})`.as(
          "re_follow",
        ),
      converted:
        sql<number>`COUNT(*) FILTER (WHERE ${leads.status} = 'converted' ${sourceCondition})`.as(
          "converted",
        ),
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

  // Filtered rows
  let query = db.select().from(leads).$dynamic();
  if (conditions.length > 0) {
    query = query.where(and(...conditions));
  }
  const rows = await query.orderBy(desc(leads.createdAt));

  const readTabs = [
    { key: "all", label: `All (${total})` },
    { key: "unread", label: `Unread (${unread})` },
    { key: "read", label: `Read (${read})` },
  ] as const;

  const statusTabs = [
    { key: "all", label: "All" },
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
    return `${basePath}${qs ? `?${qs}` : ""}`;
  }

  return (
    <div>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        actions={
          canEdit && unread > 0 ? (
            <form action={markAllLeadsReadAction}>
              {source && <input type="hidden" name="source" value={source} />}
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
                  : "No leads yet. They'll appear here when someone submits the form."}
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
              {!source && <Th>Source</Th>}
              <Th>Received</Th>
            </TableHeader>
            <tbody>
              {rows.map((lead) => {
                const meta =
                  STATUS_META[lead.status] ?? STATUS_META.pending;
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
                    {!source && (
                      <Td>
                        <span className="text-xs text-[#888]">
                          {SOURCE_LABELS[lead.source] ?? lead.source}
                        </span>
                      </Td>
                    )}
                    <Td>
                      <span className="text-xs text-[#888]">
                        {new Date(lead.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
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
