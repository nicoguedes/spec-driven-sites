# spec-driven-sites

A **spec-driven static-site factory**: one Next.js codebase that ships SEO-optimized, ad-supported tool websites — in multiple languages, at near-zero hosting cost — using a disciplined, agent-first workflow. Fork it, write a one-page spec for your site, and let humans and coding agents build it the same way every time.

It's the sister of [**spec-driven-starter**](https://github.com/nicoguedes/spec-driven-starter) (the same method applied to a generic application). This repo specializes the method for **content sites that have to rank and load fast**.

> Template repo — click **“Use this template”** (or fork). The example app builds to a static `out/` you can deploy to any static host. No business logic, no secrets, no real domains included.

---

## What it is

A pnpm + Turborepo monorepo with three moving parts:

1. **`apps/example/`** — a complete reference site (Next.js 14, App Router, static export, Tailwind, dark mode) shipping three neutral tools: a **unit converter**, a **word counter**, and a **percentage calculator**, in **English and Portuguese**. It demonstrates the whole production pattern: slug-mapped i18n, per-locale metadata, `sitemap`/`robots`, `hreflang`, JSON-LD, AdSense Auto Ads wiring, and the required UX states.
2. **`packages/ui/`** — a small shared package: theme provider + toggle, an env-gated AdSense loader, SEO helpers (`hreflang`, JSON-LD, absolute URLs), layout primitives, and an env-gated error-monitoring shim. No secrets, no DSNs, no hardcoded ids.
3. **The method** — a [`CONSTITUTION.md`](CONSTITUTION.md), an [agent playbook](docs/process/spec-driven-workflow.md), [role definitions](docs/process/agent-roles.md), Issue-as-spec templates, and CI/agent workflows — all tuned for shipping many small sites with discipline.

---

## Why the architecture is good

### One codebase → N sites

Every site is a workspace app cloned from `apps/example`. Shared chrome, ads, SEO, and theming live in `packages/ui`. Adding a site is `pnpm new-site <name>`, not a new repo and a new CI pipeline. Turborepo caches builds across the whole monorepo.

### Slug-mapping i18n — the standout (no page duplication)

Multilingual tool sites usually duplicate a page tree per language. This doesn't. There is **one component per tool**, and a single config maps each tool to a **localized URL slug per locale**:

```ts
// apps/example/app/i18n/config.ts
export const locales = ['en', 'pt-br'] as const;

export const tools: ToolDef[] = [
  {
    id: 'percentage',                 // stable id (keys the dictionary)
    component: 'Percentage',          // the ONE shared component
    locales: ['en', 'pt-br'],
    slugs: {
      en: 'percentage-calculator',    // → /en/percentage-calculator
      'pt-br': 'calculadora-de-porcentagem', // → /pt-br/calculadora-de-porcentagem
    },
  },
  // ...
];
```

The routing lives in `app/[locale]/[slug]/page.tsx`:

- `generateStaticParams()` expands every `locale × slug` pair (`getAllStaticParams()`), so the whole multilingual surface is **prerendered at build time** — required for static export.
- The incoming `[slug]` is resolved back to its tool with `findToolBySlug(locale, slug)`, which renders the single shared component with that locale's translations injected as props.
- All copy, SEO metadata, and editorial content come from `app/i18n/dictionaries.ts`, keyed by locale.
- `getToolAlternatePaths(toolId)` produces the `hreflang` alternates linking every language variant of the same tool; numbers/units format via `Intl.NumberFormat` with the per-locale config.

Adding a language to a tool is a **config + dictionary entry**, not a new page. A locale-specific tool just declares a single locale in its `locales` array.

### Static export → free hosting at scale

Every app is `output: 'export'` with `images.unoptimized` — a pure static `out/` directory, no server runtime. That deploys to **Cloudflare Pages on the free tier (unlimited bandwidth)**, so a site that suddenly ranks doesn't generate a hosting bill. The trade-offs of static export are handled deliberately (see the gotchas below).

### SEO built in, not bolted on

Per-page `Metadata` (unique title + description), canonical + `hreflang` alternates, `WebApplication` JSON-LD on every tool page, a `sitemap.ts`/`robots.ts` covering all locales, and substantial editorial content under each widget (the difference between an AdSense approval and a rejection).

### AdSense Auto Ads, no layout shift

Monetization is **Google Auto Ads** — no manual ad slots in the code (manual `<ins>` slots cause CLS and hurt Core Web Vitals). The loader is **env-gated**: set `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX` and it injects; leave it unset and the site builds and serves **zero ad markup**.

---

## The spec-driven "new site" workflow

Intent for a site lives in a **GitHub Issue**, not a doc that rots. The lifecycle:

```
IDEA → SITE PRD → TASKS (waves) → ISSUES → IMPLEMENT → REVIEW/MERGE → QA+LIGHTHOUSE → DEPLOY → DONE
```

