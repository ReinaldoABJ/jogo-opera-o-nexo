/**
 * ============================================================================
 * MapRenderer — Renderizador Aéreo Satélite Militar Realista (Canvas 2D)
 * ============================================================================
 * Desenha o mapa ortofotográfico da cidade (quarteirões, prédios, fumaça térmica,
 * heliponto e o drone de resgate com 4 rotores animados e luzes táticas).
 */
export class MapRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.rotorAngle = 0;
    this.smokeParticles = [];

    this.initSmoke();
  }

  initSmoke() {
    for (let i = 0; i < 20; i++) {
      this.smokeParticles.push({
        x: 160 + (Math.random() * 40 - 20),
        y: 140 + (Math.random() * 40 - 20),
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

  render(drone, activeSector, targetCoords) {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // 1. Fundo do Terreno (Asfalto / Satélite Urbano Escuro)
    ctx.fillStyle = '#1c2226';
    ctx.fillRect(0, 0, w, h);

    // 2. Desenha Quarteirões & Ruas de Cidade Realista
    this.drawCityBlocks(ctx, w, h);

    // 3. Desenha Efeitos Térmicos / Fumaça de Incêndio no Setor
    this.drawThermalDisaster(ctx, activeSector);

    // 4. Desenha Ponto de Destino / Waypoint Clicado
    if (targetCoords) {
      this.drawWaypoint(ctx, targetCoords.x, targetCoords.y);
    }

    // 5. Desenha Setores Táticos de Emergência (Marcadores Militares)
    if (activeSector && activeSector.coordinates) {
      this.drawSectorMarker(ctx, activeSector);
    }

    // 6. Desenha o Drone Militar Tático com Hélices Animadas
    this.drawDrone(ctx, drone);

    // 7. Grid de Mira de Reconhecimento Militar
    this.drawMilitaryGrid(ctx, w, h);
  }

  drawCityBlocks(ctx, w, h) {
    ctx.strokeStyle = '#273038';
    ctx.lineWidth = 1;

    // Desenha prédios com telhados cinza/concreto
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
      // Telhado do edifício
      ctx.fillStyle = b.color;
      ctx.fillRect(b.x, b.y, b.w, b.h);
      ctx.strokeRect(b.x, b.y, b.w, b.h);

      // Detalhes técnicos de ar-condicionado/heliponto no telhado
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

  drawThermalDisaster(ctx, sector) {
    if (!sector || !sector.coordinates) return;
    const sx = sector.coordinates.x;
    const sy = sector.coordinates.y;

    // Fumaça volumétrica animada
    this.smokeParticles.forEach(p => {
      p.y -= p.speedY;
      if (p.y < sy - 40) {
        p.y = sy + (Math.random() * 20 - 10);
        p.x = sx + (Math.random() * 30 - 15);
      }

      ctx.fillStyle = `rgba(180, 70, 40, ${p.alpha * 0.4})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(50, 55, 60, ${p.alpha * 0.6})`;
      ctx.beginPath();
      ctx.arc(p.x + 4, p.y - 6, p.radius * 1.2, 0, Math.PI * 2);
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

  drawSectorMarker(ctx, sector) {
    const { x, y } = sector.coordinates;

    ctx.strokeStyle = '#e04b47';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = 'rgba(224, 75, 71, 0.15)';
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ff6b6b';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('EMERGÊNCIA', x - 34, y - 34);
  }

  drawDrone(ctx, drone) {
    ctx.save();
    ctx.translate(drone.x, drone.y);
    ctx.rotate(drone.angle);

    // Círculo de Scanner do Radar Militar quando pairando
    ctx.strokeStyle = 'rgba(78, 201, 92, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, 0, 44, 0, Math.PI * 2);
    ctx.stroke();

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
      ctx.fillStyle = 'rgba(120, 140, 160, 0.6)';
      ctx.fillRect(-10, -1.5, 20, 3);
      ctx.restore();
    });

    // Corpo Central do Drone Militar (Verde Oliva Escuro / Cinza Chumbo)
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
    ctx.fillStyle = '#4ec95c'; // Luz verde
    ctx.fillRect(-8, 8, 2, 2);
    ctx.fillStyle = '#e04b47'; // Luz vermelha
    ctx.fillRect(6, 8, 2, 2);

    ctx.restore();
  }

  drawMilitaryGrid(ctx, w, h) {
    ctx.strokeStyle = 'rgba(56, 69, 80, 0.25)';
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
