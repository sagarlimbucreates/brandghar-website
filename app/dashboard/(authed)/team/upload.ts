import "server-only";
import { writeFile, mkdir, unlink } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const UPLOAD_DIR = path.join(process.cwd(), "public", "medias", "team");
const PUBLIC_PREFIX = "/medias/team/";
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function saveTeamPhoto(file: File): Promise<string> {
  const ext = EXT_BY_MIME[file.type];
  if (!ext) {
    throw new Error(
      `Unsupported image type: ${file.type || "unknown"}. Use JPG, PNG, WebP, or GIF.`
    );
  }
  if (file.size === 0) {
    throw new Error("Uploaded file is empty.");
  }
  if (file.size > MAX_SIZE) {
    throw new Error("Image must be 5 MB or smaller.");
  }

  await mkdir(UPLOAD_DIR, { recursive: true });
  const filename = `${randomUUID()}.${ext}`;
  const filepath = path.join(UPLOAD_DIR, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filepath, buffer);

  return `${PUBLIC_PREFIX}${filename}`;
}

/**
 * Deletes a previously-uploaded team photo. Only removes files under the
 * managed `/medias/team/` prefix — external URLs or unmanaged paths are ignored.
 * Silently swallows "not found" errors.
 */
export async function deleteTeamPhoto(publicPath: string | null): Promise<void> {
  if (!publicPath || !publicPath.startsWith(PUBLIC_PREFIX)) return;
  const filename = publicPath.slice(PUBLIC_PREFIX.length);
  // Guard against path traversal.
  if (filename.includes("/") || filename.includes("..") || filename.length === 0) {
    return;
  }
  const filepath = path.join(UPLOAD_DIR, filename);
  try {
    await unlink(filepath);
  } catch {
    /* already gone, ignore */
  }
}
