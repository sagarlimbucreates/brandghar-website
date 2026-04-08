import { requirePermission } from "../../../lib/rbac";
import { PageHeader, Card } from "../../../lib/ui";
import NewBlogCategoryForm from "./NewBlogCategoryForm";

export default async function NewBlogCategoryPage() {
  await requirePermission("blog_category.create");
  return (
    <div className="max-w-2xl">
      <PageHeader
        eyebrow="Content"
        title="New Blog Category"
        subtitle="Add a category that posts can be filed under."
        backHref="/dashboard/blog-categories"
      />
      <Card className="p-8">
        <NewBlogCategoryForm />
      </Card>
    </div>
  );
}
