/**
 * ============================================================================
 * Operação NEXO: Comando & Resgate — Standalone Engine Bundle (v2.0)
 * ============================================================================
 * Inclui: Menu Inicial Tático, Pausa Operacional, Animações de Vitória e Derrota,
 * Trava Diária de Ranqueado (1 por dia) e Isolamento de Score no Modo Treino.
 */

(function () {
  'use strict';

  // 1. DADOS DE TRADUÇÃO (i18n)
  const I18N_DATA = {
    "pt-br": {
      "game_title": "Operação NEXO: Comando & Resgate",
      "game_subtitle": "Centro de Comando Tático — Defesa Civil & Resgate",
      "btn_play_ranked": "⚔️ Desafio Diário (Ranqueado)",
      "btn_play_training": "🎓 Central de Treinamento (Livre)",
      "btn_settings": "⚙️ Acessibilidade & Opções",
      "btn_manual": "📖 Manual Lógico do Comandante",
      "difficulty_title": "Nível de Prontidão Operacional",
      "diff_easy": "🟢 Nível Alpha (1.0x) — Ritmo Básico",
      "diff_medium": "🟡 Nível Bravo (1.5x) — Operações Padrão",
      "diff_hard": "🔴 Nível Charlie (2.0x) — Situação Crítica",
      "score_label": "Pontuação:",
      "time_label": "Tempo:",
      "streak_label": "Ofensiva:",
      "btn_hint": "💡 Telemetria Tática (Dica)",
      "btn_execute_protocol": "🚀 EXECUTAR PROTOCOLO DO DRONE",
      "btn_abort": "ABORTAR SETOR",
      "victory_title": "🎖️ SETOR PACIFICADO COM SUCESSO!",
      "gameover_title": "💥 FALHA OPERACIONAL / RISCO NÃO TRATADO",
      "manual_title": "📖 Manual Lógico do Comandante",
      "manual_and": "E (AND): Ambas as condições devem ser verdadeiras para acionar.",
      "manual_or": "OU (OR): Se pelo menos uma das condições for verdadeira, aciona.",
      "manual_not": "NÃO (NOT): Inverte o valor. (Se perigo for Falso, NOT(perigo) é Verdadeiro).",
      "manual_xor": "XOR: Apenas uma das condições pode ser verdadeira, nunca ambas.",
      "accessibility_title": "⚙️ Acessibilidade & Inclusão",
      "lang_select": "Idioma:",
      "colorblind_mode": "Filtro de Visão:",
      "colorblind_none": "Padrão Militar",
      "colorblind_protanopia": "Protanopia (Ajuste Vermelho)",
      "colorblind_deuteranopia": "Deuteranopia (Ajuste Verde)",
      "colorblind_tritanopia": "Tritanopia (Ajuste Azul)",
      "colorblind_high_contrast": "Alto Contraste Militar",
      "reduced_motion": "Desativar flashes e tremores de tela",
      "btn_proceed": "Confirmar & Continuar",
      "btn_menu": "🏠 Centro de Comando",
      "btn_pause": "⏸️ Pausar",
      "btn_resume": "▶️ Continuar Operação",
      "btn_restart": "🔄 Reiniciar Setor"
    },
    "en": {
      "game_title": "Operation NEXO: Command & Rescue",
      "game_subtitle": "Tactical Command Center — Civil Defense & Rescue",
      "btn_play_ranked": "⚔️ Daily Challenge (Ranked)",
      "btn_play_training": "🎓 Training Center (Free)",
      "btn_settings": "⚙️ Accessibility & Options",
      "btn_manual": "📖 Commander's Logic Manual",
      "difficulty_title": "Operational Readiness Level",
      "diff_easy": "🟢 Alpha Level (1.0x) — Basic Protocol",
      "diff_medium": "🟡 Bravo Level (1.5x) — Standard Ops",
      "diff_hard": "🔴 Charlie Level (2.0x) — Critical Crisis",
      "score_label": "Score:",
      "time_label": "Time:",
      "streak_label": "Streak:",
      "btn_hint": "💡 Tactical Sensor Scan (Hint)",
      "btn_execute_protocol": "🚀 EXECUTE DRONE PROTOCOL",
      "btn_abort": "ABORT SECTOR",
      "victory_title": "🎖️ SECTOR EVACUATED SUCCESSFULLY!",
      "gameover_title": "💥 OPERATIONAL FAILURE / UNRESOLVED RISK",
      "manual_title": "📖 Commander's Logic Manual",
      "manual_and": "AND: Both conditions must be true to engage.",
      "manual_or": "OR: If at least one condition is true, engages.",
      "manual_not": "NOT: Inverts value. (If danger is False, NOT(danger) is True).",
      "manual_xor": "XOR: Only one condition can be true, never both.",
      "accessibility_title": "⚙️ Accessibility & Inclusion",
      "lang_select": "Language:",
      "colorblind_mode": "Vision Filter:",
      "colorblind_none": "Standard Military",
      "colorblind_protanopia": "Protanopia (Red Adjust)",
      "colorblind_deuteranopia": "Deuteranopia (Green Adjust)",
      "colorblind_tritanopia": "Tritanopia (Blue Adjust)",
      "colorblind_high_contrast": "High Contrast Military",
      "reduced_motion": "Disable screen flashes and heavy shakes",
      "btn_proceed": "Confirm & Proceed",
      "btn_menu": "🏠 Command Center",
      "btn_pause": "⏸️ Pause",
      "btn_resume": "▶️ Resume Operation",
      "btn_restart": "🔄 Restart Sector"
    },
    "es": {
      "game_title": "Operación NEXO: Comando y Rescate",
      "game_subtitle": "Centro de Comando Táctico — Defensa Civil y Rescate",
      "btn_play_ranked": "⚔️ Desafío Diario (Clasificatorio)",
      "btn_play_training": "🎓 Centro de Entrenamiento (Libre)",
      "btn_settings": "⚙️ Accesibilidad y Opciones",
      "btn_manual": "📖 Manual Lógico del Comandante",
      "difficulty_title": "Nivel de Preparación Operativa",
      "diff_easy": "🟢 Nivel Alpha (1.0x) — Ritmo Básico",
      "diff_medium": "🟡 Nivel Bravo (1.5x) — Operación Estándar",
      "diff_hard": "🔴 Nivel Charlie (2.0x) — Crisis Crítica",
      "score_label": "Puntuación:",
      "time_label": "Tiempo:",
      "streak_label": "Racha:",
      "btn_hint": "💡 Telemetría Táctica (Pista)",
      "btn_execute_protocol": "🚀 EJECUTAR PROTOCOLO DEL DRON",
      "btn_abort": "ABORTAR SECTOR",
      "victory_title": "🎖️ ¡SECTOR EVACUADO CON ÉXITO!",
      "gameover_title": "💥 FALLA OPERACIONAL / RIESGO NO TRATADO",
      "manual_title": "📖 Manual Lógico del Comandante",
      "manual_and": "Y (AND): Ambas condiciones deben ser verdaderas para activarse.",
      "manual_or": "O (OR): Si al menos una condición es verdadera, se activa.",
      "manual_not": "NO (NOT): Invierte el valor. (Si peligro es Falso, NOT(peligro) es Verdadero).",
      "manual_xor": "XOR: Solo una condición puede ser verdadera, nunca ambas.",
      "accessibility_title": "⚙️ Accesibilidad e Inclusión",
      "lang_select": "Idioma:",
      "colorblind_mode": "Filtro de Visión:",
      "colorblind_none": "Militar Estándar",
      "colorblind_protanopia": "Protanopía (Ajuste Rojo)",
      "colorblind_deuteranopia": "Deuteranopía (Ajuste Verde)",
      "colorblind_tritanopia": "Tritanopía (Ajuste Azul)",
      "colorblind_high_contrast": "Alto Contraste Militar",
      "reduced_motion": "Desactivar destellos y vibraciones",
      "btn_proceed": "Confirmar y Continuar",
      "btn_menu": "🏠 Centro de Comando",
      "btn_pause": "⏸️ Pausar",
      "btn_resume": "▶️ Reanudar Operación",
      "btn_restart": "🔄 Reiniciar Sector"
    }
  };

  // 2. DADOS DE FASES (LEVELS)
  const LEVELS_DATA = {
    "pool_treino": [
      {
        "id": "treino_setor_01",
        "sector_name": "Setor 01 — Edifício Aurora",
        "coordinates": { "x": 180, "y": 140 },
        "situation_report": "Incêndio moderado no 4º andar. Civis sinalizando no heliponto.",
        "sensors": {
          "CIVIS_DETECTADOS": true,
          "FOGO_ATIVO": true,
          "GAS_TOXICO": false,
          "BATERIA_DRONE": true
        },
        "protocols": [
          {
            "id": "proto_evac",
            "title": "Protocolo Alpha — Evacuação Aérea",
            "template": "(CIVIS_DETECTADOS [ ? ] BATERIA_DRONE) [ ? ] NOT(GAS_TOXICO)",
            "slots": 2,
            "correct_operators": ["AND", "AND"],
            "hint": "Para autorizar o resgate, precisamos de civis E bateria suficiente, sem presença de gás."
          },
          {
            "id": "proto_extintor",
            "title": "Protocolo Bravo — Lançamento de Retardante",
            "template": "(FOGO_ATIVO [ ? ] BATERIA_DRONE) [ ? ] NOT(CIVIS_DETECTADOS)",
            "slots": 2,
            "correct_operators": ["AND", "AND"],
            "hint": "O retardante químico só pode ser lançado onde houver fogo E sem civis na linha de tiro."
          }
        ],
        "time_limit": 60,
        "base_score": 1000
      },
      {
        "id": "treino_setor_02",
        "sector_name": "Setor 02 — Hospital Central",
        "coordinates": { "x": 460, "y": 280 },
        "situation_report": "Queda de energia no setor de UTI. Vazamento de oxigênio sob controle.",
        "sensors": {
          "CIVIS_DETECTADOS": true,
          "FOGO_ATIVO": false,
          "GAS_TOXICO": false,
          "ENERGIA_ESTAVEL": false
        },
        "protocols": [
          {
            "id": "proto_gerador",
            "title": "Protocolo Alpha — Acoplamento de Bateria Móvel",
            "template": "(CIVIS_DETECTADOS [ ? ] NOT(ENERGIA_ESTAVEL)) [ ? ] NOT(FOGO_ATIVO)",
            "slots": 2,
            "correct_operators": ["AND", "AND"],
            "hint": "O drone transfere energia se houver civis E falta de energia, sem fogo ao redor."
          }
        ],
        "time_limit": 60,
        "base_score": 1200
      }
    ],
    "pool_ranqueado": [
      {
        "id": "ranqueado_setor_01",
        "sector_name": "Zona Crítica — Usina Termoelétrica",
        "coordinates": { "x": 300, "y": 220 },
        "situation_report": "Vazamento térmico e alarmes de contenção. Telemetria gerada pela semente operacional.",
        "param_generators": {
          "CIVIS_DETECTADOS": { "type": "boolean" },
          "FOGO_ATIVO": { "type": "boolean" },
          "GAS_TOXICO": { "type": "boolean" },
          "BATERIA_DRONE": { "type": "boolean", "default": true }
        },
        "protocols": [
          {
            "id": "proto_infiltracao",
            "title": "Protocolo Tático — Varredura de Sobreviventes",
            "template": "(CIVIS_DETECTADOS [ ? ] BATERIA_DRONE) [ ? ] NOT(GAS_TOXICO)",
            "slots": 2,
            "correct_operators": ["AND", "AND"],
            "hint": "Analise os sensores em tempo real antes de enviar o comando."
          },
          {
            "id": "proto_bloqueio",
            "title": "Protocolo Tático — Fechamento de Válvula",
            "template": "(FOGO_ATIVO [ ? ] GAS_TOXICO) [ ? ] BATERIA_DRONE",
            "slots": 2,
            "correct_operators": ["OR", "AND"],
            "hint": "Se houver fogo OU gás tóxico presente, a válvula deve ser selada com energia de apoio."
          }
        ],
        "time_limit": 45,
        "base_score": 1500
      },
      {
        "id": "ranqueado_setor_02",
        "sector_name": "Zona Crítica — Complexo Escolar Norte",
        "coordinates": { "x": 520, "y": 140 },
        "situation_report": "Desabamento parcial na ala esportiva. Visibilidade reduzida por poeira térmica.",
        "param_generators": {
          "CIVIS_DETECTADOS": { "type": "boolean" },
          "FOGO_ATIVO": { "type": "boolean" },
          "ESTRUTURA_ABALADA": { "type": "boolean" },
          "BATERIA_DRONE": { "type": "boolean", "default": true }
        },
        "protocols": [
          {
            "id": "proto_corda",
            "title": "Protocolo Tático — Lançamento de Cabo Guia",
            "template": "(CIVIS_DETECTADOS [ ? ] NOT(ESTRUTURA_ABALADA)) [ ? ] BATERIA_DRONE",
            "slots": 2,
            "correct_operators": ["AND", "AND"],
            "hint": "Cabo só deve ser lançado se a estrutura não estiver abalada."
          }
        ],
        "time_limit": 40,
        "base_score": 1800
      }
    ]
  };

  // 3. EVENT BUS
  class EventBus {
    constructor() { this.events = {}; }
    on(name, cb) { if (!this.events[name]) this.events[name] = []; this.events[name].push(cb); }
    emit(name, data) { if (this.events[name]) this.events[name].forEach(cb => cb(data)); }
  }

  // 4. ÁUDIO SINTETIZADO NATIVO
  class AudioSystem {
    constructor() { this.ctx = null; this.vol = 0.35; }
    init() {
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (AC) this.ctx = new AC();
      }
      if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
    }
    playTone(freq, type = 'sine', dur = 0.1, delay = 0) {
      this.init();
      if (!this.ctx) return;
      try {
        const t = this.ctx.currentTime + delay;
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = type;
        o.frequency.setValueAtTime(freq, t);
        g.gain.setValueAtTime(this.vol, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g); g.connect(this.ctx.destination);
        o.start(t); o.stop(t + dur);
      } catch (e) {}
    }
    playClick() { this.playTone(800, 'triangle', 0.04); }
    playPing() { this.playTone(1200, 'sine', 0.1); }
    playSuccess() {
      this.playTone(440, 'triangle', 0.08, 0);
      this.playTone(554.37, 'triangle', 0.08, 0.08);
      this.playTone(659.25, 'triangle', 0.2, 0.16);
    }
    playError() { this.playTone(180, 'sawtooth', 0.25); }
    playHint() { this.playTone(950, 'sine', 0.15); }
    playDrone() { this.playTone(120, 'sine', 0.06); }
  }

  // 5. MAP RENDERER (SATÉLITE REALISTA & DRONE)
  class MapRenderer {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.rotorAngle = 0;
      this.smoke = [];
      for (let i = 0; i < 20; i++) {
        this.smoke.push({ x: 180 + (Math.random() * 30 - 15), y: 140 + (Math.random() * 30 - 15), r: Math.random() * 8 + 4, a: Math.random() * 0.5 + 0.2, sp: Math.random() * 0.4 + 0.2 });
      }

      this.mapLoaded = false;
      this.droneLoaded = false;

      this.mapImg = new Image();
      this.mapImg.onload = () => { this.mapLoaded = true; };
      this.mapImg.src = './assets/sprites/map_satellite.png';

      this.droneImg = new Image();
      this.droneImg.onload = () => { this.droneLoaded = true; };
      this.droneImg.src = './assets/sprites/drone.png';
    }
    resize(w, h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
    render(drone, sector, waypoint) {
      const ctx = this.ctx;
      const w = this.canvas.width || 680;
      const h = this.canvas.height || 540;

      if (this.mapLoaded && this.mapImg.naturalWidth > 0) {
        ctx.drawImage(this.mapImg, 0, 0, w, h);
        ctx.fillStyle = 'rgba(17, 20, 23, 0.35)';
        ctx.fillRect(0, 0, w, h);
      } else {
        ctx.fillStyle = '#1c2226';
        ctx.fillRect(0, 0, w, h);

        const bldgs = [
          { x: 40, y: 40, w: 100, h: 80, c: '#2b353e' },
          { x: 180, y: 50, w: 120, h: 90, c: '#33404b' },
          { x: 340, y: 40, w: 90, h: 110, c: '#2b353e' },
          { x: 470, y: 60, w: 140, h: 80, c: '#35434e' },
          { x: 50, y: 180, w: 90, h: 120, c: '#313e48' },
          { x: 230, y: 220, w: 140, h: 100, c: '#2d3842' },
          { x: 410, y: 200, w: 110, h: 130, c: '#384855' },
          { x: 60, y: 350, w: 150, h: 90, c: '#2a343d' },
          { x: 260, y: 370, w: 110, h: 80, c: '#33414c' },
          { x: 420, y: 380, w: 160, h: 80, c: '#2e3a44' }
        ];
        bldgs.forEach(b => {
          ctx.fillStyle = b.c;
          ctx.fillRect(b.x, b.y, b.w, b.h);
          ctx.strokeStyle = '#273038';
          ctx.strokeRect(b.x, b.y, b.w, b.h);
          ctx.fillStyle = '#181f25';
          ctx.fillRect(b.x + 10, b.y + 10, 16, 16);
        });

        ctx.strokeStyle = '#4a5c4c'; ctx.lineWidth = 2;
        ctx.strokeRect(20, 20, 50, 50);
        ctx.fillStyle = '#4ec95c'; ctx.font = '10px monospace';
        ctx.fillText('BASE-01', 24, 48);
      }

      if (sector && sector.coordinates) {
        const sx = sector.coordinates.x;
        const sy = sector.coordinates.y;
        this.smoke.forEach(p => {
          p.y -= p.sp;
          if (p.y < sy - 40) { p.y = sy + (Math.random() * 20 - 10); p.x = sx + (Math.random() * 30 - 15); }
          ctx.fillStyle = `rgba(180, 70, 40, ${p.a * 0.4})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = `rgba(50, 55, 60, ${p.a * 0.6})`;
          ctx.beginPath(); ctx.arc(p.x + 4, p.y - 6, p.r * 1.2, 0, Math.PI * 2); ctx.fill();
        });

        ctx.strokeStyle = '#e04b47'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(sx, sy, 28, 0, Math.PI * 2); ctx.stroke();
        ctx.fillStyle = 'rgba(224, 75, 71, 0.15)';
        ctx.beginPath(); ctx.arc(sx, sy, 28, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#ff6b6b'; ctx.font = 'bold 11px sans-serif';
        ctx.fillText('EMERGÊNCIA', sx - 34, sy - 34);
      }

      if (waypoint && waypoint.x) {
        ctx.strokeStyle = '#e5a00d'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.arc(waypoint.x, waypoint.y, 12, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(waypoint.x - 16, waypoint.y); ctx.lineTo(waypoint.x + 16, waypoint.y);
        ctx.moveTo(waypoint.x, waypoint.y - 16); ctx.lineTo(waypoint.x, waypoint.y + 16); ctx.stroke();
        ctx.setLineDash([]);
      }

      ctx.save();
      ctx.translate(drone.x, drone.y);
      ctx.rotate(drone.angle);

      ctx.strokeStyle = 'rgba(78, 201, 92, 0.4)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(0, 0, 44, 0, Math.PI * 2); ctx.stroke();

      if (this.droneLoaded && this.droneImg.naturalWidth > 0) {
        ctx.drawImage(this.droneImg, -28, -28, 56, 56);
      } else {
        ctx.strokeStyle = '#14181c'; ctx.lineWidth = 4;
        ctx.beginPath(); ctx.moveTo(-16, -16); ctx.lineTo(16, 16);
        ctx.moveTo(-16, 16); ctx.lineTo(16, -16); ctx.stroke();

        this.rotorAngle += 0.4;
        const rots = [{x:-16,y:-16},{x:16,y:-16},{x:-16,y:16},{x:16,y:16}];
        rots.forEach(pos => {
          ctx.save(); ctx.translate(pos.x, pos.y); ctx.rotate(this.rotorAngle);
          ctx.fillStyle = 'rgba(140, 160, 180, 0.7)'; ctx.fillRect(-10, -1.5, 20, 3);
          ctx.restore();
        });

        ctx.fillStyle = '#3b4a3c';
        ctx.beginPath(); ctx.roundRect(-10, -12, 20, 24, 4); ctx.fill();
        ctx.strokeStyle = '#273038'; ctx.stroke();

        ctx.fillStyle = '#e5a00d'; ctx.beginPath(); ctx.arc(0, -10, 3, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#4ec95c'; ctx.fillRect(-8, 8, 2, 2);
        ctx.fillStyle = '#e04b47'; ctx.fillRect(6, 8, 2, 2);
      }

      ctx.restore();

      ctx.strokeStyle = 'rgba(56, 69, 80, 0.2)'; ctx.lineWidth = 0.5;
      for (let x = 0; x < w; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
    }
  }

  // 6. FÍSICA DO DRONE
  class DroneController {
    constructor(x = 45, y = 45) {
      this.x = x; this.y = y; this.vx = 0; this.vy = 0; this.angle = 0;
      this.targetX = null; this.targetY = null;
    }
    setDestination(x, y) { this.targetX = x; this.targetY = y; }
    update(dt) {
      if (this.targetX === null || this.targetY === null) return;
      const dx = this.targetX - this.x;
      const dy = this.targetY - this.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 5) { this.x = this.targetX; this.y = this.targetY; this.vx = 0; this.vy = 0; return; }
      const targetAngle = Math.atan2(dy, dx) + Math.PI / 2;
      this.angle += (targetAngle - this.angle) * 0.15;
      const dirX = dx / dist; const dirY = dy / dist;
      const factor = Math.min(1.0, dist / 40);
      this.vx += dirX * 240 * dt * factor;
      this.vy += dirY * 240 * dt * factor;
      this.vx *= 0.92; this.vy *= 0.92;
      this.x += this.vx * dt * 160;
      this.y += this.vy * dt * 160;
    }
  }

  // 7. HUD TÁTICO
  class TacticalHUD {
    constructor(bus, audio) {
      this.bus = bus;
      this.audio = audio;
      this.isNatural = true;
      this.selectedProtoIdx = 0;
      this.slots = ['?', '?'];
      this.activeSlot = 0;
      this.consoleEl = document.getElementById('lateral-console');
    }
    getOpLabel(op) {
      if (!this.isNatural) return op;
      const map = { 'AND': 'E', 'OR': 'OU', 'NOT': 'NÃO', 'XOR': 'XOR', '?': '?' };
      return map[op] || op;
    }
    renderSector(sec) {
      if (!sec) {
        this.consoleEl.innerHTML = '<div style="padding:30px; text-align:center; color:#888;">🚁 AGUARDANDO DESIGNAR SETOR</div>';
        return;
      }
      const proto = sec.protocols[this.selectedProtoIdx] || sec.protocols[0];

      let sensorsHtml = '';
      for (const [k, v] of Object.entries(sec.sensors || {})) {
        sensorsHtml += `
          <div class="sensor-box ${v ? 'val-true' : 'val-false'}">
            <span>${k}</span><strong>${v ? '🟢 TRUE' : '⚪ FALSE'}</strong>
          </div>`;
      }

      let tabsHtml = '';
      sec.protocols.forEach((p, idx) => {
        const active = idx === this.selectedProtoIdx ? 'border-color:var(--military-amber); color:var(--military-amber);' : '';
        tabsHtml += `<button class="btn-secondary-tactical proto-tab-btn" data-idx="${idx}" style="${active}">${p.title}</button>`;
      });

      let formulaHtml = proto.template;
      formulaHtml = formulaHtml.replace(/\[ \? \]/g, (m, offset) => {
        const slotIdx = formulaHtml.substring(0, offset).split('[ ? ]').length - 1;
        const val = this.slots[slotIdx] || '?';
        return `<button class="slot-btn" data-sidx="${slotIdx}">[ ${this.getOpLabel(val)} ]</button>`;
      });

      this.consoleEl.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="console-section-title">🛰️ SENSORES FLIR — ${sec.sector_name}</span>
          <button id="btn-toggle-syntax" class="btn-secondary-tactical" style="padding:2px 6px; font-size:0.75rem;">
            ${this.isNatural ? '🔤 Linguagem Natural' : '💻 Código Técnico'}
          </button>
        </div>
        <div class="sensors-grid">${sensorsHtml}</div>
        <span class="console-section-title">📋 PROTOCOLOS TÁTICOS</span>
        <div style="display:flex; gap:6px; flex-direction:column;">${tabsHtml}</div>
        <div class="protocol-card">
          <span class="protocol-title">Engenharia da Regra Lógica:</span>
          <div class="formula-display">${formulaHtml}</div>
          <span style="font-size:0.75rem; color:var(--text-muted);">Clique no operador para preencher o slot:</span>
          <div class="operator-palette">
            <button class="op-btn" data-op="AND">${this.getOpLabel('AND')}</button>
            <button class="op-btn" data-op="OR">${this.getOpLabel('OR')}</button>
            <button class="op-btn" data-op="NOT">${this.getOpLabel('NOT')}</button>
            <button class="op-btn" data-op="XOR">${this.getOpLabel('XOR')}</button>
          </div>
        </div>
        <div style="display:flex; gap:8px;">
          <button id="btn-exec" class="btn-tactical" style="flex:1;">🚀 EXECUTAR PROTOCOLO</button>
          <button id="btn-hint" class="btn-secondary-tactical" style="color:var(--military-amber);">💡 DICA</button>
        </div>
      `;

      document.getElementById('btn-toggle-syntax').onclick = () => {
        this.audio.playClick();
        this.isNatural = !this.isNatural;
        this.renderSector(sec);
      };
      document.querySelectorAll('.proto-tab-btn').forEach(btn => {
        btn.onclick = () => {
          this.audio.playClick();
          this.selectedProtoIdx = parseInt(btn.getAttribute('data-idx'));
          this.slots = ['?', '?'];
          this.renderSector(sec);
        };
      });
      document.querySelectorAll('.slot-btn').forEach(btn => {
        btn.onclick = () => {
          this.audio.playClick();
          this.activeSlot = parseInt(btn.getAttribute('data-sidx'));
        };
      });
      document.querySelectorAll('.op-btn').forEach(btn => {
        btn.onclick = () => {
          this.audio.playClick();
          this.slots[this.activeSlot] = btn.getAttribute('data-op');
          this.activeSlot = (this.activeSlot + 1) % this.slots.length;
          this.renderSector(sec);
        };
      });
      document.getElementById('btn-exec').onclick = () => {
        this.bus.emit('EXECUTE_PROTOCOL', { sector: sec, protocol: proto, userOperators: this.slots });
      };
      document.getElementById('btn-hint').onclick = () => {
        this.audio.playHint();
        alert(`💡 DICA TÁTICA:\n${proto.hint}`);
        if (proto.correct_operators && proto.correct_operators[0]) {
          this.slots[0] = proto.correct_operators[0];
          this.renderSector(sec);
        }
      };
    }
  }

  // 8. MOTOR PRINCIPAL DA OPERAÇÃO NEXO
  class OperacaoNexo {
    constructor() {
      this.bus = new EventBus();
      this.audio = new AudioSystem();
      this.drone = new DroneController(45, 45);
      
      this.gameState = 'MENU'; // MENU, GAMEPLAY, PAUSED, VICTORY, GAMEOVER
      this.currentMode = 'training'; // training, ranked
      this.score = 0;
      this.timer = 60;
      this.currentSectorIdx = 0;
      this.hintsUsedInSector = 0;

      this.init();
    }

    init() {
      this.canvas = document.getElementById('satellite-canvas');
      this.renderer = new MapRenderer(this.canvas);
      this.hud = new TacticalHUD(this.bus, this.audio);

      this.resize();
      window.addEventListener('resize', () => this.resize());

      // Clique no canvas -> Move drone
      this.canvas.addEventListener('pointerdown', (e) => {
        if (this.gameState !== 'GAMEPLAY') return;
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (this.canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (this.canvas.height / rect.height);
        this.drone.setDestination(x, y);
        this.audio.playClick();
      });

      // Atalhos de Teclado (ESC ou P para Pausa)
      window.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' || e.code === 'KeyP') {
          if (this.gameState === 'GAMEPLAY') {
            this.pauseGame();
          } else if (this.gameState === 'PAUSED') {
            this.resumeGame();
          }
        }
      });

      // Configuração de Botões e Modais
      this.setupDOM();

      // Inicia no Menu Principal
      this.showMainMenu();

      // Loop Contínuo
      let lastTime = performance.now();
      const loop = (now) => {
        const dt = Math.min((now - lastTime) / 1000, 0.1);
        lastTime = now;

        if (this.gameState === 'GAMEPLAY') {
          this.drone.update(dt);
          if (this.timer > 0) {
            this.timer -= dt;
            const timeEl = document.getElementById('hud-time-badge');
            if (timeEl) timeEl.textContent = `TIME: ${Math.ceil(this.timer)}s`;
            if (this.timer <= 0) {
              this.handleTimeout();
            }
          }
        }

        this.renderer.render(this.drone, this.currentSector, { x: this.drone.targetX, y: this.drone.targetY });
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }

    resize() {
      const p = this.canvas.parentElement;
      const w = p ? p.clientWidth : 700;
      const h = p ? p.clientHeight : 520;
      this.renderer.resize(w || 700, h || 520);
    }

    setupDOM() {
      // 1. Menu Principal
      document.getElementById('menu-btn-ranked').onclick = () => this.handleRankedSelection();
      document.getElementById('menu-btn-training').onclick = () => this.startMission('training');

      // 2. Modais do Menu
      const manualModal = document.getElementById('manual-modal');
      const a11yModal = document.getElementById('a11y-modal');

      document.getElementById('menu-btn-manual').onclick = () => { this.audio.playClick(); manualModal.style.display = 'flex'; };
      document.getElementById('menu-btn-a11y').onclick = () => { this.audio.playClick(); a11yModal.style.display = 'flex'; };

      document.getElementById('btn-open-manual').onclick = () => { this.audio.playClick(); manualModal.style.display = 'flex'; };
      document.getElementById('btn-close-manual').onclick = () => { manualModal.style.display = 'none'; };

      document.getElementById('btn-open-a11y').onclick = () => { this.audio.playClick(); a11yModal.style.display = 'flex'; };
      document.getElementById('btn-close-a11y').onclick = () => { a11yModal.style.display = 'none'; };

      // 3. Botões do Header
      document.getElementById('btn-pause-game').onclick = () => this.pauseGame();
      document.getElementById('btn-return-menu').onclick = () => this.showMainMenu();

      // 4. Botões de Pausa
      document.getElementById('pause-btn-resume').onclick = () => this.resumeGame();
      document.getElementById('pause-btn-restart').onclick = () => {
        this.resumeGame();
        this.loadSector(this.currentSector);
      };
      document.getElementById('pause-btn-menu').onclick = () => this.showMainMenu();

      // 5. Botões de Vitória
      document.getElementById('victory-btn-next').onclick = () => {
        document.getElementById('victory-overlay').style.display = 'none';
        this.gameState = 'GAMEPLAY';
        this.loadNextSector();
      };
      document.getElementById('victory-btn-menu').onclick = () => this.showMainMenu();

      // 6. Botões de Derrota
      document.getElementById('defeat-btn-retry').onclick = () => {
        document.getElementById('defeat-overlay').style.display = 'none';
        this.gameState = 'GAMEPLAY';
        this.loadSector(this.currentSector);
      };
      document.getElementById('defeat-btn-manual').onclick = () => {
        document.getElementById('defeat-overlay').style.display = 'none';
        manualModal.style.display = 'flex';
      };
      document.getElementById('defeat-btn-menu').onclick = () => this.showMainMenu();

      // 7. EventBus - Executar Protocolo
      this.bus.on('EXECUTE_PROTOCOL', ({ sector, protocol, userOperators }) => {
        const correct = protocol.correct_operators || ['AND', 'AND'];
        const isOk = userOperators.every((op, idx) => op === correct[idx]);

        if (isOk) {
          this.handleVictory(sector, protocol);
        } else {
          this.handleDefeat(sector, protocol);
        }
      });

      // 8. Filtros de Acessibilidade
      document.getElementById('select-colorblind').onchange = (e) => {
        const m = e.target.value;
        document.body.classList.remove('theme-protanopia', 'theme-deuteranopia', 'theme-tritanopia', 'theme-high-contrast');
        if (m !== 'none') document.body.classList.add(`theme-${m}`);
      };

      document.getElementById('check-reduced-motion').onchange = (e) => {
        if (e.target.checked) document.body.classList.add('reduced-motion');
        else document.body.classList.remove('reduced-motion');
      };
    }

    showMainMenu() {
      this.gameState = 'MENU';
      document.getElementById('main-menu-overlay').style.display = 'flex';
      document.getElementById('pause-overlay').style.display = 'none';
      document.getElementById('victory-overlay').style.display = 'none';
      document.getElementById('defeat-overlay').style.display = 'none';

      // Atualiza Trava Diária do Ranqueado
      const today = new Date().toISOString().split('T')[0];
      const lastPlayedDate = localStorage.getItem('nexo_ranked_date');
      const rankedBadge = document.getElementById('ranked-lock-badge');

      if (lastPlayedDate === today) {
        rankedBadge.textContent = '🔒 CONCLUÍDO HOJE';
        rankedBadge.style.color = '#ff9999';
      } else {
        rankedBadge.textContent = '⚔️ DISPONÍVEL HOJE';
        rankedBadge.style.color = 'var(--military-amber)';
      }
    }

    handleRankedSelection() {
      const today = new Date().toISOString().split('T')[0];
      const lastPlayedDate = localStorage.getItem('nexo_ranked_date');

      if (lastPlayedDate === today) {
        this.audio.playError();
        alert('🔒 DESAFIO DIÁRIO JÁ REALIZADO!\nVocê já concluiu o desafio oficial de hoje. O próximo será liberado amanhã às 00:00.\n\nUse a Central de Treinamento para continuar praticando livremente!');
        return;
      }

      this.startMission('ranked');
    }

    startMission(mode) {
      this.currentMode = mode;
      this.score = 0;
      this.currentSectorIdx = 0;
      this.gameState = 'GAMEPLAY';

      document.getElementById('main-menu-overlay').style.display = 'none';
      document.getElementById('pause-overlay').style.display = 'none';

      // Atualiza Tarja e Badges
      const modeLabel = document.getElementById('mode-badge-label');
      const modeNotice = document.getElementById('mode-rule-notice');
      const scoreBadge = document.getElementById('hud-score-badge');

      if (mode === 'ranked') {
        modeLabel.className = 'mode-badge-ranked';
        modeLabel.textContent = 'MODO: DESAFIO DIÁRIO (RANQUEADO OFICIAL)';
        modeNotice.textContent = 'Pontuação gravada no ranking oficial (1x/dia)';
        scoreBadge.textContent = 'SCORE OFICIAL: 0';
        scoreBadge.style.color = 'var(--military-amber)';
      } else {
        modeLabel.className = 'mode-badge-training';
        modeLabel.textContent = 'MODO: CENTRAL DE TREINAMENTO (LIVRE)';
        modeNotice.textContent = 'Score isolado de estudo (não altera ranking)';
        scoreBadge.textContent = 'SCORE TREINO: 0';
        scoreBadge.style.color = 'var(--military-green)';
      }

      this.loadNextSector();
    }

    pauseGame() {
      if (this.gameState !== 'GAMEPLAY') return;
      this.gameState = 'PAUSED';
      this.audio.playClick();
      document.getElementById('pause-overlay').style.display = 'flex';
    }

    resumeGame() {
      this.gameState = 'GAMEPLAY';
      this.audio.playClick();
      document.getElementById('pause-overlay').style.display = 'none';
    }

    loadNextSector() {
      const pool = this.currentMode === 'ranked' ? LEVELS_DATA.pool_ranqueado : LEVELS_DATA.pool_treino;
      if (this.currentSectorIdx >= pool.length) {
        this.finishOperation();
        return;
      }

      const sec = pool[this.currentSectorIdx];
      this.currentSectorIdx++;
      this.loadSector(sec);
    }

    loadSector(sec) {
      this.currentSector = JSON.parse(JSON.stringify(sec));
      this.timer = this.currentSector.time_limit || 60;
      this.hintsUsedInSector = 0;

      // Se for modo ranqueado, sorteia sensores dinâmicos
      if (sec.param_generators) {
        this.currentSector.sensors = {};
        for (const [k, conf] of Object.entries(sec.param_generators)) {
          this.currentSector.sensors[k] = conf.default !== undefined ? conf.default : Math.random() > 0.5;
        }
      }

      if (this.currentSector.coordinates) {
        this.drone.setDestination(this.currentSector.coordinates.x, this.currentSector.coordinates.y);
      }
      this.hud.renderSector(this.currentSector);
    }

    handleVictory(sector, protocol) {
      this.gameState = 'VICTORY';
      this.audio.playSuccess();

      const timeRatio = Math.max(0, this.timer / (sector.time_limit || 60));
      const mult = this.currentMode === 'ranked' ? 1.5 : 1.0;
      const gained = Math.floor((sector.base_score || 1000) * mult * (1 + timeRatio * 0.3));
      this.score += gained;

      // Atualiza Badge do Topo
      const scoreBadge = document.getElementById('hud-score-badge');
      if (this.currentMode === 'ranked') {
        scoreBadge.textContent = `SCORE OFICIAL: ${this.score}`;
      } else {
        scoreBadge.textContent = `SCORE TREINO: ${this.score}`;
      }

      // Estrelas
      const stars = timeRatio > 0.4 && this.hintsUsedInSector === 0 ? 3 : (this.hintsUsedInSector <= 1 ? 2 : 1);
      document.getElementById('victory-stars').textContent = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
      document.getElementById('victory-score-report').innerHTML = `Pontos Ganhos: <strong style="color:var(--military-green);">+${gained}</strong> (${this.score} Total)`;
      document.getElementById('victory-details-report').textContent = `${protocol.title} executado com maestria. Setor seguro!`;

      document.getElementById('victory-overlay').style.display = 'flex';
    }

    handleDefeat(sector, protocol) {
      this.gameState = 'GAMEOVER';
      this.audio.playError();

      document.getElementById('defeat-reason').textContent = `Falha de validação no ${protocol.title}: os operadores não neutralizaram todos os riscos detectados pelos sensores FLIR.`;
      document.getElementById('defeat-overlay').style.display = 'flex';
    }

    handleTimeout() {
      this.gameState = 'GAMEOVER';
      this.audio.playError();

      document.getElementById('defeat-reason').textContent = `TEMPO OPERACIONAL ESGOTADO! O setor entrou em colapso antes do envio do protocolo.`;
      document.getElementById('defeat-overlay').style.display = 'flex';
    }

    finishOperation() {
      if (this.currentMode === 'ranked') {
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem('nexo_ranked_date', today);
        localStorage.setItem('nexo_official_score', this.score);
      }

      alert(`🏆 OPERAÇÃO FINALIZADA!\nTodos os setores da rodada foram resgatados com sucesso!\nPontuação Final: ${this.score} PONTOS.`);
      this.showMainMenu();
    }
  }

  // Inicialização Automática
  window.addEventListener('DOMContentLoaded', () => {
    window.nexoApp = new OperacaoNexo();
  });
})();
