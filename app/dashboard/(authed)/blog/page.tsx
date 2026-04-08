import Link from "next/link";
import Image from "next/image";
import { desc, asc } from "drizzle-orm";
import { Plus, Pencil, Star, ImageIcon } from "lucide-react";
import { db, blogPosts } from "@/db";
import { requirePermission, hasPermission } from "../../lib/rbac";
import { PageHeader, Card, Button, TableHeader, Th, Td, Badge } from "../../lib/ui";

export default async function BlogDashboardPage() {
  const me = await requirePermission("blog.view");

  const rows = await db
    .select()
    .from(blogPosts)
    .orderBy(
      desc(blogPosts.isFeatured),
      desc(blogPosts.publishedAt),
      asc(blogPosts.title)
    );

  const canCreate = hasPermission(me, "blog.create");
  const canEdit = hasPermission(me, "blog.edit");

  return (
    <div>
      <PageHeader
        eyebrow="Content"
        title={`Blog Posts (${rows.length})`}
        subtitle="Manage articles shown on /blog."
        actions={
          canCreate && (
            <Button href="/dashboard/blog/new">
              <Plus size={14} /> New Post
            </Button>
          )
        }
      />

      <Card className="overflow-hidden">
        <table className="w-full">
          <TableHeader>
            <Th>Cover</Th>
            <Th>Title</Th>
            <Th>Category</Th>
            <Th>Status</Th>
            <Th>Published</Th>
            <Th>&nbsp;</Th>
          </TableHeader>
          <tbody>
            {rows.map((p) => (
              <tr
                key={p.id}
                className="border-b border-[#E5E5E5] last:border-b-0"
              >
                <Td>
                  <div className="w-16 h-10 rounded-[4px] overflow-hidden border border-[#E5E5E5] bg-[#F7F7F7] flex items-center justify-center shrink-0">
                    {p.coverImageUrl ? (
                      <Image
                        src={p.coverImageUrl}
                        alt={p.title}
                        width={64}
                        height={40}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <ImageIcon size={14} className="text-[#888]" />
                    )}
                  </div>
                </Td>
                <Td className="font-medium text-[#1A1A1A]">
                  <div className="flex items-center gap-2">
                    {p.isFeatured && (
                      <Star
                        size={12}
                        className="text-[#E02020] fill-[#E02020] shrink-0"
                      />
                    )}
                    {p.title}
                  </div>
                  <div className="text-xs text-[#888] font-mono mt-0.5 truncate max-w-[360px]">
                    /blog/{p.slug}
                  </div>
                </Td>
                <Td>
                  <Badge>{p.category}</Badge>
                </Td>
                <Td>
                  {p.status === "published" ? (
                    <Badge tone="success">Published</Badge>
                  ) : (
                    <Badge tone="muted">Draft</Badge>
                  )}
                </Td>
                <Td>
                  {p.publishedAt
                    ? new Date(p.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "—"}
                </Td>
                <Td className="text-right">
                  {canEdit && (
                    <Link
                      href={`/dashboard/blog/${p.id}`}
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
