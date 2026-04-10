import Link from "next/link";
import { asc } from "drizzle-orm";
import { db, services } from "@/db";
import { requirePermission } from "../../lib/rbac";
import { PageHeader, Card, TableHeader, Th, Td, Badge } from "../../lib/ui";
import { resolveIcon } from "../../lib/icons";

export default async function ServicesListPage() {
  await requirePermission("service.view");

  const rows = await db
    .select()
    .from(services)
    .orderBy(asc(services.sortOrder));

  return (
    <div>
      <PageHeader
        eyebrow="Content"
        title="Services"
        subtitle="Manage the services shown on the public site."
        actions={
          <Link
            href="/dashboard/services/new"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm bg-[#E02020] text-white font-sans font-semibold rounded-[4px] hover:bg-[#FF3333] transition-all"
          >
            + New Service
          </Link>
        }
      />

      <Card className="overflow-hidden">
        {rows.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-[#888] font-sans">No services yet.</p>
          </div>
        ) : (
          <table className="w-full">
            <TableHeader>
              <Th>Icon</Th>
              <Th>Title</Th>
              <Th>Slug</Th>
              <Th>Order</Th>
              <Th>Status</Th>
            </TableHeader>
            <tbody>
              {rows.map((s) => {
                const Icon = resolveIcon(s.icon);
                return (
                  <tr
                    key={s.id}
                    className="border-b border-[#E5E5E5] last:border-b-0"
                  >
                    <Td>
                      <div className="w-9 h-9 bg-[#E02020]/10 rounded-[4px] flex items-center justify-center">
                        <Icon size={16} className="text-[#E02020]" />
                      </div>
                    </Td>
                    <Td className="font-sans font-medium text-[#1A1A1A]">
                      <Link
                        href={`/dashboard/services/${s.id}`}
                        className="hover:text-[#E02020] transition-colors"
                      >
                        {s.title}
                      </Link>
                    </Td>
                    <Td>
                      <code className="text-xs text-[#888] font-mono">
                        {s.slug}
                      </code>
                    </Td>
                    <Td>
                      <span className="text-xs text-[#888] font-mono">
                        {s.sortOrder}
                      </span>
                    </Td>
                    <Td>
                      <Badge tone={s.isActive ? "success" : "muted"}>
                        {s.isActive ? "Active" : "Inactive"}
                      </Badge>
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
