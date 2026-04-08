"use client";

import { Trash2 } from "lucide-react";
import { deleteTeamMemberAction } from "../actions";
import { Button } from "../../../lib/ui";

export default function DeleteTeamMemberForm({
  memberId,
}: {
  memberId: string;
}) {
  return (
    <form
      action={deleteTeamMemberAction}
      onSubmit={(e) => {
        if (!confirm("Delete this team member permanently?")) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={memberId} />
      <Button type="submit" variant="danger">
        <Trash2 size={14} /> Delete Member
      </Button>
    </form>
  );
}
