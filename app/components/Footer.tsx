import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const serviceLinks = [
  { label: "Social Media Mastery", href: "/services/social-media-mastery" },
  { label: "Influencer Partnerships", href: "/services/influencer-partnerships" },
  { label: "Strategic Ad Placements", href: "/services/strategic-ad-placements" },
  { label: "Search Engine Optimization", href: "/services/search-engine-optimization" },
  { label: "Brand Identity & Graphics Design", href: "/services/brand-identity-graphics-design" },
  { label: "Website Development", href: "/services/website-development" },
];

const companyLinks = [
  { label: "Our Company", href: "/about-us/our-company" },
  { label: "Mission, Vision & Core Values", href: "/about-us/mission-vision-values" },
  { label: "Our Team", href: "/about-us/our-team" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white py-14">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Image
              src="/medias/logo-cropped.png"
              alt="Brandhgar"
              width={160}
              height={56}
              className="h-12 w-auto object-contain mb-4"
            />
            <p className="text-white/60 text-sm leading-relaxed">
              Results-driven digital marketing agency from Kathmandu, Nepal.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-[0.12em] mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-sm hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-[0.12em] mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-sm hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-[0.12em] mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="tel:+9779847653969"
                  className="flex items-center gap-2 text-white/60 text-sm hover:text-accent transition-colors"
                >
                  <Phone size={13} className="text-accent shrink-0" />
                  +977 984 765 3969
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@thebrandghar.com"
                  className="flex items-center gap-2 text-white/60 text-sm hover:text-accent transition-colors"
                >
                  <Mail size={13} className="text-accent shrink-0" />
                  hello@thebrandghar.com
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/7ciR46P3kDiREmq39"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/60 text-sm hover:text-accent transition-colors"
                >
                  <MapPin size={13} className="text-accent shrink-0" />
                  Pulchowk, Lalitpur
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; 2025 Brandhgar. All rights reserved.
          </p>
          <a
            href="#"
            className="text-white/40 text-sm hover:text-white transition-colors"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
