/**
 * resize-thumbs.js
 *
 * Scans src/projects/{cat}/{slug}/thumbnail/ for image files.
 * If an image exceeds MAX_DIMENSION px or SIZE_THRESHOLD bytes, a resized
 * copy is written to docs/assets/thumbs/{slug}-{filename}.
 * Resized copies are skipped when they already exist and are newer than
 * the source (incremental, so repeated runs are fast).
 *
 * Supported formats: JPEG, PNG, WebP  (SVG / GIF are left as-is)
 *
 * Run:  node scripts/resize-thumbs.js
 */

"use strict";

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// ── config ────────────────────────────────────────────────────────────────────
const PROJECTS_DIR   = path.resolve(__dirname, "../src/projects");
const OUTPUT_DIR     = path.resolve(__dirname, "../docs/assets/thumbs");
const MAX_DIMENSION  = 600;   // px – resize if width OR height exceeds this
const SIZE_THRESHOLD = 100 * 1024; // bytes – resize if file is larger than this
const JPEG_QUALITY   = 80;
const PNG_QUALITY    = 80;    // 0-100 (sharp uses quality for PNG via pngquant-style compression)
const WEBP_QUALITY   = 82;

const SUPPORTED_EXT  = new Set([".jpg", ".jpeg", ".png", ".webp"]);
// ─────────────────────────────────────────────────────────────────────────────

async function needsResize(srcPath) {
  const stat = fs.statSync(srcPath);
  if (stat.size > SIZE_THRESHOLD) return true;

  const meta = await sharp(srcPath).metadata();
  return (meta.width > MAX_DIMENSION || meta.height > MAX_DIMENSION);
}

function outputName(slug, filename) {
  return `${slug}-${filename}`;
}

function isUpToDate(srcPath, destPath) {
  if (!fs.existsSync(destPath)) return false;
  const srcMtime  = fs.statSync(srcPath).mtimeMs;
  const destMtime = fs.statSync(destPath).mtimeMs;
  return destMtime >= srcMtime;
}

async function resizeImage(srcPath, destPath, ext) {
  const pipeline = sharp(srcPath).resize({
    width:  MAX_DIMENSION,
    height: MAX_DIMENSION,
    fit:    "inside",       // preserve aspect ratio, never crop
    withoutEnlargement: true,
  });

  if (ext === ".jpg" || ext === ".jpeg") {
    pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  } else if (ext === ".png") {
    pipeline.png({ quality: PNG_QUALITY, compressionLevel: 8 });
  } else if (ext === ".webp") {
    pipeline.webp({ quality: WEBP_QUALITY });
  }

  await pipeline.toFile(destPath);
}

async function main() {
  if (!fs.existsSync(PROJECTS_DIR)) {
    console.error("projects dir not found:", PROJECTS_DIR);
    process.exit(1);
  }

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const categories = fs
    .readdirSync(PROJECTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  let processed = 0, skipped = 0, unchanged = 0;

  for (const cat of categories) {
    const catPath = path.join(PROJECTS_DIR, cat);
    const slugs = fs
      .readdirSync(catPath, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    for (const slug of slugs) {
      const thumbDir = path.join(catPath, slug, "thumbnail");
      if (!fs.existsSync(thumbDir)) continue;

      const files = fs
        .readdirSync(thumbDir)
        .filter((f) => SUPPORTED_EXT.has(path.extname(f).toLowerCase()))
        .sort();

      if (files.length === 0) continue;

      // Only resize the first (primary) thumbnail – same as what the site uses
      const filename = files[0];
      const srcPath  = path.join(thumbDir, filename);
      const ext      = path.extname(filename).toLowerCase();
      const destName = outputName(slug, filename);
      const destPath = path.join(OUTPUT_DIR, destName);

      // Skip if resized copy is already fresh
      if (isUpToDate(srcPath, destPath)) {
        unchanged++;
        continue;
      }

      // Check whether this image actually needs resizing
      if (!(await needsResize(srcPath))) {
        // Image is already small – no resized copy needed; remove stale one if present
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        skipped++;
        continue;
      }

      await resizeImage(srcPath, destPath, ext);

      const srcKB  = Math.round(fs.statSync(srcPath).size  / 1024);
      const destKB = Math.round(fs.statSync(destPath).size / 1024);
      console.log(`  resized  ${slug}/${filename}  ${srcKB}KB → ${destKB}KB`);
      processed++;
    }
  }

  console.log(
    `\ndone — ${processed} resized, ${skipped} already small, ${unchanged} up-to-date`
  );
}

main().catch((err) => {
  console.error("resize-thumbs error:", err);
  process.exit(1);
});
