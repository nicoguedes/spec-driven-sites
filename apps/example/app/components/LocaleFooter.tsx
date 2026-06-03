import Link from 'next/link';
import { type Locale, localeConfig, type ToolDef } from '../i18n/config';
import { type Dictionary } from '../i18n/dictionaries';

export function LocaleFooter({
  locale,
  dict,
  tools,
}: {
  locale: Locale;
  dict: Dictionary;
  tools: ToolDef[];
}) {
  const year = new Date().getFullYear();
  const cfg = localeConfig[locale];

  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{cfg.siteName}</p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{dict.footer.tagline}</p>
          </div>

          <nav aria-label="Tools">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{dict.home.chooseTool}</p>
            <ul className="mt-3 space-y-2">
              {tools.map((tool) => (
                <li key={tool.id}>
                  <Link
                    href={`/${locale}/${tool.slugs[locale]}`}
                    className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    {dict.cards.find((c) => c.id === tool.id)?.title || tool.id}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Information">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{cfg.siteName}</p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href={`/${locale}/about`} className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy`} className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  {dict.nav.privacy}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  {dict.nav.terms}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-10 border-t border-gray-200 pt-6 text-center text-xs text-gray-400 dark:border-gray-800 dark:text-gray-600">
          &copy; {year} {cfg.siteName}. {dict.footer.rights} {dict.footer.madeWith}
        </p>
      </div>
    </footer>
  );
}
