import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourcePath = path.join(__dirname, '../src/assets/logo.png');

// Scale so HEIGHT fills targetH. If result is wider than canvasSize, crop sides
// symmetrically. If narrower, center horizontally with white padding.
// This prevents top/bottom letterboxing on landscape logos.
async function resizeByHeight(input, targetH, canvasSize, bg) {
  const meta = await sharp(input).metadata();
  const scaledW = Math.round((meta.width / meta.height) * targetH);
  const padV = Math.round((canvasSize - targetH) / 2);

  if (scaledW <= canvasSize) {
    const padH = Math.round((canvasSize - scaledW) / 2);
    return sharp(input)
      .resize(scaledW, targetH, { fit: 'fill' })
      .extend({ top: padV, bottom: canvasSize - targetH - padV, left: padH, right: canvasSize - scaledW - padH, background: bg })
      .png()
      .toBuffer();
  } else {
    // Wider than canvas: crop sides symmetrically
    const cropLeft = Math.round((scaledW - canvasSize) / 2);
    return sharp(input)
      .resize(scaledW, targetH, { fit: 'fill' })
      .extract({ left: cropLeft, top: 0, width: canvasSize, height: targetH })
      .extend({ top: padV, bottom: canvasSize - targetH - padV, left: 0, right: 0, background: bg })
      .png()
      .toBuffer();
  }
}

async function generate() {
  const bg = { r: 255, g: 255, b: 255, alpha: 1 };

  const trimmed = await sharp(sourcePath)
    .trim({ background: '#ffffff', threshold: 15 })
    .toBuffer();

  const meta = await sharp(trimmed).metadata();
  console.log(`Trimmed source: ${meta.width} x ${meta.height}`);

  // pwa-192x192.png — any (5% padding top/bottom)
  const buf192 = await resizeByHeight(trimmed, Math.round(192 * 0.90), 192, bg);
  await sharp(buf192).toFile(path.join(__dirname, '../public/pwa-192x192.png'));
  console.log('✓ pwa-192x192.png');

  // pwa-512x512.png — any (5% padding top/bottom)
  const buf512 = await resizeByHeight(trimmed, Math.round(512 * 0.90), 512, bg);
  await sharp(buf512).toFile(path.join(__dirname, '../public/pwa-512x512.png'));
  console.log('✓ pwa-512x512.png');

  // pwa-maskable-512x512.png — maskable (safe zone = inner 80%)
  const bufMask = await resizeByHeight(trimmed, Math.round(512 * 0.80), 512, bg);
  await sharp(bufMask).toFile(path.join(__dirname, '../public/pwa-maskable-512x512.png'));
  console.log('✓ pwa-maskable-512x512.png');
}

generate().catch(err => { console.error(err); process.exit(1); });
