"use client";

import { useActionState } from "react";
import { updateBlogPostAction } from "../actions";
import { Field, Select, Checkbox, Button, FormAlert } from "../../../lib/ui";
import TextArea from "../../team/TextArea";
import CoverImageUploader from "../CoverImageUploader";

export default function EditBlogPostForm({
  post,
  categories,
}: {
  post: {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    coverImageUrl: string | null;
    readTimeMinutes: number;
    status: "draft" | "published";
    isFeatured: boolean;
  };
  categories: string[];
}) {
  const [state, action, pending] = useActionState(updateBlogPostAction, {});

  // Make sure the existing category is always in the list, even if it was
  // renamed/deleted from the categories table (so the Select doesn't drop it).
  const categoryOptions = categories.includes(post.category)
    ? categories
    : [post.category, ...categories];

  return (
    <form action={action} className="space-y-5" encType="multipart/form-data">
      <FormAlert error={state.error} />
      <input type="hidden" name="id" value={post.id} />

      <Field label="Title" name="title" defaultValue={post.title} required />
      <div>
        <label className="block text-xs font-sans font-semibold text-[#555] uppercase tracking-[0.1em] mb-2">
          Slug
        </label>
        <div className="px-4 py-2.5 bg-[#F7F7F7] border border-[#E5E5E5] rounded-[4px] text-[#888] text-sm font-mono">
          /blog/{post.slug}
        </div>
        <p className="text-xs text-[#888] font-sans mt-1.5">
          The slug is regenerated automatically if you change the title.
        </p>
      </div>

      <TextArea
        label="Excerpt"
        name="excerpt"
        defaultValue={post.excerpt}
        required
        rows={3}
      />

      <CoverImageUploader existingUrl={post.coverImageUrl} />

      <TextArea
        label="Content"
        name="content"
        defaultValue={post.content}
        rows={14}
        helpText="Paragraphs separated by blank lines will be rendered on /blog/[slug]."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Select
          label="Category"
          name="category"
          defaultValue={post.category}
          required
          options={categoryOptions.map((c) => ({ value: c, label: c }))}
        />
        <Field
          label="Read Time (minutes)"
          name="readTimeMinutes"
          type="number"
          defaultValue={post.readTimeMinutes}
        />
      </div>

      <Select
        label="Status"
        name="status"
        defaultValue={post.status}
        options={[
          { value: "draft", label: "Draft — not visible on /blog" },
          { value: "published", label: "Published — live on /blog" },
        ]}
      />

      <Checkbox
        label="Featured post"
        name="isFeatured"
        defaultChecked={post.isFeatured}
        helpText="Only one post can be featured at a time."
      />

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save Changes"}
        </Button>
        <Button href="/dashboard/blog" variant="ghost">
          Cancel
        </Button>
      </div>
    </form>
  );
}
