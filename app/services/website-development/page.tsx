"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  X,
  Palette,
  Code,
  Zap,
  Link2,
  Settings,
  ShieldCheck,
  Search,
  Brain,
  PenTool,
  Rocket,
  TrendingUp,
  Building2,
  ShoppingCart,
  FileText,
  GraduationCap,
  Briefcase,
  MessageSquare,
  Monitor,
  CheckCircle2,
  ArrowUpRight,
  Smartphone,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

const problems = [
  "Outdated or unattractive website",
  "Slow loading speed",
  "Not mobile-friendly",
  "No conversions or inquiries",
  "Poor user experience (UX)",
];

const coreServices = [
  {
    icon: Palette,
    title: "UI/UX Design",
    items: [
      "Modern, clean interface design",
      "User journey & conversion flow",
      "Wireframes & prototypes",
    ],
  },
  {
    icon: Code,
    title: "Website Development",
    items: [
      "Custom website development",
      "Landing pages & business websites",
      "E-commerce websites",
    ],
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    items: [
      "Fast loading speed",
      "Mobile responsiveness",
      "SEO-friendly structure",
    ],
  },
  {
    icon: Link2,
    title: "Integrations",
    items: [
      "Payment gateways",
      "Forms & CRM integration",
      "Analytics tools",
    ],
  },
  {
    icon: Settings,
    title: "CMS & Management",
    items: [
      "WordPress / custom CMS",
      "Easy content management",
      "Training & support",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Security & Maintenance",
    items: [
      "SSL & security setup",
      "Regular updates",
      "Ongoing support",
    ],
  },
];

const processSteps = [
  { icon: Search, title: "Requirement & Research", step: "01" },
  { icon: Brain, title: "Planning & Wireframing", step: "02" },
  { icon: PenTool, title: "UI/UX Design", step: "03" },
  { icon: Code, title: "Development", step: "04" },
  { icon: Rocket, title: "Testing & Launch", step: "05" },
  { icon: TrendingUp, title: "Optimization & Support", step: "06" },
];

const websiteTypes = [
  { icon: Building2, title: "Business / Corporate Websites" },
  { icon: ShoppingCart, title: "E-commerce Websites" },
  { icon: FileText, title: "Landing Pages" },
  { icon: GraduationCap, title: "Educational Platforms" },
  { icon: Briefcase, title: "Portfolio Websites" },
];

const features = [
  "Mobile responsive design",
  "SEO-ready structure",
  "Fast loading speed",
  "Conversion-focused layout",
  "Easy-to-manage backend",
];

const results = [
  { icon: TrendingUp, text: "More website visitors" },
  { icon: MessageSquare, text: "Increased inquiries & leads" },
  { icon: ShoppingCart, text: "Higher conversion rates" },
  { icon: Zap, text: "Faster & smoother user experience" },
  { icon: Monitor, text: "Strong online presence" },
];

const whyBrandghar = [
  "Design + marketing mindset combined",
  "Focus on conversion, not just design",
  "Clean, premium UI standards",
  "Experience across industries in Nepal",
];

export default function WebsiteDevelopmentPage() {
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
              Website Development
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
            Build a Website That{" "}
            <span className="text-accent">Converts.</span>
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="text-text-secondary max-w-2xl leading-[1.7] font-sans text-base md:text-lg mb-6"
          >
            We design and develop high-performance websites that not only look
            premium — but turn visitors into customers.
          </motion.p>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="text-text-muted max-w-2xl leading-[1.7] font-sans"
          >
            Website Design &amp; Development is the process of creating a fast,
            responsive, and conversion-focused digital platform that represents
            your brand and drives business growth online.
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
              Get Your Website
              <ArrowUpRight size={16} />
            </a>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 border-2 border-text-primary text-text-primary font-sans font-medium px-7 py-3 rounded-[4px] hover:bg-text-primary hover:text-white transition-all duration-300 text-sm"
            >
              Book Free Consultation
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
            We turn your website into a powerful business asset.
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

      {/* Types of Websites */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
          <motion.span
            {...fadeUp}
            className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4"
          >
            What We Build
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-12 max-w-2xl"
          >
            Types of <span className="text-accent">Websites</span> We Build
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {websiteTypes.map((type, i) => (
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

      {/* Features */}
      <section className="py-20 md:py-28 bg-off-white">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
          <motion.span
            {...fadeUp}
            className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4"
          >
            Built-In Features
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-12 max-w-2xl"
          >
            Features Your Website{" "}
            <span className="text-accent">Will Have</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={feature}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.1 * (i + 1) }}
                className="flex items-center gap-4 bg-white border border-border p-5 rounded-[4px]"
              >
                <CheckCircle2 size={20} className="text-accent shrink-0" />
                <p className="text-text-primary font-sans font-medium text-[15px]">
                  {feature}
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
            Ready to Build a Website That Grows Your Business?
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-white/80 max-w-xl mx-auto mb-10 leading-[1.7] font-sans"
          >
            Websites that don&apos;t just look good — they perform.
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
              Get Your Website
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
