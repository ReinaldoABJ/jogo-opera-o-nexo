---
tipo: backlog-jogo
projeto: GameHub — Operação NEXO
status: planejado / aguardando sprint
criado_em: 2026-08-21
responsavel: Reinaldo Júnior & ⚡ L.O.G.O.S.
---

# 📋 Backlog de Futuras Atualizações — Operação NEXO

Este documento registra as 5 melhorias e novos requisitos definidos para a próxima iteração da **Operação NEXO (Comando & Resgate)**.

---

## 🎯 Lista de Requisitos & Itens do Backlog (Ordem Otimizada por Dependência)

### 1. 🗺️ Fase 1: Correção da Imagem de Fundo & Eliminação de Distorções (Aspect-Ratio)
* **Problema:** A proporção da imagem de satélite do mapa urbano pode sofrer distorção / estiramento em resoluções não proporcionais no Canvas 2D.
* **Solução:** Ajustar o renderizador (`MapRenderer`) para manter o `aspect-ratio` nativo da textura de satélite com corte inteligente (`cover/contain`) e renderização nítida sem esticamento de pixels, preservando a matriz de coordenadas relativas do drone e dos setores.

### 2. 🛡️ Fase 2: Integridade do Modo Ranqueado (Bloqueio de Pausa Antifraude)
* **Problema:** No modo competitivo/Desafio Diário, permitir pausar o jogo abre brecha para o jogador congelar o tempo e consultar respostas ou tabelas externas sem penalidade.
* **Solução:** Desativar completamente a funcionalidade de pausa (`ESC` / botão de pausa) durante o **Modo Desafio Diário (Ranqueado)**, mantendo a pausa ativa apenas na **Central de Treinamento (Modo Livre)**.

### 3. ⏱️ Fase 3: Tempo Crescente & Escala de Gravidade de Risco Dinâmico
* **Problema:** Falta de tensão dinâmica e progressão de urgência durante a tomada de decisão.
* **Solução:** Implementar um cronômetro crescente com **nível de risco escalável**: quanto mais tempo o jogador demora para autorizar o protocolo, mais o fogo ou o gás tóxico se expande no mapa, aumentando o perigo de falha e reduzindo o multiplicador de pontuação.

### 4. 🔄 Fase 4: Combate à Repetitividade (Mecânica de Múltiplos Pontos de Avaliação)
* **Problema:** Se cada fase for apenas uma fórmula estática única, a jogabilidade corre o risco de ficar monótona.
* **Solução:** Inspirar-se na mecânica do protótipo clássico onde o drone precisa avaliar **múltiplos setores em sequência na mesma missão** (ex.: Ponto A: resgate de civis ➔ Ponto B: extinção de incêndio ➔ Ponto C: extração de sobreviventes), exigindo regras lógicas encadeadas e adaptação de rota.

### 5. 🎓 Fase 5: Tutorial Interativo / Onboarding do Jogador
* **Problema:** Novos jogadores podem não compreender de imediato como a mesa de protocolos se conecta com os sensores e com o drone no satélite.
* **Solução:** Criar um fluxo de introdução interativa (passo a passo guiado no primeiro setor) explicando a leitura dos sensores, a montagem dos operadores booleanos (`AND`, `OR`, `NOT`, `XOR`) e o botão de autorização de voo sobre o jogo já consolidado e finalizado.

---

## 📌 Status de Implementação
- [x] Fase 1: Correção de Aspect Ratio do Mapa de Satélite (Concluído em 27/08/2026)
- [x] Fase 2: Bloqueio de Pausa no Modo Desafio Ranqueado (Concluído em 27/08/2026)
- [x] Fase 3: Cronômetro de Urgência & Gravidade de Risco Dinâmico (Concluído em 27/08/2026)
- [x] Fase 4: Mecânica Multissetorial de Missões Encadeadas (Concluído em 27/08/2026)
- [x] Fase 5: Tutorial Interativo / Onboarding (Concluído em 27/08/2026)
- [x] Evolução de Gameplay: Toggles de Negação `[ + / NOT ]`, Decisão de Protocolo Único (Alpha/Bravo/Charlie/Delta) e Arquitetura de Temporadas para 6 Meses (24 Semanas) (Concluído em 27/08/2026)
- [x] **Sprint de Polimento & Ergonomia (30/08/2026):**
  - [x] **1. Viewport Lock 100vh / No-Scroll:** Eliminação de 100% da rolagem de página no notebook e celular com responsividade dinâmica.
  - [x] **2. Motor de Grade Procedural (`CityGridEngine`):** Divisão urbana $8 \times 6$ com ancoragem de nós de emergência e geração de lotes adjacentes por semente determinística.
  - [x] **3. Banco de Sprites Top-Down:** Injeção e renderização de sprites com visão de satélite ortográfica 90° (Escola, Hospital, Subestação, Fábrica Química, Prefeitura).

---

## 🏆 Resultado & Próximos Passos
O núcleo da Operação NEXO encontra-se 100% polido, estável, escalável e enquadrado em qualquer tamanho de tela com geração infinita de mapas e zero repetição.

