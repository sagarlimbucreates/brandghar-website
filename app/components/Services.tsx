"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Megaphone,
  PenTool,
  BarChart3,
  Palette,
  Search,
  Code,
} from "lucide-react";

const services = [
  {
    icon: Megaphone,
    title: "Social Media Management",
    description:
      "Build a strong, engaging presence across platforms that keeps your audience coming back.",
    bullets: [
      "Content Strategy",
      "Community Engagement",
      "Performance Tracking",
    ],
    href: "/services/social-media-mastery",
    image: "/medias/services/social-media.png",
  },
  {
    icon: PenTool,
    title: "Content Creation",
    description:
      "We craft scroll-stopping visuals, videos, and copy that connect and convert.",
    bullets: ["Video Production", "Graphic Design", "Copywriting"],
    href: "/services/influencer-partnerships",
    image: "/medias/services/content-creation.png",
  },
  {
    icon: BarChart3,
    title: "Performance Marketing (Meta & TikTok Ads)",
    description:
      "Data-driven ad campaigns built to generate leads, sales, and real ROI.",
    bullets: [
      "Audience Targeting",
      "Ad Creative & Testing",
      "ROI Optimization",
    ],
    href: "/services/strategic-ad-placements",
    image: "/medias/services/performance.png",
  },
  {
    icon: Palette,
    title: "Brand Identity & Design",
    description:
      "From logos to full brand systems, we create visuals that leave a lasting impression.",
    bullets: ["Logo Design", "Brand Guidelines", "Visual Systems"],
    href: "/services/brand-identity-graphics-design",
    image: "/medias/services/design.png",
  },
  {
    icon: Search,
    title: "Search Engine Optimization (SEO)",
    description:
      "Improve your rankings, attract the right traffic, and grow your business organically.",
    bullets: ["Keyword Research", "On-Page SEO", "Link Building"],
    href: "/services/search-engine-optimization",
    image: "/medias/services/seo.png",
  },
  {
    icon: Code,
    title: "Web Development",
    description:
      "Fast, modern, and conversion-focused websites that look great and perform even better.",
    bullets: ["Custom Websites", "Responsive Design", "Performance Optimized"],
    href: "/services/website-development",
    image: "/medias/services/website.png",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-off-white py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="mb-14 text-center">
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
            className="font-sans font-bold text-3xl md:text-4xl tracking-tight text-black mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Full-Stack Digital
            <br />
            <span className="text-accent">Marketing Solutions</span>
          </motion.h2>
          <motion.div
            className="w-10 h-[3px] bg-accent mb-5 mx-auto"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ transformOrigin: "left" }}
          />
          <motion.p
            className="text-text-secondary max-w-md mx-auto leading-[1.7] font-sans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Strategy, creativity, and performance working together to grow your
            brand.
          </motion.p>
        </div>

        {/* Service Cards — 3 per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="group bg-white rounded-[4px] overflow-hidden border border-border hover:border-accent/20 hover:shadow-[0_8px_30px_rgba(224,32,32,0.08)] transition-all duration-300 flex flex-col"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: (i % 3) * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {/* Top: Content left + Image right */}
              <div className="flex flex-1">
                {/* Content */}
                <div className="flex-1 p-6 flex flex-col">
                  <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-[4px] mb-4">
                    <service.icon size={18} className="text-accent" />
                  </div>
                  <h3 className="font-sans font-bold text-[15px] text-black mb-2 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary text-xs leading-[1.6] font-sans mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-1.5 mb-4">
                    {service.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-center gap-2 text-text-secondary text-xs font-sans"
                      >
                        <span className="w-1 h-1 bg-accent rounded-full shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-1.5 text-accent text-xs font-semibold font-sans group-hover:gap-2.5 transition-all duration-200 mt-auto"
                  >
                    Learn more <ArrowRight size={12} />
                  </Link>
                </div>

                {/* Image */}
                <div className="w-[140px] md:w-[160px] shrink-0 p-3">
                  <div className="relative w-full h-full rounded-[4px] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
