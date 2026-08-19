# 🚁 Operação NEXO: Comando & Resgate

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![GameHub](https://img.shields.io/badge/UFMT-GameHub%20SI-blue)](https://github.com)
[![Engine](https://img.shields.io/badge/Engine-Vanilla%20Canvas%202D-orange)](https://developer.mozilla.org/pt-BR/docs/Web/API/Canvas_API)
[![Audio](https://img.shields.io/badge/Audio-Web%20Audio%20API-purple)](https://developer.mozilla.org/pt-BR/docs/Web/API/Web_Audio_API)
[![A11y](https://img.shields.io/badge/Acessibilidade-Universal%20(3%20Idiomas%20%2B%204%20Filtros)-success)]()
[![Deploy](https://img.shields.io/badge/Deploy-GitHub%20Pages-brightgreen)](https://pages.github.com/)
[![Co-Creation](https://img.shields.io/badge/Co--Criação-Humano%20%2B%20IA%20(L.O.G.O.S.)-blueviolet)]()

**Simulação tática militar e resolução de crises urbanas com programação de drones autônomos utilizando Lógica de Programação e Álgebra Booleana.**

[🕹️ Jogar Online (GitHub Pages)](#-como-jogar-online) • [👥 Autoria & Co-Criação](#-autoria--co-criação) • [📖 Conceito Pedagógico](#-conceito-pedagógico--disciplina) • [🛰️ Recursos & Mecânicas](#-recursos--mecânicas) • [🏗️ Arquitetura de Código](#-arquitetura-do-projeto) • [🤝 Contribuição](#-como-contribuir)

</div>

---

## 👥 Autoria & Co-Criação

Este projeto é fruto de uma colaboração e engenharia em par (**Pair Programming Humano + Inteligência Artificial**):

* 👨‍💻 **Reinaldo Júnior** — Concepção do projeto, design pedagógico, validação acadêmica, engenharia de regras e direção criativa *(Sistemas de Informação — Universidade Federal de Mato Grosso)*.
* ⚡ **L.O.G.O.S. (Lógica, Ordem e Geração de Simulações)** — Agente Autônomo de Engenharia de Jogos & Game Design (*Antigravity Agentic AI*), responsável pela estruturação modular, implementação de Clean Code, telemetria de diagnóstico, síntese procedural e blindagem arquitetural de regressão zero.

---

## 🎯 Conceito Pedagógico & Disciplina

* **Disciplina:** Lógica de Programação & Álgebra Booleana (Sistemas de Informação - UFMT).
* **Competências Desenvolvidas:**
  - Avaliação de condições e proposições lógicas (`AND`, `OR`, `NOT`, `XOR`).
  - Precedência de operadores e parênteses.
  - Leitura de sensores e tomada de decisão computacional em tempo real sob restrições críticas.
* **Pilar Lúdico (*Gameplay First*):** O jogador assume o papel de **Comandante de Operações de Resgate e Defesa Civil**. Em vez de questionários escolares estáticos, o jogador raciocina logicamente para salvar vidas em setores urbanos em crise.

---

## 🛰️ Recursos & Mecânicas

1. **Visor Aéreo de Satélite Realista (Canvas 2D):**
   - Mapa detalhado com quadras urbanas, ruas, zonas térmicas de fumaça/fogo e base de decolagem.
   - Drone militar quadricóptero com física de voo suave, aceleração e rotação contínua em direção às coordenadas acionadas.
2. **Mesa Tática de Protocolos:**
   - Leitura de sensores ambientais em tempo real (`CIVIS_DETECTADOS`, `FOGO_ATIVO`, `GAS_TOXICO`, `BATERIA_DRONE`).
   - Construtor interativo de regras lógicas com slots de operadores.
   - **Alternador de Sintaxe:** Alterne com 1 clique entre **Linguagem Natural (E, OU, NÃO)** e **Código Técnico (AND, OR, NOT)** sem penalidades.
   - **Manual Lógico do Comandante (`📖 Manual`):** Glossário didático da tabela-verdade acessível a qualquer momento.
3. **Modos de Jogo & Integridade Antifraude:**
   - 🎓 **Central de Treinamento (Livre):** Sem pressão de tempo, pontuação isolada, ideal para aprendizado e professores em sala de aula.
   - ⚔️ **Desafio Diário (Ranqueado):** Semente diária paramétrica, tempo ativo e integração com o backend via `bridge_api.js`.
4. **Acessibilidade Universal:**
   - **3 Idiomas:** Português (PT-BR), Inglês (EN) e Espanhol (ES).
   - **4 Filtros de Daltonismo:** Protanopia, Deuteranopia, Tritanopia e Alto Contraste Militar.
   - **Redução de Movimento:** Desativação de flashes e efeitos visuais intensos.
5. **Telemetria de Desenvolvedor (`~` ou `Ctrl+Shift+D`):**
   - Console de diagnóstico com botão de cópia com um clique para relatórios de suporte e IA.

---

## 🏗️ Arquitetura do Projeto

O projeto adota uma arquitetura modular orientada a eventos (`EventBus`) e livre de dependências externas no cliente:

```
📁 jogo 01 - operacao nexo/
├── 📄 index.html                      # Layout de comando, HUD, modais e containers
├── 📄 game_app.js                     # Motor executável standalone unificado (produção/local)
├── 📄 game_manifest.json              # Manifesto de integração com a plataforma GameHub
├── 📄 LICENSE                         # Licença MIT
├── 📄 SECURITY.md                     # Política de reporte de segurança
├── 📄 CONTRIBUTING.md                 # Guia de contribuição e Clean Code
├── 📁 .github/workflows/
│   └── 📄 deploy.yml                  # CI/CD automático para GitHub Pages
├── 📁 css/
│   └── 📄 style.css                   # Design tático militar, layout responsivo e temas A11y
├── 📁 data/
│   ├── 📄 i18n.json / i18n_data.js    # Dicionários de internacionalização (PT, EN, ES)
│   └── 📄 levels.json / levels_data.js# Banco de dados de fases e setores de emergência
├── 📁 js/                             # Estrutura modular desacoplada
│   ├── 📄 main.js                     # Orquestrador principal da simulação
│   ├── 📄 bridge_api.js               # Conector de telemetria e pontuação com o backend
│   ├── 📁 core/                       # EventBus, GameLoop (60 FPS) e SceneManager
│   ├── 📁 gameplay/                   # DroneController, ChallengeEngine e Scoring
│   ├── 📁 render/                     # MapRenderer (Canvas 2D com interpolação suave)
│   ├── 📁 systems/                    # Áudio sintetizado (Web Audio API), A11y, Storage, Debug
│   └── 📁 ui/                         # TacticalHUD (Mesa de operações e seletores booleanos)
└── 📁 assets/                         # Sprites (drone, satélite, ícones) e efeitos sonoros
```

---

## 🚀 Como Executar

### 🌐 Como Jogar Online
O jogo é publicado automaticamente via GitHub Pages. Acesse a URL do repositório:
```
https://<seu-usuario>.github.io/<nome-do-repositorio>/
```

### 💻 Execução Local

#### Opção A: Execução Direta (Sem Servidor)
Dê um duplo clique no arquivo `index.html` em qualquer navegador moderno. O jogo carrega 100% de forma autônoma e offline.

#### Opção B: Servidor Local (Exemplo Python / Node)
```bash
# Com Python 3:
python3 -m http.server 8080

# Ou com Node.js (npx serve / http-server):
npx serve .
```
Acesse `http://localhost:8080` no navegador.

---

## 🤝 Como Contribuir

Contribuições são muito bem-vindas! Consulte o documento [`CONTRIBUTING.md`](CONTRIBUTING.md) para detalhes sobre a arquitetura de eventos, padrões de commit e fluxo de Pull Requests.

---

## 📜 Licença

Este projeto está licenciado sob os termos da [Licença MIT](LICENSE).

---

<div align="center">
Projeto co-criado por <strong>Reinaldo Júnior</strong> & <strong>⚡ L.O.G.O.S.</strong><br>
<em>GameHub — Universidade Federal de Mato Grosso (UFMT)</em>
</div>
