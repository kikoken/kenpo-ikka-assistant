import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '..', 'public');
const patternPath = path.join(__dirname, 'pattern-red.png');

const BG = '#121417';

async function makeIcon({ size, padding, background = BG }) {
  const inner = Math.round(size * (1 - padding * 2));
  const patternBuf = await sharp(patternPath).resize(inner, inner).png().toBuffer();

  return sharp({
    create: { width: size, height: size, channels: 4, background },
  })
    .composite([{ input: patternBuf, gravity: 'center' }])
    .png()
    .toBuffer();
}

const targets = [
  { file: 'pwa-192x192.png', size: 192, padding: 0.08 },
  { file: 'pwa-512x512.png', size: 512, padding: 0.08 },
  { file: 'apple-touch-icon.png', size: 180, padding: 0.1 },
  { file: 'favicon-32x32.png', size: 32, padding: 0.04 },
  { file: 'favicon-16x16.png', size: 16, padding: 0.02 },
  // Maskable needs a larger safe-zone padding so Android's mask doesn't clip the pattern.
  { file: 'pwa-maskable-512x512.png', size: 512, padding: 0.2 },
];

for (const t of targets) {
  const buf = await makeIcon(t);
  await sharp(buf).toFile(path.join(publicDir, t.file));
}

console.log('Icons generated in', publicDir);
