/**
 * optimize-images.js — In-place WebP compression using Sharp
 * Reduces all images to max 1920px, quality 78 (visually lossless).
 * Run: node optimize-images.js
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Using relative paths to avoid issues with spaces in the absolute directory path
const ASSETS_DIR  = 'src/assets';
const MAX_DIM     = 1920;
const QUALITY     = 78;
const SKIP_UNDER  = 300_000; // skip if already under 300 KB

const files = fs.readdirSync(ASSETS_DIR)
  .filter(f => /\.webp$/i.test(f))
  .map(f => path.join(ASSETS_DIR, f));

let totalBefore = 0, totalAfter = 0, skipped = 0, processed = 0;

console.log(`\n🔧 Optimizing ${files.length} images in src/assets/ (in-place)\n`);

for (const file of files) {
  // Normalize path to use forward slashes so libvips parses it cleanly on all shells
  const normalizedFile = file.replace(/\\/g, '/');
  const sizeBefore = fs.statSync(normalizedFile).size;
  totalBefore += sizeBefore;

  if (sizeBefore < SKIP_UNDER) {
    console.log(`  ⏭  ${path.basename(normalizedFile).slice(0,55).padEnd(56)} ${(sizeBefore/1024).toFixed(0).padStart(5)} KB — already small`);
    totalAfter += sizeBefore;
    skipped++;
    continue;
  }

  try {
    const inputBuffer = fs.readFileSync(normalizedFile);
    const buf = await sharp(inputBuffer)
      .resize({ width: MAX_DIM, height: MAX_DIM, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toBuffer();

    fs.writeFileSync(normalizedFile, buf);

    const sizeAfter = buf.length;
    totalAfter += sizeAfter;
    processed++;

    const pct = ((1 - sizeAfter / sizeBefore) * 100).toFixed(1);
    const before = (sizeBefore / 1024).toFixed(0).padStart(5);
    const after  = (sizeAfter  / 1024).toFixed(0).padStart(5);
    console.log(`  ✅ ${path.basename(normalizedFile).slice(0,55).padEnd(56)} ${before} KB → ${after} KB  (${pct}% saved)`);
  } catch (err) {
    console.error(`  ❌ ${path.basename(normalizedFile)}: ${err.message}`);
    totalAfter += sizeBefore;
  }
}


const savedMB = ((totalBefore - totalAfter) / 1024 / 1024).toFixed(1);
const savedPct = ((1 - totalAfter / totalBefore) * 100).toFixed(1);

console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Processed : ${processed} images compressed
  Skipped   : ${skipped} images (already optimized)
  Before    : ${(totalBefore / 1024 / 1024).toFixed(1)} MB total
  After     : ${(totalAfter  / 1024 / 1024).toFixed(1)} MB total
  Saved     : ${savedMB} MB  (${savedPct}% reduction)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

