/**
 * ============================================================================
 * Operação NEXO: Comando & Resgate — Orquestrador Modular Principal
 * ============================================================================
 * UFMT GameHub — Co-criado por Reinaldo Júnior & ⚡ L.O.G.O.S.
 * ============================================================================
 */

import { EventBus } from './core/event_bus.js';
import { AudioSystem } from './systems/audio.js';
import { MapRenderer } from './render/map_renderer.js';
import { DroneController } from './gameplay/drone_controller.js';
import { TacticalHUD } from './ui/tactical_hud.js';
import { TutorialManager } from './ui/tutorial_manager.js';
import LEVELS_DATA from '../data/levels_data.js';
import I18N from '../data/i18n_data.js';

export class OperacaoNexo {
    constructor() {
      this.bus = new EventBus();
      this.audio = new AudioSystem();
      this.drone = new DroneController(45, 45);
      
      this.gameState = 'MENU'; // MENU, GAMEPLAY, PAUSED, VICTORY, GAMEOVER
      this.currentMode = 'training'; // training, ranked
      this.score = 0;
      this.timer = 60;
      this.streak = 0;

      this.currentSeasonIdx = 0;
      this.currentWeekIdx = 0;
      this.currentStageIdx = 0;
      this.currentMission = null;
      this.currentSector = null;
      this.hintsUsedInSector = 0;

      this.init();
    }

