# Design Handoff: Roomies — Chaos Happens Homepage

This is the design/content specification for the chaoshappens.com marketing homepage — carried over from the original design handoff bundle. It documents *what* the site should look like and *how* it should behave; see [README.md](README.md) for how to run, build, and test the actual implementation, and [CLAUDE.md](CLAUDE.md) for the architecture that implements this spec.

## Overview
Marketing homepage for the board game **Roomies: Chaos Happens** (domain: chaoshappens.com). Introduces the game, its rules, characters and status ("prototype done, looking for first sales"), links to social media, and collects emails for a launch waitlist. Content is trilingual: English, Spanish, Russian.

## About the Design Files
The bundled HTML file (`Roomies Home.dc.html`) is a **design reference** built in a proprietary prototyping format (a "Design Component" with inline styles and a small custom templating syntax — `{{ }}` holes, `<sc-for>`, `<sc-if>`). **It is not production code and was not copied as-is.** Treat it as a precise visual/interaction spec that the real implementation (under `app/` and `components/`) recreates using standard React/Next.js.

`assets/content.js` is NOT a prototyping artifact — it's a plain JS object holding all copy in EN/ES/RU. It was the source of truth for content and translation keys when migrating to `content/<locale>.json` (see `lib/content.ts`).

## Fidelity
**High-fidelity.** Colors, type, spacing, copy and layout in the HTML file are final for this round — the implementation recreates them pixel-close using the exact values below rather than approximating.

## Architecture used
See `CLAUDE.md` for the actual stack and `.claude/knowledge/decisions.md` for the ADR log. Summary of what was decided from the options originally considered here:
- **Framework**: Next.js (App Router, static-first), deployed on Vercel.
- **Content**: `content/en.json`, `content/es.json`, `content/ru.json` — one key tree per language, mirroring `assets/content.js`'s structure, loaded via `lib/content.ts`.
- **Admin/editing**: Decap CMS (git-based), writing straight back to `content/*.json`.
- **Email capture**: MailerLite via a Route Handler (`/api/notify`), with a weekly export job as an owner-controlled backup — not `localStorage` as in the prototype.
- **Images**: The 4 real photos ship as static assets under `public/assets/`; the gallery's extra slots are simple placeholder tiles rather than the prototype's interactive drag-drop widget.

