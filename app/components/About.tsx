"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const points = [
  "Deep expertise in Nepal's digital landscape",
  "Meta Ads certified, SEO-driven approach",
  "Direct communication, no account manager maze",
  "Transparent reporting every step",
];

const stats = [
  { value: "150+", label: "Campaigns" },
  { value: "40+", label: "Brands Grown" },
  { value: "3+", label: "Years" },
];

export default function About() {
  return (
    <section id="about" className="bg-[#0D0D0D] pt-12 md:pt-16 pb-20 md:pb-28">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
        {/* Why Brandghar heading — full width centered */}
        <motion.p
          className="text-accent text-xl md:text-2xl font-sans font-bold uppercase tracking-[0.12em] mb-5 text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          Why Brandghar?
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — stats block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="bg-black pb-8 md:pb-10 pr-8 md:pr-10 pl-6 md:pl-12 lg:pl-20 rounded-[4px] -ml-6 md:-ml-12 lg:-ml-20">
              <p className="font-sans font-bold text-3xl md:text-[2.5rem] leading-[1.1] tracking-tight text-white mb-3 uppercase">
                Strategy First.
              </p>
              <p className="font-sans font-bold text-3xl md:text-[2.5rem] leading-[1.1] tracking-tight text-accent mb-8 uppercase">
                Results Always.
              </p>
              <div className="flex gap-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-mono text-2xl md:text-3xl font-medium text-white">
                      {stat.value}
                    </p>
                    <p className="text-white/60 text-sm mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="font-sans font-bold text-3xl md:text-[2.5rem] tracking-tight text-accent mb-5 uppercase">
              We&apos;re not a template agency.
            </h2>
            <p className="text-white/80 text-base leading-relaxed mb-8">
              Every campaign we build starts with understanding your business,
              your audience, and what actually moves the needle — not vanity
              metrics.
            </p>

            <div className="space-y-3 mb-8">
              {points.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                  <p className="text-white/70 text-sm">{point}</p>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="group inline-flex items-center gap-2 bg-accent text-white font-semibold px-7 py-3 hover:bg-accent-hover transition-all duration-200"
            >
              Work With Us
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
