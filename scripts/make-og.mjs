// Generate the Open Graph share card (1200×630) → public/og.png. Dev-only (sharp).
import sharp from "sharp";

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0a12"/>
      <stop offset="100%" stop-color="#06060a"/>
    </linearGradient>
    <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#e879f9"/>
      <stop offset="50%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#34d399"/>
    </linearGradient>
    <radialGradient id="glow" cx="80%" cy="20%" r="60%">
      <stop offset="0%" stop-color="#a855f7" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#a855f7" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <g font-family="Inter, Helvetica, Arial, sans-serif">
    <text x="80" y="150" font-size="25" letter-spacing="5" fill="#9ca3af">PRINCIPAL FULL-STACK &amp; CLOUD ENGINEER</text>

    <text x="78" y="290" font-size="120" font-weight="800" fill="#ffffff" letter-spacing="-2">BIGYA</text>
    <text x="78" y="410" font-size="120" font-weight="800" fill="url(#grad)" letter-spacing="-2">TULADHAR</text>

    <text x="80" y="500" font-size="32" fill="#d1d5db">AWS Serverless · Generative AI &amp; RAG · Real-time at scale</text>

    <text x="80" y="582" font-size="26" fill="#6b7280">bigya.com.np</text>
  </g>

  <rect x="80" y="525" width="640" height="5" rx="2.5" fill="url(#grad)"/>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile("public/og.png");
console.log("Wrote public/og.png (1200x630)");
