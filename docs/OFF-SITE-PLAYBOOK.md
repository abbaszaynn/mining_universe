# Off-site playbook: directories, marketplaces, PR, backlinks

Companion to `docs/SEO-PLAN.md` §4. That section lists *where* to go.
This one covers *what to actually do* and *how*, in the order worth doing it.

**The honest framing first.** Every buildable on-site item is done. The site
is technically sound, has real content, and emits correct schema. What it
does not have is authority, and authority is not a code problem. Google has
18 pages indexed and 24 sitting in "Discovered, currently not indexed",
which is what a crawler does with a domain it has no reason to trust yet.
Off-site work is how that changes, and it is slower and less predictable
than everything that came before it.

**One expectation to set before starting.** Most of what follows will not
produce a followed link that passes ranking signal. Marketplace and
directory profiles are overwhelmingly `nofollow`, paid, or both. That does
not make them worthless, but it does mean you should judge them on leads
and entity consistency, not on backlinks. The item that genuinely moves
authority is §4, PR, and it is also the one that takes real effort.

---

## 0. Do this before any listing goes out

### Lock the NAP

NAP means name, address, phone. Every listing you create should reproduce
these **character for character identical**. Inconsistent formatting across
citations is the single most common reason a real business fails to resolve
as one entity in search.

The canonical set now lives in `src/lib/site.ts` under `SITE.address`, and
is emitted in the site's `Organization` schema so search engines have an
authoritative version to match listings against:

| Field | Value |
|---|---|
| Legal name | Durr & Zircon Consortium |
| Address | Office 5, Qasimi Market, in front of CMH Gilgit, Gilgit Baltistan, Pakistan |
| Phone | +92 316 9244827 |
| Email | info@gbmines.com |
| Website | https://gbmines.com |

Do not let one listing say "Gilgit, GB", another say "Gilgit-Baltistan", and
a third use the second phone number. Pick the row above and never deviate.

### Write the boilerplate once

You will be asked for a company description perhaps thirty times. Write it
once, in three lengths, and reuse them verbatim. Suggested starting point,
lifted from copy already on the site so nothing contradicts:

- **One line (50 chars):** Licensed mining operator, Gilgit Baltistan, Pakistan.
- **Short (~250 chars):** SECP-registered mining consortium holding ten licensed
  concessions across seven districts of Gilgit Baltistan. Copper, antimony,
  placer gold, lead, nephrite jade, quartz and granite, supplied direct from
  our own licences.
- **Long (~600 chars):** Use the opening of `/about`, plus the four
  partnership routes from `/invest`.

### ~~Fix the dead LinkedIn link~~ (done)

The footer now links "LinkedIn" to a real personal profile
(`linkedin.com/in/zain-abbas1`), which is also emitted as `sameAs` on that
director's `Person` schema.

Still open: a **LinkedIn company page**, which is a different thing. A
personal profile cannot serve as the `Organization`'s `sameAs`, so that
field stays empty until a company page exists. That is item one in §1.

---

## 1. Business identity (do first, roughly one day)

Foundational, fast, and the base every other listing is checked against.

| Platform | What to do | Notes |
|---|---|---|
| **LinkedIn company page** | Create under the legal name. Add the boilerplate, logo, address, website link. Then have each director link their personal profile to it as current employer. | Highest value item here. The director profiles are what make the company page look real rather than parked. Directors are already named on `/about`. |
| **Google Business Profile** | Create if, and only if, the Gilgit office is a genuine staffed location you are willing to have customers visit. | ⚠️ Be careful. GBP requires a real business location and Google does verify. A mining operator with a small office is legitimately listable; do not list concession sites as locations. If the office is not customer-facing, consider a service-area business instead, or skip. |
| **Crunchbase** | Free profile. Company overview, founding, sector, website. | Frequently cited by AI answer engines when asked about a company. Worth it for GEO alone. |
| **Dun & Bradstreet** | Request a D-U-N-S number. Free, though slow. | Matters for institutional credibility, not SEO. Large investors and Gulf sovereign-linked funds often check. |

