import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { and, eq, ne, desc } from "drizzle-orm";
import { ChevronRight, ArrowLeft, ImageIcon, Clock, Calendar } from "lucide-react";
import { db, blogPosts } from "@/db";

type Params = Promise<{ slug: string }>;

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;

  const rows = await db
    .select()
    .from(blogPosts)
    .where(and(eq(blogPosts.slug, slug), eq(blogPosts.status, "published")))
    .limit(1);

  const post = rows[0];
  if (!post) notFound();

  // Related posts: same category, published, not this one. Max 3.
  const related = await db
    .select({
      id: blogPosts.id,
      slug: blogPosts.slug,
      title: blogPosts.title,
      excerpt: blogPosts.excerpt,
      category: blogPosts.category,
      coverImageUrl: blogPosts.coverImageUrl,
      readTimeMinutes: blogPosts.readTimeMinutes,
      publishedAt: blogPosts.publishedAt,
    })
    .from(blogPosts)
    .where(
      and(
        eq(blogPosts.category, post.category),
        eq(blogPosts.status, "published"),
        ne(blogPosts.id, post.id)
      )
    )
    .orderBy(desc(blogPosts.publishedAt))
    .limit(3);

  const formatDate = (d: Date | null) =>
    d
      ? d.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : "";

  // Split content into paragraphs by blank lines
  const paragraphs = post.content
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-off-white border-b border-border">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20 py-4">
          <nav className="flex items-center gap-2 text-sm font-sans overflow-hidden">
            <Link
              href="/"
              className="text-text-muted hover:text-accent transition-colors duration-200"
            >
              Home
            </Link>
            <ChevronRight size={14} className="text-text-muted shrink-0" />
            <Link
              href="/blog"
              className="text-text-muted hover:text-accent transition-colors duration-200"
            >
              Blog
            </Link>
            <ChevronRight size={14} className="text-text-muted shrink-0" />
            <span className="text-text-primary font-medium truncate">
              {post.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <article>
        <header className="py-16 md:py-20">
          <div className="mx-auto max-w-[780px] px-6 md:px-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-accent font-sans mb-6 transition-colors"
            >
              <ArrowLeft size={12} /> All Articles
            </Link>

            <span className="inline-block bg-accent/10 text-accent text-xs font-sans font-semibold px-3 py-1 rounded-[4px] mb-5">
              {post.category}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-sans font-bold text-text-primary leading-[1.15] tracking-tight mb-6">
              {post.title}
            </h1>

            <p className="text-lg md:text-xl text-text-secondary leading-[1.6] font-sans mb-8">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-5 text-sm text-text-muted font-sans">
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                {formatDate(post.publishedAt)}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} />
                {post.readTimeMinutes} min read
              </div>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImageUrl && (
          <div className="mx-auto max-w-[1200px] px-6 md:px-12">
            <div className="relative aspect-[16/9] bg-off-white border border-border rounded-[8px] overflow-hidden mb-12 md:mb-16">
              <Image
                src={post.coverImageUrl}
                alt={post.title}
                fill
                className="object-cover"
                unoptimized
                priority
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="mx-auto max-w-[780px] px-6 md:px-12 pb-20 md:pb-28">
          {paragraphs.length === 0 ? (
            <p className="text-text-secondary font-sans italic">
              Full content coming soon.
            </p>
          ) : (
            <div className="space-y-6">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-base md:text-lg text-text-secondary leading-[1.8] font-sans"
                >
                  {p}
                </p>
              ))}
            </div>
          )}
        </div>
      </article>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-20 md:py-28 bg-off-white border-t border-border">
          <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
            <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4">
              Keep Reading
            </span>
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-12">
              More in <span className="text-accent">{post.category}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/blog/${r.slug}`}
                  className="group bg-white border border-border rounded-[4px] overflow-hidden hover:border-accent/30 transition-colors duration-300"
                >
                  <div className="aspect-[16/10] bg-off-white border-b border-border overflow-hidden">
                    {r.coverImageUrl ? (
                      <Image
                        src={r.coverImageUrl}
                        alt={r.title}
                        width={400}
                        height={250}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon size={24} className="text-text-muted/30" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-sans font-semibold text-accent mb-2 block">
                      {r.category}
                    </span>
                    <h3 className="text-base font-sans font-bold text-text-primary leading-snug mb-2 group-hover:text-accent transition-colors duration-200">
                      {r.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-[1.6] font-sans line-clamp-2">
                      {r.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
