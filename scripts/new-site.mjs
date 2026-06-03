#!/usr/bin/env node
/**
 * new-site — scaffold a new static tool site from apps/example.
 *
 *   pnpm new-site <name>
 *
 * Copies apps/example → apps/<name>, renames the package to @sites/<name>,
 * and prints the next steps. It does NOT touch git, install deps, or deploy.
 *
 * <name> must be a url-safe slug: lowercase letters, digits, and hyphens.
 */

import { cpSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '..');
const appsDir = join(repoRoot, 'apps');
const templateDir = join(appsDir, 'example');

const name = (process.argv[2] || '').trim();

function fail(msg) {
  console.error(`\n  ✗ ${msg}\n`);
  process.exit(1);
}

if (!name) {
  fail('Usage: pnpm new-site <name>   (e.g. pnpm new-site flowtools)');
}
if (!/^[a-z][a-z0-9-]*$/.test(name)) {
  fail(`Invalid name "${name}". Use lowercase letters, digits, and hyphens; start with a letter.`);
}
if (name === 'example') {
  fail('"example" is the template itself — pick a different name.');
}

const targetDir = join(appsDir, name);
if (existsSync(targetDir)) {
  fail(`apps/${name} already exists.`);
}
if (!existsSync(templateDir)) {
  fail('apps/example template not found — are you running this from the repo root?');
}

// Copy the template, skipping build artifacts and local env.
cpSync(templateDir, targetDir, {
  recursive: true,
  filter: (src) => {
    const skip = ['/node_modules', '/.next', '/out', '/.turbo', '/.env.local'];
    return !skip.some((s) => src.includes(s));
  },
});

// Rewrite the package name.
const pkgPath = join(targetDir, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
pkg.name = `@sites/${name}`;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

console.log(`
  ✓ Created apps/${name}  (package @sites/${name})

  Next steps:
    1. pnpm install                     # link the new workspace package
    2. pnpm --filter ${name} dev        # http://localhost:3000

  Then make it yours (this is where the Site PRD drives the work):
    • apps/${name}/app/i18n/config.ts        — site name, locales, tools, slug map
    • apps/${name}/app/i18n/dictionaries.ts  — copy, SEO metadata, editorial content
    • apps/${name}/app/components/tools/     — one component per tool
    • apps/${name}/public/                    — favicon, logo, og-image
    • set NEXT_PUBLIC_SITE_URL (+ optional NEXT_PUBLIC_ADSENSE_CLIENT) in env

  Build the static export:
    pnpm --filter ${name} build               # → apps/${name}/out
`);
