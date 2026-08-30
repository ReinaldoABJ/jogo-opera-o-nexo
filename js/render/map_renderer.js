import { SpriteBank } from "./sprite_bank.js";
import { CityGridEngine } from "./city_grid_engine.js";

export class MapRenderer {
  constructor(canvas, spriteBank = null) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.rotorAngle = 0;
    this.bank = spriteBank || new SpriteBank();
    this.gridEngine = new CityGridEngine(8, 6);

    this.smoke = [];
    for (let i = 0; i < 28; i++) {
      this.smoke.push({
        x: 180 + (Math.random() * 30 - 15),
        y: 140 + (Math.random() * 30 - 15),
        r: Math.random() * 8 + 4,
        a: Math.random() * 0.5 + 0.2,
        sp: Math.random() * 0.4 + 0.2
      });
    }

    this.currentMapSrc = "";
    this.mapLoaded = false;

    // Vídeo Feed do Drone Militar com Hélices em Rotação
    this.droneVideo = document.createElement("video");
    this.droneVideo.src = "./assets/sprites/drone_square_512.mp4";
    this.droneVideo.loop = true;
    this.droneVideo.muted = true;
    this.droneVideo.playsInline = true;
    this.droneVideo.autoplay = true;
    this.droneVideo.setAttribute("playsinline", "");
    this.droneVideo.setAttribute("webkit-playsinline", "");
    this.droneVideo.style.cssText = "position:fixed; top:-9999px; left:-9999px; width:1px; height:1px; opacity:0; pointer-events:none;";
    if (typeof document !== "undefined" && document.body) {
      document.body.appendChild(this.droneVideo);
    }
    
