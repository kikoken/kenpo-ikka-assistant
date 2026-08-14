/**
 * Audio helper for Speech Synthesis and Web Audio Beeps
 */

let synth: SpeechSynthesis | null = null;
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  synth = window.speechSynthesis;
}

function pickBestVoice(voices: SpeechSynthesisVoice[], lang: string): SpeechSynthesisVoice | undefined {
  const langPrefix = lang.split('-')[0].toLowerCase();
  const candidates = voices.filter(v => v.lang.toLowerCase().startsWith(langPrefix));
  if (candidates.length === 0) return undefined;

  // Prefer an exact region match (en-US over en-GB/en-IN/etc).
  const exact = candidates.filter(v => v.lang.toLowerCase() === lang.toLowerCase());
  const pool = exact.length > 0 ? exact : candidates;

  // Online engines (Google, Microsoft "Online"/"Natural") sound far clearer
  // than the offline SAPI/eSpeak voices some OSes ship as the default.
  const highQuality = pool.find(v => /google|online|natural|neural/i.test(v.name));
  return highQuality || pool[0];
}

function speakSegment(text: string, lang: string) {
  if (!synth) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9;
  utterance.pitch = 1.0;

  const match = pickBestVoice(synth.getVoices(), lang);
  if (match) {
    utterance.voice = match;
    utterance.lang = match.lang;
  }

  synth.speak(utterance);
}

function speakTechniqueFallback(nro: number, nombreEs: string, ataque?: string, nombreEn?: string) {
  if (!synth) return;

  try {
    synth.cancel();
    const phrase = ataque
      ? `Técnica ${nro}: ${nombreEs}. Ataque: ${ataque}`
      : `Técnica ${nro}: ${nombreEs}`;
    speakSegment(phrase, 'es-ES');
    // Web Speech English quality varies wildly by device, but it's still
    // better than nothing for custom/imported techniques with no audio file.
    if (nombreEn) {
      speakSegment(nombreEn, 'en-US');
    }
  } catch (err) {
    console.warn('Speech synthesis error:', err);
  }
}

let currentAudioEls: HTMLAudioElement[] = [];
// Bumped on every call so stale event handlers (from audio we intentionally
// stopped) can tell they're no longer the active playback and no-op instead
// of firing the speech-synthesis fallback over the new audio.
let playbackToken = 0;

function stopTechniqueAudio() {
  currentAudioEls.forEach(a => {
    a.pause();
    a.removeAttribute('src');
    a.load();
  });
  currentAudioEls = [];
}

/**
 * Plays the pre-generated Spanish + English narration for a curriculum
 * technique (see scripts/gen-audio.mjs). Falls back to Web Speech Synthesis
 * for techniques without a matching audio file, e.g. ones imported from a
 * custom Google Sheet.
 */
export function speakTechnique(
  id: number,
  nro: number,
  nombreEs: string,
  ataque?: string,
  nombreEn?: string,
  speakVoice = true
) {
  if (!speakVoice) return;

  stopTechniqueAudio();
  synth?.cancel();

  const token = ++playbackToken;
  const isStale = () => token !== playbackToken;

  const esAudio = new Audio(`/audio/${id}-es.mp3`);
  currentAudioEls.push(esAudio);

  esAudio.addEventListener('error', () => {
    if (isStale()) return;
    speakTechniqueFallback(nro, nombreEs, ataque, nombreEn);
  });

  esAudio.addEventListener('ended', () => {
    if (isStale() || !nombreEn) return;
    const enAudio = new Audio(`/audio/${id}-en.mp3`);
    currentAudioEls.push(enAudio);
    enAudio.play().catch(() => {
      /* English clip missing or blocked; Spanish already played, skip silently */
    });
  });

  esAudio.play().catch(() => {
    if (isStale()) return;
    speakTechniqueFallback(nro, nombreEs, ataque, nombreEn);
  });
}

export function playBeep(type: 'prep' | 'start' | 'end' = 'prep', enabled = true) {
  if (!enabled || typeof window === 'undefined') return;

  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'prep') {
      // Short tick
      osc.frequency.setValueAtTime(440, now); // A4
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'start') {
      // High energetic tone
      osc.frequency.setValueAtTime(880, now); // A5
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'end') {
      // Success chime
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    }
  } catch (e) {
    console.warn('Audio context beep failed:', e);
  }
}
