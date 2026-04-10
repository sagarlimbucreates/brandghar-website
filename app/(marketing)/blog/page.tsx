import type { Metadata } from "next";
import { asc, eq, desc } from "drizzle-orm";
import { db, blogPosts, blogCategories } from "@/db";
import BlogClient from "./BlogClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights, tips, and strategies on digital marketing, SEO, branding, and social media from the Brandghar team.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const postRows = await db
    .select({
      id: blogPosts.id,
      slug: blogPosts.slug,
      title: blogPosts.title,
      excerpt: blogPosts.excerpt,
      category: blogPosts.category,
      coverImageUrl: blogPosts.coverImageUrl,
      readTimeMinutes: blogPosts.readTimeMinutes,
      isFeatured: blogPosts.isFeatured,
      publishedAt: blogPosts.publishedAt,
    })
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .orderBy(desc(blogPosts.isFeatured), desc(blogPosts.publishedAt));

  const categoryRows = await db
    .select({ name: blogCategories.name })
    .from(blogCategories)
    .where(eq(blogCategories.isActive, true))
    .orderBy(asc(blogCategories.sortOrder), asc(blogCategories.name));

  const featured = postRows.find((r) => r.isFeatured) ?? null;
  const nonFeatured = postRows.filter((r) => r.id !== featured?.id);

  const serialize = (r: (typeof postRows)[number]) => ({
    id: r.id,
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    category: r.category,
    coverImageUrl: r.coverImageUrl,
    readTimeMinutes: r.readTimeMinutes,
    publishedAt: r.publishedAt ? r.publishedAt.toISOString() : null,
  });

  return (
    <BlogClient
      featured={featured ? serialize(featured) : null}
      posts={nonFeatured.map(serialize)}
      categories={categoryRows.map((c) => c.name)}
    />
  );
}
