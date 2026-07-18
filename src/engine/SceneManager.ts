import type { Game, GameContext } from "./types";

export class SceneManager {
  private current?: Game;

  get currentGame(): Game | undefined {
    return this.current;
  }

  // Replace the active scene. If `running` is true we will destroy the previous
  // scene (if any) and initialize/resize the new scene immediately with the
  // provided context.
  setScene(next: Game, context?: GameContext, running = false): void {
    if (running && this.current) {
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
