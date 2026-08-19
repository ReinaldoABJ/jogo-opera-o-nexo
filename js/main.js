/**
 * ============================================================================
 * Main.js — Orquestrador Geral da Operação NEXO: Comando & Resgate
 * ============================================================================
 */
import { EventBus } from './core/event_bus.js';
import { GameLoop } from './core/game_loop.js';
import { SceneManager } from './core/scene_manager.js';
import { AccessibilitySystem } from './systems/accessibility.js';
import { AudioSystem } from './systems/audio.js';
import { InputManager } from './systems/input.js';
import { StorageManager } from './systems/storage.js';
import { DevDebugConsole } from './systems/debug.js';
import { MapRenderer } from './render/map_renderer.js';
import { DroneController } from './gameplay/drone_controller.js';
import { ScoringSystem } from './gameplay/scoring.js';
import { ChallengeEngine } from './gameplay/challenge_engine.js';
import { TacticalHUD } from './ui/tactical_hud.js';
import { BridgeAPI } from './bridge_api.js';

class OperacaoNexoEngine {
  constructor() {
    this.bus = new EventBus();
    this.audio = new AudioSystem(this.bus);
    this.storage = new StorageManager();
    this.scoring = new ScoringSystem(this.bus);
    this.bridge = new BridgeAPI('jogo_01_operacao_nexo');
    this.sceneManager = new SceneManager(this.bus);
    this.drone = new DroneController(45, 45);

    this.init();
  }

  async init() {
    // 1. Carrega dados de tradução e fases
    try {
      const [i18nRes, levelsRes] = await Promise.all([
        fetch('./data/i18n.json').then(r => r.json()),
        fetch('./data/levels.json').then(r => r.json())
      ]);
      this.i18n = i18nRes;
      this.levelsData = levelsRes;
    } catch (e) {
      console.warn('[Operação NEXO] Fallback de dados locais.');
      this.i18n = {};
      this.levelsData = { pool_treino: [], pool_ranqueado: [] };
    }

    // 2. Elementos DOM e Canvas
    this.canvas = document.getElementById('satellite-canvas');
    this.renderer = new MapRenderer(this.canvas);
    this.handleResize();
    window.addEventListener('resize', () => this.handleResize());

    // 3. Sistemas e HUD
    this.a11y = new AccessibilitySystem(this.bus, this.i18n);
    this.input = new InputManager(this.bus, this.canvas);
    this.hud = new TacticalHUD(this.bus, this.a11y, this.audio);
    this.challengeEngine = new ChallengeEngine(this.bus, this.levelsData);

    // 4. Telemetria
    this.debug = new DevDebugConsole(this.bus, this);
    this.debug.log('Operação NEXO: Centro de Comando Tático Operacional', 'info');

    // 5. Game Loop
    this.gameLoop = new GameLoop(
      (dt) => this.update(dt),
      () => this.render()
    );
    this.gameLoop.start();

    // 6. Atualiza Ofensiva
    const streak = this.storage.updateStreak();
    this.hud.updateStreak(streak);

    // 7. Configura Ouvintes
    this.setupEventListeners();

    // 8. Inicia a primeira emergência
    this.startMission('training', 'easy');
  }

  handleResize() {
    if (this.canvas) {
      const rect = this.canvas.parentElement.getBoundingClientRect();
      this.renderer.resize(rect.width || 680, rect.height || 540);
    }
  }

