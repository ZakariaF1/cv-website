# Quality attributes — stimulus–response scenarios

Lesson 8 (Skillab / Adrian Popescu): *Atributele unui sistem și tactici de îmbunătățire*.

Filled for **zakariaahmad.site** (static React + Vite → Vercel → Cloudflare). Scenarios use the lesson’s six fields. **Measures below use real baselines captured 8–9 Sep 2026** (and Search Console last 3 months).

Architecture topology: [`docs/ARD.md`](docs/ARD.md). Availability ops checklist: [`RUNBOOK.md`](RUNBOOK.md) (do not duplicate the six-field Availability table there).

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
| LCP — P50 | **6,100 ms** |
| LCP — P75 | **6,176 ms** |
| LCP — P90 | **12,804 ms** |
| LCP — P99 | **12,804 ms** |

**Target:** LCP ≤ **2.5 s** (good). Field RUM now shows CWV; numbers above are the baseline that triggered the font + defer-JS slice.

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
| `index-*.js` (first paint) | **204.67 kB** | **65.02 kB** |
| Projects chunk | **9.27 kB** | **2.80 kB** |
| Skills chunk | **6.29 kB** | **2.26 kB** |
| Contact chunk | **3.45 kB** | **1.16 kB** |
| CSS (split) | shell **12.59 kB** + section CSS | off critical path for deferred CSS |
| `index.html` | **3.59 kB** | **1.23 kB** |

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
| **Response** | UptimeRobot alerts → [`RUNBOOK.md`](RUNBOOK.md) (DNS/SSL Full strict, Vercel rollback, purge) |
| **Measure (real)** | **Baseline (8–9 Sep 2026):** site reachable; Cloudflare DNS Full; 24h **470** requests / **101** unique visitors with no outage signal in Overview. **Target:** detect &lt; 5 min; MTTR &lt; 30 min. Informal availability goal ≥ **99.5%**. |

---

## 2. Performance

| Field | Value |
| ----- | ----- |
| **Source** | Recruiter / visitor on mobile or desktop |
| **Stimulus** | Opens homepage (cold or warm cache) |
| **Environment** | Production; lab = Slow 4G PageSpeed; field = Web Analytics CWV |
| **Artifact** | HTML + JS/CSS + fonts + `/personal-photo.avif` via Cloudflare → Vercel |
| **Response** | Paint hero; serve LCP image; prefer edge HIT for media; keep below-fold JS off the first download |
| **Measure (real)** | **Field RUM (before this slice):** LCP P50 **6.1 s**, P75 **6.2 s**, P90/P99 **12.8 s** (fail). **Lab (earlier):** LCP **3.1 s**, FCP **2.7 s**, CLS **0**, score **90**. **Edge:** photo **HIT** + **30-day** `Cache-Control`. **Target:** field LCP P75 ≤ **2.5 s**. |

**Tactics in use:** CDN copies of media, AVIF, long cache headers, **prioritize events** (`fetchPriority=high` on hero), **reduce overhead** (preload LCP photo in `index.html`), **remove render-blocking font `@import`** (HTML `preconnect` + stylesheet, weights 400–700 only), **defer** Projects/Skills/Contact via `React.lazy` + `modulePreload: false`.  
**Still open:** re-measure field LCP after deploy; self-host fonts if Google Fonts RTT still dominates.

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
| **Measure (real)** | Resume path + lightbox covered by Vitest. Search discovery weak but present: GSC **7** clicks / **102** impressions / **3 months**, avg position **5.7**. **Target:** resume ≤ 2 clicks; no docs needed for lightbox. |

---

## 5. Scalability

| Field | Value |
| ----- | ----- |
| **Source** | Traffic spike (share / bots / crawlers) |
| **Stimulus** | Many concurrent reads of HTML + media |
| **Environment** | Production elevated read load |
| **Artifact** | Cloudflare edge + Vercel origin (stateless) |
| **Response** | Serve from edge when eligible; origin for HTML/uncacheable |
| **Measure (real)** | **30d:** **5.53k** requests, only **176** cached (**~3.2%**) — mostly uncached HTML/other. **24h:** **101** uniques, **470** requests, **29.48%** cached, **2 MB** cached / **6 MB** served. **Media path:** photo **HIT** proves edge scaling for static assets. Free plan sufficient at this volume; no DB to shard. **Locked in:** `vercel.json` cache headers (Vitest), RUNBOOK purge + spike checklist. |

**Jacobi invert:** site would “not scale” if media lacked cache headers, SSL Flexible caused loops, or all traffic bypassed proxy — not the current setup for images.

---

## Summary matrix

| Attribute | Real baseline now | Next slice |
| --------- | ----------------- | ---------- |
| Availability | Live; UptimeRobot + RUNBOOK | — |
| Performance | Field LCP fail (P75 ~6 s); fonts + defer-JS shipped | Re-measure field LCP after deploy |
| Modifiability | `src/data/*` + profile URL/SEO lock + CI | — |
| Usability | Resume ≤ 2 clicks; lightbox + Demo keyboard already work | — |
| Scalability | Edge media HIT; `vercel.json` headers; purge after asset deploys | — |

---

## Course blanks (copy from tables above)

### Availability / Performance / Usability

Use the six bullets in each section’s table (Source → Measure). Modifiability and Scalability are filled the same way in sections 3 and 5.
