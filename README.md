# Retro-Arcade

A collection of retro arcade games built with TypeScript and a custom game engine.

## Features

- Custom game engine with rendering and game loop management
- Modular architecture for easy game additions
- Deployed on GitHub Pages

## Project Structure

```bash
src/
├── engine/       # Core game engine
├── games/        # Game implementations
├── styles.css    # Global styling
└── main.ts       # Entry point
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Games

- **DemoGame** - Sample implementation showcasing engine capabilities

## GitHub Pages Deployment

This project is configured to publish a static Vite build to GitHub Pages.

### Deployment flow

1. Run npm run build locally to generate the static site in the docs directory.
2. Commit and push the updated docs folder and any source changes to the main branch.
3. GitHub Pages serves the contents of docs at the published site URL.

### Important notes

- The Vite build output is written to the docs directory for GitHub Pages compatibility.
- A .nojekyll file is included in the docs folder so static assets are served correctly.
- If you change the app entry or asset paths, rebuild the project and confirm the generated docs output before pushing.

### How to verify the deployment

1. Confirm the latest commit containing the built docs output has been pushed to the main branch.
2. Open the published site URL in a browser.
3. Verify the page loads without console errors such as failed asset requests.
4. Check that the browser network tab shows the built assets loading from the published site path.
5. If the page still appears blank, confirm the latest commit has finished deploying and that Pages is serving the current branch content.

## Contributing

Contributions are welcome! Feel free to submit pull requests or open issues.

## Requirements

- Node.js 16+
- npm or yarn

## Tech Stack

- **Language**: TypeScript
- **Build Tool**: Vite
- **Deployment**: GitHub  Pages

## License

MIT