  setupEventListeners() {
    // Clique no mapa da cidade -> Move o Drone
    this.bus.on('MAP_CLICKED', ({ x, y }) => {
      this.audio.playClick();
      this.drone.setDestination(x, y);
      this.audio.playDroneFlight();
      this.debug.log(`Drone redirecionado para coordenadas: [X:${Math.round(x)}, Y:${Math.round(y)}]`);

      // Se clicou perto do setor ativo, acopla
      if (this.currentSector && this.currentSector.coordinates) {
        const dist = Math.hypot(x - this.currentSector.coordinates.x, y - this.currentSector.coordinates.y);
        if (dist < 40) {
          this.audio.playRadarPing();
        }
      }
    });

    // Execução do Protocolo
    this.bus.on('EXECUTE_PROTOCOL', ({ sector, protocol, userOperators }) => {
      this.evaluateProtocol(sector, protocol, userOperators);
    });

    // Pontuação
    this.bus.on('SCORE_UPDATED', (data) => {
      this.hud.updateScore(data.totalScore);
    });

    // Tempo Esgotado
    this.bus.on('TIME_EXPIRED', () => {
      this.audio.playError();
      alert('⚠️ TEMPO OPERACIONAL ESGOTADO! O setor entrou em colapso.');
      this.challengeEngine.loadNextSector();
      this.loadSectorToMesa();
    });

    // Botões do Topo
    const btnRanked = document.getElementById('btn-mode-ranked');
    const btnTraining = document.getElementById('btn-mode-training');
    if (btnRanked) btnRanked.onclick = () => this.startMission('ranked', 'medium');
    if (btnTraining) btnTraining.onclick = () => this.startMission('training', 'easy');
  }

  startMission(mode, diff) {
    this.challengeEngine.setMode(mode);
    this.scoring.setDifficulty(diff);
    this.scoring.reset();
    this.hud.updateScore(0);

    const sec = this.challengeEngine.loadNextSector();
    if (sec && sec.coordinates) {
      this.currentSector = sec;
      this.drone.setDestination(sec.coordinates.x, sec.coordinates.y);
      this.loadSectorToMesa();
    }
  }

  loadSectorToMesa() {
    this.currentSector = this.challengeEngine.currentSector;
    if (this.currentSector) {
      this.hud.renderActiveSector(this.currentSector);
      this.debug.log(`Mesa Tática carregou o setor: ${this.currentSector.sector_name}`);
    }
  }

  evaluateProtocol(sector, protocol, userOperators) {
    const correct = protocol.correct_operators || ['AND', 'AND'];
    const isCorrect = userOperators.every((op, idx) => op === correct[idx]);

    if (isCorrect) {
      this.audio.playSuccess();
      const res = this.scoring.calculateResult(
        sector.base_score || 1000,
        this.challengeEngine.getTimeRatio()
      );

      alert(`🎖️ SUCESSO TÁTICO!\n${protocol.title} executado com maestria!\nPontos Ganhos: +${res.scoreGained} (${res.stars} ⭐)`);
      this.debug.log(`Protocolo ${protocol.id} validado com sucesso! (+${res.scoreGained} pts)`);

      // Carrega próximo setor
      const next = this.challengeEngine.loadNextSector();
      if (next && next.coordinates) {
        this.currentSector = next;
        this.drone.setDestination(next.coordinates.x, next.coordinates.y);
        this.loadSectorToMesa();
      } else {
        // Fim da Operação
        this.finishOperation();
      }
    } else {
      this.audio.playError();
      alert('❌ FALHA NO PROTOCOLO LÓGICO!\nOs operadores booleanos inseridos não satisfizeram as condições de segurança dos sensores. Consulte o Manual Lógico se tiver dúvidas!');
      this.debug.log(`Tentativa incorreta de protocolo: [${userOperators.join(', ')}]`, 'warn');
    }
  }

  finishOperation() {
    this.bridge.sendMatchResult({
      score: this.scoring.currentScore,
      stars: this.scoring.starsEarned || 1,
      mode: this.challengeEngine.currentMode,
      difficulty: this.scoring.currentDifficulty
    });

    alert(`🏆 OPERAÇÃO NEXO CONCLUÍDA!\nTodos os setores em crise foram pacificados e resgatados.\nPontuação Final do Comandante: ${this.scoring.currentScore} PONTOS.`);
    this.startMission('training', 'easy');
  }

  update(dt) {
    this.drone.update(dt);
    this.challengeEngine.updateTimer(dt);
    this.hud.updateTimer(this.challengeEngine.activeTimer);
    this.debug.updateFPS(this.gameLoop.fps);
  }

  render() {
    this.renderer.render(
      this.drone,
      this.currentSector,
      { x: this.drone.targetX, y: this.drone.targetY }
    );
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.nexoApp = new OperacaoNexoEngine();
});
