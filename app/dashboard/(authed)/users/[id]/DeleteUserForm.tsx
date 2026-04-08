"use client";

import { Trash2 } from "lucide-react";
import { deleteUserAction } from "../actions";
import { Button } from "../../../lib/ui";

export default function DeleteUserForm({ userId }: { userId: string }) {
  return (
    <form
      action={deleteUserAction}
      onSubmit={(e) => {
        if (!confirm("Delete this user permanently? This cannot be undone.")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={userId} />
      <Button type="submit" variant="danger">
        <Trash2 size={14} /> Delete User
      </Button>
    </form>
  );
}
