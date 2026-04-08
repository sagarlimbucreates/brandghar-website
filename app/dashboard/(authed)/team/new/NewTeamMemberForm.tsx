"use client";

import { useActionState } from "react";
import { createTeamMemberAction } from "../actions";
import { Field, Checkbox, Button, FormAlert } from "../../../lib/ui";
import TextArea from "../TextArea";
import PhotoUploader from "../PhotoUploader";

export default function NewTeamMemberForm() {
  const [state, action, pending] = useActionState(createTeamMemberAction, {});

  return (
    <form action={action} className="space-y-5" encType="multipart/form-data">
      <FormAlert error={state.error} />

      <Field label="Full Name" name="fullName" required placeholder="e.g. Sagar Limbu" />
      <Field label="Role / Job Title" name="role" required placeholder="e.g. Founder & CEO" />

      <PhotoUploader />

      <Field
        label="LinkedIn URL"
        name="linkedinUrl"
        placeholder="https://www.linkedin.com/in/username"
      />
      <TextArea
        label="Bio"
        name="bio"
        placeholder="Short biography (internal notes)…"
        helpText="Optional. Not shown on the public page yet."
      />
      <Field
        label="Sort Order"
        name="sortOrder"
        type="number"
        defaultValue={100}
        helpText="Lower numbers appear first on the public page."
      />
      <Checkbox
        label="Visible on public team page"
        name="isActive"
        defaultChecked
      />

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Creating…" : "Create Member"}
        </Button>
        <Button href="/dashboard/team" variant="ghost">
          Cancel
        </Button>
      </div>
    </form>
  );
}
