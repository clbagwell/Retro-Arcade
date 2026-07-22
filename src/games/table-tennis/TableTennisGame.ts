import type { Game, GameContext } from "../../engine/types";

const MAX_SCORE = 5;
const MENU_BUTTONS = ["easy", "medium", "hard"] as const;

type Difficulty = (typeof MENU_BUTTONS)[number];

interface DifficultyConfig {
  label: string;
  aiSpeed: number;
  reactionDelay: number;
  aimError: number;
  returnSpeed: number;
  ballSpeed: number;
}

const DIFFICULTY_CONFIG: Record<Difficulty, DifficultyConfig> = {
  easy: { label: "Easy", aiSpeed: 180, reactionDelay: 0.22, aimError: 42, returnSpeed: 120, ballSpeed: 0.92 },
  medium: { label: "Medium", aiSpeed: 260, reactionDelay: 0.12, aimError: 20, returnSpeed: 180, ballSpeed: 1 },
  hard: { label: "Hard", aiSpeed: 340, reactionDelay: 0.05, aimError: 8, returnSpeed: 240, ballSpeed: 1.08 },
};

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
  // Fixed game dimensions
  private readonly gameWidth = 800;
  private readonly gameHeight = 500;

  private difficulty: Difficulty | null = null;
  private x = 160;
  private y = 120;
  private vx = 220;
  private vy = 180;
  private paddleY = 0;
  private opponentY = 0;
  private opponentTargetY = 0;
  private opponentTimer = 0;
  private leftScore = 0;
  private rightScore = 0;
  private gameOver = false;
  private hintTimer = 0;
  private soundManager: SoundManager = createSoundManager();
  private musicPlaying = false;

  init(_context: GameContext): void {
    this.showDifficultyMenu();
    try {
      this.soundManager.music.play().catch(() => {});
      this.musicPlaying = true;
    } catch {
      // Music playback may fail due to autoplay policy
    }
  }

  resize(_context: GameContext): void {
    if (this.difficulty !== null) {
      this.reset();
    }
  }

  update(deltaSeconds: number, context: GameContext): void {
    const { width: screenWidth, height: screenHeight, input } = context;

    // Calculate scale from screen to game coordinates
    const scaleX = screenWidth / this.gameWidth;
    const scaleY = screenHeight / this.gameHeight;
    const scale = Math.min(scaleX, scaleY);
    const offsetX = (screenWidth - this.gameWidth * scale) / 2;
    const offsetY = (screenHeight - this.gameHeight * scale) / 2;

    if (this.difficulty === null) {
      if (!input) {
        return;
      }

      if (input.anyKeyDown("Digit1", "Numpad1")) {
        this.startGame("easy");
        return;
      }

      if (input.anyKeyDown("Digit2", "Numpad2", "Enter", "Space")) {
        this.startGame("medium");
        return;
      }

      if (input.anyKeyDown("Digit3", "Numpad3")) {
        this.startGame("hard");
        return;
      }

      if (input.isPointerDown()) {
        const pointerX = (input.pointer.x - offsetX) / scale;
        const pointerY = (input.pointer.y - offsetY) / scale;
        const buttonLeft = 200;
        const buttonWidth = 400;
        const buttonHeight = 52;
        const buttonGap = 18;
        const buttonTop = 210;

        for (let i = 0; i < MENU_BUTTONS.length; i++) {
          const top = buttonTop + i * (buttonHeight + buttonGap);
          if (pointerX >= buttonLeft && pointerX <= buttonLeft + buttonWidth && pointerY >= top && pointerY <= top + buttonHeight) {
            this.startGame(MENU_BUTTONS[i]);
            return;
          }
        }
      }

      return;
    }

    if (this.gameOver) {
      if (input?.anyKeyDown("Enter", "Space")) {
        this.showDifficultyMenu();
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

      // Transform pointer from screen space to game space
      const pointerX = (input.pointer.x - offsetX) / scale;
      const pointerY = (input.pointer.y - offsetY) / scale;
      if (input.isPointerDown() && pointerX < this.gameWidth * 0.5) {
        this.paddleY = pointerY - 40;
      }

      const pad = input.getPrimaryGamepad();
      if (pad && pad.axes.length > 1) {
        this.paddleY += pad.axes[1] * moveAmount;
      }
    }

    this.paddleY = Math.min(Math.max(this.paddleY, 24), this.gameHeight - 104);

    const config = DIFFICULTY_CONFIG[this.difficulty];
    const centerTarget = this.gameHeight / 2 - 40;
    if (this.vx > 0) {
      if (this.opponentTimer <= 0) {
        const aimOffset = (Math.random() * 2 - 1) * config.aimError;
        this.opponentTargetY = Math.min(Math.max(this.y - 40 + aimOffset, 24), this.gameHeight - 104);
        this.opponentTimer = config.reactionDelay;
      }
    } else {
      this.opponentTargetY = centerTarget;
      this.opponentTimer = 0;
    }

    this.opponentTimer = Math.max(0, this.opponentTimer - deltaSeconds);
    const opponentSpeed = this.vx > 0 ? config.aiSpeed : config.returnSpeed;
    const opponentDelta = this.opponentTargetY - this.opponentY;
    const opponentStep = opponentSpeed * deltaSeconds;
    if (Math.abs(opponentDelta) <= opponentStep) {
      this.opponentY = this.opponentTargetY;
    } else {
      this.opponentY += Math.sign(opponentDelta) * opponentStep;
    }
    this.opponentY = Math.min(Math.max(this.opponentY, 24), this.gameHeight - 104);

    this.x += this.vx * deltaSeconds;
    this.y += this.vy * deltaSeconds;

    if (this.y <= 24 || this.y >= this.gameHeight - 24) {
      this.vy *= -1;
      this.y = Math.min(Math.max(this.y, 24), this.gameHeight - 24);
    }

    const leftPaddleRect = { x: 24, y: this.paddleY, w: 12, h: 80 };
    const rightPaddleRect = { x: this.gameWidth - 48, y: this.opponentY, w: 12, h: 80 };

    if (this.collides(leftPaddleRect, this.x, this.y, 14)) {
      this.vx = Math.abs(this.vx) * 1.05;
      this.x = leftPaddleRect.x + leftPaddleRect.w + 14;
      // Calculate impact point on paddle (normalized -1 to 1, center is 0)
      const impactNormal = (this.y - (this.paddleY + 40)) / 40;
      this.vy = impactNormal * 400;
      this.soundManager.play("hit");
    }

    if (this.collides(rightPaddleRect, this.x, this.y, 14)) {
      this.vx = -Math.abs(this.vx) * 1.05;
      this.x = rightPaddleRect.x - 14;
      // Calculate impact point on paddle (normalized -1 to 1, center is 0)
      const impactNormal = (this.y - (this.opponentY + 40)) / 40;
      this.vy = impactNormal * 400;
      this.soundManager.play("hit");
    }

    if (this.x <= 0) {
      this.scorePoint(false);
    }

    if (this.x >= this.gameWidth) {
      this.scorePoint(true);
    }
  }

  render({ ctx, width, height }: GameContext): void {
    // Calculate scale to fit 800x500 game into screen
    const scaleX = width / this.gameWidth;
    const scaleY = height / this.gameHeight;
    const scale = Math.min(scaleX, scaleY);
    const offsetX = (width - this.gameWidth * scale) / 2;
    const offsetY = (height - this.gameHeight * scale) / 2;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#020617";
    ctx.fillRect(0, 0, width, height);

    if (this.difficulty === null) {
      this.renderMenu(ctx);
      return;
    }

    // Apply scaling transform
    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.scale(scale, scale);

    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2;
    ctx.strokeRect(16, 16, this.gameWidth - 32, this.gameHeight - 32);

    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(24, this.paddleY, 12, 80);
    ctx.fillRect(this.gameWidth - 48, this.opponentY, 12, 80);

    ctx.fillStyle = "#fbbf24";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 14, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#e2e8f0";
    ctx.font = "600 20px ui-sans-serif, system-ui, sans-serif";
    ctx.fillText("Table Tennis", 28, 44);
    ctx.fillText(`${this.leftScore} - ${this.rightScore}`, this.gameWidth * 0.5 - 24, 44);

    if (this.gameOver) {
      ctx.fillStyle = "rgba(2, 6, 23, 0.85)";
      ctx.fillRect(0, this.gameHeight * 0.35, this.gameWidth, 140);

      ctx.fillStyle = "#f8fafc";
      ctx.font = "700 32px ui-sans-serif, system-ui, sans-serif";
      const winner = this.leftScore > this.rightScore ? "You Win!" : "Opponent Wins";
      ctx.fillText(winner, this.gameWidth * 0.5 - ctx.measureText(winner).width * 0.5, this.gameHeight * 0.45);

      ctx.font = "500 18px ui-sans-serif, system-ui, sans-serif";
      const prompt = "Press Enter or Space to choose again";
      ctx.fillText(prompt, this.gameWidth * 0.5 - ctx.measureText(prompt).width * 0.5, this.gameHeight * 0.55);
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
      const boxX = Math.max(20, this.gameWidth - boxW - 20);
      const boxY = this.gameHeight - boxH - 18;

      // alpha fades out after hintTimer > 0 up to 4s
      const alpha = Math.max(0.15, 1 - Math.max(0, this.hintTimer) / 4);

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
      ctx.globalAlpha = 1;
    }

    ctx.restore();
  }

  destroy(): void {
    this.leftScore = 0;
    this.rightScore = 0;
    this.gameOver = false;
    this.difficulty = null;
    if (this.musicPlaying) {
      this.soundManager.music.pause();
      this.soundManager.music.currentTime = 0;
      this.musicPlaying = false;
    }
  }

  private reset(): void {
    const config = this.difficulty ? DIFFICULTY_CONFIG[this.difficulty] : DIFFICULTY_CONFIG.medium;
    this.x = this.gameWidth * 0.5;
    this.y = this.gameHeight * 0.5;
    this.vx = 220 * config.ballSpeed * (Math.random() > 0.5 ? 1 : -1);
    this.vy = 180 * config.ballSpeed * (Math.random() > 0.5 ? 1 : -1);
    this.paddleY = this.gameHeight / 2 - 40;
    this.opponentY = this.gameHeight / 2 - 40;
    this.opponentTargetY = this.opponentY;
    this.opponentTimer = 0;
    this.gameOver = false;
  }

  private showDifficultyMenu(): void {
    this.difficulty = null;
    this.leftScore = 0;
    this.rightScore = 0;
    this.gameOver = false;
    this.hintTimer = 0;
    this.opponentTimer = 0;
  }

  private startGame(difficulty: Difficulty): void {
    this.difficulty = difficulty;
    this.leftScore = 0;
    this.rightScore = 0;
    this.gameOver = false;
    this.hintTimer = 0;
    this.reset();
  }

  private renderMenu(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.fillStyle = "#e2e8f0";
    ctx.textAlign = "center";

    ctx.font = "700 34px ui-sans-serif, system-ui, sans-serif";
    ctx.fillText("Table Tennis", this.gameWidth * 0.5, 118);

    ctx.font = "500 18px ui-sans-serif, system-ui, sans-serif";
    ctx.fillStyle = "#cbd5e1";
    ctx.fillText("Choose your difficulty", this.gameWidth * 0.5, 152);

    const buttonLeft = 200;
    const buttonWidth = 400;
    const buttonHeight = 52;
    const buttonGap = 18;
    const startY = 210;

    for (let i = 0; i < MENU_BUTTONS.length; i++) {
      const difficulty = MENU_BUTTONS[i];
      const config = DIFFICULTY_CONFIG[difficulty];
      const top = startY + i * (buttonHeight + buttonGap);
      const isPrimary = difficulty === "medium";

      ctx.fillStyle = isPrimary ? "rgba(56, 189, 248, 0.18)" : "rgba(15, 23, 42, 0.82)";
      ctx.fillRect(buttonLeft, top, buttonWidth, buttonHeight);
      ctx.strokeStyle = isPrimary ? "#38bdf8" : "rgba(148, 163, 184, 0.35)";
      ctx.lineWidth = 2;
      ctx.strokeRect(buttonLeft, top, buttonWidth, buttonHeight);

      ctx.fillStyle = "#f8fafc";
      ctx.font = "700 20px ui-sans-serif, system-ui, sans-serif";
      ctx.fillText(config.label, this.gameWidth * 0.5, top + 23);

      ctx.font = "400 13px ui-sans-serif, system-ui, sans-serif";
      ctx.fillStyle = "#94a3b8";
      const detail =
        difficulty === "easy"
          ? "Slower opponent and easier returns"
          : difficulty === "medium"
            ? "Balanced pacing"
            : "Faster opponent and tighter defense";
      ctx.fillText(detail, this.gameWidth * 0.5, top + 40);
    }

    ctx.font = "400 15px ui-sans-serif, system-ui, sans-serif";
    ctx.fillStyle = "#cbd5e1";
    ctx.fillText("Press 1 / 2 / 3, or tap a button", this.gameWidth * 0.5, 410);
    ctx.fillText("Easy, Medium, Hard", this.gameWidth * 0.5, 436);
    ctx.restore();
  }

  private collides(rect: { x: number; y: number; w: number; h: number }, cx: number, cy: number, radius: number): boolean {
    const closestX = Math.max(rect.x, Math.min(cx, rect.x + rect.w));
    const closestY = Math.max(rect.y, Math.min(cy, rect.y + rect.h));
    const dx = cx - closestX;
    const dy = cy - closestY;
    return dx * dx + dy * dy <= radius * radius;
  }

  private scorePoint(playerScored: boolean): void {
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

    this.reset();
  }
}
