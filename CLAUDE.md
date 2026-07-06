# CLAUDE.md — Roomies: Chaos Happens (chaoshappens.com)

## Project Overview

Trilingual (EN/ES/RU) marketing homepage for the board game **Roomies: Chaos Happens**. Recreates a high-fidelity design handoff (`Roomies Home.dc.html` + `README.md` + `assets/content.js`) as real, maintainable code — not a copy of the prototype file. Adds a git-based CMS so a non-technical owner can edit copy/images without touching code, and a waitlist email capture for the pre-launch audience.

**Current phase:** Phase 1 — build the production site from the design handoff (framework scaffold, content migration, CMS wiring, email capture, deploy). No code exists yet beyond the design reference bundle.

**GitHub repo:** `TBD` — not yet created; this folder is not yet a git repository.

---

## Task Workflow

This is the mandatory process for every new task, in order. Do not skip steps.

**Default: stay on the current task.** Only run this workflow (clarify → new GitHub issue → branch) when the user explicitly asks for a new task/issue. Follow-up requests that refine, extend, or fix something within the current change ("also do X", "fix this too") are work items on the **current** issue/branch — keep working there.

**For continuous work and bug fixes** (no task needed): if the user describes a bug or quick change without asking for a formal task, go straight to Step 3 after confirming the current branch. Still create a branch if on master.

### Step 1 — Clarify the task

Before creating any issue or writing code, ask clarifying questions one by one — wait for the answer:

1. **Goal** — what should be true when this task is done?
2. **Scope / restrictions** — what is out of scope? Any constraints?
3. **Tools / libraries** — any specific approach required or forbidden?
4. **Complexity** — simple (single PR) or complex (multi-PR)?

### Step 2 — Create GitHub issue(s)

Use `gh issue create` to create the issue.

#### Simple task → one issue
```
Title:  <verb phrase describing the outcome>
Body:
## Goal
<what we are building / fixing and why>

## Acceptance criteria
- [ ] <specific, testable condition>

## Technical notes
<constraints, files to touch, patterns to follow>
```

#### Complex task → parent + child issues
Create parent first (steps as acceptance criteria), then one child per step referencing `#<parent>`.

Label simple issues `task`. Label complex parent `epic`, child issues `task`.

### Step 3 — Implement

- **Always check current branch first:** `git branch --show-current`
- If on master, create a branch before touching any code.
- Branch naming: `{issue-number}-{short-description}` (e.g. `12-add-auth-middleware`)
- Once code is complete, run the **Verification & Review Pipeline** before handing back.
- Open a PR per issue: `Fix #<n>: <title>`.
- **The user manages all commits.** After changes, stop and state what files were changed. Do not run `git commit`.
- PRs and merges to master are done by the user.

```bash
git checkout master && git pull origin master
git checkout -b {issue-number}-{short-description}
```

---

## Git Workflow

- `master` is stable. **Never push directly.**
- Every task gets its own branch from latest master.
- Branch format: `{issue-number}-{short-description-2-5-words}`
- **No commits without user approval.**
- PRs and master merges: user only.

---

## Verification & Review Pipeline

Run automatically once code changes are complete, before handing back to user:

1. **Testing** — spawn `tester` agent (`.claude/agents/tester.md`). Run the project's test suite against changed files. Report failures. Fix before proceeding.

2. **User checkpoint** — present the change and let the user confirm it does what they wanted. Apply corrections before continuing.

3. **Static review** — spawn `code-reviewer` and `architect-reviewer` in parallel. Fix every CRITICAL/HIGH finding. Use judgement on MEDIUM.

4. **Final consistency pass** — read every file touched. Update CLAUDE.md and README.md if the change adds/changes a feature, env var, or workflow rule. Spawn `doc-keeper` to validate no drift in agent files.

5. **Report** — what changed, what each stage found, anything that couldn't be verified automatically.

Steps 1, 3, 4 are autonomous. Step 2 is the only user gate.

---

## Architecture

```
Visitor ──► /  (proxy.ts redirects to /en, /es, or /ru based on NEXT_LOCALE cookie, default en)
              └─► /[locale] (Next.js Server Component, statically generated per locale via generateStaticParams)
                    ├─ reads content/<locale>.json at build time
                    ├─ language switcher (client component, sets NEXT_LOCALE cookie, next/link to /[locale])
                    ├─ notify-me form (client component) ──► POST /api/notify (Route Handler) ──► MailerLite API
                    └─ FAQ accordion (client component) + FAQPage JSON-LD (schema.org, rendered server-side in Faq.tsx)

Vercel Cron (weekly) ──► /api/export-subscribers (Route Handler) ──► MailerLite API (GET subscribers)
                                                                  └─► writes CSV snapshot to backup storage
                                                                       (Google Sheet / cloud storage — TBD at implementation time)

Site owner ──► /admin (Decap CMS) ──► git commit to content/*.json ──► push ──► Vercel auto-deploy

DNS (Vercel Domains: chaoshappens.com)
  ├─ A/CNAME ──► Vercel hosting
  └─ MX/TXT ──► Zoho Mail (info@chaoshappens.com)
```

