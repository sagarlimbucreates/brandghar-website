"use client";

import { useActionState } from "react";
import { createTrustPointAction } from "../../actions";
import { Field, Select, Checkbox, Button, FormAlert } from "../../../../lib/ui";

export default function NewTrustPointForm({
  iconOptions,
}: {
  iconOptions: string[];
}) {
  const [state, action, pending] = useActionState(createTrustPointAction, {});

  return (
    <form action={action} className="space-y-5">
      <FormAlert error={state.error} />

      <Field
        label="Text"
        name="text"
        required
        placeholder="e.g. Experienced team"
        helpText="Short label — a couple of words."
      />
      <Select
        label="Icon"
        name="icon"
        required
        defaultValue="Users"
        options={iconOptions.map((i) => ({ value: i, label: i }))}
      />
      <Field
        label="Sort Order"
        name="sortOrder"
        type="number"
        defaultValue={100}
        helpText="Lower numbers appear first."
      />
      <Checkbox label="Visible on public page" name="isActive" defaultChecked />

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Creating…" : "Create Point"}
        </Button>
        <Button href="/dashboard/contact" variant="ghost">
          Cancel
        </Button>
      </div>
    </form>
  );
}
