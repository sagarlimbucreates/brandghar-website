"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Brandhgar tripled our ad returns in two months. They actually understand what works in Nepal's market.",
    name: "Anisha Shrestha",
    company: "Jo Beauty Nepal",
    result: "3x ROAS",
  },
  {
    quote:
      "Finally, an agency that doesn't hide behind jargon. Clear reports, real results, direct communication.",
    name: "Rajesh Maharjan",
    company: "Himalayan Eats",
    result: "200% Growth",
  },
  {
    quote:
      "Our social presence went from invisible to a community of 10K engaged followers. The strategy was spot-on.",
    name: "Priya Tamang",
    company: "Koshi Crafts",
    result: "10K Followers",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
        <div className="text-center mb-14">
          <motion.p
            className="text-accent text-xs font-sans font-semibold uppercase tracking-[0.12em] mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            Client Love
          </motion.p>
          <motion.h2
            className="font-sans font-bold text-3xl md:text-4xl tracking-tight text-black"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Don&apos;t Take Our Word For It
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="bg-off-white border border-border p-8 rounded-[4px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <Quote size={28} className="text-accent/30 mb-4" />
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="border-t border-border pt-5">
                <p className="font-semibold text-black text-sm">{t.name}</p>
                <p className="text-text-muted text-xs mt-0.5">{t.company}</p>
                <p className="font-mono text-accent text-xs mt-2">
                  {t.result}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
