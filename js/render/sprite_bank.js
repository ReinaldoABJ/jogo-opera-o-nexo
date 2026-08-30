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
      // Sprites Painterly Satélite HD (Lote 1)
      'res_house_simple.png',
      'res_house_backyard.png',
      'res_house_twostory.png',
      'res_duplex.png',
      'res_vila.png'
    ];

    const commercialFiles = [
      // Sprites Painterly Satélite HD (Lote 3)
      'comm_strip_mall.png',
      'comm_office_rooftop_garden.png',
      'comm_supercenter_dock.png'
    ];

    const skyscraperFiles = [
      // Sprites Painterly Satélite HD (Lote 3)
      'comm_skyscraper_helipad.png'
    ];

    const parkFiles = [
      // Sprites Painterly Satélite HD (Lote 2)
      'park_plaza_fountain.png',
      'park_dense_trees.png',
      'park_garden.png',
      'park_playground.png',
      'park_neighborhood.png'
    ];

    const industrialFiles = [
      // Sprites Painterly Satélite HD (Lote 4)
      'ind_electrical_substation.png',
      'ind_fuel_storage_tanks.png',
      'ind_water_treatment.png',
      'ind_container_yard.png'
    ];

    this.catalog = {
      heroes: [
        { id: 'hospital_regional', src: './assets/sprites/buildings/hospital_regional.jpg' },
        { id: 'escola_municipal', src: './assets/sprites/buildings/escola_municipal.jpg' },
        { id: 'subestacao_eletrica', src: './assets/sprites/buildings/subestacao_eletrica.jpg' },
        { id: 'fabrica_quimica', src: './assets/sprites/buildings/fabrica_quimica.jpg' },
        { id: 'prefeitura_civica', src: './assets/sprites/buildings/prefeitura_civica.jpg' },
        // Novos Heróis e Equipamentos Públicos (Lote 5)
        { id: 'pub_fire_station', src: './assets/sprites/buildings/pub_fire_station.jpeg' },
        { id: 'pub_field_hospital_triage', src: './assets/sprites/buildings/pub_field_hospital_triage.jpeg' },
        { id: 'pub_telecom_center', src: './assets/sprites/buildings/pub_telecom_center.jpeg' },
        // Alvos Industriais e Comerciais Estratégicos
        { id: 'ind_electrical_substation', src: './assets/sprites/buildings/ind_electrical_substation.png' },
        { id: 'ind_fuel_storage_tanks', src: './assets/sprites/buildings/ind_fuel_storage_tanks.png' },
        { id: 'ind_water_treatment', src: './assets/sprites/buildings/ind_water_treatment.png' },
        { id: 'ind_container_yard', src: './assets/sprites/buildings/ind_container_yard.png' },
        { id: 'comm_skyscraper_helipad', src: './assets/sprites/buildings/comm_skyscraper_helipad.png' }
      ],
      residential: residentialFiles.map(fn => ({ id: fn, src: './assets/sprites/buildings/' + fn })),
      commercial: commercialFiles.map(fn => ({ id: fn, src: './assets/sprites/buildings/' + fn })),
      skyscrapers: skyscraperFiles.map(fn => ({ id: fn, src: './assets/sprites/buildings/' + fn })),
      parks: parkFiles.map(fn => ({ id: fn, src: './assets/sprites/buildings/' + fn })),
      industrial: industrialFiles.map(fn => ({ id: fn, src: './assets/sprites/buildings/' + fn })),
      parks_foliage: [
        ...parkFiles.map(fn => ({ id: fn, src: './assets/sprites/buildings/' + fn })),
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
      ...this.catalog.industrial,
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
