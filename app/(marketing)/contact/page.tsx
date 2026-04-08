import { asc, eq } from "drizzle-orm";
import { db, contactPage, contactTrustPoints } from "@/db";
import ContactClient from "./ContactClient";

const SINGLETON_ID = "singleton";

export default async function ContactPublicPage() {
  const pageRows = await db
    .select()
    .from(contactPage)
    .where(eq(contactPage.id, SINGLETON_ID))
    .limit(1);
  const page = pageRows[0] ?? null;

  const trustRows = await db
    .select({
      id: contactTrustPoints.id,
      text: contactTrustPoints.text,
      icon: contactTrustPoints.icon,
    })
    .from(contactTrustPoints)
    .where(eq(contactTrustPoints.isActive, true))
    .orderBy(
      asc(contactTrustPoints.sortOrder),
      asc(contactTrustPoints.text)
    );

  return (
    <ContactClient
      page={{
        heroEyebrow: page?.heroEyebrow ?? "Get In Touch",
        heroHeading: page?.heroHeading ?? "",
        heroHeadingAccent: page?.heroHeadingAccent ?? "",
        heroSubtitle: page?.heroSubtitle ?? "",
        phoneNumber: page?.phoneNumber ?? "",
        phoneHours: page?.phoneHours ?? "",
        locationLabel: page?.locationLabel ?? "",
        locationUrl: page?.locationUrl ?? "",
        emailAddress: page?.emailAddress ?? "",
        emailReplyNote: page?.emailReplyNote ?? "",
        mapEmbedUrl: page?.mapEmbedUrl ?? "",
        instagramUrl: page?.instagramUrl ?? "",
        facebookUrl: page?.facebookUrl ?? "",
        tiktokUrl: page?.tiktokUrl ?? "",
        linkedinUrl: page?.linkedinUrl ?? "",
        quickHelpHeading: page?.quickHelpHeading ?? "Need Immediate Help?",
        whatsappUrl: page?.whatsappUrl ?? "",
      }}
      trustPoints={trustRows}
    />
  );
}
