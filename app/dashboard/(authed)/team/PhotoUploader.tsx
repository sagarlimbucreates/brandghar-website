"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, User as UserIcon } from "lucide-react";

type Props = {
  name?: string;
  existingUrl?: string | null;
};

export default function PhotoUploader({
  name = "photoFile",
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
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be 5 MB or smaller.");
      e.target.value = "";
      return;
    }

    // Replace preview with the new file via an object URL.
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
        Photo
      </label>

      <div className="flex items-start gap-5">
        {/* Preview */}
        <div className="shrink-0">
          <div className="w-28 h-28 rounded-[8px] bg-[#F7F7F7] border border-[#E5E5E5] overflow-hidden flex items-center justify-center">
            {preview ? (
              <Image
                src={preview}
                alt="Preview"
                width={112}
                height={112}
                className="w-full h-full object-cover"
                unoptimized
              />
            ) : (
              <UserIcon size={32} className="text-[#888]" />
            )}
          </div>
          {preview && (
            <button
              type="button"
              onClick={handleClear}
              className="mt-2 inline-flex items-center gap-1 text-xs text-[#555] hover:text-[#E02020] font-sans transition-colors"
            >
              <X size={12} /> Remove
            </button>
          )}
        </div>

        {/* Input */}
        <div className="flex-1 min-w-0">
          <label
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E5E5E5] rounded-[4px] text-sm font-sans font-medium text-[#1A1A1A] cursor-pointer hover:border-[#E02020]/30 hover:text-[#E02020] transition-colors"
          >
            <Upload size={14} />
            {preview && isNew
              ? "Change Photo"
              : preview
              ? "Replace Photo"
              : "Upload Photo"}
            <input
              ref={inputRef}
              type="file"
              name={name}
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleChange}
              className="hidden"
            />
          </label>

          <p className="text-xs text-[#888] font-sans mt-2">
            JPG, PNG, WebP, or GIF. Max 5 MB. A square photo looks best.
          </p>

          {error && (
            <p className="text-xs text-[#CC0000] font-sans mt-2">{error}</p>
          )}

          {remove && !isNew && (
            <p className="text-xs text-[#CC0000] font-sans mt-2">
              Photo will be removed on save.
            </p>
          )}
        </div>
      </div>

      {/* Hidden flag that tells the server action to clear the existing photo */}
      <input type="hidden" name="removePhoto" value={remove ? "on" : ""} />
    </div>
  );
}
