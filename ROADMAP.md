# 📋 Planejamento de Desenvolvimento — Próxima Sessão
**Projeto:** Operação NEXO: Comando & Resgate  
**Data de Registro:** 05/09/2026  
**Status Atual:** Checkpoint estável consolidado (`checkpoint-04-drone-transparente-helices`)

---

## 🎯 Pauta de Atividades Prioritárias para Amanhã:

### 1. 📊 Aumento de Variáveis de Sensores & Lógica Booleana
* **Objetivo:** Expandir a diversidade de variáveis telemétricas de inteligência além das básicas (`CIVIS`, `FOGO`, `GAS`).
* **Novas Variáveis Candidatas:**
  * `PRESSAO_HIDRAULICA` (Hidrantes e tubulações de combate a incêndio)
  * `VAZAMENTO_QUIMICO` (Indústrias e refinarias)
  * `REDE_ALTA_TENSAO` (Subestações elétricas e transformadores)
  * `COLAPSO_ESTRUTURAL` (Prédios e pontes abaladas)
  * `ACESSO_BLOQUEADO` (Vias e escombros obstruindo resgate)
  * `RADIAÇÃO_TERMAL` (Zonas industriais e tanques de combustível)
* **Impacto:** Enriquecerá a frase contínua do **Relatório da Inteligência** e permitirá fórmulas booleanas com maior variedade tática.

---

### 2. 🚁 Refinamento & Melhorias do Drone Militar
* **Objetivo:** Aprimorar ainda mais o comportamento e a estética do drone tático de resgate.
* **Itens de Melhoria:**
  * Ajuste de escala e proporção sobre a malha viária da cidade.
  * Efeito de inclinação (*banking tilt*) nas curvas e aceleração suave (*easing in/out*).
  * Refinamento da sombra projetada de acordo com a altitude do voo.
  * Partículas de propulsão ou rastro de ar nas hélices em deslocamento rápido.

---

### 3. 🎨 Geração e Integração de Novos Sprites
* **Objetivo:** Gerar as imagens pendentes do Lote 2.2 e integrá-las ao banco de assets e sorteio procedural.
* **Sprites Prioritários:**
  1. `mega_park_ecological_lake.png` (Bosque Ecológico com Lago Sinuoso e Ilha Central)
  2. `mega_park_cultural_plaza.png` (Praça Cívica e Anfiteatro Monumental)
  3. `mega_park_family_playground.png` (Parque de Convivência Familiar com Playground e Splash Pad)
* **Integração:** Adicionar os novos sprites ao [`SpriteBank`](js/render/sprite_bank.js) e [`CityGridEngine`](js/render/city_grid_engine.js) para randomização de super-quadras $2 \times 2$.

---

### 4. 💊 Caixa de Operadores em Formato de Pílula (*Pill-Shaped*)
* **Objetivo:** Modernizar o design dos slots de operadores e botões da fórmula com formato de pílula/cápsula arredondada.
* **Itens de Design:**
  * Slots conectivos `[ ? ]` com bordas totalmente arredondadas (`border-radius: 9999px` / *pill-badge*).
  * Botões de polaridade `[ + / NÃO ]` em formato de pílula tátil com estados ativos contrastantes.
  * Paleta de seleção rápida `[ AND ] [ OR ] [ XOR ]` estilizada em cápsulas ergonômicas.
  * Efeito de foco, brilho (*glow*) e clique tátil suave.

---

## 🛡️ Histórico de Checkpoints Git:
* `checkpoint-01-estavel` — Estado estável restaurado (HUD Inteligente, matriz 6x4, praças 2x2, canvas instantâneo).
* `checkpoint-02-prompts-parques-2x2` — Documento de prompts detalhados para super-parques.
* `checkpoint-03-imagens-parques-geradas` — 3 primeiros assets gerados guardados em `assets/sprites/buildings/`.
* `checkpoint-04-drone-transparente-helices` — Drone com transparência total, 4 hélices procedurais animadas e LEDs.
* `checkpoint-05-roadmap-salvo` — Registro deste planejamento para a próxima sessão.
