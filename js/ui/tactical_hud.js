export class TacticalHUD {
    constructor(bus, audio) {
      this.bus = bus;
      this.audio = audio;
      this.isNatural = true;
      this.selectedProtoIdx = 0;
      this.polarities = []; // true = NOT, false = DIRETO
      this.slots = ['?', '?']; // Conectivos
      this.activeSlot = 0;
      this.consoleEl = document.getElementById('lateral-console');
    }

    getOpLabel(op) {
      if (!this.isNatural) return op;
      const map = { 'AND': 'E', 'OR': 'OU', 'NOT': 'NÃO', 'XOR': 'XOR', '?': '?' };
      return map[op] || op;
    }

    getPolarityLabel(isNot) {
      if (!isNot) return '+';
      return this.isNatural ? 'NÃO' : 'NOT';
    }

    renderSector(sec, stageIdx = 0, totalStages = 1, missionTitle = '') {
      this.currentSector = sec;
      this.currentStageIdx = stageIdx;
      this.totalStages = totalStages;
      this.missionTitle = missionTitle;

      if (!sec) {
        this.consoleEl.innerHTML = '<div style="padding:30px; text-align:center; color:#888;">🚁 AGUARDANDO DESIGNAR SETOR</div>';
        return;
      }

      const protocols = sec.protocols || [];
      const proto = protocols[this.selectedProtoIdx] || protocols[0];
      const tokens = proto.sensor_tokens || Object.keys(sec.sensors || {}).slice(0, 3);

      if (this.polarities.length !== tokens.length) {
        this.polarities = new Array(tokens.length).fill(false);
      }
      const neededConnectors = Math.max(1, tokens.length - 1);
      if (this.slots.length !== neededConnectors) {
        this.slots = new Array(neededConnectors).fill('?');
      }

      // 1. Sensores FLIR
      let sensorsHtml = '';
      for (const [k, v] of Object.entries(sec.sensors || {})) {
        sensorsHtml += `
          <div class="sensor-box ${v ? 'val-true' : 'val-false'}">
            <span>${k}</span><strong>${v ? '🟢 T' : '⚪ F'}</strong>
          </div>`;
      }

      // 2. Abas de Protocolo
      let tabsHtml = '';
      protocols.forEach((p, idx) => {
        const active = idx === this.selectedProtoIdx 
          ? 'border-color:var(--military-amber); color:var(--military-amber); background:rgba(229,160,13,0.18); font-weight:bold;' 
          : '';
        const shortTitle = p.title.includes('—') ? p.title.split('—')[1].trim() : p.title;
        tabsHtml += `<button class="btn-secondary-tactical proto-tab-btn" data-idx="${idx}" style="${active}" title="${p.title}">[${p.type || idx + 1}] ${shortTitle}</button>`;
      });

      // 3. Fórmula com Polarity Toggles [ + / NOT ] e Conectivos [ ? ]
      let formulaHtml = '<div style="display:flex; flex-wrap:wrap; align-items:center; gap:4px; font-family:var(--font-mono); font-size:0.84rem;">';
      if (tokens.length >= 2) formulaHtml += '<span style="color:#6e7d8a; font-weight:bold;">(</span>';

      tokens.forEach((token, idx) => {
        const isNot = !!this.polarities[idx];
        const polClass = isNot ? 'is-not' : 'is-direct';
        const polLabel = this.getPolarityLabel(isNot);

        formulaHtml += `
          <button class="polarity-btn ${polClass}" data-pidx="${idx}" title="Alternar Direto (+) ou Invertido (NOT)">
            [ ${polLabel} ]
          </button>
          <span class="sensor-token">${token}</span>
        `;

        if (idx === 1 && tokens.length > 2) {
          formulaHtml += '<span style="color:#6e7d8a; font-weight:bold;">)</span>';
        }

        if (idx < tokens.length - 1) {
          const slotVal = this.slots[idx] || '?';
          const isActiveSlot = idx === this.activeSlot ? 'is-active' : '';
          formulaHtml += `
            <button class="slot-btn ${isActiveSlot}" data-sidx="${idx}" title="Clique para selecionar este operador">
              [ ${this.getOpLabel(slotVal)} ]
            </button>
          `;
        }
      });
      formulaHtml += '</div>';

      const stageBadge = totalStages > 1 
        ? `<div style="font-size:0.72rem; background:rgba(229,160,13,0.15); color:var(--military-amber); border:1px solid rgba(229,160,13,0.35); padding:3px 6px; border-radius:3px; font-weight:bold; display:flex; justify-content:space-between;">
             <span>📍 ${missionTitle || 'SURTIDA TÁTICA'}</span>
             <span>ETAPA ${stageIdx + 1}/${totalStages}</span>
           </div>`
        : '';

      const situationReportHtml = sec.situation_report ? `
        <div class="situation-report-box">
          <strong style="color:var(--military-amber); font-size:0.7rem; letter-spacing:0.5px;">🚨 SITUAÇÃO:</strong> ${sec.situation_report}
        </div>
      ` : '';

      this.consoleEl.innerHTML = `
        ${stageBadge}
        ${situationReportHtml}
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="console-section-title">🛰️ SENSORES — ${sec.sector_name}</span>
          <button id="btn-toggle-syntax" class="btn-secondary-tactical" style="padding:1px 5px; font-size:0.7rem;">
            ${this.isNatural ? '🔤 Natural' : '💻 Código'}
          </button>
        </div>
        <div class="sensors-grid">${sensorsHtml}</div>
        <span class="console-section-title">📋 PROTOCOLO TÁTICO</span>
        <div class="proto-tabs-grid">${tabsHtml}</div>
        <div class="protocol-card">
          <div class="formula-display">${formulaHtml}</div>
          <div style="display:flex; justify-content:space-between; align-items:center; gap:6px;">
            <span style="font-size:0.7rem; color:var(--text-muted); white-space:nowrap;">Operador [ ? ]:</span>
            <div class="operator-palette" style="flex:1;">
              <button class="op-btn" data-op="AND">${this.getOpLabel('AND')}</button>
              <button class="op-btn" data-op="OR">${this.getOpLabel('OR')}</button>
              <button class="op-btn" data-op="XOR">${this.getOpLabel('XOR')}</button>
            </div>
          </div>
        </div>
        <div style="display:flex; gap:6px; margin-top:auto;">
          <button id="btn-exec" class="btn-tactical" style="flex:1;">🚀 EXECUTAR PROTOCOLO</button>
          <button id="btn-hint" class="btn-secondary-tactical" style="color:var(--military-amber);">💡 DICA</button>
        </div>
      `;

      // Eventos da Mesa
      document.getElementById('btn-toggle-syntax').onclick = () => {
        this.audio.playClick();
        this.isNatural = !this.isNatural;
        this.renderSector(sec, stageIdx, totalStages, missionTitle);
      };
      document.querySelectorAll('.proto-tab-btn').forEach(btn => {
        btn.onclick = () => {
          this.audio.playClick();
          this.selectedProtoIdx = parseInt(btn.getAttribute('data-idx'));
          this.polarities = [];
          this.slots = ['?', '?'];
          this.renderSector(sec, stageIdx, totalStages, missionTitle);
        };
      });
      document.querySelectorAll('.polarity-btn').forEach(btn => {
        btn.onclick = () => {
          this.audio.playClick();
          const pidx = parseInt(btn.getAttribute('data-pidx'));
          this.polarities[pidx] = !this.polarities[pidx];
          this.renderSector(sec, stageIdx, totalStages, missionTitle);
        };
      });
      document.querySelectorAll('.slot-btn').forEach(btn => {
        btn.onclick = () => {
          this.audio.playClick();
          this.activeSlot = parseInt(btn.getAttribute('data-sidx'));
          this.renderSector(sec, stageIdx, totalStages, missionTitle);
        };
      });
      document.querySelectorAll('.op-btn').forEach(btn => {
        btn.onclick = () => {
          this.audio.playClick();
          this.slots[this.activeSlot] = btn.getAttribute('data-op');
          this.activeSlot = (this.activeSlot + 1) % this.slots.length;
          this.renderSector(sec, stageIdx, totalStages, missionTitle);
        };
      });
      document.getElementById('btn-exec').onclick = () => {
        this.bus.emit('EXECUTE_PROTOCOL', {
          sector: sec,
          protocol: proto,
          tokens,
          polarities: this.polarities,
          connectors: this.slots,
          sensors: sec.sensors || {}
        });
      };
      document.getElementById('btn-hint').onclick = () => {
        this.audio.playHint();
        alert(`💡 DICA TÁTICA:\n${proto.hint || 'Verifique a compatibilidade do protocolo e a presença/ausência de gás ou civis.'}`);
      };
    }
  }

  // 8. TUTORIAL INTERATIVO / ONBOARDING DO COMANDANTE
