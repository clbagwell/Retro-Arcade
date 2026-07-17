import "./styles.css";
import { ArcadeShell } from "./arcade/ArcadeShell";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Missing #app mount node.");
}

try {
  console.log("🎮 Initializing Retro-Arcade shell...");

  const shell = new ArcadeShell({ parent: app, initialGameId: "demo" });
  shell.start();

  console.log("✅ Arcade shell initialized successfully");
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.error("❌ Failed to start arcade shell:", errorMessage);

  app.innerHTML = `
    <div style="padding: 20px; color: red; font-family: monospace;">
      <h2>Error Starting Arcade</h2>
      <p>${errorMessage}</p>
      <small>Check the browser console for more details.</small>
    </div>
  `;
}
