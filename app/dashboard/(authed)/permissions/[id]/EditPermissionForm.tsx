"use client";

import { useActionState } from "react";
import { updatePermissionAction } from "../actions";
import { Field, Button, FormAlert } from "../../../lib/ui";

export default function EditPermissionForm({
  permission,
}: {
  permission: {
    id: string;
    key: string;
    group: string;
    description: string;
  };
}) {
  const [state, action, pending] = useActionState(updatePermissionAction, {});

  return (
    <form action={action} className="space-y-5">
      <FormAlert error={state.error} />
      <input type="hidden" name="id" value={permission.id} />

      <Field label="Key" name="key" defaultValue={permission.key} required />
      <Field label="Group" name="group" defaultValue={permission.group} required />
      <Field
        label="Description"
        name="description"
        defaultValue={permission.description}
      />

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save Changes"}
        </Button>
        <Button href="/dashboard/permissions" variant="ghost">
          Cancel
        </Button>
      </div>
    </form>
  );
}
