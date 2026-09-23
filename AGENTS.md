# cv-website — agent brief

Short, always-on context for this repo. Deep engineering standards live in [`docs/engineering-charter.md`](docs/engineering-charter.md) (read that when architecture, DDD, DevOps, UX, or DoD apply). Do not duplicate the charter here.

## What this is

Static **React + Vite** personal portfolio (`zakariaahmad.site`). No backend. Origin: **Vercel**. Edge/DNS: **Cloudflare**. Registrar: **Namecheap**.

## Commands

Single command list: [`README.md`](README.md) (top section). Prefer linking there — do not copy the table into other docs.

## Design freeze

Do **not** change CSS, px values, breakpoints, colors, spacing, or layout unless the user explicitly asks for a visual change.

## Structure (right-size)

This is a small presentational SPA. Content lives in `src/data/`; components stay thin. Do **not** scaffold empty `domain/` / `application/` / `infrastructure/` trees.

## Doc ownership

| Doc | Owns |
| --- | ---- |
| [`README.md`](README.md) | Commands, how to run, CDN setup overview |
| [`context.md`](context.md) | Env notes, engineering slice tracker |
| [`docs/engineering-charter.md`](docs/engineering-charter.md) | Shared engineering standards |
| [`docs/ARD.md`](docs/ARD.md) | Architecture — topology, deployment, security, COGS |
| [`RUNBOOK.md`](RUNBOOK.md) | Availability ops: detect → recover → prevent |
| [`QUALITY_ATTRIBUTES.md`](QUALITY_ATTRIBUTES.md) | Lesson 8 measured stimulus–response scenarios |
| [`TEST_REPORT.md`](TEST_REPORT.md) | What each Vitest checks |

If a fact appears in two places, delete one copy and leave a link (charter rule).

## Working rules

1. Follow the charter’s refactor mode: characterize with tests, change incrementally, keep CI green.
2. When architecture, deployment, or external dependencies change, update the ARD in the same change.
3. Course quality-attribute work stays in `QUALITY_ATTRIBUTES.md` / `RUNBOOK.md` — not re-copied into this brief or the reusable charter.
