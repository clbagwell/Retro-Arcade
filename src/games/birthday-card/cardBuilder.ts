export type BirthdayCardTheme = "sunset" | "ocean" | "berry" | "mint";

export interface BirthdayCardState {
  recipient: string;
  message: string;
  theme: BirthdayCardTheme;
  sparkle: number;
}

export function createDefaultBirthdayCardState(): BirthdayCardState {
  return {
    recipient: "Friend",
    message: "Hope your day is filled with joy and sparkle!",
    theme: "sunset",
    sparkle: 6,
  };
}

export function normalizeBirthdayCardState(input: Partial<BirthdayCardState>): BirthdayCardState {
  const defaults = createDefaultBirthdayCardState();
  const recipient = (input.recipient ?? defaults.recipient).trim();
  const message = (input.message ?? defaults.message).trim();
  const theme = isBirthdayCardTheme(input.theme) ? input.theme : defaults.theme;
  const sparkle = clampNumber(input.sparkle ?? defaults.sparkle, 0, 10);

  return {
    recipient: recipient || defaults.recipient,
    message: message || defaults.message,
    theme,
    sparkle,
  };
}

export function getThemePalette(theme: BirthdayCardTheme) {
  switch (theme) {
    case "ocean":
      return { primary: "#38bdf8", secondary: "#0f766e", accent: "#f8fafc" };
    case "berry":
      return { primary: "#f472b6", secondary: "#7c3aed", accent: "#fff7ed" };
    case "mint":
      return { primary: "#34d399", secondary: "#047857", accent: "#f0fdf4" };
    case "sunset":
    default:
      return { primary: "#f59e0b", secondary: "#fb923c", accent: "#fff7ed" };
  }
}

function isBirthdayCardTheme(value: unknown): value is BirthdayCardTheme {
  return value === "sunset" || value === "ocean" || value === "berry" || value === "mint";
}

function clampNumber(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
