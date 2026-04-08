"use client";

import { useActionState } from "react";
import { updateUserAction } from "../actions";
import { Field, Select, Checkbox, Button, FormAlert } from "../../../lib/ui";

export default function EditUserForm({
  user,
  roleOptions,
}: {
  user: {
    id: string;
    email: string;
    fullName: string;
    roleId: string;
    isActive: boolean;
  };
  roleOptions: Array<{ value: string; label: string }>;
}) {
  const [state, action, pending] = useActionState(updateUserAction, {});

  return (
    <form action={action} className="space-y-5">
      <FormAlert error={state.error} />
      <input type="hidden" name="id" value={user.id} />

      <Field label="Full Name" name="fullName" defaultValue={user.fullName} required />
      <Field label="Email" name="email" type="email" defaultValue={user.email} required />
      <Select
        label="Role"
        name="roleId"
        defaultValue={user.roleId}
        required
        options={roleOptions}
      />
      <Checkbox label="Active" name="isActive" defaultChecked={user.isActive} />

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save Changes"}
        </Button>
        <Button href="/dashboard/users" variant="ghost">
          Cancel
        </Button>
      </div>
    </form>
  );
}
