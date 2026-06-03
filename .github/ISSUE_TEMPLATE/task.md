---
name: Task
about: A single-concern unit of work derived from a Site PRD (a tool, a locale, SEO).
title: "[wave <n>] <task title>"
labels: [task]
---

<!--
Mirrors docs/templates/task-template.md. Small enough to finish in one focused
session and review in a few minutes.
-->

**Site PRD:** #<prd-number>
**Wave:** <n>
**Depends on:** <issue numbers, or "none">

## Goal

<!-- One sentence: what this makes true that wasn't before. -->

## Acceptance criteria

- [ ] Given a visitor on the localized URL, when it loads, then the shared component renders with the right translations + locale formatting.
- [ ] Per-locale metadata, canonical, and `hreflang` alternates exist; `sitemap.ts` entry added.
- [ ] All required UX states handled (empty / working / error / result).
- [ ] No publisher id or DSN hardcoded — env reads only.

## Files in scope

<!-- Keeps parallel tasks in the same wave from colliding. -->

- `apps/<name>/app/i18n/config.ts`
- `apps/<name>/app/i18n/dictionaries.ts`
- `apps/<name>/app/components/tools/<Tool>.tsx`
- `apps/<name>/app/[locale]/[slug]/page.tsx`

## QA / Lighthouse

- [ ] Static build passes.
- [ ] Lighthouse ≥ 90 on the new page.

## Notes

<!-- Static-export gotchas, the keyword the slug targets, prior art. -->

---

*Implement in a worktree on `feat/<slug>`; open a small PR that `Closes` this Issue.*
