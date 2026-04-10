import type { MetadataRoute } from "next";
import { eq, asc, desc } from "drizzle-orm";
import { db, services, blogPosts } from "@/db";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thebrandghar.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const activeServices = await db
    .select({ slug: services.slug, updatedAt: services.updatedAt })
    .from(services)
    .where(eq(services.isActive, true))
    .orderBy(asc(services.sortOrder));

  const publishedPosts = await db
    .select({ slug: blogPosts.slug, updatedAt: blogPosts.updatedAt })
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .orderBy(desc(blogPosts.publishedAt));

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/about-us/our-company`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/about-us/mission-vision-values`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/about-us/our-team`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = activeServices.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: s.updatedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = publishedPosts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
