import { SpriteBank } from "./sprite_bank.js";
import { CityGridEngine } from "./city_grid_engine.js";

export class MapRenderer {
  constructor(canvas, spriteBank = null) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.rotorAngle = 0;
    this.bank = spriteBank || new SpriteBank();
    this.gridEngine = new CityGridEngine(6, 4);

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

  getStageAtPosition(x, y, stages, width, height) {
    if (!stages || stages.length === 0) return -1;
    const w = width || this.canvas.width || 700;
    const h = height || this.canvas.height || 520;
    const cellW = w / this.gridEngine.cols;
    const cellH = h / this.gridEngine.rows;

    for (let i = 0; i < stages.length; i++) {
      const pos = this.getSectorScreenPosition(stages[i], stages, w, h);
      if (pos && pos.cell) {
        const x0 = pos.cell.col * cellW;
        const x1 = (pos.cell.col + 1) * cellW;
        const y0 = pos.cell.row * cellH;
        const y1 = (pos.cell.row + 1) * cellH;

        if (x >= x0 && x <= x1 && y >= y0 && y <= y1) {
          return i;
        }
      }
    }
    return -1;
  }

  render(drone, sector, waypoint, threatRatio = 0, currentMission = null, activeStageIdx = 0, resolvedStages = new Set(), stageReports = []) {
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

    // 2. Camada 1: Malha Urbana Realista (Ruas, Calçadas e Quarteirões Procedurais)
    const fallbackStages = (window.LEVELS_DATA && window.LEVELS_DATA.temporadas && window.LEVELS_DATA.temporadas[0] && window.LEVELS_DATA.temporadas[0].weeks[0]) ? window.LEVELS_DATA.temporadas[0].weeks[0].stages : [];
    const stages = (currentMission && currentMission.stages && currentMission.stages.length > 0) ? currentMission.stages : (sector ? [sector] : fallbackStages);
    const missionId = currentMission ? (currentMission.id || currentMission.title) : "nexo_default";
    const gridLayout = this.gridEngine.generateLayout(missionId, 42, stages);

    const cols = this.gridEngine.cols;
    const rows = this.gridEngine.rows;
    const cellW = w / cols;
    const cellH = h / rows;
    const roadWidth = Math.max(12, Math.round(cellW * 0.16));
    const roadHalf = roadWidth * 0.5;

    // 2.1 Pavimentação de Asfalto (Malha Viária Contínua)
    ctx.save();
    ctx.fillStyle = "#181d22"; // Asfalto escuro
    for (let r = 0; r <= rows; r++) {
      const y = r * cellH;
      ctx.fillRect(0, y - roadHalf, w, roadWidth);
    }
    for (let c = 0; c <= cols; c++) {
      const x = c * cellW;
      ctx.fillRect(x - roadHalf, 0, roadWidth, h);
    }

    // 2.2 Pintura de Faixas de Trânsito (Linhas Centrais nas Ruas)
    ctx.strokeStyle = "rgba(220, 226, 235, 0.4)";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 6]);

    // Linhas horizontais nas ruas (entre quarteirões)
    for (let r = 0; r <= rows; r++) {
      const y = r * cellH;
      for (let c = 0; c < cols; c++) {
        const xStart = c * cellW + roadHalf + 4;
        const xEnd = (c + 1) * cellW - roadHalf - 4;
        if (xEnd > xStart) {
          ctx.beginPath();
          ctx.moveTo(xStart, y);
          ctx.lineTo(xEnd, y);
          ctx.stroke();
        }
      }
    }

    // Linhas verticais nas ruas (entre quarteirões)
    for (let c = 0; c <= cols; c++) {
      const x = c * cellW;
      for (let r = 0; r < rows; r++) {
        const yStart = r * cellH + roadHalf + 4;
        const yEnd = (r + 1) * cellH - roadHalf - 4;
        if (yEnd > yStart) {
          ctx.beginPath();
          ctx.moveTo(x, yStart);
          ctx.lineTo(x, yEnd);
          ctx.stroke();
        }
      }
    }
    ctx.setLineDash([]);

    // 2.3 Faixas de Pedestres nas Esquinas dos Cruzamentos
    ctx.fillStyle = "rgba(235, 240, 245, 0.35)";
    for (let c = 0; c <= cols; c++) {
      for (let r = 0; r <= rows; r++) {
        const cx = c * cellW;
        const cy = r * cellH;
        // Faixas norte/sul
        if (r > 0 && r < rows) {
          ctx.fillRect(cx - roadHalf + 2, cy - roadHalf - 3, roadWidth - 4, 2);
          ctx.fillRect(cx - roadHalf + 2, cy + roadHalf + 1, roadWidth - 4, 2);
        }
        // Faixas leste/oeste
        if (c > 0 && c < cols) {
          ctx.fillRect(cx - roadHalf - 3, cy - roadHalf + 2, 2, roadWidth - 4);
          ctx.fillRect(cx + roadHalf + 1, cy - roadHalf + 2, 2, roadWidth - 4);
        }
      }
    }
    ctx.restore();

    // 2.4 Renderização dos Quarteirões, Praças & Edificações
    gridLayout.forEach(cell => {
      // Se for célula filha do mega-parque 2x2, a âncora já cuidou de renderizar o superbloco
      if (cell.isMegaParkChild) {
        return;
      }

      if (cell.isMegaPark) {
        // --- GRANDE PRAÇA / MEGA-PARQUE 2x2 ---
        const blockX = cell.col * cellW + roadHalf;
        const blockY = cell.row * cellH + roadHalf;
        const blockW = cellW * 2 - roadWidth;
        const blockH = cellH * 2 - roadWidth;

        // Calçada de concreto contornando a mega-praça
        ctx.fillStyle = "#333d47";
        ctx.fillRect(blockX, blockY, blockW, blockH);
        ctx.strokeStyle = "#465360";
        ctx.lineWidth = 1;
        ctx.strokeRect(blockX, blockY, blockW, blockH);

        const curbSize = 2;
        const bx = blockX + curbSize;
        const by = blockY + curbSize;
        const bw = blockW - curbSize * 2;
        const bh = blockH - curbSize * 2;

        // Base vetorial rica do parque (garantia imediata)
        ctx.fillStyle = "#224c2d";
        ctx.fillRect(bx, by, bw, bh);

        // Caminhos de pedestres internos
        ctx.fillStyle = "#3a4d3f";
        ctx.fillRect(bx + bw * 0.44, by, bw * 0.12, bh);
        ctx.fillRect(bx, by + bh * 0.44, bw, bh * 0.12);

        // Fonte / Lago central
        ctx.fillStyle = "#2b6b85";
        ctx.beginPath();
        ctx.arc(bx + bw * 0.5, by + bh * 0.5, Math.min(bw, bh) * 0.18, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#458da8";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Árvores nas 4 esquinas do parque
        ctx.fillStyle = "#173820";
        ctx.beginPath();
        ctx.arc(bx + bw * 0.22, by + bh * 0.22, Math.min(bw, bh) * 0.12, 0, Math.PI * 2);
        ctx.arc(bx + bw * 0.78, by + bh * 0.22, Math.min(bw, bh) * 0.12, 0, Math.PI * 2);
        ctx.arc(bx + bw * 0.22, by + bh * 0.78, Math.min(bw, bh) * 0.12, 0, Math.PI * 2);
        ctx.arc(bx + bw * 0.78, by + bh * 0.78, Math.min(bw, bh) * 0.12, 0, Math.PI * 2);
        ctx.fill();

        // Sobreposição da textura HD se disponível
        const parkImg = this.bank.get(cell.structure.spriteKey);
        if (parkImg && parkImg.naturalWidth > 0) {
          ctx.drawImage(parkImg, bx, by, bw, bh);
        }
        return;
      }

      // Coordenadas do lote dentro do quarteirão delimitado pelas ruas
      const blockX = cell.col * cellW + roadHalf;
      const blockY = cell.row * cellH + roadHalf;
      const blockW = cellW - roadWidth;
      const blockH = cellH - roadWidth;

      // Calçada de concreto contornando o quarteirão
      ctx.fillStyle = "#333d47";
      ctx.fillRect(blockX, blockY, blockW, blockH);

      // Meio-fio de borda
      ctx.strokeStyle = "#465360";
      ctx.lineWidth = 1;
      ctx.strokeRect(blockX, blockY, blockW, blockH);

      // Lote interno (terreno privativo)
      const curbSize = 2;
      const bx = blockX + curbSize;
      const by = blockY + curbSize;
      const bw = blockW - curbSize * 2;
      const bh = blockH - curbSize * 2;

      if (cell.isTarget) {
        // --- ALVO HERO DA MISSÃO ---
        const isResolved = resolvedStages && (resolvedStages.has(cell.stageIdx) || (cell.stageData && resolvedStages.has(cell.stageData.stage_id)));
        const isActive = (cell.stageIdx === activeStageIdx) && !isResolved;

        // Base vetorial do alvo (garantia imediata)
        ctx.fillStyle = isResolved ? "#183020" : (isActive ? "#182635" : "#222c36");
        ctx.fillRect(bx, by, bw, bh);

        // Estrutura predial estilizada
        ctx.fillStyle = isResolved ? "#264a32" : (isActive ? "#2a3d52" : "#323e4b");
        ctx.fillRect(bx + 4, by + 4, bw - 8, bh - 8);

        // Marcação do heliponto / pátio operacional
        ctx.strokeStyle = isResolved ? "#4ec95c" : (isActive ? "#64b5f6" : "#e5a00d");
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(bx + bw * 0.5, by + bh * 0.5, Math.min(bw, bh) * 0.22, 0, Math.PI * 2);
        ctx.stroke();

        const sKey = cell.structure.spriteKey;
        const heroImg = this.bank.get(sKey);
        if (heroImg && heroImg.naturalWidth > 0) {
          ctx.drawImage(heroImg, bx, by, bw, bh);
        }

        const stageChar = String.fromCharCode(65 + Math.max(0, cell.stageIdx));
        const stageReport = (stageReports || []).find(r => r.stageIdx === cell.stageIdx);
        const wasSaved = stageReport ? stageReport.isSaved : true;

        const badgeW = isResolved ? 60 : (isActive ? 64 : 52);
        const badgeH = 24;
        const badgeX = bx + 4;
        const badgeY = by + 4;

        if (isResolved) {
          if (wasSaved) {
            // Estado: Pacificado / Salvo (Verde Militar)
            ctx.strokeStyle = "#4ec95c";
            ctx.lineWidth = 2.5;
            ctx.strokeRect(bx, by, bw, bh);

            ctx.fillStyle = "rgba(12, 30, 18, 0.95)";
            ctx.fillRect(badgeX, badgeY, badgeW, badgeH);
            ctx.strokeStyle = "#4ec95c";
            ctx.lineWidth = 1.5;
            ctx.strokeRect(badgeX, badgeY, badgeW, badgeH);
            ctx.fillStyle = "#4ec95c";
            ctx.font = "bold 13.5px monospace";
            ctx.fillText("[" + stageChar + "] ✓", badgeX + 6, badgeY + 17);
          } else {
            // Estado: Concluído com Colapso / Não Salvo (Vermelho Alerta)
            ctx.strokeStyle = "#d9534f";
            ctx.lineWidth = 2.5;
            ctx.strokeRect(bx, by, bw, bh);

            ctx.fillStyle = "rgba(35, 14, 14, 0.95)";
            ctx.fillRect(badgeX, badgeY, badgeW, badgeH);
            ctx.strokeStyle = "#d9534f";
            ctx.lineWidth = 1.5;
            ctx.strokeRect(badgeX, badgeY, badgeW, badgeH);
            ctx.fillStyle = "#ff7777";
            ctx.font = "bold 13.5px monospace";
            ctx.fillText("[" + stageChar + "] 🏚️", badgeX + 5, badgeY + 17);
          }
        } else if (isActive) {
          // Estado: Ativo / Selecionado (Destaque Tático com Foco Azul/Cyan Sóbrio)
          ctx.strokeStyle = "#4a90e2";
          ctx.lineWidth = 3;
          ctx.strokeRect(bx, by, bw, bh);

          ctx.fillStyle = "rgba(16, 26, 38, 0.96)";
          ctx.fillRect(badgeX, badgeY, badgeW, badgeH);
          ctx.strokeStyle = "#64b5f6";
          ctx.lineWidth = 1.8;
          ctx.strokeRect(badgeX, badgeY, badgeW, badgeH);
          ctx.fillStyle = "#e3f2fd";
          ctx.font = "bold 14px monospace";
          ctx.fillText("[" + stageChar + "] 🎯", badgeX + 6, badgeY + 17);
        } else {
          // Estado: Pendente / Próximo Alvo
          ctx.strokeStyle = "rgba(140, 165, 190, 0.6)";
          ctx.lineWidth = 2;
          ctx.strokeRect(bx, by, bw, bh);

          ctx.fillStyle = "rgba(16, 21, 26, 0.94)";
          ctx.fillRect(badgeX, badgeY, badgeW, badgeH);
          ctx.strokeStyle = "rgba(160, 185, 210, 0.7)";
          ctx.lineWidth = 1.5;
          ctx.strokeRect(badgeX, badgeY, badgeW, badgeH);
          ctx.fillStyle = "#d2dce5";
          ctx.font = "bold 14px monospace";
          ctx.fillText("[ " + stageChar + " ]", badgeX + 6, badgeY + 17);
        }

      } else {
        // --- QUARTEIRÃO RESIDENCIAL PROCEDURAL ---
        const struct = cell.structure || {};
        
        // Base vetorial instantânea (grama do lote + telhado da casa)
        ctx.fillStyle = "#1e2820";
        ctx.fillRect(bx, by, bw, bh);

        // Telhado estilizado com relevo e cor quente/ardósia
        ctx.fillStyle = "#5c3d2e";
        ctx.fillRect(bx + 4, by + 4, bw - 8, bh - 8);
        ctx.strokeStyle = "#7a523e";
        ctx.lineWidth = 1;
        ctx.strokeRect(bx + 4, by + 4, bw - 8, bh - 8);

        // Textura HD sobreposta quando carregada
        if (struct.spriteKey) {
          const bImg = this.bank.get(struct.spriteKey);
          if (bImg && bImg.naturalWidth > 0) {
            ctx.drawImage(bImg, bx, by, bw, bh);
          }
        }
      }
    });

    // 3. Corredor Tático de Voo da Missão
    if (currentMission && currentMission.stages && currentMission.stages.length > 1) {
      this.drawFlightCorridor(ctx, currentMission, activeStageIdx, w, h, resolvedStages);
    }

    // 4. Efeitos Dinâmicos de Emergência (Fumaça, Chamas e Gás)
    if (sector) {
      const isSectorResolved = resolvedStages && (resolvedStages.has(activeStageIdx) || (sector.stage_id && resolvedStages.has(sector.stage_id)));
      const targetPos = this.getSectorScreenPosition(sector, stages, w, h);
      const sx = targetPos.x;
      const sy = targetPos.y;

      if (!isSectorResolved) {
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
      } else {
        // Setor Seguro: Aura verde calma
        const baseRadius = Math.min(cellW, cellH) * 0.36;
        ctx.strokeStyle = "rgba(78, 201, 92, 0.6)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(sx, sy, baseRadius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = "rgba(78, 201, 92, 0.12)";
        ctx.beginPath();
        ctx.arc(sx, sy, baseRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#4ec95c";
        ctx.font = "bold 10px sans-serif";
        ctx.fillText("✅ SETOR SEGURO", sx - 42, sy - baseRadius - 6);
      }
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
  }

  drawFlightCorridor(ctx, mission, activeStageIdx, w, h, resolvedStages = new Set()) {
    if (!mission || !mission.stages || mission.stages.length <= 1) return;
    const stages = mission.stages;

    const baseCenter = this.gridEngine.getCellCenter(0, 0, w, h);
    ctx.save();
    ctx.strokeStyle = "rgba(229, 160, 13, 0.35)";
    ctx.lineWidth = 1.2;
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
      const isDone = resolvedStages && (resolvedStages.has(idx) || (st.stage_id && resolvedStages.has(st.stage_id)));
      const isActive = (idx === activeStageIdx) && !isDone;

      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, Math.PI * 2);
      if (isDone) {
        ctx.fillStyle = "rgba(78, 201, 92, 0.4)";
        ctx.fill();
        ctx.strokeStyle = "#4ec95c";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = "#4ec95c";
        ctx.font = "bold 10px monospace";
        ctx.fillText("✓", x - 4, y + 4);
      } else if (isActive) {
        ctx.fillStyle = "rgba(229, 160, 13, 0.4)";
        ctx.fill();
        ctx.strokeStyle = "#e5a00d";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = "#e5a00d";
        ctx.font = "bold 10px monospace";
        ctx.fillText(String.fromCharCode(65 + idx), x - 4, y + 4);
      } else {
        ctx.fillStyle = "rgba(56, 69, 80, 0.35)";
        ctx.fill();
        ctx.strokeStyle = "rgba(229, 160, 13, 0.5)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = "#d0d7de";
        ctx.font = "bold 10px monospace";
        ctx.fillText(String.fromCharCode(65 + idx), x - 4, y + 4);
      }
      ctx.restore();
    });
  }
}
