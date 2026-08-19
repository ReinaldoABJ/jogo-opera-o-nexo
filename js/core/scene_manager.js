/**
 * ============================================================================
 * SceneManager — Gerenciador de Cenas & Estados (Operação NEXO)
 * ============================================================================
 */
export class SceneManager {
  constructor(eventBus) {
    this.bus = eventBus;
    this.currentSceneName = 'menu';
  }

  changeScene(name, params = {}) {
    this.currentSceneName = name;
    this.bus.emit('SCENE_CHANGED', { scene: name, params });
  }
}
