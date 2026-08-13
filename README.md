# Zakaria Ahmad — Portfolio

Personal portfolio/CV site: a static React + Vite frontend (no backend).

## Commands

Requires **Node 22** (or Node 20.19+). From the repo root:

```bash
npm install
npm run dev
```

Dev server: `http://localhost:5173/`

| Command | What it does |
| ------- | ------------ |
| `npm install` | Install dependencies |
| `npm run dev` | Vite dev server with HMR on port 5173. Add `-- --host` to listen on the network |
| `npm run lint` | ESLint across the repo (`--max-warnings 0`) |
| `npm test` | Vitest once (characterizing unit/component tests) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |

**Typical workflow**

```bash
npm install
npm run dev          # develop
npm test             # characterizing tests
npm run lint         # before a PR
npm run build        # confirm production build
```

CI (GitHub Actions) runs `npm ci`, `npm run lint`, `npm test`, and `npm run build` on every pull request and every push to `main`.

## Project

Single-page portfolio with an adaptive two-panel layout. Static assets (images, PDFs, `robots.txt`, `sitemap.xml`) live in `public/` and are served from the site root.

Live site: [zakariaahmad.site](https://zakariaahmad.site)
