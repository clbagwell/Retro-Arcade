import { CanvasViewport } from "./CanvasViewport";
import { InputManager } from "./Input";
import { SceneManager } from "./SceneManager";
import type { Game, GameContext } from "./types";

interface EngineOptions {
  parent: HTMLElement;
  game: Game;
}

export class Engine {
  private readonly viewport: CanvasViewport;
  private readonly input: InputManager;
  private readonly sceneManager: SceneManager;
  private animationFrame = 0;
  private lastFrameTime = 0;
  private running = false;

  constructor({ parent, game }: EngineOptions) {
    this.viewport = new CanvasViewport(parent);
    this.input = new InputManager();
    this.sceneManager = new SceneManager();
    this.sceneManager.setScene(game, undefined, false);
    this.handleResize = this.handleResize.bind(this);
    this.tick = this.tick.bind(this);
  }

  start(): void {
    if (this.running) {
      return;
    }

    this.running = true;
    window.addEventListener("resize", this.handleResize);
    this.sceneManager.start(this.context);
    this.animationFrame = requestAnimationFrame(this.tick);
  }

  stop(): void {
    if (!this.running) {
      return;
    }

    this.running = false;
    window.removeEventListener("resize", this.handleResize);
    cancelAnimationFrame(this.animationFrame);
    this.sceneManager.stop();
    this.input.dispose();
  }

  setGame(nextGame: Game): void {
    if (this.running) {
      this.sceneManager.setScene(nextGame, this.context, true);
      return;
    }

    this.sceneManager.setScene(nextGame, undefined, false);
  }

  private get context(): GameContext {
    const base = this.viewport.getContext();
    return {
      ...base,
      input: this.input.getState(),
    };
  }

  private handleResize(): void {
    if (!this.viewport.resize()) {
      return;
    }

    const current = this.sceneManager.currentGame;
    current?.resize?.(this.context);
  }

  private tick(time: DOMHighResTimeStamp): void {
    if (!this.running) {
      return;
    }

    const deltaSeconds =
      this.lastFrameTime === 0 ? 0 : Math.min((time - this.lastFrameTime) / 1000, 0.05);
    this.lastFrameTime = time;

    this.input.update();
    const context = this.context;
    const current = this.sceneManager.currentGame;
    if (current) {
      current.update(deltaSeconds, context);
      current.render(context);
    }

    this.animationFrame = requestAnimationFrame(this.tick);
  }
}