**Once these exist**, come back and add them to the `Organization` schema as
`sameAs` entries. That is the on-site half of citation building, and it tells
Google these profiles are the same entity as the site. Ask and it can be
wired in quickly.

---

## 2. B2B marketplaces (revenue channel, treat SEO as a bonus)

These are where mineral buyers, particularly Chinese buyers, genuinely
search. Judge them on enquiries, not links.

**Priority order for this business:**

1. **Alibaba** — largest buyer pool for minerals and stone. Paid membership
   for anything serious. Expect to be contacted by traders before end buyers.
2. **Made-in-China** — strong specifically for Chinese-side sourcing.
3. **go4WorldBusiness** — decent free tier, genuinely used in minerals.
4. **TradeKey** — Pakistan-based, low friction, moderate quality.
5. **TradeWheel** — similar tier to TradeKey.

**How to list well.** Most mineral listings on these platforms are terrible,
which is your advantage. For each commodity you actually sell:

- List the commodity, not the company. Seven listings, one per commodity,
  each mapped to a `/commodities/*` page.
- Lead with the trade terms already on those pages: FOB Karachi or CIF,
  L/C at sight or SBLC, assay and SGS inspection available, trial shipment
  before monthly offtake. This is the vocabulary buyers filter on.
- State plainly that you are the licence holder, not a trading
  intermediary. Almost every competing listing is a middleman. Say so.
- Do not publish grades or assay figures you cannot evidence. Buyers on
  these platforms test claims quickly, and a failed assay ends the
  relationship permanently.

**Expect:** volume of low-quality enquiries, a lot of "send me your best
price" with no company behind it. Qualify hard. One real offtake contract
justifies the whole channel.

---

## 3. Industry directories and trade bodies (high trust, low volume)

This is where the genuinely valuable citations are, because the domains are
institutional rather than commercial.

### Pakistan trade bodies — do these

| Body | Why |
|---|---|
| **TDAP** (Trade Development Authority of Pakistan) | Exporter registration. Government domain, real authority, and it puts you on lists that foreign trade missions actually read. |
| **SMEDA** | Small and medium enterprise development authority. Directory listing plus genuinely useful export guidance. |
| **Board of Investment** | Relevant given the whole `/invest` and `/markets` positioning. |
| **Gilgit-Baltistan Chamber of Commerce** | Regional credibility, and a plausible route to local press. |

These take paperwork rather than money, and they are worth more than any
marketplace link.

### Mining industry directories

Mining.com, InfoMine / Mining Intelligence, MiningLink, Glodex. Lower
priority than the trade bodies. Free listings where available; be sceptical
about paid "premium listings" in this category, which rarely pay back.

### The one to skip

`docs/SEO-PLAN.md` originally listed the Gilgit-Baltistan government
title-holder registry as a target. That was checked, the entity does not
appear on it under any name tried, and per your direction it was closed as
not worth pursuing. Leaving it noted here so nobody reopens it by accident.

---

## 4. PR and journalist outreach (highest leverage, real effort)

**Why this is the item that matters.** Everything above is a listing. This is
the only channel that produces editorial links from domains with actual
authority, and the conditions for it are unusually good right now:

- Pakistan critical minerals is a live news beat. The $500M US Strategic
  Metals partnership, Saudi Arabia's Reko Diq stake pursuit, and the April
  2026 Pakistan Minerals Investment Forum are all being actively covered.
- Journalists writing those stories need operator-level detail, and almost
  nobody publishes it. Government sources publish policy. Analysts publish
  commentary. You hold licence numbers, areas, districts and access routes.
- You already have the asset built: the **GB Mineral Corridor Report 2026**
  at `/reports/gb-mineral-corridor-report-2026.pdf`, which exists precisely
  for this and **has not been sent to a single person yet**.

### How to actually do it

