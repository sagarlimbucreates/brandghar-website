import { requirePermission } from "../../../lib/rbac";
import { PageHeader, Card, Button } from "../../../lib/ui";
import { createServiceAction } from "../actions";

function Input({
  label,
  name,
  defaultValue,
  required,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
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
  defaultValue?: string;
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

export default async function NewServicePage() {
  await requirePermission("service.create");

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader
        eyebrow="Services"
        title="New Service"
        subtitle="Create a new service page."
        backHref="/dashboard/services"
      />

      <form action={createServiceAction}>
        <Card className="p-8 mb-6">
          <h2 className="text-sm font-sans font-bold text-[#1A1A1A] mb-5">Basic Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Title" name="title" required />
            <Input label="Slug" name="slug" required />
            <Input label="Icon (Lucide name)" name="icon" defaultValue="Briefcase" required />
            <Input label="Sort Order" name="sortOrder" defaultValue={0} type="number" />
          </div>
          <div className="mt-4 flex items-center gap-2">
            <input type="checkbox" name="isActive" id="isActive" defaultChecked className="accent-[#E02020]" />
            <label htmlFor="isActive" className="text-sm font-sans text-[#555]">Active</label>
          </div>
        </Card>

        <Card className="p-8 mb-6">
          <h2 className="text-sm font-sans font-bold text-[#1A1A1A] mb-5">Hero Section</h2>
          <div className="space-y-4">
            <Input label="Eyebrow" name="eyebrow" defaultValue="Our Service" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Heading" name="heading" required />
              <Input label="Heading Accent" name="headingAccent" required />
            </div>
            <Textarea label="Description" name="description" rows={3} />
            <Textarea label="Secondary Description (optional)" name="secondaryDescription" rows={2} />
            <Input label="Hero Image URL" name="heroImageUrl" />
          </div>
        </Card>

        <Card className="p-8 mb-6">
          <h2 className="text-sm font-sans font-bold text-[#1A1A1A] mb-5">Landing Page Card</h2>
          <div className="space-y-4">
            <Textarea label="Short Description" name="shortDescription" rows={2} />
            <Textarea label="Bullets (JSON)" name="bullets" defaultValue="[]" rows={2} mono hint='e.g. ["Point 1", "Point 2"]' />
            <Input label="Card Image URL" name="cardImageUrl" />
          </div>
        </Card>

        <Card className="p-8 mb-6">
          <h2 className="text-sm font-sans font-bold text-[#1A1A1A] mb-5">Problems We Solve</h2>
          <Textarea label="Problems (JSON)" name="problems" defaultValue="[]" rows={4} mono />
        </Card>

        <Card className="p-8 mb-6">
          <h2 className="text-sm font-sans font-bold text-[#1A1A1A] mb-5">Core Deliverables</h2>
          <Textarea label="Deliverables (JSON)" name="deliverables" defaultValue="[]" rows={6} mono hint='Array of {icon, title, items: string[]}' />
        </Card>

        <Card className="p-8 mb-6">
          <h2 className="text-sm font-sans font-bold text-[#1A1A1A] mb-5">Process Steps</h2>
          <Textarea label="Process Steps (JSON)" name="processSteps" defaultValue="[]" rows={4} mono hint='Array of {icon, title, step}' />
        </Card>

        <Card className="p-8 mb-6">
          <h2 className="text-sm font-sans font-bold text-[#1A1A1A] mb-5">Extra Sections</h2>
          <Textarea label="Extra Sections (JSON)" name="extraSections" defaultValue="[]" rows={6} mono hint='Array of {type, eyebrow, heading, headingAccent, items}' />
        </Card>

        <Card className="p-8 mb-6">
          <h2 className="text-sm font-sans font-bold text-[#1A1A1A] mb-5">Call to Action</h2>
          <div className="space-y-4">
            <Input label="CTA Heading" name="ctaHeading" required />
            <Textarea label="CTA Description" name="ctaDescription" rows={2} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Button Text" name="ctaButtonText" defaultValue="Connect with Us" />
              <Input label="Button Href" name="ctaButtonHref" defaultValue="/#contact" />
            </div>
          </div>
        </Card>

        <Button type="submit" variant="primary">
          Create Service
        </Button>
      </form>
    </div>
  );
}
