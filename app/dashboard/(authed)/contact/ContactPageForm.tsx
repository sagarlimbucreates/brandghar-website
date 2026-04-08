"use client";

import { useActionState } from "react";
import { updateContactPageAction } from "./actions";
import { Field, Button, FormAlert } from "../../lib/ui";
import TextArea from "../team/TextArea";

type Page = {
  heroEyebrow: string;
  heroHeading: string;
  heroHeadingAccent: string;
  heroSubtitle: string;
  phoneNumber: string;
  phoneHours: string;
  locationLabel: string;
  locationUrl: string;
  emailAddress: string;
  emailReplyNote: string;
  mapEmbedUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  tiktokUrl: string;
  linkedinUrl: string;
  quickHelpHeading: string;
  whatsappUrl: string;
};

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="pt-2">
      <h3 className="text-sm font-sans font-bold text-[#1A1A1A] mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-xs text-[#888] font-sans mb-4">{description}</p>
      )}
      <div className="space-y-5">{children}</div>
    </div>
  );
}

export default function ContactPageForm({
  page,
  canEdit,
}: {
  page: Page;
  canEdit: boolean;
}) {
  const [state, action, pending] = useActionState(updateContactPageAction, {});

  return (
    <form action={action} className="space-y-8">
      <FormAlert error={state.error} success={state.success} />

      {/* Hero */}
      <Section title="Hero" description="The header at the top of the contact page.">
        <Field
          label="Eyebrow"
          name="heroEyebrow"
          defaultValue={page.heroEyebrow}
          required
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field
            label="Heading"
            name="heroHeading"
            defaultValue={page.heroHeading}
            required
            helpText="First part of the heading."
          />
          <Field
            label="Heading Accent"
            name="heroHeadingAccent"
            defaultValue={page.heroHeadingAccent}
            required
            helpText="Red-accented portion."
          />
        </div>
        <TextArea
          label="Subtitle"
          name="heroSubtitle"
          defaultValue={page.heroSubtitle}
          rows={4}
          required
        />
      </Section>

      <div className="border-t border-[#E5E5E5]" />

      {/* Contact info */}
      <Section
        title="Contact Information"
        description="Phone, location, and email shown in the sidebar card."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field
            label="Phone Number"
            name="phoneNumber"
            defaultValue={page.phoneNumber}
            required
            placeholder="+977 984 765 3969"
          />
          <Field
            label="Phone Hours"
            name="phoneHours"
            defaultValue={page.phoneHours}
            placeholder="Sun – Fri 9:00 – 19:00"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field
            label="Location Label"
            name="locationLabel"
            defaultValue={page.locationLabel}
            required
            placeholder="Pulchowk, Lalitpur"
          />
          <Field
            label="Google Maps URL"
            name="locationUrl"
            type="url"
            defaultValue={page.locationUrl}
            placeholder="https://maps.app.goo.gl/…"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field
            label="Email"
            name="emailAddress"
            type="email"
            defaultValue={page.emailAddress}
            required
          />
          <Field
            label="Email Reply Note"
            name="emailReplyNote"
            defaultValue={page.emailReplyNote}
            placeholder="We typically respond within 24 hours."
          />
        </div>
      </Section>

      <div className="border-t border-[#E5E5E5]" />

      {/* Map */}
      <Section
        title="Map Embed"
        description="Google Maps iframe src URL. Copy only the URL inside the src='...' attribute."
      >
        <TextArea
          label="Map Embed URL"
          name="mapEmbedUrl"
          defaultValue={page.mapEmbedUrl}
          rows={3}
          placeholder="https://www.google.com/maps/embed?pb=…"
          helpText="Leave empty to hide the map section."
        />
      </Section>

      <div className="border-t border-[#E5E5E5]" />

      {/* Social */}
      <Section
        title="Social Links"
        description="Leave any blank to hide that button."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field
            label="Instagram URL"
            name="instagramUrl"
            type="url"
            defaultValue={page.instagramUrl}
          />
          <Field
            label="Facebook URL"
            name="facebookUrl"
            type="url"
            defaultValue={page.facebookUrl}
          />
          <Field
            label="TikTok URL"
            name="tiktokUrl"
            type="url"
            defaultValue={page.tiktokUrl}
          />
          <Field
            label="LinkedIn URL"
            name="linkedinUrl"
            type="url"
            defaultValue={page.linkedinUrl}
          />
        </div>
      </Section>

      <div className="border-t border-[#E5E5E5]" />

      {/* Quick help */}
      <Section title="Quick Help CTA" description="The dark banner with call + WhatsApp buttons.">
        <Field
          label="Heading"
          name="quickHelpHeading"
          defaultValue={page.quickHelpHeading}
          required
        />
        <Field
          label="WhatsApp URL"
          name="whatsappUrl"
          type="url"
          defaultValue={page.whatsappUrl}
          placeholder="https://wa.me/9779847653969"
          helpText="Leave blank to hide the WhatsApp button."
        />
      </Section>

      <div className="pt-4">
        <Button type="submit" disabled={pending || !canEdit}>
          {pending ? "Saving…" : "Save Contact Page"}
        </Button>
      </div>
    </form>
  );
}
