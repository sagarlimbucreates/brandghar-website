import type { Metadata } from "next";
import { asc, eq } from "drizzle-orm";
import { db, ourCompanyPage, ourCompanyClients } from "@/db";
import OurCompanyClient from "./OurCompanyClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Company",
  description: "Learn about Brandghar — a digital marketing agency in Nepal dedicated to growing brands through strategy, creativity, and performance.",
  alternates: { canonical: "/about-us/our-company" },
};

const SINGLETON_ID = "singleton";

export default async function OurCompanyPublicPage() {
  const pageRows = await db
    .select()
    .from(ourCompanyPage)
    .where(eq(ourCompanyPage.id, SINGLETON_ID))
    .limit(1);
  const page = pageRows[0] ?? null;

  const clients = await db
    .select({
      id: ourCompanyClients.id,
      name: ourCompanyClients.name,
      logoUrl: ourCompanyClients.logoUrl,
      websiteUrl: ourCompanyClients.websiteUrl,
    })
    .from(ourCompanyClients)
    .where(eq(ourCompanyClients.isActive, true))
    .orderBy(
      asc(ourCompanyClients.sortOrder),
      asc(ourCompanyClients.name)
    );

  return (
    <OurCompanyClient
      story={{
        eyebrow: page?.storyEyebrow ?? "Our Story",
        heading: page?.storyHeading ?? "Building Brands That",
        headingAccent: page?.storyHeadingAccent ?? "Stand Out",
        body: page?.storyBody ?? "",
        estYear: page?.estYear ?? "2025",
        imageUrl: page?.storyImageUrl ?? "/medias/our-story.png",
      }}
      clients={clients}
    />
  );
}
