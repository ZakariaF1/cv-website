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
| `npm test` | Vitest once (verbose + JUnit). See [TEST_REPORT.md](TEST_REPORT.md) for what each test checks |
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

## Domain / CDN

Registrar stays **Namecheap**. Hosting stays **Vercel**. **Cloudflare** is DNS + CDN (do not transfer or buy the domain). Photos stay in `public/` and keep paths like `/personal-photo.avif`.

1. Cloudflare → **Add a site** → `zakariaahmad.site` → Free plan. Do **not** click “I updated my nameservers” yet.
2. Cloudflare → **DNS → Records**. Keep or add:

   | Type | Name | Target | Proxy (first pass) |
   | --- | --- | --- | --- |
   | A | `@` | `76.76.21.21` (or the IP on the Vercel domain card) | DNS only (grey cloud) |
   | CNAME | `www` | `cname.vercel-dns.com` (or the CNAME on the Vercel domain card) | DNS only (grey cloud) |

   Confirm in **Vercel → Project → Settings → Domains** that `zakariaahmad.site` and `www` are added.
3. Cloudflare overview copies two nameservers (e.g. `josephine.ns.cloudflare.com`). Namecheap → **Domain List → Manage → Nameservers → Custom DNS** → paste those two. Save. Wait until [dnschecker.org](https://dnschecker.org) shows Cloudflare NS for `zakariaahmad.site`.
4. When the site loads over HTTPS on Vercel’s cert, Cloudflare → **SSL/TLS** → **Full (strict)** (never Flexible — that causes a redirect loop). Then turn the A and CNAME records to **Proxied** (orange cloud).
5. Optional: **Caching → Cache Rules** — match `*.avif`, `*.png`, `*.webp`, `*.svg`, `*.webm`, `*.pdf` and cache at the edge. Origin already sends Cache-Control via `vercel.json`.
6. Confirm CDN: open `/personal-photo.avif`, reload, Network tab → `server: cloudflare` and `cf-cache-status: HIT`.

## Project

Single-page portfolio with an adaptive two-panel layout. Static assets (images, PDFs, `robots.txt`, `sitemap.xml`) live in `public/` and are served from the site root.

Live site: [zakariaahmad.site](https://zakariaahmad.site)
