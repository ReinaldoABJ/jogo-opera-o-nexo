/**
 * ============================================================================
 * CityGridEngine — Motor de Montagem Procedural & Acoplamento na Grade
 * ============================================================================
 * Sorteia e acopla dinamicamente na matriz 8x6 (48 quarteirões) diferentes
 * tipos de casas, prédios, arranha-céus, praças e os alvos heróicos da missão.
 */

export class CityGridEngine {
  constructor(cols = 6, rows = 4) {
    this.cols = cols;
    this.rows = rows;
    this.cachedGrid = null;
    this.cachedKey = "";

    this.residentialSprites = [
      // Sprites Painterly Satélite HD (Lote 1)
      "res_house_simple.png",
      "res_house_backyard.png",
      "res_house_twostory.png",
      "res_duplex.png",
      "res_vila.png"
    ];

    this.commercialSprites = [
      // Sprites Painterly Satélite HD (Lote 3)
      "comm_strip_mall.png",
      "comm_office_rooftop_garden.png",
      "comm_supercenter_dock.png"
    ];

    this.skyscraperSprites = [
      // Sprites Painterly Satélite HD (Lote 3)
      "comm_skyscraper_helipad.png"
    ];

    this.parkSprites = [
      // Sprites Painterly Satélite HD (Lote 2)
      "park_plaza_fountain.png",
      "park_dense_trees.png",
      "park_garden.png",
      "park_playground.png",
      "park_neighborhood.png"
    ];

    this.industrialSprites = [
      // Sprites Painterly Satélite HD (Lote 4)
      "ind_electrical_substation.png",
      "ind_fuel_storage_tanks.png",
      "ind_water_treatment.png",
      "ind_container_yard.png"
    ];
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
    const stageIds = stages.map(s => s.stage_id || s.sector_id || s.sector_name || "").join("-");
    const key = (missionId || "nexo") + "_" + dailySeed + "_" + stageIds + "_" + this.cols + "x" + this.rows;
    if (this.cachedGrid && this.cachedKey === key) {
      return this.cachedGrid;
    }

    // PRNG determinístico
    let seedValue = 0;
    for (let i = 0; i < key.length; i++) {
      seedValue = (seedValue << 5) - seedValue + key.charCodeAt(i);
      seedValue |= 0;
    }
    const rand = () => {
      seedValue = (seedValue * 9301 + 49297) % 233280;
      return seedValue / 233280;
    };

    // 1. Mapear nós da missão para células da grade com garantia de unicidade
    const targetCells = new Map();
    const occupiedCoords = new Set();

    stages.forEach((stage, idx) => {
      const coords = stage.coordinates || { x: 140 + idx * 160, y: 120 + idx * 90 };
      const normX = Math.min(0.92, Math.max(0.08, coords.x / 700));
      const normY = Math.min(0.92, Math.max(0.08, coords.y / 520));
      let cell = this.getGridCell(normX, normY);
      let cellKey = cell.col + "," + cell.row;

      // Se a célula já estiver ocupada, busca a vizinha livre mais próxima
      if (occupiedCoords.has(cellKey)) {
        let found = false;
        for (let rad = 1; rad < Math.max(this.cols, this.rows); rad++) {
          for (let dc = -rad; dc <= rad; dc++) {
            for (let dr = -rad; dr <= rad; dr++) {
              const nc = Math.min(this.cols - 1, Math.max(0, cell.col + dc));
              const nr = Math.min(this.rows - 1, Math.max(0, cell.row + dr));
              const candidateKey = nc + "," + nr;
              if (!occupiedCoords.has(candidateKey)) {
                cell = { col: nc, row: nr };
                cellKey = candidateKey;
                found = true;
                break;
              }
            }
            if (found) break;
          }
          if (found) break;
        }
      }

      occupiedCoords.add(cellKey);
      targetCells.set(cellKey, {
        stageIdx: idx,
        stageData: stage
      });
    });

    // 2. Sorteio do Mega-Parque 2x2 (No máximo 1 ou nenhuma praça por mapa)
    let megaParkAnchor = null;
    const megaParkCells = new Set();
    const wantsPark = rand() < 0.65; // ~65% de chance de ter 1 parque 2x2

    if (wantsPark) {
      const validSpots = [];
      for (let r = 0; r <= this.rows - 2; r++) {
        for (let c = 0; c <= this.cols - 2; c++) {
          const k00 = c + "," + r;
          const k10 = (c + 1) + "," + r;
          const k01 = c + "," + (r + 1);
          const k11 = (c + 1) + "," + (r + 1);

          if (!occupiedCoords.has(k00) && !occupiedCoords.has(k10) && !occupiedCoords.has(k01) && !occupiedCoords.has(k11)) {
            validSpots.push({ col: c, row: r });
          }
        }
      }

      if (validSpots.length > 0) {
        const chosenSpot = validSpots[Math.floor(rand() * validSpots.length)];
        const parkIdx = Math.floor(rand() * this.parkSprites.length);
        const parkSprite = this.parkSprites[parkIdx];

        megaParkAnchor = {
          col: chosenSpot.col,
          row: chosenSpot.row,
          spanCols: 2,
          spanRows: 2,
          spriteKey: parkSprite
        };

        const k00 = chosenSpot.col + "," + chosenSpot.row;
        const k10 = (chosenSpot.col + 1) + "," + chosenSpot.row;
        const k01 = chosenSpot.col + "," + (chosenSpot.row + 1);
        const k11 = (chosenSpot.col + 1) + "," + (chosenSpot.row + 1);

        megaParkCells.add(k00);
        megaParkCells.add(k10);
        megaParkCells.add(k01);
        megaParkCells.add(k11);
      }
    }

    const grid = [];
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const cellKey = c + "," + r;

        if (targetCells.has(cellKey)) {
          // --- ALVO DE EMERGÊNCIA (HERO) ---
          const target = targetCells.get(cellKey);
          const nameLower = (target.stageData.sector_name || "").toLowerCase();
          let spriteKey = "escola_municipal";

          if (nameLower.includes("bombeir") || nameLower.includes("incênd") || nameLower.includes("incend") || nameLower.includes("fogo") || nameLower.includes("resgate")) {
            spriteKey = "pub_fire_station";
          } else if (nameLower.includes("triag") || nameLower.includes("tenda") || nameLower.includes("campanha") || nameLower.includes("posto de saúde")) {
            spriteKey = "pub_field_hospital_triage";
          } else if (nameLower.includes("hosp") || nameLower.includes("médic") || nameLower.includes("saude") || nameLower.includes("saúde") || nameLower.includes("urgên")) {
            spriteKey = "hospital_regional";
          } else if (nameLower.includes("telecom") || nameLower.includes("antena") || nameLower.includes("comunic") || nameLower.includes("satél") || nameLower.includes("satel") || nameLower.includes("radar")) {
            spriteKey = "pub_telecom_center";
          } else if (nameLower.includes("subest") || nameLower.includes("energ") || nameLower.includes("elétr") || nameLower.includes("eletro") || nameLower.includes("alta tensão")) {
            spriteKey = "ind_electrical_substation";
          } else if (nameLower.includes("água") || nameLower.includes("agua") || nameLower.includes("eta") || nameLower.includes("filtr") || nameLower.includes("saneam")) {
            spriteKey = "ind_water_treatment";
          } else if (nameLower.includes("tanque") || nameLower.includes("combust") || nameLower.includes("petro") || nameLower.includes("oleo") || nameLower.includes("óleo")) {
            spriteKey = "ind_fuel_storage_tanks";
          } else if (nameLower.includes("contain") || nameLower.includes("contein") || nameLower.includes("porto") || nameLower.includes("doca") || nameLower.includes("logíst") || nameLower.includes("galpão")) {
            spriteKey = "ind_container_yard";
          } else if (nameLower.includes("heliponto") || nameLower.includes("aurora") || nameLower.includes("torre") || nameLower.includes("corporat") || nameLower.includes("arranha")) {
            spriteKey = "comm_skyscraper_helipad";
          } else if (nameLower.includes("quim") || nameLower.includes("quím") || nameLower.includes("fabri") || nameLower.includes("fábri") || nameLower.includes("refin") || nameLower.includes("indús") || nameLower.includes("indus") || nameLower.includes("gás")) {
            spriteKey = "fabrica_quimica";
          } else if (nameLower.includes("pref") || nameLower.includes("gov") || nameLower.includes("civic") || nameLower.includes("cívic") || nameLower.includes("forum") || nameLower.includes("fórum") || nameLower.includes("centro")) {
            spriteKey = "prefeitura_civica";
          } else if (nameLower.includes("escol") || nameLower.includes("univer") || nameLower.includes("coleg") || nameLower.includes("colég") || nameLower.includes("aluno")) {
            spriteKey = "escola_municipal";
          } else {
            const fallbackList = [
              "pub_fire_station",
              "pub_field_hospital_triage",
              "comm_skyscraper_helipad",
              "escola_municipal",
              "hospital_regional",
              "ind_electrical_substation",
              "fabrica_quimica",
              "prefeitura_civica",
              "ind_water_treatment",
              "pub_telecom_center"
            ];
            spriteKey = fallbackList[target.stageIdx % fallbackList.length];
          }

          grid.push({
            col: c,
            row: r,
            isTarget: true,
            isMegaPark: false,
            isMegaParkChild: false,
            stageIdx: target.stageIdx,
            stageData: target.stageData,
            structure: {
              category: "hero",
              type: "target_hero",
              name: target.stageData.sector_name || "Alvo de Resgate",
              spriteKey: spriteKey,
              ground: "hero_pavement"
            }
          });
        } else if (megaParkAnchor && c === megaParkAnchor.col && r === megaParkAnchor.row) {
          // --- ÂNCORA DO MEGA-PARQUE 2x2 ---
          grid.push({
            col: c,
            row: r,
            isTarget: false,
            isMegaPark: true,
            isMegaParkChild: false,
            megaParkData: megaParkAnchor,
            stageIdx: -1,
            stageData: null,
            structure: {
              category: "parks_foliage",
              type: "urban_mega_park",
              name: "Grande Praça Cívica",
              spriteKey: megaParkAnchor.spriteKey,
              ground: "park"
            }
          });
        } else if (megaParkCells.has(cellKey)) {
          // --- CÉLULA FILHA DO MEGA-PARQUE 2x2 (Coberta pela âncora) ---
          grid.push({
            col: c,
            row: r,
            isTarget: false,
            isMegaPark: false,
            isMegaParkChild: true,
            megaParkAnchor: { col: megaParkAnchor.col, row: megaParkAnchor.row },
            stageIdx: -1,
            stageData: null,
            structure: {
              category: "parks_foliage",
              type: "urban_mega_park_child",
              name: "Grande Praça Cívica",
              spriteKey: megaParkAnchor.spriteKey,
              ground: "park"
            }
          });
        } else {
          // --- DEMAIS QUARTEIRÕES: EXCLUSIVAMENTE CASAS RESIDENCIAIS ---
          const resIdx = Math.floor(rand() * this.residentialSprites.length);
          grid.push({
            col: c,
            row: r,
            isTarget: false,
            isMegaPark: false,
            isMegaParkChild: false,
            stageIdx: -1,
            stageData: null,
            structure: {
              category: "residential",
              type: "suburban_house",
              name: "Residência Urbana",
              spriteKey: this.residentialSprites[resIdx],
              ground: "residential"
            }
          });
        }
      }
    }

    this.cachedGrid = grid;
    this.cachedKey = key;
    return grid;
  }
}
