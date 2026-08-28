/**
 * ============================================================================
 * MapRenderer — Renderizador Aéreo Satélite Militar Realista (Canvas 2D)
 * ============================================================================
 * Desenha o mapa ortofotográfico da cidade preservando o aspect-ratio nativo
 * sem distorções ou estiramento de pixels, com fumaça térmica, waypoints,
 * marcadores militares e o drone com rotação suave e luzes táticas.
 */
export class MapRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.rotorAngle = 0;
    this.smokeParticles = [];

    this.mapLoaded = false;
    this.droneLoaded = false;

    this.currentMapSrc = '';
    this.loadMap('./assets/sprites/map_satellite.png');

    this.droneImg = new Image();
    this.droneImg.onload = () => { this.droneLoaded = true; };
    this.droneImg.src = './assets/sprites/drone.png';

    this.initSmoke();
  }

  loadMap(imageSrc) {
    const src = imageSrc || './assets/sprites/map_satellite.png';
    if (this.currentMapSrc === src && this.mapLoaded) return;
    this.currentMapSrc = src;
    this.mapLoaded = false;
    this.mapImg = new Image();
    this.mapImg.onload = () => { this.mapLoaded = true; };
    this.mapImg.onerror = () => { this.mapLoaded = false; }; // Fallback procedural automático
    this.mapImg.src = src;
  }

  initSmoke() {
    for (let i = 0; i < 20; i++) {
      this.smokeParticles.push({
        x: 180 + (Math.random() * 30 - 15),
        y: 140 + (Math.random() * 30 - 15),
        radius: Math.random() * 8 + 4,
        alpha: Math.random() * 0.5 + 0.2,
        speedY: Math.random() * 0.4 + 0.2
      });
    }
  }

  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  render(drone, activeSector, targetCoords, threatRatio = 0, currentMission = null, activeStageIdx = 0) {
    const ctx = this.ctx;
    const w = this.canvas.width || 700;
    const h = this.canvas.height || 520;

    // 1. Renderiza Imagem de Satélite com Aspect-Ratio Perfeito (Cover Inteligente)
    if (this.mapLoaded && this.mapImg.naturalWidth > 0) {
      const imgW = this.mapImg.naturalWidth;
      const imgH = this.mapImg.naturalHeight;
      const scale = Math.max(w / imgW, h / imgH);
      const renderW = imgW * scale;
      const renderH = imgH * scale;
      const offsetX = (w - renderW) / 2;
      const offsetY = (h - renderH) / 2;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(this.mapImg, offsetX, offsetY, renderW, renderH);

      // Camada tática escura sobre a imagem de satélite
      ctx.fillStyle = 'rgba(17, 20, 23, 0.35)';
      ctx.fillRect(0, 0, w, h);
    } else {
      // Fallback Procedural de Alta Fidelidade (Quarteirões e Prédios)
      ctx.fillStyle = '#1c2226';
      ctx.fillRect(0, 0, w, h);
      this.drawCityBlocks(ctx, w, h);
    }

    // 2. Desenha Corredor Tático de Voo da Missão Multissetorial
    if (currentMission && currentMission.stages) {
      this.drawFlightCorridor(ctx, currentMission, activeStageIdx);
    }

    // 3. Desenha Efeitos Térmicos / Fumaça e Gás em Expansão Dinâmica
    this.drawThermalDisaster(ctx, activeSector, threatRatio);

    // 4. Desenha Ponto de Destino / Waypoint Clicado
    if (targetCoords && targetCoords.x !== undefined) {
      this.drawWaypoint(ctx, targetCoords.x, targetCoords.y);
    }

    // 5. Desenha Setores Táticos de Emergência (Marcador e Raio de Colapso Dinâmico)
    if (activeSector && activeSector.coordinates) {
      this.drawSectorMarker(ctx, activeSector, threatRatio);
    }

    // 6. Desenha o Drone Militar Tático com Hélices Animadas / Sprite
    this.drawDrone(ctx, drone);

    // 7. Grid de Mira de Reconhecimento Militar
    this.drawMilitaryGrid(ctx, w, h);
  }

  drawFlightCorridor(ctx, mission, activeStageIdx) {
    if (!mission || !mission.stages || mission.stages.length <= 1) return;
    const stages = mission.stages;

    ctx.save();
    ctx.strokeStyle = 'rgba(229, 160, 13, 0.45)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 5]);

    ctx.beginPath();
    ctx.moveTo(45, 45); // Base-01
    stages.forEach(st => {
      if (st.coordinates) ctx.lineTo(st.coordinates.x, st.coordinates.y);
    });
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    // Marcadores dos Pontos Encadeados da Missão
    stages.forEach((st, idx) => {
      if (!st.coordinates) return;
      const { x, y } = st.coordinates;
      const isDone = idx < activeStageIdx;
      const isActive = idx === activeStageIdx;

      if (isDone) {
        ctx.fillStyle = '#4ec95c';
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#111417';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText('✓', x - 4, y + 4);
      } else if (!isActive) {
        ctx.strokeStyle = '#556877';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = '#8fa3b0';
        ctx.font = 'bold 9px monospace';
        ctx.fillText(`P${idx + 1}`, x - 6, y + 3);
      }
    });
  }

  drawCityBlocks(ctx, w, h) {
    ctx.strokeStyle = '#273038';
    ctx.lineWidth = 1;

    const buildings = [
      { x: 40, y: 40, w: 100, h: 80, color: '#2b353e' },
      { x: 180, y: 50, w: 120, h: 90, color: '#33404b' },
      { x: 340, y: 40, w: 90, h: 110, color: '#2b353e' },
      { x: 470, y: 60, w: 140, h: 80, color: '#35434e' },

      { x: 50, y: 180, w: 90, h: 120, color: '#313e48' },
      { x: 230, y: 220, w: 140, h: 100, color: '#2d3842' },
      { x: 410, y: 200, w: 110, h: 130, color: '#384855' },

      { x: 60, y: 350, w: 150, h: 90, color: '#2a343d' },
      { x: 260, y: 370, w: 110, h: 80, color: '#33414c' },
      { x: 420, y: 380, w: 160, h: 80, color: '#2e3a44' }
    ];

    buildings.forEach(b => {
      ctx.fillStyle = b.color;
      ctx.fillRect(b.x, b.y, b.w, b.h);
      ctx.strokeRect(b.x, b.y, b.w, b.h);

      ctx.fillStyle = '#1e252b';
      ctx.fillRect(b.x + 10, b.y + 10, 16, 16);
      ctx.fillRect(b.x + b.w - 26, b.y + 12, 14, 14);
    });

    // Base de Decolagem / Heliponto Principal
    ctx.strokeStyle = '#4a5c4c';
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 20, 50, 50);
    ctx.fillStyle = '#4ec95c';
    ctx.font = '10px monospace';
    ctx.fillText('BASE-01', 24, 48);
  }

  drawThermalDisaster(ctx, sector, threatRatio = 0) {
    if (!sector || !sector.coordinates) return;
    const sx = sector.coordinates.x;
    const sy = sector.coordinates.y;

    const spreadFactor = 1 + threatRatio * 1.5;
    const isGas = sector.sensors && sector.sensors.GAS_TOXICO;
    const isFire = sector.sensors && sector.sensors.FOGO_ATIVO !== false;

    this.smokeParticles.forEach(p => {
      p.y -= p.speedY * (1 + threatRatio * 0.8);
      if (p.y < sy - 50 * spreadFactor) {
        p.y = sy + (Math.random() * 24 - 12);
        p.x = sx + (Math.random() * 40 - 20) * spreadFactor;
      }

      if (isFire) {
        ctx.fillStyle = `rgba(${180 + Math.floor(threatRatio * 75)}, ${60 - Math.floor(threatRatio * 30)}, 30, ${p.alpha * (0.35 + threatRatio * 0.4)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * (1 + threatRatio * 0.6), 0, Math.PI * 2);
        ctx.fill();
      }

      if (isGas) {
        ctx.fillStyle = `rgba(110, 180, 50, ${p.alpha * (0.3 + threatRatio * 0.35)})`;
        ctx.beginPath();
        ctx.arc(p.x - 8, p.y + 4, p.radius * (1.1 + threatRatio * 0.5), 0, Math.PI * 2);
        ctx.fill();
      }

      // Fumaça densa
      ctx.fillStyle = `rgba(40, 45, 50, ${p.alpha * (0.5 + threatRatio * 0.3)})`;
      ctx.beginPath();
      ctx.arc(p.x + 4, p.y - 6, p.radius * 1.3 * (1 + threatRatio * 0.4), 0, Math.PI * 2);
      ctx.fill();
    });
  }

  drawWaypoint(ctx, x, y) {
    ctx.strokeStyle = '#e5a00d';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);

    ctx.beginPath();
    ctx.arc(x, y, 12, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x - 16, y); ctx.lineTo(x + 16, y);
    ctx.moveTo(x, y - 16); ctx.lineTo(x, y + 16);
    ctx.stroke();

    ctx.setLineDash([]);
  }

  drawSectorMarker(ctx, sector, threatRatio = 0) {
    const { x, y } = sector.coordinates;
    const baseRadius = 28;
    const expandRadius = baseRadius + threatRatio * 32;
    const pulse = Math.sin(Date.now() / 180) * (2 + threatRatio * 4);

    let perimeterColor = '#4ec95c';
    let label = 'EMERGÊNCIA (CONTROLADA)';
    if (threatRatio > 0.7) {
      perimeterColor = '#ff3333';
      label = '🚨 COLAPSO IMINENTE!';
    } else if (threatRatio > 0.35) {
      perimeterColor = '#e5a00d';
      label = '⚠️ RISCO ELEVADO';
    }

    // Aura pulsante de perigo
    ctx.strokeStyle = perimeterColor;
    ctx.lineWidth = threatRatio > 0.7 ? 3 : 2;
    ctx.beginPath();
    ctx.arc(x, y, expandRadius + pulse, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = threatRatio > 0.7 ? 'rgba(255, 51, 51, 0.22)' : 'rgba(224, 75, 71, 0.15)';
    ctx.beginPath();
    ctx.arc(x, y, expandRadius + pulse, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = perimeterColor;
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText(label, x - 48, y - expandRadius - 8);
  }

  drawDrone(ctx, drone) {
    if (!drone) return;

    ctx.save();
    ctx.translate(drone.x, drone.y);
    ctx.rotate(drone.angle);

    // Círculo de Scanner do Radar Militar quando pairando
    ctx.strokeStyle = 'rgba(78, 201, 92, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, 0, 44, 0, Math.PI * 2);
    ctx.stroke();

    if (this.droneLoaded && this.droneImg.naturalWidth > 0) {
      const dW = this.droneImg.naturalWidth;
      const dH = this.droneImg.naturalHeight;
      const maxDim = 56;
      const dRatio = dW / dH;
      let drawW = maxDim;
      let drawH = maxDim;
      if (dRatio > 1) {
        drawH = maxDim / dRatio;
      } else {
        drawW = maxDim * dRatio;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(this.droneImg, -drawW / 2, -drawH / 2, drawW, drawH);
    } else {
      // Braços dos 4 Motores de Fibra de Carbono
      ctx.strokeStyle = '#14181c';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-16, -16); ctx.lineTo(16, 16);
      ctx.moveTo(-16, 16); ctx.lineTo(16, -16);
      ctx.stroke();

      // 4 Hélices Giratórias Animadas
      this.rotorAngle += 0.4;
      const rotorOffsets = [
        { x: -16, y: -16 }, { x: 16, y: -16 },
        { x: -16, y: 16 }, { x: 16, y: 16 }
      ];

      rotorOffsets.forEach(pos => {
        ctx.save();
        ctx.translate(pos.x, pos.y);
        ctx.rotate(this.rotorAngle);
        ctx.fillStyle = 'rgba(140, 160, 180, 0.7)';
        ctx.fillRect(-10, -1.5, 20, 3);
        ctx.restore();
      });

      // Corpo Central do Drone Militar
      ctx.fillStyle = '#3b4a3c';
      ctx.beginPath();
      ctx.roundRect(-10, -12, 20, 24, 4);
      ctx.fill();

      ctx.strokeStyle = '#273038';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Câmera Térmica / Sensor Frontal
      ctx.fillStyle = '#e5a00d';
      ctx.beginPath();
      ctx.arc(0, -10, 3, 0, Math.PI * 2);
      ctx.fill();

      // Luzes Estroboscópicas de Navegação
      ctx.fillStyle = '#4ec95c';
      ctx.fillRect(-8, 8, 2, 2);
      ctx.fillStyle = '#e04b47';
      ctx.fillRect(6, 8, 2, 2);
    }

    ctx.restore();
  }

  drawMilitaryGrid(ctx, w, h) {
    ctx.strokeStyle = 'rgba(56, 69, 80, 0.2)';
    ctx.lineWidth = 0.5;

    for (let x = 0; x < w; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0); ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 60) {
      ctx.beginPath();
      ctx.moveTo(0, y); ctx.lineTo(w, y);
      ctx.stroke();
    }
  }
}
