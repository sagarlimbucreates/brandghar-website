"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Target, Users, Zap, Award } from "lucide-react";
import TopBar from "../../components/TopBar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

const reasons = [
  {
    icon: Target,
    title: "Results-Driven Approach",
    description:
      "We don't just create campaigns — we engineer measurable outcomes. Every strategy is backed by data, analytics, and a relentless focus on ROI that moves your bottom line.",
  },
  {
    icon: Users,
    title: "Dedicated Team",
    description:
      "Your brand gets a committed team of strategists, designers, and marketers who understand your goals intimately. No revolving doors — just consistent, passionate people.",
  },
  {
    icon: Zap,
    title: "Agile & Adaptive",
    description:
      "The digital landscape shifts fast. We stay ahead with agile workflows, rapid iterations, and the flexibility to pivot when the market demands it.",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description:
      "From local startups to established enterprises, we've helped brands across Nepal and beyond scale their digital presence and achieve breakthrough growth.",
  },
];

export default function OurCompanyPage() {
  return (
    <>
      <TopBar />
      <Navbar />

      <main className="bg-white">
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
              <span className="text-text-muted">About Us</span>
              <ChevronRight size={14} className="text-text-muted" />
              <span className="text-text-primary font-medium">Our Company</span>
            </nav>
          </div>
        </div>

        {/* Our Story Section */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
            <motion.span
              {...fadeUp}
              className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4"
            >
              Our Story
            </motion.span>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left — Photo */}
              <motion.div
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.1 }}
              >
                <div className="relative aspect-[4/3] bg-dark rounded-[4px] overflow-hidden">
                  <Image
                    src="/medias/logo.jpeg"
                    alt="The Brandghar team"
                    fill
                    className="object-cover"
                  />
                  {/* Accent corner decoration */}
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-accent/90 flex items-center justify-center">
                    <span className="text-white font-mono text-lg font-medium">
                      Est. 2023
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Right — Story */}
              <motion.div
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.2 }}
              >
                <h1 className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-6">
                  Building Brands That{" "}
                  <span className="text-accent">Stand Out</span>
                </h1>

                <div className="space-y-5 text-text-secondary leading-[1.7] font-sans">
                  <p>
                    Brandghar was born from a simple belief: every brand has a
                    story worth telling, and the digital world is the stage where
                    that story should shine. Founded in Kathmandu in 2023, we
                    started as a small team of passionate marketers and designers
                    who were tired of seeing cookie-cutter campaigns that failed
                    to capture what makes each brand unique.
                  </p>
                  <p>
                    From our early days working out of a cramped co-working
                    space, we set out to bridge the gap between creative
                    storytelling and data-driven strategy. We believed that great
                    marketing shouldn&apos;t be a luxury reserved for big
                    corporations — it should be accessible to every ambitious
                    business ready to grow.
                  </p>
                  <p>
                    Today, Brandghar has grown into a full-service digital
                    marketing agency serving clients across Nepal and beyond. Our
                    team of strategists, designers, developers, and content
                    creators work together to deliver campaigns that don&apos;t
                    just look good — they drive real, measurable results. From
                    Meta Ads and SEO to brand identity and web development,
                    we&apos;ve helped dozens of brands find their voice and scale
                    their presence in the digital landscape.
                  </p>
                  <p>
                    But what hasn&apos;t changed is our core philosophy: we treat
                    every client&apos;s brand as if it were our own. That means
                    no shortcuts, no generic templates, and no vanity metrics.
                    Just honest, hard-working marketing that moves the needle.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Brandghar Section */}
        <section className="py-20 md:py-28 bg-dark">
          <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
            <motion.span
              {...fadeUp}
              className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4"
            >
              Why Choose Us
            </motion.span>
            <motion.h2
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-white leading-[1.12] tracking-tight mb-6 max-w-2xl"
            >
              Why Brands Trust{" "}
              <span className="text-accent">Brandghar</span>
            </motion.h2>
            <motion.p
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.15 }}
              className="text-white/60 max-w-xl mb-16 leading-[1.7] font-sans"
            >
              We combine creative excellence with strategic precision to deliver
              digital marketing that actually works. Here&apos;s what sets us apart.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {reasons.map((reason, i) => (
                <motion.div
                  key={reason.title}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: 0.1 * (i + 1) }}
                  className="group border border-white/10 p-8 rounded-[4px] hover:border-accent/40 transition-colors duration-300"
                >
                  <div className="w-12 h-12 bg-accent/10 flex items-center justify-center rounded-[4px] mb-5 group-hover:bg-accent/20 transition-colors duration-300">
                    <reason.icon size={22} className="text-accent" />
                  </div>
                  <h3 className="text-lg font-sans font-bold text-white mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-white/50 leading-[1.7] font-sans text-[15px]">
                    {reason.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
