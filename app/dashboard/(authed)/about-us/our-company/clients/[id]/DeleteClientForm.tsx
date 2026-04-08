"use client";

import { Trash2 } from "lucide-react";
import { deleteClientAction } from "../../actions";
import { Button } from "../../../../../lib/ui";

export default function DeleteClientForm({ clientId }: { clientId: string }) {
  return (
    <form
      action={deleteClientAction}
      onSubmit={(e) => {
        if (!confirm("Delete this client permanently?")) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={clientId} />
      <Button type="submit" variant="danger">
        <Trash2 size={14} /> Delete Client
      </Button>
    </form>
  );
}
