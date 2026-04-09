"use client";

import { useActionState, useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, CheckCircle2, AlertCircle } from "lucide-react";
import { submitLeadAction } from "../(marketing)/leads-actions";

const services = [
  "Social Media Mastery",
  "Influencer Partnerships",
  "Strategic Ad Placements",
  "Search Engine Optimization",
  "Brand Identity & Graphics Design",
  "Website Development",
];

const typingPhrases = [
  "Don't just reach people. Convert them.",
  "Attention is easy. Conversion is strategy.",
  "Visibility without sales is a waste.",
  "You're getting views. Where are the sales?",
];

function useTypingEffect(phrases: string[], typingSpeed = 50, deletingSpeed = 30, pauseTime = 2000) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const current = phrases[phraseIndex];

    if (!isDeleting) {
      setText(current.slice(0, text.length + 1));
      if (text.length + 1 === current.length) {
        setTimeout(() => setIsDeleting(true), pauseTime);
        return;
      }
    } else {
      setText(current.slice(0, text.length - 1));
      if (text.length - 1 === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        return;
      }
    }
  }, [text, phraseIndex, isDeleting, phrases, pauseTime]);

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, typingSpeed, deletingSpeed]);

  return text;
}

export default function Hero() {
  const typedText = useTypingEffect(typingPhrases);
  const [leadState, leadAction, leadPending] = useActionState(submitLeadAction, {});
  const formRef = useRef<HTMLFormElement>(null);

  // Clear form after successful submission
  useEffect(() => {
    if (leadState.success) {
      formRef.current?.reset();
    }
  }, [leadState.success]);

  return (
    <section id="home" className="bg-white">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20 py-16 md:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left column */}
          <div className="flex flex-col justify-center">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <span className="inline-block border-l-[3px] border-accent pl-4 py-1 text-[12px] font-semibold tracking-[0.14em] uppercase text-accent font-sans">
                Strategy &nbsp;&bull;&nbsp; Creative &nbsp;&bull;&nbsp; Performance
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-sans font-bold text-[2rem] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3rem] leading-[1.12] tracking-tight text-black mb-4 uppercase"
            >
              STOP LOSING YOUR CUSTOMERS
            </motion.h1>

            {/* Typing animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8 h-8 md:h-10"
            >
              <span className="text-accent text-base md:text-lg font-medium font-sans">
                {typedText}
              </span>
              <span className="inline-block w-[2px] h-5 bg-accent ml-0.5 animate-pulse align-middle" />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-text-secondary text-base md:text-lg leading-relaxed max-w-[520px] mb-8"
            >
              We help ambitious businesses build a premium digital presence through
              strategic content, performance marketing, and design systems that feel
              modern and actually drive results.
            </motion.p>

          </div>

          {/* Right column — contact form card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-[4px] shadow-[0_4px_40px_rgba(0,0,0,0.08)] p-8 md:p-10"
          >
            {/* Card header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-1 min-w-0">
                <span className="block text-[11px] font-semibold tracking-[0.14em] uppercase text-accent mb-2 font-sans">
                  Free Discovery Call
                </span>
                <h2 className="font-sans font-bold text-lg md:text-xl text-black leading-snug">
                  Let&rsquo;s build your next growth move.
                </h2>
              </div>
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center shrink-0">
                <ArrowUpRight size={18} className="text-white" />
              </div>
            </div>

            {/* Form */}
            <form ref={formRef} action={leadAction} className="flex flex-col gap-4">
              <input type="hidden" name="source" value="hero_landing" />

              {leadState.error && (
                <div className="flex items-start gap-2.5 bg-[#FFF0F0] border border-accent/20 rounded-[4px] p-3">
                  <AlertCircle size={14} className="text-accent shrink-0 mt-0.5" />
                  <p className="text-xs text-[#CC0000] font-sans">{leadState.error}</p>
                </div>
              )}
              {leadState.success && (
                <div className="flex items-start gap-2.5 bg-[#F0F9F0] border border-[#0A7A0A]/20 rounded-[4px] p-3">
                  <CheckCircle2 size={14} className="text-[#0A7A0A] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#0A7A0A] font-sans">{leadState.success}</p>
                </div>
              )}

              <input
                type="text"
                name="fullName"
                placeholder="Full name"
                required
                disabled={leadPending}
                className="w-full px-5 py-3.5 bg-off-white text-black text-sm placeholder:text-text-muted outline-none border border-transparent focus:border-accent/30 rounded-[4px] transition-all disabled:opacity-60"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                required
                disabled={leadPending}
                className="w-full px-5 py-3.5 bg-off-white text-black text-sm placeholder:text-text-muted outline-none border border-transparent focus:border-accent/30 rounded-[4px] transition-all disabled:opacity-60"
              />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                disabled={leadPending}
                className="w-full px-5 py-3.5 bg-off-white text-black text-sm placeholder:text-text-muted outline-none border border-transparent focus:border-accent/30 rounded-[4px] transition-all disabled:opacity-60"
              />
              <div className="relative">
                <select
                  name="service"
                  required
                  defaultValue=""
                  disabled={leadPending}
                  className="w-full px-5 py-3.5 bg-off-white text-sm text-black appearance-none outline-none border border-transparent focus:border-accent/30 rounded-[4px] transition-all disabled:opacity-60"
                >
                  <option value="" disabled className="text-text-muted">
                    Select a service
                  </option>
                  {services.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                />
              </div>
              <button
                type="submit"
                disabled={leadPending}
                className="w-full bg-accent text-white font-medium py-3.5 mt-1 rounded-[4px] hover:bg-accent-hover transition-colors duration-300 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {leadPending ? "Sending…" : "Get Consultation"}
              </button>
            </form>

            <p className="text-text-muted text-xs mt-4">
              Quick response. Clear strategy. No pressure.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
