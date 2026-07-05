# Code Patterns & Conventions — chaoshappens.com

## Language conventions
- One component per homepage section under `components/sections/` (`Header.tsx`, `Hero.tsx`, `Status.tsx`, `About.tsx`, `Needs.tsx`, `Chars.tsx`, `HowTo.tsx`, `Gallery.tsx`, `Media.tsx`, `Notify.tsx`, `Contact.tsx`, `Faq.tsx`, `Footer.tsx`), each taking `{ content: Content }` (from `lib/content.ts`) as its prop and rendering that locale's copy — no hardcoded strings, no hooks of their own.
- Interactive fragments (`components/NotifyForm.tsx`, `components/FaqAccordion.tsx`, `components/LanguageSwitcher.tsx`) are the only components with their own `'use client'` + local state; they take a narrower prop (e.g. `Content['notify']`) rather than the whole `Content` tree.
- Design tokens (fonts, shared colors) live in `lib/theme.ts` (`fontDisplay`, `fontBody`, `colors.*`) — import these instead of repeating string literals like `'Fredoka, sans-serif'` across section files. Per-section accent colors that appear once (e.g. a section's kicker color) stay inline; only repeated tokens belong in `lib/theme.ts`.
- `needsMeta` / `charsMeta` (icons, brand colors, stable keys) stay in `lib/content.ts`, never in `content/<locale>.json` — components merge them with per-locale copy by `key` at render time (see Needs.tsx, Chars.tsx).

## Client/server boundary
- Server Components by default. `app/page.tsx` is the one exception at the page level — it's `'use client'` because it reads the visitor's locale via `useContent()` (`lib/locale-context.tsx`) and needs to re-render all sections on language switch without a full reload. See ADR-006 in `decisions.md` for why, and its tradeoffs.
- `lib/locale-context.tsx`'s `LocaleProvider` hydrates the persisted locale via `useSyncExternalStore` (not `useEffect` + `setState`) — this avoids both an SSR/CSR text mismatch and the `react-hooks/set-state-in-effect` lint rule. It also syncs `document.documentElement.lang` in a `useEffect`, which is legitimate there since it's synchronizing React state with a DOM attribute outside React's tree, not calling `setState`.

## Error handling pattern
TODO: how Route Handlers (`/api/notify`, `/api/export-subscribers`) surface MailerLite/Zoho/export failures to the client vs. logs.

## Logging pattern
TODO: likely minimal for a static site — decide if Route Handlers need structured logging at all, or just console output visible in Vercel's function logs.

## Content-loading pattern
`lib/content.ts` statically imports all three `content/<locale>.json` files and exposes `getContent(locale)`, which falls back to `defaultLocale` ('en') for an unrecognized locale string. `needsMeta`/`charsMeta` are exported alongside as code-owned constants; components join them to a locale's `content.needs.items[key]` / `content.chars.items[key]` by the shared `key`.

## Testing pattern
- Unit (vitest + Testing Library): render a component/hook and assert on visible text/roles — see `lib/content.test.ts` (pure data), `lib/locale-context.test.tsx` (hook + persistence via a small probe component), `app/page.test.tsx` (full page, wrapped in `<LocaleProvider>` since `Home` now needs that context).
- `vitest.setup.ts` must call `cleanup()` in an `afterEach` — this project's `vitest.config.ts` doesn't set `globals: true`, so Testing Library's automatic cleanup doesn't self-register; without it, multiple tests in one file leak DOM nodes into each other.
- E2E (Playwright): `e2e/home.spec.ts` (page loads, key content visible), `e2e/language-switcher.spec.ts` (switching locale updates visible copy and persists across reload, for each non-default locale plus the no-preference default). Playwright's own dev server runs on port 3100 (`playwright.config.ts`) to avoid colliding with anything already on 3000/3001.
