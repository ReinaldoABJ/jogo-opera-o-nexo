/**
 * ============================================================================
 * StorageManager — Persistência Tática Local (Operação NEXO)
 * ============================================================================
 */
export class StorageManager {
  constructor() {
    this.prefix = 'nexo_operacao_';
  }

  save(key, val) {
    try { localStorage.setItem(this.prefix + key, JSON.stringify(val)); } catch (e) {}
  }

  load(key, def = null) {
    try {
      const item = localStorage.getItem(this.prefix + key);
      return item !== null ? JSON.parse(item) : def;
    } catch (e) { return def; }
  }

  updateStreak() {
    const today = new Date().toISOString().split('T')[0];
    const streak = this.load('streak', { count: 0, lastDate: null });

    if (streak.lastDate === today) return streak.count;

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (streak.lastDate === yesterday) {
      streak.count += 1;
    } else {
      streak.count = 1;
    }
    streak.lastDate = today;
    this.save('streak', streak);
    return streak.count;
  }
}
