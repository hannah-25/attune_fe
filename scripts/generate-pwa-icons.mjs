import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourcePath = path.join(__dirname, '../src/assets/logo-square.png');

// Fit the image into the full canvas width while preserving vertical padding.
// Narrow images are centered with background fill; wide images are cropped symmetrically.
async function makeIcon(input, canvasSize, paddingRatio, bg) {
  const padding = Math.round(canvasSize * paddingRatio);
  const contentSize = canvasSize - padding * 2;

  const { width, height } = await sharp(input).metadata();
  const scaledW = Math.round((width / height) * contentSize);
  const fit = scaledW > canvasSize ? 'cover' : 'contain';

  return sharp(input)
    .resize(canvasSize, contentSize, { fit, background: bg, position: 'center' })
    .extend({ top: padding, bottom: padding, background: bg })
    .png()
    .toBuffer();
}

async function generate() {
  const bg = { r: 255, g: 255, b: 255, alpha: 1 };

  const trimmed = await sharp(sourcePath)
    .trim({ background: '#ffffff', threshold: 15 })
    .toBuffer();

  const { width, height } = await sharp(trimmed).metadata();
  console.log(`Trimmed source: ${width} x ${height}`);

  const icons = [
    { out: 'pwa-v2-192x192.png',         size: 192, padding: 0.05 },
    { out: 'pwa-v2-512x512.png',         size: 512, padding: 0.05 },
    { out: 'pwa-v2-maskable-512x512.png', size: 512, padding: 0.10 }, // safe zone = inner 80%
  ];

  for (const { out, size, padding } of icons) {
    const buf = await makeIcon(trimmed, size, padding, bg);
    await sharp(buf).toFile(path.join(__dirname, `../public/${out}`));
    console.log(`✓ ${out}`);
  }
}

generate().catch(err => { console.error(err); process.exit(1); });