---

## Technology Stack

| Concern | Library / Tool | Rationale |
|---|---|---|
| Language | TypeScript 5 | Type safety across content schema, components, and route handlers |
| Framework | Next.js 14+ (App Router, static-first) | Fast static/ISR marketing site, easy Vercel deploy, Route Handlers cover the small amount of server logic needed |
| Content storage | `content/en.json`, `content/es.json`, `content/ru.json` (no DB) | Mirrors `assets/content.js`'s existing shape; git-versioned, CMS-writable, no infra to run |
| Domain | Vercel Domains (`chaoshappens.com`) | At-cost pricing, same dashboard as hosting, no markup vs. registrars |
| Hosting | Vercel | Native Next.js support, git-integration deploys |
| Email server | Zoho Mail (MX only, DNS via Vercel) | Real inbox for `info@chaoshappens.com`; Vercel itself never hosts email |
| Waitlist capture | MailerLite | Marketing-list tool (not just transactional) — supports later launch/newsletter sends; free tier to 1,000 subscribers |
| Subscriber backup | Weekly Vercel Cron job → CSV export | User-owned copy of emails, MailerLite is not the sole system of record |
| Admin/content editing | Decap CMS (git-based) | No DB/backend; commits straight to `content/*.json`; auth backend (git-gateway vs. GitHub OAuth) still TBD since host is Vercel, not Netlify |
| Testing | vitest + Playwright | Unit tests for content/validation logic, Playwright smoke tests for the interactive bits (form, switcher, accordion) |
| Linting | eslint + @typescript-eslint + prettier | Standard TS hygiene |
| CI/CD | Vercel git-integration deploys; Vercel Cron for the export job | No separate pipeline tool needed for a static site |

---

## Project Structure

```
roomes_site/
├── proxy.ts                      ← Next 16 "middleware": 307-redirects bare "/" to a locale via NEXT_LOCALE cookie
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx            ← root layout: generateStaticParams (en/es/ru), dynamicParams=false, generateMetadata (hreflang)
│   │   └── page.tsx              ← thin Server Component, renders HomeView
│   ├── robots.ts                 ← App Router convention: disallows /admin, /api
│   ├── sitemap.ts                ← App Router convention: 3 locale URLs with hreflang alternates
│   └── api/
│       ├── notify/route.ts       ← POST handler → MailerLite
│       └── export-subscribers/route.ts  ← weekly cron → CSV backup
├── components/
│   ├── HomeView.tsx              ← homepage content, all 13 sections, takes content/locale as props
│   ├── LanguageSwitcher.tsx
│   ├── NotifyForm.tsx
│   ├── FaqAccordion.tsx
│   └── sections/                 ← one component per section (Hero, About, Needs, Chars, HowTo, Gallery, Media, Notify, Contact, Faq, Footer)
├── content/
│   ├── en.json
│   ├── es.json
│   └── ru.json
├── lib/
│   ├── content.ts                ← loads/types the content JSON, needsMeta/charsMeta constants
│   ├── site.ts                   ← shared siteUrl/siteTitle constants (layout.tsx, robots.ts, sitemap.ts)
│   └── mailerlite.ts             ← MailerLite API client
├── public/
│   ├── admin/
│   │   ├── config.yml            ← Decap CMS collections (one per locale)
│   │   └── index.html
│   └── assets/                   ← logo.jpg, family.jpg, characters.jpg, board.jpg
├── vercel.json                   ← cron schedule for export-subscribers
├── Roomies Home.dc.html          ← design reference, do not delete
├── README.md                     ← design handoff doc, canonical section/token spec
├── .claude/
│   ├── agents/
│   └── knowledge/
└── CLAUDE.md
```

---

## Key Design Decisions

See `.claude/knowledge/decisions.md` for the full ADR log. Seeded with:

- **ADR-001**: Next.js (App Router, static-first) as the framework.
- **ADR-002**: Vercel Domains + Vercel hosting for `chaoshappens.com`.
- **ADR-003**: MailerLite for waitlist capture, with a mandatory weekly export to user-owned backup storage (MailerLite is not the system of record for emails).
- **ADR-004**: Zoho Mail for `info@chaoshappens.com`, DNS-only via Vercel (Vercel never hosts email itself).
- **ADR-005**: Decap CMS (git-based) for content editing; only the `t.<lang>` copy tree and gallery image array are CMS-editable — `needsMeta`/`charsMeta` (colors, icons, stable keys) stay in code.

