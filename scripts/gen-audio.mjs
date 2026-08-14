import { build } from 'esbuild';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFile } from 'child_process';
import { promisify } from 'util';
import { mkdir } from 'fs/promises';

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataFile = path.resolve(__dirname, '..', 'src', 'data', 'kenpoData.ts');
const outDir = path.resolve(__dirname, '..', 'public', 'audio');

const result = await build({
  entryPoints: [dataFile],
  bundle: false,
  write: false,
  format: 'esm',
  platform: 'node',
});

const code = result.outputFiles[0].text;
const mod = await import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'));
const techniques = mod.RAW_KENPO_TECHNIQUES;

console.log(`Loaded ${techniques.length} techniques`);

const limit = process.env.GEN_LIMIT ? parseInt(process.env.GEN_LIMIT, 10) : undefined;
const targets = limit ? techniques.slice(0, limit) : techniques;

await mkdir(outDir, { recursive: true });

const ES_VOICE = 'es-MX-JorgeNeural';
const EN_VOICE = 'en-US-AriaNeural';

async function synth(voice, text, outFile) {
  await execFileAsync('edge-tts', ['--voice', voice, '--text', text, '--write-media', outFile]);
}

let done = 0;
const CONCURRENCY = 6;
const queue = [...targets];

async function worker() {
  while (queue.length > 0) {
    const t = queue.shift();
    if (!t) break;

    const esText = t.ataque
      ? `Técnica ${t.nro}: ${t.nombreEs}. Ataque: ${t.ataque}.`
      : `Técnica ${t.nro}: ${t.nombreEs}.`;
    const enText = t.nombreEn;

    const esFile = path.join(outDir, `${t.id}-es.mp3`);
    const enFile = path.join(outDir, `${t.id}-en.mp3`);

    try {
      await synth(ES_VOICE, esText, esFile);
      if (enText) await synth(EN_VOICE, enText, enFile);
      done++;
      if (done % 20 === 0) console.log(`${done}/${techniques.length}`);
    } catch (err) {
      console.error(`Failed for id ${t.id}:`, err.message);
    }
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, worker));
console.log(`Done: ${done}/${targets.length}`);
