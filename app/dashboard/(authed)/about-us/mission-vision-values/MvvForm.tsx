"use client";

import { useActionState } from "react";
import { updateMissionVisionAction } from "./actions";
import { Button, FormAlert } from "../../../lib/ui";
import TextArea from "../../team/TextArea";

export default function MvvForm({
  page,
  canEdit,
}: {
  page: { missionText: string; visionText: string };
  canEdit: boolean;
}) {
  const [state, action, pending] = useActionState(
    updateMissionVisionAction,
    {}
  );

  return (
    <form action={action} className="space-y-5">
      <FormAlert error={state.error} success={state.success} />

      <TextArea
        label="Mission"
        name="missionText"
        defaultValue={page.missionText}
        rows={5}
        required
        helpText="Shown in the 'Our Mission' block on the public page."
      />

      <TextArea
        label="Vision"
        name="visionText"
        defaultValue={page.visionText}
        rows={5}
        required
        helpText="Shown in the 'Our Vision' block on the public page."
      />

      <div className="pt-2">
        <Button type="submit" disabled={pending || !canEdit}>
          {pending ? "Saving…" : "Save"}
        </Button>
      </div>
    </form>
  );
}
