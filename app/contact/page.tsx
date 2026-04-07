"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ChevronDown,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  CheckCircle2,
  Users,
  Target,
  Layers,
  ShieldCheck,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

const services = [
  "Social Media Mastery",
  "Influencer Partnerships",
  "Strategic Ad Placements",
  "Search Engine Optimization",
  "Brand Identity & Graphics Design",
  "Website Development",
];

const trustPoints = [
  { icon: Users, text: "Experienced team" },
  { icon: Target, text: "Result-driven approach" },
  { icon: Layers, text: "End-to-end services" },
  { icon: ShieldCheck, text: "Trusted by growing brands" },
];

export default function ContactPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-off-white border-b border-border">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20 py-4">
          <nav className="flex items-center gap-2 text-sm font-sans">
            <Link
              href="/"
              className="text-text-muted hover:text-accent transition-colors duration-200"
            >
              Home
            </Link>
            <ChevronRight size={14} className="text-text-muted" />
            <span className="text-text-primary font-medium">Contact</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
          <motion.span
            {...fadeUp}
            className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4"
          >
            Get In Touch
          </motion.span>
          <motion.h1
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-6 max-w-3xl"
          >
            Let&apos;s Build Something{" "}
            <span className="text-accent">Great Together.</span>
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="text-text-secondary max-w-2xl leading-[1.7] font-sans text-base md:text-lg"
          >
            Whether you&apos;re ready to launch a campaign, need a digital
            strategy, or just want to explore how we can help your brand grow
            — we&apos;re here for you. Reach out to us through any of the
            channels below, and let&apos;s start the conversation.
          </motion.p>
        </div>
      </section>

      {/* Form + Contact Info */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <motion.div {...fadeUp} className="lg:col-span-3">
              <form
                className="flex flex-col gap-5"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    className="w-full px-5 py-4 bg-off-white text-text-primary text-sm placeholder:text-text-muted outline-none border border-border focus:border-accent/40 rounded-[4px] transition-all font-sans"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    className="w-full px-5 py-4 bg-off-white text-text-primary text-sm placeholder:text-text-muted outline-none border border-border focus:border-accent/40 rounded-[4px] transition-all font-sans"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    className="w-full px-5 py-4 bg-off-white text-text-primary text-sm placeholder:text-text-muted outline-none border border-border focus:border-accent/40 rounded-[4px] transition-all font-sans"
                  />
                  <div className="relative">
                    <select
                      required
                      defaultValue=""
                      className="w-full px-5 py-4 bg-off-white text-sm text-text-primary appearance-none outline-none border border-border focus:border-accent/40 rounded-[4px] transition-all font-sans"
                    >
                      <option value="" disabled className="text-text-muted">
                        Service Interested In
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
                </div>
                <textarea
                  placeholder="Your Message"
                  rows={6}
                  required
                  className="w-full px-5 py-4 bg-off-white text-text-primary text-sm placeholder:text-text-muted outline-none border border-border focus:border-accent/40 rounded-[4px] transition-all font-sans resize-none"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-accent text-white font-sans font-medium px-8 py-4 rounded-[4px] hover:bg-accent-hover transition-colors duration-300 text-sm"
                >
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.15 }}
              className="lg:col-span-2"
            >
              <div className="bg-dark rounded-[4px] p-8 md:p-10">
                <h3 className="text-lg font-sans font-bold text-white mb-8">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-[4px] shrink-0">
                      <Phone size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs font-sans font-semibold uppercase tracking-[0.1em] mb-1">
                        Call Us
                      </p>
                      <a
                        href="tel:+9779847653969"
                        className="text-white/80 font-sans text-sm hover:text-accent transition-colors"
                      >
                        +977 984 765 3969
                      </a>
                      <p className="text-white/40 font-sans text-xs mt-1">
                        Sun – Fri 9:00 – 19:00
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-[4px] shrink-0">
                      <MapPin size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs font-sans font-semibold uppercase tracking-[0.1em] mb-1">
                        Office Location
                      </p>
                      <a
                        href="https://maps.app.goo.gl/7ciR46P3kDiREmq39"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/80 font-sans text-sm hover:text-accent transition-colors"
                      >
                        Kupondole, Lalitpur
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-[4px] shrink-0">
                      <Mail size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs font-sans font-semibold uppercase tracking-[0.1em] mb-1">
                        Email Us
                      </p>
                      <a
                        href="mailto:hello@thebrandghar.com"
                        className="text-white/80 font-sans text-sm hover:text-accent transition-colors"
                      >
                        hello@thebrandghar.com
                      </a>
                      <p className="text-white/40 font-sans text-xs mt-1">
                        We typically respond within 24 hours.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="border-t border-white/10 mt-8 pt-8">
                  <p className="text-white/40 text-xs font-sans font-semibold uppercase tracking-[0.1em] mb-4">
                    Follow Us
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://www.instagram.com/thebrandghar?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white/5 text-white/60 text-xs font-sans rounded-[4px] hover:bg-accent/20 hover:text-accent transition-all duration-200"
                    >
                      Instagram
                    </a>
                    <a
                      href="https://www.facebook.com/thebrandghar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white/5 text-white/60 text-xs font-sans rounded-[4px] hover:bg-accent/20 hover:text-accent transition-all duration-200"
                    >
                      Facebook
                    </a>
                    <a
                      href="https://www.tiktok.com/@the.brand.ghar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white/5 text-white/60 text-xs font-sans rounded-[4px] hover:bg-accent/20 hover:text-accent transition-all duration-200"
                    >
                      TikTok
                    </a>
                    <a
                      href="https://www.linkedin.com/company/brandghar/?viewAsMember=true"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white/5 text-white/60 text-xs font-sans rounded-[4px] hover:bg-accent/20 hover:text-accent transition-all duration-200"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="border-t border-border">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3533.2477379991824!2d85.317387!3d27.678737!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190070d90675%3A0xadc7b3ded91c119c!2sThe%20Brand%20Ghar!5e0!3m2!1sen!2snl!4v1775562345567!5m2!1sen!2snl"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Brandghar Office Location"
          className="w-full"
        />
      </section>

      {/* Quick CTA */}
      <section className="py-16 md:py-20 bg-dark">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20 text-center">
          <motion.h2
            {...fadeUp}
            className="text-2xl md:text-3xl font-sans font-bold text-white leading-[1.12] tracking-tight mb-8"
          >
            Need Immediate <span className="text-accent">Help?</span>
          </motion.h2>
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="tel:+9779847653969"
              className="inline-flex items-center gap-2 bg-accent text-white font-sans font-medium px-7 py-3 rounded-[4px] hover:bg-accent-hover transition-colors duration-300 text-sm"
            >
              <Phone size={16} />
              Call Now
            </a>
            <a
              href="https://wa.me/9779851323800"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-sans font-medium px-7 py-3 rounded-[4px] hover:bg-white/10 transition-colors duration-300 text-sm"
            >
              WhatsApp Chat
              <ArrowUpRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Brandghar */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
          <motion.span
            {...fadeUp}
            className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4"
          >
            Why Choose Us
          </motion.span>
          <motion.h2
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-12 max-w-2xl"
          >
            Why <span className="text-accent">Brandghar</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {trustPoints.map((point, i) => (
              <motion.div
                key={point.text}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.1 * (i + 1) }}
                className="flex items-center gap-4 bg-off-white border border-border p-5 rounded-[4px]"
              >
                <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-[4px] shrink-0">
                  <point.icon size={18} className="text-accent" />
                </div>
                <p className="text-text-primary font-sans font-medium text-[15px]">
                  {point.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
