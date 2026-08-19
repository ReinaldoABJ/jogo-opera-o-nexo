/**
 * ============================================================================
 * ChallengeEngine — Motor de Emergências & Fases (Operação NEXO)
 * ============================================================================
 */
export class ChallengeEngine {
  constructor(eventBus, levelsData) {
    this.bus = eventBus;
    this.levelsData = levelsData || { pool_treino: [], pool_ranqueado: [] };
    this.currentMode = 'training';
    this.currentSectorIndex = 0;
    this.currentSector = null;
    this.activeTimer = 60;
    this.maxTime = 60;
  }

  setMode(mode) {
    this.currentMode = mode === 'ranked' ? 'ranked' : 'training';
    this.currentSectorIndex = 0;
  }

  getPool() {
    return this.currentMode === 'ranked' ? this.levelsData.pool_ranqueado : this.levelsData.pool_treino;
  }

  loadNextSector() {
    const pool = this.getPool();
    if (!pool || pool.length === 0) return null;

    if (this.currentSectorIndex >= pool.length) {
      this.currentSectorIndex = 0;
    }

    const raw = pool[this.currentSectorIndex];
    this.currentSector = this.processSector(raw);
    this.currentSectorIndex++;

    this.maxTime = this.currentSector.time_limit || 60;
    this.activeTimer = this.maxTime;

    this.bus.emit('SECTOR_LOADED', this.currentSector);
    return this.currentSector;
  }

  processSector(raw) {
    const sec = JSON.parse(JSON.stringify(raw));

    // Se tiver geradores de sensores paramétricos (Modo Ranqueado)
    if (raw.param_generators) {
      sec.sensors = {};
      for (const [key, conf] of Object.entries(raw.param_generators)) {
        if (conf.default !== undefined) {
          sec.sensors[key] = conf.default;
        } else {
          sec.sensors[key] = Math.random() > 0.5;
        }
      }
    }

    return sec;
  }

  updateTimer(dt) {
    if (this.activeTimer > 0) {
      this.activeTimer -= dt;
      if (this.activeTimer <= 0) {
        this.activeTimer = 0;
        this.bus.emit('TIME_EXPIRED', this.currentSector);
      }
    }
  }

  getTimeRatio() {
    return this.maxTime > 0 ? this.activeTimer / this.maxTime : 0;
  }
}
