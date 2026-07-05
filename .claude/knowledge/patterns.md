# Code Patterns & Conventions — chaoshappens.com

Stub — fill in as real patterns emerge during development. Headers match the stack (TypeScript / Next.js, no database).

## Language conventions
TODO: canonical examples once components exist (naming, file layout per section, props typing from `content/<locale>.json`).

## Error handling pattern
TODO: how Route Handlers (`/api/notify`, `/api/export-subscribers`) surface MailerLite/Zoho/export failures to the client vs. logs.

## Logging pattern
TODO: likely minimal for a static site — decide if Route Handlers need structured logging at all, or just console output visible in Vercel's function logs.

## Content-loading pattern
TODO: canonical typed loader for `content/<locale>.json`, and how `needsMeta`/`charsMeta` (code-owned constants) get merged with CMS-owned copy at render time.

## Testing pattern
TODO: canonical vitest unit test example (e.g. notify-form validation) and canonical Playwright smoke test example, once the first ones are written.
