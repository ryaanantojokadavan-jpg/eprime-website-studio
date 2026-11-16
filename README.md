# E-PRIME Website Studio

**Building what comes next.**

E-PRIME Website Studio is an open-source website-builder starter. Describe a website, generate a starter layout, customize its copy and accent colour, preview it, and export a standalone HTML file.

## Current status

**Early prototype — v0.1.0.** The prompt flow currently uses a local template engine. It does not yet call an AI model, save projects to an account, or publish generated sites to hosting.

## Features

- Prompt-to-starter-layout experience
- Live preview in desktop and mobile frames
- Editable brand name, headline, description, and accent colour
- HTML source view and copy action
- Export generated page as a standalone HTML file
- Responsive E-PRIME dark interface

## Run locally

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

The production output is written to `dist/`.

## Roadmap

- [ ] Connect an AI provider through a server-side API (never expose API keys in browser code)
- [ ] Add more page sections and templates
- [ ] Drag-and-drop section editing
- [ ] Project save/load
- [ ] Export multi-page websites
- [ ] Add accessibility checks and automated tests
- [ ] Add deployment integrations

## Security

Do not put API keys, passwords, tokens, or private customer data in this repository. Any future AI integration must keep provider secrets on a trusted server and validate user input.

## Contributing

Issues and pull requests are welcome. Please describe the change, include reproduction steps for bugs, and avoid committing secrets or generated build folders.

## License

MIT — see [LICENSE](LICENSE).

---

© 2026 E-PRIME GROUP. ONE TEAM. ONE DREAM.
