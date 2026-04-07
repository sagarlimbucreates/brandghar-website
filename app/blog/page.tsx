"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  TrendingUp,
  Palette,
  Search,
  Smartphone,
  Rocket,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Lightbulb,
  BarChart3,
  Briefcase,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

const categories = [
  { label: "All", icon: null },
  { label: "Digital Marketing", icon: TrendingUp },
  { label: "Branding & Design", icon: Palette },
  { label: "SEO", icon: Search },
  { label: "Social Media", icon: Smartphone },
  { label: "Business Growth", icon: Rocket },
];

const featuredPost = {
  title: "How to Turn Social Media into a Sales Machine",
  excerpt:
    "Discover the exact strategies top brands use to convert followers into paying customers. From content funnels to retargeting — a complete breakdown.",
  category: "Digital Marketing",
  date: "April 5, 2026",
  readTime: "8 min read",
};

const blogPosts = [
  {
    title: "5 SEO Mistakes That Are Killing Your Rankings",
    excerpt:
      "Avoid these common SEO pitfalls that prevent your website from showing up on Google's first page.",
    category: "SEO",
    date: "April 2, 2026",
    readTime: "6 min read",
  },
  {
    title: "Why Your Brand Needs a Visual Identity System",
    excerpt:
      "A logo alone isn't enough. Learn why a complete visual identity system is essential for brand recognition.",
    category: "Branding & Design",
    date: "March 28, 2026",
    readTime: "5 min read",
  },
  {
    title: "Meta Ads vs Google Ads: Which One is Right for You?",
    excerpt:
      "A detailed comparison to help you decide where to invest your ad budget for maximum ROI.",
    category: "Digital Marketing",
    date: "March 22, 2026",
    readTime: "7 min read",
  },
  {
    title: "Content Calendar: How to Plan 30 Days in 2 Hours",
    excerpt:
      "Our step-by-step framework for building a month's worth of social media content efficiently.",
    category: "Social Media",
    date: "March 15, 2026",
    readTime: "5 min read",
  },
  {
    title: "How Small Businesses in Nepal Can Scale with Digital Marketing",
    excerpt:
      "Practical strategies tailored for Nepali businesses looking to grow their online presence and sales.",
    category: "Business Growth",
    date: "March 10, 2026",
    readTime: "6 min read",
  },
  {
    title: "The Psychology Behind High-Converting Landing Pages",
    excerpt:
      "Learn the design and copy principles that make visitors take action on your landing pages.",
    category: "Digital Marketing",
    date: "March 5, 2026",
    readTime: "7 min read",
  },
];

const whyRead = [
  { icon: BookOpen, text: "Learn actionable strategies" },
  { icon: TrendingUp, text: "Stay updated with trends" },
  { icon: BarChart3, text: "Improve your marketing performance" },
  { icon: Briefcase, text: "Get real-world business insights" },
];

export default function BlogPage() {
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
            {categories.map((cat, i) => (
              <button
                key={cat.label}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-[4px] text-sm font-sans font-medium whitespace-nowrap transition-colors duration-200 ${
                  i === 0
                    ? "bg-accent text-white"
                    : "bg-off-white text-text-secondary hover:text-accent hover:bg-accent/5 border border-border"
                }`}
              >
                {cat.icon && <cat.icon size={14} />}
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
          <motion.div
            {...fadeUp}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          >
            {/* Image placeholder */}
            <div className="aspect-[16/10] bg-off-white border border-border rounded-[4px] flex items-center justify-center">
              <span className="text-text-muted/30 font-sans text-sm">
                Featured Image
              </span>
            </div>

            {/* Content */}
            <div>
              <span className="inline-block bg-accent/10 text-accent text-xs font-sans font-semibold px-3 py-1 rounded-[4px] mb-4">
                {featuredPost.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-sans font-bold text-text-primary leading-[1.15] tracking-tight mb-4">
                {featuredPost.title}
              </h2>
              <p className="text-text-secondary leading-[1.7] font-sans mb-6">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-4 text-text-muted text-sm font-sans mb-6">
                <span>{featuredPost.date}</span>
                <span className="w-1 h-1 bg-text-muted rounded-full" />
                <span>{featuredPost.readTime}</span>
              </div>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-accent font-sans font-semibold text-sm hover:gap-3 transition-all duration-200"
              >
                Read Full Article
                <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

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
            All <span className="text-accent">Posts</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.1 * (i + 1) }}
                className="group bg-white border border-border rounded-[4px] overflow-hidden hover:border-accent/30 transition-colors duration-300"
              >
                {/* Thumbnail placeholder */}
                <div className="aspect-[16/10] bg-off-white flex items-center justify-center border-b border-border">
                  <span className="text-text-muted/30 font-sans text-xs">
                    Thumbnail
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-sans font-semibold text-accent">
                      {post.category}
                    </span>
                    <span className="w-1 h-1 bg-text-muted rounded-full" />
                    <span className="text-xs text-text-muted font-sans">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-sans font-bold text-text-primary leading-snug mb-3 group-hover:text-accent transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-[1.6] font-sans mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-muted font-sans">
                      {post.date}
                    </span>
                    <a
                      href="#"
                      className="inline-flex items-center gap-1 text-accent font-sans font-semibold text-sm hover:gap-2 transition-all duration-200"
                    >
                      Read
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
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
              href="/#contact"
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
