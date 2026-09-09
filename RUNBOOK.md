# Availability runbook

Lesson 8 tactics for **zakariaahmad.site**: detect faults → recover → prevent.

Stack: **Namecheap** (registrar) → **Cloudflare** (DNS + CDN) → **Vercel** (origin). Static site; no app servers to restart.

**Targets:** detect within ~5 minutes · restore (MTTR) under 30 minutes · informal availability ≥ 99.5%.

---

## 1. Detect — UptimeRobot (free)

Cloudflare **Health Checks** need Pro. Use **UptimeRobot** instead.

### Monitor setup

1. Sign up at [uptimerobot.com](https://uptimerobot.com).
2. **Add New Monitor**
   - Monitor type: **HTTPS**
   - Friendly name: `zakariaahmad.site homepage`
   - URL: `https://www.zakariaahmad.site/` (use **www**; apex redirects to www)
   - Monitoring interval: **Every 5 minutes**
3. **Alert Contacts:** your email (optional: Telegram / Slack).
4. Save. Status should become **Up** (green).

Optional second monitor (same interval): `https://www.zakariaahmad.site/personal-photo.avif` — only if you want asset reachability separate from HTML.

### When you get an alert

1. Open the URL in a private/incognito window.
2. Check [Cloudflare Status](https://www.cloudflarestatus.com/) and [Vercel Status](https://www.vercel-status.com/).
3. Follow **Recover** below. Acknowledge/resolve the alert in UptimeRobot when the site is Up again.

---

## 2. Recover — checklist (do in order)

### A. Confirm the failure mode

| Symptom | Likely cause |
| ------- | ------------ |
| Domain does not resolve | Namecheap nameservers wrong / DNS still propagating |
| `ERR_TOO_MANY_REDIRECTS` | Cloudflare SSL set to **Flexible** |
| Cloudflare 5xx / 521–523 | Origin (Vercel) down or wrong DNS target |
| Vercel 404 / old content | Bad deploy — need rollback |
| Only some assets fail | Edge cache / purge, or origin 404 for that path |

Quick checks:

```bash
# Nameservers should be Cloudflare
nslookup -type=NS zakariaahmad.site

# Should resolve to Cloudflare anycast (e.g. 104.21.x / 172.67.x), not only Vercel
nslookup www.zakariaahmad.site

# Expect server: cloudflare on a healthy proxied response
curl -sI https://www.zakariaahmad.site/ | findstr /i "HTTP server cf-ray location"
```

(On Mac/Linux use `rg` or `grep` instead of `findstr`.)

### B. DNS (Namecheap + Cloudflare)

1. **Namecheap** → Domain List → Manage `zakariaahmad.site` → **Nameservers** = **Custom DNS**:
   - `josephine.ns.cloudflare.com`
   - `logan.ns.cloudflare.com`  
   (Use the exact pair shown in your Cloudflare overview if they differ.)
2. **Cloudflare** → **DNS → Records**
   - **A** `@` → Vercel IP from the Vercel domain card (often project-specific) — **Proxied** (orange)
   - **CNAME** `www` → Vercel CNAME from the domain card — **Proxied** (orange)
   - **MX** / **TXT** → **DNS only** (grey)
3. Wait for NS propagation if you just changed nameservers ([dnschecker.org](https://dnschecker.org/#NS/zakariaahmad.site)).

### C. SSL (redirect loops)

1. Cloudflare → **SSL/TLS** → Overview → **Full (strict)**  
2. Never leave **Flexible** with Vercel (causes redirect loops = effective downtime).

### D. Origin rollback (Vercel)

1. [Vercel Dashboard](https://vercel.com) → project **cv-website** → **Deployments**
2. Open the last **Ready** production deployment that worked
3. **⋯** → **Promote to Production** / rollback to that deployment
4. Re-check `https://www.zakariaahmad.site/` and UptimeRobot

### E. Edge cache (stale or broken asset after a good deploy)

1. Cloudflare → **Caching** → **Configuration** → **Purge Everything** (or purge the failing URL)
2. Hard-refresh or open `?v=timestamp` on the asset
3. Confirm `server: cloudflare` and a fresh `cache-control` / body

### F. Scalability under a traffic spike (read-only static site)

This app has **no database and no app servers to scale**. Concurrent visitors are served by **Cloudflare edge** when `Cache-Control` allows it (`vercel.json` for `/assets/*` and media/PDF), and by **Vercel origin** for HTML.

| Check | What “scales” looks like |
| ----- | ------------------------ |
| Media | `/personal-photo.avif` shows `cf-cache-status: HIT` after a warm request |
| Hashed JS/CSS | `/assets/*` long-cache immutable at the edge |
| HTML | Often `DYNAMIC` / uncached — expected; origin must stay healthy (Availability) |
| After replacing a public asset | Purge that URL (or Purge Everything) so the edge does not keep a stale body |

Free Cloudflare + Vercel is enough at current volume (thousands of requests / month). Do not add replicas, queues, or a CDN “product” beyond what is already proxied.

---

## 3. Prevent

| Practice | Why |
| -------- | --- |
| Merge only with green GitHub Actions CI | Avoid shipping a broken `main` |
| Keep SSL **Full (strict)** | Avoid redirect “outages” |
| Keep A/www **proxied**; MX/TXT **DNS only** | CDN + email stay correct |
| Don’t enable Bot Fight Mode blindly | Can block monitors / scrapers / previews |
| After large asset deploys, purge Cloudflare if headers look stale | Old `Cache-Control` can linger at the edge |
| Prefer UptimeRobot over Cloudflare Health Checks on Free | Health Checks require Pro |

---

## 4. Contacts / dashboards

| System | Where |
| ------ | ----- |
| Live site | https://www.zakariaahmad.site |
| UptimeRobot | https://uptimerobot.com/dashboard |
| Cloudflare | DNS, SSL/TLS, Caching, Analytics |
| Vercel | Deployments / Domains |
| Registrar | Namecheap → Domain List |
| Quality scenarios | [QUALITY_ATTRIBUTES.md](QUALITY_ATTRIBUTES.md) |
| CDN setup detail | [README.md](README.md) — Domain / CDN |

---

## 5. Availability scenario (Lesson 8)

| Field | Value |
| ----- | ----- |
| **Source** | External — Vercel / Cloudflare / DNS |
| **Stimulus** | Site errors or does not resolve |
| **Environment** | Production |
| **Artifact** | Cloudflare → Vercel |
| **Response** | UptimeRobot alerts → run this runbook → rollback / fix DNS/SSL |
| **Measure** | Alert within one 5‑minute poll; MTTR &lt; 30 minutes using the checklist above |
