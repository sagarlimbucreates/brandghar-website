export const revalidate = 3600;

import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db, services } from "@/db";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const rows = await db
    .select()
    .from(services)
    .where(eq(services.slug, slug))
    .limit(1);

  if (!rows[0] || !rows[0].isActive) {
    return NextResponse.json(null, { status: 404 });
  }

  return NextResponse.json(rows[0]);
}
