"use client";

import { useActionState } from "react";
import { updateMenuAction } from "../actions";
import { Field, Select, Checkbox, Button, FormAlert } from "../../../lib/ui";

export default function EditMenuForm({
  menu,
  iconOptions,
  groupOptions,
  parentOptions,
}: {
  menu: {
    id: string;
    key: string;
    label: string;
    href: string;
    icon: string;
    requiredGroup: string;
    parentId: string;
    sortOrder: number;
    isActive: boolean;
  };
  iconOptions: string[];
  groupOptions: string[];
  parentOptions: Array<{ value: string; label: string }>;
}) {
  const [state, action, pending] = useActionState(updateMenuAction, {});

  return (
    <form action={action} className="space-y-5">
      <FormAlert error={state.error} />
      <input type="hidden" name="id" value={menu.id} />

      <Field label="Key" name="key" defaultValue={menu.key} required />
      <Field label="Label" name="label" defaultValue={menu.label} required />
      <Field label="Href" name="href" defaultValue={menu.href} required />
      <Select
        label="Icon"
        name="icon"
        defaultValue={menu.icon}
        required
        options={iconOptions.map((i) => ({ value: i, label: i }))}
      />
      <Select
        label="Parent Menu"
        name="parentId"
        defaultValue={menu.parentId}
        helpText="Leave empty for a top-level menu."
        options={[
          { value: "", label: "— Top level —" },
          ...parentOptions,
        ]}
      />
      <Select
        label="Required Group"
        name="requiredGroup"
        defaultValue={menu.requiredGroup}
        helpText="If set, only users with a matching permission will see this menu."
        options={[
          { value: "", label: "— Any authenticated user —" },
          ...groupOptions.map((g) => ({ value: g, label: g })),
        ]}
      />
      <Field
        label="Sort Order"
        name="sortOrder"
        type="number"
        defaultValue={menu.sortOrder}
      />
      <Checkbox label="Active" name="isActive" defaultChecked={menu.isActive} />

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save Changes"}
        </Button>
        <Button href="/dashboard/menus" variant="ghost">
          Cancel
        </Button>
      </div>
    </form>
  );
}
