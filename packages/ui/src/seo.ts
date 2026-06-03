/**
 * SEO helpers shared across sites. All URLs are derived from the env-configured
 * origin so nothing is hardcoded to a real domain.
 *
 *   NEXT_PUBLIC_SITE_URL=https://example.com   (no trailing slash)
 *
 * Falls back to http://localhost:3000 for local dev / when unset.
 */

export type AlternateMap = Record<string, string>;

/** The canonical origin, no trailing slash. */
export function siteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return raw.replace(/\/+$/, '');
}

/** Join a path onto the configured origin. */
export function absoluteUrl(path = '/'): string {
  return `${siteUrl()}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Build the `alternates.languages` map (hreflang) for Next.js Metadata.
 * `entries` maps an hreflang code (e.g. "en", "pt-BR") to its path.
 */
export function buildAlternates(entries: Record<string, string>): AlternateMap {
  const out: AlternateMap = {};
  for (const [lang, path] of Object.entries(entries)) {
    out[lang] = absoluteUrl(path);
  }
  return out;
}

/** `WebApplication` JSON-LD for a tool page. Stringify and drop into a <script>. */
export function webApplicationJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  inLanguage: string;
  priceCurrency: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    inLanguage: opts.inLanguage,
    offers: { '@type': 'Offer', price: '0', priceCurrency: opts.priceCurrency },
  };
}
