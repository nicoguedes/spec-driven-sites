# Constitution

This is the highest-level "how we work" document for the site factory built from this template. It governs both humans and agents. When anything below conflicts with convenience, the Constitution wins.

If you are an automated agent: read this file and [`CLAUDE.md`](CLAUDE.md) before doing anything else.

This is the **site-factory** edition of the spec-driven method. Its sister, [`spec-driven-starter`](https://github.com/nicoguedes/spec-driven-starter), applies the same lifecycle to a generic application. The lifecycle is identical; the gates are tuned for shipping many small, SEO-driven static sites from one codebase.

---

## Prime directives

1. **Velocity first — but no compliance theater.** Optimize for shipping sites that rank and load fast, not for ceremony. Every rule here exists because it makes the next site cheaper to ship, not because it looks rigorous. Cut any step that is pure overhead. The gates below are the deliberate, cheap, non-negotiable exceptions.
2. **Never push to `main`.** All changes land through a pull request. No exceptions, including for a one-word copy fix.
3. **Never merge without explicit human approval.** Agents may open PRs, respond to review, and make CI green. A human performs the merge. This is the single irreducible human-in-the-loop step.
4. **Small, single-concern PRs.** One PR does one thing — "add the word-counter tool," "add German to the unit converter," not both. If you can't describe it in a sentence without "and," split it.
5. **Every site ships the full kit, or it doesn't ship.** A site is not done until it has: per-locale metadata, `sitemap.ts` + `robots.ts`, `hreflang`/canonical alternates, the required UX states, the AdSense/policy-page requirements, and a passing Lighthouse run. Half a site is not a small site — it's a broken one.
6. **Secrets live only in env / a secret manager.** Never commit a publisher id, DSN, token, or key — not in code, not in config, not in CI YAML. The AdSense client is `NEXT_PUBLIC_ADSENSE_CLIENT`; the error DSN is `NEXT_PUBLIC_ERROR_DSN`; both are read from the environment and **no-op when unset**. A committed secret is a stop-the-line incident.

---

## The spec-driven lifecycle

We agree on the *what* and *why* in writing before the *how*. Intent for a new site lives in a **GitHub Issue** (a Site PRD), not in stale repo docs.

```
IDEA → SITE PRD → TASK BREAKDOWN (waves) → ISSUES → IMPLEMENT → REVIEW/MERGE → QA + LIGHTHOUSE → DEPLOY → DONE
```

- **Site PRD** — a Product Requirements Document for one site, authored as an Issue ([template](docs/templates/site-prd-template.md)). Defines the niche, target locales, the tool set, slug map, SEO/keyword intent, monetization, non-goals, and acceptance criteria.
- **Task breakdown** — decompose the PRD into small, single-concern tasks (one per tool, one per locale add, one for policy pages, one for SEO scaffolding…). Draw the dependency graph and group tasks into **waves**: everything in a wave is independent and runs in parallel; waves run in order.
- **Issues** — each task becomes an Issue ([template](docs/templates/task-template.md)) linked to its Site PRD.
- **Implementation** — one agent or human per Issue, each isolated in its own git worktree on a feature branch.
- **Review / Merge** — small PR per Issue, CI gates (lint · typecheck · build), human approval, squash-merge.
- **QA + Lighthouse** — execute the test plan; run Lighthouse against the static export; file follow-up Issues for findings.
- **Deploy** — ship the static `out/` to the host (e.g. Cloudflare Pages).

Full operational detail: [`docs/process/spec-driven-workflow.md`](docs/process/spec-driven-workflow.md). Role definitions: [`docs/process/agent-roles.md`](docs/process/agent-roles.md).

---

## Definition of Done

A change is **Done** only when every box is checked:

- [ ] The linked Issue's acceptance criteria are all met.
- [ ] The change is a small, single-concern PR with a clear title and description.
- [ ] If it touches a tool/page: per-locale metadata, canonical + `hreflang` alternates, and a `sitemap.ts` entry exist.
- [ ] All required UX states are handled where the change touches a UI surface (see below).
- [ ] Lint, typecheck, and the static build (`output: 'export'`) pass in CI.
- [ ] Core Web Vitals / Lighthouse gate is green for affected pages (see below).
- [ ] No secrets, publisher ids, or DSNs are present in the diff — only env reads.
- [ ] Docs / templates / conventions updated if the change affects them.
- [ ] A human has reviewed and explicitly approved the merge.
- [ ] The PR closes its Issue (e.g. `Closes #123`).

---

## UX states (non-negotiable)

Any interactive tool must render these states **distinctly** — never a blank screen, never a frozen widget:

- **Loading / working** — computation, file parsing, or fetch is in flight; show progress, disable the submit, don't freeze the UI.
- **Empty / initial** — nothing entered yet; show a sensible default, a hint, or an example — not a void.
- **Error / invalid input** — bad input or a failed operation; say what's wrong in plain language and how to fix it. Never silently produce a wrong number.
- **Result** — the happy path: the answer, formatted for the locale (`Intl.NumberFormat`, correct currency/units).

The "result" state is necessary but not sufficient. A tool that only handles valid input is not Done.

---

## Performance & accessibility gate (non-negotiable)

These sites live or die on SEO and load speed. Treat the following as merge gates, not aspirations:

- **Core Web Vitals** — LCP, CLS, and INP within Google's "good" thresholds on a mid-tier mobile profile. Static export plus no layout-shifting ad placeholders (Auto Ads) is how we get there cheaply.
- **Lighthouse** — Performance, SEO, Best Practices, and Accessibility each ≥ 90 on representative pages (home + one tool page per locale). Wire this in CI ([`.github/workflows/ci.yml`](.github/workflows/ci.yml) has a Lighthouse-CI placeholder).
- **Accessibility basics** — semantic landmarks and one `<h1>` per page; every input has a `<label>`; interactive elements are keyboard-reachable with visible focus; color contrast meets WCAG AA; images/SVGs have `alt`/`aria-label`. These are cheap and they also help SEO.

---

## Amending this Constitution

Change it the way we change anything else: open an Issue describing the *why*, open a small PR, get human approval, merge. The Constitution is itself spec-driven.
