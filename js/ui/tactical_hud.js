export class TacticalHUD {
    constructor(bus, audio) {
      this.bus = bus;
      this.audio = audio;
      this.isNatural = true;
      this.selectedProtoIdx = 0;
      this.polarities = []; // true = NOT, false = DIRETO
      this.slots = ['?', '?']; // Conectivos
      this.activeSlot = 0;
      this.isSituationOpen = false;
      this.isProtoGuideOpen = false;
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

    getSensorNarrative(sensors) {
      const entries = Object.entries(sensors || {});
      if (entries.length === 0) return 'Nenhum sinal telemétrico detectado na varredura deste setor.';

      const dictionary = {
        CIVIS_DETECTADOS: {
          trueVal: 'há presença de civis',
          falseVal: 'não há civis no local'
        },
        FOGO_ATIVO: {
          trueVal: 'fogo ativo no setor',
          falseVal: 'não possui fogo no momento'
        },
        GAS_TOXICO: {
          trueVal: 'vazamento de gás tóxico',
          falseVal: 'não possui gás'
        },
        BATERIA_DRONE: {
          trueVal: 'a bateria do drone deve ser considerada com carga',
          falseVal: 'a bateria do drone está com carga crítica'
        },
        ENERGIA_ESTAVEL: {
          trueVal: 'a rede de energia está estável',
          falseVal: 'não há energia estável na rede'
        },
        ESTRUTURA_ABALADA: {
          trueVal: 'a estrutura predial está abalada',
          falseVal: 'a estrutura predial permanece íntegra'
        },
        CIRCUITO_A: {
          trueVal: 'o circuito A está energizado',
          falseVal: 'o circuito A está desenergizado'
        },
        CIRCUITO_B: {
          trueVal: 'o circuito B está energizado',
          falseVal: 'o circuito B está desenergizado'
        },
        VALVULA_ABERTA: {
          trueVal: 'a válvula principal está aberta',
          falseVal: 'a válvula principal está fechada'
        },
        TEMPERATURA_CRITICA: {
          trueVal: 'a temperatura está em nível crítico',
          falseVal: 'a temperatura está normalizada'
        },
        SISTEMA_REFRIGERACAO: {
          trueVal: 'o sistema de refrigeração está ativo',
          falseVal: 'o sistema de refrigeração está inoperante'
        }
      };

      const clauses = entries.map(([k, v]) => {
        const item = dictionary[k];
        if (item) {
          return v ? item.trueVal : item.falseVal;
        }
        const friendlyName = k.toLowerCase().replace(/_/g, ' ');
        return v ? `${friendlyName} ativo` : `não possui ${friendlyName}`;
      });

      if (clauses.length === 0) return 'Nenhum dado telemétrico registrado.';

      clauses[0] = clauses[0].charAt(0).toUpperCase() + clauses[0].slice(1);

      if (clauses.length === 1) {
        return `${clauses[0]}.`;
      }
      if (clauses.length === 2) {
        return `${clauses[0]} e ${clauses[1]}.`;
      }

      const allExceptLast = clauses.slice(0, -1).join(', ');
      const last = clauses[clauses.length - 1];
      return `${allExceptLast}, e ${last}.`;
    }

    renderSector(sec, stageIdx = 0, stages = [], resolvedStages = new Set(), missionTitle = '', stageReports = []) {
      this.currentSector = sec;
      this.currentStageIdx = stageIdx;
      this.stages = stages || [];
      this.resolvedStages = resolvedStages || new Set();
      this.totalStages = stages.length || 1;
      this.missionTitle = missionTitle;
      this.stageReports = stageReports || [];

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

      // 1. Relatório da Inteligência (Narrativa Contínua no modo Natural, ou Grade de Códigos no modo Código)
      let sensorsSectionHtml = '';
      if (this.isNatural) {
        const narrativeText = this.getSensorNarrative(sec.sensors);
        sensorsSectionHtml = `
          <div class="sensor-narrative-box">
            <div class="sensor-narrative-body">${narrativeText}</div>
          </div>`;
      } else {
        let codeSensorsHtml = '';
        for (const [k, v] of Object.entries(sec.sensors || {})) {
          codeSensorsHtml += `
            <div class="sensor-box ${v ? 'val-true' : 'val-false'}">
              <span>${k}</span><strong>${v ? '🟢 TRUE' : '⚪ FALSE'}</strong>
            </div>`;
        }
        sensorsSectionHtml = `<div class="sensors-grid">${codeSensorsHtml}</div>`;
      }

      // 2. Abas de Protocolo Minimalistas & Guia Retrátil
      let tabsHtml = '';
      const greekLabels = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot'];
      protocols.forEach((p, idx) => {
        const active = idx === this.selectedProtoIdx ? 'is-active' : '';
        const rawLabel = p.type || greekLabels[idx] || `P${idx + 1}`;
        const cleanLabel = rawLabel.charAt(0).toUpperCase() + rawLabel.slice(1).toLowerCase();
        tabsHtml += `<button class="proto-tab-btn ${active}" data-idx="${idx}" title="${p.title}">${cleanLabel}</button>`;
      });

      const selectedLabel = (proto.type || greekLabels[this.selectedProtoIdx] || `P${this.selectedProtoIdx + 1}`);
      const cleanSelectedLabel = selectedLabel.charAt(0).toUpperCase() + selectedLabel.slice(1).toLowerCase();
      const protoFullTitle = proto.title || `Protocolo ${cleanSelectedLabel}`;
      const protoHint = proto.hint || 'Verifique a leitura dos sensores e conectores lógicos para assegurar a operação.';

      const protoGuideHtml = `
        <details class="proto-guide-accordion" id="proto-guide-details" ${this.isProtoGuideOpen ? 'open' : ''}>
          <summary class="proto-guide-summary">
            <span>ℹ️ Diretriz: Protocolo ${cleanSelectedLabel}</span>
            <span class="situation-chevron">▾</span>
          </summary>
          <div class="proto-guide-content">
            <div style="font-weight:700; color:#dbe4ec; margin-bottom:3px;">📋 ${protoFullTitle}</div>
            <div style="color:#9bb0c2; line-height:1.4;">💡 ${protoHint}</div>
          </div>
        </details>
      `;

      // 3. Fórmula com Polarity Toggles [ + / NOT ] e Conectivos [ ? ] (Pílulas Arredondadas)
      let formulaHtml = '<div style="display:flex; flex-wrap:wrap; align-items:center; gap:6px; font-family:var(--font-mono); font-size:0.88rem;">';
      if (tokens.length >= 2) formulaHtml += '<span style="color:#6e7d8a; font-weight:bold; font-size:1.05rem;">(</span>';

      tokens.forEach((token, idx) => {
        const isNot = !!this.polarities[idx];
        const polClass = isNot ? 'is-not' : 'is-direct';
        const polLabel = this.getPolarityLabel(isNot);

        formulaHtml += `
          <button class="polarity-btn ${polClass}" data-pidx="${idx}" title="Alternar Direto (+) ou Invertido (NOT)">
            ${polLabel}
          </button>
          <span class="sensor-token">${token}</span>
        `;

        if (idx === 1 && tokens.length > 2) {
          formulaHtml += '<span style="color:#6e7d8a; font-weight:bold; font-size:1.05rem;">)</span>';
        }

        if (idx < tokens.length - 1) {
          const slotVal = this.slots[idx] || '?';
          const isActiveSlot = idx === this.activeSlot ? 'is-active' : '';
          formulaHtml += `
            <button class="slot-btn ${isActiveSlot}" data-sidx="${idx}" title="Clique para selecionar este operador">
              ${this.getOpLabel(slotVal)}
            </button>
          `;
        }
      });
      formulaHtml += '</div>';

      const isCurrentSectorResolved = this.resolvedStages && (this.resolvedStages.has(stageIdx) || (sec.stage_id && this.resolvedStages.has(sec.stage_id)));
      const currentRep = (this.stageReports || []).find(r => r.stageIdx === stageIdx);
      const currentSaved = currentRep ? currentRep.isSaved : true;

      const situationReportHtml = sec.situation_report ? `
        <details class="situation-accordion" id="situation-details" ${this.isSituationOpen ? 'open' : ''}>
          <summary class="situation-summary">
            <span>${isCurrentSectorResolved ? (currentSaved ? '✅ Status: Pacificado' : '🏚️ Status: Colapso') : 'ℹ️ Relatório de Situação'}</span>
            <span class="situation-chevron">▾</span>
          </summary>
          <div class="situation-content">
            ${!isCurrentSectorResolved ? `
              <div style="display:flex; justify-content:space-between; margin-bottom:4px; font-size:0.72rem; color:#ff8888; font-family:var(--font-mono); font-weight:bold;">
                <span>🚨 EMERGÊNCIA</span>
                <span>⏱️ Ouro: 10s | Colapso: 130s</span>
              </div>
            ` : ''}
            <div>${isCurrentSectorResolved ? (currentSaved ? 'Setor pacificado e estrutura assegurada com sucesso!' : 'Estrutura não salva a tempo (Colapso predial — 0 pts).') : sec.situation_report}</div>
            ${!isCurrentSectorResolved ? `<div style="margin-top:4px; font-size:0.70rem; color:#8c9ba5;">💡 100% nos primeiros 10s. Danos a cada 30s. Após 130s, nota zero.</div>` : ''}
          </div>
        </details>
      ` : '';

      // Atualizar o nome do setor no Topo do Centro de Comando
      const stageChar = String.fromCharCode(65 + stageIdx);
      const rawSectorName = sec.sector_name || 'SETOR ATIVO';
      const cleanSectorName = rawSectorName.replace(/^Ponto\s+[A-Za-z0-9]+:\s*/i, '').trim();
      const activeSectorHeaderEl = document.getElementById('active-sector-header-name');
      if (activeSectorHeaderEl) {
        activeSectorHeaderEl.textContent = `[${stageChar}] ${cleanSectorName}`;
      }

      this.consoleEl.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
          <span class="console-section-title" style="margin-bottom:0; font-size:0.78rem; border-bottom:none;">📡 RELATÓRIO DA INTELIGÊNCIA</span>
          <button id="btn-toggle-syntax" class="btn-secondary-tactical" style="padding:2px 6px; font-size:0.72rem;">
            ${this.isNatural ? '🔤 Natural' : '💻 Código'}
          </button>
        </div>
        ${situationReportHtml}
        ${sensorsSectionHtml}
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:6px; margin-bottom:3px;">
          <span class="console-section-title" style="margin-bottom:0; font-size:0.76rem; border-bottom:none;">📋 PROTOCOLO TÁTICO</span>
        </div>
        <div class="proto-tabs-grid">${tabsHtml}</div>
        ${protoGuideHtml}
        <div class="protocol-card" style="margin-top:4px;">
          <div class="formula-display">${formulaHtml}</div>
          <div style="display:flex; justify-content:space-between; align-items:center; gap:6px;">
            <span style="font-size:0.72rem; color:var(--text-muted); white-space:nowrap;">Operador [ ? ]:</span>
            <div class="operator-palette" style="flex:1;">
              <button class="op-btn" data-op="AND">${this.getOpLabel('AND')}</button>
              <button class="op-btn" data-op="OR">${this.getOpLabel('OR')}</button>
              <button class="op-btn" data-op="XOR">${this.getOpLabel('XOR')}</button>
            </div>
          </div>
        </div>
        <div style="display:flex; gap:6px; margin-top:auto; padding-top:6px;">
          <button id="btn-exec" class="btn-tactical" style="flex:1;" ${isCurrentSectorResolved ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>
            ${isCurrentSectorResolved ? '✅ SETOR JÁ PACIFICADO' : '🚀 EXECUTAR PROTOCOLO'}
          </button>
          <button id="btn-hint" class="btn-secondary-tactical" style="color:#9bb0c2; font-size:0.78rem; padding:4px 8px;">💡 DICA</button>
        </div>
      `;

      // Eventos da Mesa
      const detailsEl = document.getElementById('situation-details');
      if (detailsEl) {
        detailsEl.ontoggle = () => {
          this.isSituationOpen = detailsEl.open;
        };
      }

      const guideDetailsEl = document.getElementById('proto-guide-details');
      if (guideDetailsEl) {
        guideDetailsEl.ontoggle = () => {
          this.isProtoGuideOpen = guideDetailsEl.open;
        };
      }

      document.getElementById('btn-toggle-syntax').onclick = () => {
        this.audio.playClick();
        this.isNatural = !this.isNatural;
        this.renderSector(sec, stageIdx, this.stages, this.resolvedStages, missionTitle, this.stageReports);
      };
      document.querySelectorAll('.proto-tab-btn').forEach(btn => {
        btn.onclick = () => {
          this.audio.playClick();
          this.selectedProtoIdx = parseInt(btn.getAttribute('data-idx'));
          this.polarities = [];
          this.slots = ['?', '?'];
          this.renderSector(sec, stageIdx, this.stages, this.resolvedStages, missionTitle, this.stageReports);
        };
      });
      document.querySelectorAll('.polarity-btn').forEach(btn => {
        btn.onclick = () => {
          this.audio.playClick();
          const pidx = parseInt(btn.getAttribute('data-pidx'));
          this.polarities[pidx] = !this.polarities[pidx];
          this.renderSector(sec, stageIdx, this.stages, this.resolvedStages, missionTitle, this.stageReports);
        };
      });
      document.querySelectorAll('.slot-btn').forEach(btn => {
        btn.onclick = () => {
          this.audio.playClick();
          this.activeSlot = parseInt(btn.getAttribute('data-sidx'));
          this.renderSector(sec, stageIdx, this.stages, this.resolvedStages, missionTitle, this.stageReports);
        };
      });
      document.querySelectorAll('.op-btn').forEach(btn => {
        btn.onclick = () => {
          this.audio.playClick();
          this.slots[this.activeSlot] = btn.getAttribute('data-op');
          this.activeSlot = (this.activeSlot + 1) % this.slots.length;
          this.renderSector(sec, stageIdx, this.stages, this.resolvedStages, missionTitle, this.stageReports);
        };
      });
      document.getElementById('btn-exec').onclick = () => {
        if (isCurrentSectorResolved) return;
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
