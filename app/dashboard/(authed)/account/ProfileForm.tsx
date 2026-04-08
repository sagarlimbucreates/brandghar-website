"use client";

import { useActionState } from "react";
import { updateProfileAction } from "./actions";
import { Field, Button, FormAlert } from "../../lib/ui";

export default function ProfileForm({
  user,
}: {
  user: { fullName: string; email: string; roleName: string };
}) {
  const [state, action, pending] = useActionState(updateProfileAction, {});

  return (
    <form action={action} className="space-y-5">
      <FormAlert error={state.error} success={state.success} />

      <Field label="Full Name" name="fullName" defaultValue={user.fullName} required />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-sans font-semibold text-[#555] uppercase tracking-[0.1em] mb-2">
            Email
          </label>
          <div className="px-4 py-2.5 bg-[#F7F7F7] border border-[#E5E5E5] rounded-[4px] text-[#888] text-sm font-sans">
            {user.email}
          </div>
        </div>
        <div>
          <label className="block text-xs font-sans font-semibold text-[#555] uppercase tracking-[0.1em] mb-2">
            Role
          </label>
          <div className="px-4 py-2.5 bg-[#F7F7F7] border border-[#E5E5E5] rounded-[4px] text-[#888] text-sm font-sans capitalize">
            {user.roleName.replace("_", " ")}
          </div>
        </div>
      </div>

      <div className="pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save Profile"}
        </Button>
      </div>
    </form>
  );
}
