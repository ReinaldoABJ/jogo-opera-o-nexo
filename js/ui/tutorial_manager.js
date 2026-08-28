/**
 * ============================================================================
 * TutorialManager — Onboarding & Briefing Tático Interativo
 * ============================================================================
 * Guia passo a passo para novos comandantes, ensinando os conceitos de
 * navegação por satélite, leitura de sensores FLIR, operadores booleanos
 * e execução de surtidas encadeadas com bônus de agilidade.
 */
export class TutorialManager {
  constructor(audio, bus) {
    this.audio = audio;
    this.bus = bus;
    this.currentStep = 0;
    this.modal = document.getElementById('tutorial-modal');

    this.steps = [
      {
        title: "1. 🛰️ Radar Satélite & Deslocamento do Drone",
        text: "Bem-vindo ao Centro de Comando! Na tela principal, você acompanha a cidade por imagem de satélite em tempo real. O drone tático decola da <strong>BASE-01</strong> e navega pelos corredores de voo táticos.<br><br>• Você pode clicar em qualquer ponto do mapa para redirecionar o drone manualmente caso necessário."
      },
      {
        title: "2. 🌡️ Sensores FLIR & Risco Dinâmico",
        text: "No painel lateral direito, observe os sensores térmicos e atmosféricos:<br>• <code>CIVIS_DETECTADOS</code>, <code>FOGO_ATIVO</code>, <code>GAS_TOXICO</code>.<br><br>⚠️ <strong>Atenção ao Cronômetro:</strong> Conforme o tempo avança, a gravidade do risco aumenta (🟢 Seguro ➔ 🟡 Expandindo ➔ 🔴 Crítico / Colapso Iminente). Seja rápido para salvar o setor!"
      },
      {
        title: "3. 🧩 Montagem dos Protocolos Lógicos",
        text: "Cada situação de emergência exige uma autorização baseada em lógica booleana. Clique nos operadores abaixo para preencher as lacunas <code>[ ? ]</code>:<br><br>• <strong>AND (E):</strong> Ambas as condições devem ser verdadeiras.<br>• <strong>OR (OU):</strong> Basta uma condição ser verdadeira.<br>• <strong>NOT (NÃO):</strong> Inverte o valor do sensor.<br>• <strong>XOR (OU Exclusivo):</strong> Apenas uma condição pode ser verdadeira."
      },
      {
        title: "4. 🚀 Validação, Surtidas Encadeadas & Pontuação",
        text: "Ao finalizar a regra, clique em <strong>🚀 EXECUTAR PROTOCOLO</strong>.<br><br>• Se a regra estiver correta, o drone neutraliza a ameaça e avança imediatamente para o próximo ponto da missão.<br>• Finalizar rapidamente concede até <strong>+45% de Bônus de Agilidade</strong> sobre a pontuação base!"
      }
    ];

    this.setupEvents();
  }

  setupEvents() {
    const btnNext = document.getElementById('tutorial-btn-next');
    const btnPrev = document.getElementById('tutorial-btn-prev');
    const btnSkip = document.getElementById('tutorial-btn-skip');

    if (btnNext) {
      btnNext.onclick = () => this.next();
    }
    if (btnPrev) {
      btnPrev.onclick = () => this.prev();
    }
    if (btnSkip) {
      btnSkip.onclick = () => this.close();
    }
  }

  start(onComplete = null) {
    this.onComplete = onComplete;
    this.currentStep = 0;
    this.showStep(0);
    if (this.modal) {
      this.modal.style.display = 'flex';
    }
    if (this.audio) this.audio.playPing();
  }

  showStep(idx) {
    this.currentStep = idx;
    const step = this.steps[idx];

    const counter = document.getElementById('tutorial-step-counter');
    const title = document.getElementById('tutorial-step-title');
    const content = document.getElementById('tutorial-step-content');
    const btnPrev = document.getElementById('tutorial-btn-prev');
    const btnNext = document.getElementById('tutorial-btn-next');

    if (counter) counter.textContent = `Passo ${idx + 1} de ${this.steps.length}`;
    if (title) title.innerHTML = step.title;
    if (content) content.innerHTML = step.text;

    if (btnPrev) btnPrev.style.visibility = idx > 0 ? 'visible' : 'hidden';
    if (btnNext) {
      btnNext.textContent = idx === this.steps.length - 1 ? '🎯 Iniciar Treinamento!' : 'Próximo ➡️';
    }
  }

  next() {
    if (this.audio) this.audio.playClick();
    if (this.currentStep < this.steps.length - 1) {
      this.showStep(this.currentStep + 1);
    } else {
      this.close();
      if (this.onComplete) {
        this.onComplete();
      }
    }
  }

  prev() {
    if (this.audio) this.audio.playClick();
    if (this.currentStep > 0) {
      this.showStep(this.currentStep - 1);
    }
  }

  close() {
    if (this.audio) this.audio.playClick();
    if (this.modal) {
      this.modal.style.display = 'none';
    }
    localStorage.setItem('nexo_tutorial_completed', 'true');
  }
}
