/**
 * ============================================================================
 * SpriteBank — Catálogo Centralizado de Assets Urbanos & Edificações
 * ============================================================================
 * Carrega e indexa todas as categorias de sprites (Casas, Prédios, Torres,
 * Praças, Ruas, Terrenos e Alvos de Missão) para acoplamento procedural na grade.
 */

export class SpriteBank {
  constructor() {
    this.images = new Map();
    this.loadedCount = 0;
    this.totalCount = 0;

    const residentialFiles = [
      // Sprites Procedurais (tiny, top-down simples)
      'sub_building-type-a.png', 'sub_building-type-b.png', 'sub_building-type-c.png', 'sub_building-type-d.png',
      'sub_building-type-e.png', 'sub_building-type-f.png', 'sub_building-type-g.png', 'sub_building-type-h.png',
      'sub_building-type-i.png', 'sub_building-type-j.png', 'sub_building-type-k.png', 'sub_building-type-l.png',
      'sub_building-type-m.png', 'sub_building-type-n.png', 'sub_building-type-o.png', 'sub_building-type-p.png',
      'sub_building-type-q.png', 'sub_building-type-r.png', 'sub_building-type-s.png', 'sub_building-type-t.png',
      'sub_building-type-u.png',
      // Sprites Painterly Satélite HD (Lote 1)
      'res_house_simple.png', 'res_house_backyard.png', 'res_house_twostory.png',
      'res_duplex.png', 'res_vila.png'
    ];

    const commercialFiles = [
      'comm_building-a.png', 'comm_building-b.png', 'comm_building-c.png', 'comm_building-d.png',
      'comm_building-e.png', 'comm_building-f.png', 'comm_building-g.png', 'comm_building-h.png',
      'comm_building-i.png', 'comm_building-j.png', 'comm_building-k.png', 'comm_building-l.png',
      'comm_building-m.png', 'comm_building-n.png',
      'comm_low-detail-building-a.png', 'comm_low-detail-building-b.png', 'comm_low-detail-building-c.png',
      'comm_low-detail-building-d.png', 'comm_low-detail-building-e.png', 'comm_low-detail-building-f.png',
      'comm_low-detail-building-g.png', 'comm_low-detail-building-h.png', 'comm_low-detail-building-i.png',
      'comm_low-detail-building-j.png', 'comm_low-detail-building-k.png', 'comm_low-detail-building-l.png',
      'comm_low-detail-building-m.png', 'comm_low-detail-building-n.png'
    ];

    const skyscraperFiles = [
      'comm_building-skyscraper-a.png', 'comm_building-skyscraper-b.png',
      'comm_building-skyscraper-c.png', 'comm_building-skyscraper-d.png',
      'comm_building-skyscraper-e.png'
    ];

    this.catalog = {
      heroes: [
        { id: 'hospital_regional', src: './assets/sprites/buildings/hospital_regional.jpg' },
        { id: 'escola_municipal', src: './assets/sprites/buildings/escola_municipal.jpg' },
        { id: 'subestacao_eletrica', src: './assets/sprites/buildings/subestacao_eletrica.jpg' },
        { id: 'fabrica_quimica', src: './assets/sprites/buildings/fabrica_quimica.jpg' },
        { id: 'prefeitura_civica', src: './assets/sprites/buildings/prefeitura_civica.jpg' }
      ],
      residential: residentialFiles.map(fn => ({ id: fn, src: './assets/sprites/buildings/' + fn })),
      commercial: commercialFiles.map(fn => ({ id: fn, src: './assets/sprites/buildings/' + fn })),
      skyscrapers: skyscraperFiles.map(fn => ({ id: fn, src: './assets/sprites/buildings/' + fn })),
      parks_foliage: [
        { id: 'sub_tree-large.png', src: './assets/sprites/buildings/sub_tree-large.png' },
        { id: 'sub_tree-small.png', src: './assets/sprites/buildings/sub_tree-small.png' },
        { id: 'sub_planter.png', src: './assets/sprites/buildings/sub_planter.png' },
        { id: 'tree_large.png', src: './assets/sprites/urban/tree_large.png' },
        { id: 'tree_small.png', src: './assets/sprites/urban/tree_small.png' }
      ],
      terrain: [
        { id: 'land_grass01.png', src: './assets/sprites/urban/land_grass01.png' },
        { id: 'land_grass02.png', src: './assets/sprites/urban/land_grass02.png' },
        { id: 'land_grass03.png', src: './assets/sprites/urban/land_grass03.png' }
      ]
    };

    this.preloadAll();
  }

  preloadAll() {
    const allItems = [
      ...this.catalog.heroes,
      ...this.catalog.residential,
      ...this.catalog.commercial,
      ...this.catalog.skyscrapers,
      ...this.catalog.parks_foliage,
      ...this.catalog.terrain,
      { id: 'drone', src: './assets/sprites/drone.png' },
      { id: 'map_satellite', src: './assets/sprites/map_satellite.png' }
    ];

    this.totalCount = allItems.length;

    allItems.forEach(item => {
      const img = new Image();
      img.onload = () => {
        this.loadedCount++;
      };
      img.onerror = () => {
        this.loadedCount++;
      };
      img.src = item.src;
      this.images.set(item.id, img);
    });
  }

  get(id) {
    return this.images.get(id) || null;
  }

  has(id) {
    const img = this.images.get(id);
    return img && img.naturalWidth > 0;
  }

  getRandom(category, randFn = Math.random) {
    const list = this.catalog[category];
    if (!list || list.length === 0) return null;
    const idx = Math.floor(randFn() * list.length);
    return list[idx];
  }
}
