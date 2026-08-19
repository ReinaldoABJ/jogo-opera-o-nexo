/**
 * ============================================================================
 * EventBus — Barramento de Eventos Desacoplado (Operação NEXO)
 * ============================================================================
 */
export class EventBus {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) this.events[eventName] = [];
    this.events[eventName].push(callback);
  }

  off(eventName, callback) {
    if (!this.events[eventName]) return;
    this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
  }

  emit(eventName, data = null) {
    if (!this.events[eventName]) return;
    this.events[eventName].forEach(callback => {
      try {
        callback(data);
      } catch (err) {
        console.error(`[EventBus] Erro ao executar ouvinte do evento "${eventName}":`, err);
      }
    });
  }
}
