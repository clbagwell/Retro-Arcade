import type { Game, GameContext } from "../../engine/types";

export class LifeReportGame implements Game {
  private elapsed = 0;

  init(context: GameContext): void {
    this.resize(context);
  }

  resize(context: GameContext): void {
    void context;
  }

  update(deltaSeconds: number): void {
    this.elapsed += deltaSeconds;
  }

  render({ ctx, width, height }: GameContext): void {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#f8fafc";
    ctx.font = "700 30px ui-sans-serif, system-ui, sans-serif";
    ctx.fillText("Life Report", 48, 72);

    ctx.font = "500 16px ui-sans-serif, system-ui, sans-serif";
    ctx.fillStyle = "#cbd5e1";
    ctx.fillText("Narrative cards and metrics will live here.", 48, 104);

    ctx.fillStyle = "#312e81";
    ctx.fillRect(48, 140, width - 96, 120);
    ctx.fillStyle = "#ffffff";
    ctx.font = "600 20px ui-sans-serif, system-ui, sans-serif";
    ctx.fillText("Momentum", 72, 190);

    const barWidth = 180 + Math.sin(this.elapsed) * 64;
    ctx.fillStyle = "#8b5cf6";
    ctx.fillRect(72, 212, barWidth, 14);
  }

  destroy(): void {
    this.elapsed = 0;
  }
}
