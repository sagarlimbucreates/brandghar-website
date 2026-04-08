"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronRight,
  TrendingUp,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BarChart3,
  Briefcase,
  ImageIcon,
  Tag,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

const whyRead = [
  { icon: BookOpen, text: "Learn actionable strategies" },
  { icon: TrendingUp, text: "Stay updated with trends" },
  { icon: BarChart3, text: "Improve your marketing performance" },
  { icon: Briefcase, text: "Get real-world business insights" },
];

export type PublicBlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImageUrl: string | null;
  readTimeMinutes: number;
  publishedAt: string | null;
};

function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogClient({
  featured,
  posts,
  categories,
}: {
  featured: PublicBlogPost | null;
  posts: PublicBlogPost[];
  categories: string[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categoryTabs = ["All", ...categories];

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [activeCategory, posts]);

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-off-white border-b border-border">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20 py-4">
          <nav className="flex items-center gap-2 text-sm font-sans">
            <Link
              href="/"
              className="text-text-muted hover:text-accent transition-colors duration-200"
            >
              Home
            </Link>
            <ChevronRight size={14} className="text-text-muted" />
            <span className="text-text-primary font-medium">Blog</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
          <motion.span
            {...fadeUp}
            className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4"
          >
            Our Blog
          </motion.span>
          <motion.h1
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-6 max-w-3xl"
          >
            Insights That Grow Your{" "}
            <span className="text-accent">Brand.</span>
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="text-text-secondary max-w-2xl leading-[1.7] font-sans text-base md:text-lg"
          >
            Stay ahead with expert tips, strategies, and trends in digital
            marketing, branding, and business growth.
          </motion.p>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
          <div className="flex items-center gap-3 overflow-x-auto pb-4 -mb-px">
            {categoryTabs.map((label) => (
              <button
                key={label}
                onClick={() => setActiveCategory(label)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-[4px] text-sm font-sans font-medium whitespace-nowrap transition-colors duration-200 ${
                  activeCategory === label
                    ? "bg-accent text-white"
                    : "bg-off-white text-text-secondary hover:text-accent hover:bg-accent/5 border border-border"
                }`}
              >
                {label !== "All" && <Tag size={12} />}
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featured && activeCategory === "All" && (
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
            <motion.div
              {...fadeUp}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
            >
              {/* Image */}
              <div className="aspect-[16/10] bg-off-white border border-border rounded-[4px] flex items-center justify-center overflow-hidden">
                {featured.coverImageUrl ? (
                  <Image
                    src={featured.coverImageUrl}
                    alt={featured.title}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                ) : (
                  <ImageIcon size={32} className="text-text-muted/30" />
                )}
              </div>

              {/* Content */}
              <div>
                <span className="inline-block bg-accent/10 text-accent text-xs font-sans font-semibold px-3 py-1 rounded-[4px] mb-4">
                  {featured.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-sans font-bold text-text-primary leading-[1.15] tracking-tight mb-4">
                  {featured.title}
                </h2>
                <p className="text-text-secondary leading-[1.7] font-sans mb-6">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 text-text-muted text-sm font-sans mb-6">
                  <span>{formatDate(featured.publishedAt)}</span>
                  <span className="w-1 h-1 bg-text-muted rounded-full" />
                  <span>{featured.readTimeMinutes} min read</span>
                </div>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="inline-flex items-center gap-2 text-accent font-sans font-semibold text-sm hover:gap-3 transition-all duration-200"
                >
                  Read Full Article
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
          <motion.span
            {...fadeUp}
            className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4"
          >
            Latest Articles
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-12 max-w-2xl"
          >
            {activeCategory === "All" ? (
              <>
                All <span className="text-accent">Posts</span>
              </>
            ) : (
              <span className="text-accent">{activeCategory}</span>
            )}
          </motion.h2>

          {filteredPosts.length === 0 ? (
            <p className="text-text-secondary font-sans italic">
              No posts in this category yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, i) => (
                <motion.article
                  key={post.id}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: 0.1 * (i + 1) }}
                  className="group bg-white border border-border rounded-[4px] overflow-hidden hover:border-accent/30 transition-colors duration-300"
                >
                  {/* Thumbnail */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block aspect-[16/10] bg-off-white border-b border-border overflow-hidden"
                  >
                    {post.coverImageUrl ? (
                      <Image
                        src={post.coverImageUrl}
                        alt={post.title}
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
                  </Link>

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-sans font-semibold text-accent">
                        {post.category}
                      </span>
                      <span className="w-1 h-1 bg-text-muted rounded-full" />
                      <span className="text-xs text-text-muted font-sans">
                        {post.readTimeMinutes} min read
                      </span>
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="text-lg font-sans font-bold text-text-primary leading-snug mb-3 group-hover:text-accent transition-colors duration-200">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-text-secondary text-sm leading-[1.6] font-sans mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-muted font-sans">
                        {formatDate(post.publishedAt)}
                      </span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-accent font-sans font-semibold text-sm hover:gap-2 transition-all duration-200"
                      >
                        Read
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Read Our Blog */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
          <motion.span
            {...fadeUp}
            className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4"
          >
            Why Read Our Blog
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-12 max-w-2xl"
          >
            Knowledge That <span className="text-accent">Drives Growth</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whyRead.map((item, i) => (
              <motion.div
                key={item.text}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.1 * (i + 1) }}
                className="flex items-center gap-4 bg-off-white border border-border p-5 rounded-[4px]"
              >
                <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-[4px] shrink-0">
                  <item.icon size={18} className="text-accent" />
                </div>
                <p className="text-text-primary font-sans font-medium text-[15px]">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 md:py-28 bg-dark">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20 text-center">
          <motion.span
            {...fadeUp}
            className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4"
          >
            Newsletter
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-white leading-[1.12] tracking-tight mb-6"
          >
            Get Marketing Insights Directly to{" "}
            <span className="text-accent">Your Inbox.</span>
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="text-white/60 max-w-lg mx-auto mb-10 leading-[1.7] font-sans"
          >
            Join our newsletter for the latest tips, strategies, and trends
            delivered straight to you.
          </motion.p>
          <motion.form
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:flex-1 px-5 py-3.5 bg-white/10 text-white text-sm placeholder:text-white/40 outline-none border border-white/10 focus:border-accent/50 rounded-[4px] transition-all font-sans"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-accent text-white font-sans font-medium px-7 py-3.5 rounded-[4px] hover:bg-accent-hover transition-colors duration-300 text-sm whitespace-nowrap"
            >
              Subscribe
            </button>
          </motion.form>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-accent">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20 text-center">
          <motion.h2
            {...fadeUp}
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-white leading-[1.12] tracking-tight mb-6 uppercase"
          >
            Want Experts to Do It for You?
          </motion.h2>
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-accent font-sans font-bold px-8 py-4 rounded-[4px] hover:bg-off-white transition-colors duration-300 text-sm"
            >
              Book Free Consultation
              <ArrowUpRight size={16} />
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-sans font-bold px-8 py-4 rounded-[4px] hover:bg-white/10 transition-colors duration-300 text-sm"
            >
              View Our Services
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
