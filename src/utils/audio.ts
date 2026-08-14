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

export function speakTechnique(textEs: string, speakVoice = true) {
  if (!speakVoice || !synth) return;

  try {
    synth.cancel(); // Stop any pending speech
    // Only the Spanish name is spoken: most devices lack a good English voice,
    // so an English utterance ends up mispronounced. The English name stays
    // visible on screen as a subtitle instead.
    speakSegment(textEs, 'es-ES');
  } catch (err) {
    console.warn('Speech synthesis error:', err);
  }
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
