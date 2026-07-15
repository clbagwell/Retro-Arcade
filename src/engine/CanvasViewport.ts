import type { GameContext } from "./types";

export class CanvasViewport {
  readonly canvas: HTMLCanvasElement;
  readonly ctx: CanvasRenderingContext2D;

  private width = 0;
  private height = 0;
  private pixelRatio = 1;

  constructor(parent: HTMLElement) {
    this.canvas = document.createElement("canvas");

    const ctx = this.canvas.getContext("2d");
    if (!ctx) {
      throw new Error("2D canvas rendering is not available.");
    }

    this.ctx = ctx;
    parent.append(this.canvas);
    this.resize();
  }

  resize(): boolean {
    const nextWidth = Math.max(1, window.innerWidth);
    const nextHeight = Math.max(1, window.innerHeight);
    const nextPixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    if (
      nextWidth === this.width &&
      nextHeight === this.height &&
      nextPixelRatio === this.pixelRatio
    ) {
      return false;
    }

    this.width = nextWidth;
    this.height = nextHeight;
    this.pixelRatio = nextPixelRatio;
    this.canvas.width = Math.floor(this.width * this.pixelRatio);
    this.canvas.height = Math.floor(this.height * this.pixelRatio);
    this.ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);

    return true;
  }

  getContext(): GameContext {
    return {
      canvas: this.canvas,
      ctx: this.ctx,
      width: this.width,
      height: this.height,
      pixelRatio: this.pixelRatio,
    };
  }
}
