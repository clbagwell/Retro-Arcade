import { CanvasViewport } from "./CanvasViewport";
import type { Game, GameContext } from "./types";

interface EngineOptions {
  parent: HTMLElement;
  game: Game;
}

export class Engine {
  private readonly viewport: CanvasViewport;
  private game: Game;
  private animationFrame = 0;
  private lastFrameTime = 0;
  private running = false;

  constructor({ parent, game }: EngineOptions) {
    this.viewport = new CanvasViewport(parent);
    this.game = game;
    this.handleResize = this.handleResize.bind(this);
    this.tick = this.tick.bind(this);
  }

  start(): void {
    if (this.running) {
      return;
    }

    this.running = true;
    window.addEventListener("resize", this.handleResize);
    this.game.init?.(this.context);
    this.game.resize?.(this.context);
    this.animationFrame = requestAnimationFrame(this.tick);
  }

  stop(): void {
    if (!this.running) {
      return;
    }

    this.running = false;
    window.removeEventListener("resize", this.handleResize);
    cancelAnimationFrame(this.animationFrame);
    this.game.destroy?.();
  }

  setGame(nextGame: Game): void {
    if (this.running) {
      this.game.destroy?.();
      this.game = nextGame;
      this.game.init?.(this.context);
      this.game.resize?.(this.context);
      return;
    }

    this.game = nextGame;
  }

  private get context(): GameContext {
    return this.viewport.getContext();
  }

  private handleResize(): void {
    if (this.viewport.resize()) {
      this.game.resize?.(this.context);
    }
  }

  private tick(time: DOMHighResTimeStamp): void {
    if (!this.running) {
      return;
    }

    const deltaSeconds =
      this.lastFrameTime === 0 ? 0 : Math.min((time - this.lastFrameTime) / 1000, 0.05);
    this.lastFrameTime = time;

    const context = this.context;
    this.game.update(deltaSeconds, context);
    this.game.render(context);

    this.animationFrame = requestAnimationFrame(this.tick);
  }
}
