import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db, blogCategories } from "@/db";
import { requirePermission, hasPermission } from "../../../lib/rbac";
import { PageHeader, Card, FormAlert } from "../../../lib/ui";
import EditBlogCategoryForm from "./EditBlogCategoryForm";
import DeleteBlogCategoryForm from "./DeleteBlogCategoryForm";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ error?: string }>;

export default async function EditBlogCategoryPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const me = await requirePermission("blog_category.edit");

  const row = await db
    .select()
    .from(blogCategories)
    .where(eq(blogCategories.id, id))
    .limit(1);
  const category = row[0];
  if (!category) notFound();

  const canDelete = hasPermission(me, "blog_category.delete");

  return (
    <div className="max-w-2xl">
      <PageHeader
        eyebrow="Content"
        title="Edit Blog Category"
        subtitle={category.name}
        backHref="/dashboard/blog-categories"
      />

      <FormAlert error={error} />

      <Card className="p-8 mb-6">
        <EditBlogCategoryForm
          category={{
            id: category.id,
            name: category.name,
            slug: category.slug,
            description: category.description ?? "",
            sortOrder: category.sortOrder,
            isActive: category.isActive,
          }}
        />
      </Card>

      {canDelete && (
        <Card className="p-8 border-[#E02020]/30">
          <h2 className="text-sm font-sans font-bold text-[#CC0000] mb-2">
            Danger Zone
          </h2>
          <p className="text-xs text-[#888] font-sans mb-5">
            Permanently delete this category. Deletion is blocked if any blog
            post still uses this category — reassign those posts first.
          </p>
          <DeleteBlogCategoryForm categoryId={category.id} />
        </Card>
      )}
    </div>
  );
}
