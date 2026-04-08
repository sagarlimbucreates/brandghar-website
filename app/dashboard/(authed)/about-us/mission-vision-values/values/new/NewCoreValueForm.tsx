"use client";

import { useActionState } from "react";
import { createCoreValueAction } from "../../actions";
import { Field, Select, Checkbox, Button, FormAlert } from "../../../../../lib/ui";
import TextArea from "../../../../team/TextArea";

export default function NewCoreValueForm({
  iconOptions,
}: {
  iconOptions: string[];
}) {
  const [state, action, pending] = useActionState(createCoreValueAction, {});

  return (
    <form action={action} className="space-y-5">
      <FormAlert error={state.error} />

      <Field label="Title" name="title" required placeholder="e.g. Results First" />
      <TextArea
        label="Description"
        name="description"
        rows={4}
        required
        placeholder="One or two sentences explaining this value…"
      />
      <Select
        label="Icon"
        name="icon"
        required
        defaultValue="Target"
        options={iconOptions.map((i) => ({ value: i, label: i }))}
      />
      <Field
        label="Sort Order"
        name="sortOrder"
        type="number"
        defaultValue={100}
        helpText="Lower numbers appear first on the public page."
      />
      <Checkbox label="Visible on public page" name="isActive" defaultChecked />

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Creating…" : "Create Value"}
        </Button>
        <Button href="/dashboard/about-us/mission-vision-values" variant="ghost">
          Cancel
        </Button>
      </div>
    </form>
  );
}
