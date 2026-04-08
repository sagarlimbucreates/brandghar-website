import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, teamMembers } from "@/db";
import { requirePermission, hasPermission } from "../../../lib/rbac";
import { PageHeader, Card } from "../../../lib/ui";
import EditTeamMemberForm from "./EditTeamMemberForm";
import DeleteTeamMemberForm from "./DeleteTeamMemberForm";

type Params = Promise<{ id: string }>;

export default async function EditTeamMemberPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  const me = await requirePermission("team.edit");

  const row = await db
    .select()
    .from(teamMembers)
    .where(eq(teamMembers.id, id))
    .limit(1);
  const member = row[0];
  if (!member) notFound();

  const canDelete = hasPermission(me, "team.delete");

  return (
    <div className="max-w-2xl">
      <PageHeader
        eyebrow="Website Content"
        title="Edit Team Member"
        subtitle={member.fullName}
        backHref="/dashboard/team"
      />

      <Card className="p-8 mb-6">
        <EditTeamMemberForm
          member={{
            id: member.id,
            fullName: member.fullName,
            role: member.role,
            bio: member.bio ?? "",
            photoUrl: member.photoUrl,
            linkedinUrl: member.linkedinUrl ?? "",
            sortOrder: member.sortOrder,
            isActive: member.isActive,
          }}
        />
      </Card>

      {canDelete && (
        <Card className="p-8 border-[#E02020]/30">
          <h2 className="text-sm font-sans font-bold text-[#CC0000] mb-2">
            Danger Zone
          </h2>
          <p className="text-xs text-[#888] font-sans mb-5">
            Permanently remove this team member from the public page.
          </p>
          <DeleteTeamMemberForm memberId={member.id} />
        </Card>
      )}
    </div>
  );
}
