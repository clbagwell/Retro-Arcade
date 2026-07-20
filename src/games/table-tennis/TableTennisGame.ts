import type { Game, GameContext } from "../../engine/types";

const MAX_SCORE = 5;

interface SoundManager {
  hit: HTMLAudioElement;
  cheer: HTMLAudioElement;
  boo: HTMLAudioElement;
  win: HTMLAudioElement;
  lose: HTMLAudioElement;
  music: HTMLAudioElement;
  play(name: keyof Omit<SoundManager, "play">): void;
}

function createSoundManager(): SoundManager {
  const baseUrl = "./";
  const hit = new Audio(baseUrl + "hit.mp3");
  const cheer = new Audio(baseUrl + "cheer.mp3");
  const boo = new Audio(baseUrl + "boo.mp3");
  const win = new Audio(baseUrl + "win.mp3");
  const lose = new Audio(baseUrl + "lose.mp3");
  const music = new Audio(baseUrl + "music.mp3");
  music.loop = true;

  return {
    hit,
    cheer,
    boo,
    win,
    lose,
    music,
    play(name: keyof Omit<SoundManager, "play">) {
      const audio = this[name];
      if (audio && audio !== music) {
        const clone = audio.cloneNode() as HTMLAudioElement;
        clone.play().catch(() => {});
      }
    },
  };
}

export class TableTennisGame implements Game {
  private x = 160;
  private y = 120;
  private vx = 220;
  private vy = 180;
  private paddleY = 0;
  private opponentY = 0;
  private leftScore = 0;
  private rightScore = 0;
  private gameOver = false;
  private hintTimer = 0;
  private soundManager: SoundManager = createSoundManager();
  private musicPlaying = false;

  init(context: GameContext): void {
    this.reset(context);
    try {
      this.soundManager.music.play().catch(() => {});
      this.musicPlaying = true;
    } catch {
      // Music playback may fail due to autoplay policy
    }
  }

  resize(context: GameContext): void {
    this.reset(context);
  }

  update(deltaSeconds: number, context: GameContext): void {
    const { width, height, input } = context;

    if (this.gameOver) {
      if (input?.anyKeyDown("Enter", "Space")) {
        this.leftScore = 0;
        this.rightScore = 0;
        this.gameOver = false;
        this.reset(context);
      }
      return;
    }

    // Track hint timer when hints are enabled and not yet marked as shown
    const showPref = localStorage.getItem("retro-arcade.showHints");
    const hintsEnabled = showPref === null ? true : showPref === "true";
    const hintShown = localStorage.getItem("retro-arcade.hintShown") === "true";
    if (hintsEnabled && !hintShown) {
      this.hintTimer += deltaSeconds;
      if (this.hintTimer >= 4) {
        localStorage.setItem("retro-arcade.hintShown", "true");
      }
    }

    const moveAmount = 320 * deltaSeconds;

    if (input) {
      if (input.anyKeyDown("ArrowUp", "KeyW")) {
        this.paddleY -= moveAmount;
      }
      if (input.anyKeyDown("ArrowDown", "KeyS")) {
        this.paddleY += moveAmount;
      }

      if (input.pointerInLeftHalf(width)) {
        this.paddleY = input.pointer.y - 40;
      }

      const pad = input.getPrimaryGamepad();
      if (pad && pad.axes.length > 1) {
        this.paddleY += pad.axes[1] * moveAmount;
      }
    }

    this.paddleY = Math.min(Math.max(this.paddleY, 24), height - 104);
    this.opponentY = Math.min(Math.max(this.y - 40, 24), height - 104);

    this.x += this.vx * deltaSeconds;
    this.y += this.vy * deltaSeconds;

    if (this.y <= 24 || this.y >= height - 24) {
      this.vy *= -1;
      this.y = Math.min(Math.max(this.y, 24), height - 24);
    }

    const leftPaddleRect = { x: 24, y: this.paddleY, w: 12, h: 80 };
    const rightPaddleRect = { x: width - 48, y: this.opponentY, w: 12, h: 80 };

    if (this.collides(leftPaddleRect, this.x, this.y, 14)) {
      this.vx = Math.abs(this.vx);
      this.x = leftPaddleRect.x + leftPaddleRect.w + 14;
      this.soundManager.play("hit");
    }

    if (this.collides(rightPaddleRect, this.x, this.y, 14)) {
      this.vx = -Math.abs(this.vx);
      this.x = rightPaddleRect.x - 14;
      this.soundManager.play("hit");
    }

    if (this.x <= 0) {
      this.scorePoint(false, context);
    }

    if (this.x >= width) {
      this.scorePoint(true, context);
    }
  }

