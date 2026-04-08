"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, ImageIcon } from "lucide-react";

type Props = {
  name?: string;
  existingUrl?: string | null;
};

export default function CoverImageUploader({
  name = "coverFile",
  existingUrl,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(existingUrl ?? null);
  const [isNew, setIsNew] = useState(false);
  const [remove, setRemove] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.type)) {
      setError("Unsupported type. Use JPG, PNG, WebP, or GIF.");
      e.target.value = "";
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError("Image must be 8 MB or smaller.");
      e.target.value = "";
      return;
    }

    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    setPreview(URL.createObjectURL(file));
    setIsNew(true);
    setRemove(false);
  };

  const handleClear = () => {
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    setIsNew(false);
    setRemove(true);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <label className="block text-xs font-sans font-semibold text-[#555] uppercase tracking-[0.1em] mb-2">
        Cover Image
      </label>

      {/* Preview (16:10) */}
      <div className="relative aspect-[16/10] bg-[#F7F7F7] border border-[#E5E5E5] rounded-[8px] overflow-hidden flex items-center justify-center mb-3">
        {preview ? (
          <Image
            src={preview}
            alt="Cover preview"
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-[#888]">
            <ImageIcon size={32} />
            <span className="text-xs font-sans">No cover image</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <label className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E5E5] rounded-[4px] text-xs font-sans font-medium text-[#1A1A1A] cursor-pointer hover:border-[#E02020]/30 hover:text-[#E02020] transition-colors">
          <Upload size={12} />
          {preview && isNew
            ? "Change Image"
            : preview
            ? "Replace Image"
            : "Upload Image"}
          <input
            ref={inputRef}
            type="file"
            name={name}
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleChange}
            className="hidden"
          />
        </label>

        {preview && (
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center gap-1 text-xs text-[#555] hover:text-[#E02020] font-sans transition-colors"
          >
            <X size={12} /> Remove
          </button>
        )}
      </div>

      <p className="text-xs text-[#888] font-sans mt-2">
        JPG, PNG, WebP, or GIF. Max 8 MB. 16:10 aspect looks best.
      </p>

      {error && (
        <p className="text-xs text-[#CC0000] font-sans mt-2">{error}</p>
      )}

      {remove && !isNew && (
        <p className="text-xs text-[#CC0000] font-sans mt-2">
          Cover will be removed on save.
        </p>
      )}

      <input type="hidden" name="removeCover" value={remove ? "on" : ""} />
    </div>
  );
}
