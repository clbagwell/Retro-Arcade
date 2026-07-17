import type { Game, GameContext } from "../../engine/types";

export class TableTennisGame implements Game {
  private x = 160;
  private y = 120;
  private vx = 220;
  private vy = 180;
  private paddleY = 0;

  init(context: GameContext): void {
    this.resize(context);
  }

  resize({ width, height }: GameContext): void {
    this.x = width * 0.5;
    this.y = height * 0.5;
    this.paddleY = height / 2 - 40;
  }

  update(deltaSeconds: number, { width, height }: GameContext): void {
    this.x += this.vx * deltaSeconds;
    this.y += this.vy * deltaSeconds;

    if (this.x <= 24 || this.x >= width - 24) {
      this.vx *= -1;
      this.x = Math.min(Math.max(this.x, 24), width - 24);
    }

    if (this.y <= 24 || this.y >= height - 24) {
      this.vy *= -1;
      this.y = Math.min(Math.max(this.y, 24), height - 24);
    }

    this.paddleY = Math.min(Math.max(this.paddleY, 24), height - 104);
  }

  render({ ctx, width, height }: GameContext): void {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#020617";
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2;
    ctx.strokeRect(16, 16, width - 32, height - 32);

    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(24, this.paddleY, 12, 80);
    ctx.fillRect(width - 36, height * 0.5 - 40, 12, 80);

    ctx.fillStyle = "#fbbf24";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 14, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#e2e8f0";
    ctx.font = "600 20px ui-sans-serif, system-ui, sans-serif";
    ctx.fillText("Arcade Pong", 28, 44);
  }

  destroy(): void {
    this.x = 0;
    this.y = 0;
  }
}
