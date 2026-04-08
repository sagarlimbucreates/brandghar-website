import { asc, eq } from "drizzle-orm";
import { db, teamMembers } from "@/db";
import OurTeamClient from "./OurTeamClient";

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
