"use client";

import { Trash2 } from "lucide-react";
import { deleteRoleAction } from "../actions";
import { Button } from "../../../lib/ui";

export default function DeleteRoleForm({ roleId }: { roleId: string }) {
  return (
    <form
      action={deleteRoleAction}
      onSubmit={(e) => {
        if (!confirm("Delete this role permanently?")) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={roleId} />
      <Button type="submit" variant="danger">
        <Trash2 size={14} /> Delete Role
      </Button>
    </form>
  );
}
