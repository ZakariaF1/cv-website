# Project context

This repository is a single-page **React + Vite** personal portfolio/CV website (`cv-website`). There is no backend — it is a static frontend served by Vite.

**Commands:** see [`README.md`](README.md) (only command list — do not duplicate here).

## Notes

- Node 20.19+ / 22.12+ is required by Vite 8 (the cloud VM ships Node 22, which works).
- Static assets (images, PDFs, `robots.txt`, `sitemap.xml`) live in `public/` and are served at the site root.
- Portfolio copy (projects, experience, skills, certifications, languages, profile, nav) lives in `src/data/` so components stay presentational.
- Vite binds to `localhost` only by default; pass `--host` to `npm run dev` if you need to expose it on the network.
- RUM is Cloudflare Web Analytics via **Automatic** injection while the domain is proxied (no manual `beacon.min.js` in `index.html`). Disable any leftover JS-snippet Web Analytics site in the Cloudflare dashboard so visits are not double-counted.
- Photos stay in `public/` — do not re-upload them to Cloudflare. Architecture / CDN topology: [`docs/ARD.md`](docs/ARD.md). Setup steps: [`README.md`](README.md) — Domain / CDN.
- Availability ops: [`RUNBOOK.md`](RUNBOOK.md). Measured quality scenarios: [`QUALITY_ATTRIBUTES.md`](QUALITY_ATTRIBUTES.md).
- Engineering standards: [`docs/engineering-charter.md`](docs/engineering-charter.md). Always-on agent brief: [`AGENTS.md`](AGENTS.md).

## Engineering slices (no design changes)

Do **not** change CSS, px values, breakpoints, colors, spacing, or layout. The current visual design stays as-is. Apply the charter incrementally, one PR at a time, and keep CI green between slices.

| Slice | Change | Status |
| ----- | ------ | ------ |
| 1 | GitHub Actions CI: `npm ci` → lint → build | done |
| 2 | README commands-first (`dev`, `lint`, `build`, `preview`; add `test` once it exists) | done |
| 3 | Vitest + characterizing tests; add `npm test` to CI | done |
| 4 | Extract content data (projects, skills, about) out of JSX into data modules | done |
| 5 | Non-visual presentation cleanup (e.g. Lightbox hook deps) with tests; markup/classes unchanged | done |
| 6 | Extract remaining identity/contact/nav copy into `src/data/profile.js` | done |
| 7 | Bump GitHub Actions (`checkout` / `setup-node`) off deprecated Node 20 | done |
| 8 | Publish a per-test Vitest report (name + what it does) on every CI run | done |
| 9 | Lean modifiability: profile URLs, SEO lock, projectMedia rename | done |
| 10 | Scalability docs: RUNBOOK spike/purge checklist locked to `vercel.json` headers | done |
| 11 | Lesson 8 quality-attribute tactics (course scenarios + runbook; not re-copied into reusable charter) | done |
| 12 | Docs layout per charter: short `AGENTS.md`, `docs/engineering-charter.md`, ARD, dedupe commands | this PR |
