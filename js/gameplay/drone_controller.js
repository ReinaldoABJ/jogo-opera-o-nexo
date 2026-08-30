export class DroneController {
    constructor(startX, startY) {
      this.x = startX;
      this.y = startY;
      this.targetX = startX;
      this.targetY = startY;
      this.speed = 130;
      this.angle = 0;
      this.isMoving = false;
    }

    setDestination(x, y) {
      this.targetX = x;
      this.targetY = y;
      this.isMoving = true;
    }

    update(dt) {
      const dx = this.targetX - this.x;
      const dy = this.targetY - this.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 4) {
        this.isMoving = true;
        const targetAngle = Math.atan2(dy, dx) + Math.PI / 2;
        let diff = targetAngle - this.angle;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        this.angle += diff * Math.min(1, dt * 6);

        const moveDist = Math.min(dist, this.speed * dt);
        this.x += (dx / dist) * moveDist;
        this.y += (dy / dist) * moveDist;
      } else {
        this.isMoving = false;
      }
    }
  }

  // 7. HUD TÁTICO & OPERADORES BOOLEANOS
