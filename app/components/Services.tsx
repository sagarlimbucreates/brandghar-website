"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const services = [
  {
    emoji: "📱",
    title: "Social Media Management",
    description: "Build your brand presence with consistent, engaging social media strategies.",
  },
  {
    emoji: "🎬",
    title: "Content Creation",
    description: "Scroll-stopping visuals and copy that connect with your audience.",
  },
  {
    emoji: "📣",
    title: "Social Media Ads (Meta / TikTok)",
    description: "Targeted ad campaigns that convert attention into revenue.",
  },
  {
    emoji: "🎨",
    title: "Brand Identity & Graphics Design",
    description: "Visual systems that make your brand unforgettable.",
  },
  {
    emoji: "🔍",
    title: "Search Engine Optimization (SEO)",
    description: "Rank higher. Get found. Stay there.",
  },
  {
    emoji: "💻",
    title: "Web Development",
    description: "Fast, modern websites that look great and drive results.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
        <motion.p
          className="text-accent text-xs font-sans font-semibold uppercase tracking-[0.12em] mb-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          What We Do
        </motion.p>
        <motion.h2
          className="font-sans font-bold text-3xl md:text-4xl tracking-tight text-black mb-14 uppercase"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Full-Stack Digital Marketing
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="group bg-white p-8 rounded-[4px] shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(224,32,32,0.12)] hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <div className="text-4xl mb-5">{service.emoji}</div>
              <h3 className="font-sans font-semibold text-lg text-black mb-2">
                {service.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-5">
                {service.description}
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-accent text-sm font-medium group-hover:gap-2.5 transition-all duration-200"
              >
                Learn more <ArrowRight size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
