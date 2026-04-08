"use client";

import { useActionState } from "react";
import { resetUserPasswordAction } from "../actions";
import { Field, Button, FormAlert } from "../../../lib/ui";

export default function ResetPasswordForm({ userId }: { userId: string }) {
  const [state, action, pending] = useActionState(resetUserPasswordAction, {});

  return (
    <form action={action} className="space-y-5">
      <FormAlert error={state.error} success={state.success} />
      <input type="hidden" name="id" value={userId} />
      <Field
        label="New Password"
        name="password"
        type="password"
        required
        helpText="Minimum 6 characters."
      />
      <Button type="submit" disabled={pending}>
        {pending ? "Updating…" : "Update Password"}
      </Button>
    </form>
  );
}
