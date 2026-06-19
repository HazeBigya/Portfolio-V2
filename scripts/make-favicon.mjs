// Generate a tailored favicon set → public/. Dev-only (sharp + png-to-ico).
// Brand: gradient rounded square + "B" monogram (matches the site's gradient).
import sharp from "sharp";
import pngToIco from "png-to-ico";
import { writeFile } from "node:fs/promises";

const svg = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#e879f9"/>
      <stop offset="50%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#34d399"/>
    </linearGradient>
  </defs>
  <rect x="16" y="16" width="480" height="480" rx="120" fill="url(#g)"/>
  <text x="256" y="262" text-anchor="middle" dominant-baseline="central"
        font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="320"
        fill="#0b0b14">B</text>
</svg>`;

// Source SVG favicon (modern browsers)
await writeFile("public/favicon.svg", svg);

const png = (size) => sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();

const targets = [
  [32, "public/favicon-32x32.png"],
  [16, "public/favicon-16x16.png"],
  [48, "public/favicon-48x48.png"],
  [180, "public/apple-touch-icon.png"],
  [192, "public/icon-192.png"],
  [512, "public/icon-512.png"],
];
for (const [size, out] of targets) {
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(out);
  console.log("wrote", out, `${size}x${size}`);
}

// Multi-size .ico (16/32/48) for legacy + Google
const ico = await pngToIco([await png(16), await png(32), await png(48)]);
await writeFile("public/favicon.ico", ico);
console.log("wrote public/favicon.ico");
