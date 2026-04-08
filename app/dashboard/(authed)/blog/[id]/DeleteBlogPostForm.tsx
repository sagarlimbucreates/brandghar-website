"use client";

import { Trash2 } from "lucide-react";
import { deleteBlogPostAction } from "../actions";
import { Button } from "../../../lib/ui";

export default function DeleteBlogPostForm({ postId }: { postId: string }) {
  return (
    <form
      action={deleteBlogPostAction}
      onSubmit={(e) => {
        if (!confirm("Delete this blog post permanently?")) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={postId} />
      <Button type="submit" variant="danger">
        <Trash2 size={14} /> Delete Post
      </Button>
    </form>
  );
}
