import Link from 'next/link';
import { type Locale, localeConfig, getToolsForLocale } from '../i18n/config';
import { type Dictionary } from '../i18n/dictionaries';
import { absoluteUrl } from '@sites/ui/seo';

/** The localized homepage body. Shared by the root `/` and `/[locale]` routes. */
export function Home({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const cfg = localeConfig[locale];
  const tools = getToolsForLocale(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: cfg.siteName,
            url: absoluteUrl(`/${locale}`),
            description: dict.home.metaDescription,
            inLanguage: cfg.lang,
          }),
        }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-indigo-800 py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{dict.home.heroTitle}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-100">{dict.home.heroSubtitle}</p>
        </div>
      </section>

      {/* Tool grid */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">{dict.home.chooseTool}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => {
            const card = dict.cards.find((c) => c.id === tool.id);
            if (!card) return null;
            return (
              <Link
                key={tool.id}
                href={`/${locale}/${tool.slugs[locale]}`}
                className="tool-card transition-all hover:border-primary-300 hover:shadow-lg dark:hover:border-primary-700"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{card.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{card.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Editorial */}
      <section className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{dict.home.editorialTitle}</h2>
          <p className="mt-4 leading-relaxed text-gray-600 dark:text-gray-300">{dict.home.editorialText}</p>

          <h3 className="mt-8 text-lg font-semibold text-gray-900 dark:text-white">{dict.home.whyFreeTitle}</h3>
          <p className="mt-2 leading-relaxed text-gray-600 dark:text-gray-300">{dict.home.whyFreeText}</p>

          <div className="mt-8 rounded-xl bg-primary-50 p-6 dark:bg-primary-900/20">
            <h3 className="font-semibold text-gray-900 dark:text-white">{dict.home.privacyBannerTitle}</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{dict.home.privacyBannerText}</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">{dict.home.faqTitle}</h2>
        <div className="space-y-3">
          {dict.home.faqs.map((faq, i) => (
            <details key={i} className="group rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-gray-900 dark:text-white">
                {faq.q}
                <svg className="h-5 w-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
