"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { and, eq, ne, sql } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { db, blogCategories, blogPosts } from "@/db";
import { requirePermission } from "../../lib/rbac";

export type FormState = { error?: string; success?: string };

const baseSchema = z.object({
  name: z.string().min(2).max(120),
  description: z.string().max(500).optional().nullable(),
  sortOrder: z.coerce.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

const updateSchema = baseSchema.extend({ id: z.string().min(1) });

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 100);
}

async function ensureUniqueSlug(base: string, ignoreId?: string): Promise<string> {
  let slug = base || "category";
  let attempt = 1;
  while (true) {
    const existing = await db
      .select({ id: blogCategories.id })
      .from(blogCategories)
      .where(eq(blogCategories.slug, slug))
      .limit(1);
    if (existing.length === 0 || existing[0].id === ignoreId) return slug;
    attempt += 1;
    slug = `${base}-${attempt}`;
  }
}

function nullable(v: FormDataEntryValue | null): string | null {
  if (v === null) return null;
  const s = String(v).trim();
  return s.length === 0 ? null : s;
}

export async function createBlogCategoryAction(
  _prev: FormState,
  fd: FormData
): Promise<FormState> {
  await requirePermission("blog_category.create");

  const parsed = baseSchema.safeParse({
    name: fd.get("name"),
    description: nullable(fd.get("description")),
    sortOrder: fd.get("sortOrder") || 0,
    isActive: fd.get("isActive") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const existing = await db
    .select({ id: blogCategories.id })
    .from(blogCategories)
    .where(eq(blogCategories.name, parsed.data.name))
    .limit(1);

  if (existing.length > 0) {
    return { error: "A category with this name already exists." };
  }

  const slug = await ensureUniqueSlug(slugify(parsed.data.name));

  await db.insert(blogCategories).values({
    id: randomUUID(),
    name: parsed.data.name,
    slug,
    description: parsed.data.description ?? null,
    sortOrder: parsed.data.sortOrder,
    isActive: parsed.data.isActive,
  });

  revalidatePath("/dashboard/blog-categories");
  revalidatePath("/dashboard/blog");
  revalidatePath("/blog");
  redirect("/dashboard/blog-categories");
}

export async function updateBlogCategoryAction(
  _prev: FormState,
  fd: FormData
): Promise<FormState> {
  await requirePermission("blog_category.edit");

  const parsed = updateSchema.safeParse({
    id: fd.get("id"),
    name: fd.get("name"),
    description: nullable(fd.get("description")),
    sortOrder: fd.get("sortOrder") || 0,
    isActive: fd.get("isActive") === "on",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const { id } = parsed.data;

  // Load current to detect rename
  const current = await db
    .select()
    .from(blogCategories)
    .where(eq(blogCategories.id, id))
    .limit(1);
  if (current.length === 0) return { error: "Category not found." };
  const oldName = current[0].name;

  // Check for name collision (ignoring self)
  if (parsed.data.name !== oldName) {
    const collision = await db
      .select({ id: blogCategories.id })
      .from(blogCategories)
      .where(and(eq(blogCategories.name, parsed.data.name), ne(blogCategories.id, id)))
      .limit(1);
    if (collision.length > 0) {
      return { error: "A category with this name already exists." };
    }
  }

  // Re-slug if name changed
  let slug = current[0].slug;
  if (parsed.data.name !== oldName) {
    slug = await ensureUniqueSlug(slugify(parsed.data.name), id);
  }

  await db
    .update(blogCategories)
    .set({
      name: parsed.data.name,
      slug,
      description: parsed.data.description ?? null,
      sortOrder: parsed.data.sortOrder,
      isActive: parsed.data.isActive,
      updatedAt: new Date(),
    })
    .where(eq(blogCategories.id, id));

  // Cascade rename to blog_posts.category if the name changed.
  if (parsed.data.name !== oldName) {
    await db
      .update(blogPosts)
      .set({ category: parsed.data.name })
      .where(eq(blogPosts.category, oldName));
  }

  revalidatePath("/dashboard/blog-categories");
  revalidatePath("/dashboard/blog");
  revalidatePath("/blog");
  redirect("/dashboard/blog-categories");
}

export async function deleteBlogCategoryAction(fd: FormData) {
  await requirePermission("blog_category.delete");
  const id = String(fd.get("id") ?? "");
  if (!id) return;

  // Block deletion if any blog post uses this category.
  const current = await db
    .select()
    .from(blogCategories)
    .where(eq(blogCategories.id, id))
    .limit(1);
  if (current.length === 0) {
    redirect("/dashboard/blog-categories");
  }

  const inUse = await db
    .select({ count: sql<number>`COUNT(*)`.as("count") })
    .from(blogPosts)
    .where(eq(blogPosts.category, current[0].name));

  if ((inUse[0]?.count ?? 0) > 0) {
    redirect(
      `/dashboard/blog-categories/${id}?error=${encodeURIComponent(
        `Cannot delete — ${inUse[0].count} blog post(s) still use this category.`
      )}`
    );
  }

  await db.delete(blogCategories).where(eq(blogCategories.id, id));

  revalidatePath("/dashboard/blog-categories");
  revalidatePath("/blog");
  redirect("/dashboard/blog-categories");
}
