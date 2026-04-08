"use client";

import { Trash2 } from "lucide-react";
import { deleteTrustPointAction } from "../../actions";
import { Button } from "../../../../lib/ui";

export default function DeleteTrustPointForm({ trustId }: { trustId: string }) {
  return (
    <form
      action={deleteTrustPointAction}
      onSubmit={(e) => {
        if (!confirm("Delete this trust point?")) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={trustId} />
      <Button type="submit" variant="danger">
        <Trash2 size={14} /> Delete Point
      </Button>
    </form>
  );
}
