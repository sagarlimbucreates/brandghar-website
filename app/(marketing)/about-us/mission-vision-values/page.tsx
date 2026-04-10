import type { Metadata } from "next";
import { asc, eq } from "drizzle-orm";
import { db, missionVisionPage, coreValues } from "@/db";
import MissionVisionClient from "./MissionVisionClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mission, Vision & Core Values",
  description: "Discover Brandghar's mission, vision, and the core values that drive our digital marketing work in Nepal.",
  alternates: { canonical: "/about-us/mission-vision-values" },
};

const SINGLETON_ID = "singleton";

export default async function MissionVisionPublicPage() {
  const pageRows = await db
    .select()
    .from(missionVisionPage)
    .where(eq(missionVisionPage.id, SINGLETON_ID))
    .limit(1);
  const page = pageRows[0] ?? null;

  const values = await db
    .select({
      id: coreValues.id,
      title: coreValues.title,
      description: coreValues.description,
      icon: coreValues.icon,
    })
    .from(coreValues)
    .where(eq(coreValues.isActive, true))
    .orderBy(asc(coreValues.sortOrder), asc(coreValues.title));

  return (
    <MissionVisionClient
      mission={page?.missionText ?? ""}
      vision={page?.visionText ?? ""}
      values={values}
    />
  );
}
