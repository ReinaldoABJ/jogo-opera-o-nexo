/**
 * ============================================================================
 * DevDebugConsole — Telemetria & Console de Diagnóstico (Operação NEXO)
 * ============================================================================
 */
export class DevDebugConsole {
  constructor(eventBus, gameContext) {
    this.bus = eventBus;
    this.game = gameContext;
    this.logs = [];
    this.isOpen = false;

    this.createDOM();
    this.setupListeners();
  }

  createDOM() {
    this.container = document.createElement('div');
    this.container.id = 'dev-debug-console';
    this.container.style.display = 'none';

    this.container.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #333; padding-bottom:4px;">
        <strong>⚡ Dev Console — Operação NEXO Telemetry</strong>
        <span id="debug-fps-badge" style="color:#ffff00;">FPS: --</span>
      </div>
      <div id="debug-logs" style="overflow-y:auto; flex:1; margin:6px 0; background:#000; padding:4px;"></div>
      <div style="display:flex; gap:6px;">
        <button id="btn-copy-debug" style="background:#238636; color:#fff; border:none; padding:4px 8px; border-radius:3px; font-size:0.75rem; cursor:pointer; flex:1;">
          📋 Copiar Relatório Técnico para o Logos (IA)
        </button>
        <button id="btn-clear-debug" style="background:#30363d; color:#fff; border:none; padding:4px 8px; border-radius:3px; font-size:0.75rem; cursor:pointer;">
          Limpar
        </button>
      </div>
    `;

    document.body.appendChild(this.container);
    this.logContainer = this.container.querySelector('#debug-logs');
    this.fpsBadge = this.container.querySelector('#debug-fps-badge');

    this.container.querySelector('#btn-copy-debug').onclick = () => this.copyReport();
    this.container.querySelector('#btn-clear-debug').onclick = () => {
      this.logs = [];
      this.logContainer.innerHTML = '';
    };
  }

  setupListeners() {
    window.addEventListener('keydown', (e) => {
      if (e.key === '~' || e.key === '`' || (e.ctrlKey && e.shiftKey && e.code === 'KeyD')) {
        e.preventDefault();
        this.toggle();
      }
    });
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.container.style.display = this.isOpen ? 'flex' : 'none';
  }

  log(msg, type = 'info') {
    const time = new Date().toLocaleTimeString();
    const entry = `[${time}] [${type.toUpperCase()}] ${msg}`;
    this.logs.push(entry);
    if (this.logs.length > 40) this.logs.shift();

    if (this.logContainer) {
      const line = document.createElement('div');
      line.style.color = type === 'error' ? '#ff4d4d' : type === 'warn' ? '#ffcc00' : '#4ec95c';
      line.textContent = entry;
      this.logContainer.appendChild(line);
      this.logContainer.scrollTop = this.logContainer.scrollHeight;
    }
  }

  updateFPS(fps) {
    if (this.fpsBadge) this.fpsBadge.textContent = `FPS: ${fps}`;
  }

  copyReport() {
    const report = {
      game: 'Operação NEXO: Comando & Resgate',
      timestamp: new Date().toISOString(),
      fps: this.game.gameLoop?.fps || 0,
      difficulty: this.game.scoring?.currentDifficulty || 'easy',
      mode: this.game.challengeEngine?.currentMode || 'training',
      recentLogs: this.logs.slice(-15)
    };

    navigator.clipboard.writeText(`\`\`\`json\n${JSON.stringify(report, null, 2)}\n\`\`\``).then(() => {
      alert('✅ Relatório técnico copiado! Cole no chat com o Logos/IA para diagnóstico.');
    });
  }
}
