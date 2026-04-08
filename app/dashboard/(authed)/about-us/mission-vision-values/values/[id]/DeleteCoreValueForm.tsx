"use client";

import { Trash2 } from "lucide-react";
import { deleteCoreValueAction } from "../../actions";
import { Button } from "../../../../../lib/ui";

export default function DeleteCoreValueForm({ valueId }: { valueId: string }) {
  return (
    <form
      action={deleteCoreValueAction}
      onSubmit={(e) => {
        if (!confirm("Delete this core value?")) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={valueId} />
      <Button type="submit" variant="danger">
        <Trash2 size={14} /> Delete Value
      </Button>
    </form>
  );
}
