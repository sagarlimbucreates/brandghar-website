import { requirePermission } from "../../../lib/rbac";
import { PageHeader, Card } from "../../../lib/ui";
import NewTeamMemberForm from "./NewTeamMemberForm";

export default async function NewTeamMemberPage() {
  await requirePermission("team.create");
  return (
    <div className="max-w-2xl">
      <PageHeader
        eyebrow="Website Content"
        title="New Team Member"
        subtitle="Add a team member to the public team page."
        backHref="/dashboard/team"
      />
      <Card className="p-8">
        <NewTeamMemberForm />
      </Card>
    </div>
  );
}
