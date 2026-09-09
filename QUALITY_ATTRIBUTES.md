# Quality attributes — stimulus–response scenarios

Lesson 8 (Skillab / Adrian Popescu): *Atributele unui sistem și tactici de îmbunătățire*.

Filled for **zakariaahmad.site** (static React + Vite → Vercel → Cloudflare). Scenarios use the lesson’s six fields. **Measures below use real baselines captured 8–9 Sep 2026** (and Search Console last 3 months).

## How to write a scenario (method)

| Field (EN) | Field (RO) | Ask yourself |
| ---------- | ---------- | ------------ |
| **Source** | Sursa stimulului | Who/what starts it? |
| **Stimulus** | Stimulul | What event happens? |
| **Environment** | Mediul | Normal / mobile / after deploy / spike? |
| **Artifact** | Artefactul | Which part of *this* system responds? |
| **Response** | Răspunsul | What does the system (or operator) do? |
| **Measure** | Măsurarea | How do you verify? Prefer numbers from tools you have. |

---

## Measured baseline (real data)

Sources: Cloudflare **Overview** (24h), **HTTP Traffic** (30d), **Web Analytics** (RUM), Google **Search Console** (3 months), PageSpeed lab (your earlier run), live edge check (this agent), production `npm run build`, Cloudflare CSV export `data_cached_*.csv` (hourly **Data Cached** bytes).

### Cloudflare zone / CDN (edge HTTP — not RUM)

| Window | Metric | Value |
| ------ | ------ | ----- |
| Last **24 hours** (8–9 Sep) | Unique visitors | **101** |
| 24h | Total requests | **470** |
| 24h | Percent cached | **29.48%** |
| 24h | Total data served | **6 MB** |
| 24h | Data cached | **2 MB** (CSV sum of hourly cached bytes ≈ **1.70 MB** / 1 699 389 B) |
| Previous **30 days** | Total requests through Cloudflare | **5.53k** |
| 30d | Cached requests | **176** |
| 30d | Uncached requests | **5.35k** (~**3.2%** of requests cached) |
| Live check (agent) | `/personal-photo.avif` | `server: cloudflare`, `cache-control: max-age=2592000`, **`cf-cache-status: HIT`** |

**How to read this:** Overview/HTTP Traffic count **all** edge requests (HTML, bots, favicon, JS). HTML is often `DYNAMIC` / uncached, so **~3% request cache** over 30d is expected. Media with long `Cache-Control` still shows **HIT** (photo check above). Do not treat “29% / 3% cached” as “CDN broken.”

### Cloudflare Web Analytics (browser RUM / Core Web Vitals)

| Metric | Value |
| ------ | ----- |
| Visits / page views / LCP / INP / CLS | **Not enough data** (dashboard empty: 0 visits, 0 page views, vitals blank) |

**Why (historical):** Zone Overview showed traffic while Web Analytics RUM was empty because visits were split / wrong property. The site now uses **Automatic** injection only (manual snippet removed from `index.html`). Disable the old JS-snippet Web Analytics site in Cloudflare so Core Web Vitals fill on the Automatic property.

### Lab performance (PageSpeed Insights — mobile, your run)

| Metric | Value |
| ------ | ----- |
| Performance score | **90** |
| FCP | **2.7 s** |
| LCP | **3.1 s** |
| Speed Index | **2.7 s** |
| TBT | **0 ms** |
| CLS | **0** |

### Production bundle (`npm run build`)

| Asset | Raw | Gzip |
| ----- | --- | ---- |
| `index-*.js` | **222.10 kB** | **69.44 kB** |
| `index-*.css` | **25.54 kB** | **5.39 kB** |
| `index.html` | **3.35 kB** | **1.17 kB** |

### Google Search Console (Web, last 3 months)

| Metric | Value |
| ------ | ----- |
| Clicks | **7** |
| Impressions | **102** |
| Average CTR | **6.9%** |
| Average position | **5.7** |
| Top queries (impressions) | `zakaria ahmad` (12), `ahmad zakaria` (4), … |

---

## 1. Availability

| Field | Value |
| ----- | ----- |
| **Source** | External — Vercel / Cloudflare / DNS |
| **Stimulus** | `https://www.zakariaahmad.site` errors or fails to resolve |
| **Environment** | Normal production |
| **Artifact** | Cloudflare proxy → Vercel |
| **Response** | Detect (HTTP/DNS); restore via Vercel rollback or DNS/SSL fix (Full strict; A/www proxied) |
| **Measure (real)** | **Today:** site reachable; Cloudflare DNS Full; 24h **470** requests / **101** unique visitors with no outage signal in Overview. **Target:** detect &lt; 5 min (add free uptime alert); MTTR &lt; 30 min. Informal availability goal ≥ **99.5%**. |

