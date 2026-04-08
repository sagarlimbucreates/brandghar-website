"use client";

import { useActionState } from "react";
import { updateRoleAction } from "../actions";
import { Field, Button, FormAlert } from "../../../lib/ui";

export default function EditRoleForm({
  role,
}: {
  role: {
    id: string;
    name: string;
    displayName: string;
    description: string;
    isSystem: boolean;
  };
}) {
  const [state, action, pending] = useActionState(updateRoleAction, {});

  return (
    <form action={action} className="space-y-5">
      <FormAlert error={state.error} />
      <input type="hidden" name="id" value={role.id} />

      <Field
        label="Name"
        name="name"
        defaultValue={role.name}
        required
        helpText={
          role.isSystem
            ? "Changing a system role name may break seed scripts."
            : "Lowercase letters, numbers, and underscores only."
        }
      />
      <Field label="Display Name" name="displayName" defaultValue={role.displayName} required />
      <Field label="Description" name="description" defaultValue={role.description} />

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save Changes"}
        </Button>
        <Button href="/dashboard/roles" variant="ghost">
          Cancel
        </Button>
      </div>
    </form>
  );
}
