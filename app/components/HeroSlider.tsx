"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const slides = [
  {
    bg: "bg-[#FEF0F0]",
    headline: "STOP LOSING YOUR CUSTOMERS",
    description:
      "Brandhgar will support your business to reach your potential customers through strategic digital marketing.",
  },
  {
    bg: "bg-[#FEF0F0]",
    headline: "GROW YOUR BRAND ONLINE",
    description:
      "We help businesses build a strong digital presence with data-driven strategies that actually convert.",
  },
  {
    bg: "bg-[#FEF0F0]",
    headline: "DOMINATE YOUR MARKET",
    description:
      "From SEO to social media, we craft campaigns that put your brand ahead of the competition.",
  },
  {
    bg: "bg-[#FEF0F0]",
    headline: "RESULTS THAT SPEAK",
    description:
      "150+ campaigns, 40+ brands grown — let the numbers do the talking. Your success is our strategy.",
  },
];

const services = [
  "Social Media Mastery",
  "Influencer Partnerships",
  "Strategic Ad Placements",
  "Search Engine Optimization",
  "Brand Identity & Graphics Design",
  "Website Development",
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full h-[calc(75vh-60px)] md:h-[calc(85vh-60px)] overflow-hidden">
      {/* Slide backgrounds */}
      <AnimatePresence>
        <motion.div
          key={current}
          className={`absolute inset-0 ${slides[current].bg}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Content — two columns */}
      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto max-w-[1280px] w-full px-6 md:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left — headline + description */}
            <div className="p-[30px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <h1 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl leading-[1.1] tracking-tight text-black mb-5 break-words">
                    {slides[current].headline}
                  </h1>
                  <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                    {slides[current].description}
                  </p>

                  {/* Dots */}
                  <div className="flex gap-3 mt-8">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          i === current
                            ? "bg-accent scale-110"
                            : "bg-black/20 hover:bg-black/40"
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right — consultation form */}
            <div className="bg-white shadow-[0_4px_30px_rgba(0,0,0,0.08)] p-8 md:p-10">
              <h2 className="font-sans font-bold text-xl md:text-2xl text-black mb-6">
                Get Our Instant Consultation
              </h2>

              <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="w-full px-4 py-3 bg-[#FEF0F0] text-black text-sm placeholder:text-black/40 outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  className="w-full px-4 py-3 bg-[#FEF0F0] text-black text-sm placeholder:text-black/40 outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                />
                <input
                  type="email"
                  placeholder="Email (Optional)"
                  className="w-full px-4 py-3 bg-[#FEF0F0] text-black text-sm placeholder:text-black/40 outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                />
                <div className="relative">
                  <select
                    required
                    defaultValue=""
                    className="w-full px-4 py-3 bg-[#FEF0F0] text-sm text-black appearance-none outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                  >
                    <option value="" disabled className="text-black/40">
                      Select a Service
                    </option>
                    {services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 pointer-events-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-accent text-white font-medium py-3.5 mt-2 hover:bg-accent-hover transition-colors duration-300"
                >
                  Get Consultation
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
