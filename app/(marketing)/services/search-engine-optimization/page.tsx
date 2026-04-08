"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  X,
  Search,
  Blocks,
  Settings,
  PenTool,
  Link2,
  BarChart3,
  Target,
  TrendingUp,
  Globe,
  MessageSquare,
  ShoppingCart,
  DollarSign,
  ArrowUpRight,
  CheckCircle2,
  MapPin,
  MonitorPlay,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

const problems = [
  "Your website doesn't appear on Google",
  "Low traffic despite having a website",
  "Competitors ranking above you",
  "No leads from organic search",
  "Poor website structure & SEO setup",
  "Losing visibility to competitors on Google",
];

const coreServices = [
  {
    icon: Search,
    title: "SEO Audit & Strategy",
    items: [
      "Website audit (technical + content)",
      "Competitor analysis",
      "Keyword research (high-intent keywords)",
      "SEO roadmap & planning",
    ],
  },
  {
    icon: Blocks,
    title: "On-Page SEO",
    items: [
      "Meta titles & descriptions optimization",
      "Content optimization (keywords + structure)",
      "Image SEO (alt text, compression)",
      "Internal linking strategy",
    ],
  },
  {
    icon: Settings,
    title: "Technical SEO",
    items: [
      "Website speed optimization",
      "Mobile optimization",
      "Fix crawl & indexing issues",
      "XML sitemap & robots.txt setup",
    ],
  },
  {
    icon: PenTool,
    title: "Content Marketing",
    items: [
      "SEO blogs & articles",
      "Keyword-driven content strategy",
      "Topic clusters & authority building",
    ],
  },
  {
    icon: Link2,
    title: "Off-Page SEO",
    items: [
      "High-quality backlinks",
      "Directory listings",
      "Brand mentions",
    ],
  },
  {
    icon: BarChart3,
    title: "Tracking & Optimization",
    items: [
      "Google Analytics & Search Console setup",
      "Ranking tracking",
      "Monthly reports & improvements",
    ],
  },
];

const processSteps = [
  { icon: Search, title: "Audit & Analysis", step: "01" },
  { icon: Target, title: "Keyword Research", step: "02" },
  { icon: Blocks, title: "On-Page Optimization", step: "03" },
  { icon: Settings, title: "Technical Fixes", step: "04" },
  { icon: Link2, title: "Authority Building", step: "05" },
  { icon: TrendingUp, title: "Tracking & Scaling", step: "06" },
];

const platforms = [
  { icon: Search, title: "Google Search" },
  { icon: MapPin, title: "Google Maps (Local SEO)" },
  { icon: MonitorPlay, title: "YouTube SEO" },
  { icon: ShoppingCart, title: "E-commerce SEO" },
];

const results = [
  { icon: TrendingUp, text: "Higher Google rankings" },
  { icon: Globe, text: "Increased website traffic" },
  { icon: MessageSquare, text: "More inquiries & leads" },
  { icon: ShoppingCart, text: "Better conversion rates" },
  { icon: DollarSign, text: "Long-term organic growth" },
];

const whyBrandghar = [
  "Strategy-first SEO (not random keywords)",
  "Focus on business results, not just traffic",
  "Deep understanding of Nepal market search behavior",
  "Complete execution (technical + content + authority)",
];

const keywordExamples = [
  '"Best digital marketing agency in Nepal"',
  '"SEO services near me"',
  '"Top branding company in Kathmandu"',
  '"Affordable web development Nepal"',
  '"Social media agency Kathmandu"',
  '"Google ads expert Nepal"',
  '"Content marketing services Nepal"',
  '"Lead generation agency Lalitpur"',
  '"Best school in Kathmandu"',
  '"Top restaurant near me"',
  '"Migration consultancy Nepal"',
  '"Money transfer to Nepal"',
];

