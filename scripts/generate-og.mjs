// Génère l'image de partage (Open Graph 1200×630) et l'icône Apple.
// Usage : npm run og   (à relancer seulement si le logo ou le slogan change)
import { readFile } from 'node:fs/promises';
import sharp from 'sharp';

const root = new URL('../', import.meta.url);
const logo = await readFile(new URL('src/assets/logo.png', root));
const logoB64 = logo.toString('base64');

const font = "'Manrope', 'Inter', 'Segoe UI', 'DejaVu Sans', Arial, sans-serif";

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="88%" cy="18%" r="70%">
      <stop offset="0" stop-color="#FCB82A" stop-opacity="0.45"/>
      <stop offset="1" stop-color="#FCB82A" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#FFFCF5"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <image href="data:image/png;base64,${logoB64}" x="80" y="72" width="76" height="76"/>
  <text x="172" y="126" font-family="${font}" font-size="40" font-weight="800" fill="#1D1A14">Econoris</text>

  <text font-family="${font}" font-weight="800" fill="#1D1A14" font-size="70" letter-spacing="-1.5">
    <tspan x="80" y="275">Sachez ce que vous</tspan>
    <tspan x="80" y="360">pouvez dépenser,</tspan>
    <tspan x="80" y="445">avant de le dépenser.</tspan>
  </text>

  <text x="80" y="540" font-family="${font}" font-size="28" font-weight="600" fill="#57503F">
    Application de budget 100 % gratuite · Sans pub · Sans banque
  </text>

  <g transform="translate(860 150)">
    <rect width="260" height="150" rx="22" fill="#FFFFFF" stroke="#ECE3CF"/>
    <text x="24" y="48" font-family="${font}" font-size="20" font-weight="700" fill="#2E7D32">Reste à dépenser</text>
    <text x="24" y="106" font-family="${font}" font-size="48" font-weight="800" fill="#2E7D32">412 €</text>
    <rect x="24" y="124" width="212" height="8" rx="4" fill="#2E7D32" fill-opacity="0.15"/>
    <rect x="24" y="124" width="70" height="8" rx="4" fill="#2E7D32"/>
  </g>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(new URL('public/og-image.png', root).pathname);

await sharp({ create: { width: 180, height: 180, channels: 4, background: '#FFFCF5' } })
  .composite([{ input: await sharp(logo).resize(140, 140).toBuffer(), top: 20, left: 20 }])
  .png()
  .toFile(new URL('public/icons/apple-touch-icon.png', root).pathname);

console.log('og-image.png et apple-touch-icon.png générés.');
