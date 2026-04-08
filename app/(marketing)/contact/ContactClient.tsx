"use client";

import { useActionState, useEffect, useRef } from "react";
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
  AlertCircle,
} from "lucide-react";
import { resolveIcon } from "@/app/dashboard/lib/icons";
import { submitLeadAction } from "../leads-actions";

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

export type PublicContactPage = {
  heroEyebrow: string;
  heroHeading: string;
  heroHeadingAccent: string;
  heroSubtitle: string;
  phoneNumber: string;
  phoneHours: string;
  locationLabel: string;
  locationUrl: string;
  emailAddress: string;
  emailReplyNote: string;
  mapEmbedUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  tiktokUrl: string;
  linkedinUrl: string;
  quickHelpHeading: string;
  whatsappUrl: string;
};

export type PublicTrustPoint = {
  id: string;
  text: string;
  icon: string;
};

// Build the tel: link
function telHref(phone: string) {
  return `tel:${phone.replace(/[^+0-9]/g, "")}`;
}

export default function ContactClient({
  page,
  trustPoints,
}: {
  page: PublicContactPage;
  trustPoints: PublicTrustPoint[];
}) {
  const socials: Array<{ label: string; href: string }> = [
    { label: "Instagram", href: page.instagramUrl },
    { label: "Facebook", href: page.facebookUrl },
    { label: "TikTok", href: page.tiktokUrl },
    { label: "LinkedIn", href: page.linkedinUrl },
  ].filter((s) => s.href && s.href.length > 0);

  const [leadState, leadAction, leadPending] = useActionState(
    submitLeadAction,
    {}
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (leadState.success) formRef.current?.reset();
  }, [leadState.success]);

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
            {page.heroEyebrow}
          </motion.span>
          <motion.h1
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-6 max-w-3xl"
          >
            {page.heroHeading}{" "}
            <span className="text-accent">{page.heroHeadingAccent}</span>
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
            className="text-text-secondary max-w-2xl leading-[1.7] font-sans text-base md:text-lg"
          >
            {page.heroSubtitle}
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
                ref={formRef}
                action={leadAction}
                className="flex flex-col gap-5"
              >
                <input type="hidden" name="source" value="contact_page" />

                {leadState.error && (
                  <div className="flex items-start gap-2.5 bg-[#FFF0F0] border border-accent/20 rounded-[4px] p-4">
                    <AlertCircle size={16} className="text-accent shrink-0 mt-0.5" />
                    <p className="text-sm text-[#CC0000] font-sans">
                      {leadState.error}
                    </p>
                  </div>
                )}
                {leadState.success && (
                  <div className="flex items-start gap-2.5 bg-[#F0F9F0] border border-[#0A7A0A]/20 rounded-[4px] p-4">
                    <CheckCircle2 size={16} className="text-[#0A7A0A] shrink-0 mt-0.5" />
                    <p className="text-sm text-[#0A7A0A] font-sans">
                      {leadState.success}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    required
                    disabled={leadPending}
                    className="w-full px-5 py-4 bg-off-white text-text-primary text-sm placeholder:text-text-muted outline-none border border-border focus:border-accent/40 rounded-[4px] transition-all font-sans disabled:opacity-60"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    disabled={leadPending}
                    className="w-full px-5 py-4 bg-off-white text-text-primary text-sm placeholder:text-text-muted outline-none border border-border focus:border-accent/40 rounded-[4px] transition-all font-sans disabled:opacity-60"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    disabled={leadPending}
                    className="w-full px-5 py-4 bg-off-white text-text-primary text-sm placeholder:text-text-muted outline-none border border-border focus:border-accent/40 rounded-[4px] transition-all font-sans disabled:opacity-60"
                  />
                  <div className="relative">
                    <select
                      name="service"
                      required
                      defaultValue=""
                      disabled={leadPending}
                      className="w-full px-5 py-4 bg-off-white text-sm text-text-primary appearance-none outline-none border border-border focus:border-accent/40 rounded-[4px] transition-all font-sans disabled:opacity-60"
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
                  name="message"
                  placeholder="Your Message"
                  rows={6}
                  required
                  disabled={leadPending}
                  className="w-full px-5 py-4 bg-off-white text-text-primary text-sm placeholder:text-text-muted outline-none border border-border focus:border-accent/40 rounded-[4px] transition-all font-sans resize-none disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={leadPending}
                  className="w-full sm:w-auto bg-accent text-white font-sans font-medium px-8 py-4 rounded-[4px] hover:bg-accent-hover transition-colors duration-300 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {leadPending ? "Sending…" : "Send Message"}
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
                        href={telHref(page.phoneNumber)}
                        className="text-white/80 font-sans text-sm hover:text-accent transition-colors"
                      >
                        {page.phoneNumber}
                      </a>
                      {page.phoneHours && (
                        <p className="text-white/40 font-sans text-xs mt-1">
                          {page.phoneHours}
                        </p>
                      )}
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
                      {page.locationUrl ? (
                        <a
                          href={page.locationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/80 font-sans text-sm hover:text-accent transition-colors"
                        >
                          {page.locationLabel}
                        </a>
                      ) : (
                        <p className="text-white/80 font-sans text-sm">
                          {page.locationLabel}
                        </p>
                      )}
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
                        href={`mailto:${page.emailAddress}`}
                        className="text-white/80 font-sans text-sm hover:text-accent transition-colors"
                      >
                        {page.emailAddress}
                      </a>
                      {page.emailReplyNote && (
                        <p className="text-white/40 font-sans text-xs mt-1">
                          {page.emailReplyNote}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                {socials.length > 0 && (
                  <div className="border-t border-white/10 mt-8 pt-8">
                    <p className="text-white/40 text-xs font-sans font-semibold uppercase tracking-[0.1em] mb-4">
                      Follow Us
                    </p>
                    <div className="flex items-center gap-3 flex-wrap">
                      {socials.map((s) => (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-white/5 text-white/60 text-xs font-sans rounded-[4px] hover:bg-accent/20 hover:text-accent transition-all duration-200"
                        >
                          {s.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      {page.mapEmbedUrl && (
        <section className="border-t border-border">
          <iframe
            src={page.mapEmbedUrl}
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
      )}

      {/* Quick CTA */}
      <section className="py-16 md:py-20 bg-dark">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20 text-center">
          <motion.h2
            {...fadeUp}
            className="text-2xl md:text-3xl font-sans font-bold text-white leading-[1.12] tracking-tight mb-8"
          >
            {page.quickHelpHeading.replace("Help?", "")}{" "}
            <span className="text-accent">Help?</span>
          </motion.h2>
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href={telHref(page.phoneNumber)}
              className="inline-flex items-center gap-2 bg-accent text-white font-sans font-medium px-7 py-3 rounded-[4px] hover:bg-accent-hover transition-colors duration-300 text-sm"
            >
              <Phone size={16} />
              Call Now
            </a>
            {page.whatsappUrl && (
              <a
                href={page.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-white text-white font-sans font-medium px-7 py-3 rounded-[4px] hover:bg-white/10 transition-colors duration-300 text-sm"
              >
                WhatsApp Chat
                <ArrowUpRight size={16} />
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Brandghar */}
      {trustPoints.length > 0 && (
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
              {trustPoints.map((tp, i) => {
                const Icon = resolveIcon(tp.icon);
                return (
                  <motion.div
                    key={tp.id}
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: 0.1 * (i + 1) }}
                    className="flex items-center gap-4 bg-off-white border border-border p-5 rounded-[4px]"
                  >
                    <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-[4px] shrink-0">
                      <Icon size={18} className="text-accent" />
                    </div>
                    <p className="text-text-primary font-sans font-medium text-[15px]">
                      {tp.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
