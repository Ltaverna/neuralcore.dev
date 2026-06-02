import { describe, it, expect } from 'vitest';
import { services, processSteps, cases, stack } from '../content/site';

const LANGS = ['es', 'en'] as const;

describe('content data', () => {
  it('has 4 services, each bilingual with title + desc', () => {
    expect(services).toHaveLength(4);
    for (const s of services) {
      expect(s.tag).toBeTruthy();
      for (const lang of LANGS) {
        expect(s[lang].title, `service ${s.tag} ${lang}.title`).toBeTruthy();
        expect(s[lang].desc, `service ${s.tag} ${lang}.desc`).toBeTruthy();
      }
    }
  });

  it('has 4 process steps, each bilingual with title + desc', () => {
    expect(processSteps).toHaveLength(4);
    for (const p of processSteps) {
      expect(p.n).toMatch(/^0[1-4]$/);
      for (const lang of LANGS) {
        expect(p[lang].title).toBeTruthy();
        expect(p[lang].desc).toBeTruthy();
      }
    }
  });

  it('has 3 cases, each bilingual with title + metric', () => {
    expect(cases).toHaveLength(3);
    for (const c of cases) {
      expect(c.gradient).toBeTruthy();
      for (const lang of LANGS) {
        expect(c[lang].title, `case ${lang}.title`).toBeTruthy();
        expect(c[lang].metric, `case ${lang}.metric`).toBeTruthy();
      }
    }
  });

  it('has a non-empty language-neutral stack list', () => {
    expect(stack.length).toBeGreaterThan(3);
    for (const item of stack) expect(typeof item).toBe('string');
  });
});
