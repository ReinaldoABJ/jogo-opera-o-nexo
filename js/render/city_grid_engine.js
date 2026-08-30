/**
 * CityGridEngine — Motor de Grade Procedural & Ancoragem Semântica
 */
export class CityGridEngine {
    constructor(cols = 8, rows = 6) {
      this.cols = cols;
      this.rows = rows;
      this.cachedGrid = null;
      this.cachedKey = '';
    }

    getGridCell(normX, normY) {
      const col = Math.min(this.cols - 1, Math.max(0, Math.floor(normX * this.cols)));
      const row = Math.min(this.rows - 1, Math.max(0, Math.floor(normY * this.rows)));
      return { col, row };
    }

    getCellCenter(col, row, width, height) {
      const cellW = width / this.cols;
      const cellH = height / this.rows;
      return {
        x: (col + 0.5) * cellW,
        y: (row + 0.5) * cellH,
        cellW,
        cellH
      };
    }

    generateLayout(missionId, dailySeed = 42, stages = []) {
      const key = `${missionId || 'nexo'}_${dailySeed}_${stages.map(s => s.sector_id || s.sector_name || '').join('-')}`;
      if (this.cachedGrid && this.cachedKey === key) {
        return this.cachedGrid;
      }

      let seedValue = 0;
      for (let i = 0; i < key.length; i++) {
        seedValue = (seedValue << 5) - seedValue + key.charCodeAt(i);
        seedValue |= 0;
      }
      const rand = () => {
        seedValue = (seedValue * 9301 + 49297) % 233280;
        return seedValue / 233280;
      };

      const targetCells = new Map();
      stages.forEach((stage, idx) => {
        const coords = stage.coordinates || { x: 180 + idx * 140, y: 140 + idx * 80 };
        const normX = Math.min(0.92, Math.max(0.08, coords.x / 700));
        const normY = Math.min(0.92, Math.max(0.08, coords.y / 520));
        const cell = this.getGridCell(normX, normY);
        targetCells.set(`${cell.col},${cell.row}`, {
          stageIdx: idx,
          stageData: stage
        });
      });

      const suburbanTypes = [
        'sub_building-type-a.png', 'sub_building-type-b.png', 'sub_building-type-c.png', 'sub_building-type-d.png',
        'sub_building-type-e.png', 'sub_building-type-f.png', 'sub_building-type-g.png', 'sub_building-type-h.png',
        'sub_building-type-i.png', 'sub_building-type-j.png', 'sub_building-type-k.png', 'sub_building-type-l.png',
        'sub_building-type-m.png', 'sub_building-type-n.png', 'sub_building-type-o.png', 'sub_building-type-p.png',
        'sub_building-type-q.png', 'sub_building-type-r.png', 'sub_building-type-s.png', 'sub_building-type-t.png',
        'sub_building-type-u.png'
      ];

      const commTypes = [
        'comm_building-a.png', 'comm_building-b.png', 'comm_building-c.png', 'comm_building-d.png',
        'comm_building-e.png', 'comm_building-f.png', 'comm_building-g.png', 'comm_building-h.png',
        'comm_building-i.png', 'comm_building-j.png', 'comm_building-k.png', 'comm_building-l.png',
        'comm_building-m.png', 'comm_building-n.png', 'comm_building-skyscraper-a.png', 'comm_building-skyscraper-b.png',
        'comm_building-skyscraper-c.png', 'comm_building-skyscraper-d.png', 'comm_building-skyscraper-e.png'
      ];

      const grid = [];
      for (let r = 0; r < this.rows; r++) {
        for (let c = 0; c < this.cols; c++) {
          const cellKey = `${c},${r}`;
          if (targetCells.has(cellKey)) {
            const target = targetCells.get(cellKey);
            const nameLower = (target.stageData.sector_name || '').toLowerCase();
            let spriteKey = 'escola_municipal';

            if (nameLower.includes('hosp') || nameLower.includes('médic') || nameLower.includes('saude') || nameLower.includes('saúde') || nameLower.includes('urgên')) {
              spriteKey = 'hospital_regional';
            } else if (nameLower.includes('subest') || nameLower.includes('energ') || nameLower.includes('elétr') || nameLower.includes('eletro')) {
              spriteKey = 'subestacao_eletrica';
            } else if (nameLower.includes('quim') || nameLower.includes('quím') || nameLower.includes('fabri') || nameLower.includes('fábri') || nameLower.includes('refin') || nameLower.includes('indús') || nameLower.includes('indus') || nameLower.includes('gás')) {
              spriteKey = 'fabrica_quimica';
            } else if (nameLower.includes('pref') || nameLower.includes('gov') || nameLower.includes('civic') || nameLower.includes('cívic') || nameLower.includes('forum') || nameLower.includes('fórum') || nameLower.includes('centro')) {
              spriteKey = 'prefeitura_civica';
            } else if (nameLower.includes('escol') || nameLower.includes('univer') || nameLower.includes('coleg') || nameLower.includes('colég') || nameLower.includes('aluno')) {
              spriteKey = 'escola_municipal';
            } else {
              const fallbackList = ['escola_municipal', 'hospital_regional', 'subestacao_eletrica', 'fabrica_quimica', 'prefeitura_civica'];
              spriteKey = fallbackList[target.stageIdx % fallbackList.length];
            }

            grid.push({
              col: c,
              row: r,
              isTarget: true,
              stageIdx: target.stageIdx,
              stageData: target.stageData,
              structure: {
                type: 'target_hero',
                name: target.stageData.sector_name || 'Alvo de Resgate',
                spriteKey: spriteKey
              }
            });
          } else {
            const roll = rand();
            if (roll < 0.45) {
              // Casa / Quarteirão Residencial com Sprite
              const subIdx = Math.floor(rand() * suburbanTypes.length);
              grid.push({
                col: c,
                row: r,
                isTarget: false,
                stageIdx: -1,
                stageData: null,
                structure: {
                  type: 'suburban_house',
                  name: 'Residência Urbana',
                  spriteKey: suburbanTypes[subIdx],
                  ground: 'grass'
                }
              });
            } else if (roll < 0.80) {
              // Edifício Comercial com Sprite
              const commIdx = Math.floor(rand() * commTypes.length);
              grid.push({
                col: c,
                row: r,
                isTarget: false,
                stageIdx: -1,
                stageData: null,
                structure: {
                  type: 'commercial_tower',
                  name: 'Torre Comercial',
                  spriteKey: commTypes[commIdx],
                  ground: 'pavement'
                }
              });
            } else if (roll < 0.92) {
              // Praça Pública Arborizada
              grid.push({
                col: c,
                row: r,
                isTarget: false,
                stageIdx: -1,
                stageData: null,
                structure: {
                  type: 'urban_park',
                  name: 'Praça Pública',
                  ground: 'park'
                }
              });
            } else {
              // Pátio de Carga e Estacionamento
              grid.push({
                col: c,
                row: r,
                isTarget: false,
                stageIdx: -1,
                stageData: null,
                structure: {
                  type: 'parking_lot',
                  name: 'Estacionamento',
                  ground: 'parking'
                }
              });
            }
          }
        }
      }

      this.cachedGrid = grid;
      this.cachedKey = key;
      return grid;
    }
  }
