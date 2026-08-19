/**
 * ============================================================================
 * InputManager — Gerenciador Unificado de Entradas (Operação NEXO)
 * ============================================================================
 */
export class InputManager {
  constructor(eventBus, canvas) {
    this.bus = eventBus;
    this.canvas = canvas;
    this.init();
  }

  init() {
    if (this.canvas) {
      this.canvas.addEventListener('pointerdown', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;

        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        this.bus.emit('MAP_CLICKED', { x, y });
      });
    }
  }
}
