import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  type Locale,
  findToolBySlug,
  getAllStaticParams,
  getToolAlternatePaths,
  localeConfig,
} from '../../i18n/config';
import { getDictionary } from '../../i18n/dictionaries';
import { absoluteUrl, buildAlternates, webApplicationJsonLd } from '@sites/ui/seo';
import { SEOContent } from '../../components/SEOContent';
import { UnitConverter } from '../../components/tools/UnitConverter';
import { WordCounter } from '../../components/tools/WordCounter';
import { Percentage } from '../../components/tools/Percentage';

// Expand every locale × slug into a static route for `output: 'export'`.
export function generateStaticParams() {
  return getAllStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  const tool = findToolBySlug(locale, slug);
  if (!tool) return {};

  const dict = getDictionary(locale);
  const cfg = localeConfig[locale];
  const seo = dict.seo[tool.id];
  if (!seo) return {};

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    alternates: {
      canonical: absoluteUrl(`/${locale}/${slug}`),
      languages: buildAlternates(getToolAlternatePaths(tool.id)),
    },
    openGraph: {
      title: `${seo.metaTitle} | ${cfg.siteName}`,
      description: seo.metaDescription,
      url: absoluteUrl(`/${locale}/${slug}`),
      locale: cfg.ogLocale,
      type: 'website',
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  const tool = findToolBySlug(locale, slug);
  if (!tool) notFound();

  const dict = getDictionary(locale);
  const cfg = localeConfig[locale];
  const seo = dict.seo[tool.id];

  // Resolve the single shared component for this tool.
  let widget: React.ReactNode;
  switch (tool.component) {
    case 'UnitConverter':
      widget = <UnitConverter locale={locale} t={dict.unitConverter} />;
      break;
    case 'WordCounter':
      widget = <WordCounter locale={locale} t={dict.wordCounter} />;
      break;
    case 'Percentage':
      widget = <Percentage locale={locale} t={dict.percentage} />;
      break;
    default:
      notFound();
  }

  return (
    <>
      {seo && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              webApplicationJsonLd({
                name: seo.jsonLdName,
                description: seo.metaDescription,
                path: `/${locale}/${slug}`,
                inLanguage: cfg.lang,
                priceCurrency: cfg.currency,
              }),
            ),
          }}
        />
      )}

      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="mb-6 text-center text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          {seo?.metaTitle ?? tool.id}
        </h1>
        {widget}
      </div>

      {seo && <SEOContent content={seo} />}
    </>
  );
}
