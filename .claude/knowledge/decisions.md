# Architecture Decision Records — chaoshappens.com

## ADR-001: Framework — Next.js (App Router, static-first)
**Date:** 2026-07-05
**Status:** Accepted
**Context:** Need a fast, simple-to-deploy marketing site recreating a high-fidelity design handoff, trilingual, with a small amount of server logic (email capture, a cron export job) and a git-based CMS on top.
**Decision:** Use Next.js 14+ with the App Router, static-first/ISR rendering, Route Handlers for the minimal server logic needed.
**Consequences:** No general backend/API layer to maintain; deploys natively to Vercel; Server/Client Component split needs discipline to keep the client bundle small (only the language switcher, notify form, and FAQ accordion need to be client components) — amended by ADR-006 for `app/page.tsx` itself, which also needs to be a Client Component so the language switch can re-render all sections without a full page reload.

## ADR-002: Domain + hosting — Vercel Domains + Vercel
**Date:** 2026-07-05
**Status:** Accepted
**Context:** Needed to pick where to buy `chaoshappens.com` and where to host the site.
**Decision:** Buy the domain directly through Vercel Domains (at-cost pricing, no markup, same renewal price as first year) and host on Vercel.
**Consequences:** One dashboard for domain + hosting + DNS. Vercel does not provide email hosting — MX/TXT records must point elsewhere (see ADR-004).

## ADR-003: Waitlist email capture — MailerLite + mandatory weekly backup export
**Date:** 2026-07-05
**Status:** Accepted
**Context:** Considered Resend (transactional-only, needs custom DB), Mailchimp, ConvertKit, and MailerLite for capturing "notify me at launch" signups. The user also wants subscriber emails not to live solely inside any single third-party tool, for data-security reasons.
**Decision:** Use MailerLite as the capture/list tool (real marketing-list features, free tier to 1,000 subscribers, useful later for launch/newsletter sends) — but treat it as the sending tool only, not the system of record. Build a weekly scheduled job (Vercel Cron) that pulls the subscriber list via MailerLite's API and writes a CSV snapshot to storage the user controls.
**Consequences:** Requires an extra Route Handler (`/api/export-subscribers`) and a decision (still open) on where the CSV backup actually lands (Google Sheet, cloud storage, etc.). MailerLite API key must stay server-side only.

## ADR-004: Email server — Zoho Mail (DNS-only via Vercel)
**Date:** 2026-07-05
**Status:** Accepted
**Context:** Needed a real inbox for `info@chaoshappens.com`, not just forwarding. Vercel itself does not provide email hosting regardless of where the domain was purchased.
**Decision:** Use Zoho Mail for the mailbox; point MX/TXT records at Zoho from Vercel's DNS panel.
**Consequences:** Domain purchase (Vercel) and email hosting (Zoho) are two separate services joined only by DNS records — this is expected and required, not a workaround.

## ADR-005: Admin/content editing — Decap CMS (git-based)
**Date:** 2026-07-05
**Status:** Accepted
**Context:** Non-technical site owner needs to edit copy/images without touching code. Considered Decap CMS, TinaCMS, and a custom password-protected `/admin` page.
**Decision:** Use Decap CMS. Config at `public/admin/config.yml` + `public/admin/index.html`, one collection per locale (`en`, `es`, `ru`), fields mirroring the `content/<locale>.json` structure exactly. Only the `t.<lang>` copy tree and the gallery image array are CMS-editable — `needsMeta`/`charsMeta` (colors, icons, stable keys) stay in code.
**Consequences:** No database or custom backend needed for content editing; edits commit straight to the repo and redeploy via Vercel's git integration. Open item: Decap's default auth backend assumes Netlify (git-gateway + Netlify Identity) — since the site is hosted on Vercel, must confirm and wire either a GitHub OAuth app or an alternative backend (e.g. `sveltia-cms-auth`) before the CMS is usable. Not yet decided — tracked as an open item in CLAUDE.md's Phase 2+ Planning.

## ADR-006: Language switching — client-side Context over the whole page, all locale JSON shipped to the client
**Date:** 2026-07-05
**Status:** Accepted
**Context:** Issue #5 requires switching EN/ES/RU instantly (no page reload), persisted to `localStorage` (`roomies_lang`), while `content/<locale>.json` for all three locales already ships in `lib/content.ts`'s static imports (decided in issue #3). Two options: (a) keep `app/page.tsx` a Server Component and drive the switch via locale-prefixed routes (`/es`, `/ru`) with a client-side navigation on switch, re-rendering fully server-side per locale; (b) make `app/page.tsx` a Client Component reading locale from a Context (`lib/locale-context.tsx`) and re-render the same section tree with different `content` props, no navigation.
**Decision:** Went with (b). All 13 section components stay plain, hook-free function components (they'd work fine as Server Components if imported from one) — the only reason they end up in the client bundle is that their parent, `app/page.tsx`, needs `useContent()` to swap locale without a reload. All three locales' JSON (a few KB each) travel in the client bundle so the switch is instant with no fetch.
**Consequences:** Amends ADR-001's "only the switcher/notify-form/FAQ-accordion are client components" rule — the root page is now a Client Component too, so the whole homepage's JS ships to the client for hydration instead of only the interactive fragments. Accepted for a single low-traffic marketing page where instant, no-refetch language switching (explicitly required by issue #5) outweighs the bundle-size cost. If the page grows heavier sections later, revisit option (a) (locale-prefixed routing) to restore full server rendering per locale.
