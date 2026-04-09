import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, blogPosts } from "@/db";
import { requirePermission, hasPermission } from "../../../lib/rbac";
import { PageHeader, Card } from "../../../lib/ui";
import { getActiveBlogCategoryNames } from "../data";
import EditBlogPostForm from "./EditBlogPostForm";
import DeleteBlogPostForm from "./DeleteBlogPostForm";

type Params = Promise<{ id: string }>;

export default async function EditBlogPostPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  const me = await requirePermission("blog.edit");

  const row = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.id, id))
    .limit(1);
  const post = row[0];
  if (!post) notFound();

  const canDelete = hasPermission(me, "blog.delete");
  const categories = await getActiveBlogCategoryNames();

  return (
    <div className="max-w-3xl">
      <PageHeader
        eyebrow="Content"
        title="Edit Blog Post"
        subtitle={post.title}
        backHref="/dashboard/blog"
      />

      <Card className="p-8 mb-6">
        <EditBlogPostForm
          post={{
            id: post.id,
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            category: post.category,
            coverImageUrl: post.coverImageUrl,
            readTimeMinutes: post.readTimeMinutes,
            status: post.status as "draft" | "published",
            isFeatured: post.isFeatured,
          }}
          categories={categories}
        />
      </Card>

      {canDelete && (
        <Card className="p-8 border-[#E02020]/30">
          <h2 className="text-sm font-sans font-bold text-[#CC0000] mb-2">
            Danger Zone
          </h2>
          <p className="text-xs text-[#888] font-sans mb-5">
            Permanently delete this blog post. The cover image will also be
            removed from disk.
          </p>
          <DeleteBlogPostForm postId={post.id} />
        </Card>
      )}
    </div>
  );
}
