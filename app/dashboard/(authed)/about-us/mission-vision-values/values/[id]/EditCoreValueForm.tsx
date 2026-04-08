"use client";

import { useActionState } from "react";
import { updateCoreValueAction } from "../../actions";
import { Field, Select, Checkbox, Button, FormAlert } from "../../../../../lib/ui";
import TextArea from "../../../../team/TextArea";

export default function EditCoreValueForm({
  value,
  iconOptions,
}: {
  value: {
    id: string;
    title: string;
    description: string;
    icon: string;
    sortOrder: number;
    isActive: boolean;
  };
  iconOptions: string[];
}) {
  const [state, action, pending] = useActionState(updateCoreValueAction, {});

  return (
    <form action={action} className="space-y-5">
      <FormAlert error={state.error} />
      <input type="hidden" name="id" value={value.id} />

      <Field label="Title" name="title" defaultValue={value.title} required />
      <TextArea
        label="Description"
        name="description"
        rows={4}
        defaultValue={value.description}
        required
      />
      <Select
        label="Icon"
        name="icon"
        defaultValue={value.icon}
        required
        options={iconOptions.map((i) => ({ value: i, label: i }))}
      />
      <Field
        label="Sort Order"
        name="sortOrder"
        type="number"
        defaultValue={value.sortOrder}
      />
      <Checkbox
        label="Visible on public page"
        name="isActive"
        defaultChecked={value.isActive}
      />

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save Changes"}
        </Button>
        <Button href="/dashboard/about-us/mission-vision-values" variant="ghost">
          Cancel
        </Button>
      </div>
    </form>
  );
}
