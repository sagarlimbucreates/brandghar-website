"use client";

import { useActionState } from "react";
import { updateTeamMemberAction } from "../actions";
import { Field, Checkbox, Button, FormAlert } from "../../../lib/ui";
import TextArea from "../TextArea";
import PhotoUploader from "../PhotoUploader";

export default function EditTeamMemberForm({
  member,
}: {
  member: {
    id: string;
    fullName: string;
    role: string;
    bio: string;
    photoUrl: string | null;
    linkedinUrl: string;
    sortOrder: number;
    isActive: boolean;
  };
}) {
  const [state, action, pending] = useActionState(updateTeamMemberAction, {});

  return (
    <form action={action} className="space-y-5" encType="multipart/form-data">
      <FormAlert error={state.error} />
      <input type="hidden" name="id" value={member.id} />

      <Field label="Full Name" name="fullName" defaultValue={member.fullName} required />
      <Field label="Role / Job Title" name="role" defaultValue={member.role} required />

      <PhotoUploader existingUrl={member.photoUrl} />

      <Field
        label="LinkedIn URL"
        name="linkedinUrl"
        defaultValue={member.linkedinUrl}
        placeholder="https://www.linkedin.com/in/username"
      />
      <TextArea label="Bio" name="bio" defaultValue={member.bio} />
      <Field
        label="Sort Order"
        name="sortOrder"
        type="number"
        defaultValue={member.sortOrder}
      />
      <Checkbox
        label="Visible on public team page"
        name="isActive"
        defaultChecked={member.isActive}
      />

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save Changes"}
        </Button>
        <Button href="/dashboard/team" variant="ghost">
          Cancel
        </Button>
      </div>
    </form>
  );
}