## Screens / Sections (single page, in order)
1. **Header/Nav** — sticky, white/blur background, logo left, section links (About, Roomies, How to play, Gallery, Watch, Contact) center-right, EN/ES/RU switcher + orange "Notify me" pill button on the far right.
2. **Hero** — two-column: left = status badge, logo lockup, pitch paragraph, 3 fact pills (players/age/learn-difficulty), 2 CTAs (Notify me / Watch on TikTok); right = photo of the 4 character standees with two rotated color blobs behind it (yellow + light blue).
3. **Status banner** — full-width dark (#2A2440) band: kicker, headline, body copy, "Get in touch" button linking to Contact. States: prototype finished, seeking partners for first production run.
4. **About / The idea** — two-column: left = board photo on a rotated green blob; right = kicker, headline, 2 paragraphs, pull-quote in pink left-border.
5. **The 5 Needs** — white section, 5-column card grid (Sleep, Food, Hygiene, Fun, Social), each with a colored circular icon badge, name, one-line description.
6. **Meet the Roomies** — kicker/headline/intro, full-width photo of all 4 characters, then 4-column card grid (Max/Lena/Igor/Anya) each with a top color accent bar, name, role, one-line bonus description; small note below the grid.
7. **How to play** — off-white→white section, 4-step numbered card grid (Pick a character / Move & act / Fulfill your needs / Chaos Happens), plus a row of fact pills below.
8. **Gallery** — 3-column CSS masonry (column-count) of game photos; some slots are placeholders for more photos.
9. **Media** — 2-column: TikTok card (dark gradient, always active link) and YouTube card (light card, active link) — both open in new tab.
10. **Notify me** — full-width pink/orange gradient rounded panel: kicker, headline, body, email input + button (client-side validated), success state replaces the form on submit, privacy microcopy below.
11. **Contact** — 3-column info cards: Email (mailto link), Location (Buenos Aires, Argentina — no link), Social (TikTok link).
12. **FAQ** — single-column accordion, 5 Q&As, +/– toggle icon, one open at a time.
13. **Footer** — dark band: logo on white chip, tagline, TikTok + email links, copyright line + "Made in Buenos Aires" line.

## Interactions & Behavior
- **Language switcher**: 3-way toggle (EN/ES/RU) in header, persists to `localStorage` (`roomies_lang`), swaps all copy instantly, defaults to `en`. Implemented in `components/LanguageSwitcher.tsx` + `lib/locale-context.tsx`.
- **Nav links**: anchor scroll (`scroll-behavior: smooth`, `scroll-padding-top: 88px` to clear sticky header).
- **Email form**: client validates simple email regex on submit; on success shows a success message in place of the form. Invalid input shows an inline error pill and does not clear the field. (Currently a client-side stub in `components/NotifyForm.tsx` — wiring to the real `/api/notify` → MailerLite endpoint is a separate, later issue.)
- **FAQ accordion**: clicking a question toggles it open/closed; only one open at a time (accordion, not multi-expand).
- **Hover states**: buttons/cards lift slightly (`translateY(-2px to -6px)`) with a shadow; nav links get a light background tint on hover.
- No page transitions; single scrolling page, no client-side routing needed.

## State Management
Minimal — this is a static marketing page:
- Current language (persisted).
- Email input value + submitted/error flags for the notify form.
- FAQ open-item index.
No auth or user accounts needed for the public page. The admin/CMS layer (Decap CMS) manages its own auth separately.

## Design Tokens

**Colors**
- Background (page): `#FFF8EF`
- Text (body): `#2A2440` (also used as dark section background)
- Body copy (secondary): `#5B5470` / `#6B6480`
- Muted/tertiary text: `#A59CB3` / `#8A8199`
- Card/section borders: `#F0E6D8`
- Card fill (off-white): `#FFFBF5`
- Brand orange (primary CTA): `#FF7A1A`, hover shadow `#D9610C`
- Brand pink (accent): `#FF4FA3`
- Brand yellow (accent): `#FFC83D`, shadow `#C99A1C`
- Blue accent: `#34B3F1`
- Teal accent: `#2BC4B6`
- Green accent: `#8BC34A`
- Needs icon colors: Sleep `#34B3F1`, Food `#FF8A3D`, Hygiene `#2BC4B6`, Fun `#FFC83D`, Social `#FF4FA3`
- Character accent colors: Max `#FF5A3D`, Lena `#9B6BFF`, Igor `#2B9BD8`, Anya `#FFB020`

**Typography**
- Display/headings/labels/buttons: **Fredoka** (weights 500/600/700), via Google Fonts (`next/font/google`)
- Body copy: **Nunito** (weights 400/600/700/800), via Google Fonts (`next/font/google`)
- Section kicker: Fredoka 600, 13px, uppercase, letter-spacing 2px, colored per section
- H2 section headings: Fredoka 700, 34–36px, line-height ~1.12–1.15
- Body paragraphs: Nunito, 17px, line-height ~1.6, color `#5B5470`
- Hero pitch: Nunito 700(ish)/600, 19px, line-height 1.55

**Spacing / shape**
- Section vertical padding: 84px (desktop)
- Max content width: 1100–1200px depending on section
- Card border-radius: 18–28px; pill buttons/badges: full (999px) radius
- Card borders: 2px solid `#F0E6D8`
- Buttons: "pressed" look via solid bottom box-shadow offset (e.g. `0 6px 0 #D9610C`) instead of blur — a solid-color shadow, not a blurred one

## Assets
- `assets/logo.jpg` (design reference) / `public/assets/logo.jpg` (served) — Roomies logo lockup (used in header + hero + footer)
- `assets/family.jpg` / `public/assets/family.jpg` — photo of the 4 character standees together (hero + gallery)
- `assets/characters.jpg` / `public/assets/characters.jpg` — close-up of the 4 characters (character section + gallery)
- `assets/board.jpg` / `public/assets/board.jpg` — game board / prototype photo (About section + gallery)

All 4 are real product photography supplied by the game's creator — keep them, don't replace with placeholders unless new photography is supplied. Real dimensions (for `next/image` width/height props): logo/characters 1280×853, family 705×1280, board 1280×960.

## Content structure (source of truth: `content/<locale>.json`, migrated from `assets/content.js`)
- `lib/content.ts` exports `langs` (supported locales), `needsMeta` / `charsMeta` (shared, language-independent data — icon, brand color, stable `key` — for the 5 needs and 4 characters, code-owned per ADR-005), and `getContent(locale)` which reads `content/<locale>.json`.
- Each `content/<locale>.json` has one key per section (`nav`, `hero`, `status`, `about`, `needs`, `chars`, `howto`, `gallery`, `media`, `notify`, `contact`, `faq`, `footer`) — `needs.items.<key>` and `chars.items.<key>` map to the shared meta by key.

This shape separates "design constants" (colors/icons, code-owned) from "editable copy" (per-language text, CMS-owned): only the `content/<locale>.json` tree (and the gallery/notify email destination) is exposed as CMS-editable fields; `needsMeta`/`charsMeta` colors stay in code.

## Live links used
- TikTok: `https://www.tiktok.com/@roomies.show7`
- YouTube: `http://www.youtube.com/@ShowRoomies`
- Contact email: `info@chaoshappens.com`
- Location: Buenos Aires, Argentina

## Original handoff bundle contents
- `Roomies Home.dc.html` — the full design reference (single file, inline styles) — kept in the repo root, do not delete.
- `assets/content.js` — all EN/ES/RU copy (content schema source of truth, superseded by `content/*.json`)
- `assets/logo.jpg`, `assets/family.jpg`, `assets/characters.jpg`, `assets/board.jpg` — real product photography (mirrored into `public/assets/` for the live site)
- `screenshots/` — reference screenshots of each section (English, Cozy hero): `01-hero.png`, `02-about.png`, `03-characters.png`, `04-howto.png`, `05-gallery.png`, `06-media.png`, `07-notify.png`, `08-contact.png` (FAQ and footer follow directly after `08-contact.png` on the live page)
