import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.resolve(__dirname, '..', '..', 'assets', 'Logo+patron-universal-640w.webp');
const outDir = path.resolve(__dirname);

const RED = [220, 38, 38]; // #dc2626, matches the app's accent
const SIZE = 640;

const { data, info } = await sharp(src)
  .resize(SIZE, SIZE)
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;

// Find the bounding box of dark (non-white) pixels to locate the circle.
let minX = width, minY = height, maxX = 0, maxY = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * channels;
    const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;
    if (lum < 200) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

const cx = (minX + maxX) / 2;
const cy = (minY + maxY) / 2;
const radius = ((maxX - minX) + (maxY - minY)) / 4;

const out = Buffer.alloc(width * height * 4);
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * channels;
    const o = (y * width + x) * 4;
    const dx = x - cx;
    const dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;

    if (dist > radius + 1) {
      out[o] = 0; out[o + 1] = 0; out[o + 2] = 0; out[o + 3] = 0;
      continue;
    }

    // Soft edge antialiasing at the circle boundary.
    const edgeAlpha = dist > radius - 1.5 ? Math.max(0, Math.min(1, radius + 1 - dist)) : 1;

    if (lum < 128) {
      // Black fill -> red accent.
      out[o] = RED[0]; out[o + 1] = RED[1]; out[o + 2] = RED[2];
      out[o + 3] = Math.round(255 * edgeAlpha);
    } else {
      // White line work -> keep white.
      out[o] = 255; out[o + 1] = 255; out[o + 2] = 255;
      out[o + 3] = Math.round(255 * edgeAlpha);
    }
  }
}

await sharp(out, { raw: { width, height, channels: 4 } })
  .png()
  .toFile(path.join(outDir, 'pattern-red.png'));

console.log('circle center', cx, cy, 'radius', radius);
console.log('written', path.join(outDir, 'pattern-red.png'));
