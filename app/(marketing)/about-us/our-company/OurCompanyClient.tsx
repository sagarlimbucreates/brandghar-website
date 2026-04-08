"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Target, Users, Zap, Award } from "lucide-react";

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

export type PublicClient = {
  id: string;
  name: string;
  logoUrl: string | null;
  websiteUrl: string | null;
};

export default function OurCompanyClient({
  story,
  clients,
}: {
  story: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    body: string;
    estYear: string;
    imageUrl: string;
  };
  clients: PublicClient[];
}) {
  const paragraphs = story.body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

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
            <span className="text-text-primary font-medium">Our Company</span>
          </nav>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="pt-10 md:pt-14 pb-10 md:pb-14">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
          <motion.span
            {...fadeUp}
            className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4"
          >
            {story.eyebrow}
          </motion.span>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left — Photo */}
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
            >
              <div className="relative aspect-[4/3] bg-dark rounded-[4px] overflow-hidden">
                <Image
                  src={story.imageUrl}
                  alt="The Brandghar team"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-accent/90 flex items-center justify-center">
                  <span className="text-white font-mono text-lg font-medium">
                    Est. {story.estYear}
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
                {story.heading}{" "}
                <span className="text-accent">{story.headingAccent}</span>
              </h1>

              <div className="space-y-5 text-text-secondary leading-[1.7] font-sans">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Clients Section */}
      {clients.length > 0 && (
        <section className="py-12 md:py-16 bg-off-white">
          <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
            <motion.span
              {...fadeUp}
              className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4 text-center"
            >
              Our Clients
            </motion.span>
            <motion.h2
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-6 text-center"
            >
              Brands That Trust{" "}
              <span className="text-accent">Brandghar</span>
            </motion.h2>
            <motion.p
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.15 }}
              className="text-text-secondary max-w-xl mx-auto mb-16 leading-[1.7] font-sans text-center"
            >
              We&apos;re proud to work with amazing brands across diverse
              industries.
            </motion.p>

            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4">
              {clients.map((client, i) => {
                const LogoEl = client.logoUrl ? (
                  <Image
                    src={client.logoUrl}
                    alt={client.name}
                    width={120}
                    height={120}
                    className="w-full h-full object-contain"
                    unoptimized
                  />
                ) : (
                  <span className="text-xs text-text-muted font-sans text-center px-2">
                    {client.name}
                  </span>
                );

                return (
                  <motion.div
                    key={client.id}
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: 0.08 * (i + 1) }}
                    className="bg-white border border-border rounded-[4px] p-4 flex items-center justify-center aspect-square hover:border-accent/20 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300"
                  >
                    {client.websiteUrl ? (
                      <a
                        href={client.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full h-full flex items-center justify-center"
                      >
                        {LogoEl}
                      </a>
                    ) : (
                      LogoEl
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

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
            Why Brands Trust <span className="text-accent">Brandghar</span>
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="text-white/60 max-w-xl mb-16 leading-[1.7] font-sans"
          >
            We combine creative excellence with strategic precision to deliver
            digital marketing that actually works. Here&apos;s what sets us
            apart.
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
    </>
  );
}
