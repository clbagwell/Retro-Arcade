export interface GameContext {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  pixelRatio: number;
}

export interface Game {
  init?(context: GameContext): void;
  resize?(context: GameContext): void;
  update(deltaSeconds: number, context: GameContext): void;
  render(context: GameContext): void;
  destroy?(): void;
}
