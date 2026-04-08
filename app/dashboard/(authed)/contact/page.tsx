import Link from "next/link";
import { asc, eq } from "drizzle-orm";
import { Plus, Pencil } from "lucide-react";
import { db, contactPage, contactTrustPoints } from "@/db";
import { resolveIcon } from "../../lib/icons";
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
import ContactPageForm from "./ContactPageForm";

const SINGLETON_ID = "singleton";

export default async function ContactDashboardPage() {
  const me = await requirePermission("contact_page.view");

  const pageRows = await db
    .select()
    .from(contactPage)
    .where(eq(contactPage.id, SINGLETON_ID))
    .limit(1);
  const page = pageRows[0] ?? null;

  const trustPoints = await db
    .select()
    .from(contactTrustPoints)
    .orderBy(asc(contactTrustPoints.sortOrder), asc(contactTrustPoints.text));

  const canEdit = hasPermission(me, "contact_page.edit");

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Website Content"
        title="Contact"
        subtitle="Manage the public Contact page — hero, contact info, social links, map, and trust points."
      />

      <Card className="p-8">
        <ContactPageForm
          page={{
            heroEyebrow: page?.heroEyebrow ?? "Get In Touch",
            heroHeading: page?.heroHeading ?? "",
            heroHeadingAccent: page?.heroHeadingAccent ?? "",
            heroSubtitle: page?.heroSubtitle ?? "",
            phoneNumber: page?.phoneNumber ?? "",
            phoneHours: page?.phoneHours ?? "",
            locationLabel: page?.locationLabel ?? "",
            locationUrl: page?.locationUrl ?? "",
            emailAddress: page?.emailAddress ?? "",
            emailReplyNote: page?.emailReplyNote ?? "",
            mapEmbedUrl: page?.mapEmbedUrl ?? "",
            instagramUrl: page?.instagramUrl ?? "",
            facebookUrl: page?.facebookUrl ?? "",
            tiktokUrl: page?.tiktokUrl ?? "",
            linkedinUrl: page?.linkedinUrl ?? "",
            quickHelpHeading: page?.quickHelpHeading ?? "Need Immediate Help?",
            whatsappUrl: page?.whatsappUrl ?? "",
          }}
          canEdit={canEdit}
        />
      </Card>

      {/* Trust points */}
      <div>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-xl font-sans font-bold text-[#1A1A1A]">
              Trust Points ({trustPoints.length})
            </h2>
            <p className="text-sm text-[#888] font-sans mt-1">
              Shown in the &quot;Why Brandghar&quot; section at the bottom of
              the contact page.
            </p>
          </div>
          {canEdit && (
            <Button href="/dashboard/contact/trust-points/new">
              <Plus size={14} /> New Point
            </Button>
          )}
        </div>

        <Card className="overflow-hidden">
          <table className="w-full">
            <TableHeader>
              <Th>Sort</Th>
              <Th>Icon</Th>
              <Th>Text</Th>
              <Th>Status</Th>
              <Th>&nbsp;</Th>
            </TableHeader>
            <tbody>
              {trustPoints.map((t) => {
                const Icon = resolveIcon(t.icon);
                return (
                  <tr
                    key={t.id}
                    className="border-b border-[#E5E5E5] last:border-b-0"
                  >
                    <Td className="font-mono text-[#888]">{t.sortOrder}</Td>
                    <Td>
                      <div className="w-9 h-9 bg-[#E02020]/10 rounded-[4px] flex items-center justify-center">
                        <Icon size={16} className="text-[#E02020]" />
                      </div>
                    </Td>
                    <Td className="font-medium text-[#1A1A1A]">{t.text}</Td>
                    <Td>
                      {t.isActive ? (
                        <Badge tone="success">Visible</Badge>
                      ) : (
                        <Badge tone="muted">Hidden</Badge>
                      )}
                    </Td>
                    <Td className="text-right">
                      {canEdit && (
                        <Link
                          href={`/dashboard/contact/trust-points/${t.id}`}
                          className="inline-flex items-center gap-1 text-xs text-[#E02020] hover:text-[#FF3333] font-sans font-semibold"
                        >
                          <Pencil size={12} /> Edit
                        </Link>
                      )}
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
