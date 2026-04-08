import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import {
  Mail,
  Phone,
  Calendar,
  Eye,
  EyeOff,
  Trash2,
  ArrowUpRight,
} from "lucide-react";
import { db, leads, users } from "@/db";
import { requirePermission, hasPermission } from "../../../lib/rbac";
import { PageHeader, Card, Button } from "../../../lib/ui";
import {
  markLeadReadAction,
  markLeadUnreadAction,
  deleteLeadAction,
} from "../actions";

type Params = Promise<{ id: string }>;

export default async function LeadDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const me = await requirePermission("lead.view");

  const rows = await db
    .select({
      id: leads.id,
      fullName: leads.fullName,
      phone: leads.phone,
      email: leads.email,
      service: leads.service,
      message: leads.message,
      source: leads.source,
      isRead: leads.isRead,
      readAt: leads.readAt,
      createdAt: leads.createdAt,
      ipAddress: leads.ipAddress,
      userAgent: leads.userAgent,
      readByName: users.fullName,
    })
    .from(leads)
    .leftJoin(users, eq(users.id, leads.readBy))
    .where(eq(leads.id, id))
    .limit(1);

  const lead = rows[0];
  if (!lead) notFound();

  const canEdit = hasPermission(me, "lead.edit");
  const canDelete = hasPermission(me, "lead.delete");

  // Auto-mark as read on first view if unread
  if (!lead.isRead && canEdit) {
    await db
      .update(leads)
      .set({ isRead: true, readAt: new Date(), readBy: me.id })
      .where(eq(leads.id, id));
    lead.isRead = true;
    lead.readAt = new Date();
  }

  const formatFull = (d: Date) =>
    d.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <div className="max-w-2xl space-y-6">
      <PageHeader
        eyebrow="Lead Detail"
        title={lead.fullName}
        subtitle={`Received ${formatFull(lead.createdAt)}`}
        backHref="/dashboard/leads"
      />

      {/* Contact details */}
      <Card className="p-8">
        <h2 className="text-sm font-sans font-bold text-[#1A1A1A] mb-5">
          Contact Details
        </h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 bg-[#E02020]/10 rounded-[4px] flex items-center justify-center shrink-0">
              <Phone size={16} className="text-[#E02020]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-sans font-semibold text-[#888] uppercase tracking-[0.1em] mb-0.5">
                Phone
              </p>
              <a
                href={`tel:${lead.phone.replace(/[^+0-9]/g, "")}`}
                className="text-sm font-sans text-[#1A1A1A] hover:text-[#E02020]"
              >
                {lead.phone}
              </a>
            </div>
          </div>

          {lead.email && (
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 bg-[#E02020]/10 rounded-[4px] flex items-center justify-center shrink-0">
                <Mail size={16} className="text-[#E02020]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-sans font-semibold text-[#888] uppercase tracking-[0.1em] mb-0.5">
                  Email
                </p>
                <a
                  href={`mailto:${lead.email}`}
                  className="text-sm font-sans text-[#1A1A1A] hover:text-[#E02020] break-all"
                >
                  {lead.email}
                </a>
              </div>
            </div>
          )}

          <div className="flex items-start gap-4">
            <div className="w-9 h-9 bg-[#E02020]/10 rounded-[4px] flex items-center justify-center shrink-0">
              <Calendar size={16} className="text-[#E02020]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-sans font-semibold text-[#888] uppercase tracking-[0.1em] mb-0.5">
                Submitted from
              </p>
              <p className="text-sm font-sans text-[#1A1A1A]">
                {lead.source === "hero_landing"
                  ? "Landing page hero form"
                  : "Contact page form"}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Inquiry */}
      <Card className="p-8">
        <h2 className="text-sm font-sans font-bold text-[#1A1A1A] mb-5">
          Inquiry
        </h2>
        {lead.service && (
          <div className="mb-4">
            <p className="text-[11px] font-sans font-semibold text-[#888] uppercase tracking-[0.1em] mb-1">
              Interested in
            </p>
            <p className="text-sm font-sans text-[#1A1A1A]">{lead.service}</p>
          </div>
        )}
        {lead.message ? (
          <div>
            <p className="text-[11px] font-sans font-semibold text-[#888] uppercase tracking-[0.1em] mb-2">
              Message
            </p>
            <div className="bg-[#F7F7F7] border border-[#E5E5E5] rounded-[4px] p-4">
              <p className="text-sm font-sans text-[#1A1A1A] leading-[1.7] whitespace-pre-wrap">
                {lead.message}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-xs text-[#888] font-sans italic">
            No message — hero form only collects name, phone, email, and service.
          </p>
        )}
      </Card>

      {/* Status */}
      <Card className="p-8">
        <h2 className="text-sm font-sans font-bold text-[#1A1A1A] mb-5">
          Status
        </h2>
        <div className="mb-5">
          <p className="text-sm font-sans text-[#555]">
            {lead.isRead ? (
              <>
                <span className="inline-block w-2 h-2 bg-[#0A7A0A] rounded-full mr-2" />
                Read
                {lead.readAt &&
                  ` on ${formatFull(lead.readAt)}`}
                {lead.readByName && ` by ${lead.readByName}`}
              </>
            ) : (
              <>
                <span className="inline-block w-2 h-2 bg-[#E02020] rounded-full mr-2" />
                Unread
              </>
            )}
          </p>
        </div>

        {canEdit && (
          <div className="flex items-center gap-3 flex-wrap">
            {lead.isRead ? (
              <form action={markLeadUnreadAction}>
                <input type="hidden" name="id" value={lead.id} />
                <Button type="submit" variant="secondary">
                  <EyeOff size={14} /> Mark Unread
                </Button>
              </form>
            ) : (
              <form action={markLeadReadAction}>
                <input type="hidden" name="id" value={lead.id} />
                <Button type="submit" variant="secondary">
                  <Eye size={14} /> Mark Read
                </Button>
              </form>
            )}
            {lead.email && (
              <a
                href={`mailto:${lead.email}?subject=Re: Your Brandghar consultation request&body=Hi ${lead.fullName},%0D%0A%0D%0AThanks for reaching out to Brandghar.`}
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-sm bg-[#E02020] text-white font-sans font-semibold rounded-[4px] hover:bg-[#FF3333] transition-all"
              >
                Reply by Email <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        )}
      </Card>

      {canDelete && (
        <Card className="p-8 border-[#E02020]/30">
          <h2 className="text-sm font-sans font-bold text-[#CC0000] mb-2">
            Danger Zone
          </h2>
          <p className="text-xs text-[#888] font-sans mb-5">
            Permanently delete this lead. This cannot be undone.
          </p>
          <DeleteLeadForm leadId={lead.id} />
        </Card>
      )}
    </div>
  );
}

function DeleteLeadForm({ leadId }: { leadId: string }) {
  return (
    <form action={deleteLeadAction}>
      <input type="hidden" name="id" value={leadId} />
      <Button type="submit" variant="danger">
        <Trash2 size={14} /> Delete Lead
      </Button>
    </form>
  );
}
