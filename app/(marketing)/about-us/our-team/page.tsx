import type { Metadata } from "next";
import { asc, eq } from "drizzle-orm";
import { db, teamMembers } from "@/db";
import OurTeamClient from "./OurTeamClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the creative minds behind Brandghar — our team of digital marketing strategists, designers, and developers.",
  alternates: { canonical: "/about-us/our-team" },
};

export default async function OurTeamPage() {
  const rows = await db
    .select()
    .from(teamMembers)
    .where(eq(teamMembers.isActive, true))
    .orderBy(asc(teamMembers.sortOrder), asc(teamMembers.fullName));

  const members = rows.map((m) => ({
    id: m.id,
    fullName: m.fullName,
    role: m.role,
    photoUrl: m.photoUrl,
    linkedinUrl: m.linkedinUrl,
  }));

  return <OurTeamClient members={members} />;
}
