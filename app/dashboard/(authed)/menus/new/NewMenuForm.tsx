"use client";

import { useActionState } from "react";
import { createMenuAction } from "../actions";
import { Field, Select, Checkbox, Button, FormAlert } from "../../../lib/ui";

export default function NewMenuForm({
  iconOptions,
  groupOptions,
  parentOptions,
}: {
  iconOptions: string[];
  groupOptions: string[];
  parentOptions: Array<{ value: string; label: string }>;
}) {
  const [state, action, pending] = useActionState(createMenuAction, {});

  return (
    <form action={action} className="space-y-5">
      <FormAlert error={state.error} />

      <Field
        label="Key"
        name="key"
        required
        placeholder="e.g. reports"
        helpText="Unique identifier. Lowercase letters, numbers, dashes, underscores."
      />
      <Field label="Label" name="label" required placeholder="e.g. Reports" />
      <Field label="Href" name="href" required placeholder="e.g. /dashboard/reports or # for parent menus" />
      <Select
        label="Icon"
        name="icon"
        required
        options={iconOptions.map((i) => ({ value: i, label: i }))}
      />
      <Select
        label="Parent Menu"
        name="parentId"
        helpText="Leave empty for a top-level menu. Choose a parent to make this a submenu."
        options={[
          { value: "", label: "— Top level —" },
          ...parentOptions,
        ]}
      />
      <Select
        label="Required Group"
        name="requiredGroup"
        helpText="If set, only users with at least one permission in this group will see the menu. Leave blank for any authenticated user."
        options={[
          { value: "", label: "— Any authenticated user —" },
          ...groupOptions.map((g) => ({ value: g, label: g })),
        ]}
      />
      <Field
        label="Sort Order"
        name="sortOrder"
        type="number"
        defaultValue={100}
        helpText="Lower numbers appear first within the same parent."
      />
      <Checkbox label="Active" name="isActive" defaultChecked />

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Creating…" : "Create Menu"}
        </Button>
        <Button href="/dashboard/menus" variant="ghost">
          Cancel
        </Button>
      </div>
    </form>
  );
}
