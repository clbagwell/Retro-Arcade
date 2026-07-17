import type { Game } from "../engine/types";
import { DemoGame } from "../games/demo/DemoGame";
import { BirthdayCardGame } from "../games/birthday-card/BirthdayCardGame";
import { LifeReportGame } from "../games/life-report/LifeReportGame";
import { TableTennisGame } from "../games/table-tennis/TableTennisGame";

export interface ArcadeGameDefinition {
  id: string;
  title: string;
  description: string;
  accent: string;
  createGame: () => Game;
}

export function createGameRegistry(): ArcadeGameDefinition[] {
  return [
    {
      id: "demo",
      title: "Engine Demo",
      description: "The original canvas playground for testing the engine loop.",
      accent: "#22c55e",
      createGame: () => new DemoGame(),
    },
    {
      id: "birthday",
      title: "Birthday Card",
      description: "A festive generator experience that can grow into an interactive card builder.",
      accent: "#f59e0b",
      createGame: () => new BirthdayCardGame(),
    },
    {
      id: "life-report",
      title: "Life Report",
      description: "A narrative, data-driven experience for reflective storytelling.",
      accent: "#8b5cf6",
      createGame: () => new LifeReportGame(),
    },
    {
      id: "table-tennis",
      title: "Table Tennis",
      description: "A lightweight arcade-style pong experience built on the engine loop.",
      accent: "#06b6d4",
      createGame: () => new TableTennisGame(),
    },
  ];
}
