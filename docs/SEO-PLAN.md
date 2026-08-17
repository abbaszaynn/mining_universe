# GOS — Search & Answer-Engine Strategy

Working plan for gbmines.com. Living document: tick items as they ship.

**Owner split** — items marked 🔑 need client action (logins, off-site accounts).
Everything else is buildable in this repo.

---

## 0.5 Second pass, same day — analytics, voice, further image cuts

- [x] **GA4 live** — client created the property (`gbmines`, stream ID
      `15451875685`, measurement ID `G-K6L3FJSZ9F`) and it's wired into
      `layout.tsx`, production-only. `generate_lead` fires on both the
      investor desk form and the general contact form on confirmed
      submission. This is the baseline the plan was missing — no more
      shipping changes and guessing whether they moved anything.
- [x] **Bing Webmaster Tools** — client did this directly (two commits,
      `BingSiteAuth.xml` + the `msvalidate.01` meta tag in `seo.ts`). No
      action needed here.
- [x] **Voice pass** — every em-dash in user-facing homepage copy and in
      the concession narratives written earlier today was rewritten as a
      plain sentence, comma, colon, or semicolon depending on what the
      clause was doing. Same claims, reads like a person wrote it instead
      of leaning on one punctuation mark for every aside. Code comments
      were left alone, not user-facing.
- [x] **Images, round 2** — 34MB was still real weight. `cover_photo.png`
      (no alpha, used as the OG image) went PNG → JPEG, 5.4MB → 0.37MB.
      The other 7 oversized files all have alpha and no social-share use,
      so WebP was safe: ~85% smaller each. `public/images`: 34MB → 12MB.
      Remaining files are all sub-1MB photos, not worth chasing further.

## 0. Where we actually stand

Audited live on 2026-08-17 (previous audit: 2026-08-08). Two skill packs
installed this session for future audits: `seo-geo-aeo` and the `claude-seo`
suite (`.claude/skills/seo*`) — run `/seo audit gbmines.com` or `/seo-geo-aeo`
next time for a repeatable structured pass.

### Update, same day: root cause of the 404 indexing block found + fixed

Client confirmed Google Search Console **is** connected (correction to the
"not connected" line below, written earlier the same session before this was
known) and shared the indexing report: **4 indexed / 27 not indexed**, with a
new-as-of-today reason — **"Not found (404)"** — flagging some pages.

Checked every URL actually in `sitemap.xml`: all 26 return `200`. So the 404s
Google is tripping on aren't sitemap entries — they're **links Google found
by crawling the site and then couldn't resolve**. Found three, all pointing
to `/insights` and `/press`, neither of which has ever existed as a route
(the real content lives at `/news`):

1. The homepage's own "See all insights" button (`InsightsSection.tsx`) —
   this is the highest-priority page in the sitemap linking straight to a
   dead page.
2. `SiteFooter.tsx` → "Insights" link (site-wide, every page).
3. `SiteFooter.tsx` → "Press & Media" link (site-wide, every page).

**Fixed this session** — all three now point to `/news`. Also fixed while in
that file: the footer's decorative "GAME OF STONES" wordmark and the loading
screen's "Game of Stones" title were both marked up as `<h1>`, on top of
the real per-page `<h1>`, on literally every page (`SiteFooter.tsx` +
`GosLoaderScreen.tsx`). Verified in a local build: homepage now renders
exactly one `<h1>`. Two duplicate-heading sources, not one — the earlier
finding below undersold it.

**Next action once this deploys:** in GSC, use *Validate Fix* on the "Not
found (404)" issue, and use URL Inspection → Request Indexing on the
homepage, `/concessions`, and `/about` directly rather than waiting for the
next natural crawl.

