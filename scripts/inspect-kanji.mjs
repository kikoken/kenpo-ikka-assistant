import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.resolve(__dirname, '..', '..', 'assets', 'kanji.jpg');

const { data, info } = await sharp(src).raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

const rowBright = [];
for (let y = 0; y < height; y++) {
  let count = 0;
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * channels;
    const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;
    if (lum > 140) count++;
  }
  rowBright.push(count);
}

// Print bands of contiguous rows with bright pixels.
let inBand = false;
let start = 0;
for (let y = 0; y < height; y++) {
  const has = rowBright[y] > 2;
  if (has && !inBand) { inBand = true; start = y; }
  if (!has && inBand) { inBand = false; console.log(`band: y=${start}-${y - 1} (h=${y - start})`); }
}
if (inBand) console.log(`band: y=${start}-${height - 1}`);
