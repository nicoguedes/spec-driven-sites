import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  locales,
  localeConfig,
  getToolsForLocale,
  getHomeAlternatePaths,
  type Locale,
} from '../i18n/config';
import { getDictionary } from '../i18n/dictionaries';
import { buildAlternates, absoluteUrl } from '@sites/ui/seo';
import { LocaleHeader } from '../components/LocaleHeader';
import { LocaleFooter } from '../components/LocaleFooter';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  if (!locales.includes(locale)) return {};
  const cfg = localeConfig[locale];
  const dict = getDictionary(locale);

  return {
    title: { default: dict.home.metaTitle, template: `%s | ${cfg.siteName}` },
    description: dict.home.metaDescription,
    alternates: {
      canonical: absoluteUrl(`/${locale}`),
      languages: buildAlternates(getHomeAlternatePaths()),
    },
    openGraph: {
      title: dict.home.metaTitle,
      description: dict.home.metaDescription,
      url: absoluteUrl(`/${locale}`),
      siteName: cfg.siteName,
      locale: cfg.ogLocale,
      type: 'website',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  if (!locales.includes(locale)) notFound();

  const dict = getDictionary(locale);
  const tools = getToolsForLocale(locale);

  return (
    <div lang={localeConfig[locale].lang} className="flex min-h-screen flex-col">
      <LocaleHeader locale={locale} dict={dict} tools={tools} />
      <main className="flex-1">{children}</main>
      <LocaleFooter locale={locale} dict={dict} tools={tools} />
    </div>
  );
}
