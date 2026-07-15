import "./styles.css";
import { Engine } from "./engine/Engine";
import { DemoGame } from "./games/demo/DemoGame";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Missing #app mount node.");
}

const engine = new Engine({
  parent: app,
  game: new DemoGame(),
});

engine.start();