---

## 2. Performance

| Field | Value |
| ----- | ----- |
| **Source** | Recruiter / visitor on mobile or desktop |
| **Stimulus** | Opens homepage (cold or warm cache) |
| **Environment** | Production; lab = Slow 4G PageSpeed; field = Web Analytics (when data exists) |
| **Artifact** | HTML + JS/CSS + `/personal-photo.avif` via Cloudflare → Vercel |
| **Response** | Paint page; serve LCP image; prefer edge HIT for media |
| **Measure (real)** | **Lab:** LCP **3.1 s**, FCP **2.7 s**, CLS **0**, score **90**. **Edge:** photo **HIT** + **30-day** `Cache-Control`; 24h **29.48%** bytes/requests cached mix, **2 MB** cached of **6 MB** served. **Field RUM:** **no CWV yet** (Web Analytics empty) — re-measure when visits appear on one analytics property. |

**Tactics in use:** CDN copies of media, AVIF, long cache headers, **prioritize events** (`fetchPriority=high` on hero), **reduce overhead** (preload LCP photo in `index.html` before React).  
**Still open:** wait for Automatic Web Analytics CWV after disabling the old JS-snippet site in Cloudflare; optional later — defer below-fold JS if lab LCP stays ~3 s.

---

## 3. Modifiability

| Field | Value |
| ----- | ----- |
| **Source** | Developer (you) |
| **Stimulus** | Edit project/job copy or replace resume PDF |
| **Environment** | Build time — PR → `main` → Vercel |
| **Artifact** | `src/data/*`, `public/`, CI |
| **Response** | Edit data/asset → `npm test` + lint → merge → deploy |
| **Measure (real)** | Content lives in `src/data/*`. Site/GitHub URLs in `profile` with SEO markup locked by tests. Resume swap shipped as one PR. **Target:** content-only change ≤ **30 min**; CI green. Analytics: single Automatic RUM path (manual snippet removed). |

---

## 4. Usability

| Field | Value |
| ----- | ----- |
| **Source** | Recruiter, first visit |
| **Stimulus** | Needs resume + one project proof in ~1 minute |
| **Environment** | Runtime, desktop/mobile |
| **Artifact** | Nav Resume ↓, Hero CTAs, Projects + lightbox |
| **Response** | Download resume; open project media; close lightbox (button/Escape) |
| **Measure (real)** | Resume path + lightbox Escape covered by Vitest. Keyboard: gallery open, dialog focus/restore, burger Escape/`aria-expanded`, skip link, back-to-top not in tab order while hidden. GSC **7** clicks / **102** impressions / **3 months**, avg position **5.7**. **Target:** resume ≤ 2 clicks; project proof without mouse. |

---

## 5. Scalability

| Field | Value |
| ----- | ----- |
| **Source** | Traffic spike (share / bots / crawlers) |
| **Stimulus** | Many concurrent reads of HTML + media |
| **Environment** | Production elevated read load |
| **Artifact** | Cloudflare edge + Vercel origin (stateless) |
| **Response** | Serve from edge when eligible; origin for HTML/uncacheable |
| **Measure (real)** | **30d:** **5.53k** requests, only **176** cached (**~3.2%**) — mostly uncached HTML/other. **24h:** **101** uniques, **470** requests, **29.48%** cached, **2 MB** cached / **6 MB** served. **Media path:** photo **HIT** proves edge scaling for static assets. Free plan sufficient at this volume; no DB to shard. |

**Jacobi invert:** site would “not scale” if media lacked cache headers, SSL Flexible caused loops, or all traffic bypassed proxy — not the current setup for images.

---

## Summary matrix

| Attribute | Real baseline now | Next slice |
| --------- | ----------------- | ---------- |
| Availability | Live; 24h 101 visitors / 470 req | Free uptime monitor + runbook |
| Performance | Lab LCP 3.1 s / score 90; photo HIT; LCP preload; Automatic RUM only | Disable old JS-snippet analytics site; wait for CWV; optional defer below-fold JS |
| Modifiability | Data modules + CI; single analytics binding in HTML | — |
| Usability | Resume + keyboard gallery/lightbox/nav a11y; GSC 7 clicks / 102 impr. | — |
| Scalability | 5.53k req/30d; media HIT; low HTML cache ratio OK | Keep cache headers; purge after big asset deploys |

---

## Course blanks (copy from tables above)

### Availability / Performance / Usability

Use the six bullets in each section’s table (Source → Measure). Modifiability and Scalability are filled the same way in sections 3 and 5.
