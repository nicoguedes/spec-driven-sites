# Site PRD: <site name>

> A Product Requirements Document for **one site**. Author this **as a GitHub Issue** (label: `site-prd`). It defines the *what* and *why* — never the *how*. It's ready when every section is filled and the acceptance criteria are testable.

## Niche & audience

What category of tools, for whom, and why now. What does the visitor type into Google right before they need this?

## Domain & branding

- **Working name:** <...>
- **Candidate domain(s):** <...> (prefer cheap, trusted TLDs)
- **One-line value prop:** <...>
- **Brand accent / gradient:** <...> (drives the hero + logo)

## Target locales

Chosen by **value (CPM) and volume**, not convenience. The default locale renders at `/` for backward compatibility.

| Locale | Why (volume / CPM / market) | Currency | Default? |
|--------|------------------------------|----------|----------|
| en     |                              | USD      | yes      |
|        |                              |          |          |

## Tool set

One row per tool. The `id` is stable; the per-locale slugs are the SEO-facing URLs. A tool may support a subset of the site's locales.

| Tool id | Component | Locales | Slug per locale | One-line description |
|---------|-----------|---------|-----------------|----------------------|
| <id>    | <Pascal>  | en, …   | en: `...`, …    | <...> |

## SEO & keyword intent

- Primary keyword per tool (and the localized variants).
- Editorial content plan: each tool page needs a unique meta description and substantial, genuinely useful copy (use-cases, tips, FAQ).
- Structured data: `WebApplication` JSON-LD per tool page.

## Monetization

- Ads: Google AdSense **Auto Ads** (no manual ad slots). Publisher id comes from `NEXT_PUBLIC_ADSENSE_CLIENT`; the site must build and function with it unset.
- Required policy pages for ad approval: **About**, **Privacy**, **Terms** (per primary locale), linked in the footer.

## Non-goals

What this site explicitly will **not** do. As important as the tool set — it prevents scope creep.

- ...

## UX states

For each tool, define behavior in every state (see the [Constitution](../../CONSTITUTION.md#ux-states-non-negotiable)):

| Tool | Empty / initial | Working | Error / invalid input | Result |
|------|-----------------|---------|------------------------|--------|
| <id> | ...             | ...     | ...                    | ...    |

## Performance & SEO acceptance

- [ ] Lighthouse ≥ 90 (Perf / SEO / Best-Practices / A11y) on home + one tool page per locale.
- [ ] Core Web Vitals "good" on mobile.
- [ ] Every page: unique title + meta description, canonical, `hreflang` to all locale variants.
- [ ] `sitemap.ts` covers every locale × slug; `robots.ts` points to it.

## Risks & open questions

- ...

## Acceptance criteria

Testable, unambiguous. The site is done when all are true. Prefer `Given / When / Then`.

- [ ] Given a visitor on `/<locale>/<slug>`, when the tool loads, then it renders the shared component with that locale's translations and correct number/currency formatting.
- [ ] Given any tool page, when crawled, then it exposes a unique meta description, `WebApplication` JSON-LD, and `hreflang` alternates to every other locale of that tool.
- [ ] Given `NEXT_PUBLIC_ADSENSE_CLIENT` is unset, when the site builds, then it succeeds and serves no ad markup.
- [ ] ...

---

*Next step: the Orchestrator breaks this PRD into tasks grouped in [waves](../process/spec-driven-workflow.md#2-task-breakdown-into-waves-orchestrator) — typically one task per tool — each authored with the [task template](task-template.md).*
