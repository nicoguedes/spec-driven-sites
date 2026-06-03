/**
 * i18n config — the heart of the slug-mapping architecture.
 *
 * There is ONE component per tool and NO per-language page duplication. Each
 * tool declares the locales it supports and a localized URL slug per locale.
 * `app/[locale]/[slug]/page.tsx` resolves a slug back to its tool and renders
 * the single shared component with that locale's translations injected.
 *
 * To add a tool: add a ToolDef here, add its entries to dictionaries.ts, create
 * the component in components/tools/, and add a case to the resolver switch.
 */

export const locales = ['en', 'pt-br'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export interface LocaleMeta {
  /** BCP-47 tag for <html lang> / hreflang / Intl. */
  lang: string;
  /** Human name (for the language switcher). */
  name: string;
  /** Short label (for the language switcher). */
  shortName: string;
  /** og:locale value. */
  ogLocale: string;
  /** ISO currency for Intl.NumberFormat. */
  currency: string;
  /** Brand display name per locale. */
  siteName: string;
}

export const localeConfig: Record<Locale, LocaleMeta> = {
  en: {
    lang: 'en',
    name: 'English',
    shortName: 'EN',
    ogLocale: 'en_US',
    currency: 'USD',
    siteName: 'Example Toolkit',
  },
  'pt-br': {
    lang: 'pt-BR',
    name: 'Português',
    shortName: 'PT',
    ogLocale: 'pt_BR',
    currency: 'BRL',
    siteName: 'Example Toolkit',
  },
};

export interface ToolDef {
  /** Stable id — keys the dictionary and survives slug changes. */
  id: string;
  /** Component name resolved in [locale]/[slug]/page.tsx. */
  component: string;
  /** Locales this tool ships in. */
  locales: Locale[];
  /** SEO-facing URL slug per locale. */
  slugs: Partial<Record<Locale, string>>;
}

export const tools: ToolDef[] = [
  {
    id: 'unit-converter',
    component: 'UnitConverter',
    locales: ['en', 'pt-br'],
    slugs: {
      en: 'unit-converter',
      'pt-br': 'conversor-de-unidades',
    },
  },
  {
    id: 'word-counter',
    component: 'WordCounter',
    locales: ['en', 'pt-br'],
    slugs: {
      en: 'word-counter',
      'pt-br': 'contador-de-palavras',
    },
  },
  {
    id: 'percentage',
    component: 'Percentage',
    locales: ['en', 'pt-br'],
    slugs: {
      en: 'percentage-calculator',
      'pt-br': 'calculadora-de-porcentagem',
    },
  },
];

// --- Derived helpers used by routing, sitemap, and metadata ----------------

export function findToolBySlug(locale: Locale, slug: string): ToolDef | undefined {
  return tools.find((t) => t.slugs[locale] === slug && t.locales.includes(locale));
}

export function getToolsForLocale(locale: Locale): ToolDef[] {
  return tools.filter((t) => t.locales.includes(locale));
}

/** Every locale × slug pair — feeds generateStaticParams for static export. */
export function getAllStaticParams(): { locale: string; slug: string }[] {
  const params: { locale: string; slug: string }[] = [];
  for (const tool of tools) {
    for (const locale of tool.locales) {
      const slug = tool.slugs[locale];
      if (slug) params.push({ locale, slug });
    }
  }
  return params;
}

/** hreflang map for a tool: { 'en': '/en/...', 'pt-BR': '/pt-br/...' }. */
export function getToolAlternatePaths(toolId: string): Record<string, string> {
  const tool = tools.find((t) => t.id === toolId);
  if (!tool) return {};
  const out: Record<string, string> = {};
  for (const locale of tool.locales) {
    const slug = tool.slugs[locale];
    if (slug) out[localeConfig[locale].lang] = `/${locale}/${slug}`;
  }
  return out;
}

/** hreflang map for the homepage across all locales. */
export function getHomeAlternatePaths(): Record<string, string> {
  const out: Record<string, string> = {};
  for (const locale of locales) {
    out[localeConfig[locale].lang] = `/${locale}`;
  }
  return out;
}
