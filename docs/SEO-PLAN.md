# GOS — Search & Answer-Engine Strategy

Working plan for gbmines.com. Living document: tick items as they ship.

**Owner split** — items marked 🔑 need client action (logins, off-site accounts).
Everything else is buildable in this repo.

---

## 0. Where we actually stand

Audited live on 2026-08-08.

| Check | Result |
|---|---|
| SSR content visible to crawlers | ✅ H1 and body copy present in raw HTML |
| Canonical / title / description | ✅ correct |
| robots.txt + sitemap.xml | ✅ served, valid |
| JSON-LD | ✅ Organization, AdministrativeArea, WebSite |
| `/companies` in sitemap | ❌ **404** — fixed, now `/about` |
| `/companies` redirect | ❌ none — fixed, 301 → `/about` |
| Homepage TTFB | ⚠️ 1.4–2.3s warm, 22s cold |
| Indexed pages | 14 URLs total — too thin to rank for anything |

**Diagnosis.** The tags are not the problem. Three things are:

1. **New domain, zero authority.** Dominant factor. Only fixed by time + links.
2. **Wrong target.** `minesandmineralsgb.gog.pk` is a government domain with an
   exact-name match. We will never win "mines and minerals gilgit baltistan"
   and should stop implicitly competing for it — it is an *informational*
   query anyway. The searcher wants policy, not a counterparty.
3. **No transactional surface.** Nothing on the site targets how a buyer or an
   investor actually searches.

**The gap we own.** Government publishes policy. Journalists publish analysis.
*Nobody publishes operator-level ground truth* — coordinates, licence numbers,
area, access routes, assay indications, community agreements. That data exists
nowhere else. It is simultaneously the SEO moat (uncopyable) and the AEO play
(AI engines cite primary sources with attributed statistics).

---

## 1. Keyword architecture

> **Honesty note:** these are *intent-mapped*, not volume-verified — no paid
> keyword tool is connected. Search Console will return real impression data
> 4–8 weeks after verification, and this table gets rewritten from that.
> Treat it as a starting hypothesis, not gospel.

Vocabulary sourced from live B2B mineral marketplaces (TradeKey,
go4WorldBusiness, TradeWheel) and mining-JV legal literature.

### Cluster A — Mineral buyers (transactional, fastest revenue)

Buyers write like traders. Note **"concentrate"**, not "ore".

| Primary | Supporting long-tail |
|---|---|
| antimony concentrate supplier Pakistan | antimony ore FOB Karachi, Sb 20% concentrate supplier |
| copper concentrate supplier Pakistan | copper concentrate CIF China, Cu 18–25% concentrate |
| nephrite jade supplier Pakistan | buy nephrite jade direct from mine, raw jade boulder exporter |
| placer gold Pakistan | alluvial gold supplier Pakistan, placer gold dore |
| lead concentrate exporter Pakistan | galena concentrate supplier, Pb concentrate FOB |
| quartz / silica supplier Pakistan | high purity quartz supplier, silica sand exporter Pakistan |
| granite exporter Pakistan | dimension stone supplier Pakistan, granite blocks FOB |

**Trade-term modifiers to weave into copy** (these are the real differentiator):
`FOB Karachi` · `CIF` · `CFR` · `L/C at sight` · `SBLC` · `ICPO` ·
`Proof of Funds` · `SGS inspection` · `assay report` · `TC/RC` · `MOQ` ·
`metric tonnes per month`

### Cluster B — Investors & JV partners (highest deal value)

| Primary | Supporting long-tail |
|---|---|
| mining joint venture Pakistan | JV partner wanted mining Pakistan, consortium mining Pakistan |
| exploration licence Pakistan | mining concession for sale Pakistan, mineral title Pakistan |
| farm-in mining opportunity | earn-in agreement exploration Asia, farm-in copper project |
| critical minerals investment Pakistan | antimony investment, lithium exploration Pakistan |
| copper exploration project investment | early-stage copper project Asia, greenfield copper Pakistan |
| mining investment Gilgit Baltistan | Gilgit Baltistan mining concession, GB mineral corridor |

Audience term to use in copy: **junior exploration company** — these are the
firms that actually acquire early-stage assets.

### Cluster C — Informational (top of funnel, earns backlinks)

| Query | Page |
|---|---|
| how to get a mining licence in Gilgit Baltistan | Guide (link magnet) |
| can foreigners own mining licences in Pakistan | Guide / FAQ |
| Pakistan mining laws for foreign investors | Guide |
| is it safe to invest in Gilgit Baltistan | FAQ + Field-visit page |
| Gilgit Baltistan mineral resources map | Map page |
| Pakistan critical minerals list | Commodities pillar |

