"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createBlogPostAction } from "../actions";
import { Field, Select, Checkbox, Button, FormAlert } from "../../../lib/ui";
import TextArea from "../../team/TextArea";
import CoverImageUploader from "../CoverImageUploader";

export default function NewBlogPostForm({
  categories,
}: {
  categories: string[];
}) {
  const [state, action, pending] = useActionState(createBlogPostAction, {});

  if (categories.length === 0) {
    return (
      <div>
        <p className="text-sm text-[#CC0000] font-sans mb-4">
          You need at least one blog category before you can create a post.
        </p>
        <Link
          href="/dashboard/blog-categories/new"
          className="inline-flex items-center gap-1 text-sm text-[#E02020] hover:text-[#FF3333] font-sans font-semibold"
        >
          → Create your first category
        </Link>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5" encType="multipart/form-data">
      <FormAlert error={state.error} />

      <Field label="Title" name="title" required placeholder="How to…" />
      <TextArea
        label="Excerpt"
        name="excerpt"
        required
        placeholder="Short summary shown on the listing page…"
        rows={3}
      />

      <CoverImageUploader />

      <TextArea
        label="Content"
        name="content"
        rows={12}
        placeholder="Full post body. Paragraphs are separated by blank lines."
        helpText="Paragraphs separated by blank lines will be rendered on /blog/[slug]."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Select
          label="Category"
          name="category"
          required
          options={categories.map((c) => ({ value: c, label: c }))}
        />
        <Field
          label="Read Time (minutes)"
          name="readTimeMinutes"
          type="number"
          defaultValue={5}
        />
      </div>

      <Select
        label="Status"
        name="status"
        defaultValue="draft"
        options={[
          { value: "draft", label: "Draft — not visible on /blog" },
          { value: "published", label: "Published — live on /blog" },
        ]}
      />

      <Checkbox
        label="Featured post"
        name="isFeatured"
        helpText="Only one post can be featured at a time."
      />

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Creating…" : "Create Post"}
        </Button>
        <Button href="/dashboard/blog" variant="ghost">
          Cancel
        </Button>
      </div>
    </form>
  );
}
