import "./styles.css";
import { Engine } from "./engine/Engine";
import { DemoGame } from "./games/demo/DemoGame";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Missing #app mount node.");
}

try {
  console.log("🎮 Initializing Retro-Arcade engine...");
  
  const engine = new Engine({
    parent: app,
    game: new DemoGame(),
  });

  console.log("✅ Engine initialized successfully");
  console.log("🚀 Starting engine...");
  
  engine.start();
  
  console.log("✅ Engine running");
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.error("❌ Failed to start engine:", errorMessage);
  
  app.innerHTML = `
    <div style="padding: 20px; color: red; font-family: monospace;">
      <h2>Error Starting Game</h2>
      <p>${errorMessage}</p>
      <small>Check the browser console for more details.</small>
    </div>
  `;
}
