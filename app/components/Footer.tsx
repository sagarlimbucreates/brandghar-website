import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

const serviceLinks = [
  "Meta Ads",
  "SEO",
  "Social Media",
  "Brand Identity",
  "Content Strategy",
  "Analytics",
];

const companyLinks = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white py-14">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Image
              src="/medias/logo.jpeg"
              alt="Brandhgar"
              width={120}
              height={40}
              className="h-9 w-auto object-contain brightness-0 invert mb-4"
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
                <li key={link}>
                  <a
                    href="/#services"
                    className="text-white/60 text-sm hover:text-accent transition-colors"
                  >
                    {link}
                  </a>
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
                  <a
                    href={link.href}
                    className="text-white/60 text-sm hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
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
                  href="tel:9851323800"
                  className="flex items-center gap-2 text-white/60 text-sm hover:text-accent transition-colors"
                >
                  <Phone size={13} className="text-accent shrink-0" />
                  9851323800
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@thebrandghar.com"
                  className="flex items-center gap-2 text-white/60 text-sm hover:text-accent transition-colors"
                >
                  <Mail size={13} className="text-accent shrink-0" />
                  info@thebrandghar.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <MapPin size={13} className="text-accent shrink-0" />
                Kathmandu, Nepal
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
