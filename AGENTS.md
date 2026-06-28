# AGENTS.md

## Cursor Cloud specific instructions

This repository is a single-page **React + Vite** personal portfolio/CV website (`cv-website`). There is no backend — it is a static frontend served by Vite.

### Services / commands
- **Dev server**: `npm run dev` — serves on `http://localhost:5173/` with HMR. This is the primary way to develop and test.
- **Lint**: `npm run lint` (ESLint flat config in `eslint.config.js`). Note: `src/components/Lightbox.jsx` currently emits one pre-existing `react-hooks/exhaustive-deps` warning (0 errors) — this is expected, not introduced by your changes.
- **Build**: `npm run build` (outputs to `dist/`).
- **Preview production build**: `npm run preview`.

### Notes
- Node 20.19+ / 22.12+ is required by Vite 8 (the cloud VM ships Node 22, which works).
- Static assets (images, PDFs, `robots.txt`, `sitemap.xml`) live in `public/` and are served at the site root.
- Vite binds to `localhost` only by default; pass `--host` to `npm run dev` if you need to expose it on the network.
