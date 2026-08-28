/**
 * ============================================================================
 * TacticalHUD — Mesa de Operações e Construtor de Protocolos Lógicos
 * ============================================================================
 * Gerencia a telemetria dos sensores, a seleção de protocolos táticos,
 * os botões de polaridade [ + / NOT ], os conectivos [ AND / OR / XOR ]
 * e a validação booleana matemática em tempo real.
 */
export class TacticalHUD {
  constructor(eventBus, a11y, audio) {
    this.bus = eventBus;
    this.a11y = a11y;
    this.audio = audio;

    this.isNaturalLanguage = true; // Alternador: E/OU/NÃO vs AND/OR/NOT
    this.selectedProtocolIndex = 0;
    this.polarities = []; // Array booleano: true = NOT, false = DIRETO
    this.slots = ['?', '?']; // Conectivos selecionados
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
    this.renderActiveSector(this.currentSector, this.currentStageIdx, this.totalStages, this.missionTitle);
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

  getPolarityLabel(isNot) {
    if (!isNot) return '+';
    return this.isNaturalLanguage ? 'NÃO' : 'NOT';
  }

  renderActiveSector(sector, stageIdx = 0, totalStages = 1, missionTitle = '') {
    this.currentSector = sector;
    this.currentStageIdx = stageIdx;
    this.totalStages = totalStages;
    this.missionTitle = missionTitle;

    if (!sector) {
      this.consoleEl.innerHTML = `
        <div style="text-align:center; padding:30px 10px; color:var(--text-muted);">
          <p>🚁 AGUARDANDO DESIGNAR SETOR</p>
          <small>Clique no mapa da cidade para enviar o drone de reconhecimento.</small>
        </div>
      `;
      return;
    }

    const protocols = sector.protocols || [];
    const proto = protocols[this.selectedProtocolIndex] || protocols[0];
    const tokens = proto.sensor_tokens || Object.keys(sector.sensors || {}).slice(0, 3);

    // Inicializa polaridades e slots se mudou de protocolo ou setor
    if (this.polarities.length !== tokens.length) {
      this.polarities = new Array(tokens.length).fill(false);
    }
    const neededConnectors = Math.max(1, tokens.length - 1);
    if (this.slots.length !== neededConnectors) {
      this.slots = new Array(neededConnectors).fill('?');
    }

    // 1. Monta Sensores FLIR
    let sensorsHtml = '';
    for (const [key, val] of Object.entries(sector.sensors || {})) {
      sensorsHtml += `
        <div class="sensor-box ${val ? 'val-true' : 'val-false'}">
          <span>${key}</span>
          <strong>${val ? '🟢 TRUE' : '⚪ FALSE'}</strong>
        </div>
      `;
    }

    // 2. Monta Seletor de Abas de Protocolo (2 a 4 opções)
    let protoTabsHtml = '';
    protocols.forEach((p, idx) => {
      const activeStyle = idx === this.selectedProtocolIndex 
        ? 'border-color:var(--military-amber); color:var(--military-amber); background:rgba(229,160,13,0.12);' 
        : '';
      protoTabsHtml += `
        <button class="btn-secondary-tactical proto-tab-btn" data-idx="${idx}" style="${activeStyle}">
          ${p.title}
        </button>
      `;
    });

    // 3. Monta a Fórmula com Toggles de Polaridade e Slots de Conectivos
    let formulaHtml = '<div style="display:flex; flex-wrap:wrap; align-items:center; gap:6px; font-family:var(--font-mono); font-size:0.88rem;">';
    
    if (tokens.length >= 2) formulaHtml += '<span style="color:#6e7d8a; font-weight:bold;">(</span>';

    tokens.forEach((token, idx) => {
      const isNot = !!this.polarities[idx];
      const polClass = isNot ? 'is-not' : 'is-direct';
      const polLabel = this.getPolarityLabel(isNot);

      // Botão de Polaridade + Nome do Sensor
      formulaHtml += `
        <button class="polarity-btn ${polClass}" data-pidx="${idx}" title="Alternar Direto (+) ou Invertido (NOT)">
          [ ${polLabel} ]
        </button>
        <span class="sensor-token">${token}</span>
      `;

      if (idx === 1 && tokens.length > 2) {
        formulaHtml += '<span style="color:#6e7d8a; font-weight:bold;">)</span>';
      }

      // Slot de Conectivo entre os termos
      if (idx < tokens.length - 1) {
        const slotVal = this.slots[idx] || '?';
        const isActiveSlot = idx === this.activeSlotTarget ? 'is-active' : '';
        formulaHtml += `
          <button class="slot-btn ${isActiveSlot}" data-slot-idx="${idx}" title="Clique para selecionar este operador">
            [ ${this.getOpLabel(slotVal)} ]
          </button>
        `;
      }
    });

    formulaHtml += '</div>';

    // Badge de Etapa / Surtida
    const stageBadge = totalStages > 1 
      ? `<div style="font-size:0.75rem; background:rgba(229,160,13,0.15); color:var(--military-amber); border:1px solid rgba(229,160,13,0.35); padding:4px 8px; border-radius:4px; margin-bottom:6px; font-weight:bold; display:flex; justify-content:space-between;">
           <span>📍 ${missionTitle || 'SURTIDA TÁTICA'}</span>
           <span>ETAPA ${stageIdx + 1} DE ${totalStages}</span>
         </div>`
      : '';

    this.consoleEl.innerHTML = `
      ${stageBadge}
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="console-section-title">🛰️ SENSORES FLIR — ${sector.sector_name || 'SETOR'}</span>
        <button id="btn-toggle-syntax" class="btn-secondary-tactical" style="padding:2px 6px; font-size:0.75rem;">
          ${this.isNaturalLanguage ? '🔤 Linguagem Natural' : '💻 Código Técnico'}
        </button>
      </div>

      <div class="sensors-grid">${sensorsHtml}</div>

      <span class="console-section-title">📋 ESCOLHA DO PROTOCOLO TÁTICO</span>
      <div style="display:flex; gap:6px; flex-direction:column;">${protoTabsHtml}</div>

      <div class="protocol-card">
        <span class="protocol-title">Engenharia da Regra Lógica:</span>
        <p style="font-size:0.75rem; color:var(--text-muted); margin:0;">
          Clique em <strong>[ + / NÃO ]</strong> para inverter polaridade e selecione o conectivo nos <strong>[ ? ]</strong>:
        </p>
        <div class="formula-display">${formulaHtml}</div>

        <span style="font-size:0.75rem; color:var(--text-muted);">Conectivo para o slot [ ? ] ativo:</span>
        <div class="operator-palette">
          <button class="op-btn" data-op="AND">${this.getOpLabel('AND')}</button>
          <button class="op-btn" data-op="OR">${this.getOpLabel('OR')}</button>
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

    this.bindEvents(sector, proto, tokens);
  }

  bindEvents(sector, proto, tokens) {
    // 1. Alternar modo de linguagem
    const toggleBtn = document.getElementById('btn-toggle-syntax');
    if (toggleBtn) {
      toggleBtn.onclick = () => {
        this.audio.playClick();
        this.toggleLanguageMode();
      };
    }

    // 2. Trocar aba de protocolo
    document.querySelectorAll('.proto-tab-btn').forEach(btn => {
      btn.onclick = () => {
        this.audio.playClick();
        this.selectedProtocolIndex = parseInt(btn.getAttribute('data-idx'));
        this.polarities = [];
        this.slots = ['?', '?'];
        this.renderActiveSector(sector, this.currentStageIdx, this.totalStages, this.missionTitle);
      };
    });

    // 3. Toggle de Polaridade [ + / NOT ]
    document.querySelectorAll('.polarity-btn').forEach(btn => {
      btn.onclick = () => {
        this.audio.playClick();
        const pidx = parseInt(btn.getAttribute('data-pidx'));
        this.polarities[pidx] = !this.polarities[pidx];
        this.renderActiveSector(sector, this.currentStageIdx, this.totalStages, this.missionTitle);
      };
    });

    // 4. Clicar em um slot de conectivo
    document.querySelectorAll('.slot-btn').forEach(btn => {
      btn.onclick = () => {
        this.audio.playClick();
        this.activeSlotTarget = parseInt(btn.getAttribute('data-slot-idx'));
        this.renderActiveSector(sector, this.currentStageIdx, this.totalStages, this.missionTitle);
      };
    });

    // 5. Inserir operador no slot ativo
    document.querySelectorAll('.op-btn').forEach(btn => {
      btn.onclick = () => {
        this.audio.playClick();
        const op = btn.getAttribute('data-op');
        this.slots[this.activeSlotTarget] = op;
        this.activeSlotTarget = (this.activeSlotTarget + 1) % this.slots.length;
        this.renderActiveSector(sector, this.currentStageIdx, this.totalStages, this.missionTitle);
      };
    });

    // 6. Executar Protocolo
    const execBtn = document.getElementById('btn-execute-drone');
    if (execBtn) {
      execBtn.onclick = () => {
        this.bus.emit('EXECUTE_PROTOCOL', {
          sector,
          protocol: proto,
          tokens,
          polarities: this.polarities,
          connectors: this.slots,
          sensors: sector.sensors || {}
        });
      };
    }

    // 7. Pedir Dica
    const hintBtn = document.getElementById('btn-tactical-hint');
    if (hintBtn) {
      hintBtn.onclick = () => {
        this.audio.playHint();
        this.bus.emit('REQUEST_HINT', { sector, protocol: proto });
        alert(`💡 DICA TÁTICA:\n${proto.hint || 'Verifique a compatibilidade do protocolo e a presença/ausência de gás ou civis.'}`);
      };
    }
  }

  setupModals() {
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
