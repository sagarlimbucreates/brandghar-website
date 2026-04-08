"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { and, eq, ne } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { db, blogPosts, blogCategories } from "@/db";
import { requirePermission } from "../../lib/rbac";
import { saveBlogImage, deleteBlogImage } from "./upload";

export type FormState = { error?: string; success?: string };

const baseSchema = z.object({
  title: z.string().min(3).max(200),
  excerpt: z.string().min(10).max(500),
  content: z.string().max(50000).optional().default(""),
  category: z.string().min(1).max(120),
  readTimeMinutes: z.coerce.number().int().min(1).max(120).default(5),
  status: z.enum(["draft", "published"]).default("draft"),
  isFeatured: z.boolean().default(false),
});

async function validateCategoryName(name: string): Promise<boolean> {
  const rows = await db
    .select({ id: blogCategories.id })
    .from(blogCategories)
    .where(eq(blogCategories.name, name))
    .limit(1);
  return rows.length > 0;
}

function nullable(v: FormDataEntryValue | null): string | null {
  if (v === null) return null;
  const s = String(v).trim();
  return s.length === 0 ? null : s;
}

function isFile(v: FormDataEntryValue | null): v is File {
  return (
    typeof v === "object" &&
    v !== null &&
    "size" in v &&
    "type" in v &&
    "arrayBuffer" in v
  );
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 100);
}

async function ensureUniqueSlug(base: string, ignoreId?: string): Promise<string> {
  let slug = base || "post";
  let attempt = 1;
  while (true) {
    const existing = await db
      .select({ id: blogPosts.id })
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);
    if (existing.length === 0 || existing[0].id === ignoreId) return slug;
    attempt += 1;
    slug = `${base}-${attempt}`;
  }
}

export async function createBlogPostAction(
  _prev: FormState,
  fd: FormData
): Promise<FormState> {
  await requirePermission("blog.create");

  const parsed = baseSchema.safeParse({
    title: fd.get("title"),
    excerpt: fd.get("excerpt"),
    content: nullable(fd.get("content")) ?? "",
    category: fd.get("category"),
    readTimeMinutes: fd.get("readTimeMinutes") || 5,
    status: fd.get("status") || "draft",
    isFeatured: fd.get("isFeatured") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  if (!(await validateCategoryName(parsed.data.category))) {
    return { error: "Selected category does not exist." };
  }

  // Upload cover image if provided
  let coverImageUrl: string | null = null;
  const coverFile = fd.get("coverFile");
  if (isFile(coverFile) && coverFile.size > 0) {
    try {
      coverImageUrl = await saveBlogImage(coverFile);
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Failed to upload image.",
      };
    }
  }

  const slug = await ensureUniqueSlug(slugify(parsed.data.title));

  // If marking this post as featured, unset any existing featured post.
  if (parsed.data.isFeatured) {
    await db
      .update(blogPosts)
      .set({ isFeatured: false })
      .where(eq(blogPosts.isFeatured, true));
  }

  await db.insert(blogPosts).values({
    id: randomUUID(),
    slug,
    title: parsed.data.title,
    excerpt: parsed.data.excerpt,
    content: parsed.data.content,
    category: parsed.data.category,
    readTimeMinutes: parsed.data.readTimeMinutes,
    status: parsed.data.status,
    isFeatured: parsed.data.isFeatured,
    coverImageUrl,
    publishedAt: parsed.data.status === "published" ? new Date() : null,
  });

  revalidatePath("/dashboard/blog");
  revalidatePath("/blog");
  redirect("/dashboard/blog");
}

export async function updateBlogPostAction(
  _prev: FormState,
  fd: FormData
): Promise<FormState> {
  await requirePermission("blog.edit");

  const id = String(fd.get("id") ?? "");
  if (!id) return { error: "Missing post id." };

  const parsed = baseSchema.safeParse({
    title: fd.get("title"),
    excerpt: fd.get("excerpt"),
    content: nullable(fd.get("content")) ?? "",
    category: fd.get("category"),
    readTimeMinutes: fd.get("readTimeMinutes") || 5,
    status: fd.get("status") || "draft",
    isFeatured: fd.get("isFeatured") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  if (!(await validateCategoryName(parsed.data.category))) {
    return { error: "Selected category does not exist." };
  }

  // Load current record for photo + slug handling
  const currentRows = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.id, id))
    .limit(1);
  if (currentRows.length === 0) return { error: "Post not found." };
  const current = currentRows[0];

  // Cover image: upload/replace/remove
  let nextCoverUrl = current.coverImageUrl;
  const removeRequested = fd.get("removeCover") === "on";
  const coverFile = fd.get("coverFile");
  if (isFile(coverFile) && coverFile.size > 0) {
    try {
      nextCoverUrl = await saveBlogImage(coverFile);
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Failed to upload image.",
      };
    }
    if (current.coverImageUrl && current.coverImageUrl !== nextCoverUrl) {
      await deleteBlogImage(current.coverImageUrl);
    }
  } else if (removeRequested) {
    nextCoverUrl = null;
    if (current.coverImageUrl) await deleteBlogImage(current.coverImageUrl);
  }

  // Re-slug if the title changed.
  let slug = current.slug;
  if (parsed.data.title !== current.title) {
    slug = await ensureUniqueSlug(slugify(parsed.data.title), id);
  }

  // Enforce only one featured post at a time.
  if (parsed.data.isFeatured) {
    await db
      .update(blogPosts)
      .set({ isFeatured: false })
      .where(and(eq(blogPosts.isFeatured, true), ne(blogPosts.id, id)));
  }

  // If publishing for the first time, set publishedAt.
  let publishedAt = current.publishedAt;
  if (parsed.data.status === "published" && !publishedAt) {
    publishedAt = new Date();
  }
  if (parsed.data.status === "draft") {
    // keep publishedAt so it can be republished later
  }

  await db
    .update(blogPosts)
    .set({
      slug,
      title: parsed.data.title,
      excerpt: parsed.data.excerpt,
      content: parsed.data.content,
      category: parsed.data.category,
      readTimeMinutes: parsed.data.readTimeMinutes,
      status: parsed.data.status,
      isFeatured: parsed.data.isFeatured,
      coverImageUrl: nextCoverUrl,
      publishedAt,
      updatedAt: new Date(),
    })
    .where(eq(blogPosts.id, id));

  revalidatePath("/dashboard/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  redirect("/dashboard/blog");
}

export async function deleteBlogPostAction(fd: FormData) {
  await requirePermission("blog.delete");
  const id = String(fd.get("id") ?? "");
  if (!id) return;

  const current = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.id, id))
    .limit(1);

  await db.delete(blogPosts).where(eq(blogPosts.id, id));

  if (current[0]?.coverImageUrl) {
    await deleteBlogImage(current[0].coverImageUrl);
  }

  revalidatePath("/dashboard/blog");
  revalidatePath("/blog");
  redirect("/dashboard/blog");
}
