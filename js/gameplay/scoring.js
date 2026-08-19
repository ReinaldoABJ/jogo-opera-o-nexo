/**
 * ============================================================================
 * ScoringSystem — Pontuação Tática & Dificuldade (Operação NEXO)
 * ============================================================================
 */
export class ScoringSystem {
  constructor(eventBus) {
    this.bus = eventBus;
    this.currentScore = 0;
    this.currentDifficulty = 'easy'; // easy (1.0x), medium (1.5x), hard (2.0x)
    this.hintsUsed = 0;
    this.starsEarned = 0;

    this.multipliers = { easy: 1.0, medium: 1.5, hard: 2.0 };
  }

  setDifficulty(diff) {
    if (this.multipliers[diff]) {
      this.currentDifficulty = diff;
    }
  }

  registerHint() {
    this.hintsUsed++;
  }

  calculateResult(basePoints, timeRatio) {
    const mult = this.multipliers[this.currentDifficulty] || 1.0;
    const timeBonus = Math.floor(basePoints * 0.3 * Math.max(0, timeRatio));
    const penalty = Math.max(0.4, 1.0 - (this.hintsUsed * 0.2));

    const total = Math.floor((basePoints + timeBonus) * mult * penalty);
    this.currentScore += total;

    if (this.hintsUsed === 0 && timeRatio > 0.35) {
      this.starsEarned = 3;
    } else if (this.hintsUsed <= 1) {
      this.starsEarned = 2;
    } else {
      this.starsEarned = 1;
    }

    const res = {
      scoreGained: total,
      totalScore: this.currentScore,
      stars: this.starsEarned,
      multiplier: mult
    };

    this.bus.emit('SCORE_UPDATED', res);
    return res;
  }

  reset() {
    this.currentScore = 0;
    this.hintsUsed = 0;
    this.starsEarned = 0;
  }
}
