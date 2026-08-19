/**
 * ============================================================================
 * DroneController — Física de Voo Contínuo & Navegação por Waypoints
 * ============================================================================
 * Movimenta o drone militar suavemente em direção aos pontos clicados pelo
 * Comandante, calculando aceleração, desaceleração e rotação angular.
 */
export class DroneController {
  constructor(startX = 45, startY = 45) {
    this.x = startX;
    this.y = startY;
    this.vx = 0;
    this.vy = 0;
    this.angle = 0;
    
    this.targetX = null;
    this.targetY = null;
    this.isArrived = true;

    this.maxSpeed = 160; // Pixels por segundo
    this.acceleration = 240;
    this.friction = 0.92;
  }

  setDestination(x, y) {
    this.targetX = x;
    this.targetY = y;
    this.isArrived = false;
  }

  update(dt) {
    if (this.targetX === null || this.targetY === null) return;

    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    const distance = Math.hypot(dx, dy);

    if (distance < 6) {
      // Chegou ao destino com precisão
      this.x = this.targetX;
      this.y = this.targetY;
      this.vx = 0;
      this.vy = 0;
      this.isArrived = true;
      return;
    }

    // Calcula ângulo em direção ao alvo
    const targetAngle = Math.atan2(dy, dx) + Math.PI / 2;
    // Rotação suave (interpolação angular)
    this.angle += (targetAngle - this.angle) * 0.15;

    // Normalização de direção
    const dirX = dx / distance;
    const dirY = dy / distance;

    // Aceleração proporcional à distância
    const speedFactor = Math.min(1.0, distance / 40);
    this.vx += dirX * this.acceleration * dt * speedFactor;
    this.vy += dirY * this.acceleration * dt * speedFactor;

    // Aplica atrito
    this.vx *= this.friction;
    this.vy *= this.friction;

    // Atualiza coordenadas
    this.x += this.vx * dt * this.maxSpeed;
    this.y += this.vy * dt * this.maxSpeed;
  }
}
