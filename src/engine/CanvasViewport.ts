import type { GameContext } from "./types";

export class CanvasViewport {
  readonly canvas: HTMLCanvasElement;
  readonly ctx: CanvasRenderingContext2D;
  private viewport: HTMLElement;

  private width = 0;
  private height = 0;
  private pixelRatio = 1;

  constructor(parent: HTMLElement) {
    // Create viewport container with fixed aspect ratio
    this.viewport = document.createElement("div");
    this.viewport.id = "game-viewport";
    parent.append(this.viewport);

    this.canvas = document.createElement("canvas");

    const ctx = this.canvas.getContext("2d");
    if (!ctx) {
      throw new Error("2D canvas rendering is not available.");
    }

    this.ctx = ctx;
    this.viewport.append(this.canvas);
    this.resize();
  }

  resize(): boolean {
    // Fixed game area: 800x500, scales to fit viewport
    const gameWidth = 800;
    const gameHeight = 500;

    // Calculate available space
    const availWidth = Math.max(1, this.viewport.clientWidth);
    const availHeight = Math.max(1, this.viewport.clientHeight);

    // Scale to fit while maintaining aspect ratio
    const scaleX = availWidth / gameWidth;
    const scaleY = availHeight / gameHeight;
    const scale = Math.min(scaleX, scaleY, 1); // Don't scale up

    this.width = gameWidth * scale;
    this.height = gameHeight * scale;
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    // Set actual canvas size for rendering
    this.canvas.width = Math.floor(this.width * this.pixelRatio);
    this.canvas.height = Math.floor(this.height * this.pixelRatio);
    this.ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);

    // Set displayed size
    this.canvas.style.width = this.width + "px";
    this.canvas.style.height = this.height + "px";

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
