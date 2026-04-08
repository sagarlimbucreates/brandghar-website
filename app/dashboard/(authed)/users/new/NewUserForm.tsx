"use client";

import { useActionState } from "react";
import { createUserAction } from "../actions";
import { Field, Select, Checkbox, Button, FormAlert } from "../../../lib/ui";

export default function NewUserForm({
  roleOptions,
}: {
  roleOptions: Array<{ value: string; label: string }>;
}) {
  const [state, action, pending] = useActionState(createUserAction, {});

  return (
    <form action={action} className="space-y-5">
      <FormAlert error={state.error} />

      <Field label="Full Name" name="fullName" required />
      <Field label="Email" name="email" type="email" required />
      <Field
        label="Password"
        name="password"
        type="password"
        required
        helpText="Minimum 6 characters."
      />
      <Select label="Role" name="roleId" required options={roleOptions} />
      <Checkbox label="Active" name="isActive" defaultChecked />

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Creating…" : "Create User"}
        </Button>
        <Button href="/dashboard/users" variant="ghost">
          Cancel
        </Button>
      </div>
    </form>
  );
}
