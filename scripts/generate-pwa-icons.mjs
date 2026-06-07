import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourcePath = path.join(__dirname, '../src/assets/logo-square.png');

async function generate() {
  const bg = { r: 255, g: 255, b: 255, alpha: 1 };

  const trimmed = await sharp(sourcePath)
    .trim({ background: '#ffffff', threshold: 15 })
    .toBuffer();

  const meta = await sharp(trimmed).metadata();
  console.log(`Trimmed source: ${meta.width} x ${meta.height}`);

  // pwa-192x192.png — any (5% padding each side)
  await sharp(trimmed)
    .resize(172, 172, { fit: 'contain', background: bg })
    .extend({ top: 10, bottom: 10, left: 10, right: 10, background: bg })
    .png()
    .toFile(path.join(__dirname, '../public/pwa-192x192.png'));
  console.log('✓ pwa-192x192.png');

  // pwa-512x512.png — any (5% padding each side)
  await sharp(trimmed)
    .resize(460, 460, { fit: 'contain', background: bg })
    .extend({ top: 26, bottom: 26, left: 26, right: 26, background: bg })
    .png()
    .toFile(path.join(__dirname, '../public/pwa-512x512.png'));
  console.log('✓ pwa-512x512.png');

  // pwa-maskable-512x512.png — maskable (safe zone = inner 80%)
  await sharp(trimmed)
    .resize(410, 410, { fit: 'contain', background: bg })
    .extend({ top: 51, bottom: 51, left: 51, right: 51, background: bg })
    .png()
    .toFile(path.join(__dirname, '../public/pwa-maskable-512x512.png'));
  console.log('✓ pwa-maskable-512x512.png');
}

generate().catch(err => { console.error(err); process.exit(1); });
