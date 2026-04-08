import Link from "next/link";
import Image from "next/image";
import { asc, eq } from "drizzle-orm";
import { Plus, Pencil, ImageIcon } from "lucide-react";
import { db, ourCompanyPage, ourCompanyClients } from "@/db";
import { requirePermission, hasPermission } from "../../../lib/rbac";
import {
  PageHeader,
  Card,
  Button,
  TableHeader,
  Th,
  Td,
  Badge,
} from "../../../lib/ui";
import OurCompanyStoryForm from "./OurCompanyStoryForm";

const SINGLETON_ID = "singleton";

export default async function OurCompanyDashboardPage() {
  const me = await requirePermission("our_company.view");

  const pageRows = await db
    .select()
    .from(ourCompanyPage)
    .where(eq(ourCompanyPage.id, SINGLETON_ID))
    .limit(1);
  const page = pageRows[0] ?? null;

  const clients = await db
    .select()
    .from(ourCompanyClients)
    .orderBy(asc(ourCompanyClients.sortOrder), asc(ourCompanyClients.name));

  const canEdit = hasPermission(me, "our_company.edit");

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Website Content"
        title="Our Company"
        subtitle="Manage the public Our Company page — story and client logos."
      />

      {/* Story form */}
      <Card className="p-8">
        <h2 className="text-sm font-sans font-bold text-[#1A1A1A] mb-5">
          Our Story
        </h2>
        <OurCompanyStoryForm
          page={{
            storyEyebrow: page?.storyEyebrow ?? "Our Story",
            storyHeading: page?.storyHeading ?? "",
            storyHeadingAccent: page?.storyHeadingAccent ?? "",
            storyBody: page?.storyBody ?? "",
            estYear: page?.estYear ?? "2025",
            storyImageUrl: page?.storyImageUrl ?? null,
          }}
          canEdit={canEdit}
        />
      </Card>

      {/* Clients */}
      <div>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-xl font-sans font-bold text-[#1A1A1A]">
              Clients ({clients.length})
            </h2>
            <p className="text-sm text-[#888] font-sans mt-1">
              Logos shown in the &quot;Brands That Trust Brandghar&quot; section.
            </p>
          </div>
          {canEdit && (
            <Button href="/dashboard/about-us/our-company/clients/new">
              <Plus size={14} /> New Client
            </Button>
          )}
        </div>

        <Card className="overflow-hidden">
          <table className="w-full">
            <TableHeader>
              <Th>Sort</Th>
              <Th>Logo</Th>
              <Th>Name</Th>
              <Th>Website</Th>
              <Th>Status</Th>
              <Th>&nbsp;</Th>
            </TableHeader>
            <tbody>
              {clients.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-[#E5E5E5] last:border-b-0"
                >
                  <Td className="font-mono text-[#888]">{c.sortOrder}</Td>
                  <Td>
                    <div className="w-14 h-14 rounded-[4px] bg-[#F7F7F7] border border-[#E5E5E5] flex items-center justify-center overflow-hidden">
                      {c.logoUrl ? (
                        <Image
                          src={c.logoUrl}
                          alt={c.name}
                          width={56}
                          height={56}
                          className="w-full h-full object-contain p-1.5"
                          unoptimized
                        />
                      ) : (
                        <ImageIcon size={16} className="text-[#888]" />
                      )}
                    </div>
                  </Td>
                  <Td className="font-medium text-[#1A1A1A]">{c.name}</Td>
                  <Td className="font-mono text-xs max-w-xs truncate">
                    {c.websiteUrl ?? "—"}
                  </Td>
                  <Td>
                    {c.isActive ? (
                      <Badge tone="success">Visible</Badge>
                    ) : (
                      <Badge tone="muted">Hidden</Badge>
                    )}
                  </Td>
                  <Td className="text-right">
                    {canEdit && (
                      <Link
                        href={`/dashboard/about-us/our-company/clients/${c.id}`}
                        className="inline-flex items-center gap-1 text-xs text-[#E02020] hover:text-[#FF3333] font-sans font-semibold"
                      >
                        <Pencil size={12} /> Edit
                      </Link>
                    )}
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
