# Spec-driven workflow — the playbook

This is the operational, copy-pasteable version of the [lifecycle](../../CONSTITUTION.md#the-spec-driven-lifecycle), tuned for the site factory. Roles referenced here are defined in [`agent-roles.md`](agent-roles.md). Commands use the GitHub CLI (`gh`) and `git`; substitute placeholders like `<slug>`, `<n>`, and `feat/...` for real values.

```
IDEA → SITE PRD → TASKS (waves) → ISSUES → IMPLEMENT → REVIEW/MERGE → QA+LIGHTHOUSE → DEPLOY → DONE
```

---

## 0. Idea

Write the niche in a sentence: "free <category> tools for <audience>, in <locales>." If it's worth a domain, it's worth a Site PRD. Don't scaffold yet.

## 1. Site PRD (Product Manager)

Author the Site PRD **as an Issue** so it's a living document with a thread, not a file that rots. Use the **New site** issue form (it mirrors [`site-prd-template.md`](../templates/site-prd-template.md)).

```bash
gh issue create \
  --title "Site: <name>" \
  --label site-prd \
  --body-file docs/templates/site-prd-template.md   # then fill it in, or use the issue form
```

A Site PRD is ready when it has: niche + audience, target locales (chosen by value/volume), the tool list, the per-locale slug map, SEO/keyword intent, the monetization plan, **non-goals**, and **testable acceptance criteria**. The PM signs off before breakdown begins.

## 2. Task breakdown into waves (Orchestrator)

Decompose the PRD into small, single-concern tasks. A typical site decomposes cleanly:

```
wave 1   [ scaffold app + i18n config + shared layout/SEO ]   ← run new-site, wire locales
wave 2   [ tool: converter ] [ tool: word-counter ] [ tool: … ]   ← one task per tool, parallel
wave 3   [ SEO editorial content ] [ policy pages ] [ add locale: de ]   ← parallel, after tools exist
```

> **The wave rule:** tasks are **parallel *within* a wave** (no task in a wave depends on another in the same wave) and **sequential *across* waves** (a wave starts only once the previous wave is merged).

Keep tasks small enough that one agent finishes one in a single focused session and the PR is reviewable in a few minutes. "Add one tool" is a good task; "add the whole site" is not.

## 3. Issues (Orchestrator)

Turn each task into an Issue using the **Task** template (mirrors [`task-template.md`](../templates/task-template.md)). Record dependencies and the wave in the body, and link back to the Site PRD.

```bash
gh issue create \
  --title "[wave 2] tool: word counter (en, pt-br)" \
  --label task \
  --body "Part of Site PRD #<prd-number>. Wave 2. Depends on: #<scaffold-issue>.

  See acceptance criteria below."
```

## 4. Implementation (Developer) — one worktree per task

Each task is built in **its own git worktree** on its own feature branch. Worktrees give every agent (or human) an isolated checkout against the same repo, so parallel work in a wave never collides.

```bash
# scaffold a brand-new site once, in wave 1:
pnpm new-site <name>          # copies apps/example → apps/<name>, renames the package

# per task, one worktree:
git worktree add ../wt-<slug> -b feat/<slug>
cd ../wt-<slug>

# ... implement the tool/locale/SEO against the Issue's acceptance criteria ...
# a tool change usually touches: app/i18n/config.ts (slug map), app/i18n/dictionaries.ts
# (copy + SEO), app/components/tools/<Tool>.tsx, and the resolver switch in [slug]/page.tsx.

pnpm --filter <name> build    # the static export must succeed locally
git add -A
git commit -m "feat: add word counter tool (Closes #<n>)"
git push -u origin feat/<slug>
```

Open a small, single-concern PR that closes the Issue:

```bash
gh pr create \
  --title "feat: word counter tool" \
  --body "Closes #<n>. Part of Site PRD #<prd-number>.

  ## What
  Adds the word-counter tool to apps/<name> for en + pt-br.

  ## Checks
  - per-locale metadata + hreflang alternates
  - sitemap entry
  - UX states (empty / working / error / result)
  - static build passes; Lighthouse green"
```

When a wave's worktrees are merged, remove them and start the next wave:

```bash
git worktree remove ../wt-<slug>
git branch -d feat/<slug>
```

### Or: the "ship from your phone" agent loop

Instead of running the above by hand, comment on the task Issue to dispatch the coding agent wired up in [`../../.github/workflows/agent.yml`](../../.github/workflows/agent.yml):

```
@agent implement this
```

The agent reads the Issue (the spec), opens a draft PR, and [`ci.yml`](../../.github/workflows/ci.yml) runs the gates (lint · typecheck · build · optional Lighthouse). You review and merge from anywhere.

## 5. Review / merge (PR Reviewer / Merger)

The gate. CI must be green; a human must approve; the merge is the one irreducible human step.

```bash
gh pr checks <pr-number>     # confirm lint · typecheck · build (+ Lighthouse) are green
gh pr review <pr-number> --approve
gh pr merge  <pr-number> --squash --delete-branch
```

Reject anything that isn't single-concern, leaks a secret/publisher id/DSN, or fails the [Definition of Done](../../CONSTITUTION.md#definition-of-done).

## 6. QA + Lighthouse (QA)

Against the deployed (or preview) build, probe the UX states of each tool, verify `hreflang`/canonical resolve, confirm the sitemap covers every locale×slug, and run Lighthouse on the home page and one tool page per locale. File a follow-up Issue for every defect — don't patch out-of-band; let it re-enter the pipeline at the Orchestrator.

```bash
npx @lhci/cli autorun        # or your Lighthouse runner against the built `out/`
gh issue create --title "QA: <defect>" --label bug \
  --body "Found during QA of #<n>. Steps to reproduce: ..."
```

## 7. Deploy

Static export → host. The reference target is Cloudflare Pages (free-tier, unlimited bandwidth); any static host works.

```bash
pnpm --filter <name> build
npx wrangler pages deploy apps/<name>/out --project-name <name> --branch main --commit-dirty=true
```

## 8. Done

A change is Done when its acceptance criteria hold, QA + Lighthouse pass, and the PM signs off. The Issue is closed by its merged PR; the Site PRD Issue closes when all its tasks are Done.

---

## At a glance

| Step | Role | Artifact | Command |
|------|------|----------|---------|
| Idea | anyone | one-liner | — |
| Site PRD | Product Manager | Site PRD Issue | `gh issue create --label site-prd` |
| Breakdown | Orchestrator | waves + dep graph | — |
| Issues | Orchestrator | task Issues | `gh issue create --label task` |
| Scaffold | Developer | new app | `pnpm new-site <name>` |
| Implement | Developer | PR in a worktree | `git worktree add` · `gh pr create` |
| Review/Merge | PR Reviewer/Merger | squash-merge | `gh pr merge --squash` |
| QA | QA | Lighthouse result + Issues | `npx @lhci/cli autorun` |
| Deploy | anyone | live site | `wrangler pages deploy` |
| Done | Product Manager | sign-off | close Issue / Site PRD |
