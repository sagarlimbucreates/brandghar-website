"use client";

import { Trash2 } from "lucide-react";
import { deleteBlogCategoryAction } from "../actions";
import { Button } from "../../../lib/ui";

export default function DeleteBlogCategoryForm({
  categoryId,
}: {
  categoryId: string;
}) {
  return (
    <form
      action={deleteBlogCategoryAction}
      onSubmit={(e) => {
        if (!confirm("Delete this category permanently?")) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={categoryId} />
      <Button type="submit" variant="danger">
        <Trash2 size={14} /> Delete Category
      </Button>
    </form>
  );
}
