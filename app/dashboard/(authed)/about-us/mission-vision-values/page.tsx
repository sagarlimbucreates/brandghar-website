import Link from "next/link";
import { asc, eq } from "drizzle-orm";
import { Plus, Pencil } from "lucide-react";
import { db, missionVisionPage, coreValues } from "@/db";
import { resolveIcon } from "../../../lib/icons";
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
import MvvForm from "./MvvForm";

const SINGLETON_ID = "singleton";

export default async function MissionVisionDashboardPage() {
  const me = await requirePermission("mission_vision.view");

  const pageRows = await db
    .select()
    .from(missionVisionPage)
    .where(eq(missionVisionPage.id, SINGLETON_ID))
    .limit(1);
  const page = pageRows[0] ?? null;

  const values = await db
    .select()
    .from(coreValues)
    .orderBy(asc(coreValues.sortOrder), asc(coreValues.title));

  const canEdit = hasPermission(me, "mission_vision.edit");

  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Website Content"
        title="Mission, Vision & Values"
        subtitle="Manage the public Mission / Vision / Core Values page."
      />

      {/* Mission/Vision form */}
      <Card className="p-8">
        <h2 className="text-sm font-sans font-bold text-[#1A1A1A] mb-5">
          Mission &amp; Vision
        </h2>
        <MvvForm
          page={{
            missionText: page?.missionText ?? "",
            visionText: page?.visionText ?? "",
          }}
          canEdit={canEdit}
        />
      </Card>

      {/* Core values list */}
      <div>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-xl font-sans font-bold text-[#1A1A1A]">
              Core Values ({values.length})
            </h2>
            <p className="text-sm text-[#888] font-sans mt-1">
              Values shown in the &quot;Core Values&quot; section below
              mission &amp; vision.
            </p>
          </div>
          {canEdit && (
            <Button href="/dashboard/about-us/mission-vision-values/values/new">
              <Plus size={14} /> New Value
            </Button>
          )}
        </div>

        <Card className="overflow-hidden">
          <table className="w-full">
            <TableHeader>
              <Th>Sort</Th>
              <Th>Icon</Th>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>Status</Th>
              <Th>&nbsp;</Th>
            </TableHeader>
            <tbody>
              {values.map((v) => {
                const Icon = resolveIcon(v.icon);
                return (
                  <tr
                    key={v.id}
                    className="border-b border-[#E5E5E5] last:border-b-0"
                  >
                    <Td className="font-mono text-[#888]">{v.sortOrder}</Td>
                    <Td>
                      <div className="w-9 h-9 bg-[#E02020]/10 rounded-[4px] flex items-center justify-center">
                        <Icon size={16} className="text-[#E02020]" />
                      </div>
                    </Td>
                    <Td className="font-medium text-[#1A1A1A]">{v.title}</Td>
                    <Td className="max-w-md truncate">{v.description}</Td>
                    <Td>
                      {v.isActive ? (
                        <Badge tone="success">Visible</Badge>
                      ) : (
                        <Badge tone="muted">Hidden</Badge>
                      )}
                    </Td>
                    <Td className="text-right">
                      {canEdit && (
                        <Link
                          href={`/dashboard/about-us/mission-vision-values/values/${v.id}`}
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
