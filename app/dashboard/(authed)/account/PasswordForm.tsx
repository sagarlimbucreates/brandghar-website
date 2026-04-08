"use client";

import { useActionState, useRef, useEffect } from "react";
import { changePasswordAction } from "./actions";
import { Field, Button, FormAlert } from "../../lib/ui";

export default function PasswordForm() {
  const [state, action, pending] = useActionState(changePasswordAction, {});
  const formRef = useRef<HTMLFormElement>(null);

  // Clear the form after a successful password change.
  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={action} className="space-y-5">
      <FormAlert error={state.error} success={state.success} />

      <Field
        label="Current Password"
        name="currentPassword"
        type="password"
        required
        placeholder="••••••••"
      />
      <Field
        label="New Password"
        name="newPassword"
        type="password"
        required
        placeholder="••••••••"
        helpText="At least 6 characters."
      />
      <Field
        label="Confirm New Password"
        name="confirmPassword"
        type="password"
        required
        placeholder="••••••••"
      />

      <div className="pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Updating…" : "Update Password"}
        </Button>
      </div>
    </form>
  );
}