**Key legal fact to answer directly** (nobody covers it well): foreign companies
must incorporate locally before mineral titles can be granted. Answer it
plainly — that alone can win the query.

### Cluster D — Geographic long-tail (low volume, near-zero competition)

`Skardu copper mine` · `Shigar copper gold deposit` · `Gultari antimony
molybdenum` · `Kharmang polymetallic` · `Ishkoman copper` · `Bagicha marble
lithium` · `Jutial Nala Gilgit` · `Gupis granite Ghizer`

These are cheap wins — we hold the only primary data.

### Cluster E — Buyer-country pages

`Pakistan minerals supplier for China` · `Pakistan mining investment Saudi
Arabia` · `Pakistan critical minerals USA` · `mineral supplier Pakistan to
Thailand`

---

## 2. Page build order

Each page needs: one primary keyword, a 40–60 word direct-answer block at the
top, question-shaped H2s, and schema.

### Tier 1 — ship first

- [ ] **`/services`** — what we do, commercially framed. Primary: *mining
      services Gilgit Baltistan* + trade-term body copy. `Service` schema.
- [x] **`/concessions`** index + **10 × `/concessions/[slug]`** — the moat.
      District, minerals, area, licence status, operator, photo. `Place` +
      `FAQPage` schema. Cluster D. Built from `deposits` (never `locations`),
      so exact coordinates cannot appear on these pages — client decision:
      shared with verified counterparties only, on request. ⚠️ the existing
      `/map` page still ships full polygon coordinates to the client — see
      note below.
- [ ] **`/commodities/[slug]`** × 7 — buyer-intent pages. Specs, grades,
      Incoterms, MOQ, payment terms. `Product` schema. Cluster A.
- [ ] **`/faq`** — `FAQPage` schema. Highest-leverage single AEO artifact.

### Tier 2

- [ ] **`/invest`** pillar — JV / farm-in framing. Cluster B.
- [ ] **`/guides/mining-licence-gilgit-baltistan`** — link magnet. Cluster C.
- [ ] **`/markets/[country]`** × 4 — China, USA, Saudi, Thailand. Cluster E.

### Tier 3

- [ ] **GB Mineral Corridor Report 2026** (PDF) — data asset for journalists.
- [ ] News cadence — 2 posts/month minimum. AI citation strongly favours
      content refreshed inside 6 months.

---

## 3. Technical

- [x] Sitemap 404 removed (`/companies` → `/about`)
- [x] 301 redirect `/companies` → `/about`
- [ ] 🔑 **Google Search Console verify + submit sitemap** ← do this first
- [ ] 🔑 Bing Webmaster Tools (feeds ChatGPT search)
- [x] `llms.txt` for AI crawlers — generated from `companies-data`, advertised
      in `robots.txt`. Live at `/llms.txt`.
- [ ] `FAQPage`, `Article`, `BreadcrumbList`, `Service`, `Product` schema
- [ ] TTFB: target < 800ms. Investigate ISR/static export for marketing pages.
- [ ] Downsize `left-side.png` (19 MB) and `right-side-new.png` (11 MB)
- [ ] Delete unused `right-side.png` (71 MB), `natural-stones.jpg`
- [ ] Per-page OG images

Confirmed already allowed in robots.txt: GPTBot, ClaudeBot, PerplexityBot
(wildcard allow). Keep it that way — blocking them removes AEO entirely.

---

## 4. Off-site 🔑

This is where year-one leads actually come from, and it builds the authority
that makes section 2 work.

**B2B marketplaces** (where Chinese buyers genuinely search): Alibaba,
Made-in-China, TradeKey, go4WorldBusiness, TradeWheel, B2BMineral.

**Business identity:** Google Business Profile, LinkedIn company page +
director profiles, Crunchbase, Dun & Bradstreet.

**Mining directories:** Mining.com, InfoMine/Mining Intelligence, MiningLink,
Glodex.

**Pakistan trade bodies:** TDAP, SMEDA, Board of Investment, relevant chambers
of commerce.

**PR:** respond to journalists covering Pakistan critical minerals — the topic
is live (US firms actively sourcing). Each placement is an authority link.

---

## 5. Expectations

- **Weeks 0–4:** indexing begins. Little or no traffic. Normal.
- **Weeks 4–12:** long-tail (Cluster D) starts ranking — least competitive.
- **Months 3–6:** Cluster A/B begin to move *if* off-site work is happening.
- **Organic will not be the first channel.** Directories and direct outreach
  will out-produce search in year one. SEO is the compounding asset, not the
  fast one. Plan cash flow accordingly.