  render({ ctx, width, height }: GameContext): void {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#020617";
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2;
    ctx.strokeRect(16, 16, width - 32, height - 32);

    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(24, this.paddleY, 12, 80);
    ctx.fillRect(width - 48, this.opponentY, 12, 80);

    ctx.fillStyle = "#fbbf24";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 14, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#e2e8f0";
    ctx.font = "600 20px ui-sans-serif, system-ui, sans-serif";
    ctx.fillText("Table Tennis", 28, 44);
    ctx.fillText(`${this.leftScore} - ${this.rightScore}`, width * 0.5 - 24, 44);

    if (this.gameOver) {
      ctx.fillStyle = "rgba(2, 6, 23, 0.85)";
      ctx.fillRect(0, height * 0.35, width, 140);

      ctx.fillStyle = "#f8fafc";
      ctx.font = "700 32px ui-sans-serif, system-ui, sans-serif";
      const winner = this.leftScore > this.rightScore ? "You Win!" : "Opponent Wins";
      ctx.fillText(winner, width * 0.5 - ctx.measureText(winner).width * 0.5, height * 0.45);

      ctx.font = "500 18px ui-sans-serif, system-ui, sans-serif";
      const prompt = "Press Enter or Space to restart";
      ctx.fillText(prompt, width * 0.5 - ctx.measureText(prompt).width * 0.5, height * 0.55);
    }

    // On-screen control hint (bottom-right) — respect user preference and animate first-show
    const showPref = localStorage.getItem("retro-arcade.showHints");
    const hintsEnabled = showPref === null ? true : showPref === "true";
    const hintShown = localStorage.getItem("retro-arcade.hintShown") === "true";
    if (hintsEnabled && (!hintShown || this.hintTimer < 4)) {
      const hint = "W/S or ↑/↓ — Tap left to move — Enter/Space to restart";
      ctx.font = "400 14px ui-sans-serif, system-ui, sans-serif";
      const padding = 12;
      const textWidth = ctx.measureText(hint).width;
      const boxW = textWidth + padding * 2 + 40; // extra space for icons
      const boxH = 40;
      const boxX = Math.max(20, width - boxW - 20);
      const boxY = height - boxH - 18;

      // alpha fades out after hintTimer > 0 up to 4s
      const alpha = Math.max(0.15, 1 - Math.max(0, this.hintTimer) / 4);

      ctx.save();
      ctx.globalAlpha = alpha * 0.95;
      ctx.fillStyle = "rgba(2, 6, 23, 0.6)";
      ctx.fillRect(boxX, boxY, boxW, boxH);

      // draw simple key icons
      const iconX = boxX + 8;
      const iconY = boxY + 8;
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(iconX, iconY, 24, 24);
      ctx.fillRect(iconX + 30, iconY, 24, 24);
      ctx.fillStyle = "#f8fafc";
      ctx.font = "600 12px ui-sans-serif, system-ui, sans-serif";
      ctx.fillText("W", iconX + 6, iconY + 16);
      ctx.fillText("S", iconX + 36, iconY + 16);

      // text
      ctx.fillStyle = "#f8fafc";
      ctx.font = "400 14px ui-sans-serif, system-ui, sans-serif";
      ctx.fillText(hint, iconX + 64, boxY + 26);

      ctx.restore();
    }
  }

  destroy(): void {
    this.leftScore = 0;
    this.rightScore = 0;
    this.gameOver = false;
    if (this.musicPlaying) {
      this.soundManager.music.pause();
      this.soundManager.music.currentTime = 0;
      this.musicPlaying = false;
    }
  }

  private reset(context: GameContext): void {
    this.x = context.width * 0.5;
    this.y = context.height * 0.5;
    this.vx = 220 * (Math.random() > 0.5 ? 1 : -1);
    this.vy = 180 * (Math.random() > 0.5 ? 1 : -1);
    this.paddleY = context.height / 2 - 40;
    this.opponentY = context.height / 2 - 40;
    this.gameOver = false;
  }

  private collides(rect: { x: number; y: number; w: number; h: number }, cx: number, cy: number, radius: number): boolean {
    const closestX = Math.max(rect.x, Math.min(cx, rect.x + rect.w));
    const closestY = Math.max(rect.y, Math.min(cy, rect.y + rect.h));
    const dx = cx - closestX;
    const dy = cy - closestY;
    return dx * dx + dy * dy <= radius * radius;
  }

  private scorePoint(playerScored: boolean, context: GameContext): void {
    if (playerScored) {
      this.leftScore += 1;
      this.soundManager.play("cheer");
    } else {
      this.rightScore += 1;
      this.soundManager.play("boo");
    }

    if (this.leftScore >= MAX_SCORE || this.rightScore >= MAX_SCORE) {
      this.gameOver = true;
      if (this.musicPlaying) {
        this.soundManager.music.pause();
        this.musicPlaying = false;
      }
      if (this.leftScore >= MAX_SCORE) {
        this.soundManager.play("win");
      } else {
        this.soundManager.play("lose");
      }
      return;
    }

    this.reset(context);
  }
}
