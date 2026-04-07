"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const portfolioImages = [
  { src: "/medias/portfolios/Grow with Lungta.jpg", alt: "Grow with Lungta" },
  { src: "/medias/portfolios/arambha.png", alt: "Arambha" },
  { src: "/medias/portfolios/ANT - SM Templete copy.jpg", alt: "ANT Social Media Template" },
  { src: "/medias/portfolios/heritage hour copy.jpg", alt: "Heritage Hour" },
  { src: "/medias/portfolios/professional smm copy.jpg", alt: "Professional SMM" },
  { src: "/medias/portfolios/cr copy.jpg", alt: "CR Creative" },
  { src: "/medias/portfolios/insta size grand opening copy.jpg", alt: "Grand Opening" },
  { src: "/medias/portfolios/sahakari copy.jpg", alt: "Sahakari" },
  { src: "/medias/portfolios/social media copy.jpg", alt: "Social Media" },
  { src: "/medias/portfolios/the perfect venue copy.jpg", alt: "The Perfect Venue" },
  { src: "/medias/portfolios/20 years copy.jpg", alt: "20 Years" },
  { src: "/medias/portfolios/last day to participate copy.jpg", alt: "Last Day to Participate" },
];

export default function FeaturedWork() {
  return (
    <section id="work" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
        <div className="text-center mb-14">
          <motion.p
            className="text-accent text-xs font-sans font-semibold uppercase tracking-[0.12em] mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            Our Work
          </motion.p>
          <motion.h2
            className="font-sans font-bold text-3xl md:text-4xl tracking-tight text-black"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Results We&apos;re Proud Of
          </motion.h2>
          <motion.p
            className="text-text-secondary max-w-xl mx-auto mt-4 leading-[1.7] font-sans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            A glimpse into the campaigns, creatives, and brands we&apos;ve
            helped grow.
          </motion.p>
        </div>

        {/* Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {portfolioImages.map((image, i) => (
            <motion.div
              key={image.src}
              className="break-inside-avoid group relative overflow-hidden rounded-[4px] border border-border"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: (i % 3) * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={600}
                height={600}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end">
                <div className="p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white font-sans font-bold text-sm">
                    {image.alt}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
