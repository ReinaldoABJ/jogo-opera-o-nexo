/**
 * ============================================================================
 * TacticalHUD — Mesa de Operações e Construtor de Protocolos Lógicos
 * ============================================================================
 * Gerencia a telemetria dos sensores, a seleção de protocolos táticos,
 * o preenchimento de slots de operadores e o Manual Lógico do Comandante.
 */
export class TacticalHUD {
  constructor(eventBus, a11y, audio) {
    this.bus = eventBus;
    this.a11y = a11y;
    this.audio = audio;

    this.isNaturalLanguage = true; // Alternador: E/OU/NÃO vs AND/OR/NOT
    this.selectedProtocolIndex = 0;
    this.currentSlots = ['?', '?'];
    this.activeSlotTarget = 0;

    this.consoleEl = document.getElementById('lateral-console');
    this.scoreBadge = document.getElementById('hud-score-badge');
    this.timeBadge = document.getElementById('hud-time-badge');
    this.streakBadge = document.getElementById('hud-streak-badge');

    this.setupModals();
  }

  updateScore(score) {
    if (this.scoreBadge) this.scoreBadge.textContent = `SCORE: ${score}`;
  }

  updateTimer(seconds) {
    if (this.timeBadge) this.timeBadge.textContent = `TIME: ${Math.ceil(seconds)}s`;
  }

  updateStreak(streak) {
    if (this.streakBadge) this.streakBadge.textContent = `🔥 OFENSIVA: ${streak}`;
  }

  toggleLanguageMode() {
    this.isNaturalLanguage = !this.isNaturalLanguage;
    this.renderActiveSector(this.currentSector);
  }

  getOpLabel(op) {
    if (!this.isNaturalLanguage) return op;
    const map = {
      'AND': 'E',
      'OR': 'OU',
      'NOT': 'NÃO',
      'XOR': 'XOR',
      '?': '?'
    };
    return map[op] || op;
  }

