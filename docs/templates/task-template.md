# Task: <title>

> A single-concern unit of work (one tool, one locale add, the SEO scaffolding…). Author this **as a GitHub Issue** (label: `task`). Small enough to finish in one focused session and review in a few minutes.

**Site PRD:** #<prd-number>
**Wave:** <n>
**Depends on:** <Issue numbers, or "none">

## Goal

One sentence: what this task makes true that wasn't before. (e.g. "The unit converter is available at `/en/unit-converter` and `/pt-br/conversor-de-unidades`.")

## Acceptance criteria

The task is done when all of these hold. Keep them testable.

- [ ] Given a visitor on the tool's localized URL, when it loads, then the shared component renders with the right translations and locale formatting.
- [ ] Per-locale metadata (title + unique description), canonical, and `hreflang` alternates exist.
- [ ] A `sitemap.ts` entry exists for each locale × slug.
- [ ] All required [UX states](../../CONSTITUTION.md#ux-states-non-negotiable) handled (empty / working / error / result).
- [ ] No publisher id or DSN hardcoded — env reads only.
- [ ] ...

## Files in scope

The files this task may touch. Keeps parallel tasks in the same wave from colliding.

- `apps/<name>/app/i18n/config.ts`  (tool def + per-locale slug map)
- `apps/<name>/app/i18n/dictionaries.ts`  (labels, SEO meta, editorial content)
- `apps/<name>/app/components/tools/<Tool>.tsx`  (the one shared component)
- `apps/<name>/app/[locale]/[slug]/page.tsx`  (resolver switch case)
- ...

## QA / Lighthouse

- [ ] Static build passes (`pnpm --filter <name> build`).
- [ ] Lighthouse ≥ 90 on the new tool page (Perf / SEO / Best-Practices / A11y).

## Notes

Anything the implementer (human or agent) should know: static-export gotchas, prior art, the keyword the slug targets.

---

*Implement in a [worktree](../process/spec-driven-workflow.md#4-implementation-developer--one-worktree-per-task) on `feat/<slug>`; open a small PR that `Closes #<this-issue>`.*
