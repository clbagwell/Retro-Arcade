import type { Game, GameContext } from "../../engine/types";
import {
  createDefaultBirthdayCardState,
  getThemePalette,
  normalizeBirthdayCardState,
  type BirthdayCardState,
} from "./cardBuilder";

export class BirthdayCardGame implements Game {
  private elapsed = 0;
  private state: BirthdayCardState = createDefaultBirthdayCardState();
  private lastContext: GameContext | null = null;
  private readonly controls: HTMLDivElement;
  private readonly inputRecipient: HTMLInputElement;
  private readonly inputMessage: HTMLTextAreaElement;
  private readonly selectTheme: HTMLSelectElement;
  private readonly inputSparkle: HTMLInputElement;
  private readonly previewLabel: HTMLDivElement;

  constructor() {
    this.controls = document.createElement("div");
    this.inputRecipient = document.createElement("input");
    this.inputMessage = document.createElement("textarea");
    this.selectTheme = document.createElement("select");
    this.inputSparkle = document.createElement("input");
    this.previewLabel = document.createElement("div");
  }

  init(context: GameContext): void {
    this.mountUI();
    this.resize(context);
    this.syncFromInputs();
  }

  resize(context: GameContext): void {
    this.lastContext = context;
    this.render(context);
  }

  update(deltaSeconds: number, context: GameContext): void {
    this.elapsed += deltaSeconds;
    this.lastContext = context;
    this.render(context);
  }

  render(context: GameContext): void {
    const { ctx, width, height } = context;
    ctx.clearRect(0, 0, width, height);
    const palette = getThemePalette(this.state.theme);

    const background = ctx.createLinearGradient(0, 0, width, height);
    background.addColorStop(0, palette.secondary);
    background.addColorStop(1, palette.primary);
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);

    const card = ctx.createLinearGradient(64, 64, width - 64, height - 64);
    card.addColorStop(0, "#ffffff");
    card.addColorStop(1, palette.accent);
    ctx.fillStyle = card;

    const radius = 28;
    ctx.beginPath();
    ctx.moveTo(64 + radius, 64);
    ctx.lineTo(width - 64 - radius, 64);
    ctx.quadraticCurveTo(width - 64, 64, width - 64, 64 + radius);
    ctx.lineTo(width - 64, height - 64 - radius);
    ctx.quadraticCurveTo(width - 64, height - 64, width - 64 - radius, height - 64);
    ctx.lineTo(64 + radius, height - 64);
    ctx.quadraticCurveTo(64, height - 64, 64, height - 64 - radius);
    ctx.lineTo(64, 64 + radius);
    ctx.quadraticCurveTo(64, 64, 64 + radius, 64);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#111827";
    ctx.font = "700 36px ui-sans-serif, system-ui, sans-serif";
    ctx.fillText(`Happy Birthday, ${this.state.recipient}!`, 96, 138);

    ctx.font = "500 22px ui-sans-serif, system-ui, sans-serif";
    ctx.fillText(this.state.message, 96, 190, width - 150);

    ctx.fillStyle = palette.primary;
    ctx.font = "600 16px ui-sans-serif, system-ui, sans-serif";
    ctx.fillText(`Sparkle level: ${this.state.sparkle}/10`, 96, 252);

    for (let index = 0; index < this.state.sparkle; index += 1) {
      const x = 108 + (index % 5) * 70 + Math.sin(this.elapsed * 2 + index) * 10;
      const y = 290 + Math.floor(index / 5) * 40 + Math.cos(this.elapsed * 1.5 + index) * 8;
      ctx.fillStyle = index % 2 === 0 ? palette.primary : "#fef3c7";
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = "#374151";
    ctx.font = "500 14px ui-sans-serif, system-ui, sans-serif";
    ctx.fillText("Edit the fields on the left to redesign your card.", 96, height - 70);
  }

  destroy(): void {
    this.controls.remove();
    this.elapsed = 0;
    this.lastContext = null;
  }

  private mountUI(): void {
    this.controls.className = "birthday-card-controls";
    this.controls.innerHTML = "";

    const title = document.createElement("h2");
    title.textContent = "Birthday Card Builder";

    const recipientRow = this.createFieldRow("Recipient", this.inputRecipient, "text");
    this.inputRecipient.value = this.state.recipient;
    this.inputRecipient.placeholder = "Who is this for?";
    this.inputRecipient.addEventListener("input", () => this.syncFromInputs());

    const messageRow = this.createFieldRow("Message", this.inputMessage, "textarea");
    this.inputMessage.value = this.state.message;
    this.inputMessage.placeholder = "Write a warm message";
    this.inputMessage.addEventListener("input", () => this.syncFromInputs());

    const themeRow = this.createFieldRow("Theme", this.selectTheme, "select");
    this.selectTheme.innerHTML = `
      <option value="sunset">Sunset</option>
      <option value="ocean">Ocean</option>
      <option value="berry">Berry</option>
      <option value="mint">Mint</option>
    `;
    this.selectTheme.value = this.state.theme;
    this.selectTheme.addEventListener("change", () => this.syncFromInputs());

    const sparkleRow = this.createFieldRow("Sparkle", this.inputSparkle, "range");
    this.inputSparkle.type = "range";
    this.inputSparkle.min = "0";
    this.inputSparkle.max = "10";
    this.inputSparkle.value = String(this.state.sparkle);
    this.inputSparkle.addEventListener("input", () => this.syncFromInputs());

    this.previewLabel.className = "birthday-card-preview";
    this.previewLabel.textContent = `Preview for ${this.state.recipient}`;

    this.controls.append(title, recipientRow, messageRow, themeRow, sparkleRow, this.previewLabel);

    const app = document.getElementById("app");
    if (app) {
      this.controls.remove();
      app.append(this.controls);
    }
  }

  private createFieldRow(
    labelText: string,
    input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
    type: string,
  ): HTMLDivElement {
    const row = document.createElement("div");
    row.className = "birthday-card-field";

    const label = document.createElement("label");
    label.textContent = labelText;

    if (type === "textarea") {
      input.className = "birthday-card-textarea";
    } else if (type === "select") {
      input.className = "birthday-card-select";
    } else {
      input.className = "birthday-card-input";
    }

    row.append(label, input);
    return row;
  }

  private syncFromInputs(): void {
    this.state = normalizeBirthdayCardState({
      recipient: this.inputRecipient.value,
      message: this.inputMessage.value,
      theme: this.selectTheme.value as BirthdayCardState["theme"],
      sparkle: Number(this.inputSparkle.value),
    });
    this.previewLabel.textContent = `Preview for ${this.state.recipient}`;

    if (this.lastContext) {
      this.render(this.lastContext);
    }
  }
}
