"use client";

import { useActionState } from "react";
import { updateTrustPointAction } from "../../actions";
import { Field, Select, Checkbox, Button, FormAlert } from "../../../../lib/ui";

export default function EditTrustPointForm({
  trust,
  iconOptions,
}: {
  trust: {
    id: string;
    text: string;
    icon: string;
    sortOrder: number;
    isActive: boolean;
  };
  iconOptions: string[];
}) {
  const [state, action, pending] = useActionState(updateTrustPointAction, {});

  return (
    <form action={action} className="space-y-5">
      <FormAlert error={state.error} />
      <input type="hidden" name="id" value={trust.id} />

      <Field label="Text" name="text" defaultValue={trust.text} required />
      <Select
        label="Icon"
        name="icon"
        defaultValue={trust.icon}
        required
        options={iconOptions.map((i) => ({ value: i, label: i }))}
      />
      <Field
        label="Sort Order"
        name="sortOrder"
        type="number"
        defaultValue={trust.sortOrder}
      />
      <Checkbox
        label="Visible on public page"
        name="isActive"
        defaultChecked={trust.isActive}
      />

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save Changes"}
        </Button>
        <Button href="/dashboard/contact" variant="ghost">
          Cancel
        </Button>
      </div>
    </form>
  );
}
