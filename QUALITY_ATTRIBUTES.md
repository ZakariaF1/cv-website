# Quality attributes — stimulus–response scenarios

Lesson 8 (Skillab / Adrian Popescu): *Atributele unui sistem și tactici de îmbunătățire*.

This file fills the course templates for **zakariaahmad.site** (static React + Vite on Vercel, Cloudflare DNS/CDN + Web Analytics). There is no backend or database; tactics are mapped only where they fit a personal portfolio.

## How to write a scenario (method)

For each quality attribute, answer the six fields from the lesson. Every field must be concrete enough to test or observe.

| Field (EN) | Field (RO from lesson) | Ask yourself |
| ---------- | ---------------------- | ------------ |
| **Source of stimulus** | Sursa stimulului | Who or what starts it? (visitor, deployer, Cloudflare, Vercel, you) |
| **Stimulus** | Stimulul | What event or condition happens? |
| **Environment** | Mediul | Startup, normal use, high load, mobile 4G, after a deploy? |
| **Artifact** | Artefactul | Which part of *this* system responds? (Hero, Nav, edge cache, CI, …) |
| **Response** | Răspunsul | What does the system (or operator) do? |
| **Response measure** | Măsurarea răspunsului | How do you know it succeeded? (time, %, error count, …) |

Rules of thumb:

1. Prefer one **primary user job** (recruiter opens the site, downloads resume, opens a project).
2. The **measure** must be checkable with tools you already have (browser, Cloudflare Web Analytics, GitHub Actions, Vercel dashboard) or a free uptime check.
3. If a tactic needs a database or multi-service failover, write “N/A for this architecture” instead of inventing infrastructure.

---

## 1. Availability

**Goal (lesson):** The site responds when needed; downtime stays within an agreed budget.

| Field | Value for this site |
| ----- | ------------------- |
| **Source** | External — Vercel platform / Cloudflare edge / Namecheap DNS misconfiguration |
| **Stimulus** | Origin or DNS failure: `https://www.zakariaahmad.site` returns errors or does not resolve |
| **Environment** | Normal operation (production) |
| **Artifact** | Hosting + DNS path: Cloudflare proxy → Vercel deployment |
| **Response** | Detect via HTTP status / DNS; restore by Vercel rollback or fixing Cloudflare DNS/SSL (Full strict, proxied A/www); keep MX/TXT DNS-only |
| **Measure** | Detect within 5 minutes of an alert (uptime monitor or manual check); restore (MTTR) under 30 minutes; target informal availability ≥ 99.5% (~1.8 days downtime/year) for a personal site |

**Tactics that fit:** detect (external ping), recover (rollback / fix DNS), prevent (CI green before merge, never SSL Flexible).

**Tactics that do not fit yet:** active/passive app redundancy, heartbeats between microservices.

---

## 2. Performance

**Goal (lesson):** Process a stimulus within a reference time; handle concurrent visitors.

| Field | Value for this site |
| ----- | ------------------- |
| **Source** | External user (recruiter / hiring manager) on a mobile network |
| **Stimulus** | Opens `https://www.zakariaahmad.site/` (first visit or warm cache) |
| **Environment** | Normal operation; emulated Slow 4G in lab, real devices in the field |
| **Artifact** | First paint path: HTML + main JS/CSS + hero photo (`/personal-photo.avif`) via Cloudflare → Vercel |
| **Response** | Serve shell and LCP image; subsequent photo requests preferably from Cloudflare edge (`cf-cache-status: HIT` / `REVALIDATED`) |
| **Measure** | **Field (primary):** Cloudflare Web Analytics — LCP “Good” share improving over 28 days; CLS stay Good. **Lab (secondary):** PageSpeed mobile LCP/FCP noted (currently ~3.1 s / ~2.7 s) without treating lab as the only truth |

**Tactics already in use:** maintain multiple copies of data (CDN), increase resource efficiency (AVIF, long `Cache-Control` on media).

**Next tactics (later slices):** reduce overhead (LCP preload / defer below-fold JS) if field LCP stays poor.

---

## 3. Modifiability

