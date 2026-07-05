import { describe, expect, it } from 'vitest';
import { charsMeta, getContent, isLocale, needsMeta } from './content';

describe('getContent', () => {
  it('returns the matching locale content', () => {
    expect(getContent('en').nav.about).toBe('The idea');
    expect(getContent('es').nav.about).toBe('La idea');
    expect(getContent('ru').nav.about).toBe('Идея');
  });

  it('falls back to the default locale for an unknown locale', () => {
    expect(getContent('fr')).toEqual(getContent('en'));
  });
});

describe('isLocale', () => {
  it('accepts known locales and rejects unknown ones', () => {
    expect(isLocale('en')).toBe(true);
    expect(isLocale('es')).toBe(true);
    expect(isLocale('ru')).toBe(true);
    expect(isLocale('fr')).toBe(false);
  });
});

describe('needsMeta / charsMeta', () => {
  it('cover the same keys referenced by every locale content tree', () => {
    const needKeys = needsMeta.map((n) => n.key).sort();
    const charKeys = charsMeta.map((c) => c.key).sort();

    for (const locale of ['en', 'es', 'ru'] as const) {
      const content = getContent(locale);
      expect(Object.keys(content.needs.items).sort()).toEqual(needKeys);
      expect(Object.keys(content.chars.items).sort()).toEqual(charKeys);
    }
  });
});
