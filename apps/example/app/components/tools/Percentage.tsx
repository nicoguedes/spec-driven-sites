'use client';

import { useState } from 'react';
import { FieldRow, ResultCard } from '@sites/ui';
import { type Locale, localeConfig } from '../../i18n/config';
import { type PercentageCopy } from '../../i18n/dictionaries';

type Mode = 'ofX' | 'isWhatPercent';

export function Percentage({ locale, t }: { locale: Locale; t: PercentageCopy }) {
  const [mode, setMode] = useState<Mode>('ofX');
  const [a, setA] = useState('');
  const [b, setB] = useState('');

  const numA = a.trim() === '' ? null : Number(a);
  const numB = b.trim() === '' ? null : Number(b);
  const bothFilled = numA !== null && numB !== null;
  const isInvalid = bothFilled && (Number.isNaN(numA) || Number.isNaN(numB) || (mode === 'isWhatPercent' && numB === 0));

  let result: number | null = null;
  if (bothFilled && !isInvalid) {
    result = mode === 'ofX' ? (numA! / 100) * numB! : (numA! / numB!) * 100;
  }

  const fmt = new Intl.NumberFormat(localeConfig[locale].lang, { maximumFractionDigits: 4 });
  const state: 'empty' | 'error' | 'result' = !bothFilled ? 'empty' : isInvalid ? 'error' : 'result';

  return (
    <div className="tool-card mx-auto max-w-xl">
      <h2 className="mb-5 text-xl font-semibold text-gray-900 dark:text-white">{t.title}</h2>

      <FieldRow label={t.mode} htmlFor="pc-mode">
        <select id="pc-mode" className="tool-input" value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
          <option value="ofX">{t.modes.ofX}</option>
          <option value="isWhatPercent">{t.modes.isWhatPercent}</option>
        </select>
      </FieldRow>

      <div className="grid grid-cols-2 gap-4">
        <FieldRow label={mode === 'ofX' ? t.percent : t.part} htmlFor="pc-a">
          <input id="pc-a" className="tool-input" inputMode="decimal" value={a} onChange={(e) => setA(e.target.value)} placeholder="0" />
        </FieldRow>
        <FieldRow label={mode === 'ofX' ? t.value : t.whole} htmlFor="pc-b">
          <input id="pc-b" className="tool-input" inputMode="decimal" value={b} onChange={(e) => setB(e.target.value)} placeholder="0" />
        </FieldRow>
      </div>

      <ResultCard state={state} emptyHint={t.emptyHint} errorMessage={t.invalid}>
        <p className="text-sm text-gray-500 dark:text-gray-400">{t.result}</p>
        <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
          {result !== null && fmt.format(result)}
          {mode === 'isWhatPercent' && result !== null ? ' %' : ''}
        </p>
      </ResultCard>
    </div>
  );
}
