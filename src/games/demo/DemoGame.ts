import type { Game, GameContext } from "../../engine/types";

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hue: number;
}

export class DemoGame implements Game {
  private readonly orbs: Orb[] = [];
  private elapsed = 0;

  init({ width, height }: GameContext): void {
    this.createOrbs(width, height);
  }

  resize({ width, height }: GameContext): void {
    if (this.orbs.length === 0) {
      this.createOrbs(width, height);
    }
  }

  update(deltaSeconds: number, { width, height }: GameContext): void {
    this.elapsed += deltaSeconds;

    for (const orb of this.orbs) {
      orb.x += orb.vx * deltaSeconds;
      orb.y += orb.vy * deltaSeconds;

      if (orb.x < orb.radius || orb.x > width - orb.radius) {
        orb.vx *= -1;
        orb.x = Math.min(Math.max(orb.x, orb.radius), width - orb.radius);
      }

      if (orb.y < orb.radius || orb.y > height - orb.radius) {
        orb.vy *= -1;
        orb.y = Math.min(Math.max(orb.y, orb.radius), height - orb.radius);
      }
    }
  }

  render({ ctx, width, height }: GameContext): void {
    ctx.clearRect(0, 0, width, height);

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#09090f");
    gradient.addColorStop(1, "#171725");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    this.drawGrid(ctx, width, height);

    for (const orb of this.orbs) {
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${orb.hue}, 90%, 58%)`;
      ctx.shadowColor = `hsl(${orb.hue}, 90%, 58%)`;
      ctx.shadowBlur = 20;
      ctx.fill();
    }

    ctx.shadowBlur = 0;
    ctx.fillStyle = "#f8fafc";
    ctx.font = "700 22px ui-sans-serif, system-ui, sans-serif";
    ctx.fillText("Retro Arcade Engine", 24, 42);
    ctx.font = "500 14px ui-sans-serif, system-ui, sans-serif";
    ctx.fillStyle = "#a7f3d0";
    ctx.fillText("Browser app structure online", 24, 66);
  }

  private createOrbs(width: number, height: number): void {
    this.orbs.length = 0;

    for (let index = 0; index < 8; index += 1) {
      this.orbs.push({
        x: width * (0.2 + Math.random() * 0.6),
        y: height * (0.2 + Math.random() * 0.6),
        vx: (Math.random() > 0.5 ? 1 : -1) * (70 + Math.random() * 90),
        vy: (Math.random() > 0.5 ? 1 : -1) * (70 + Math.random() * 90),
        radius: 8 + Math.random() * 18,
        hue: 140 + index * 28,
      });
    }
  }

  private drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    const horizon = height * 0.62 + Math.sin(this.elapsed) * 8;
    ctx.strokeStyle = "rgba(125, 211, 252, 0.22)";
    ctx.lineWidth = 1;

    for (let x = 0; x <= width; x += 48) {
      ctx.beginPath();
      ctx.moveTo(x, horizon);
      ctx.lineTo(width / 2 + (x - width / 2) * 2.8, height);
      ctx.stroke();
    }

    for (let y = horizon; y <= height; y += 34) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }
}
