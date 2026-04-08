"use client";

import { useActionState } from "react";
import { createBlogCategoryAction } from "../actions";
import { Field, Checkbox, Button, FormAlert } from "../../../lib/ui";
import TextArea from "../../team/TextArea";

export default function NewBlogCategoryForm() {
  const [state, action, pending] = useActionState(createBlogCategoryAction, {});

  return (
    <form action={action} className="space-y-5">
      <FormAlert error={state.error} />

      <Field
        label="Name"
        name="name"
        required
        placeholder="e.g. Case Studies"
        helpText="Displayed on filter tabs. The slug is generated automatically."
      />
      <TextArea
        label="Description"
        name="description"
        rows={3}
        placeholder="Optional internal description…"
      />
      <Field
        label="Sort Order"
        name="sortOrder"
        type="number"
        defaultValue={100}
        helpText="Lower numbers appear first on the filter tabs."
      />
      <Checkbox label="Active" name="isActive" defaultChecked />

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Creating…" : "Create Category"}
        </Button>
        <Button href="/dashboard/blog-categories" variant="ghost">
          Cancel
        </Button>
      </div>
    </form>
  );
}
