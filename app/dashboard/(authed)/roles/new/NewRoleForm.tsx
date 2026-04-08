"use client";

import { useActionState } from "react";
import { createRoleAction } from "../actions";
import { Field, Button, FormAlert } from "../../../lib/ui";

export default function NewRoleForm() {
  const [state, action, pending] = useActionState(createRoleAction, {});

  return (
    <form action={action} className="space-y-5">
      <FormAlert error={state.error} />

      <Field
        label="Name"
        name="name"
        required
        placeholder="e.g. editor"
        helpText="Lowercase letters, numbers, and underscores only. Used in code."
      />
      <Field
        label="Display Name"
        name="displayName"
        required
        placeholder="e.g. Editor"
      />
      <Field
        label="Description"
        name="description"
        placeholder="What can this role do?"
      />

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Creating…" : "Create Role"}
        </Button>
        <Button href="/dashboard/roles" variant="ghost">
          Cancel
        </Button>
      </div>
    </form>
  );
}
