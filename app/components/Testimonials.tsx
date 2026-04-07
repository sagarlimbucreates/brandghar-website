"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Digital visibility was a challenge for us before the team of Anushka and Praswesh stepped in. They crafted a local SEO strategy that put us on the map and built a social media presence that truly reflects our school's values. We've seen a 3x increase in admission inquiries since the campaign launched.",
    name: "Naresh Prasad Shrestha",
    role: "Principal",
    company: "Aarambha School",
    image: "/medias/testimonials/naresh-sir.webp",
    rating: 5,
  },
  {
    quote:
      "Our online courses weren't getting the traction we hoped for—until The Brand Ghar stepped in. They built a full-funnel email marketing system that nurtured leads and doubled our course enrollments. Their understanding of user behavior and conversion strategy is truly impressive.",
    name: "Manisha Pradhan",
    role: "Direction & Principal Registered Migration",
    company: "IKON",
    image: "/medias/testimonials/manisha.webp",
    rating: 5,
  },
  {
    quote:
      "Working with The Brand Ghar transformed our digital presence. Their Digital Marketing strategy helped us reach Nepali communities abroad, and their targeted campaigns boosted our platform. They understand the nuances of fintech marketing and deliver with precision.",
    name: "Avinash Karn",
    role: "Product & Business Strategist",
    company: "Neo Money Transfer",
    image: "/medias/testimonials/avinash.webp",
    rating: 5,
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
          <motion.p
            className="text-text-secondary max-w-xl mx-auto mt-4 leading-[1.7] font-sans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Hear from the brands and leaders who trust Brandghar to drive their
            digital growth.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="bg-off-white border border-border p-8 rounded-[4px] flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {/* Quote icon + rating */}
              <div className="flex items-center justify-between mb-5">
                <Quote size={28} className="text-accent/30" />
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      className="text-accent fill-accent"
                    />
                  ))}
                </div>
              </div>

              {/* Quote text */}
              <p className="text-text-secondary text-sm leading-[1.7] mb-8 flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Client info */}
              <div className="border-t border-border pt-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-accent/20">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-black text-sm font-sans">
                    {t.name}
                  </p>
                  <p className="text-text-muted text-xs font-sans mt-0.5">
                    {t.role}, {t.company}
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
