import "server-only";
import { asc, eq } from "drizzle-orm";
import { db, blogCategories } from "@/db";

export async function getActiveBlogCategoryNames(): Promise<string[]> {
  const rows = await db
    .select({ name: blogCategories.name })
    .from(blogCategories)
    .where(eq(blogCategories.isActive, true))
    .orderBy(asc(blogCategories.sortOrder), asc(blogCategories.name));
  return rows.map((r) => r.name);
}

export async function getActiveBlogCategoryOptions() {
  const rows = await db
    .select({
      id: blogCategories.id,
      name: blogCategories.name,
      slug: blogCategories.slug,
    })
    .from(blogCategories)
    .where(eq(blogCategories.isActive, true))
    .orderBy(asc(blogCategories.sortOrder), asc(blogCategories.name));
  return rows;
}
