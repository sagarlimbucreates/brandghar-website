"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section id="contact" className="bg-accent py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20 text-center">
        <motion.h2
          className="font-sans font-extrabold text-3xl md:text-5xl tracking-tight text-white mb-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Ready to Grow Your Brand?
        </motion.h2>
        <motion.p
          className="text-white/80 text-lg mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Let&apos;s build something that actually works.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a
            href="#"
            className="group inline-flex items-center gap-2 bg-white text-black font-semibold px-8 py-4 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition-all duration-300"
          >
            Connect with Us
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1.5 transition-transform"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
