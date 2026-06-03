'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ThemeToggle } from '@sites/ui/theme';
import { type Locale, locales, localeConfig, type ToolDef } from '../i18n/config';
import { type Dictionary } from '../i18n/dictionaries';

export function LocaleHeader({
  locale,
  dict,
  tools,
}: {
  locale: Locale;
  dict: Dictionary;
  tools: ToolDef[];
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = tools.map((tool) => ({
    href: `/${locale}/${tool.slugs[locale]}`,
    label: dict.cards.find((c) => c.id === tool.id)?.title || tool.id,
  }));

  const otherLocales = locales.filter((l) => l !== locale);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-primary-600 dark:text-primary-400">
          {/* Inline logo: currentColor adapts to dark mode (see CLAUDE.md). */}
          <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
            <rect width="28" height="28" x="2" y="2" rx="7" fill="currentColor" opacity="0.12" />
            <path d="M9 16h14M16 9v14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <span className="text-lg">{localeConfig[locale].siteName}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-2 flex items-center gap-1 border-l border-gray-200 pl-3 dark:border-gray-700">
            {otherLocales.map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                className="rounded px-2 py-1 text-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                title={localeConfig[l].name}
                hrefLang={localeConfig[l].lang}
              >
                {localeConfig[l].shortName}
              </Link>
            ))}
          </div>
          <span className="ml-1">
            <ThemeToggle label={dict.nav.toggleTheme} />
          </span>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          {otherLocales.map((l) => (
            <Link
              key={l}
              href={`/${l}`}
              className="rounded px-2 py-1 text-xs font-medium text-gray-500 ring-1 ring-gray-300 hover:bg-gray-100 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-gray-800"
              title={localeConfig[l].name}
              hrefLang={localeConfig[l].lang}
            >
              {localeConfig[l].shortName}
            </Link>
          ))}
          <ThemeToggle label={dict.nav.toggleTheme} />
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            aria-label={dict.nav.menu}
            aria-expanded={menuOpen}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-gray-200 bg-white px-4 py-2 dark:border-gray-800 dark:bg-gray-950 lg:hidden" aria-label="Mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
