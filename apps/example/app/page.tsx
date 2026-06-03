import type { Metadata } from 'next';
import { defaultLocale, localeConfig, getToolsForLocale, getHomeAlternatePaths } from './i18n/config';
import { getDictionary } from './i18n/dictionaries';
import { buildAlternates, absoluteUrl } from '@sites/ui/seo';
import { LocaleHeader } from './components/LocaleHeader';
import { LocaleFooter } from './components/LocaleFooter';
import { Home } from './components/Home';

// The root `/` renders the default-locale homepage for backward compatibility.
// The [locale] segment owns the per-locale shell, so the root supplies its own.
const dict = getDictionary(defaultLocale);
const cfg = localeConfig[defaultLocale];

export const metadata: Metadata = {
  title: dict.home.metaTitle,
  description: dict.home.metaDescription,
  alternates: {
    canonical: absoluteUrl('/'),
    languages: buildAlternates(getHomeAlternatePaths()),
  },
  openGraph: {
    title: dict.home.metaTitle,
    description: dict.home.metaDescription,
    url: absoluteUrl('/'),
    siteName: cfg.siteName,
    locale: cfg.ogLocale,
    type: 'website',
  },
};

export default function RootHomePage() {
  const tools = getToolsForLocale(defaultLocale);
  return (
    <div lang={cfg.lang} className="flex min-h-screen flex-col">
      <LocaleHeader locale={defaultLocale} dict={dict} tools={tools} />
      <main className="flex-1">
        <Home locale={defaultLocale} dict={dict} />
      </main>
      <LocaleFooter locale={defaultLocale} dict={dict} tools={tools} />
    </div>
  );
}
