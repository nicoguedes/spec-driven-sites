# Agent conventions — site factory

> **Customize this file per project.** This is the per-project brief every coding
> agent (Claude, or any other) reads before touching code. It captures the rules
> that are specific to *this* static-site factory. Rename to `AGENTS.md` if your
> tooling prefers that name.

## Read first

1. [`CONSTITUTION.md`](CONSTITUTION.md) — the non-negotiable rules. They override anything here.
2. The Issue you're working on — it *is* the spec. Build exactly what it specifies; nothing more.

## Golden rules

- **Never push to `main`.** Work on `feat/<slug>`, open a PR, let a human merge.
- **One concern per PR** — one tool, one locale, or one piece of SEO scaffolding. If scope grows, file a new Issue.
- **No secrets in the repo, ever.** The AdSense client is `process.env.NEXT_PUBLIC_ADSENSE_CLIENT`; the error DSN is `process.env.NEXT_PUBLIC_ERROR_DSN`. Both must no-op when unset. Never paste a `ca-pub-...`, a DSN, or any token into source or CI.
- **Handle all UX states** (empty / working / error / result) on any tool you touch.

## Project setup

```bash
pnpm install
pnpm dev                       # runs apps/example on http://localhost:3000
pnpm --filter example build    # static export → apps/example/out
pnpm lint
pnpm -r exec tsc --noEmit      # typecheck
pnpm new-site <name>           # scaffold a new app from apps/example
```

These must match the gates in [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

## The i18n slug-mapping rule (the important one)

There is **one component per tool** and **no per-language page duplication**. To add or change a tool:

1. Add/extend a `ToolDef` in `app/i18n/config.ts`: a stable `id`, the `component` name, the `locales` it supports, and a `slugs` map (the SEO-facing URL per locale).
2. Add its copy + SEO metadata + editorial content to `app/i18n/dictionaries.ts`, keyed by locale.
3. Implement the single component in `app/components/tools/<Tool>.tsx`. It receives `locale` + `t` (its translations) as props — it must not hardcode language.
4. Add the `case` in the resolver switch in `app/[locale]/[slug]/page.tsx`.

`generateStaticParams()` expands every `locale × slug` pair, so the whole multilingual surface is prerendered. `getAlternateUrls(toolId)` produces the `hreflang` alternates — wire them into the page's `generateMetadata`. Format numbers/currency/dates with `Intl.*` and the locale's config, never by hand.

## Static-export gotchas (`output: 'export'`)

- **No server features**: no middleware, no API routes, no `redirect()`, no dynamic server rendering. Everything is prerendered to static HTML.
- **AdSense loader is a raw `<script>`**, not `next/script` — under static export `next/script` degrades to `<link rel="preload">` and the ad script never executes. It's injected from `<head>` only when `NEXT_PUBLIC_ADSENSE_CLIENT` is set.
- **No manual ad placeholders.** Google **Auto Ads** places ads itself. Manual `<ins>` slots cause layout shift (CLS) and are not needed. Design ad-friendly layouts (clear sections, breathing room) instead.
- **Dark mode without FOUC**: an inline `<script>` in `<head>` reads `localStorage`/`prefers-color-scheme` and sets the `dark` class before first paint.
- **Favicons & inline logos use `currentColor`** so they adapt to light/dark; OG images are static PNGs.
- `images.unoptimized: true` is required (no image optimization server at runtime).

## SEO checklist for any tool page

- Unique `title` + meta `description`; `keywords`; canonical URL.
- `hreflang` alternates to every other locale of the same tool (`getAlternateUrls`).
- `WebApplication` JSON-LD.
- A `sitemap.ts` entry for each locale × slug; `robots.ts` points at the sitemap.
- Substantial, unique editorial content below the widget (use-cases, tips, FAQ) — not just the tool.
- All copy uses correct accents/diacritics for the locale.

## Directory map

```
apps/example/app/
  i18n/{config.ts,dictionaries.ts}   locales, slug map, translations
  [locale]/layout.tsx                per-locale shell + metadata
  [locale]/page.tsx                  localized homepage
  [locale]/[slug]/page.tsx           slug → component resolution
  components/tools/                  one component per tool
  sitemap.ts  robots.ts
packages/ui/src/                     shared layout, <Ads/>, theme, SEO + error helpers
scripts/new-site.mjs                 scaffolds a new app from example
docs/                                process + templates
```

## Commit & PR conventions

- Commit messages: `<type>: <summary>` (e.g. `feat:`, `fix:`, `refactor:`).
- PR body links its Issue with `Closes #<n>` and summarizes *what* + how it was verified (build + Lighthouse).
