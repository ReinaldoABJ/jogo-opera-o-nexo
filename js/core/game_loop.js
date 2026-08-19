/**
 * ============================================================================
 * GameLoop — Ciclo de Vida e Delta Time (Operação NEXO)
 * ============================================================================
 */
export class GameLoop {
  constructor(updateFn, renderFn) {
    this.update = updateFn;
    this.render = renderFn;
    this.isRunning = false;
    this.lastTime = 0;
    this.fps = 60;
    this.frameCount = 0;
    this.fpsTimer = 0;
    this.animationFrameId = null;

    this.loop = this.loop.bind(this);
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    this.animationFrameId = requestAnimationFrame(this.loop);
  }

  stop() {
    this.isRunning = false;
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
  }

  loop(currentTime) {
    if (!this.isRunning) return;

    const rawDelta = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;
    const deltaTime = Math.min(rawDelta, 0.1);

    this.frameCount++;
    this.fpsTimer += rawDelta;
    if (this.fpsTimer >= 1.0) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.fpsTimer = 0;
    }

    if (this.update) this.update(deltaTime);
    if (this.render) this.render();

    this.animationFrameId = requestAnimationFrame(this.loop);
  }
}