export default function SearchEngineOptimizationPage() {
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
            <span className="text-text-muted">Services</span>
            <ChevronRight size={14} className="text-text-muted" />
            <span className="text-text-primary font-medium">
              Search Engine Optimization
            </span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
          <motion.span
            {...fadeUp}
            className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4"
          >
            Our Service
          </motion.span>
          <motion.h1
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-6 uppercase whitespace-nowrap"
          >
            Rank Higher. Get Found.{" "}
            <span className="text-accent">Grow Faster.</span>
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="text-text-secondary max-w-2xl leading-[1.7] font-sans text-base md:text-lg mb-6"
          >
            We position your business at the top of search results — bringing
            you high-intent traffic that converts into customers.
          </motion.p>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="text-text-muted max-w-2xl leading-[1.7] font-sans"
          >
            Search Engine Optimization (SEO) is the process of improving your
            website&apos;s visibility on search engines like Google — helping
            your business attract organic traffic, generate leads, and increase
            sales without paid ads.
          </motion.p>
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.25 }}
            className="flex flex-col sm:flex-row gap-4 mt-10"
          >
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 bg-accent text-white font-sans font-medium px-7 py-3 rounded-[4px] hover:bg-accent-hover transition-colors duration-300 text-sm"
            >
              Get Free SEO Audit
              <ArrowUpRight size={16} />
            </a>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 border-2 border-text-primary text-text-primary font-sans font-medium px-7 py-3 rounded-[4px] hover:bg-text-primary hover:text-white transition-all duration-300 text-sm"
            >
              Grow My Website
            </a>
          </motion.div>
        </div>
      </section>

      {/* Problems */}
      <section className="py-10 md:py-14 bg-off-white">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
          <motion.span
            {...fadeUp}
            className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4"
          >
            Sound Familiar?
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-4 max-w-2xl"
          >
            Problems We <span className="text-accent">Solve</span>
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="text-text-secondary max-w-xl mb-12 leading-[1.7] font-sans"
          >
            We turn your website into a lead-generating machine.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {problems.map((problem, i) => (
              <motion.div
                key={problem}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.1 * (i + 1) }}
                className="flex items-center gap-4 bg-white border border-border p-5 rounded-[4px]"
              >
                <div className="w-9 h-9 bg-accent/10 flex items-center justify-center rounded-[4px] shrink-0">
                  <X size={16} className="text-accent" />
                </div>
                <p className="text-text-primary font-sans font-medium text-[15px]">
                  {problem}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
          <motion.span
            {...fadeUp}
            className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4"
          >
            What We Offer
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-16 max-w-2xl"
          >
            Core <span className="text-accent">Services</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {coreServices.map((service, i) => (
              <motion.div
                key={service.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.1 * (i + 1) }}
                className="group border border-border p-8 rounded-[4px] hover:border-accent/30 transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-accent/10 flex items-center justify-center rounded-[4px] mb-5 group-hover:bg-accent/20 transition-colors duration-300">
                  <service.icon size={22} className="text-accent" />
                </div>
                <h3 className="text-lg font-sans font-bold text-text-primary mb-4">
                  {service.title}
                </h3>
                <ul className="space-y-2.5">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-text-secondary text-[15px] leading-[1.6] font-sans"
                    >
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our SEO Process */}
      <section className="py-10 md:py-14 bg-dark">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
          <motion.span
            {...fadeUp}
            className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4"
          >
            How We Work
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-white leading-[1.12] tracking-tight mb-16 max-w-2xl"
          >
            Our SEO <span className="text-accent">Process</span>
          </motion.h2>

          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-0">
            {processSteps.map((step, i) => (
              <div key={step.title} className="flex items-center gap-0 flex-1 w-full lg:w-auto">
                <motion.div
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: 0.1 * (i + 1) }}
                  className="flex items-center gap-4 lg:flex-col lg:text-center lg:gap-3 flex-1"
                >
                  <div className="w-14 h-14 bg-accent/10 flex items-center justify-center rounded-full shrink-0">
                    <span className="text-white font-mono font-bold text-lg">
                      {step.step}
                    </span>
                  </div>
                  <div>
                    <step.icon size={18} className="text-accent mb-1 lg:mx-auto" />
                    <h3 className="text-sm font-sans font-bold text-white">
                      {step.title}
                    </h3>
                  </div>
                </motion.div>
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block w-full h-[2px] bg-accent/30 flex-1 mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms We Optimize For */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
          <motion.span
            {...fadeUp}
            className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4"
          >
            Where We Optimize
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-12 max-w-2xl"
          >
            Platforms We <span className="text-accent">Optimize For</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.map((platform, i) => (
              <motion.div
                key={platform.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.1 * (i + 1) }}
                className="bg-off-white border border-border p-6 rounded-[4px] text-center hover:border-accent/30 transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-accent/10 flex items-center justify-center rounded-[4px] mx-auto mb-4">
                  <platform.icon size={22} className="text-accent" />
                </div>
                <p className="text-text-primary font-sans font-medium text-sm">
                  {platform.title}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Keywords We Can Rank You For */}
      <section className="py-10 md:py-14 bg-off-white">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
          <motion.span
            {...fadeUp}
            className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4"
          >
            High Conversion
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-12 max-w-2xl"
          >
            Keywords We Can <span className="text-accent">Rank You For</span>
          </motion.h2>

          <div className="flex flex-wrap gap-3">
            {keywordExamples.map((keyword, i) => (
              <motion.div
                key={keyword}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.04 * (i + 1) }}
                className="bg-white border border-border px-5 py-3 rounded-[4px] font-mono text-sm text-text-primary hover:border-accent/30 transition-colors duration-300"
              >
                {keyword}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results & Why Brandghar */}
      <section className="py-10 md:py-14 bg-dark">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Results */}
            <motion.div {...fadeUp}>
              <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4">
                What To Expect
              </span>
              <h2 className="text-2xl md:text-3xl font-sans font-bold text-white leading-[1.12] tracking-tight mb-8">
                Results You Can <span className="text-accent">Expect</span>
              </h2>
              <div className="space-y-5">
                {results.map((result) => (
                  <div key={result.text} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-[4px] shrink-0">
                      <result.icon size={18} className="text-accent" />
                    </div>
                    <p className="text-white/70 font-sans text-[15px]">
                      {result.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Why Brandghar */}
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.15 }}
            >
              <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4">
                Why Us
              </span>
              <h2 className="text-2xl md:text-3xl font-sans font-bold text-white leading-[1.12] tracking-tight mb-8">
                Why <span className="text-accent">Brandghar</span>
              </h2>
              <div className="space-y-5">
                {whyBrandghar.map((point) => (
                  <div key={point} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-[4px] shrink-0">
                      <CheckCircle2 size={18} className="text-accent" />
                    </div>
                    <p className="text-white/70 font-sans text-[15px]">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 md:py-14 bg-accent">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20 text-center">
          <motion.h2
            {...fadeUp}
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-white leading-[1.12] tracking-tight mb-6 uppercase"
          >
            Want Your Customers to Find You First?
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-white/80 max-w-xl mx-auto mb-10 leading-[1.7] font-sans"
          >
            Let&apos;s get your website ranking at the top and driving real
            business results.
          </motion.p>
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 bg-white text-accent font-sans font-bold px-8 py-4 rounded-[4px] hover:bg-off-white transition-colors duration-300 text-sm"
            >
              Get Free SEO Audit
              <ArrowUpRight size={16} />
            </a>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-sans font-bold px-8 py-4 rounded-[4px] hover:bg-white/10 transition-colors duration-300 text-sm"
            >
              Talk to Our Experts
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