---

## Key Code Patterns

TODO: fill these in as patterns emerge during development.

### Content loading
```typescript
// TODO: add canonical example — typed loader for content/<locale>.json
```

### Error handling
```typescript
// TODO: add error handling pattern for Route Handlers (MailerLite failures, validation errors)
```

### Logging
```typescript
// TODO: add logging pattern (likely minimal — static site, no request-heavy backend)
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `MAILERLITE_API_KEY` | Yes | Server-side only — used by `/api/notify` and `/api/export-subscribers` (both via `lib/mailerlite.ts`). Never expose to client bundle. |
| `MAILERLITE_GROUP_ID` | Yes | Target list/group in MailerLite for waitlist signups — used by `/api/notify` and `/api/export-subscribers`. |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Yes | Service account email for the weekly subscriber-export job (`lib/google-sheets.ts`) — used to sign the auth JWT. Not secret by itself, but kept server-side. |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | Yes | Service account private key (PEM), used to sign the JWT for Google Sheets API access. Server-side only, never expose to client bundle. Store with literal `\n` for newlines (Vercel env vars can't hold multi-line values cleanly) — `lib/google-sheets.ts` unescapes them. |
| `SUBSCRIBER_BACKUP_SPREADSHEET_ID` | Yes | The Google Sheet's ID (from its URL) that the weekly export appends new subscribers to. |
| `CRON_SECRET` | Yes | Random string Vercel automatically sends as `Authorization: Bearer <value>` when it triggers `/api/export-subscribers` — the route rejects any request without a matching header, so it can't be invoked by a guessed URL. |
| `DECAP_OAUTH_CLIENT_ID` | Yes | GitHub OAuth App's Client ID. Not secret, but kept server-side for simplicity — used by `app/api/auth`. |
| `DECAP_OAUTH_CLIENT_SECRET` | Yes | GitHub OAuth App's Client Secret. Server-side only — used by `app/api/auth/callback` to exchange the code for a token. Never expose to the client bundle. |

### Setting up Decap CMS's GitHub OAuth App

Decap CMS's `git-gateway` backend assumes Netlify Identity, which doesn't apply here (site is on Vercel) — see ADR-007 in `.claude/knowledge/decisions.md`. Instead, `public/admin/config.yml` uses the `github` backend with a self-hosted OAuth proxy (`app/api/auth`, `app/api/auth/callback`), so a GitHub OAuth App must be created once, by the repo owner:

The domain (`chaoshappens.com`) is already purchased through Vercel Domains (ADR-002) — this just needs the Vercel project deployed and the domain attached to it first (see the Vercel deploy issue in Phase 2+ Planning below).

1. In GitHub: **Settings → Developer settings → OAuth Apps → New OAuth App**.
2. **Homepage URL**: `https://www.chaoshappens.com` (the bare domain 308-redirects to `www` — use the `www` host consistently, matching `public/admin/config.yml`'s `base_url`).
3. **Authorization callback URL**: `https://www.chaoshappens.com/api/auth/callback` (must match exactly, including scheme/host — GitHub OAuth Apps also accept `http://localhost:<port>/api/auth/callback` if you want to test the flow locally before the real deploy is live; `public/admin/config.yml`'s `base_url` would need to match whichever one you test against).
4. Create the app, copy the **Client ID**, generate and copy a **Client Secret**.
5. Set `DECAP_OAUTH_CLIENT_ID` and `DECAP_OAUTH_CLIENT_SECRET` as environment variables on Vercel (Project Settings → Environment Variables) — never commit them.
6. Visit `/admin` on the deployed site and log in with GitHub.

### Setting up MailerLite for the waitlist

`/api/notify` (`app/api/notify/route.ts`, `lib/mailerlite.ts`) needs a MailerLite account with an API key and a group to add subscribers to — one-time setup for the repo owner:

1. Create a MailerLite account (free tier covers up to 1,000 subscribers, per ADR-003).
2. Create a group for the waitlist (e.g. "Roomies waitlist") — copy its **Group ID** from its settings/URL.
3. Generate an API key: **Integrations → MailerLite API → Generate new token**. Copy it immediately — MailerLite doesn't store it in plain text and won't show it again.
4. Set `MAILERLITE_API_KEY` and `MAILERLITE_GROUP_ID` as environment variables on Vercel — never commit them.
5. In MailerLite, create an **Automation** triggered by "subscriber joins group" for the waitlist group, with a welcome/confirmation email — this is how the confirmation email is sent; `/api/notify` only adds the subscriber to the group, it does not send email itself.
6. Test via the live `/notify` section: submit an email, confirm it appears in the MailerLite group and the automation email arrives.

### Setting up the weekly subscriber export (Google Sheets)

`/api/export-subscribers` (`app/api/export-subscribers/route.ts`, `lib/google-sheets.ts`) pulls every MailerLite subscriber weekly and appends any not already recorded to a Google Sheet — closing ADR-003's "MailerLite isn't the sole system of record" requirement. One-time setup for the repo owner:

1. Create (or reuse) a Google Cloud project, then enable the **Google Sheets API** for it (APIs & Services → Enable APIs → search "Google Sheets API").
2. Create a **service account** (IAM & Admin → Service Accounts → Create Service Account) — no special role needed, access is granted per-sheet in step 4.
3. Create a JSON key for the service account and download it. From the JSON: copy `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`, and `private_key` → `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` (keep the `\n` sequences as literal two-character escapes when pasting into Vercel's env var UI).
4. Create the Google Sheet itself (any file name), add a header row (`email`, `subscribed_at`) to row 1, then **Share** it with the service account's `client_email` as an **Editor**. **Don't rename the sheet's tab** from its default `Sheet1` — `lib/google-sheets.ts` hardcodes that tab name in its cell ranges; renaming it will make the export job fail with a generic error.
5. Copy the Sheet's ID from its URL (`https://docs.google.com/spreadsheets/d/<SPREADSHEET_ID>/edit`) → `SUBSCRIBER_BACKUP_SPREADSHEET_ID`.
6. Generate a random secret (16+ characters, e.g. from a password generator) → `CRON_SECRET`.
7. Set `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`, `SUBSCRIBER_BACKUP_SPREADSHEET_ID`, and `CRON_SECRET` as environment variables on Vercel — never commit them.
8. Redeploy so `vercel.json`'s cron schedule (`/api/export-subscribers`, weekly on Mondays) takes effect — check **Project Settings → Cron Jobs** to confirm it's registered.
9. To test before waiting a week: manually `curl -H "Authorization: Bearer <CRON_SECRET>" https://www.chaoshappens.com/api/export-subscribers` and confirm new rows land in the Sheet.

---

## Test Strategy

Framework: **vitest + Playwright**

- **Unit tests:** content-loading/formatting helpers, notify-form email validation logic, FAQ JSON-LD structural correctness and script-injection safety (`Faq.test.tsx`)
- **E2E/smoke tests (Playwright):** one per locale — page loads, language switch works, notify form submits (mock MailerLite), FAQ accordion toggles
- **Run:** `npm run test`
- **Coverage target:** not a hard gate for this profile — prioritize testing the interactive logic (form, switcher, accordion) over exhaustive unit coverage of static markup
- TDD is optional here, not mandatory — fine to build the visual layout first and add tests around the interactive/logic pieces after

---

## Knowledge Base

See `.claude/knowledge/` for:
- `decisions.md` — Architecture Decision Records (ADRs)
- `patterns.md` — code conventions and patterns
- `references.md` — links to official docs

---

## Phase 2+ Planning

TODO: fill in as the project evolves. Known open items:
- Vercel deploy — the domain (`chaoshappens.com`) is already purchased through Vercel Domains, but no Vercel project has been created/connected to the repo yet, so the site isn't live. Tracked as a GitHub issue; blocks finishing the Decap CMS OAuth setup (GitHub's OAuth redirect needs a real, reachable callback URL).
- Zoho Mail MX/TXT DNS records for `info@chaoshappens.com` (ADR-004) — not required for the site or CMS to work, can happen any time after the Vercel deploy.
- Gallery images aren't CMS-editable yet — `content/<locale>.json` has no image array for the gallery section; adding one is a separate, later issue if the owner needs to swap gallery photos without a code change.
- Favicon (`app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`) is a placeholder — cropped programmatically from `public/assets/logo.jpg`'s mascot pillow shape. Owner is generating a proper standalone icon separately; swap these three files when it's ready (no code changes needed beyond replacing the files).

Resolved:
- ~~Decide Decap CMS auth backend~~ — GitHub OAuth via a self-hosted Vercel proxy (`app/api/auth`), see ADR-007 and the setup steps above.
- ~~Create the GitHub repo~~ — done (`Andrei-Danilin/roomies-game`).
- ~~Purchase the domain~~ — done (`chaoshappens.com`, via Vercel Domains).
- ~~Wire up MailerLite waitlist capture~~ — `POST /api/notify` → MailerLite via `lib/mailerlite.ts`, see the setup steps above.
- ~~Subscriber export cron~~ — `/api/export-subscribers` weekly job appends new MailerLite subscribers to a Google Sheet via `lib/google-sheets.ts`; destination decided (Google Sheet), see the setup steps above and ADR-003's amendment.
