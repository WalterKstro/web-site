# AGENTS.md

Compact guidance for OpenCode sessions in this repository.

## Commands

```bash
pnpm dev                    # Start dev server at http://localhost:3000
pnpm build                  # Production build (runs next-sitemap postbuild)
pnpm start                  # Serve production build
pnpm lint                   # ESLint check
pnpm lint:fix               # ESLint auto-fix

# Testing
pnpm test:int               # Integration tests (Vitest, jsdom, tests/int/**/*.int.spec.ts)
pnpm test:e2e               # E2E tests (Playwright, Chromium, tests/e2e/)
pnpm test                   # Both int + e2e
vitest run tests/int/api.int.spec.ts  # Run a single integration test file

# Payload CLI
pnpm payload migrate:create # Create a new DB migration
pnpm payload migrate        # Run pending migrations
pnpm generate:types         # Regenerate src/payload-types.ts
pnpm generate:importmap     # Regenerate Payload admin import map
```

All scripts run with `NODE_OPTIONS=--no-deprecation` via `cross-env`.

## Architecture

**Payload CMS 3.x + Next.js 16 monolith.** The Payload backend and Next.js frontend run as a single Next.js app with two route groups:

- `src/app/(payload)/` — Payload admin panel and API routes (`/admin`, `/api`)
- `src/app/(frontend)/` — Public website (`/`, `/posts`, `/search`, `/(sitemaps)`)

**Database:** PostgreSQL via `@payloadcms/db-postgres`. In development, `push: true` applies schema changes without migrations. For production, always create and run migrations explicitly.

**Payload config** lives at `src/payload.config.ts`. Collections: `Pages`, `Posts`, `Media`, `Categories`, `Users`. Globals: `Header`, `Footer`.

**Layout builder** (`src/blocks/`): Pages and Posts use Lexical rich text plus draggable blocks — `ArchiveBlock`, `Banner`, `CallToAction`, `Code`, `Content`, `Form`, `MediaBlock`, `RelatedPosts`. Each block has a `config.ts` (Payload field definition) co-located with its React component.

**Heroes** (`src/heros/`): `HighImpact`, `MediumImpact`, `LowImpact`, `PostHero` — selected per-page/post in Payload and rendered via `RenderHero`.

**Plugins** (`src/plugins/`): SEO, Search, Redirects, Form Builder, Nested Docs, and Scheduled Publish (jobs queue).

**Path aliases:** `@/` maps to `src/`, `@payload-config` maps to `./src/payload.config.ts` (configured in `tsconfig.json`).

## Toolchain & Quirks

- **Tailwind CSS v4** with `@tailwindcss/postcss` (not the traditional v3 plugin setup).
- **React 19**, **TypeScript strict mode**, **ES2022** target.
- **ESLint** ignores generated files: `.next/`, `src/payload-types.ts`, `src/payload-generated-schema.ts`.
- **Next.js config** (`next.config.ts`) wraps with `withPayload` and defines custom `webpack.resolve.extensionAlias` for `.cjs`/`.js`/`.mjs` → `.ts`/`.tsx` variants.
- **Sitemap:** `next-sitemap.config.cjs` runs as a `postbuild` step. Excludes dynamic sitemaps which are served from `/pages-sitemap.xml` and `/posts-sitemap.xml`.
- **Environment:** Requires `.env` with `DATABASE_URL`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`, `CRON_SECRET`, `PREVIEW_SECRET`. See `.env.example`.

## Generated Code

- **`src/payload-types.ts`** — Auto-generated. Never edit by hand. Run `pnpm generate:types` after any schema change.
- **`src/app/(payload)/admin/importMap.js`** — Auto-generated. Run `pnpm generate:importmap` if Payload admin components change.

## Testing

- **Integration tests** use **Vitest + jsdom** and live in `tests/int/`. Setup file: `vitest.setup.ts` (loads `dotenv/config`).
- **E2E tests** use **Playwright** (Chromium) and live in `tests/e2e/`. They spin up `pnpm dev` automatically if no server is running (`reuseExistingServer: true`).
- **Test env vars** come from `test.env` (sets `NODE_OPTIONS="--no-deprecation --no-experimental-strip-types"`).

## Skills & References

This repo bundles agent skills under `.agents/skills/` and `.claude/skills/`. Notable ones:

- **Payload CMS** (`.claude/skills/payload/`) — Start with `SKILL.md` for quick reference, then `reference/` for detailed docs.
- **Tailwind v4 + shadcn/ui**, **React best practices**, **Playwright best practices**, **Vitest**, **Next.js best practices**, **SEO**, **Accessibility**.

Also see `CLAUDE.md` at the repo root for additional project-specific guidance.