1. **Site PRD** — open a *New site* Issue ([template](docs/templates/site-prd-template.md)): niche, target locales (picked by value/volume), the tool list, the per-locale slug map, SEO intent, monetization, non-goals, and **testable acceptance criteria**.
2. **Waves** — the Orchestrator splits the PRD into small, single-concern tasks and groups them into [waves](docs/process/spec-driven-workflow.md#2-task-breakdown-into-waves-orchestrator) (parallel within a wave, sequential across waves). A site decomposes cleanly: *wave 1* scaffolds the app + i18n; *wave 2* is one task per tool, all in parallel; *wave 3* is SEO content, policy pages, extra locales.
3. **Implement** — one worktree per task, or comment `@agent implement this` on the Issue to dispatch the coding agent in [`.github/workflows/agent.yml`](.github/workflows/agent.yml).
4. **Gates** — [`ci.yml`](.github/workflows/ci.yml) runs lint · typecheck · static build (+ an optional Lighthouse gate). **Never push to `main`; never merge without human approval** ([CONSTITUTION.md](CONSTITUTION.md)).
5. **QA + Lighthouse** — probe the UX states, confirm `hreflang`/sitemap, and assert Lighthouse ≥ 90 (Perf / SEO / Best-Practices / A11y) on home + a tool page per locale.
6. **Deploy** — ship the static `out/`.

Full playbook: [`docs/process/spec-driven-workflow.md`](docs/process/spec-driven-workflow.md). Roles: [`docs/process/agent-roles.md`](docs/process/agent-roles.md).

---

## Fork & create your first site

```bash
# 1. Use this template / fork, then:
pnpm install

# 2. Run the reference site (http://localhost:3000)
pnpm dev

# 3. Scaffold your own site from the example
pnpm new-site mytools          # → apps/mytools (package @sites/mytools)
pnpm install                   # link the new workspace
pnpm --filter mytools dev

# 4. Make it yours — driven by the Site PRD:
#    apps/mytools/app/i18n/config.ts        site name, locales, tools, slug map
#    apps/mytools/app/i18n/dictionaries.ts  copy, SEO metadata, editorial content
#    apps/mytools/app/components/tools/      one component per tool
#    apps/mytools/public/                     favicon, logo, og-image

# 5. Build the static export
pnpm --filter mytools build    # → apps/mytools/out
```

Configure per app via environment (copy [`.env.example`](.env.example) to `.env.local`, or set in your host):

| Variable | Purpose | Unset behavior |
|----------|---------|----------------|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata/sitemap/hreflang | falls back to `http://localhost:3000` |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | AdSense publisher id (`ca-pub-…`) | no ad markup emitted |
| `NEXT_PUBLIC_ERROR_DSN` | Error-monitoring DSN | monitoring is a no-op |

**Nothing sensitive is ever committed** — ids and DSNs come only from the environment ([CONSTITUTION.md](CONSTITUTION.md), prime directive #6).

---

## Deploy pipeline (Cloudflare Pages)

Static export → any static host. The reference target is Cloudflare Pages (free, unlimited bandwidth):

```bash
# build the static export
pnpm --filter mytools build

# first deploy creates the Pages project (generic project name == app name)
npx wrangler pages deploy apps/mytools/out --project-name mytools --branch main --commit-dirty=true
```

In CI, store the AdSense client id and site URL as repository **variables** and your Cloudflare token as a repository **secret** — never in the YAML. After the first deploy, add the live domain in your AdSense dashboard to enable Auto Ads.

---

## Static-export gotchas (handled here, keep them in mind)

- **No server features** — no middleware, API routes, `redirect()`, or dynamic server rendering. Everything is prerendered.
- **AdSense loader is a raw `<script>`**, not `next/script` (which degrades to `<link rel="preload">` under export and never executes).
- **No manual ad placeholders** — Auto Ads handles placement; manual slots cause layout shift.
- **Dark mode without FOUC** — an inline `<head>` script sets the `dark` class before first paint.
- **Favicons/logos use `currentColor`** so they adapt to light/dark; OG images are static.

These conventions are written down for agents in [`CLAUDE.md`](CLAUDE.md).

---

## Repository layout

```
apps/example/app/
  i18n/{config.ts,dictionaries.ts}   locales, slug map, translations + SEO copy
  [locale]/layout.tsx                per-locale shell + metadata + hreflang
  [locale]/page.tsx                  localized homepage
  [locale]/[slug]/page.tsx           slug → component resolution (the core)
  [locale]/{about,privacy,terms}/    policy pages (AdSense requires them)
  components/tools/                  one component per tool
  components/{Home,SEOContent,...}   shared site chrome
  sitemap.ts  robots.ts
packages/ui/src/
  ads.tsx  theme.tsx  seo.ts  layout.tsx  monitoring.tsx   shared, env-gated, no secrets
scripts/new-site.mjs                 scaffold a new app from example
.claude/skills/                      bundled authoring skills (new-website · new-tool)
docs/process/                        spec-driven workflow + agent roles
docs/templates/                      site-prd + task templates
.github/                             ci.yml · agent.yml · issue forms
CONSTITUTION.md  CLAUDE.md           the rules + per-project agent conventions
```

The bundled `.claude/skills/` are copies from the canonical [`claude-code-skills`](https://github.com/nicoguedes/claude-code-skills) collection — pull updates from there.

---

## License

[MIT](LICENSE) © 2026 Vinícius Guedes. Fork it, ship sites, make them yours.
