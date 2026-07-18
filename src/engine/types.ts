export interface InputState {
  keys: Record<string, boolean>;
  pointer: { x: number; y: number; down: boolean };
  touches: Array<{ id: number; x: number; y: number }>;
  gamepads: Array<{ axes: number[]; buttons: boolean[] }>;
}

export interface GameContext {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  pixelRatio: number;
  // input may be undefined when the engine composes the full context; engines
  // should expect an `input` snapshot to be present during updates/renders.
  input?: InputState;
}

export interface Game {
  init?(context: GameContext): void;
  resize?(context: GameContext): void;
  update(deltaSeconds: number, context: GameContext): void;
  render(context: GameContext): void;
  destroy?(): void;
}
