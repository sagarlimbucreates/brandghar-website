"use client";

import { useActionState } from "react";
import { updateBlogCategoryAction } from "../actions";
import { Field, Checkbox, Button, FormAlert } from "../../../lib/ui";
import TextArea from "../../team/TextArea";

export default function EditBlogCategoryForm({
  category,
}: {
  category: {
    id: string;
    name: string;
    slug: string;
    description: string;
    sortOrder: number;
    isActive: boolean;
  };
}) {
  const [state, action, pending] = useActionState(updateBlogCategoryAction, {});

  return (
    <form action={action} className="space-y-5">
      <FormAlert error={state.error} />
      <input type="hidden" name="id" value={category.id} />

      <Field label="Name" name="name" defaultValue={category.name} required />
      <div>
        <label className="block text-xs font-sans font-semibold text-[#555] uppercase tracking-[0.1em] mb-2">
          Slug
        </label>
        <div className="px-4 py-2.5 bg-[#F7F7F7] border border-[#E5E5E5] rounded-[4px] text-[#888] text-sm font-mono">
          {category.slug}
        </div>
        <p className="text-xs text-[#888] font-sans mt-1.5">
          The slug is regenerated automatically if you change the name.
        </p>
      </div>
      <TextArea
        label="Description"
        name="description"
        defaultValue={category.description}
        rows={3}
      />
      <Field
        label="Sort Order"
        name="sortOrder"
        type="number"
        defaultValue={category.sortOrder}
      />
      <Checkbox label="Active" name="isActive" defaultChecked={category.isActive} />

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save Changes"}
        </Button>
        <Button href="/dashboard/blog-categories" variant="ghost">
          Cancel
        </Button>
      </div>
    </form>
  );
}
