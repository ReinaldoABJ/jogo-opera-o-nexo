/**
 * ============================================================================
 * AccessibilitySystem — Acessibilidade Universal & i18n (Operação NEXO)
 * ============================================================================
 */
export class AccessibilitySystem {
  constructor(eventBus, i18nData) {
    this.bus = eventBus;
    this.i18n = i18nData || {};
    this.currentLang = 'pt-br';
    this.colorblindMode = 'none';
  }

  setLanguage(langCode) {
    if (this.i18n[langCode]) {
      this.currentLang = langCode;
      this.bus.emit('LANGUAGE_CHANGED', { lang: langCode });
      this.updateDOMText();
    }
  }

  getText(key) {
    return this.i18n[this.currentLang]?.[key] || key;
  }

  setColorblindMode(mode) {
    this.colorblindMode = mode;
    document.body.classList.remove(
      'theme-protanopia',
      'theme-deuteranopia',
      'theme-tritanopia',
      'theme-high-contrast'
    );
    if (mode !== 'none') {
      document.body.classList.add(`theme-${mode}`);
    }
  }

  setReducedMotion(enabled) {
    if (enabled) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }
  }

  updateDOMText() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = this.getText(key);
      if (text) {
        el.textContent = text;
      }
    });
  }
}
