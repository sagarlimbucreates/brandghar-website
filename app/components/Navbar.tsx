"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

const aboutSubmenu = [
  { label: "Our Company", href: "/about-us/our-company" },
  { label: "Mission, Vision & Core Values", href: "/#about" },
  { label: "Our Team", href: "/#about" },
];

const serviceSubmenu = [
  { label: "Social Media Mastery", href: "/#services" },
  { label: "Influencer Partnerships", href: "/#services" },
  { label: "Strategic Ad Placements", href: "/#services" },
  { label: "Search Engine Optimization", href: "/#services" },
  { label: "Brand Identity & Graphics Design", href: "/#services" },
  { label: "Website Development", href: "/#services" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white font-sans shadow-[0_1px_12px_rgba(0,0,0,0.06)]">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/medias/logo.jpeg"
            alt="The Brand Ghar"
            width={160}
            height={56}
            className="h-12 md:h-14 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-[15px] font-normal text-black hover:text-accent transition-colors duration-200">
            Home
          </Link>
          {/* About dropdown */}
          <div className="relative group/about">
            <button className="flex items-center gap-1 text-[15px] font-normal text-black hover:text-accent transition-colors duration-200">
              About
              <ChevronDown size={14} className="group-hover/about:rotate-180 transition-transform duration-200" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover/about:opacity-100 group-hover/about:visible transition-all duration-200">
              <div className="bg-white shadow-[0_10px_40px_rgba(0,0,0,0.1)] py-2 min-w-[260px] rounded-[4px]">
                {aboutSubmenu.map((item) =>
                  item.href.startsWith("/") ? (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-6 py-2.5 text-[13px] text-black/70 hover:text-accent hover:bg-[#FFE5E5] hover:pl-8 border-l-2 border-transparent hover:border-accent transition-all duration-200"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block px-6 py-2.5 text-[13px] text-black/70 hover:text-accent hover:bg-[#FFE5E5] hover:pl-8 border-l-2 border-transparent hover:border-accent transition-all duration-200"
                    >
                      {item.label}
                    </a>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Services dropdown */}
          <div className="relative group/services">
            <button className="flex items-center gap-1 text-[15px] font-normal text-black hover:text-accent transition-colors duration-200">
              Services
              <ChevronDown size={14} className="group-hover/services:rotate-180 transition-transform duration-200" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover/services:opacity-100 group-hover/services:visible transition-all duration-200">
              <div className="bg-white shadow-[0_10px_40px_rgba(0,0,0,0.1)] py-2 min-w-[280px] rounded-[4px]">
                {serviceSubmenu.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block px-6 py-2.5 text-[13px] text-black/70 hover:text-accent hover:bg-[#FFE5E5] hover:pl-8 border-l-2 border-transparent hover:border-accent transition-all duration-200"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <a href="/#work" className="text-[15px] font-normal text-black hover:text-accent transition-colors duration-200">
            Work
          </a>
          <a href="/#blog" className="text-[15px] font-normal text-black hover:text-accent transition-colors duration-200">
            Blog
          </a>
          <a href="/#contact" className="text-[15px] font-normal text-black hover:text-accent transition-colors duration-200">
            Contact
          </a>
        </div>

        {/* CTA */}
        <a
          href="/#contact"
          className="hidden md:inline-block bg-accent text-white text-sm font-medium px-7 py-3 rounded-[4px] hover:bg-accent-hover transition-colors duration-300"
        >
          Get a Quote
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-black"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-border overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              <Link href="/" className="py-2.5 text-black hover:text-accent transition-colors font-normal" onClick={() => setMobileOpen(false)}>
                Home
              </Link>
              {/* Mobile About accordion */}
              <button
                className="flex items-center justify-between py-2.5 text-black hover:text-accent transition-colors font-normal w-full text-left"
                onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
              >
                About
                <ChevronDown size={16} className={`transition-transform duration-200 ${mobileAboutOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {mobileAboutOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-4 ml-1 flex flex-col">
                      {aboutSubmenu.map((item) =>
                        item.href.startsWith("/") ? (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="py-2 text-sm text-black/50 hover:text-accent hover:pl-2 transition-all duration-200"
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <a
                            key={item.label}
                            href={item.href}
                            className="py-2 text-sm text-black/50 hover:text-accent hover:pl-2 transition-all duration-200"
                            onClick={() => setMobileOpen(false)}
                          >
                            {item.label}
                          </a>
                        )
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mobile Services accordion */}
              <button
                className="flex items-center justify-between py-2.5 text-black hover:text-accent transition-colors font-normal w-full text-left"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              >
                Services
                <ChevronDown size={16} className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {mobileServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-4 ml-1 flex flex-col">
                      {serviceSubmenu.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="py-2 text-sm text-black/50 hover:text-accent hover:pl-2 transition-all duration-200"
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <a href="/#work" className="py-2.5 text-black hover:text-accent transition-colors font-normal" onClick={() => setMobileOpen(false)}>
                Work
              </a>
              <a href="/#blog" className="py-2.5 text-black hover:text-accent transition-colors font-normal" onClick={() => setMobileOpen(false)}>
                Blog
              </a>
              <a href="/#contact" className="py-2.5 text-black hover:text-accent transition-colors font-normal" onClick={() => setMobileOpen(false)}>
                Contact
              </a>
              <a
                href="/#contact"
                className="bg-accent text-white text-sm font-medium px-6 py-3 text-center rounded-[4px] hover:bg-accent-hover transition-colors mt-3"
                onClick={() => setMobileOpen(false)}
              >
                Get a Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
