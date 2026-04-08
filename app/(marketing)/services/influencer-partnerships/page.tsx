"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  X,
  Target,
  Handshake,
  Clapperboard,
  BarChart3,
  TrendingUp,
  Search,
  Brain,
  Rocket,
  Eye,
  MessageSquare,
  ShoppingCart,
  Users,
  ArrowUpRight,
  CheckCircle2,
  Megaphone,
  Gift,
  CalendarCheck,
  Camera,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

const problems = [
  "Collaborating with wrong influencers",
  "No clear ROI from influencer campaigns",
  "Fake followers & low engagement",
  "Poor content quality",
  "No structured campaign strategy",
  "Inconsistent brand messaging across creators",
];

const coreServices = [
  {
    icon: Target,
    title: "Influencer Discovery & Matching",
    items: [
      "Niche-based influencer selection",
      "Audience analysis (real vs fake)",
      "Micro & macro influencer sourcing",
    ],
  },
  {
    icon: Handshake,
    title: "Campaign Strategy",
    items: [
      "Campaign goal setting (awareness, sales)",
      "Content themes & messaging",
      "Platform-specific strategy",
    ],
  },
  {
    icon: Clapperboard,
    title: "Content Collaboration",
    items: [
      "Script & concept support",
      "Content direction (Reels, TikTok, Shorts)",
      "Brand alignment & storytelling",
    ],
  },
  {
    icon: BarChart3,
    title: "Campaign Execution & Management",
    items: [
      "Influencer coordination",
      "Timeline & deliverable tracking",
      "Communication handling",
    ],
  },
  {
    icon: TrendingUp,
    title: "Performance Tracking",
    items: [
      "Reach, engagement & conversion tracking",
      "ROI analysis",
      "Campaign reporting",
    ],
  },
  {
    icon: Users,
    title: "Creator Network Management",
    items: [
      "Vetted creator database",
      "Relationship management",
      "Long-term partnership building",
    ],
  },
];

const processSteps = [
  { icon: Search, title: "Identify Goals", step: "01" },
  { icon: Target, title: "Select Influencers", step: "02" },
  { icon: Brain, title: "Plan Campaign", step: "03" },
  { icon: Clapperboard, title: "Create Content", step: "04" },
  { icon: Rocket, title: "Launch Campaign", step: "05" },
  { icon: BarChart3, title: "Analyze & Optimize", step: "06" },
];

const brandBenefits = [
  { icon: Eye, text: "Reach your ideal audience" },
  { icon: Users, text: "Build trust through real creators" },
  { icon: ShoppingCart, text: "Increase conversions & sales" },
  { icon: Clapperboard, text: "High-quality, relatable content" },
];

const creatorBenefits = [
  "Paid collaborations & brand deals",
  "Creative direction & content support",
  "Work with premium brands",
  "Long-term partnerships",
];

const campaignTypes = [
  { icon: Megaphone, title: "Product Promotions" },
  { icon: Eye, title: "Brand Awareness Campaigns" },
  { icon: Rocket, title: "Launch Campaigns" },
  { icon: CalendarCheck, title: "Event Promotions" },
  { icon: Camera, title: "User-Generated Content (UGC)" },
];

const results = [
  { icon: TrendingUp, text: "Increased brand visibility" },
  { icon: MessageSquare, text: "Higher engagement" },
  { icon: ShoppingCart, text: "Direct sales impact" },
  { icon: Handshake, text: "Strong brand trust" },
];

const whyBrandghar = [
  "Data-driven influencer selection",
  "Focus on ROI, not just reach",
  "Strong creator network in Nepal",
  "End-to-end campaign execution",
];

export default function InfluencerPartnershipsPage() {
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
              Influencer Partnerships
            </span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — Content */}
            <div>
              <motion.span
                {...fadeUp}
                className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4"
              >
                Our Service
              </motion.span>
              <motion.h1
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-6"
              >
                Turn Influence into{" "}
                <span className="text-accent">Impact</span>
              </motion.h1>
              <motion.p
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.15 }}
                className="text-text-secondary leading-[1.7] font-sans text-base md:text-lg mb-6"
              >
                We connect brands with the right creators to deliver authentic
                content that drives engagement, trust, and sales.
              </motion.p>
              <motion.p
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.2 }}
                className="text-text-muted leading-[1.7] font-sans"
              >
                Influencer Partnership is a strategic collaboration between
                brands and content creators to promote products through
                authentic storytelling, helping brands reach targeted audiences
                with trust and credibility.
              </motion.p>
            </div>

            {/* Right — Image */}
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.2 }}
            >
              <div className="relative aspect-[4/3] rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-border">
                <Image
                  src="/medias/illustrations/influencers.webp"
                  alt="Influencer Partnerships"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
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
            We remove guesswork and deliver performance-driven collaborations.
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
                  <div className="hidden lg:block w-full h-[2px] bg-white/10 flex-1 mx-2">
                    <div className="h-full bg-accent/30 w-full" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Brands & For Influencers */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* For Brands */}
            <motion.div {...fadeUp}>
              <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4">
                For Brands
              </span>
              <h2 className="text-2xl md:text-3xl font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-8">
                Why Partner with <span className="text-accent">Creators</span>
              </h2>
              <div className="space-y-5">
                {brandBenefits.map((benefit) => (
                  <div key={benefit.text} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-[4px] shrink-0">
                      <benefit.icon size={18} className="text-accent" />
                    </div>
                    <p className="text-text-secondary font-sans text-[15px]">
                      {benefit.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* For Influencers */}
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.15 }}
            >
              <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4">
                For Creators
              </span>
              <h2 className="text-2xl md:text-3xl font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-8">
                Why Partner with{" "}
                <span className="text-accent">Brandghar</span>
              </h2>
              <div className="space-y-5">
                {creatorBenefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-[4px] shrink-0">
                      <CheckCircle2 size={18} className="text-accent" />
                    </div>
                    <p className="text-text-secondary font-sans text-[15px]">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 bg-accent text-white font-sans font-medium px-7 py-3 rounded-[4px] hover:bg-accent-hover transition-colors duration-300 text-sm mt-8"
              >
                Join Our Creator Network
                <ArrowUpRight size={16} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Campaign Types */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
          <motion.span
            {...fadeUp}
            className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4"
          >
            What We Run
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-12 max-w-2xl"
          >
            Types of <span className="text-accent">Campaigns</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {campaignTypes.map((campaign, i) => (
              <motion.div
                key={campaign.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.1 * (i + 1) }}
                className="bg-white border border-border p-6 rounded-[4px] text-center hover:border-accent/30 transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-accent/10 flex items-center justify-center rounded-[4px] mx-auto mb-4">
                  <campaign.icon size={22} className="text-accent" />
                </div>
                <p className="text-text-primary font-sans font-medium text-sm">
                  {campaign.title}
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

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-accent">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20 text-center">
          <motion.h2
            {...fadeUp}
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-white leading-[1.12] tracking-tight mb-6"
          >
            Ready to Launch Your Influencer Campaign?
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-white/80 max-w-xl mx-auto mb-10 leading-[1.7] font-sans"
          >
            Let&apos;s connect you with the right creators and build campaigns
            that deliver real results.
          </motion.p>
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
          >
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-accent font-sans font-bold px-8 py-4 rounded-[4px] hover:bg-off-white transition-colors duration-300 text-sm"
            >
              Connect with Us
              <ArrowUpRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
