# 🤝 Guia de Contribuição — Operação NEXO

Agradecemos o seu interesse em contribuir com a **Operação NEXO: Comando & Resgate** e com o ecossistema **GameHub (Sistemas de Informação - UFMT)**!

---

## 🧭 Diretrizes de Desenvolvimento

Para preservar a estabilidade, Clean Code e a premissa de *Zero Dependências no Cliente*, seguimos regras arquiteturais estritas:

### 1. 🧩 Arquitetura Modular & Componentização
- Cada sistema (áudio, renderizador, controle do drone, lógica booleana, HUD) reside em seu respectivo arquivo dentro de `/js/`.
- NUNCA introduza arquivos monolíticos ou acoplamento circular.
- Utilize o `EventBus` (`js/core/event_bus.js`) para comunicação desacoplada entre sistemas.

### 2. 🛡️ Regressão Zero & Compatibilidade Offline
- O jogo DEVE continuar funcionando de forma nativa via protocolo `file:///` (abrindo o `index.html` com 2 cliques) e via servidor web/GitHub Pages.
- Não utilize frameworks pesados de frontend ou bibliotecas externas que exijam build complexo via `npm` para execução básica do jogo.
- Mudanças em `/js/` devem ser refletidas e mantidas sincronizadas em `game_app.js`.

### 3. 🎨 Acessibilidade & Internacionalização
- Qualquer nova string de interface DEVE ser adicionada aos arquivos de i18n (`data/i18n.json` e `data/i18n_data.js`) nos 3 idiomas suportados (`pt-br`, `en`, `es`).
- Todo novo elemento visual deve respeitar os modos daltônicos configuráveis.

---

## 🌿 Fluxo de Trabalho Git (Branching & Commits)

1. Faça um Fork do projeto no GitHub.
2. Crie uma branch para a sua funcionalidade:
   ```bash
   git checkout -b feature/minha-nova-mecanica
   ```
3. Siga o padrão **Conventional Commits**:
   - `feat:` Nova mecânica ou funcionalidade.
   - `fix:` Correção de bug.
   - `docs:` Alterações na documentação.
   - `style:` Formatação visual/CSS sem alteração de lógica.
   - `refactor:` Refatoração de código sem alteração de comportamento externo.
4. Envie suas alterações para o seu fork:
   ```bash
   git push origin feature/minha-nova-mecanica
   ```
5. Abra um **Pull Request** detalhado descrevendo a motivação e as telas/testes realizados.
