/**
 * Gentle Web Audio API synthesizer for romantic ambient music box melody
 * and interactive chime feedback. Zero external assets required.
 */

class RomanticAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlayingMusic = false;
  private melodyTimeout: number | null = null;
  private masterGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft high bell chime for heart clicks and achievements
  public playTenderChime() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now); // A5
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.35);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.7);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Cartoon sound effects for the bunny
  public playAngryBunnyGrowl(intensity: number = 1) {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Lower pitch and more distortion as intensity increases
      osc.type = intensity >= 3 ? 'sawtooth' : 'triangle';
      const baseFreq = Math.max(65, 180 - intensity * 28);
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.linearRampToValueAtTime(baseFreq - 30, now + 0.4);

      const gainLevel = Math.min(0.2, 0.05 + intensity * 0.035);
      gain.gain.setValueAtTime(gainLevel, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    } catch {
      // Audio fallback
    }
  }

  public playHappyFanfare() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 triumphant arpeggio
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);
        gain.gain.setValueAtTime(0.09, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.5);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.5);
      });
    } catch {
      // Audio fallback
    }
  }

  // Simulated warm voice note tone
  public playVoiceSnippet(durationSec: number = 3, onEnded?: () => void) {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      // Play a warm melodic 3-tone arpeggio
      osc.frequency.setValueAtTime(329.63, now); // E4
      osc.frequency.setValueAtTime(392.00, now + 0.4); // G4
      osc.frequency.setValueAtTime(523.25, now + 0.9); // C5
      osc.frequency.setValueAtTime(440.00, now + 1.5); // A4
      osc.frequency.setValueAtTime(392.00, now + 2.1); // G4

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + durationSec);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + durationSec);

      if (onEnded) {
        setTimeout(onEnded, durationSec * 1000);
      }
    } catch {
      if (onEnded) onEnded();
    }
  }

  // Continuous music box melody (Romantic Lullaby Progression)
  public startAmbientMelody(onStateChange?: (playing: boolean) => void) {
    this.initContext();
    if (!this.ctx) return;
    this.isPlayingMusic = true;
    if (onStateChange) onStateChange(true);

    if (!this.masterGain) {
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.09, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }

    // Romantic music-box notes sequence [frequency in Hz, duration in beats]
    const notes = [
      523.25, 659.25, 783.99, 1046.50, // C5, E5, G5, C6
      587.33, 698.46, 880.00, 1046.50, // D5, F5, A5, C6
      493.88, 659.25, 783.99, 987.77,  // B4, E5, G5, B5
      440.00, 523.25, 659.25, 880.00,  // A4, C5, E5, A5
      392.00, 493.88, 587.33, 783.99,  // G4, B4, D5, G5
      349.23, 440.00, 523.25, 698.46,  // F4, A4, C5, F5
      523.25, 659.25, 783.99, 880.00,  // C5, E5, G5, A5
      493.88, 587.33, 783.99, 987.77   // B4, D5, G5, B5
    ];

    let noteIdx = 0;

    const playNextNote = () => {
      if (!this.isPlayingMusic || !this.ctx || !this.masterGain) return;

      const freq = notes[noteIdx % notes.length];
      const now = this.ctx.currentTime;

      // Soft music box bell: dual oscillator (sine + soft triangle harmonic)
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, now); // Octave chime overtone

      const noteDuration = 0.9;
      noteGain.gain.setValueAtTime(0.08, now);
      noteGain.gain.exponentialRampToValueAtTime(0.0005, now + noteDuration);

      osc1.connect(noteGain);
      osc2.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + noteDuration);
      osc2.stop(now + noteDuration);

      noteIdx++;
      // Time between notes: 480ms
      this.melodyTimeout = window.setTimeout(playNextNote, 480);
    };

    playNextNote();
  }

  public stopAmbientMelody(onStateChange?: (playing: boolean) => void) {
    this.isPlayingMusic = false;
    if (this.melodyTimeout) {
      clearTimeout(this.melodyTimeout);
      this.melodyTimeout = null;
    }
    if (onStateChange) onStateChange(false);
  }

  public toggleAmbientMelody(onStateChange?: (playing: boolean) => void): boolean {
    if (this.isPlayingMusic) {
      this.stopAmbientMelody(onStateChange);
      return false;
    } else {
      this.startAmbientMelody(onStateChange);
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlayingMusic;
  }
}

export const romanticAudio = new RomanticAudioSynthesizer();
