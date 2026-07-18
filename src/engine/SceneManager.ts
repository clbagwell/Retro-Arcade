import type { Game, GameContext } from "./types";

export class SceneManager {
  private current?: Game;

  get currentGame(): Game | undefined {
    return this.current;
  }

  // Replace the active scene and cleanly dispose of the previous one.
  // When the engine is already running, the new scene is initialized and
  // resized immediately using the current game context.
  setScene(next: Game, context?: GameContext, running = false): void {
    if (this.current) {
      this.current.destroy?.();
    }

    this.current = next;

    if (running && this.current && context) {
      this.current.init?.(context);
      this.current.resize?.(context);
    }
  }

  start(context: GameContext): void {
    if (!this.current) return;
    this.current.init?.(context);
    this.current.resize?.(context);
  }

  stop(): void {
    if (!this.current) return;
    this.current.destroy?.();
  }
}
