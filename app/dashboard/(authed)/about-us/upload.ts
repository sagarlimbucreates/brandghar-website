import "server-only";
import { writeFile, mkdir, unlink } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const CLIENT_DIR = path.join(process.cwd(), "public", "medias", "clients");
const CLIENT_PREFIX = "/medias/clients/";

const STORY_DIR = path.join(process.cwd(), "public", "medias");
const STORY_PREFIX = "/medias/";

const MAX_SIZE = 5 * 1024 * 1024;

const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
};

async function saveTo(
  file: File,
  dir: string,
  prefix: string
): Promise<string> {
  const ext = EXT_BY_MIME[file.type];
  if (!ext) {
    throw new Error(
      `Unsupported image type: ${file.type || "unknown"}. Use JPG, PNG, WebP, SVG, or GIF.`
    );
  }
  if (file.size === 0) throw new Error("Uploaded file is empty.");
  if (file.size > MAX_SIZE) throw new Error("Image must be 5 MB or smaller.");

  await mkdir(dir, { recursive: true });
  const filename = `${randomUUID()}.${ext}`;
  const filepath = path.join(dir, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filepath, buffer);
  return `${prefix}${filename}`;
}

export async function saveClientLogo(file: File): Promise<string> {
  return saveTo(file, CLIENT_DIR, CLIENT_PREFIX);
}

export async function deleteClientLogo(publicPath: string | null): Promise<void> {
  if (!publicPath || !publicPath.startsWith(CLIENT_PREFIX)) return;
  const filename = publicPath.slice(CLIENT_PREFIX.length);
  if (filename.includes("/") || filename.includes("..") || filename.length === 0) {
    return;
  }
  try {
    await unlink(path.join(CLIENT_DIR, filename));
  } catch {
    /* ignore */
  }
}

export async function saveStoryImage(file: File): Promise<string> {
  // Our Story hero image lives at /medias/<uuid>.<ext>
  return saveTo(file, STORY_DIR, STORY_PREFIX);
}

export async function deleteStoryImage(publicPath: string | null): Promise<void> {
  // Only delete our-story-*.png style files under /medias/ that we uploaded.
  // To be safe, only delete files we identify by having a UUID prefix.
  if (!publicPath || !publicPath.startsWith(STORY_PREFIX)) return;
  const filename = publicPath.slice(STORY_PREFIX.length);
  if (filename.includes("/") || filename.includes("..") || filename.length === 0) {
    return;
  }
  // Heuristic: only delete files whose name is a UUID. Leaves legacy files like
  // our-story.png untouched so we don't clobber seeded assets.
  const uuidRe = /^[0-9a-f-]{36}\.[a-z]+$/i;
  if (!uuidRe.test(filename)) return;
  try {
    await unlink(path.join(STORY_DIR, filename));
  } catch {
    /* ignore */
  }
}
