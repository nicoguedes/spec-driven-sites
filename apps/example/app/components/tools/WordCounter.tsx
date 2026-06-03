'use client';

import { useMemo, useState } from 'react';
import { type Locale, localeConfig } from '../../i18n/config';
import { type WordCounterCopy } from '../../i18n/dictionaries';

const WORDS_PER_MINUTE = 200;

export function WordCounter({ locale, t }: { locale: Locale; t: WordCounterCopy }) {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed === '' ? 0 : trimmed.split(/\s+/).length;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const sentences = trimmed === '' ? 0 : (trimmed.match(/[.!?…]+(\s|$)/g) || []).length || (trimmed ? 1 : 0);
    const minutes = Math.max(words > 0 ? Math.ceil(words / WORDS_PER_MINUTE) : 0, 0);
    return { words, characters, charactersNoSpaces, sentences, minutes };
  }, [text]);

  const fmt = new Intl.NumberFormat(localeConfig[locale].lang);
  const isEmpty = text.trim() === '';

  const cells = [
    { label: t.words, value: fmt.format(stats.words) },
    { label: t.characters, value: fmt.format(stats.characters) },
    { label: t.charactersNoSpaces, value: fmt.format(stats.charactersNoSpaces) },
    { label: t.sentences, value: fmt.format(stats.sentences) },
    { label: t.readingTime, value: `${fmt.format(stats.minutes)} ${t.minutes}` },
  ];

  return (
    <div className="tool-card mx-auto max-w-2xl">
      <h2 className="mb-5 text-xl font-semibold text-gray-900 dark:text-white">{t.title}</h2>

      <label htmlFor="wc-text" className="sr-only">
        {t.title}
      </label>
      <textarea
        id="wc-text"
        className="tool-input min-h-[180px] resize-y"
        placeholder={t.placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {isEmpty ? (
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400" role="status">
          {t.emptyHint}
        </p>
      ) : (
        <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3" aria-live="polite">
          {cells.map((c) => (
            <div key={c.label} className="rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800/50">
              <dt className="text-xs text-gray-500 dark:text-gray-400">{c.label}</dt>
              <dd className="mt-1 text-xl font-bold text-primary-600 dark:text-primary-400">{c.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
