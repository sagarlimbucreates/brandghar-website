"use client";

import { useActionState } from "react";
import { createPermissionAction } from "../actions";
import { Field, Button, FormAlert } from "../../../lib/ui";

export default function NewPermissionForm() {
  const [state, action, pending] = useActionState(createPermissionAction, {});

  return (
    <form action={action} className="space-y-5">
      <FormAlert error={state.error} />

      <Field
        label="Key"
        name="key"
        required
        placeholder="e.g. blog.publish"
        helpText="Format: group.action — lowercase with underscores."
      />
      <Field
        label="Group"
        name="group"
        required
        placeholder="e.g. blog"
        helpText="Menus with a matching required_group will become visible."
      />
      <Field
        label="Description"
        name="description"
        placeholder="What does this permission allow?"
      />

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Creating…" : "Create Permission"}
        </Button>
        <Button href="/dashboard/permissions" variant="ghost">
          Cancel
        </Button>
      </div>
    </form>
  );
}
