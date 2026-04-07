"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  X,
  Brain,
  Palette,
  BookOpen,
  Smartphone,
  Printer,
  Target,
  Search,
  PenTool,
  RefreshCw,
  FileCheck,
  CheckCircle2,
  Lightbulb,
  Briefcase,
  TrendingUp,
  ArrowUpRight,
  ShoppingBag,
  Sparkles,
  Monitor,
  Building2,
  GraduationCap,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

const problems = [
  "Inconsistent brand visuals",
  "Weak or outdated logo",
  "No clear design direction",
  "Designs that don't convert or stand out",
  "Lack of brand recognition",
];

const coreServices = [
  {
    icon: Brain,
    title: "Brand Strategy & Direction",
    items: [
      "Brand positioning",
      "Visual direction planning",
      "Competitor & market analysis",
    ],
  },
  {
    icon: Palette,
    title: "Logo & Identity Design",
    items: [
      "Logo design (primary + variations)",
      "Color palette & typography",
      "Iconography & visual elements",
    ],
  },
  {
    icon: BookOpen,
    title: "Brand Guidelines",
    items: [
      "Complete brand book",
      "Usage rules (logo, colors, fonts)",
      "Consistency framework",
    ],
  },
  {
    icon: Smartphone,
    title: "Social Media Design",
    items: [
      "Post templates (Reels, carousels, ads)",
      "Campaign creatives",
      "Story & highlight designs",
    ],
  },
  {
    icon: Printer,
    title: "Print & Marketing Materials",
    items: [
      "Brochures, flyers, banners",
      "Business cards & stationery",
      "Outdoor creatives (hoarding, flex)",
    ],
  },
  {
    icon: Target,
    title: "Creative Direction",
    items: [
      "Design concepts for campaigns",
      "Visual storytelling",
      "Ad creative direction",
    ],
  },
];

const processSteps = [
  { icon: Search, title: "Brand Discovery", step: "01" },
  { icon: Brain, title: "Concept Development", step: "02" },
  { icon: PenTool, title: "Design Creation", step: "03" },
  { icon: RefreshCw, title: "Feedback & Refinement", step: "04" },
  { icon: FileCheck, title: "Final Delivery & Guidelines", step: "05" },
];

const deliverables = [
  "Logo files (all formats)",
  "Brand color palette",
  "Typography system",
  "Social media templates",
  "Brand guideline document",
];

const results = [
  { icon: Target, text: "Strong brand recognition" },
  { icon: Briefcase, text: "Professional brand image" },
  { icon: TrendingUp, text: "Better engagement & conversions" },
  { icon: Lightbulb, text: "Memorable visual identity" },
];

const whyBrandghar = [
  "Strategy + design combined",
  "Modern, premium aesthetics",
  "Focus on business impact (not just visuals)",
  "Experience with Nepal market & audience",
];

const industries = [
  { icon: ShoppingBag, title: "E-commerce Brands" },
  { icon: Sparkles, title: "Beauty & Cosmetics" },
  { icon: Monitor, title: "SaaS & Tech Companies" },
  { icon: Building2, title: "Hotels & Hospitality" },
  { icon: GraduationCap, title: "Education & Training" },
];

export default function BrandIdentityGraphicsDesignPage() {
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
              Brand Identity &amp; Graphics Design
            </span>
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
            Our Service
          </motion.span>
          <motion.h1
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-6 max-w-3xl uppercase"
          >
            Design That Defines Your{" "}
            <span className="text-accent">Brand.</span>
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="text-text-secondary max-w-2xl leading-[1.7] font-sans text-base md:text-lg mb-6"
          >
            We create powerful visual identities that make your brand memorable,
            consistent, and impossible to ignore.
          </motion.p>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="text-text-muted max-w-2xl leading-[1.7] font-sans"
          >
            Brand Identity is how your business looks, feels, and communicates
            visually — from logo and colors to typography and design style.
            It&apos;s what makes your brand recognizable and trusted.
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
              Build My Brand Identity
              <ArrowUpRight size={16} />
            </a>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 border-2 border-text-primary text-text-primary font-sans font-medium px-7 py-3 rounded-[4px] hover:bg-text-primary hover:text-white transition-all duration-300 text-sm"
            >
              Talk to Our Designers
            </a>
          </motion.div>
        </div>
      </section>

      {/* Problems */}
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
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-4 max-w-2xl"
          >
            Problems We <span className="text-accent">Solve</span>
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="text-text-secondary max-w-xl mb-12 leading-[1.7] font-sans"
          >
            We transform your brand into a strong visual presence.
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
      <section className="py-20 md:py-28">
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

      {/* Our Design Process */}
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
            Our Design <span className="text-accent">Process</span>
          </motion.h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
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
                <h3 className="text-sm font-sans font-bold text-white">
                  {step.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
          <motion.span
            {...fadeUp}
            className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4"
          >
            Deliverables
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-12 max-w-2xl"
          >
            What You <span className="text-accent">Get</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {deliverables.map((item, i) => (
              <motion.div
                key={item}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.1 * (i + 1) }}
                className="flex items-center gap-4 bg-off-white border border-border p-5 rounded-[4px]"
              >
                <CheckCircle2 size={20} className="text-accent shrink-0" />
                <p className="text-text-primary font-sans font-medium text-[15px]">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Design For */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
          <motion.span
            {...fadeUp}
            className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4"
          >
            Who We Work With
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-12 max-w-2xl"
          >
            Industries We <span className="text-accent">Design For</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {industries.map((industry, i) => (
              <motion.div
                key={industry.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.1 * (i + 1) }}
                className="bg-white border border-border p-6 rounded-[4px] text-center hover:border-accent/30 transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-accent/10 flex items-center justify-center rounded-[4px] mx-auto mb-4">
                  <industry.icon size={22} className="text-accent" />
                </div>
                <p className="text-text-primary font-sans font-medium text-sm">
                  {industry.title}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results & Why Brandghar */}
      <section className="py-20 md:py-28 bg-dark">
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
      <section className="py-20 md:py-28 bg-accent">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20 text-center">
          <motion.h2
            {...fadeUp}
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-white leading-[1.12] tracking-tight mb-6 uppercase"
          >
            Ready to Build a Brand That Stands Out?
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-white/80 max-w-xl mx-auto mb-10 leading-[1.7] font-sans"
          >
            Designs that don&apos;t just look good — they perform.
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
              Start Your Brand Identity
              <ArrowUpRight size={16} />
            </a>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-sans font-bold px-8 py-4 rounded-[4px] hover:bg-white/10 transition-colors duration-300 text-sm"
            >
              Talk to Our Designers
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
