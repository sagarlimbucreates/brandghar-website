"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  X,
  ClipboardList,
  Pencil,
  Palette,
  TrendingUp,
  BarChart3,
  LineChart,
  Search,
  Target,
  Clapperboard,
  Send,
  ArrowUpRight,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

const problems = [
  "Posting but getting no engagement",
  "Followers not converting into customers",
  "No clear content strategy",
  "Inconsistent branding",
  "Running ads but no results",
];

const deliverables = [
  {
    icon: ClipboardList,
    title: "Strategy & Planning",
    items: [
      "Social media audit",
      "Competitor analysis",
      "Content strategy & positioning",
      "Monthly content calendar",
    ],
  },
  {
    icon: Pencil,
    title: "Content Creation",
    items: [
      "Reels / TikTok content",
      "Carousel & static posts",
      "Script writing & hooks",
      "Captions + CTA optimization",
    ],
  },
  {
    icon: Palette,
    title: "Branding & Positioning",
    items: [
      "Visual identity consistency",
      "Tone of voice & messaging",
      "Brand storytelling",
    ],
  },
  {
    icon: TrendingUp,
    title: "Growth & Engagement",
    items: [
      "Hashtag strategy",
      "Engagement strategy (DM, comments)",
      "Community building",
    ],
  },
  {
    icon: BarChart3,
    title: "Performance Marketing",
    items: [
      "Meta Ads (Facebook & Instagram)",
      "Funnel setup (Awareness to Conversion)",
      "Retargeting campaigns",
    ],
  },
  {
    icon: LineChart,
    title: "Analytics & Optimization",
    items: [
      "Weekly/monthly reports",
      "Performance tracking",
      "Continuous improvement",
    ],
  },
];

const processSteps = [
  { icon: Search, title: "Audit & Research", step: "01" },
  { icon: Target, title: "Strategy Development", step: "02" },
  { icon: Clapperboard, title: "Content Production", step: "03" },
  { icon: Send, title: "Publishing & Promotion", step: "04" },
  { icon: TrendingUp, title: "Optimization & Scaling", step: "05" },
];

const platforms = [
  "Instagram",
  "Facebook",
  "TikTok",
  "YouTube Shorts",
  "LinkedIn (for B2B clients)",
];

export default function SocialMediaMasteryPage() {
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
              Social Media Mastery
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 md:py-28">
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
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-6 max-w-3xl"
          >
            Social Media{" "}
            <span className="text-accent">Mastery</span>
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="text-text-secondary max-w-2xl mb-0 leading-[1.7] font-sans text-base md:text-lg"
          >
            A complete system designed to grow your brand, engage your audience,
            and convert attention into revenue using strategic content, branding,
            and performance marketing.
          </motion.p>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="py-20 md:py-28 bg-off-white">
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
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-12 max-w-2xl"
          >
            Problems We <span className="text-accent">Solve</span>
          </motion.h2>

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

      {/* What You Get — Core Deliverables */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
          <motion.span
            {...fadeUp}
            className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4"
          >
            What You Get
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-6 max-w-2xl"
          >
            Core <span className="text-accent">Deliverables</span>
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="text-text-secondary max-w-xl mb-16 leading-[1.7] font-sans"
          >
            Everything you need to dominate social media — from strategy and
            content to ads and analytics.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {deliverables.map((item, i) => (
              <motion.div
                key={item.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.1 * (i + 1) }}
                className="group border border-border p-8 rounded-[4px] hover:border-accent/30 transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-accent/10 flex items-center justify-center rounded-[4px] mb-5 group-hover:bg-accent/20 transition-colors duration-300">
                  <item.icon size={22} className="text-accent" />
                </div>
                <h3 className="text-lg font-sans font-bold text-text-primary mb-4">
                  {item.title}
                </h3>
                <ul className="space-y-2.5">
                  {item.items.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-text-secondary text-[15px] leading-[1.6] font-sans"
                    >
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 md:py-28 bg-dark">
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
            Our <span className="text-accent">Process</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.1 * (i + 1) }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-accent/10 flex items-center justify-center rounded-[4px] mx-auto mb-4">
                  <step.icon size={26} className="text-accent" />
                </div>
                <span className="block text-white/30 font-mono text-sm mb-2">
                  {step.step}
                </span>
                <h3 className="text-base font-sans font-bold text-white">
                  {step.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms We Work On */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
          <motion.span
            {...fadeUp}
            className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4"
          >
            Where We Operate
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-12 max-w-2xl"
          >
            Platforms We <span className="text-accent">Work On</span>
          </motion.h2>

          <div className="flex flex-wrap gap-4">
            {platforms.map((platform, i) => (
              <motion.div
                key={platform}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.1 * (i + 1) }}
                className="bg-off-white border border-border px-6 py-4 rounded-[4px] text-text-primary font-sans font-medium text-[15px]"
              >
                {platform}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-accent">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20 text-center">
          <motion.h2
            {...fadeUp}
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-white leading-[1.12] tracking-tight mb-6"
          >
            Ready to Grow Your Brand on Social Media?
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-white/80 max-w-xl mx-auto mb-10 leading-[1.7] font-sans"
          >
            Let&apos;s build a strategy that turns your social media into a
            revenue-generating machine.
          </motion.p>
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
          >
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 bg-white text-accent font-sans font-bold px-8 py-4 rounded-[4px] hover:bg-off-white transition-colors duration-300 text-sm"
            >
              Book Free Strategy Call
              <ArrowUpRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