| Check | Result |
|---|---|
| SSR content visible to crawlers | ✅ confirmed via DOM inspection: title, meta description, canonical, OG/Twitter tags, Organization JSON-LD all render correctly |
| robots.txt + sitemap.xml | ✅ served, valid — 26 URLs, AI crawlers (GPTBot, ClaudeBot, PerplexityBot) explicitly allowed |
| `llms.txt` | ✅ live, generated from concessions data |
| FAQ schema | ⚠️ implemented (`faqJsonLd`) but only wired into `/investor-desk` — not homepage, `/about`, or concessions |
| Named leadership | ⚠️ 8 directors named with titles on homepage "Who We Are" — but photos are explicitly placeholders (per code comment), not on `/about`, no bios/credentials, no LinkedIn `sameAs`, no `Person` schema |
| H1 structure | ❌ homepage has **two** `<h1>` tags ("Licensed minerals, mined at source." + the "GAME OF STONES" logo mark) — should be one |
| Image alt text | ❌ 9 of 39 homepage `<img>` tags missing `alt` (both gold commodity renders, 2 geology diagrams, 4 concession photos, 1 gemstone photo) |
| Oversized source images | ❌ **worse than last audit**: `right-side.png` now 75 MB (was 71 MB, still unused/undeleted), `left-side.png` 20 MB, `right-side-new.png` 11 MB, plus previously-unflagged `commodities/lead.png` 18 MB, `gold.png` 15 MB, `nephrite.png` 14.5 MB, `copper.png` 6.5 MB |
| Google Search Console | ❌ confirmed not connected — no `google-site-verification` meta tag renders in production |
| Bing Webmaster Tools | ❌ confirmed not connected |
| Analytics (GA4/GTM) | ❌ **not in the plan before, and not implemented** — zero `gtag`/`dataLayer` on the live site. There is currently no way to measure whether any of this work is moving the needle. |
| Indexed pages | Google search for `site:gbmines.com`, the bare domain, and the brand name all return **zero** gbmines.com results. Strong signal the site isn't meaningfully indexed yet — confirm directly in GSC once connected, that's the authoritative source. |
| Concession page depth | ❌ still thin — spot-checked `/concessions/shigar-copper-deposit`: ~70 words of unique body copy. These are the Tier-1 Cluster D pages the whole strategy leans on; they're built (schema, routing, sitemap) but not written. |

**Diagnosis — unchanged from last audit, still the root cause:**

1. **New domain, zero authority.** Dominant factor. Only fixed by time + links.
2. **Wrong target.** `minesandmineralsgb.gog.pk` is a government domain with an
   exact-name match. We will never win "mines and minerals gilgit baltistan"
   and should stop implicitly competing for it — it is an *informational*
   query anyway. The searcher wants policy, not a counterparty.
3. **No transactional surface.** Most pages that would target how a buyer or
   investor actually searches (`/commodities`, `/invest`, `/faq`) still don't
   exist — see §2.

**The gap we own.** Government publishes policy. Journalists publish analysis.
*Nobody publishes operator-level ground truth* — coordinates, licence numbers,
area, access routes, assay indications, community agreements. That data exists
nowhere else. It is simultaneously the SEO moat (uncopyable) and the AEO play
(AI engines cite primary sources with attributed statistics).

### ⚠️ Correction to a prior assumption: there IS a private competitor

