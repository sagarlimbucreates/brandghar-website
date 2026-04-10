"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, X, ArrowUpRight } from "lucide-react";
import { resolveIcon } from "@/app/dashboard/lib/icons";
import type { Service } from "@/db/schema";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
};

export default function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then(({ slug }) =>
      fetch(`/api/services/${slug}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => { setService(d); setLoading(false); })
        .catch(() => setLoading(false))
    );
  }, [params]);

  if (loading) return <div className="min-h-screen" />;
  if (!service) return <div className="min-h-screen flex items-center justify-center"><p className="text-text-muted">Service not found.</p></div>;

  const deliverables = (service.deliverables ?? []) as { icon: string; title: string; items: string[] }[];
  const processSteps = (service.processSteps ?? []) as { icon: string; title: string; step: string }[];
  const problems = (service.problems ?? []) as string[];
  const extraSections = (service.extraSections ?? []) as Record<string, unknown>[];

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-off-white border-b border-border">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20 py-4">
          <nav className="flex items-center gap-2 text-sm font-sans">
            <Link href="/" className="text-text-muted hover:text-accent transition-colors duration-200">Home</Link>
            <ChevronRight size={14} className="text-text-muted" />
            <span className="text-text-muted">Services</span>
            <ChevronRight size={14} className="text-text-muted" />
            <span className="text-text-primary font-medium">{service.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
          <div className={`grid grid-cols-1 ${service.heroImageUrl ? "lg:grid-cols-2 gap-12 lg:gap-20 items-center" : ""}`}>
            <div>
              <motion.span {...fadeUp} className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4">
                {service.eyebrow}
              </motion.span>
              <motion.h1 {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-6">
                {service.heading}{" "}<span className="text-accent">{service.headingAccent}</span>
              </motion.h1>
              <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }} className="text-text-secondary leading-[1.7] font-sans text-base md:text-lg">
                {service.description}
              </motion.p>
              {service.secondaryDescription && (
                <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }} className="text-text-secondary leading-[1.7] font-sans text-base mt-4">
                  {service.secondaryDescription}
                </motion.p>
              )}
            </div>
            {service.heroImageUrl && (
              <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}>
                <div className="relative aspect-[4/3] rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-border">
                  <Image src={service.heroImageUrl} alt={service.title} fill className="object-cover" />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Problems */}
      {problems.length > 0 && (
        <section className="py-10 md:py-14 bg-off-white">
          <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
            <motion.span {...fadeUp} className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4">Sound Familiar?</motion.span>
            <motion.h2 {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-12 max-w-2xl">
              Problems We <span className="text-accent">Solve</span>
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {problems.map((p, i) => (
                <motion.div key={p} initial={{ opacity: 0, y: 30, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5, delay: 0.08 * i, ease: [0.25, 0.1, 0.25, 1] }} className="flex items-center gap-4 bg-white border border-border p-5 rounded-[4px] hover:border-accent/20 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300">
                  <div className="w-9 h-9 bg-accent/10 flex items-center justify-center rounded-[4px] shrink-0"><X size={16} className="text-accent" /></div>
                  <p className="text-text-primary font-sans font-medium text-[15px]">{p}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Deliverables */}
      {deliverables.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
            <motion.span {...fadeUp} className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4">What You Get</motion.span>
            <motion.h2 {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-16 max-w-2xl">
              Core <span className="text-accent">Deliverables</span>
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {deliverables.map((d, i) => {
                const Icon = resolveIcon(d.icon);
                return (
                  <motion.div key={d.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 * (i + 1) }} className="group border border-border p-8 rounded-[4px] hover:border-accent/30 transition-colors duration-300">
                    <div className="w-12 h-12 bg-accent/10 flex items-center justify-center rounded-[4px] mb-5 group-hover:bg-accent/20 transition-colors duration-300">
                      <Icon size={22} className="text-accent" />
                    </div>
                    <h3 className="text-lg font-sans font-bold text-text-primary mb-4">{d.title}</h3>
                    <ul className="space-y-2.5">
                      {d.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-text-secondary text-[15px] leading-[1.6] font-sans">
                          <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />{item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      {processSteps.length > 0 && (
        <section className="py-20 md:py-28 bg-dark">
          <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
            <motion.span {...fadeUp} className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4">How We Work</motion.span>
            <motion.h2 {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-white leading-[1.12] tracking-tight mb-16 max-w-2xl">
              Our <span className="text-accent">Process</span>
            </motion.h2>
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${Math.min(processSteps.length, 6)} gap-8`}>
              {processSteps.map((s, i) => {
                const Icon = resolveIcon(s.icon);
                return (
                  <motion.div key={s.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 * (i + 1) }} className="text-center">
                    <div className="w-16 h-16 bg-accent/10 flex items-center justify-center rounded-[4px] mx-auto mb-4"><Icon size={26} className="text-accent" /></div>
                    <span className="block text-white/30 font-mono text-sm mb-2">{s.step}</span>
                    <h3 className="text-base font-sans font-bold text-white">{s.title}</h3>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Extra Sections */}
      {extraSections.map((section, idx) => {
        const type = section.type as string;
        const eyebrow = section.eyebrow as string;
        const heading = section.heading as string;
        const accent = section.headingAccent as string;
        const items = section.items as unknown[];
        const isOdd = idx % 2 === 0;

        if (type === "tags") {
          return (
            <section key={idx} className={`py-20 md:py-28 ${isOdd ? "" : "bg-off-white"}`}>
              <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
                <motion.span {...fadeUp} className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4">{eyebrow}</motion.span>
                <motion.h2 {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-12 max-w-2xl">
                  {heading} <span className="text-accent">{accent}</span>
                </motion.h2>
                <div className="flex flex-wrap gap-4">
                  {(items as string[]).map((item, i) => (
                    <motion.div key={item} {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 * (i + 1) }} className="bg-off-white border border-border px-6 py-4 rounded-[4px] text-text-primary font-sans font-medium text-[15px]">
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        if (type === "iconGrid") {
          return (
            <section key={idx} className={`py-20 md:py-28 ${isOdd ? "" : "bg-off-white"}`}>
              <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
                <motion.span {...fadeUp} className="block text-xs font-semibold uppercase tracking-[0.12em] text-accent font-sans mb-4">{eyebrow}</motion.span>
                <motion.h2 {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-text-primary leading-[1.12] tracking-tight mb-12 max-w-2xl">
                  {heading} <span className="text-accent">{accent}</span>
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {(items as { icon?: string; title?: string; text?: string }[]).map((item, i) => {
                    const Icon = resolveIcon(item.icon ?? "Target");
                    return (
                      <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 * (i + 1) }} className="flex items-center gap-4 bg-white border border-border p-5 rounded-[4px]">
                        <div className="w-10 h-10 bg-accent/10 flex items-center justify-center rounded-[4px] shrink-0"><Icon size={18} className="text-accent" /></div>
                        <p className="text-text-primary font-sans font-medium text-[15px]">{item.title ?? item.text}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        }

        return null;
      })}

      {/* CTA */}
      <section className="py-20 md:py-28 bg-accent">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20 text-center">
          <motion.h2 {...fadeUp} className="text-3xl md:text-4xl lg:text-[2.5rem] font-sans font-bold text-white leading-[1.12] tracking-tight mb-6">{service.ctaHeading}</motion.h2>
          {service.ctaDescription && (
            <motion.p {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="text-white/80 max-w-xl mx-auto mb-10 leading-[1.7] font-sans">{service.ctaDescription}</motion.p>
          )}
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}>
            <a href={service.ctaButtonHref} className="inline-flex items-center gap-2 bg-white text-accent font-sans font-bold px-8 py-4 rounded-[4px] hover:bg-off-white transition-colors duration-300 text-sm">
              {service.ctaButtonText}<ArrowUpRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
