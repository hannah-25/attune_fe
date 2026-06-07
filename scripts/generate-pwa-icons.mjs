import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourcePath = path.join(__dirname, '../src/assets/logo.png');

async function generate() {
  // Trim excess whitespace from source logo
  const trimmed = await sharp(sourcePath)
    .trim({ background: '#ffffff', threshold: 15 })
    .toBuffer();

  // pwa-192x192.png — any (5% padding each side)
  await sharp(trimmed)
    .resize(172, 172, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .extend({ top: 10, bottom: 10, left: 10, right: 10, background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(path.join(__dirname, '../public/pwa-192x192.png'));
  console.log('✓ pwa-192x192.png');

  // pwa-512x512.png — any (5% padding each side)
  await sharp(trimmed)
    .resize(460, 460, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .extend({ top: 26, bottom: 26, left: 26, right: 26, background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(path.join(__dirname, '../public/pwa-512x512.png'));
  console.log('✓ pwa-512x512.png');

  // pwa-maskable-512x512.png — maskable
  // Safe zone = inner 80% (410px). Logo fills safe zone, white bg extends to edges.
  await sharp(trimmed)
    .resize(410, 410, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .extend({ top: 51, bottom: 51, left: 51, right: 51, background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(path.join(__dirname, '../public/pwa-maskable-512x512.png'));
  console.log('✓ pwa-maskable-512x512.png');
}

generate().catch(console.error);
