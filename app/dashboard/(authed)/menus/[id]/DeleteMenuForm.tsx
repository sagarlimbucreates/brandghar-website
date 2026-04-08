"use client";

import { Trash2 } from "lucide-react";
import { deleteMenuAction } from "../actions";
import { Button } from "../../../lib/ui";

export default function DeleteMenuForm({ menuId }: { menuId: string }) {
  return (
    <form
      action={deleteMenuAction}
      onSubmit={(e) => {
        if (!confirm("Delete this menu item?")) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={menuId} />
      <Button type="submit" variant="danger">
        <Trash2 size={14} /> Delete Menu
      </Button>
    </form>
  );
}