  renderActiveSector(sector) {
    this.currentSector = sector;
    if (!sector) {
      this.consoleEl.innerHTML = `
        <div style="text-align:center; padding:30px 10px; color:var(--text-muted);">
          <p>🚁 AGUARDANDO DESIGNAR SETOR</p>
          <small>Clique no mapa da cidade para enviar o drone de reconhecimento.</small>
        </div>
      `;
      return;
    }

    const proto = sector.protocols[this.selectedProtocolIndex] || sector.protocols[0];

    // Monta Sensores
    let sensorsHtml = '';
    for (const [key, val] of Object.entries(sector.sensors || {})) {
      sensorsHtml += `
        <div class="sensor-box ${val ? 'val-true' : 'val-false'}">
          <span>${key}</span>
          <strong>${val ? '🟢 TRUE' : '⚪ FALSE'}</strong>
        </div>
      `;
    }

    // Monta Seletor de Protocolos
    let protoTabsHtml = '';
    sector.protocols.forEach((p, idx) => {
      const activeStyle = idx === this.selectedProtocolIndex ? 'border-color:var(--military-amber); color:var(--military-amber);' : '';
      protoTabsHtml += `
        <button class="btn-secondary-tactical proto-tab-btn" data-idx="${idx}" style="${activeStyle}">
          ${p.title}
        </button>
      `;
    });

    // Formata a fórmula com os slots interativos
    let formulaHtml = proto.template;
    formulaHtml = formulaHtml.replace(/\[ \? \]/g, (match, offset) => {
      const slotIndex = formulaHtml.substring(0, offset).split('[ ? ]').length - 1;
      const currentVal = this.currentSlots[slotIndex] || '?';
      return `<button class="slot-btn" data-slot-idx="${slotIndex}">[ ${this.getOpLabel(currentVal)} ]</button>`;
    });

    this.consoleEl.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="console-section-title">🛰️ SENSORES FLIR — ${sector.sector_name || 'SETOR'}</span>
        <button id="btn-toggle-syntax" class="btn-secondary-tactical" style="padding:2px 6px; font-size:0.75rem;">
          ${this.isNaturalLanguage ? '🔤 Linguagem Natural' : '💻 Código Técnico'}
        </button>
      </div>

      <div class="sensors-grid">${sensorsHtml}</div>

      <span class="console-section-title">📋 PROTOCOLOS TÁTICOS</span>
      <div style="display:flex; gap:6px; flex-direction:column;">${protoTabsHtml}</div>

      <div class="protocol-card">
        <span class="protocol-title">Engenharia da Regra Lógica:</span>
        <div class="formula-display">${formulaHtml}</div>

        <span style="font-size:0.75rem; color:var(--text-muted);">Selecione o operador para preencher o slot ativo:</span>
        <div class="operator-palette">
          <button class="op-btn" data-op="AND">${this.getOpLabel('AND')}</button>
          <button class="op-btn" data-op="OR">${this.getOpLabel('OR')}</button>
          <button class="op-btn" data-op="NOT">${this.getOpLabel('NOT')}</button>
          <button class="op-btn" data-op="XOR">${this.getOpLabel('XOR')}</button>
        </div>
      </div>

      <div style="display:flex; gap:8px;">
        <button id="btn-execute-drone" class="btn-tactical" style="flex:1;">
          🚀 EXECUTAR PROTOCOLO
        </button>
        <button id="btn-tactical-hint" class="btn-secondary-tactical" style="color:var(--military-amber);" title="Pedir Telemetria">
          💡 DICA
        </button>
      </div>
    `;

    this.bindEvents(sector, proto);
  }

  bindEvents(sector, proto) {
    // Alternar modo de linguagem
    const toggleBtn = document.getElementById('btn-toggle-syntax');
    if (toggleBtn) {
      toggleBtn.onclick = () => {
        this.audio.playClick();
        this.toggleLanguageMode();
      };
    }

    // Trocar aba de protocolo
    document.querySelectorAll('.proto-tab-btn').forEach(btn => {
      btn.onclick = () => {
        this.audio.playClick();
        this.selectedProtocolIndex = parseInt(btn.getAttribute('data-idx'));
        this.currentSlots = ['?', '?'];
        this.renderActiveSector(sector);
      };
    });

    // Clicar em um slot
    document.querySelectorAll('.slot-btn').forEach(btn => {
      btn.onclick = () => {
        this.audio.playClick();
        this.activeSlotTarget = parseInt(btn.getAttribute('data-slot-idx'));
      };
    });

    // Inserir operador no slot ativo
    document.querySelectorAll('.op-btn').forEach(btn => {
      btn.onclick = () => {
        this.audio.playClick();
        const op = btn.getAttribute('data-op');
        this.currentSlots[this.activeSlotTarget] = op;
        this.activeSlotTarget = (this.activeSlotTarget + 1) % this.currentSlots.length;
        this.renderActiveSector(sector);
      };
    });

    // Executar Protocolo
    const execBtn = document.getElementById('btn-execute-drone');
    if (execBtn) {
      execBtn.onclick = () => {
        this.bus.emit('EXECUTE_PROTOCOL', {
          sector,
          protocol: proto,
          userOperators: this.currentSlots
        });
      };
    }

    // Pedir Dica
    const hintBtn = document.getElementById('btn-tactical-hint');
    if (hintBtn) {
      hintBtn.onclick = () => {
        this.audio.playHint();
        this.bus.emit('REQUEST_HINT', { sector, protocol: proto });
        alert(`💡 TELEMETRIA TÁTICA:\n${proto.hint || 'Verifique as relações E/OU entre sensores.'}\n(Penalidade aplicada no score)`);
        // Preenche o primeiro slot
        if (proto.correct_operators && proto.correct_operators[0]) {
          this.currentSlots[0] = proto.correct_operators[0];
          this.renderActiveSector(sector);
        }
      };
    }
  }

  setupModals() {
    // Modal de Manual Lógico
    const manualBtn = document.getElementById('btn-open-manual');
    const manualModal = document.getElementById('manual-modal');
    const closeManualBtn = document.getElementById('btn-close-manual');

    if (manualBtn && manualModal) {
      manualBtn.onclick = () => {
        this.audio.playClick();
        manualModal.style.display = 'flex';
      };
    }
    if (closeManualBtn && manualModal) {
      closeManualBtn.onclick = () => {
        manualModal.style.display = 'none';
      };
    }

    // Modal de Acessibilidade
    const a11yBtn = document.getElementById('btn-open-a11y');
    const a11yModal = document.getElementById('a11y-modal');
    const closeA11yBtn = document.getElementById('btn-close-a11y');

    if (a11yBtn && a11yModal) {
      a11yBtn.onclick = () => {
        this.audio.playClick();
        a11yModal.style.display = 'flex';
      };
    }
    if (closeA11yBtn && a11yModal) {
      closeA11yBtn.onclick = () => {
        a11yModal.style.display = 'none';
      };
    }
  }
}
