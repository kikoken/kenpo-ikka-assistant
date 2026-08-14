/**
 * Audio helper for Speech Synthesis and Web Audio Beeps
 */

let synth: SpeechSynthesis | null = null;
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  synth = window.speechSynthesis;
}

export function speakTechnique(textEs: string, textEn?: string, speakVoice = true) {
  if (!speakVoice || !synth) return;

  try {
    synth.cancel(); // Stop any pending speech

    const phrase = textEn ? `${textEs}. ${textEn}` : textEs;
    const utterance = new SpeechSynthesisUtterance(phrase);
    utterance.lang = 'es-ES';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Try to pick a clear voice if available
    const voices = synth.getVoices();
    const esVoice = voices.find(v => v.lang.startsWith('es') || v.lang.startsWith('ES'));
    if (esVoice) {
      utterance.voice = esVoice;
    }

    synth.speak(utterance);
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
