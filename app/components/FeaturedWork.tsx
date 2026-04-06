"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Jo Beauty Nepal",
    type: "Meta Ads Campaign",
    result: "3x ROAS in 60 days",
  },
  {
    title: "Himalayan Eats",
    type: "SEO Campaign",
    result: "200% organic traffic growth",
  },
  {
    title: "Koshi Crafts",
    type: "Social Media",
    result: "10K followers in 90 days",
  },
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
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className="group border border-border rounded-[4px] overflow-hidden hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {/* Image area */}
              <div className="aspect-[4/3] bg-off-white relative flex items-center justify-center">
                <span className="font-sans font-bold text-5xl text-border">
                  {project.title.charAt(0)}
                </span>
              </div>

              <div className="p-6 bg-white">
                <p className="text-accent text-xs uppercase tracking-[0.12em] font-semibold mb-2">
                  {project.type}
                </p>
                <h3 className="font-sans font-semibold text-lg text-black mb-2">
                  {project.title}
                </h3>
                <p className="font-mono text-sm text-text-secondary">
                  {project.result}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
