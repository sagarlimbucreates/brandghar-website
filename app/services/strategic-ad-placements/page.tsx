"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  X,
  MapPin,
  Brain,
  Building2,
  Printer,
  BarChart3,
  Search,
  Target,
  Palette,
  Hammer,
  TrendingUp,
  Eye,
  Lightbulb,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

const problems = [
  "Ads placed in low-visibility areas",
  "Wasted budget on poor locations",
  "No targeting in offline marketing",
  "Designs that don't stand out in public spaces",
];

const coreServices = [
  {
    icon: MapPin,
    title: "Location Strategy",
    items: [
      "High-traffic area identification",
      "Audience movement analysis",
      "Prime placement selection",
    ],
  },
  {
    icon: Brain,
    title: "Creative Design",
    items: [
      "Billboard & hoarding design",
      "Flex banners & print ads",
      "Large-format visual optimization",
    ],
  },
  {
    icon: Building2,
    title: "Ad Placement Execution",
    items: [
      "Hoarding board placements",
      "Street pole banners",
      "Mall & commercial space branding",
    ],
  },
  {
    icon: Printer,
    title: "Print & Production",
    items: [
      "High-quality print materials",
      "Durable outdoor media",
      "End-to-end production handling",
    ],
  },
  {
    icon: BarChart3,
    title: "Impact Tracking",
    items: [
      "Visibility estimation",
      "Area-based reach analysis",
      "Campaign reporting",
    ],
  },
  {
    icon: Target,
    title: "Campaign Consultation",
    items: [
      "Budget planning & allocation",
      "Location-based ROI forecasting",
      "Multi-channel placement strategy",
    ],
  },
];

const processSteps = [
  { icon: Search, title: "Location Research", step: "01" },
  { icon: Target, title: "Audience Mapping", step: "02" },
  { icon: Palette, title: "Creative Design", step: "03" },
  { icon: Hammer, title: "Production & Printing", step: "04" },
  { icon: MapPin, title: "Strategic Placement", step: "05" },
  { icon: BarChart3, title: "Visibility & Optimization", step: "06" },
];

const placementTypes = [
  { icon: Building2, title: "Billboard / Hoarding Boards" },
  { icon: MapPin, title: "Street Pole Banners" },
  { icon: Building2, title: "Mall Branding" },
  { icon: TrendingUp, title: "Transit Advertising" },
  { icon: Building2, title: "Skyline / Premium Locations" },
];

const results = [
  { icon: Eye, text: "Massive brand visibility" },
  { icon: Lightbulb, text: "Strong recall — people remember you" },
  { icon: TrendingUp, text: "Increased inquiries & footfall" },
  { icon: Building2, text: "Premium brand positioning" },
];

const whyBrandghar = [
  "Strategic placement, not random booking",
  "Strong creative that stands out in real-world clutter",
  "Local market expertise (Nepal traffic zones, hotspots)",
  "End-to-end execution (idea to placement)",
];

export default function StrategicAdPlacementsPage() {
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
              Strategic Ad Placements
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
                className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-6 uppercase"
              >
                Be Seen Where It{" "}
                <span className="text-accent">Matters</span>
              </motion.h1>
              <motion.p
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.15 }}
                className="text-text-secondary leading-[1.7] font-sans text-base md:text-lg mb-6"
              >
                From streets to skylines — we strategically place your brand
                where attention is guaranteed.
              </motion.p>
              <motion.p
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.2 }}
                className="text-text-muted leading-[1.7] font-sans"
              >
                Strategic Ad Placement is about positioning your brand in
                high-visibility, high-impact locations — ensuring maximum
                exposure, recall, and real-world presence.
              </motion.p>
              <motion.div
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.25 }}
                className="mt-10"
              >
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-accent text-white font-sans font-medium px-7 py-3 rounded-[4px] hover:bg-accent-hover transition-colors duration-300 text-sm"
                >
                  Plan Your Ad Placement
                  <ArrowUpRight size={16} />
                </a>
              </motion.div>
            </div>

            {/* Right — Image */}
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.2 }}
            >
              <div className="relative aspect-[4/3] rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-border">
                <Image
                  src="/medias/illustrations/ad-placement.png"
                  alt="Strategic Ad Placements"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
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
            The <span className="text-accent">Problem</span>
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="text-text-secondary max-w-xl mb-12 leading-[1.7] font-sans"
          >
            We fix this with data + design + placement strategy.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

      {/* Our Approach */}
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
            Our <span className="text-accent">Approach</span>
          </motion.h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
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
                <span className="block text-white font-mono text-sm mb-2">
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

      {/* Types of Ad Placements */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
          <motion.span
            {...fadeUp}
            className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4"
          >
            Placement Options
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-12 max-w-2xl"
          >
            Types of Ad <span className="text-accent">Placements</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {placementTypes.map((type, i) => (
              <motion.div
                key={type.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.1 * (i + 1) }}
                className="bg-off-white border border-border p-6 rounded-[4px] text-center hover:border-accent/30 transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-accent/10 flex items-center justify-center rounded-[4px] mx-auto mb-4">
                  <type.icon size={22} className="text-accent" />
                </div>
                <p className="text-text-primary font-sans font-medium text-sm">
                  {type.title}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results & Why Brandghar */}
      <section className="py-10 md:py-14 bg-off-white">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Results */}
            <motion.div {...fadeUp}>
              <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4">
                What To Expect
              </span>
              <h2 className="text-2xl md:text-3xl font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-8">
                Results You Can <span className="text-accent">Expect</span>
              </h2>
              <div className="space-y-5">
                {results.map((result) => (
                  <div key={result.text} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-[4px] shrink-0">
                      <result.icon size={18} className="text-accent" />
                    </div>
                    <p className="text-text-secondary font-sans text-[15px]">
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
              <h2 className="text-2xl md:text-3xl font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-8">
                Why <span className="text-accent">Brandghar</span>
              </h2>
              <div className="space-y-5">
                {whyBrandghar.map((point) => (
                  <div key={point} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-[4px] shrink-0">
                      <CheckCircle2 size={18} className="text-accent" />
                    </div>
                    <p className="text-text-secondary font-sans text-[15px]">
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
            Ready to Put Your Brand in the Spotlight?
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-white/80 max-w-xl mx-auto mb-10 leading-[1.7] font-sans"
          >
            Let&apos;s position your brand where it gets maximum visibility and
            real-world impact.
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
              Plan Your Campaign
              <ArrowUpRight size={16} />
            </a>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-sans font-bold px-8 py-4 rounded-[4px] hover:bg-white/10 transition-colors duration-300 text-sm"
            >
              Talk to Our Team
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
