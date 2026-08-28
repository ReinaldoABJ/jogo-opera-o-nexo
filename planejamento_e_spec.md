# 🚁 Planejamento & SPEC: Operação NEXO (Comando & Resgate)

> **Projeto:** GameHub — Sistemas de Informação UFMT  
> **Disciplina:** Lógica de Programação & Álgebra Booleana  
> **Status:** Concluído e Operacional  
> **Desenvolvedor:** Reinaldo Júnior | **Arquiteto:** ⚡ L.O.G.O.S.  

---

## 🎯 1. Conceito Pedagógico & Núcleo Lúdico (Gameplay First)
- **Tema:** Simulação tática de emergência urbana e defesa civil com drones de resgate autônomos.
- **Papel do Jogador:** Comandante de Operações Táticas.
- **Conteúdo Acadêmico:** Proposições lógicas, tabela-verdade, operadores booleanos (`AND`, `OR`, `NOT`, `XOR`) e avaliação de condições ambientais (`IF / ELSE`).
- **Núcleo de Diversão:** O jogador analisa setores críticos em um mapa de satélite, identifica sobreviventes e perigos (fogo, gás, falha de energia), constrói regras lógicas seguras e autoriza o drone a executar a missão.

---

## 🛰️ 2. Arquitetura & Visão de Tela
- **Mapa Satélite Realista (Canvas 2D):** Quadras urbanas, ruas, prédios detalhados e zonas térmicas de desastre.
- **Drone Militar com 4 Rotores:** Física de voo contínuo 2D com interpolação suave em direção aos setores clicados.
- **Mesa Tática de Operações:**
  - Leitura dos sensores (`CIVIS_DETECTADOS`, `FOGO_ATIVO`, `GAS_TOXICO`, `BATERIA_DRONE`).
  - Abas com múltiplos protocolos de intervenção (Evacuação, Retardante de Chamas, Gerador de Apoio).
  - Slots interativos para preenchimento de operadores: `[ E ]`, `[ OU ]`, `[ NÃO ]`, `[ XOR ]`.
  - **Alternador de Sintaxe:** Alternância instantânea entre Linguagem Natural (`E, OU, NÃO`) e Código Técnico (`AND, OR, NOT`) sem perda de pontos.
  - **📖 Manual Lógico do Comandante:** Glossário integrado com exemplos da tabela-verdade.

---

## 🏆 3. Gamificação & Integridade Antifraude
- **3 Níveis de Dificuldade:**
  - 🟢 **Fácil (Alpha):** 1.0x multiplicador, tempo amplo, fórmulas diretas.
  - 🟡 **Médio (Bravo):** 1.5x multiplicador, 2 protocolos, operadores com `NOT`.
  - 🔴 **Difícil (Charlie):** 2.0x multiplicador, situação crítica com `XOR` e parênteses duplos.
- **Estrelas (⭐ 1 a 3):** Baseadas em precisão e tempo.
- **Dicas com Custo:** Revela operadores ou reduz opções incorretas com penalidade de 20% no score da fase.
- **Antifraude:**
  - 🎓 **Central de Treinamento:** Livre, sem ranking oficial, ideal para estudo e professores.
  - ⚔️ **Desafio Diário (Ranqueado):** Semente paramétrica com sensores sorteados dinamicamente e envio de dados para o ranking do Arthur via `bridge_api.js`.

---

## 🎨 4. Prompts Prontos para IA de Imagens Externa

* **Drone Militar Realista (Top-Down):**
  > `Ultra-realistic military search and rescue quadcopter drone, top-down orthographic view, matte dark olive drab and slate gray camo, realistic carbon fiber textures, tactical cameras and FLIR sensors, detailed 4 propellers, isolated on transparent background, photorealistic military asset --no sci-fi, --no neon, --no shadows`
  *(Salvar em: `assets/sprites/drone.png`)*

* **Mapa Satélite da Cidade (Estilo Google Earth):**
  > `Satellite view orthophoto map of an urban district with realistic city blocks, asphalt roads, realistic buildings with rooftop vents, smoke rising from a burning building, photorealistic Google Earth satellite style, top-down view, 4k high detail terrain asset --no sci-fi, --no neon`
  *(Salvar em: `assets/sprites/map_satellite.png`)*

* **Ícones Táticos Militares:**
  > `Set of tactical military HUD icons, military green and amber monochrome, realistic icons for: medical triage cross, thermal fire detector, toxic gas warning, drone battery telemetry, clean minimalist stencil vector, isolated on transparent background`
  *(Salvar em: `assets/sprites/icons_hud.png`)*

---

## 🗂️ 5. Arquivos do Jogo no Cofre
- `index.html` — Arquivo principal (dois cliques para jogar).
- `game_app.js` — Motor executável standalone sem dependências.
- `css/style.css` — Design militar, responsivo e com modos daltônicos.
- `data/levels.json` e `data/levels_data.js` — Banco de dados de setores.
- `data/i18n.json` e `data/i18n_data.js` — Traduções em PT-BR, EN e ES.
- `game_manifest.json` — Manifesto de integração para o backend.

---

## 🚀 6. Roadmap & Futuras Atualizações Planejadas
1. **Tutorial & Onboarding:** Fluxo guiado para novos recrutas no primeiro setor.
2. **Correção de Aspect-Ratio do Mapa:** Ajuste de proporção no Canvas 2D eliminando distorção visual da imagem de satélite.
3. **Mecânica Multissetorial:** Avaliação de múltiplos pontos em cadeia por missão (combate à repetitividade).
4. **Tempo Crescente & Gravidade Dinâmica:** Pressão temporal onde a demora expande riscos ambientais.
5. **Bloqueio de Pausa no Modo Ranqueado:** Blindagem antifraude desativando a pausa durante o Desafio Diário.

