// Build-time image optimization: downscale + WebP for the top-level public/*.png
// screenshots. Run with `node scripts/optimize-images.mjs`. Dev-only (sharp).
import sharp from "sharp";
import { readdir } from "node:fs/promises";
import path from "node:path";

const DIR = "public";
const MAX_W = 1000;
const QUALITY = 80;

const files = (await readdir(DIR)).filter((f) => f.toLowerCase().endsWith(".png"));
let saved = 0;
for (const f of files) {
  const inp = path.join(DIR, f);
  const out = path.join(DIR, f.replace(/\.png$/i, ".webp"));
  const img = sharp(inp);
  const meta = await img.metadata();
  const width = Math.min(meta.width ?? MAX_W, MAX_W);
  const info = await img.resize({ width, withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(out);
  console.log(`${f} -> ${path.basename(out)} (${(info.size / 1024).toFixed(0)}KB, ${info.width}px)`);
  saved += 1;
}
console.log(`\nDone: ${saved} images → webp.`);
