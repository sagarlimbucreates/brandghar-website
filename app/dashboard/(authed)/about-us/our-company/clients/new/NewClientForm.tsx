"use client";

import { useActionState, useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, ImageIcon } from "lucide-react";
import { createClientAction } from "../../actions";
import { Field, Checkbox, Button, FormAlert } from "../../../../../lib/ui";

export default function NewClientForm() {
  const [state, action, pending] = useActionState(createClientAction, {});
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (preview && preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
  };

  const handleClear = () => {
    if (preview && preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <form action={action} className="space-y-5" encType="multipart/form-data">
      <FormAlert error={state.error} />

      <Field label="Client Name" name="name" required placeholder="e.g. Aarambha School" />
      <Field
        label="Website URL"
        name="websiteUrl"
        type="url"
        placeholder="https://…"
      />

      {/* Logo upload */}
      <div>
        <label className="block text-xs font-sans font-semibold text-[#555] uppercase tracking-[0.1em] mb-2">
          Logo
        </label>
        <div className="flex items-start gap-5">
          <div className="w-24 h-24 rounded-[4px] bg-[#F7F7F7] border border-[#E5E5E5] flex items-center justify-center overflow-hidden">
            {preview ? (
              <Image
                src={preview}
                alt="Logo preview"
                width={96}
                height={96}
                className="w-full h-full object-contain p-2"
                unoptimized
              />
            ) : (
              <ImageIcon size={24} className="text-[#888]" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E5E5] rounded-[4px] text-xs font-sans font-medium text-[#1A1A1A] cursor-pointer hover:border-[#E02020]/30 hover:text-[#E02020] transition-colors">
                <Upload size={12} /> {preview ? "Replace" : "Upload"} Logo
                <input
                  ref={inputRef}
                  type="file"
                  name="logoFile"
                  accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
              {preview && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="inline-flex items-center gap-1 text-xs text-[#555] hover:text-[#E02020] font-sans"
                >
                  <X size={12} /> Remove
                </button>
              )}
            </div>
            <p className="text-xs text-[#888] font-sans mt-2">
              JPG, PNG, WebP, SVG, or GIF. Max 5 MB. Square logos look best.
            </p>
          </div>
        </div>
      </div>

      <Field
        label="Sort Order"
        name="sortOrder"
        type="number"
        defaultValue={100}
        helpText="Lower numbers appear first on the public page."
      />
      <Checkbox
        label="Visible on public page"
        name="isActive"
        defaultChecked
      />

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Creating…" : "Create Client"}
        </Button>
        <Button href="/dashboard/about-us/our-company" variant="ghost">
          Cancel
        </Button>
      </div>
    </form>
  );
}
