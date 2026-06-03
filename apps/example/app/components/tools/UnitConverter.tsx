'use client';

import { useState } from 'react';
import { FieldRow, ResultCard } from '@sites/ui';
import { type Locale, localeConfig } from '../../i18n/config';
import { type UnitConverterCopy } from '../../i18n/dictionaries';

type Category = 'length' | 'mass' | 'temperature';

// Factors relative to a base unit (meter, kilogram). Temperature handled separately.
const FACTORS: Record<Exclude<Category, 'temperature'>, Record<string, number>> = {
  length: { m: 1, km: 1000, cm: 0.01, mi: 1609.344, ft: 0.3048, in: 0.0254 },
  mass: { kg: 1, g: 0.001, lb: 0.45359237, oz: 0.0283495231 },
};

const TEMP_UNITS = ['C', 'F', 'K'] as const;

function convertTemp(value: number, from: string, to: string): number {
  // Normalize to Celsius, then to target.
  let c = value;
  if (from === 'F') c = (value - 32) * (5 / 9);
  else if (from === 'K') c = value - 273.15;
  if (to === 'F') return c * (9 / 5) + 32;
  if (to === 'K') return c + 273.15;
  return c;
}

export function UnitConverter({ locale, t }: { locale: Locale; t: UnitConverterCopy }) {
  const [category, setCategory] = useState<Category>('length');
  const [value, setValue] = useState('');

  const units = category === 'temperature' ? [...TEMP_UNITS] : Object.keys(FACTORS[category]);
  const [from, setFrom] = useState(units[0]);
  const [to, setTo] = useState(units[1]);

  const onCategory = (next: Category) => {
    const u = next === 'temperature' ? [...TEMP_UNITS] : Object.keys(FACTORS[next]);
    setCategory(next);
    setFrom(u[0]);
    setTo(u[1]);
  };

  const num = value.trim() === '' ? null : Number(value);
  const isInvalid = num !== null && Number.isNaN(num);

  let result: number | null = null;
  if (num !== null && !isInvalid) {
    if (category === 'temperature') {
      result = convertTemp(num, from, to);
    } else {
      const f = FACTORS[category];
      result = (num * f[from]) / f[to];
    }
  }

  const fmt = new Intl.NumberFormat(localeConfig[locale].lang, { maximumFractionDigits: 6 });
  const state: 'empty' | 'error' | 'result' = num === null ? 'empty' : isInvalid ? 'error' : 'result';

  return (
    <div className="tool-card mx-auto max-w-xl">
      <h2 className="mb-5 text-xl font-semibold text-gray-900 dark:text-white">{t.title}</h2>

      <FieldRow label={t.category} htmlFor="uc-category">
        <select
          id="uc-category"
          className="tool-input"
          value={category}
          onChange={(e) => onCategory(e.target.value as Category)}
        >
          <option value="length">{t.categories.length}</option>
          <option value="mass">{t.categories.mass}</option>
          <option value="temperature">{t.categories.temperature}</option>
        </select>
      </FieldRow>

      <div className="grid grid-cols-2 gap-4">
        <FieldRow label={t.from} htmlFor="uc-from">
          <select id="uc-from" className="tool-input" value={from} onChange={(e) => setFrom(e.target.value)}>
            {units.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </FieldRow>
        <FieldRow label={t.to} htmlFor="uc-to">
          <select id="uc-to" className="tool-input" value={to} onChange={(e) => setTo(e.target.value)}>
            {units.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </FieldRow>
      </div>

      <FieldRow label={t.value} htmlFor="uc-value">
        <input
          id="uc-value"
          className="tool-input"
          inputMode="decimal"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="0"
        />
      </FieldRow>

      <ResultCard state={state} emptyHint={t.emptyHint} errorMessage={t.invalid}>
        <p className="text-sm text-gray-500 dark:text-gray-400">{t.result}</p>
        <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
          {result !== null && fmt.format(result)} {to}
        </p>
      </ResultCard>
    </div>
  );
}