Found this session: **[Highland Miners](https://www.highlandminers.com/)** —
a Gilgit-Baltistan geological exploration and mining consultancy, explicitly
targeting the same investor audience. They currently out-execute us on SEO
fundamentals we're missing:

- Active blog ("field notes, project updates, geological insights")
- Dedicated "Investors" section with an Investment Guide + Minerals Database
- 7-section nav with clear service subcategories
- Heavy, repeated geographic anchoring ("Gilgit-Baltistan") in body copy

They're a services/consultancy play, not a licence-holder/operator like us —
so we're not competing head-on for every query, but we overlap hard on
investor-intent and informational Cluster C terms. Worth a periodic check on
their published content for gap analysis (their blog cadence is exactly the
"news cadence" item in §2 Tier 3 that we haven't shipped yet).

Also confirmed as a citation opportunity, not a competitor: the government
portal `portal.minesandmineralsgb.gog.pk/allcompaniesdata` publishes a **List
of Title Holders**. If Durr & Zircon / its predecessor entities are on that
list, that's a free, high-trust .gog.pk backlink — check and, if missing,
pursue getting listed. 🔑

---

## 1. Keyword architecture

*(unchanged since last audit — still a good hypothesis, not yet volume-verified)*

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

These are cheap wins — we hold the only primary data. **Currently blocked on
content depth, not architecture** — see §0 concession page finding above.

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
      Confirmed not yet on schema (checked live — no `Service` JSON-LD renders).
- [x] **`/concessions`** index + **10 × `/concessions/[slug]`** — content
      debt closed this session. Added `src/lib/concession-context.ts`: a
      hand-written narrative (2 paragraphs, regionally-sourced geology — see
      file header for the sourcing discipline used, no invented grades or
      reserves) plus a 2-question FAQ per concession, wired into
      `ConcessionDetail.tsx` alongside the existing single coordinates
      question. Each page now runs ~450–550 words instead of ~70, and each
      carries its own `FAQPage` JSON-LD (via the existing `FaqSection`
      component — the old inline single-question schema was replaced, not
      duplicated). Verified all 10 slugs render, one `FAQPage` block each,
      `tsc --noEmit` clean.
- [ ] **`/commodities/[slug]`** × 7 — buyer-intent pages. Specs, grades,
      Incoterms, MOQ, payment terms. `Product` schema. Cluster A. Confirmed:
      route doesn't exist yet.
- [ ] **`/faq`** — `FAQPage` schema. Highest-leverage single AEO artifact.
      Confirmed: no dedicated route. FAQ content + schema already exist
      (`lib/faq-data.ts`, `faqJsonLd()`) but are scoped to `/investor-desk`
      only — reuse that data, don't rebuild it.

### Tier 2

- [ ] **`/invest`** pillar — JV / farm-in framing. Cluster B.
- [ ] **`/guides/mining-licence-gilgit-baltistan`** — link magnet. Cluster C.
- [ ] **`/markets/[country]`** × 4 — China, USA, Saudi, Thailand. Cluster E.
- [ ] **Leadership on `/about`** — move the 8 named directors from the
      homepage "Who We Are" section onto `/about` (or link both), add real
      bios/credentials, LinkedIn `sameAs` URLs, and `Person` schema nested
      under the `Organization`. Replace placeholder director photos with real
      headshots — placeholders currently ship to production per the component
      comment. This is the E-E-A-T fix; matters more for an investment-facing
      site than most.

### Tier 3

- [ ] **GB Mineral Corridor Report 2026** (PDF) — data asset for journalists.
- [ ] News cadence — 2 posts/month minimum. AI citation strongly favours
      content refreshed inside 6 months. (Highland Miners already does this —
      see §0.)

---

## 3. Technical

- [x] Sitemap 404 removed (`/companies` → `/about`)
- [x] 301 redirect `/companies` → `/about`
- [x] `llms.txt` for AI crawlers — generated from `companies-data`, advertised
      in `robots.txt`. Live at `/llms.txt`.
- [x] 🔑 **Google Search Console verify + submit sitemap** — confirmed
      connected same day this was flagged as missing; see the §0 update.
      Currently 4 indexed / 27 not indexed — recheck after the 404 fix
      below deploys and propagates.
- [ ] 🔑 Bing Webmaster Tools (feeds ChatGPT search) — still not confirmed
- [ ] 🔑 **GA4 (or Plausible/Fathom if privacy is a priority) + conversion
      events** on the enquiry/contact forms. New item this audit — without
      this, none of the above work is measurable, and there's no way to know
      which keyword clusters are actually pulling investor/buyer leads.
- [x] Fix duplicate `<h1>` — two separate sources, both site-wide: the
      footer's "GAME OF STONES" wordmark and the loading screen's "Game of
      Stones" title. Both changed to `<p>`. Verified one `<h1>` per page
      locally.
- [ ] Add missing `alt` text to the 9 flagged homepage images (2× gold
      commodity render, `shigar_geology.png`, `hilal_abad_geology.png`,
      `ruby-bagicha.jpg`, `lead-jutial-1.jpg`, `nephrite-gupis-1.jpg`,
      `gb_gemstone_mining.png`, `lead-gultari-1.jpg`) — sweep the rest of the
      site for the same issue, this was a homepage-only spot check.
- [~] `FAQPage` — now on `/investor-desk` and all 10 concession pages;
      `/faq`, `/about`, homepage still don't have it. `Article`,
      `BreadcrumbList`, `Service`, `Product`, `Person` schema still open.
- [ ] TTFB: target < 800ms. Investigate ISR/static export for marketing pages.
      Not re-measured this session — re-check once GSC/analytics are live so
      it's tied to real Core Web Vitals data instead of a manual curl.
- [x] **Delete or compress source images** — done this session:
  - `right-side.png` — deleted (75 MB, confirmed unreferenced anywhere in `src/`)
  - `left-side.png` — 19.2 MB → 3.1 MB (resized to fit 2000px, lossless recompress)
  - `right-side-new.png` — 11.1 MB → 1.7 MB (2400px)
  - `commodities/lead.png` — 17.5 MB → 4.2 MB (2000px)
  - `commodities/gold.png` — 14.4 MB → 2.7 MB (2000px)
  - `commodities/nephrite.png` — 13.8 MB → 4.2 MB (2000px)
  - `commodities/copper.png` — 6.2 MB → 1.75 MB (already ≤2000px, recompressed only)
  - `commodities/granite.png` — 1.5 MB, left as-is (already small)

  `public/images` total: ~150 MB+ → 34 MB. All resized with `sharp`
  (`fit: "inside"`, alpha preserved, lossless PNG recompression — no visible
  quality loss, verified against originals). Originals backed up outside the
  repo before touching anything. `sharp` added as a devDependency — also
  what Next/Vercel's own image optimizer uses, so it's a reasonable thing to
  have installed regardless.
- [x] **Missing `alt` text** — the 9 flagged images traced to one root cause:
      `RegionsMapSection.tsx`'s map marker thumbnails were hardcoding
      `alt=""` for all 7 region photos. Fixed to describe the specimen +
      region. Re-swept the whole site (gallery, commodities, directors, hero)
      — everything else already had real `alt` text. The 2 images still
      showing empty `alt` are the intentional decorative blur-glow duplicate
      in `CommoditiesSection.tsx`, correctly `aria-hidden` — not a bug.
- [ ] Per-page OG images

Confirmed already allowed in robots.txt: GPTBot, ClaudeBot, PerplexityBot
(wildcard allow). Keep it that way — blocking them removes AEO entirely.

---

## 4. Off-site 🔑

This is where year-one leads actually come from, and it builds the authority
that makes section 2 work.

- [ ] ⚠️ **Checked `portal.minesandmineralsgb.gog.pk/allcompaniesdata` directly
      (486 rows, searched the live DOM, not a scrape summary) — none of
      "Durr", "Zircon", "Earth Lux", nor any of the eight director names in
      `companies-data.ts` appear anywhere on the government's title-holder
      list.** This needs a human answer, not an assumption: licences can
      legitimately be held under a different registered name, a not-yet-
      publicly-listed grant, or a name variant not tried here — but it could
      also mean the entity isn't on this specific register at all. Worth
      confirming directly with the Mines & Minerals Department before
      pursuing this as a backlink target, since it's a factual claim about
      licensing, not just an SEO citation.

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

- **Weeks 0–4:** indexing begins. Little or no traffic. Normal. *(We are
  effectively still at week 0 on this — GSC isn't connected yet, so the clock
  hasn't formally started.)*
- **Weeks 4–12:** long-tail (Cluster D) starts ranking — least competitive.
  Blocked until concession pages have real content (§2).
- **Months 3–6:** Cluster A/B begin to move *if* off-site work is happening.
- **Organic will not be the first channel.** Directories and direct outreach
  will out-produce search in year one. SEO is the compounding asset, not the
  fast one. Plan cash flow accordingly.

## 6. This week, in order

Updated same day, after the GSC screenshots, the 404 fix, and the image /
alt-text cleanup:

1. **Deploy everything shipped today**: the `/insights` + `/press` link fix,
   duplicate-`<h1>` fix, image compression (~150MB → 34MB in `public/images`),
   and alt-text fix. Not yet deployed as of this edit.
2. 🔑 Once deployed: in GSC, *Validate Fix* on the "Not found (404)" issue,
   then URL Inspection → Request Indexing on `/`, `/concessions`, `/about`.
   Don't wait for the natural recrawl.
3. 🔑 Set up GA4 (or equivalent) with a conversion event on the investor
   enquiry form. You want a baseline while indexing is still ramping.
4. ~~Write real body copy for the 10 concession pages~~ — done this
   session (§2). **Ask the client to fact-check the geological context
   paragraphs before this deploys** — they're sourced from public surveys
   and clearly hedged, but this is investor-facing content about a real
   licensed asset and deserves a human read before it goes live.
5. 🔑 Check/pursue the `.gog.pk` title-holder listing — likely the fastest
   real backlink available.