    const triggerPlay = () => {
      if (this.droneVideo && this.droneVideo.paused) {
        this.droneVideo.play().catch(() => {});
      }
    };
    triggerPlay();
    if (typeof window !== "undefined") {
      window.addEventListener("pointerdown", triggerPlay, { passive: true });
      window.addEventListener("keydown", triggerPlay, { passive: true });
    }
  }

  loadMap(imageSrc) {
    const src = imageSrc || "./assets/sprites/map_satellite.png";
    if (this.currentMapSrc === src && this.mapLoaded) return;
    this.currentMapSrc = src;
    this.mapLoaded = false;
    this.mapImg = new Image();
    this.mapImg.onload = () => { this.mapLoaded = true; };
    this.mapImg.onerror = () => { this.mapLoaded = false; };
    this.mapImg.src = src;
  }

  resize(w, h) {
    this.canvas.width = w;
    this.canvas.height = h;
  }

  getSectorScreenPosition(sector, stages, width, height) {
    if (!sector) return { x: width * 0.5, y: height * 0.5 };
    const coords = sector.coordinates || { x: 180, y: 140 };
    const normX = Math.min(0.92, Math.max(0.08, coords.x / 700));
    const normY = Math.min(0.92, Math.max(0.08, coords.y / 520));
    const cell = this.gridEngine.getGridCell(normX, normY);
    const center = this.gridEngine.getCellCenter(cell.col, cell.row, width, height);
    return { x: center.x, y: center.y, cell };
  }

  render(drone, sector, waypoint, threatRatio = 0, currentMission = null, activeStageIdx = 0) {
    const ctx = this.ctx;
    const w = this.canvas.width || 700;
    const h = this.canvas.height || 520;

    // 1. Camada 0: Base de Satélite / Solo Terrestre
    if (this.mapLoaded && this.mapImg && this.mapImg.naturalWidth > 0) {
      const imgW = this.mapImg.naturalWidth;
      const imgH = this.mapImg.naturalHeight;
      const scale = Math.max(w / imgW, h / imgH);
      const renderW = imgW * scale;
      const renderH = imgH * scale;
      const offsetX = (w - renderW) / 2;
      const offsetY = (h - renderH) / 2;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(this.mapImg, offsetX, offsetY, renderW, renderH);

      // Filtro tático
      ctx.fillStyle = "rgba(16, 20, 24, 0.35)";
      ctx.fillRect(0, 0, w, h);
    } else {
      ctx.fillStyle = "#182026";
      ctx.fillRect(0, 0, w, h);
    }

    // 2. Camada 1: Grade Urbana Completa (48 Quarteirões Procedurais)
    const stages = (currentMission && currentMission.stages) ? currentMission.stages : (sector ? [sector] : []);
    const missionId = currentMission ? (currentMission.id || currentMission.title) : "nexo_default";
    const gridLayout = this.gridEngine.generateLayout(missionId, 42, stages);

    const cellW = w / this.gridEngine.cols;
    const cellH = h / this.gridEngine.rows;

    // 2.1 Malha Viária (Ruas e Avenidas entre quarteirões)
    ctx.save();
    ctx.fillStyle = "rgba(22, 28, 34, 0.75)";
    for (let r = 0; r <= this.gridEngine.rows; r++) {
      const y = r * cellH;
      ctx.fillRect(0, y - 4, w, 8);
    }
    for (let c = 0; c <= this.gridEngine.cols; c++) {
      const x = c * cellW;
      ctx.fillRect(x - 4, 0, 8, h);
    }
    ctx.strokeStyle = "rgba(229, 160, 13, 0.2)";
    ctx.lineWidth = 0.8;
    ctx.setLineDash([4, 6]);
    for (let r = 0; r < this.gridEngine.rows; r++) {
      const y = (r + 0.5) * cellH;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
    for (let c = 0; c < this.gridEngine.cols; c++) {
      const x = (c + 0.5) * cellW;
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    ctx.setLineDash([]);
    ctx.restore();

    // 2.2 Renderização dos 48 Quarteirões & Edificações do Banco de Sprites
    gridLayout.forEach(cell => {
      const marginX = cellW * 0.08;
      const marginY = cellH * 0.08;
      const bx = cell.col * cellW + marginX;
      const by = cell.row * cellH + marginY;
      const bw = cellW - marginX * 2;
      const bh = cellH - marginY * 2;

      if (cell.isTarget) {
        // --- ALVO HERO DA MISSÃO ---
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.fillRect(bx + 4, by + 4, bw, bh);

        const sKey = cell.structure.spriteKey;
        const heroImg = this.bank.get(sKey);
        if (heroImg && heroImg.naturalWidth > 0) {
          ctx.drawImage(heroImg, bx, by, bw, bh);
        } else {
          ctx.fillStyle = "rgba(42, 54, 65, 0.95)";
          ctx.fillRect(bx, by, bw, bh);
        }

        // Moldura Tática de Reconhecimento
        const isActive = cell.stageIdx === activeStageIdx;
        ctx.strokeStyle = isActive ? "#e5a00d" : "rgba(229, 160, 13, 0.6)";
        ctx.lineWidth = isActive ? 3 : 2;
        ctx.strokeRect(bx, by, bw, bh);

        // Tag de Identificação [A], [B]
        ctx.fillStyle = "rgba(17, 20, 23, 0.94)";
        ctx.fillRect(bx + 2, by + 2, 28, 16);
        ctx.strokeStyle = "#e5a00d";
        ctx.lineWidth = 1;
        ctx.strokeRect(bx + 2, by + 2, 28, 16);
        ctx.fillStyle = "#e5a00d";
        ctx.font = "bold 10px monospace";
        const stageChar = String.fromCharCode(65 + Math.max(0, cell.stageIdx));
        ctx.fillText("[" + stageChar + "]", bx + 6, by + 14);

      } else {
        // --- QUARTEIRÃO PROCEDURAL DA CIDADE ---
        const struct = cell.structure || {};

        if (struct.ground === "grass") {
          // Lote Residencial (Grama)
          ctx.fillStyle = "rgba(38, 56, 42, 0.55)";
          ctx.fillRect(bx, by, bw, bh);
        } else if (struct.ground === "park") {
          // Praça Pública com Árvores
          ctx.fillStyle = "rgba(32, 60, 36, 0.7)";
          ctx.fillRect(bx, by, bw, bh);
          ctx.strokeStyle = "rgba(78, 201, 92, 0.35)";
          ctx.lineWidth = 1;
          ctx.strokeRect(bx, by, bw, bh);

          if (!struct.spriteKey) {
            const treeImg = this.bank.get("sub_tree-large.png") || this.bank.get("tree_large.png");
            if (treeImg && treeImg.naturalWidth > 0) {
              const tSize = Math.min(bw, bh) * 0.42;
              ctx.drawImage(treeImg, bx + bw * 0.12, by + bh * 0.22, tSize, tSize);
              ctx.drawImage(treeImg, bx + bw * 0.52, by + bh * 0.32, tSize, tSize);
            }
          }
        } else if (struct.ground === "industrial") {
          // Zona Industrial & Infraestrutura Crítica
          ctx.fillStyle = "rgba(40, 36, 32, 0.65)";
          ctx.fillRect(bx, by, bw, bh);
          ctx.strokeStyle = "rgba(229, 160, 13, 0.25)";
          ctx.lineWidth = 1;
          ctx.strokeRect(bx, by, bw, bh);
        } else if (struct.ground === "parking") {
          // Estacionamento com Demarcação de Vagas
          ctx.fillStyle = "rgba(28, 34, 40, 0.7)";
          ctx.fillRect(bx, by, bw, bh);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
          ctx.lineWidth = 0.8;
          const slotStep = bw / 4;
          for (let v = slotStep; v < bw; v += slotStep) {
            ctx.beginPath(); ctx.moveTo(bx + v, by + 2); ctx.lineTo(bx + v, by + bh - 2); ctx.stroke();
          }
        } else {
          // Pavimento Comercial / Pátio
          ctx.fillStyle = "rgba(34, 40, 48, 0.55)";
          ctx.fillRect(bx, by, bw, bh);
        }

        // Desenhar Sprite do Edifício / Casa sorteado do Banco
        if (struct.spriteKey) {
          const bImg = this.bank.get(struct.spriteKey);
          if (bImg && bImg.naturalWidth > 0) {
            const imgAspect = bImg.naturalWidth / bImg.naturalHeight;
            let drawW = bw * 0.84;
            let drawH = bh * 0.84;
            if (imgAspect > 1) {
              drawH = drawW / imgAspect;
            } else {
              drawW = drawH * imgAspect;
            }
            const drawX = bx + (bw - drawW) / 2;
            const drawY = by + (bh - drawH) / 2;

            // Sombra projetada
            ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
            ctx.fillRect(drawX + 3, drawY + 3, drawW, drawH);

            // Sprite top-down
            ctx.drawImage(bImg, drawX, drawY, drawW, drawH);
          }
        }
      }
    });

    // 3. Corredor Tático de Voo da Missão
    if (currentMission && currentMission.stages && currentMission.stages.length > 1) {
      this.drawFlightCorridor(ctx, currentMission, activeStageIdx, w, h);
    }

    // 4. Efeitos Dinâmicos de Emergência (Fumaça, Chamas e Gás)
    if (sector) {
      const targetPos = this.getSectorScreenPosition(sector, stages, w, h);
      const sx = targetPos.x;
      const sy = targetPos.y;
      const spreadFactor = 1 + threatRatio * 1.5;
      const isGas = sector.sensors && sector.sensors.GAS_TOXICO;
      const isFire = sector.sensors && sector.sensors.FOGO_ATIVO !== false;

      this.smoke.forEach(p => {
        p.y -= p.sp * (1 + threatRatio * 0.8);
        if (p.y < sy - 50 * spreadFactor) {
          p.y = sy + (Math.random() * 20 - 10);
          p.x = sx + (Math.random() * 32 - 16) * spreadFactor;
        }

        if (isFire) {
          ctx.fillStyle = "rgba(" + (190 + Math.floor(threatRatio * 65)) + ", " + (70 - Math.floor(threatRatio * 35)) + ", 25, " + (p.a * (0.35 + threatRatio * 0.4)) + ")";
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (1 + threatRatio * 0.6), 0, Math.PI * 2); ctx.fill();
        }

        if (isGas) {
          ctx.fillStyle = "rgba(100, 190, 45, " + (p.a * (0.3 + threatRatio * 0.35)) + ")";
          ctx.beginPath(); ctx.arc(p.x - 6, p.y + 4, p.r * (1.1 + threatRatio * 0.5), 0, Math.PI * 2); ctx.fill();
        }

        ctx.fillStyle = "rgba(35, 40, 45, " + (p.a * (0.5 + threatRatio * 0.3)) + ")";
        ctx.beginPath(); ctx.arc(p.x + 4, p.y - 6, p.r * 1.3 * (1 + threatRatio * 0.4), 0, Math.PI * 2); ctx.fill();
      });

      const baseRadius = Math.min(cellW, cellH) * 0.4;
      const expandRadius = baseRadius + threatRatio * 28;
      const pulse = Math.sin(Date.now() / 180) * (2 + threatRatio * 4);

      let perimeterColor = "#4ec95c";
      let label = "SETOR ATIVO (EMERGÊNCIA)";
      if (threatRatio > 0.7) {
        perimeterColor = "#ff3333";
        label = "🚨 COLAPSO IMINENTE!";
      } else if (threatRatio > 0.35) {
        perimeterColor = "#e5a00d";
        label = "⚠️ RISCO ELEVADO";
      }

      ctx.strokeStyle = perimeterColor;
      ctx.lineWidth = threatRatio > 0.7 ? 3 : 2;
      ctx.beginPath();
      ctx.arc(sx, sy, expandRadius + pulse, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = threatRatio > 0.7 ? "rgba(255, 51, 51, 0.22)" : "rgba(224, 75, 71, 0.15)";
      ctx.beginPath();
      ctx.arc(sx, sy, expandRadius + pulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = perimeterColor;
      ctx.font = "bold 11px sans-serif";
      ctx.fillText(label, sx - 50, sy - expandRadius - 8);
    }

    // 5. Waypoint
    if (waypoint && waypoint.x !== undefined) {
      ctx.strokeStyle = "#e5a00d"; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.arc(waypoint.x, waypoint.y, 12, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(waypoint.x - 16, waypoint.y); ctx.lineTo(waypoint.x + 16, waypoint.y);
      ctx.moveTo(waypoint.x, waypoint.y - 16); ctx.lineTo(waypoint.x, waypoint.y + 16); ctx.stroke();
      ctx.setLineDash([]);
    }

    // 6. Drone Militar Tático com Vídeo/Hélices Animadas
    if (drone) {
      ctx.save();
      ctx.translate(drone.x, drone.y);
      ctx.rotate(drone.angle);

      const drawSize = 46;

      // Sombra projetada no terreno
      ctx.save();
      ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
      ctx.beginPath();
      ctx.arc(3, 4, drawSize * 0.38, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (this.droneVideo && this.droneVideo.readyState >= 2) {
        // Tenta garantir reprodução ativa
        if (this.droneVideo.paused) {
          this.droneVideo.play().catch(() => {});
        }
        ctx.drawImage(this.droneVideo, -drawSize / 2, -drawSize / 2, drawSize, drawSize);
      } else {
        const droneImg = this.bank.get("drone");
        if (droneImg && droneImg.naturalWidth > 0) {
          if (drone.isMoving) {
            this.rotorAngle += 0.5;
            ctx.save();
            ctx.rotate(this.rotorAngle);
            ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, 22, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
          }
          ctx.drawImage(droneImg, -drawSize / 2, -drawSize / 2, drawSize, drawSize);
        } else {
          this.rotorAngle += 0.4;
          const rots = [{x:-16,y:-16},{x:16,y:-16},{x:-16,y:16},{x:16,y:16}];
          rots.forEach(pos => {
            ctx.save(); ctx.translate(pos.x, pos.y); ctx.rotate(this.rotorAngle);
            ctx.fillStyle = "rgba(140, 160, 180, 0.7)"; ctx.fillRect(-10, -1.5, 20, 3);
            ctx.restore();
          });

          ctx.fillStyle = "#3b4a3c";
          ctx.beginPath(); ctx.roundRect(-10, -12, 20, 24, 4); ctx.fill();
          ctx.strokeStyle = "#273038"; ctx.stroke();

          ctx.fillStyle = "#e5a00d"; ctx.beginPath(); ctx.arc(0, -10, 3, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = "#4ec95c"; ctx.fillRect(-8, 8, 2, 2);
          ctx.fillStyle = "#e04b47"; ctx.fillRect(6, 8, 2, 2);
        }
      }

      ctx.restore();
    }

    // 7. Grid Militar Translúcido de Satélite
    ctx.strokeStyle = "rgba(56, 69, 80, 0.12)"; ctx.lineWidth = 0.5;
    for (let x = 0; x < w; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y < h; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
  }

  drawFlightCorridor(ctx, mission, activeStageIdx, w, h) {
    if (!mission || !mission.stages || mission.stages.length <= 1) return;
    const stages = mission.stages;

    const baseCenter = this.gridEngine.getCellCenter(0, 0, w, h);
    ctx.save();
    ctx.strokeStyle = "rgba(229, 160, 13, 0.45)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 5]);

    ctx.beginPath();
    ctx.moveTo(baseCenter.x, baseCenter.y);
    stages.forEach(st => {
      const pos = this.getSectorScreenPosition(st, stages, w, h);
      ctx.lineTo(pos.x, pos.y);
    });
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    stages.forEach((st, idx) => {
      const pos = this.getSectorScreenPosition(st, stages, w, h);
      const { x, y } = pos;
      const isDone = idx < activeStageIdx;
      const isActive = idx === activeStageIdx;

      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, Math.PI * 2);
      if (isDone) {
        ctx.fillStyle = "rgba(78, 201, 92, 0.35)";
        ctx.fill();
        ctx.strokeStyle = "#4ec95c";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = "#4ec95c";
        ctx.font = "bold 10px monospace";
        ctx.fillText("✓", x - 4, y + 4);
      } else if (isActive) {
        ctx.fillStyle = "rgba(229, 160, 13, 0.3)";
        ctx.fill();
        ctx.strokeStyle = "#e5a00d";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = "#e5a00d";
        ctx.font = "bold 10px monospace";
        ctx.fillText(String.fromCharCode(65 + idx), x - 4, y + 4);
      } else {
        ctx.fillStyle = "rgba(56, 69, 80, 0.3)";
        ctx.fill();
        ctx.strokeStyle = "#6e7d8a";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = "#8c9ba5";
        ctx.font = "bold 10px monospace";
        ctx.fillText(String.fromCharCode(65 + idx), x - 4, y + 4);
      }
      ctx.restore();
    });
  }
}
