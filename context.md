# Project context

This repository is a single-page **React + Vite** personal portfolio/CV website (`cv-website`). There is no backend — it is a static frontend served by Vite.

## Services / commands
- **Dev server**: `npm run dev` — serves on `http://localhost:5173/` with HMR. This is the primary way to develop and test.
- **Lint**: `npm run lint` (ESLint flat config in `eslint.config.js`; `--max-warnings 0`).
- **Test**: `npm test` — Vitest in jsdom (`vitest run`, verbose + JUnit `test-results.xml`). Each test’s purpose is listed in `TEST_REPORT.md` and posted to the GitHub Actions job summary on every CI run so failures show **which** test broke and **what** it was checking.
- **Build**: `npm run build` (outputs to `dist/`).
- **Preview production build**: `npm run preview`.
- **CI**: `.github/workflows/ci.yml` runs `npm ci`, `npm run lint`, `npm test`, and `npm run build` on every push to `main` and on every pull request. The check name to require on `main` is **`CI`**.

## Main branch guards (rule of thumb)

These cannot be turned on from a PR — they live in GitHub **Settings**. After merging this docs/workflow change, create a **branch ruleset** (repo owner):

**[Rulesets](https://github.com/ZakariaF1/cv-website/settings/rules)** → **New ruleset** → **New branch ruleset**

| Setting | Value | Why |
| ------- | ----- | --- |
| Ruleset name | `Protect main` | |
| Enforcement | Active | |
| Target branches | `main` | Trunk only |
| Require a pull request before merging | On, **required approvals = 0** | No direct commits to `main`. Solo repo: do **not** require a reviewer or you will block yourself |
| Require status checks to pass | On, required check **`CI`** | Lint + tests + build must be green |
| Require branches to be up to date | Off (optional later) | Avoids extra rebase friction on a solo repo |
| Block force pushes | On | No rewriting trunk |
| Block deletions | On | Cannot delete `main` |
| Allow bypass | Off except a break-glass admin bypass if you want an emergency hatch | Charter: don't merge around a red build |

Until that ruleset is Active, `main` is only protected by habit. CI still *runs* on PRs; it does not *block* merge by itself.

Vercel preview/production is separate CD. To stop production deploys when CI is red, also require the **`CI`** check in Vercel Git settings (optional).

## Notes
- Node 20.19+ / 22.12+ is required by Vite 8 (the cloud VM ships Node 22, which works).
- Static assets (images, PDFs, `robots.txt`, `sitemap.xml`) live in `public/` and are served at the site root.
- Portfolio copy (projects, experience, skills, certifications, languages, profile, nav) lives in `src/data/` so components stay presentational.
- Vite binds to `localhost` only by default; pass `--host` to `npm run dev` if you need to expose it on the network.

## Engineering slices (charter, no design changes)

Do **not** change CSS, px values, breakpoints, colors, spacing, or layout. The current visual design stays as-is. Apply the agent charter incrementally, one PR at a time, and keep CI green between slices.

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
| 9 | Document main-branch guards and rename the required check to `CI` | this PR |
