import Link from "next/link";
import { asc, eq, sql } from "drizzle-orm";
import { Plus, Pencil } from "lucide-react";
import { db, blogCategories, blogPosts } from "@/db";
import { requirePermission, hasPermission } from "../../lib/rbac";
import { PageHeader, Card, Button, TableHeader, Th, Td, Badge } from "../../lib/ui";

export default async function BlogCategoriesPage() {
  const me = await requirePermission("blog_category.view");

  const rows = await db
    .select({
      id: blogCategories.id,
      name: blogCategories.name,
      slug: blogCategories.slug,
      description: blogCategories.description,
      sortOrder: blogCategories.sortOrder,
      isActive: blogCategories.isActive,
      postCount: sql<number>`COUNT(${blogPosts.id})`.as("post_count"),
    })
    .from(blogCategories)
    .leftJoin(blogPosts, eq(blogPosts.category, blogCategories.name))
    .groupBy(blogCategories.id)
    .orderBy(asc(blogCategories.sortOrder), asc(blogCategories.name));

  const canCreate = hasPermission(me, "blog_category.create");
  const canEdit = hasPermission(me, "blog_category.edit");

  return (
    <div>
      <PageHeader
        eyebrow="Content"
        title={`Blog Categories (${rows.length})`}
        subtitle="Categories shown as filter tabs on /blog."
        actions={
          canCreate && (
            <Button href="/dashboard/blog-categories/new">
              <Plus size={14} /> New Category
            </Button>
          )
        }
      />

      <Card className="overflow-hidden">
        <table className="w-full">
          <TableHeader>
            <Th>Sort</Th>
            <Th>Name</Th>
            <Th>Slug</Th>
            <Th>Posts</Th>
            <Th>Status</Th>
            <Th>&nbsp;</Th>
          </TableHeader>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id} className="border-b border-[#E5E5E5] last:border-b-0">
                <Td className="font-mono text-[#888]">{c.sortOrder}</Td>
                <Td className="font-medium text-[#1A1A1A]">
                  {c.name}
                  {c.description && (
                    <div className="text-xs text-[#888] font-sans mt-0.5 max-w-sm truncate">
                      {c.description}
                    </div>
                  )}
                </Td>
                <Td className="font-mono text-xs">{c.slug}</Td>
                <Td>{c.postCount}</Td>
                <Td>
                  {c.isActive ? (
                    <Badge tone="success">Active</Badge>
                  ) : (
                    <Badge tone="muted">Hidden</Badge>
                  )}
                </Td>
                <Td className="text-right">
                  {canEdit && (
                    <Link
                      href={`/dashboard/blog-categories/${c.id}`}
                      className="inline-flex items-center gap-1 text-xs text-[#E02020] hover:text-[#FF3333] font-sans font-semibold"
                    >
                      <Pencil size={12} /> Edit
                    </Link>
                  )}
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
