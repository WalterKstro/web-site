# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

This project uses the Payload CMS skill at `.claude/skills/payload/`.
Start with `.claude/skills/payload/SKILL.md` for a quick reference, then see `.claude/skills/payload/reference/` for detailed docs.

## Commands

```bash
pnpm dev                    # Start dev server at http://localhost:3000
pnpm build                  # Production build (runs next-sitemap postbuild)
pnpm start                  # Serve production build
pnpm lint                   # ESLint check
pnpm lint:fix               # ESLint auto-fix

# Testing
pnpm test:int               # Integration tests (Vitest, tests/int/**/*.int.spec.ts)
pnpm test:e2e               # E2E tests (Playwright, tests/e2e/)
pnpm test                   # Both int + e2e

# Payload CLI
pnpm payload migrate:create # Create a new DB migration
pnpm payload migrate        # Run pending migrations
pnpm generate:types         # Regenerate src/payload-types.ts
pnpm generate:importmap     # Regenerate Payload admin import map
```

## Architecture

This is a **Payload CMS 3.x + Next.js 16 monolith** — the Payload backend and Next.js frontend run as a single Next.js app. The app router has two route groups:

- `src/app/(payload)/` — Payload admin panel and API routes (`/admin`, `/api`)
- `src/app/(frontend)/` — Public website (`/`, `/posts`, `/search`, `/(sitemaps)`)

**Database:** PostgreSQL via `@payloadcms/db-postgres`. In development, `push: true` applies schema changes without migrations. For production, always create and run migrations explicitly.

**Payload config** lives at `src/payload.config.ts`. Collections: `Pages`, `Posts`, `Media`, `Categories`, `Users`. Globals: `Header`, `Footer`.

**Layout builder** (`src/blocks/`): Pages and Posts use Lexical rich text plus draggable blocks — `ArchiveBlock`, `Banner`, `CallToAction`, `Code`, `Content`, `Form`, `MediaBlock`, `RelatedPosts`. Each block has a `config.ts` (Payload field definition) co-located with its React component.

**Heroes** (`src/heros/`): `HighImpact`, `MediumImpact`, `LowImpact`, `PostHero` — selected per-page/post in Payload and rendered via `RenderHero`.

**Plugins** (`src/plugins/`): SEO, Search, Redirects, Form Builder, Nested Docs, and Scheduled Publish (jobs queue).

**Types:** `src/payload-types.ts` is auto-generated — never edit by hand; run `pnpm generate:types` after schema changes.

**Path alias:** `@/` maps to `src/` (configured in `tsconfig.json`).

## Testing

- Integration tests use **Vitest + jsdom** and live in `tests/int/`. Run a single file: `vitest run tests/int/api.int.spec.ts`.
- E2E tests use **Playwright** (Chromium) and live in `tests/e2e/`. They spin up `pnpm dev` automatically if no server is running.
- Test env vars come from `test.env`.
