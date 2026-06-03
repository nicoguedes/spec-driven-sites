import type { Metadata } from 'next';
import { locales, localeConfig, type Locale } from '../../i18n/config';
import { getDictionary } from '../../i18n/dictionaries';
import { absoluteUrl, buildAlternates } from '@sites/ui/seo';
import { PolicyPage } from '../../components/PolicyPage';

const PAGE = 'about' as const;

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
  const dict = getDictionary(locale);
  const content = dict[PAGE];
  const langs: Record<string, string> = {};
  for (const l of locales) langs[localeConfig[l].lang] = `/${l}/${PAGE}`;
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: absoluteUrl(`/${locale}/${PAGE}`),
      languages: buildAlternates(langs),
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  return <PolicyPage content={dict[PAGE]} />;
}
