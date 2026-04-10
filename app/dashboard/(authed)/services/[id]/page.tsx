import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { Trash2 } from "lucide-react";
import { db, services } from "@/db";
import { requirePermission, hasPermission } from "../../../lib/rbac";
import { PageHeader, Card, Button } from "../../../lib/ui";
import { updateServiceAction, deleteServiceAction } from "../actions";

type Params = Promise<{ id: string }>;

function Input({
  label,
  name,
  defaultValue,
  required,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] font-sans font-semibold text-[#888] uppercase tracking-[0.1em] mb-1.5">
        {label}
      </label>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        required={required}
        className="w-full px-4 py-2.5 text-sm text-[#1A1A1A] bg-white border border-[#E5E5E5] rounded-[4px] focus:outline-none focus:border-[#E02020] transition-colors font-sans"
      />
    </div>
  );
}

function Textarea({
  label,
  name,
  defaultValue,
  rows = 3,
  mono,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  rows?: number;
  mono?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] font-sans font-semibold text-[#888] uppercase tracking-[0.1em] mb-1.5">
        {label}
      </label>
      {hint && (
        <p className="text-[11px] text-[#AAA] font-sans mb-1">{hint}</p>
      )}
      <textarea
        name={name}
        rows={rows}
        defaultValue={defaultValue ?? ""}
        className={`w-full px-4 py-2.5 text-sm text-[#1A1A1A] bg-white border border-[#E5E5E5] rounded-[4px] focus:outline-none focus:border-[#E02020] transition-colors resize-y ${mono ? "font-mono text-xs" : "font-sans"}`}
      />
    </div>
  );
}

export default async function ServiceEditPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  const me = await requirePermission("service.view");

  const rows = await db
    .select()
    .from(services)
    .where(eq(services.id, id))
    .limit(1);
  const svc = rows[0];
  if (!svc) notFound();

  const canEdit = hasPermission(me, "service.edit");
  const canDelete = hasPermission(me, "service.delete");

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader
        eyebrow="Services"
        title={svc.title}
        subtitle={`/services/${svc.slug}`}
        backHref="/dashboard/services"
      />

      <form action={updateServiceAction}>
        <input type="hidden" name="id" value={svc.id} />

        {/* Basic Info */}
        <Card className="p-8 mb-6">
          <h2 className="text-sm font-sans font-bold text-[#1A1A1A] mb-5">
            Basic Info
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Title" name="title" defaultValue={svc.title} required />
            <Input label="Slug" name="slug" defaultValue={svc.slug} required />
            <Input label="Icon (Lucide name)" name="icon" defaultValue={svc.icon} required />
            <Input label="Sort Order" name="sortOrder" defaultValue={svc.sortOrder} type="number" />
          </div>
          <div className="mt-4 flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              id="isActive"
              defaultChecked={svc.isActive}
              className="accent-[#E02020]"
            />
            <label htmlFor="isActive" className="text-sm font-sans text-[#555]">
              Active (visible on public site)
            </label>
          </div>
        </Card>

        {/* Hero Section */}
        <Card className="p-8 mb-6">
          <h2 className="text-sm font-sans font-bold text-[#1A1A1A] mb-5">
            Hero Section
          </h2>
          <div className="space-y-4">
            <Input label="Eyebrow" name="eyebrow" defaultValue={svc.eyebrow} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Heading" name="heading" defaultValue={svc.heading} required />
              <Input label="Heading Accent" name="headingAccent" defaultValue={svc.headingAccent} required />
            </div>
            <Textarea label="Description" name="description" defaultValue={svc.description} rows={3} />
            <Textarea label="Secondary Description (optional)" name="secondaryDescription" defaultValue={svc.secondaryDescription} rows={2} />
            <Input label="Hero Image URL" name="heroImageUrl" defaultValue={svc.heroImageUrl} />
          </div>
        </Card>

        {/* Landing Page Card */}
        <Card className="p-8 mb-6">
          <h2 className="text-sm font-sans font-bold text-[#1A1A1A] mb-5">
            Landing Page Card
          </h2>
          <div className="space-y-4">
            <Textarea label="Short Description" name="shortDescription" defaultValue={svc.shortDescription} rows={2} />
            <Textarea
              label="Bullets (JSON array of strings)"
              name="bullets"
              defaultValue={JSON.stringify(svc.bullets, null, 2)}
              rows={3}
              mono
              hint='e.g. ["Content Strategy", "Community Engagement", "Performance Tracking"]'
            />
            <Input label="Card Image URL" name="cardImageUrl" defaultValue={svc.cardImageUrl} />
          </div>
        </Card>

        {/* Problems */}
        <Card className="p-8 mb-6">
          <h2 className="text-sm font-sans font-bold text-[#1A1A1A] mb-5">
            Problems We Solve
          </h2>
          <Textarea
            label="Problems (JSON array of strings)"
            name="problems"
            defaultValue={JSON.stringify(svc.problems, null, 2)}
            rows={6}
            mono
          />
        </Card>

        {/* Deliverables */}
        <Card className="p-8 mb-6">
          <h2 className="text-sm font-sans font-bold text-[#1A1A1A] mb-5">
            Core Deliverables
          </h2>
          <Textarea
            label="Deliverables (JSON)"
            name="deliverables"
            defaultValue={JSON.stringify(svc.deliverables, null, 2)}
            rows={12}
            mono
            hint='Array of {icon, title, items: string[]}'
          />
        </Card>

        {/* Process Steps */}
        <Card className="p-8 mb-6">
          <h2 className="text-sm font-sans font-bold text-[#1A1A1A] mb-5">
            Process Steps
          </h2>
          <Textarea
            label="Process Steps (JSON)"
            name="processSteps"
            defaultValue={JSON.stringify(svc.processSteps, null, 2)}
            rows={8}
            mono
            hint='Array of {icon, title, step}'
          />
        </Card>

        {/* Extra Sections */}
        <Card className="p-8 mb-6">
          <h2 className="text-sm font-sans font-bold text-[#1A1A1A] mb-5">
            Extra Sections
          </h2>
          <Textarea
            label="Extra Sections (JSON)"
            name="extraSections"
            defaultValue={JSON.stringify(svc.extraSections, null, 2)}
            rows={12}
            mono
            hint='Array of {type: "tags"|"iconGrid", eyebrow, heading, headingAccent, items}'
          />
        </Card>

        {/* CTA */}
        <Card className="p-8 mb-6">
          <h2 className="text-sm font-sans font-bold text-[#1A1A1A] mb-5">
            Call to Action
          </h2>
          <div className="space-y-4">
            <Input label="CTA Heading" name="ctaHeading" defaultValue={svc.ctaHeading} required />
            <Textarea label="CTA Description" name="ctaDescription" defaultValue={svc.ctaDescription} rows={2} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Button Text" name="ctaButtonText" defaultValue={svc.ctaButtonText} />
              <Input label="Button Href" name="ctaButtonHref" defaultValue={svc.ctaButtonHref} />
            </div>
          </div>
        </Card>

        {canEdit && (
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        )}
      </form>

      {canDelete && (
        <Card className="p-8 border-[#E02020]/30 mt-6">
          <h2 className="text-sm font-sans font-bold text-[#CC0000] mb-2">
            Danger Zone
          </h2>
          <p className="text-xs text-[#888] font-sans mb-5">
            Permanently delete this service. This cannot be undone.
          </p>
          <form action={deleteServiceAction}>
            <input type="hidden" name="id" value={svc.id} />
            <Button type="submit" variant="danger">
              <Trash2 size={14} /> Delete Service
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
}
