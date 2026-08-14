import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.resolve(__dirname, '..', '..', 'assets', 'kanji.jpg');
const outDir = path.resolve(__dirname);

// Crop just the first kanji (拳, "fist") from the calligraphy artwork,
// discarding the second glyph (法) and the "KENPŌ / MARTIAL WAY" text below it.
const crop = { left: 95, top: 50, width: 168, height: 190 };

const { data, info } = await sharp(src)
  .extract(crop)
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const out = Buffer.alloc(width * height * 4);

for (let p = 0; p < width * height; p++) {
  const i = p * channels;
  const o = p * 4;
  const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;
  // Brush strokes are near-white on a near-black background; use luminance as alpha
  // so anti-aliased edges stay smooth instead of a hard cutout.
  const alpha = Math.max(0, Math.min(255, Math.round((lum - 40) * (255 / (200 - 40)))));
  out[o] = 255; out[o + 1] = 255; out[o + 2] = 255; out[o + 3] = alpha;
}

await sharp(out, { raw: { width, height, channels: 4 } })
  .trim()
  .png()
  .toFile(path.join(outDir, 'kanji-fist.png'));

console.log('written', path.join(outDir, 'kanji-fist.png'));
