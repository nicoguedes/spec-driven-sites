import type { MetadataRoute } from 'next';
import { locales, tools } from './i18n/config';
import { absoluteUrl } from '@sites/ui/seo';

const STATIC_PAGES = ['about', 'privacy', 'terms'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Root + per-locale homepages.
  entries.push({ url: absoluteUrl('/'), lastModified: now, changeFrequency: 'monthly', priority: 1 });
  for (const locale of locales) {
    entries.push({ url: absoluteUrl(`/${locale}`), lastModified: now, changeFrequency: 'monthly', priority: 0.9 });
  }

  // Policy pages per locale.
  for (const locale of locales) {
    for (const page of STATIC_PAGES) {
      entries.push({ url: absoluteUrl(`/${locale}/${page}`), lastModified: now, changeFrequency: 'yearly', priority: 0.3 });
    }
  }

  // Every tool, every locale it ships in.
  for (const tool of tools) {
    for (const locale of tool.locales) {
      const slug = tool.slugs[locale];
      if (slug) {
        entries.push({ url: absoluteUrl(`/${locale}/${slug}`), lastModified: now, changeFrequency: 'monthly', priority: 0.8 });
      }
    }
  }

  return entries;
}
