import { requirePermission } from "../../../lib/rbac";
import { PageHeader, Card } from "../../../lib/ui";
import { getActiveBlogCategoryNames } from "../data";
import NewBlogPostForm from "./NewBlogPostForm";

export default async function NewBlogPostPage() {
  await requirePermission("blog.create");
  const categories = await getActiveBlogCategoryNames();

  return (
    <div className="max-w-3xl">
      <PageHeader
        eyebrow="Content"
        title="New Blog Post"
        subtitle="Draft a new article."
        backHref="/dashboard/blog"
      />
      <Card className="p-8">
        <NewBlogPostForm categories={categories} />
      </Card>
    </div>
  );
}
