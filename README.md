# Roomies: Chaos Happens — chaoshappens.com

Trilingual (EN/ES/RU) Next.js marketing homepage for the board game **Roomies: Chaos Happens**.

- Design/content spec: [DESIGN.md](DESIGN.md)
- Architecture, tech stack, task workflow: [CLAUDE.md](CLAUDE.md)

## Prerequisites
- Node.js 20+
- npm

## Install

```bash
npm install
```

## Run the site locally

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000) (hot reload on save).

## Build & run production

```bash
npm run build
npm run start
```

## Checking the site

| Check | Command | What it covers |
|---|---|---|
| Type check | `npx tsc --noEmit` | TypeScript across the whole project |
| Lint | `npm run lint` | ESLint (Next.js + TypeScript + React hooks rules) |
| Format check | `npm run format:check` | Prettier |
| Unit tests | `npm run test` | vitest + Testing Library — content loader, locale context, component rendering |
| Unit tests (watch) | `npm run test:watch` | Same, in watch mode |
| E2E / smoke tests | `npm run test:e2e` | Playwright — page loads, language switcher, per the project's [test strategy](CLAUDE.md#test-strategy) |
| Production build | `npm run build` | Next.js build — catches build-time/type errors static dev mode won't |

Run all of the above before opening a PR. `npm run test:e2e` starts its own dev server on port 3100 (see `playwright.config.ts`) so it won't collide with anything already running on 3000.

## Project structure

See [CLAUDE.md's Project Structure section](CLAUDE.md#project-structure) for the full layout. Quick orientation:

- `app/page.tsx` — the single scrolling homepage, composes all 13 sections from `components/sections/`
- `content/{en,es,ru}.json` — all site copy, loaded via `lib/content.ts`
- `lib/locale-context.tsx` — client-side language state (persisted to `localStorage`)
- `public/assets/` — served product photography (logo, family, characters, board)

## Environment variables

Not required yet for local dev — the notify form and language switcher work without any API keys. See [CLAUDE.md's Environment Variables section](CLAUDE.md#environment-variables) for what's needed once the MailerLite integration (`/api/notify`) lands.

## Contributing / task workflow

This repo follows a strict task workflow (clarify → GitHub issue → branch → implement → review). See [CLAUDE.md](CLAUDE.md) for the full process before starting new work.
