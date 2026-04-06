"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "Understand your business & goals",
  },
  {
    number: "02",
    title: "Strategy",
    description: "Build a custom roadmap for you",
  },
  {
    number: "03",
    title: "Execution",
    description: "Launch, test, and optimize",
  },
  {
    number: "04",
    title: "Growth",
    description: "Scale what works, report everything",
  },
];

export default function Process() {
  return (
    <section className="bg-[#0D0D0D] py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
        <div className="mb-14">
          <motion.p
            className="text-accent text-xs font-sans font-semibold uppercase tracking-[0.12em] mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            How We Work
          </motion.p>
          <motion.h2
            className="font-sans font-bold text-3xl md:text-4xl tracking-tight text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Simple Process. Serious Results.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.12,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {/* Step number + horizontal connector */}
              <div className="relative flex items-center w-full justify-center mb-5">
                {i > 0 && (
                  <div className="hidden lg:block absolute right-1/2 top-1/2 -translate-y-1/2 w-full h-px bg-white/10" />
                )}
                <div className="relative z-10 w-14 h-14 bg-accent text-white flex items-center justify-center shrink-0">
                  <span className="font-mono text-lg font-medium">
                    {step.number}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-y-1/2 w-full h-px bg-white/10" />
                )}
              </div>

              {/* Content */}
              <div className="px-4 pb-8 lg:pb-0">
                <h3 className="font-sans font-semibold text-xl text-white mb-1">
                  {step.title}
                </h3>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
