"use client";

import { useActionState, useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, ImageIcon } from "lucide-react";
import { updateOurCompanyStoryAction } from "./actions";
import { Field, Button, FormAlert } from "../../../lib/ui";
import TextArea from "../../team/TextArea";

export default function OurCompanyStoryForm({
  page,
  canEdit,
}: {
  page: {
    storyEyebrow: string;
    storyHeading: string;
    storyHeadingAccent: string;
    storyBody: string;
    estYear: string;
    storyImageUrl: string | null;
  };
  canEdit: boolean;
}) {
  const [state, action, pending] = useActionState(
    updateOurCompanyStoryAction,
    {}
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(page.storyImageUrl);
  const [remove, setRemove] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (preview && preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
    setRemove(false);
  };

  const handleClear = () => {
    if (preview && preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    setPreview(null);
    setRemove(true);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <form action={action} className="space-y-5" encType="multipart/form-data">
      <FormAlert error={state.error} success={state.success} />

      <Field
        label="Section Eyebrow"
        name="storyEyebrow"
        defaultValue={page.storyEyebrow}
        required
        helpText="The small uppercase label above the heading (e.g. 'Our Story')."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          label="Heading"
          name="storyHeading"
          defaultValue={page.storyHeading}
          required
          placeholder="Building Brands That"
          helpText="First line of the heading (in default color)."
        />
        <Field
          label="Heading Accent"
          name="storyHeadingAccent"
          defaultValue={page.storyHeadingAccent}
          required
          placeholder="Stand Out"
          helpText="The red-accented portion of the heading."
        />
      </div>

      <TextArea
        label="Story Body"
        name="storyBody"
        defaultValue={page.storyBody}
        rows={8}
        required
        helpText="Separate paragraphs with a blank line."
      />

      <Field
        label="Est. Year Badge"
        name="estYear"
        defaultValue={page.estYear}
        required
        helpText="Shown in the red badge corner of the image (e.g. '2025')."
      />

      {/* Story image */}
      <div>
        <label className="block text-xs font-sans font-semibold text-[#555] uppercase tracking-[0.1em] mb-2">
          Story Image
        </label>
        <div className="flex items-start gap-5">
          <div className="w-40 aspect-[4/3] bg-[#F7F7F7] border border-[#E5E5E5] rounded-[4px] overflow-hidden flex items-center justify-center">
            {preview ? (
              <Image
                src={preview}
                alt="Story image preview"
                width={160}
                height={120}
                className="w-full h-full object-cover"
                unoptimized
              />
            ) : (
              <ImageIcon size={24} className="text-[#888]" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E5E5] rounded-[4px] text-xs font-sans font-medium text-[#1A1A1A] cursor-pointer hover:border-[#E02020]/30 hover:text-[#E02020] transition-colors">
                <Upload size={12} />
                {preview ? "Replace Image" : "Upload Image"}
                <input
                  ref={inputRef}
                  type="file"
                  name="storyImageFile"
                  accept="image/jpeg,image/png,image/webp,image/gif"
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
              JPG, PNG, WebP, or GIF. Max 5 MB.
            </p>
          </div>
        </div>
        <input type="hidden" name="removeStoryImage" value={remove ? "on" : ""} />
      </div>

      <div className="pt-2">
        <Button type="submit" disabled={pending || !canEdit}>
          {pending ? "Saving…" : "Save Story"}
        </Button>
      </div>
    </form>
  );
}
