"use client";

import { Trash2 } from "lucide-react";
import { deletePermissionAction } from "../actions";
import { Button } from "../../../lib/ui";

export default function DeletePermissionForm({
  permissionId,
}: {
  permissionId: string;
}) {
  return (
    <form
      action={deletePermissionAction}
      onSubmit={(e) => {
        if (!confirm("Delete this permission permanently?")) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={permissionId} />
      <Button type="submit" variant="danger">
        <Trash2 size={14} /> Delete Permission
      </Button>
    </form>
  );
}
