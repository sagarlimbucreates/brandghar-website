import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eq, asc } from "drizzle-orm";
import { db, services } from "@/db";
import type { Service } from "@/db/schema";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/app/components/JsonLd";
import ServicePageClient from "./ServicePageClient";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const rows = await db
    .select({ slug: services.slug })
    .from(services)
    .where(eq(services.isActive, true))
    .orderBy(asc(services.sortOrder));
  return rows.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const rows = await db
    .select()
    .from(services)
    .where(eq(services.slug, slug))
    .limit(1);
  const svc = rows[0];
  if (!svc) return {};

  const title = `${svc.title} — Brandghar`;
  const description = svc.shortDescription;

  return {
    title,
    description,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title,
      description,
      url: `/services/${slug}`,
      type: "website",
      ...(svc.heroImageUrl ? { images: [{ url: svc.heroImageUrl }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(svc.heroImageUrl ? { images: [svc.heroImageUrl] } : {}),
    },
  };
}

async function getService(slug: string): Promise<Service | null> {
  const rows = await db
    .select()
    .from(services)
    .where(eq(services.slug, slug))
    .limit(1);
  return rows[0] && rows[0].isActive ? rows[0] : null;
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  return (
    <>
      <ServiceJsonLd
        name={service.title}
        description={service.shortDescription}
        url={`/services/${service.slug}`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/#services" },
          { name: service.title, href: `/services/${service.slug}` },
        ]}
      />
      <ServicePageClient service={service} />
    </>
  );
}
