/**
 * ============================================================================
 * AudioSystem — Síntese Sonora Militar & Beeps Táticos (Web Audio API)
 * ============================================================================
 */
export class AudioSystem {
  constructor(eventBus) {
    this.bus = eventBus;
    this.ctx = null;
    this.volume = 0.4;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, type = 'sine', duration = 0.1, startDelay = 0) {
    this.init();
    if (!this.ctx) return;

    try {
      const startTime = this.ctx.currentTime + startDelay;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(this.volume, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch (e) {}
  }

  playClick() {
    this.playTone(800, 'triangle', 0.04);
  }

  playRadarPing() {
    this.playTone(1200, 'sine', 0.1);
  }

  playSuccess() {
    this.playTone(440, 'triangle', 0.1, 0);
    this.playTone(554.37, 'triangle', 0.1, 0.08);
    this.playTone(659.25, 'triangle', 0.2, 0.16);
  }

  playError() {
    this.playTone(180, 'sawtooth', 0.2);
  }

  playHint() {
    this.playTone(950, 'sine', 0.15);
  }

  playDroneFlight() {
    this.playTone(120, 'sine', 0.08);
  }
}
