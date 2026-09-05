# 🌳 Prompts de Geração — Super-Praças & Parques 2x2 (Operação NEXO)

> **Proporção & Enquadramento Atual:**
> - **Ocupação na Grade:** Super-quadra de $2 \times 2$ células (4 células unificadas da matriz $6 \times 4$).
> - **Proporção Real:** Proporção aproximada 1:1 (quadrada) a 9:10 com perspectiva ortográfica 90° top-down.
> - **Resolução Recomendada:** 1024x1024px ou 512x512px.
> - **Estilo Visual:** Satellite aerial painterly, top-down 90° orthographic, high detail, sharp textures, sem perspectiva angular (visão perpendicular de satélite), iluminação solar suave superior com sombras curtas e nítidas.

---

## 📋 Lista de Prompts Prontos para Geração

### 1. ⛲ Parque Central Cívico & Grande Chafariz
* **Nome de Arquivo Sugerido:** `mega_park_central_fountain.png`
* **Descrição:** Praça metropolitana imponente com chafariz monumental no centro, calçadões em mosaico geométrico, alamedas diagonais que conectam os 4 cantos e fileiras ordenadas de árvores ornamentais.
* **Prompt Completo:**
```text
Satellite aerial painterly view, top-down 90° orthographic of a large urban central civic park 2x2 city block, monumental concentric circular water fountain in the exact center with crystal blue water, wide Portuguese stone pedestrian walking paths radiating in cross and diagonal patterns to the four edges, lush manicured green lawns, organized clusters of canopy trees, park benches, flowerbeds, clean paved borders matching city streets, photorealistic satellite look with subtle artistic painterly finish, dark neutral pavement border, high resolution, 8k textures, top-down orthographic satellite photography.
```

---

### 2. 🌺 Parque Botânico & Estufa Ornamental
* **Nome de Arquivo Sugerido:** `mega_park_botanical_garden.png`
* **Descrição:** Jardim botânico rico em detalhes com canteiros floridos coloridos, estufa com teto de vidro geométrico, labirinto de topiaria e espelhos d'água lineares modernos.
* **Prompt Completo:**
```text
Satellite aerial painterly, top-down 90° orthographic view of a metropolitan botanical garden occupying a 2x2 urban block, elegant geometric glass greenhouse pavilion, colorful circular and rectangular flowerbeds with vibrant flora, classical hedge maze garden, linear reflecting water pools with stone bridges, winding flagstone walking trails, dense variety of ornamental trees, lush green turf, crisp architectural detail, photorealistic satellite texture with artistic painterly lighting, dark neutral border, high detail, 1024x1024.
```

---

### 3. 🏃 Parque Esportivo & Lazer Metropolitano
* **Nome de Arquivo Sugerido:** `mega_park_sports_complex.png`
* **Descrição:** Parque urbano com foco esportivo e recreativo, contendo pista de corrida emborrachada perimetral (tartan vermelho), quadras poliesportivas coloridas (azul e terracota), skate park suave e bosques de sombra.
* **Prompt Completo:**
```text
Satellite aerial painterly view, top-down 90° orthographic of a modern urban sports and recreation park spanning a 2x2 city block, oval red rubber running track around the perimeter, two colorful blue and terracotta basketball and tennis courts, mini concrete skate park, open green recreational lawn, dense tree groves on the corners providing canopy shade, pedestrian walkways connecting sports areas, clean architectural satellite rendering, vibrant yet grounded military satellite aesthetic, dark border.
```

---

### 4. 🦆 Bosque Ecológico com Lago Natural
* **Nome de Arquivo Sugerido:** `mega_park_ecological_lake.png`
* **Descrição:** Área de preservação e ecoturismo urbano com lago sinuoso natural de águas esmeralda/azul, pequena ilha arborizada central com passarela de madeira, copas densas de árvores nativas e trilhas de terra batida.
* **Prompt Completo:**
```text
Satellite aerial painterly top-down 90° orthographic view of a lush ecological nature reserve park in a 2x2 city block, winding organic natural lake with emerald blue water and gentle shoreline, small central wooded island with wooden footbridge, dense clusters of varied canopy trees (oak, pine, flowering jacaranda), organic dirt and gravel walking paths, natural boulders, picnic grass clearings, high detail satellite orthographic perspective, painterly photorealistic finish, dark neutral edge.
```

---

### 5. 🏛️ Praça Cívica & Memorial Cultural
* **Nome de Arquivo Sugerido:** `mega_park_cultural_plaza.png`
* **Descrição:** Praça monumental com anfiteatro aberto em degraus concêntricos, monumento/obelisco central com espelho d'água refletor, alameda de palmeiras imperiais e amplos pátios de pedra polida.
* **Prompt Completo:**
```text
Satellite aerial painterly view, top-down 90° orthographic of an imposing cultural and memorial civic plaza occupying a 2x2 urban city block, sunken circular open-air stone amphitheater, modern central obelisk monument surrounded by a shallow rectangular reflection pool, majestic double-lined avenue of imperial palm trees and trimmed ficus trees, dark granite and slate paved esplanades, clean modern urban public architecture, high definition satellite painting style, dark background border.
```

---

### 6. 🎪 Parque de Convivência Familiar & Playground
* **Nome de Arquivo Sugerido:** `mega_park_family_playground.png`
* **Descrição:** Parque urbano comunitário voltado para famílias e crianças, com grande playground emborrachado com formas orgânicas coloridas, chafariz de piso interativo (splash pad), quiosques e gramados com árvores frondosas.
* **Prompt Completo:**
```text
Satellite aerial painterly top-down 90° orthographic view of a family community recreation park 2x2 block, colorful rubber-surfaced playground with organic play structures and sand pits, circular interactive ground splash fountain pad, open grass lawns for picnics, scattered shady canopy trees casting soft shadows, paved stroller loops, food pavilion roof with solar panels, vibrant community atmosphere seen from straight-down satellite view, high detail painterly texture.
```

---

## 🛠️ Dicas para Pós-Processamento e Integração:
1. **Remoção de Fundo / Bordas:** Recortar como imagem quadrada transparente (`.png`) ou preencher até as 4 arestas para encaixe perfeito nas ruas do jogo.
2. **Pasta de Destino no Jogo:** Salvar os arquivos gerados em:
   `assets/sprites/buildings/`
3. **Registro Automático no Jogo:** Após salvar os arquivos na pasta de assets, o registro é feito no catálogo do [`SpriteBank`](file:///home/reinaldo/Documentos/O%20Todo/%F0%9F%A7%A0%20The%20Mind/01-JOGOS_E_SIMULACOES/%F0%9F%8E%AE%20GameHub/jogo%2001%20-%20operacao%20nexo/js/render/sprite_bank.js) na categoria `parks` e `parks_foliage`.
