# Agent roles

Five roles move a new site (or a change to one) through the [lifecycle](../../CONSTITUTION.md#the-spec-driven-lifecycle). A role is a *responsibility*, not a person — one human or agent can wear several, and on a small change one actor may wear all of them. Naming them explicitly is what lets us hand work off cleanly between humans and agents, and between agents working in parallel.

The roles: **Orchestrator**, **Product Manager**, **Developer**, **QA**, **PR Reviewer / Merger**.

---

## Orchestrator

- **Mission** — Turn a Site PRD into a correctly-sequenced plan and keep the waves moving. Owns the dependency graph, not the code.
- **Inputs** — An approved Site PRD Issue; the current state of open Issues and PRs.
- **Outputs** — A task breakdown grouped into waves (typically: wave 1 = scaffold the app + i18n config + shared layout; wave 2 = the tools, one task each, in parallel; wave 3 = SEO content, policy pages, extra locales); one Issue per task with dependencies recorded.
- **Does** — Decompose into small single-concern tasks; identify dependencies; group independent tasks (e.g. "each tool is its own task") into parallel waves; dispatch a wave only when its prerequisite wave is merged; re-sequence when reality diverges.
- **Does NOT** — Write tool code; approve or merge PRs; redefine the site's scope (that's the PM's call — escalate instead).

## Product Manager

- **Mission** — Own the *what* and the *why* of a site. Make intent explicit and agreed before implementation starts.
- **Inputs** — A raw site idea, a niche, a keyword opportunity.
- **Outputs** — A Site PRD Issue ([template](../templates/site-prd-template.md)) with the target locales, the tool list, the per-locale slug map, SEO/keyword intent, monetization plan, non-goals, and testable acceptance criteria.
- **Does** — Frame the niche and the audience; pick locales by value/volume; set the tool set and explicit non-goals; define acceptance criteria that are testable (e.g. "every tool page has a unique meta description and ≥400 words of editorial content"); sign off when delivered.
- **Does NOT** — Prescribe implementation details (the *how*); break work into tasks (that's the Orchestrator); approve the technical correctness of a PR.

## Developer

- **Mission** — Implement one task (a tool, a locale, the SEO scaffolding) to its acceptance criteria, in isolation.
- **Inputs** — One task Issue ([template](../templates/task-template.md)) with acceptance criteria and a list of files in scope; the [Constitution](../../CONSTITUTION.md) and [`CLAUDE.md`](../../CLAUDE.md).
- **Outputs** — A small, single-concern PR on a feature branch in its own worktree, that closes its Issue and passes CI (lint · typecheck · build).
- **Does** — Build exactly what the Issue specifies; add the tool config + slug map + dictionary entries; handle the required UX states; keep `output: 'export'` constraints in mind; respond to review.
- **Does NOT** — Expand scope beyond the Issue (file a new Issue instead); touch files owned by a sibling task in the same wave; hardcode a publisher id or DSN; merge its own PR.

## QA

- **Mission** — Verify the delivered site against the spec, beyond what CI covers — including SEO and performance.
- **Inputs** — A merged/deployed change; the Site PRD's acceptance criteria.
- **Outputs** — A pass/fail result; follow-up Issues for every defect or gap.
- **Does** — Probe the UX states of each tool; verify `hreflang`/canonical tags resolve; check the sitemap covers every locale×slug; run **Lighthouse** on home + a tool page per locale and confirm the gate; spot-check diacritics and locale formatting.
- **Does NOT** — Fix the bugs it finds (file Issues; a Developer picks them up); approve merges.

## PR Reviewer / Merger

- **Mission** — Be the gate. Nothing reaches `main` without passing through here.
- **Inputs** — An open PR with green CI, linked to an Issue.
- **Outputs** — Approval and a squash-merge, or change requests.
- **Does** — Verify the PR is single-concern; confirm acceptance criteria and the [Definition of Done](../../CONSTITUTION.md#definition-of-done); check no secrets leaked; require human approval before merge; squash-merge so it auto-deploys.
- **Does NOT** — Rubber-stamp; merge without explicit human approval; merge a PR that bundles unrelated changes.

---

## Handoffs

```
  PRODUCT MANAGER ──── Site PRD Issue ────▶ ORCHESTRATOR
                                                │
                                       task Issues, in waves
                                                │
                                                ▼
                                           DEVELOPER  ◀── (one per Issue, parallel within a wave)
                                                │
                                           PR (green CI)
                                                │
                                                ▼
                                  PR REVIEWER / MERGER ──── approve + squash-merge ──▶ deploy
                                                │
                                                ▼
                                    QA + LIGHTHOUSE  ──── defects? ──▶ new Issues ──▶ ORCHESTRATOR
                                                │
                                              pass
                                                │
                                                ▼
                                              DONE  ──── PM signs off against acceptance criteria
```

The only loop is QA → Issues → Orchestrator, by design: found defects re-enter the same disciplined pipeline rather than being patched out-of-band.

See the [operational playbook](spec-driven-workflow.md) for the exact commands each role runs.
