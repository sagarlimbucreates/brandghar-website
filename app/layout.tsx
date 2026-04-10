import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import { OrganizationJsonLd } from "./components/JsonLd";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thebrandghar.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Brandghar — Digital Marketing Agency in Nepal",
    template: "%s — Brandghar",
  },
  description:
    "Results-driven digital marketing agency helping Nepali and global brands grow through Meta Ads, SEO, content, and strategy.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Brandghar",
    title: "Brandghar — Digital Marketing Agency in Nepal",
    description:
      "Results-driven digital marketing agency helping Nepali and global brands grow through Meta Ads, SEO, content, and strategy.",
    images: [{ url: "/medias/logo-cropped.png", width: 1200, height: 630, alt: "Brandghar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brandghar — Digital Marketing Agency in Nepal",
    description:
      "Results-driven digital marketing agency helping Nepali and global brands grow through Meta Ads, SEO, content, and strategy.",
    images: ["/medias/logo-cropped.png"],
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-white text-text-primary font-sans">
        <OrganizationJsonLd />
        {children}
      </body>
    </html>
  );
}
