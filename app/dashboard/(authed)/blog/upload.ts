import "server-only";
import { writeFile, mkdir, unlink } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const UPLOAD_DIR = path.join(process.cwd(), "public", "medias", "blog");
const PUBLIC_PREFIX = "/medias/blog/";
const MAX_SIZE = 8 * 1024 * 1024; // 8 MB

const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function saveBlogImage(file: File): Promise<string> {
  const ext = EXT_BY_MIME[file.type];
  if (!ext) {
    throw new Error(
      `Unsupported image type: ${file.type || "unknown"}. Use JPG, PNG, WebP, or GIF.`
    );
  }
  if (file.size === 0) throw new Error("Uploaded file is empty.");
  if (file.size > MAX_SIZE) throw new Error("Image must be 8 MB or smaller.");

  await mkdir(UPLOAD_DIR, { recursive: true });
  const filename = `${randomUUID()}.${ext}`;
  const filepath = path.join(UPLOAD_DIR, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filepath, buffer);

  return `${PUBLIC_PREFIX}${filename}`;
}

export async function deleteBlogImage(publicPath: string | null): Promise<void> {
  if (!publicPath || !publicPath.startsWith(PUBLIC_PREFIX)) return;
  const filename = publicPath.slice(PUBLIC_PREFIX.length);
  if (filename.includes("/") || filename.includes("..") || filename.length === 0) {
    return;
  }
  const filepath = path.join(UPLOAD_DIR, filename);
  try {
    await unlink(filepath);
  } catch {
    /* already gone */
  }
}