    init() {
      this.canvas = document.getElementById('satellite-canvas');
      this.renderer = new MapRenderer(this.canvas);
      this.hud = new TacticalHUD(this.bus, this.audio);
      this.tutorial = new TutorialManager(this.audio, this.bus);

      this.resize();
      window.addEventListener('resize', () => this.resize());
      if (window.ResizeObserver && this.canvas.parentElement) {
        const ro = new ResizeObserver(() => this.resize());
        ro.observe(this.canvas.parentElement);
      }

      // Clique no canvas -> Move drone
      this.canvas.addEventListener('pointerdown', (e) => {
        if (this.gameState !== 'GAMEPLAY') return;
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (this.canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (this.canvas.height / rect.height);
        this.drone.setDestination(x, y);
        this.audio.playClick();
      });

      // Atalhos de Teclado (ESC ou P para Pausa — Bloqueado no Ranqueado)
      window.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' || e.code === 'KeyP') {
          if (this.gameState === 'GAMEPLAY') {
            if (this.currentMode === 'ranked') {
              this.audio.playError();
              return;
            }
            this.pauseGame();
          } else if (this.gameState === 'PAUSED') {
            this.resumeGame();
          }
        }
      });

      this.setupDOM();
      this.showMainMenu();

      // Loop Contínuo
      let lastTime = performance.now();
      const loop = (now) => {
        const dt = Math.min((now - lastTime) / 1000, 0.1);
        lastTime = now;

        let threatRatio = 0;
        if (this.gameState === 'GAMEPLAY') {
          this.drone.update(dt);
          const totalTime = (this.currentSector && this.currentSector.time_limit) ? this.currentSector.time_limit : 60;
          if (this.timer > 0) {
            this.timer -= dt;
            threatRatio = Math.min(1.0, Math.max(0, 1.0 - (this.timer / totalTime)));
            const timeEl = document.getElementById('hud-time-badge');
            if (timeEl) {
              const secLeft = Math.ceil(this.timer);
              if (threatRatio > 0.7) {
                timeEl.textContent = `TIME: ${secLeft}s 🔴 CRÍTICO`;
                timeEl.style.color = '#ff3333';
              } else if (threatRatio > 0.35) {
                timeEl.textContent = `TIME: ${secLeft}s 🟡 EXPANDINDO`;
                timeEl.style.color = 'var(--military-amber)';
              } else {
                timeEl.textContent = `TIME: ${secLeft}s 🟢 SEGURO`;
                timeEl.style.color = 'var(--military-green)';
              }
            }
            if (this.timer <= 0) {
              this.handleTimeout();
            }
          }
        }

        this.renderer.render(this.drone, this.currentSector, { x: this.drone.targetX, y: this.drone.targetY }, threatRatio, this.currentMission, this.currentStageIdx);
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
      document.getElementById('menu-btn-ranked').onclick = () => this.handleRankedSelection();
      document.getElementById('menu-btn-training').onclick = () => this.startMission('training');
      
      const btnTutorial = document.getElementById('menu-btn-tutorial');
      if (btnTutorial) {
        btnTutorial.onclick = () => {
          this.tutorial.start(() => this.startMission('training'));
        };
      }

      const manualModal = document.getElementById('manual-modal');
      const a11yModal = document.getElementById('a11y-modal');

      document.getElementById('menu-btn-manual').onclick = () => { this.audio.playClick(); manualModal.style.display = 'flex'; };
      document.getElementById('menu-btn-a11y').onclick = () => { this.audio.playClick(); a11yModal.style.display = 'flex'; };

      document.getElementById('btn-open-manual').onclick = () => { this.audio.playClick(); manualModal.style.display = 'flex'; };
      document.getElementById('btn-close-manual').onclick = () => { manualModal.style.display = 'none'; };

      document.getElementById('btn-open-a11y').onclick = () => { this.audio.playClick(); a11yModal.style.display = 'flex'; };
      document.getElementById('btn-close-a11y').onclick = () => { a11yModal.style.display = 'none'; };

      document.getElementById('btn-pause-game').onclick = () => this.pauseGame();
      document.getElementById('btn-return-menu').onclick = () => this.showMainMenu();

      document.getElementById('pause-btn-resume').onclick = () => this.resumeGame();
      document.getElementById('pause-btn-restart').onclick = () => {
        this.resumeGame();
        this.loadStage(this.currentStageIdx);
      };
      document.getElementById('pause-btn-menu').onclick = () => this.showMainMenu();

      document.getElementById('victory-btn-next').onclick = () => {
        document.getElementById('victory-overlay').style.display = 'none';
        this.gameState = 'GAMEPLAY';
        this.loadNextWeek();
      };
      document.getElementById('victory-btn-menu').onclick = () => this.showMainMenu();

      document.getElementById('defeat-btn-retry').onclick = () => {
        document.getElementById('defeat-overlay').style.display = 'none';
        this.gameState = 'GAMEPLAY';
        this.loadStage(this.currentStageIdx);
      };
      document.getElementById('defeat-btn-manual').onclick = () => {
        document.getElementById('defeat-overlay').style.display = 'none';
        manualModal.style.display = 'flex';
      };
      document.getElementById('defeat-btn-menu').onclick = () => this.showMainMenu();

      // EXECUÇÃO BOOLEANA COM VALIDAÇÃO MATEMÁTICA & DECISÃO DE PROTOCOLO
      this.bus.on('EXECUTE_PROTOCOL', ({ sector, protocol, tokens, polarities, connectors, sensors }) => {
        // 1. Validação de Escolha de Protocolo
        if (!protocol.is_correct_protocol) {
          const reason = protocol.tactical_reject_reason || 'Protocolo tático incorreto para este tipo de incidente.';
          this.handleDefeat(sector, protocol, reason);
          return;
        }

        // 2. Validação de Conectivos Preenchidos
        const hasUnfilled = connectors.some(c => c === '?');
        if (hasUnfilled) {
          this.audio.playError();
          alert('⚠️ LACUNAS NÃO PREENCHIDAS!\nSelecione operadores booleanos (E, OU, XOR) para todas as lacunas [ ? ] antes de executar.');
          return;
        }

        // 3. Avaliador Booleano Matemático Real
        const termValues = tokens.map((token, idx) => {
          const rawVal = !!sensors[token];
          const isNot = !!polarities[idx];
          return isNot ? !rawVal : rawVal;
        });

        const applyOp = (a, op, b) => {
          if (op === 'AND') return a && b;
          if (op === 'OR') return a || b;
          if (op === 'XOR') return (a || b) && !(a && b);
          return false;
        };

        let result = termValues[0];
        if (termValues.length >= 2) result = applyOp(termValues[0], connectors[0], termValues[1]);
        if (termValues.length >= 3) result = applyOp(result, connectors[1], termValues[2]);
        if (termValues.length >= 4) result = applyOp(result, connectors[2], termValues[3]);

        if (result === true) {
          this.handleStageSuccess(sector, protocol);
        } else {
          const failMsg = `Falha de validação lógica no ${protocol.title}: A regra montada resultou em FALSO para os sensores atuais. Ajuste os botões [ + / NÃO ] ou os conectivos [ ? ].`;
          this.handleDefeat(sector, protocol, failMsg);
        }
      });

      // Acessibilidade
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

      const btnPause = document.getElementById('btn-pause-game');
      if (btnPause) {
        btnPause.disabled = false;
        btnPause.style.opacity = '1';
        btnPause.style.cursor = 'pointer';
        btnPause.title = 'Pausar Operação (ESC)';
        btnPause.textContent = '⏸️ Pausar';
      }

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
      this.streak = 0;
      this.currentSeasonIdx = 0;
      this.currentWeekIdx = 0;
      this.currentStageIdx = 0;
      this.gameState = 'GAMEPLAY';

      document.getElementById('main-menu-overlay').style.display = 'none';
      document.getElementById('pause-overlay').style.display = 'none';

      const modeLabel = document.getElementById('mode-badge-label');
      const modeNotice = document.getElementById('mode-rule-notice');
      const scoreBadge = document.getElementById('hud-score-badge');
      const streakBadge = document.getElementById('hud-streak-badge');
      const btnPause = document.getElementById('btn-pause-game');

      if (streakBadge) streakBadge.textContent = '🔥 OFENSIVA: 0';

      if (mode === 'ranked') {
        modeLabel.className = 'mode-badge-ranked';
        modeLabel.textContent = 'MODO: DESAFIO DIÁRIO (RANQUEADO OFICIAL)';
        modeNotice.textContent = 'Pontuação oficial gravada (Pausa desativada por integridade)';
        scoreBadge.textContent = 'SCORE OFICIAL: 0';
        scoreBadge.style.color = 'var(--military-amber)';

        if (btnPause) {
          btnPause.disabled = true;
          btnPause.style.opacity = '0.35';
          btnPause.style.cursor = 'not-allowed';
          btnPause.title = 'Pausa bloqueada no Modo Ranqueado (Integridade Antifraude)';
          btnPause.textContent = '🔒 Pausa Bloqueada';
        }
      } else {
        modeLabel.className = 'mode-badge-training';
        modeLabel.textContent = 'MODO: CENTRAL DE TREINAMENTO (LIVRE)';
        modeNotice.textContent = 'Score isolado de estudo (não altera ranking)';
        scoreBadge.textContent = 'SCORE TREINO: 0';
        scoreBadge.style.color = 'var(--military-green)';

        if (btnPause) {
          btnPause.disabled = false;
          btnPause.style.opacity = '1';
          btnPause.style.cursor = 'pointer';
          btnPause.title = 'Pausar Operação (ESC)';
          btnPause.textContent = '⏸️ Pausar';
        }
      }

      this.loadSeasonWeek(this.currentSeasonIdx, this.currentWeekIdx);
    }

    pauseGame() {
      if (this.gameState !== 'GAMEPLAY') return;
      if (this.currentMode === 'ranked') {
        this.audio.playError();
        return;
      }
      this.gameState = 'PAUSED';
      this.audio.playClick();
      document.getElementById('pause-overlay').style.display = 'flex';
    }

    resumeGame() {
      this.gameState = 'GAMEPLAY';
      this.audio.playClick();
      document.getElementById('pause-overlay').style.display = 'none';
    }

    loadSeasonWeek(seasonIdx, weekIdx) {
      const seasons = LEVELS_DATA.temporadas || [];
      const season = seasons[seasonIdx] || seasons[0];
      const weeks = season.weeks || [];

      if (weekIdx >= weeks.length) {
        this.finishOperation();
        return;
      }

      this.currentMission = JSON.parse(JSON.stringify(weeks[weekIdx]));
      this.currentMission.mission_title = `${season.region_name} • ${this.currentMission.week_title}`;
      this.currentStageIdx = 0;

      // Carrega textura do mapa se houver
      if (this.renderer && this.currentMission.map_image) {
        this.renderer.loadMap(this.currentMission.map_image);
      }

      this.loadStage(0);
    }

    loadNextWeek() {
      const seasons = LEVELS_DATA.temporadas || [];
      const season = seasons[this.currentSeasonIdx] || seasons[0];
      const weeks = season.weeks || [];

      if (this.currentWeekIdx + 1 < weeks.length) {
        this.currentWeekIdx++;
        this.loadSeasonWeek(this.currentSeasonIdx, this.currentWeekIdx);
      } else if (this.currentSeasonIdx + 1 < seasons.length && seasons[this.currentSeasonIdx + 1].weeks.length > 0) {
        this.currentSeasonIdx++;
        this.currentWeekIdx = 0;
        this.loadSeasonWeek(this.currentSeasonIdx, this.currentWeekIdx);
      } else {
        this.finishOperation();
      }
    }

    loadStage(idx) {
      this.currentStageIdx = idx;
      const stages = this.currentMission.stages || [];
      if (idx >= stages.length) {
        this.handleVictory(this.currentMission, null);
        return;
      }

      const st = stages[idx];
      this.currentSector = st;
      this.timer = st.time_limit || 45;
      this.hintsUsedInSector = 0;

      if (st) {
        const targetPos = this.renderer.getSectorScreenPosition(st, stages, this.canvas.width || 700, this.canvas.height || 520);
        this.drone.setDestination(targetPos.x, targetPos.y);
      }

      this.hud.selectedProtoIdx = 0;
      this.hud.polarities = [];
      this.hud.slots = ['?', '?'];
      this.hud.renderSector(st, idx, stages.length, this.currentMission.mission_title);
    }

    handleStageSuccess(stage, protocol) {
      this.audio.playSuccess();

      const timeRatio = Math.max(0, this.timer / (stage.time_limit || 45));
      const mult = this.currentMode === 'ranked' ? 1.5 : 1.0;
      const basePoints = Math.floor((stage.base_score || 1000) * mult);
      const agilityBonus = Math.floor(basePoints * (timeRatio * 0.45));
      const gained = basePoints + agilityBonus;
      this.score += gained;
      this.streak++;

      const scoreBadge = document.getElementById('hud-score-badge');
      if (scoreBadge) {
        scoreBadge.textContent = this.currentMode === 'ranked' ? `SCORE OFICIAL: ${this.score}` : `SCORE TREINO: ${this.score}`;
      }
      const streakBadge = document.getElementById('hud-streak-badge');
      if (streakBadge) streakBadge.textContent = `🔥 OFENSIVA: ${this.streak}`;

      const stages = this.currentMission.stages || [];
      if (this.currentStageIdx + 1 < stages.length) {
        this.loadStage(this.currentStageIdx + 1);
      } else {
        this.handleVictory(this.currentMission, protocol);
      }
    }

    handleVictory(mission, protocol) {
      this.gameState = 'VICTORY';
      this.audio.playSuccess();

      const stars = this.streak >= 2 ? 3 : (this.hintsUsedInSector === 0 ? 2 : 1);
      document.getElementById('victory-stars').textContent = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
      document.getElementById('victory-score-report').innerHTML = `Pontuação Total da Surtida: <strong style="color:var(--military-green);">${this.score} pts</strong> (Ofensiva: 🔥 ${this.streak})`;
      document.getElementById('victory-details-report').textContent = `${mission.mission_title || mission.week_title || 'Missão'} cumprida com maestria! Todos os setores da surtida foram assegurados.`;

      document.getElementById('victory-overlay').style.display = 'flex';
    }

    handleDefeat(sector, protocol, customReason = null) {
      this.gameState = 'GAMEOVER';
      this.audio.playError();
      this.streak = 0;

      const streakBadge = document.getElementById('hud-streak-badge');
      if (streakBadge) streakBadge.textContent = '🔥 OFENSIVA: 0';

      const reason = customReason || `Falha de validação no ${protocol ? protocol.title : 'Protocolo'}: operadores violaram os parâmetros de segurança dos sensores.`;
      document.getElementById('defeat-reason').textContent = reason;
      document.getElementById('defeat-overlay').style.display = 'flex';
    }

    handleTimeout() {
      this.gameState = 'GAMEOVER';
      this.audio.playError();
      this.streak = 0;

      const streakBadge = document.getElementById('hud-streak-badge');
      if (streakBadge) streakBadge.textContent = '🔥 OFENSIVA: 0';

      document.getElementById('defeat-reason').textContent = `TEMPO OPERACIONAL ESGOTADO! O setor entrou em colapso antes do envio do protocolo.`;
      document.getElementById('defeat-overlay').style.display = 'flex';
    }

    finishOperation() {
      if (this.currentMode === 'ranked') {
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem('nexo_ranked_date', today);
        localStorage.setItem('nexo_official_score', this.score);
      }

      alert(`🏆 OPERAÇÃO REGIONAL CONCLUÍDA!\nVocê finalizou todas as semanas ativas da temporada com honras militares!\nPontuação Final: ${this.score} PONTOS.`);
      this.showMainMenu();
    }
  }

// Inicialização Automática se executado via ES Module
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    window.nexoApp = new OperacaoNexo();
  });
}
