export const revalidate = 3600;

import { eq, asc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db, services } from "@/db";

export async function GET() {
  const rows = await db
    .select({
      slug: services.slug,
      title: services.title,
      icon: services.icon,
      shortDescription: services.shortDescription,
      bullets: services.bullets,
      cardImageUrl: services.cardImageUrl,
    })
    .from(services)
    .where(eq(services.isActive, true))
    .orderBy(asc(services.sortOrder));

  return NextResponse.json(rows);
}
