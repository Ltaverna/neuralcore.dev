import { describe, it, expect } from 'vitest';
import { ui, defaultLang } from '../i18n/ui';
import { useTranslations } from '../i18n/utils';

describe('ui dictionary', () => {
  it('has the same keys in every language', () => {
    const reference = Object.keys(ui[defaultLang]).sort();
    for (const lang of Object.keys(ui)) {
      expect(Object.keys(ui[lang as keyof typeof ui]).sort()).toEqual(reference);
    }
  });

  it('has no empty strings', () => {
    for (const lang of Object.keys(ui)) {
      for (const [key, value] of Object.entries(ui[lang as keyof typeof ui])) {
        expect(value, `${lang}.${key}`).not.toBe('');
      }
    }
  });
});

describe('useTranslations', () => {
  it('returns the string for the requested language', () => {
    const t = useTranslations('en');
    expect(t('nav.services')).toBe('Services');
  });

  it('falls back to the default language for a missing key in another lang', () => {
    const t = useTranslations('en');
    expect(t('nav.services')).not.toBe('');
  });
});
