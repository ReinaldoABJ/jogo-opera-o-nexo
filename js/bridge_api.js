/**
 * ============================================================================
 * BridgeAPI — Ponte com o Backend do Arthur & Plataforma GameHub (Operação NEXO)
 * ============================================================================
 */
export class BridgeAPI {
  constructor(gameId = 'jogo_01_operacao_nexo') {
    this.gameId = gameId;
  }

  sendMatchResult(data) {
    const payload = {
      type: 'GAMEHUB_MATCH_FINISHED',
      gameId: this.gameId,
      timestamp: new Date().toISOString(),
      score: data.score || 0,
      stars: data.stars || 1,
      mode: data.mode || 'training',
      difficulty: data.difficulty || 'easy',
      completed: true
    };

    if (window.parent && window.parent !== window) {
      window.parent.postMessage(payload, '*');
    }
    console.log('[Operação NEXO] Telemetria de missão enviada ao backend:', payload);
    return payload;
  }
}
