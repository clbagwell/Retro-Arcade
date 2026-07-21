import { Engine } from "../engine/Engine";
import type { Game } from "../engine/types";
import { createGameRegistry, type ArcadeGameDefinition } from "./GameRegistry";

interface ArcadeShellOptions {
  parent: HTMLElement;
  initialGameId?: string;
}

export class ArcadeShell {
  private readonly parent: HTMLElement;
  private readonly engine: Engine;
  private readonly games: ArcadeGameDefinition[];
  private readonly panel: HTMLDivElement;
  private readonly buttons: HTMLButtonElement[] = [];
  private activeGameId: string;

  constructor({ parent, initialGameId = "demo" }: ArcadeShellOptions) {
    this.parent = parent;
    this.games = createGameRegistry();
    this.activeGameId = initialGameId;
    this.panel = document.createElement("div");
    this.panel.id = "arcade-shell";
    this.engine = new Engine({
      parent,
      game: this.createGame(initialGameId),
    });
    this.render();
  }

  start(): void {
    this.hideUI();
    this.engine.start();
  }

  private hideUI(): void {
    this.panel.classList.add("hidden");
  }

  private showUI(): void {
    this.panel.classList.remove("hidden");
  }

  private createGame(gameId: string): Game {
    const definition = this.games.find((game) => game.id === gameId) ?? this.games[0];
    return definition.createGame();
  }

  private render(): void {
    const title = document.createElement("div");
    title.className = "arcade-title";
    title.textContent = "Retro Arcade";

    const subtitle = document.createElement("div");
    subtitle.className = "arcade-subtitle";
    subtitle.textContent = "Select a module and launch it in the engine.";

    const menu = document.createElement("div");
    menu.className = "arcade-menu";

    for (const game of this.games) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "arcade-button";
      button.textContent = game.title;
      button.addEventListener("click", () => this.selectGame(game.id));
      menu.append(button);
      this.buttons.push(button);
    }

    // Settings: show/hide on-screen hints
    const settings = document.createElement("div");
    settings.className = "arcade-settings";
    const hintsBtn = document.createElement("button");
    hintsBtn.type = "button";
    hintsBtn.className = "arcade-settings-button";
    const current = localStorage.getItem("retro-arcade.showHints");
    const showHints = current === null ? "true" : current;
    hintsBtn.textContent = showHints === "true" ? "Hints: On" : "Hints: Off";
    hintsBtn.addEventListener("click", () => {
      const now = localStorage.getItem("retro-arcade.showHints");
      const enabled = now === null ? true : now === "true";
      const next = !enabled;
      localStorage.setItem("retro-arcade.showHints", String(next));
      hintsBtn.textContent = next ? "Hints: On" : "Hints: Off";
    });
    settings.append(hintsBtn);

    this.panel.append(title, subtitle, menu, settings);
    this.parent.append(this.panel);
    this.syncSelection();
  }

  private selectGame(gameId: string): void {
    this.activeGameId = gameId;
    this.showUI();
    this.engine.setGame(this.createGame(gameId));
    this.syncSelection();
  }

  private syncSelection(): void {
    this.buttons.forEach((button, index) => {
      const game = this.games[index];
      const isActive = game.id === this.activeGameId;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }
}