1. **Build a list of 15 to 25 named journalists.** Not outlets, people.
   Search recent coverage of "Pakistan critical minerals", "Reko Diq",
   "Pakistan mining investment" from the last six months and note the
   bylines. Mix of: Pakistani business press (Dawn Business, Business
   Recorder, Profit), regional Gulf outlets (AGBI, Arab News), and mining
   trade press (Mining.com, Mining Journal, S&P Global Commodity Insights).
2. **Pitch a fact, not the company.** Nobody covers "mining company launches
   website". They will cover a specific claim you can evidence. For example:
   the gap between Gilgit Baltistan's 43,000 sq km of mining area and the
   roughly 1,840 sq km actually under exploration licence. That is a story
   with a number in it.
3. **Keep it to five sentences.** What the data is, why it is not public
   elsewhere, that the report is attached, that you can speak on record,
   and one line of who you are. No attachments larger than the PDF.
4. **Offer the site visit.** You arrange NOCs and security permissions
   already. For a journalist covering this beat remotely, physical access
   to a licensed concession in Gilgit Baltistan is a genuinely scarce
   offer and worth leading with for the right outlet.
5. **Respond fast when contacted.** Same day. The beat moves.

**Realistic outcome:** two or three placements from twenty-five pitches is a
good result, and two or three editorial links from real news domains will do
more for the domain than every directory in §2 and §3 combined.

### Secondary, lower effort

- **Industry commentary.** When a Pakistan minerals story breaks, publish a
  short, sourced take on `/news` within a day or two, then send it to the
  journalists who covered it. This is how you become a source rather than
  a cold pitch. The two most recent articles on the site already follow
  this pattern and can be used as the template.
- **The forum in April 2026.** The Pakistan Minerals Investment Forum in
  Islamabad is the single densest concentration of relevant press and
  investors in the calendar. Worth planning around properly rather than
  attending casually.

---

## 5. What not to do

Worth stating explicitly, because you will be pitched all of it:

- **Do not buy backlinks**, guest post packages, or "500 directory
  submissions" gigs. These are the cheapest way to get a site actively
  penalised, and recovery is much harder than the original problem.
- **Do not use AI-generated guest posts** on low-quality blogs. Same
  outcome, newer wrapper.
- **Do not create multiple company entities** to cross-link. You have three
  legitimate registered companies; linking them where genuinely relevant is
  fine, building a link network is not.
- **Do not list concession sites as separate business locations** on Google
  Business Profile. They are not staffed premises and this violates GBP
  guidelines.
- **Do not chase the government department's rankings.** Already established
  in §0 of the SEO plan: `minesandmineralsgb.gog.pk` will win its own name,
  those are informational queries anyway, and competing is wasted effort.

---

## 6. How to know if it is working

Check monthly, not weekly. Off-site work has a long lag.

| Signal | Where | What good looks like |
|---|---|---|
| Indexed page count | GSC → Pages | 24 "Discovered, not indexed" shrinking |
| Referring domains | Bing Webmaster Tools (free backlink data) | Any growth from institutional or news domains |
| Branded search | GSC → Performance, filter to "durr", "zircon", "gbmines" | Impressions appearing at all, then rising |
| Enquiry source | Ask every enquiry how they found you | Tells you which channel in §2 actually pays |
| AI answer engines | Ask ChatGPT / Perplexity "licensed mining operators Gilgit Baltistan" | Being named at all. `llms.txt` supports this. |

The GA4 `generate_lead` event now fires on both enquiry forms, so once
traffic arrives you can see which pages produce enquiries rather than
guessing.

---

## Suggested first two weeks

1. Lock the boilerplate (§0). The NAP itself is now set in `SITE.address`
   and rendered site-wide; the three description lengths still need writing.
2. LinkedIn **company** page plus director profiles (§1). One day. The
   personal profile is already linked; the company page is what unlocks
   `sameAs` on the `Organization`.
3. Crunchbase (§1). One hour.
4. TDAP and SMEDA registration started (§3). Paperwork, so start early.
5. Build the journalist list (§4). Half a day, and it is the highest-value
   half day in this document.
6. Send the first five pitches with the Mineral Corridor Report attached.

Everything else can follow. If only one item on this page gets done, make
it §4.
