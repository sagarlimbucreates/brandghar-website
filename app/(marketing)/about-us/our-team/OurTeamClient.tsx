"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  User,
  Link2,
  Brain,
  UsersRound,
  Flame,
  GraduationCap,
  Puzzle,
  HeartHandshake,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

const strengths = [
  {
    icon: Brain,
    title: "Strategic Thinkers",
    description:
      "Every team member brings sharp analytical skills and a strategic mindset to deliver campaigns that hit the mark.",
  },
  {
    icon: UsersRound,
    title: "Cross-Functional Expertise",
    description:
      "From design and development to marketing and analytics — our team covers every discipline under one roof.",
  },
  {
    icon: Flame,
    title: "Passion-Driven",
    description:
      "We genuinely love what we do. That passion translates into work that goes above and beyond expectations.",
  },
  {
    icon: GraduationCap,
    title: "Continuous Learners",
    description:
      "Digital evolves fast. Our team stays ahead through constant upskilling, certifications, and experimentation.",
  },
  {
    icon: Puzzle,
    title: "Collaborative by Nature",
    description:
      "We work as one unit — sharing ideas, challenging assumptions, and building on each other's strengths.",
  },
  {
    icon: HeartHandshake,
    title: "Client-Centric Approach",
    description:
      "We listen first, strategize second. Every decision is anchored in understanding our client's unique needs.",
  },
];

export type PublicTeamMember = {
  id: string;
  fullName: string;
  role: string;
  photoUrl: string | null;
  linkedinUrl: string | null;
};

export default function OurTeamClient({
  members,
}: {
  members: PublicTeamMember[];
}) {
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
            <span className="text-text-primary font-medium">Our Team</span>
          </nav>
        </div>
      </div>

      {/* Team Section */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
          <motion.span
            {...fadeUp}
            className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4"
          >
            Meet The Team
          </motion.span>
          <motion.h1
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-6 max-w-2xl"
          >
            The People Behind{" "}
            <span className="text-accent">Brandghar</span>
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="text-text-secondary max-w-xl mb-16 leading-[1.7] font-sans"
          >
            A tight-knit team of strategists, creatives, and marketers united by
            one goal — helping your brand win in the digital space.
          </motion.p>

          {members.length === 0 ? (
            <p className="text-text-secondary font-sans italic">
              Team profiles coming soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {members.map((member, i) => (
                <motion.div
                  key={member.id}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: 0.1 * (i + 1) }}
                  className="group"
                >
                  {/* Photo */}
                  <div className="relative aspect-square bg-off-white border border-border rounded-[4px] overflow-hidden mb-5 flex items-center justify-center group-hover:border-accent/30 transition-colors duration-300">
                    {member.photoUrl ? (
                      <Image
                        src={member.photoUrl}
                        alt={member.fullName}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <User
                        size={56}
                        className="text-text-muted/30 group-hover:text-accent/30 transition-colors duration-300"
                      />
                    )}
                    {/* Hover overlay with social link */}
                    {member.linkedinUrl && (
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-end justify-center pb-5 opacity-0 group-hover:opacity-100">
                        <div className="flex items-center gap-4">
                          <a
                            href={member.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 bg-white/10 rounded-[4px] flex items-center justify-center text-white hover:bg-accent transition-colors duration-200"
                          >
                            <Link2 size={15} />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <h3 className="text-lg font-sans font-bold text-text-primary mb-1">
                    {member.fullName}
                  </h3>
                  <p className="text-sm text-accent font-sans font-medium">
                    {member.role}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Team Strengths Section */}
      <section className="py-20 md:py-28 bg-dark">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
          <motion.span
            {...fadeUp}
            className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4"
          >
            Our Strength
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-white leading-[1.12] tracking-tight mb-6 max-w-2xl"
          >
            What Makes Our Team{" "}
            <span className="text-accent">Different</span>
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="text-white/60 max-w-xl mb-16 leading-[1.7] font-sans"
          >
            It&apos;s not just what we do — it&apos;s how we do it. Here&apos;s
            what sets our team apart.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {strengths.map((strength, i) => (
              <motion.div
                key={strength.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.1 * (i + 1) }}
                className="group flex gap-5"
              >
                <div className="w-12 h-12 bg-accent/10 flex items-center justify-center rounded-[4px] shrink-0 group-hover:bg-accent/20 transition-colors duration-300">
                  <strength.icon size={22} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-sans font-bold text-white mb-2">
                    {strength.title}
                  </h3>
                  <p className="text-white/50 leading-[1.7] font-sans text-[15px]">
                    {strength.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
