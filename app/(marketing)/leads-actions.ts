"use server";

import { headers } from "next/headers";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { db, leads } from "@/db";

export type LeadFormState = {
  error?: string;
  success?: string;
};

// Accepts a 10-digit Nepali mobile starting 96/97/98, with an optional
// +977 / 977 / 0 prefix. We only enforce this strictly for the navbar
// modal — the older hero/contact forms keep their looser rule so we
// don't silently break existing flows.
const NEPALI_PHONE_REGEX = /^(?:\+?977[-\s]?)?(?:0)?9[678]\d{8}$/;

const schema = z
  .object({
    fullName: z.string().min(1, "Please enter your name.").max(120),
    phone: z.string().min(3, "Please enter a valid phone number.").max(60),
    email: z
      .string()
      .email("Please enter a valid email.")
      .max(200)
      .optional()
      .or(z.literal("")),
    service: z.string().max(200).optional(),
    message: z.string().max(5000).optional(),
    source: z.enum(["hero_landing", "contact_page", "navbar_cta"]),
  })
  .refine(
    (d) => d.source !== "navbar_cta" || NEPALI_PHONE_REGEX.test(d.phone),
    {
      path: ["phone"],
      message:
        "Please enter a valid Nepali phone number (e.g. 9841234567).",
    },
  )
  .refine(
    (d) =>
      d.source !== "navbar_cta" ||
      (typeof d.message === "string" && d.message.trim().length > 0),
    {
      path: ["message"],
      message: "Please tell us about your inquiry.",
    },
  );

function nullable(v: FormDataEntryValue | null): string | null {
  if (v === null) return null;
  const s = String(v).trim();
  return s.length === 0 ? null : s;
}

export async function submitLeadAction(
  _prev: LeadFormState,
  fd: FormData
): Promise<LeadFormState> {
  const parsed = schema.safeParse({
    fullName: fd.get("fullName"),
    phone: fd.get("phone"),
    email: nullable(fd.get("email")) ?? "",
    service: nullable(fd.get("service")) ?? undefined,
    message: nullable(fd.get("message")) ?? undefined,
    source: fd.get("source") ?? "hero_landing",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  // Best-effort IP + user agent capture
  const h = await headers();
  const forwardedFor = h.get("x-forwarded-for");
  const realIp = h.get("x-real-ip");
  const ipAddress =
    (forwardedFor ? forwardedFor.split(",")[0].trim() : realIp) ?? null;
  const userAgent = h.get("user-agent");

  await db.insert(leads).values({
    id: randomUUID(),
    fullName: parsed.data.fullName,
    phone: parsed.data.phone,
    email: parsed.data.email?.length ? parsed.data.email : null,
    service: parsed.data.service ?? null,
    message: parsed.data.message ?? null,
    source: parsed.data.source,
    isRead: false,
    ipAddress,
    userAgent,
  });

  return {
    success:
      "Thanks! We got your request and will reach out within 24 hours.",
  };
}
