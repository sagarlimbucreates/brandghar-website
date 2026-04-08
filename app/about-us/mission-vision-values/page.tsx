"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Target,
  Lightbulb,
  Handshake,
  Rocket,
  ShieldCheck,
  Clock,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

const coreValues = [
  {
    icon: Target,
    title: "Results First",
    description:
      "We focus on outcomes that matter—growth, leads, and real business impact, not just vanity metrics.",
  },
  {
    icon: Lightbulb,
    title: "Creativity with Purpose",
    description:
      "Every design, content, and campaign is crafted not just to look good, but to perform and convert.",
  },
  {
    icon: Handshake,
    title: "Client Success is Our Success",
    description:
      "We grow when our clients grow. We build long-term partnerships, not short-term projects.",
  },
  {
    icon: Rocket,
    title: "Innovation & Adaptability",
    description:
      "We stay ahead of trends, platforms, and technologies to keep our clients ahead of competition.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity & Transparency",
    description:
      "We believe in honest communication, clear reporting, and ethical marketing practices.",
  },
  {
    icon: Clock,
    title: "Consistency & Discipline",
    description:
      "Success comes from consistent execution. We deliver quality work on time, every time.",
  },
];

export default function MissionVisionValuesPage() {
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
            <span className="text-text-muted">About Us</span>
            <ChevronRight size={14} className="text-text-muted" />
            <span className="text-text-primary font-medium">
              Mission, Vision &amp; Core Values
            </span>
          </nav>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
          <motion.span
            {...fadeUp}
            className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4"
          >
            What Drives Us
          </motion.span>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Mission */}
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
            >
              <div className="border-l-[3px] border-accent pl-6">
                <h1 className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-6">
                  Our Mission
                </h1>
                <p className="text-text-secondary leading-[1.7] font-sans text-base md:text-lg">
                  To empower businesses in Nepal to grow, compete, and lead in
                  the digital space by delivering result-driven marketing
                  strategies, creative content, and innovative technology
                  solutions that turn audiences into loyal customers.
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.2 }}
            >
              <div className="border-l-[3px] border-accent pl-6">
                <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-6">
                  Our Vision
                </h2>
                <p className="text-text-secondary leading-[1.7] font-sans text-base md:text-lg">
                  To become Nepal&apos;s most trusted and impactful digital
                  growth partner, known for transforming brands into market
                  leaders through creativity, strategy, and measurable results.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 md:py-28 bg-dark">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
          <motion.span
            {...fadeUp}
            className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4"
          >
            Our Principles
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-white leading-[1.12] tracking-tight mb-6 max-w-2xl"
          >
            Core <span className="text-accent">Values</span>
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="text-white/60 max-w-xl mb-16 leading-[1.7] font-sans"
          >
            The principles that guide every strategy we build, every campaign we
            launch, and every relationship we nurture.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {coreValues.map((value, i) => (
              <motion.div
                key={value.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.1 * (i + 1) }}
                className="group border border-white/10 p-8 rounded-[4px] hover:border-accent/40 transition-colors duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-accent/10 flex items-center justify-center rounded-[4px] shrink-0 group-hover:bg-accent/20 transition-colors duration-300">
                    <value.icon size={22} className="text-accent" />
                  </div>
                  <span className="text-white/30 font-mono text-sm">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-sans font-bold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-white/50 leading-[1.7] font-sans text-[15px]">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