**Goal (lesson):** Change the system for new requirements with low time, cost, and blast radius.

| Field | Value for this site |
| ----- | ------------------- |
| **Source** | Developer (site owner) |
| **Stimulus** | Add or edit a project / update job title / replace resume PDF |
| **Environment** | Design / build time (local edit → PR → `main` → Vercel) |
| **Artifact** | Content modules under `src/data/` and `public/` assets; components stay presentational |
| **Response** | Edit data (or swap PDF), run `npm test` + `npm run lint`, merge; production updates via Vercel |
| **Measure** | Content-only change in under 30 minutes of work; characterizing tests stay green; no CSS/layout edits required for copy changes |

**Tactics in use:** encapsulate content in data modules, restrict dependencies (tests + CI), high cohesion in section components.

**Known debt:** two Cloudflare Web Analytics properties (JS snippet + Automatic) — consolidate later so analytics config has a single binding.

---

## 4. Usability

**Goal (lesson):** User completes a task easily; system shows progress / success / failure.

| Field | Value for this site |
| ----- | ------------------- |
| **Source** | End user (recruiter) visiting for the first time |
| **Stimulus** | Wants resume PDF and one project proof within the first minute |
| **Environment** | Runtime — desktop or mobile browser |
| **Artifact** | Nav (Resume ↓), Hero CTAs, Projects section + lightbox |
| **Response** | Resume download from nav; scroll/jump to Projects; open lightbox for screenshots/demo; Escape/close to leave lightbox |
| **Measure** | Resume reachable in ≤ 2 clicks from first paint; project preview openable without reading docs; lightbox closable via control and Escape (covered by characterizing tests) |

**Tactics in use:** clear primary actions, maintain system feedback (lightbox UI), cancel (close lightbox).

**Later check:** keyboard / focus path on nav + lightbox without visual redesign.

---

## 5. Scalability

**Goal (lesson):** Usage can grow without collapsing performance or exploding cost.

| Field | Value for this site |
| ----- | ------------------- |
| **Source** | External — traffic spike (e.g. LinkedIn share) |
| **Stimulus** | Many concurrent reads of the homepage and static media |
| **Environment** | Normal operation with elevated read load |
| **Artifact** | Cloudflare edge cache + Vercel origin (stateless static assets) |
| **Response** | Serve HTML/JS from origin/edge; serve photos/PDF from edge when cached; origin sees fewer bytes on repeat hits |
| **Measure** | After warm-up, media requests show `server: cloudflare` and `cf-cache-status: HIT` or `REVALIDATED`; no origin/DB scaling work (there is no DB); Free Cloudflare + Vercel remain sufficient at CV traffic levels |

**Tactics in use:** multiple copies of data (CDN), no per-user server on the server, cache static media.

**Honest N/A:** DB partitioning, sharding, read replicas, connection pools — no database.

**Jacobi invert (lesson):** ask “what would make this *not* scale?” → putting large videos without cache headers, SSL Flexible redirect loops, or blocking bots that scrapers/PageSpeed need. Avoid those.

---

## Summary matrix

| Attribute | Primary measure today | Next improvement (plan only) |
| --------- | --------------------- | ---------------------------- |
| Availability | Manual / future uptime alert; Vercel rollback | Free uptime monitor + short runbook |
| Performance | Cloudflare RUM + PageSpeed lab | LCP preload / defer below-fold if field stays weak |
| Modifiability | Data modules + CI tests | Single analytics setup |
| Usability | Resume + projects path; lightbox tests | Keyboard/a11y audit |
| Scalability | Edge cache HIT on media | Keep cache headers; purge after big asset deploys |

---

## Course blank templates (copy if you need to rewrite by hand)

### Availability

- Source:
- Stimulus:
- Environment:
- Artifact:
- Response:
- Measure:

### Performance

- Source:
- Stimulus:
- Environment:
- Artifact:
- Response:
- Measure:

### Usability

- Source:
- Stimulus:
- Environment:
- Artifact:
- Response:
- Measure:

*(Modifiability and Scalability follow the same six bullets; filled versions are above.)*
