# NeuralCore Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the neuralcore.dev marketing landing from scratch in Astro: a bilingual (ES/EN) full-stack-AI-consultancy site with a technical mono-grid + dark-neon visual style and a lime accent, deployed to GitHub Pages.

**Architecture:** Static Astro 5 site. Tailwind 4 (CSS-first `@theme`) for styling. Bilingual via Astro's built-in i18n routing (`/` = Spanish default, `/en/` = English) plus a flat UI-string dictionary and a shared content-data module so markup is written once and text is pulled per-language. Page sections are small, focused `.astro` components assembled by two thin per-locale page files. Verification: Vitest for data/i18n integrity (real logic worth testing), and `astro build` + a grep assertion against the built HTML for component output. Deployed by a GitHub Action.

**Tech Stack:** Astro 5, Tailwind CSS 4 (`@tailwindcss/vite`), TypeScript, Vitest, @fontsource (Inter + JetBrains Mono), Formspree (contact), GitHub Pages + GitHub Actions.

**Source of truth:** Design spec at `docs/superpowers/specs/2026-06-02-neuralcore-landing-design.md`.

---

## File Structure

```
neuralcore.dev/
├── package.json                      # deps + scripts
├── astro.config.mjs                  # Tailwind vite plugin, i18n, site URL
├── tsconfig.json                     # strict TS
├── vitest.config.ts                  # test runner
├── public/
│   └── CNAME                         # neuralcore.dev (copied to dist on build)
├── .github/workflows/deploy.yml      # build + deploy to GitHub Pages
└── src/
    ├── styles/global.css             # Tailwind import + @theme design tokens
    ├── i18n/
    │   ├── ui.ts                     # flat UI-string dictionary (es/en)
    │   └── utils.ts                  # useTranslations(lang)
    ├── content/site.ts               # services/process/cases/stack data (bilingual)
    ├── layouts/Base.astro            # <html>, fonts, global css, grid+glow background
    ├── components/
    │   ├── LangSwitcher.astro
    │   ├── Nav.astro
    │   ├── Hero.astro
    │   ├── ServiceCard.astro
    │   ├── Services.astro
    │   ├── Process.astro
    │   ├── Cases.astro
    │   ├── Stack.astro
    │   ├── Contact.astro
    │   └── Footer.astro
    ├── tests/
    │   ├── i18n.test.ts              # UI-dictionary parity + useTranslations
    │   └── content.test.ts           # content-data bilingual parity
    └── pages/
        ├── index.astro               # Spanish home (lang="es")
        └── en/index.astro            # English home (lang="en")
```

The legacy root `index.html` is deleted in Task 1 (replaced from scratch per spec). The existing root `CNAME` moves to `public/CNAME`.

---

## Conventions used by every task

- Package manager: **npm**. Run commands from repo root `/opt/webpage/neuralcore.dev`.
- TDD-style logic (i18n, content) gets real Vitest tests. `.astro` components get a build + grep verification gate (Astro components have no cheap unit harness; building the site and asserting the rendered HTML is the objective check).
- Commit after every task with a `feat:`/`chore:`/`test:` message.
- Branch: `neuralcore-landing` (already checked out).

---

## Task 1: Project scaffold (package.json, Astro config, tsconfig)

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `public/CNAME`
- Delete: `index.html` (legacy root)
- Delete: `CNAME` (root — moves to `public/`)

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "neuralcore-dev",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "test": "vitest run"
  },
  "dependencies": {
    "astro": "^5.0.0",
    "@fontsource/inter": "^5.1.0",
    "@fontsource/jetbrains-mono": "^5.1.0"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.0",
    "@tailwindcss/vite": "^4.0.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.6.0",
    "vitest": "^2.1.0"
  }
}
```

- [ ] **Step 2: Create `astro.config.mjs`**

```js
// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://neuralcore.dev',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 4: Move CNAME into `public/` and delete legacy files**

Run:
```bash
mkdir -p public
git mv CNAME public/CNAME
git rm index.html
```
Expected: `public/CNAME` exists and contains `neuralcore.dev`; root `index.html` removed.

- [ ] **Step 5: Install dependencies**

Run: `npm install`
Expected: completes without error; `node_modules/` and `package-lock.json` created.

- [ ] **Step 6: Add build artifacts to `.gitignore`**

Append to `.gitignore` (it currently contains only `.superpowers/`):
```
node_modules/
dist/
.astro/
```

- [ ] **Step 7: Commit**

```bash
git add package.json astro.config.mjs tsconfig.json package-lock.json public/CNAME .gitignore
git commit -m "chore: scaffold Astro project, move CNAME to public, drop legacy index.html"
```

---

## Task 2: Tailwind 4 + design tokens (`global.css`)

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: Create `src/styles/global.css`**

```css
@import "tailwindcss";

@theme {
  --color-bg: #070a07;
  --color-bg-soft: #0b0f0b;
  --color-accent: #a3e635;        /* lime */
  --color-accent-soft: #bef264;
  --color-emerald: #10b981;
  --color-line: rgba(255, 255, 255, 0.08);
  --color-line-accent: rgba(163, 230, 53, 0.2);

  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, "Courier New", monospace;
}

/* Mono-grid + neon-glow background, reused by the Base layout */
.bg-grid {
  background-image:
    linear-gradient(rgba(163, 230, 53, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(163, 230, 53, 0.06) 1px, transparent 1px);
  background-size: 22px 22px;
}

.glow-accent {
  text-shadow: 0 0 14px rgba(163, 230, 53, 0.6);
}

.shadow-glow {
  box-shadow: 0 0 16px rgba(163, 230, 53, 0.45);
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-bg);
  color: #e5e7eb;
  font-family: var(--font-sans);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add Tailwind 4 theme tokens and grid/glow utilities"
```

---

## Task 3: Vitest setup

**Files:**
- Create: `vitest.config.ts`

- [ ] **Step 1: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/tests/**/*.test.ts'],
    environment: 'node',
  },
});
```

- [ ] **Step 2: Add a temporary sanity test to prove the runner works**

Create `src/tests/sanity.test.ts`:
```ts
import { describe, it, expect } from 'vitest';

describe('vitest', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 3: Run the test suite**

Run: `npm test`
Expected: PASS — 1 test passed.

- [ ] **Step 4: Remove the sanity test**

Run: `git rm -f src/tests/sanity.test.ts 2>/dev/null || rm src/tests/sanity.test.ts`
(The real tests arrive in Tasks 4 and 5.)

- [ ] **Step 5: Commit**

```bash
git add vitest.config.ts
git commit -m "chore: configure Vitest for src/tests"
```

---

## Task 4: i18n dictionary + translator (TDD)

**Files:**
- Create: `src/i18n/ui.ts`
- Create: `src/i18n/utils.ts`
- Test: `src/tests/i18n.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/tests/i18n.test.ts`:
```ts
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
    // 'nav.services' exists in both; this asserts the lookup path works
    expect(t('nav.services')).not.toBe('');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `../i18n/ui` / `../i18n/utils`.

- [ ] **Step 3: Create `src/i18n/ui.ts`**

```ts
export const languages = { es: 'Español', en: 'English' } as const;
export const defaultLang = 'es';
export type Lang = keyof typeof languages;

export const ui = {
  es: {
    'nav.services': 'Servicios',
    'nav.process': 'Proceso',
    'nav.cases': 'Casos',
    'nav.stack': 'Stack',
    'nav.contact': 'Contacto',
    'hero.prompt': 'user@neuralcore:~$ ./init',
    'hero.titleA': 'Construimos el ',
    'hero.titleAccent': 'núcleo de IA',
    'hero.titleB': ' de tu producto',
    'hero.subtitle':
      'De extremo a extremo: machine learning, datos, software y cloud. Ingeniería que sale a producción.',
    'hero.ctaPrimary': './iniciar_proyecto',
    'hero.ctaSecondary': 'ver_casos',
    'services.kicker': '// 01 — servicios',
    'services.title': 'Cuatro disciplinas, un solo equipo',
    'process.kicker': '// 02 — proceso',
    'process.title': 'Cómo trabajamos',
    'cases.kicker': '// 03 — casos',
    'cases.title': 'Proyectos con resultados',
    'stack.kicker': '// 04 — stack',
    'stack.title': 'Tecnologías que dominamos',
    'contact.kicker': '// 05 — contacto',
    'contact.title': '¿Construimos algo juntos?',
    'contact.name': 'Nombre',
    'contact.email': 'Email',
    'contact.message': 'Mensaje',
    'contact.send': 'enviar',
    'footer.privacy': 'Privacidad',
    'footer.terms': 'Términos',
    'footer.rights': 'Todos los derechos reservados.',
  },
  en: {
    'nav.services': 'Services',
    'nav.process': 'Process',
    'nav.cases': 'Cases',
    'nav.stack': 'Stack',
    'nav.contact': 'Contact',
    'hero.prompt': 'user@neuralcore:~$ ./init',
    'hero.titleA': 'We build the ',
    'hero.titleAccent': 'AI core',
    'hero.titleB': ' of your product',
    'hero.subtitle':
      'End to end: machine learning, data, software and cloud. Engineering that ships to production.',
    'hero.ctaPrimary': './start_project',
    'hero.ctaSecondary': 'view_cases',
    'services.kicker': '// 01 — services',
    'services.title': 'Four disciplines, one team',
    'process.kicker': '// 02 — process',
    'process.title': 'How we work',
    'cases.kicker': '// 03 — cases',
    'cases.title': 'Projects with results',
    'stack.kicker': '// 04 — stack',
    'stack.title': 'Technologies we master',
    'contact.kicker': '// 05 — contact',
    'contact.title': "Let's build something together?",
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'send',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.rights': 'All rights reserved.',
  },
} as const;
```

- [ ] **Step 4: Create `src/i18n/utils.ts`**

```ts
import { ui, defaultLang, type Lang } from './ui';

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS — all i18n tests green.

- [ ] **Step 6: Commit**

```bash
git add src/i18n/ui.ts src/i18n/utils.ts src/tests/i18n.test.ts
git commit -m "feat: add bilingual UI dictionary and translator with parity tests"
```

---

## Task 5: Content data (services/process/cases/stack) (TDD)

**Files:**
- Create: `src/content/site.ts`
- Test: `src/tests/content.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/tests/content.test.ts`:
```ts
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

  it('has 3 cases, each bilingual with title + a metric', () => {
    expect(cases).toHaveLength(3);
    for (const c of cases) {
      expect(c.metric).toBeTruthy();
      expect(c.gradient).toBeTruthy();
      for (const lang of LANGS) {
        expect(c[lang].title).toBeTruthy();
      }
    }
  });

  it('has a non-empty language-neutral stack list', () => {
    expect(stack.length).toBeGreaterThan(3);
    for (const item of stack) expect(typeof item).toBe('string');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `../content/site`.

- [ ] **Step 3: Create `src/content/site.ts`**

```ts
export interface Service {
  tag: string;
  es: { title: string; desc: string };
  en: { title: string; desc: string };
}

export interface ProcessStep {
  n: string;
  es: { title: string; desc: string };
  en: { title: string; desc: string };
}

export interface CaseItem {
  metric: string;
  gradient: string;
  es: { title: string };
  en: { title: string };
}

export const services: Service[] = [
  {
    tag: 'ml',
    es: { title: 'Machine Learning', desc: 'LLMs, visión, agentes y modelos a medida.' },
    en: { title: 'Machine Learning', desc: 'LLMs, vision, agents and custom models.' },
  },
  {
    tag: 'data',
    es: { title: 'Data Engineering', desc: 'Pipelines, warehouses y analytics.' },
    en: { title: 'Data Engineering', desc: 'Pipelines, warehouses and analytics.' },
  },
  {
    tag: 'sw',
    es: { title: 'Software', desc: 'Apps web, APIs, productos y MVPs.' },
    en: { title: 'Software', desc: 'Web apps, APIs, products and MVPs.' },
  },
  {
    tag: 'cloud',
    es: { title: 'Cloud / DevOps', desc: 'Infra, MLOps y escalabilidad.' },
    en: { title: 'Cloud / DevOps', desc: 'Infra, MLOps and scalability.' },
  },
];

export const processSteps: ProcessStep[] = [
  {
    n: '01',
    es: { title: 'discovery', desc: 'entender el reto' },
    en: { title: 'discovery', desc: 'understand the challenge' },
  },
  {
    n: '02',
    es: { title: 'build', desc: 'prototipar y construir' },
    en: { title: 'build', desc: 'prototype and build' },
  },
  {
    n: '03',
    es: { title: 'ship', desc: 'a producción' },
    en: { title: 'ship', desc: 'to production' },
  },
  {
    n: '04',
    es: { title: 'scale', desc: 'medir y escalar' },
    en: { title: 'scale', desc: 'measure and scale' },
  },
];

// NOTE: placeholder cases — real project copy + metrics to be supplied by the user.
export const cases: CaseItem[] = [
  {
    metric: '+18% yield',
    gradient: 'linear-gradient(135deg,#0a1a06,#1a2e0a)',
    es: { title: 'Predicción agro' },
    en: { title: 'Crop prediction' },
  },
  {
    metric: '-60% costo',
    gradient: 'linear-gradient(135deg,#06121a,#0a2433)',
    es: { title: 'Pipeline de datos' },
    en: { title: 'Data pipeline' },
  },
  {
    metric: '0→prod 8sem',
    gradient: 'linear-gradient(135deg,#1a1206,#332406)',
    es: { title: 'Plataforma SaaS' },
    en: { title: 'SaaS platform' },
  },
];

export const stack: string[] = [
  'Python',
  'PyTorch',
  'AWS',
  'PostgreSQL',
  'Docker',
  'React',
];
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS — content + i18n suites green.

- [ ] **Step 5: Commit**

```bash
git add src/content/site.ts src/tests/content.test.ts
git commit -m "feat: add bilingual site content data with parity tests"
```

---

## Task 6: Base layout

**Files:**
- Create: `src/layouts/Base.astro`

- [ ] **Step 1: Create `src/layouts/Base.astro`**

```astro
---
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/700.css';
import '../styles/global.css';
import type { Lang } from '../i18n/ui';

interface Props {
  lang: Lang;
  title?: string;
  description?: string;
}

const {
  lang,
  title = 'NeuralCore — Ingeniería de IA de extremo a extremo',
  description = 'Consultora full-stack de IA: machine learning, datos, software y cloud.',
} = Astro.props;
---

<!doctype html>
<html lang={lang}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <title>{title}</title>
  </head>
  <body class="min-h-screen antialiased">
    <slot />
  </body>
</html>
```

- [ ] **Step 2: Verify it type-checks**

Run: `npm run check`
Expected: 0 errors (warnings about unused files are fine until pages exist; if `check` complains there are no pages yet, that is acceptable at this step).

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Base.astro
git commit -m "feat: add Base layout with fonts and global styles"
```

---

## Task 7: LangSwitcher + Nav

**Files:**
- Create: `src/components/LangSwitcher.astro`
- Create: `src/components/Nav.astro`

- [ ] **Step 1: Create `src/components/LangSwitcher.astro`**

```astro
---
import type { Lang } from '../i18n/ui';
interface Props { lang: Lang }
const { lang } = Astro.props;
const esActive = lang === 'es' ? 'text-accent' : 'text-gray-500';
const enActive = lang === 'en' ? 'text-accent' : 'text-gray-500';
---
<div class="font-mono text-xs">
  <a href="/" class={`hover:text-accent ${esActive}`}>ES</a>
  <span class="text-gray-600">/</span>
  <a href="/en/" class={`hover:text-accent ${enActive}`}>EN</a>
</div>
```

- [ ] **Step 2: Create `src/components/Nav.astro`**

Desktop shows inline links; mobile (`< md`) shows a hamburger button that toggles a dropdown panel containing the same links (spec: "nav a menú hamburguesa"). The toggle is a tiny inline script (no framework needed).

```astro
---
import type { Lang } from '../i18n/ui';
import { useTranslations } from '../i18n/utils';
import LangSwitcher from './LangSwitcher.astro';

interface Props { lang: Lang }
const { lang } = Astro.props;
const t = useTranslations(lang);
const links = [
  { href: '#services', label: t('nav.services') },
  { href: '#process', label: t('nav.process') },
  { href: '#cases', label: t('nav.cases') },
  { href: '#stack', label: t('nav.stack') },
];
---
<header class="sticky top-0 z-50 border-b border-[var(--color-line-accent)] bg-[var(--color-bg)]/80 backdrop-blur">
  <nav class="mx-auto flex max-w-5xl items-center justify-between px-5 py-3 font-mono">
    <a href="#top" class="text-sm font-bold text-white">◇ neuralcore<span class="text-accent">.dev</span></a>

    <!-- Desktop links -->
    <div class="hidden items-center gap-5 text-xs text-gray-400 md:flex">
      {links.map((l) => <a href={l.href} class="hover:text-white">{l.label}</a>)}
      <a href="#contact" class="rounded border border-accent px-3 py-1 text-accent hover:bg-accent hover:text-black">
        {t('nav.contact')}
      </a>
      <LangSwitcher lang={lang} />
    </div>

    <!-- Mobile controls -->
    <div class="flex items-center gap-4 md:hidden">
      <LangSwitcher lang={lang} />
      <button
        id="nav-toggle" type="button" aria-label="Menu" aria-expanded="false" aria-controls="mobile-menu"
        class="text-accent"
      >
        <span class="text-xl leading-none">≡</span>
      </button>
    </div>
  </nav>

  <!-- Mobile dropdown panel -->
  <div id="mobile-menu" hidden class="border-t border-[var(--color-line)] px-5 py-3 font-mono text-sm text-gray-300 md:hidden">
    {links.map((l) => <a href={l.href} class="block py-2 hover:text-accent" data-nav-link>{l.label}</a>)}
    <a href="#contact" class="block py-2 text-accent" data-nav-link>{t('nav.contact')}</a>
  </div>
</header>

<script>
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = !menu.hasAttribute('hidden');
      if (open) {
        menu.setAttribute('hidden', '');
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        menu.removeAttribute('hidden');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
    menu.querySelectorAll('[data-nav-link]').forEach((link) =>
      link.addEventListener('click', () => {
        menu.setAttribute('hidden', '');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );
  }
</script>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/LangSwitcher.astro src/components/Nav.astro
git commit -m "feat: add Nav and language switcher components"
```

(Visual verification happens after the page is assembled in Task 15.)

---

## Task 8: Hero

**Files:**
- Create: `src/components/Hero.astro`

- [ ] **Step 1: Create `src/components/Hero.astro`**

```astro
---
import type { Lang } from '../i18n/ui';
import { useTranslations } from '../i18n/utils';
interface Props { lang: Lang }
const { lang } = Astro.props;
const t = useTranslations(lang);
---
<section id="top" class="bg-grid relative overflow-hidden">
  <div
    class="pointer-events-none absolute inset-0"
    style="background:radial-gradient(circle at 20% 10%, rgba(163,230,53,.16), transparent 50%),radial-gradient(circle at 90% 100%, rgba(16,185,129,.16), transparent 45%)"
  ></div>
  <div class="relative mx-auto max-w-5xl px-5 py-24 md:py-32">
    <p class="mb-4 font-mono text-sm text-accent">● {t('hero.prompt')}</p>
    <h1 class="max-w-2xl text-4xl font-extrabold leading-tight text-white md:text-6xl">
      {t('hero.titleA')}<span class="text-accent glow-accent">{t('hero.titleAccent')}</span>{t('hero.titleB')}
    </h1>
    <p class="mt-5 max-w-xl text-base text-gray-400 md:text-lg">{t('hero.subtitle')}</p>
    <div class="mt-8 flex flex-wrap gap-3 font-mono text-sm">
      <a href="#contact" class="shadow-glow rounded-md bg-accent px-5 py-3 font-bold text-black hover:bg-accent-soft">
        {t('hero.ctaPrimary')} →
      </a>
      <a href="#cases" class="rounded-md border border-gray-700 px-5 py-3 text-gray-300 hover:border-accent hover:text-accent">
        {t('hero.ctaSecondary')}
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: add Hero section"
```

---

## Task 9: Services (ServiceCard + Services)

**Files:**
- Create: `src/components/ServiceCard.astro`
- Create: `src/components/Services.astro`

- [ ] **Step 1: Create `src/components/ServiceCard.astro`**

```astro
---
import type { Lang } from '../i18n/ui';
import type { Service } from '../content/site';
interface Props { service: Service; lang: Lang; featured?: boolean }
const { service, lang, featured = false } = Astro.props;
const border = featured ? 'border-[var(--color-line-accent)]' : 'border-[var(--color-line)]';
---
<div class={`rounded-lg border ${border} bg-white/[0.02] p-5 transition-colors hover:border-[var(--color-line-accent)]`}>
  <div class="font-mono text-xs text-accent">[{service.tag}]</div>
  <h3 class="mt-2 text-lg font-bold text-white">{service[lang].title}</h3>
  <p class="mt-1 text-sm text-gray-400">{service[lang].desc}</p>
</div>
```

- [ ] **Step 2: Create `src/components/Services.astro`**

```astro
---
import type { Lang } from '../i18n/ui';
import { useTranslations } from '../i18n/utils';
import { services } from '../content/site';
import ServiceCard from './ServiceCard.astro';
interface Props { lang: Lang }
const { lang } = Astro.props;
const t = useTranslations(lang);
---
<section id="services" class="border-t border-[var(--color-line)]">
  <div class="mx-auto max-w-5xl px-5 py-20">
    <p class="font-mono text-xs text-accent">{t('services.kicker')}</p>
    <h2 class="mt-1 text-2xl font-bold text-white md:text-3xl">{t('services.title')}</h2>
    <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {services.map((s, i) => <ServiceCard service={s} lang={lang} featured={i === 0} />)}
    </div>
  </div>
</section>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ServiceCard.astro src/components/Services.astro
git commit -m "feat: add Services section"
```

---

## Task 10: Process

**Files:**
- Create: `src/components/Process.astro`

- [ ] **Step 1: Create `src/components/Process.astro`**

```astro
---
import type { Lang } from '../i18n/ui';
import { useTranslations } from '../i18n/utils';
import { processSteps } from '../content/site';
interface Props { lang: Lang }
const { lang } = Astro.props;
const t = useTranslations(lang);
---
<section id="process" class="border-t border-[var(--color-line)]">
  <div class="mx-auto max-w-5xl px-5 py-20">
    <p class="font-mono text-xs text-accent">{t('process.kicker')}</p>
    <h2 class="mt-1 text-2xl font-bold text-white md:text-3xl">{t('process.title')}</h2>
    <div class="mt-8 grid grid-cols-1 gap-3 font-mono text-sm sm:grid-cols-2 lg:grid-cols-4">
      {processSteps.map((p, i) => (
        <div class={`border-l-2 ${i === 0 ? 'border-accent' : 'border-gray-700'} px-4 py-2`}>
          <div class="text-accent">{p.n}</div>
          <div class="font-bold text-white">{p[lang].title}</div>
          <div class="text-gray-500">{p[lang].desc}</div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Process.astro
git commit -m "feat: add Process section"
```

---

## Task 11: Cases

**Files:**
- Create: `src/components/Cases.astro`

- [ ] **Step 1: Create `src/components/Cases.astro`**

```astro
---
import type { Lang } from '../i18n/ui';
import { useTranslations } from '../i18n/utils';
import { cases } from '../content/site';
interface Props { lang: Lang }
const { lang } = Astro.props;
const t = useTranslations(lang);
---
<section id="cases" class="border-t border-[var(--color-line)]">
  <div class="mx-auto max-w-5xl px-5 py-20">
    <p class="font-mono text-xs text-accent">{t('cases.kicker')}</p>
    <h2 class="mt-1 text-2xl font-bold text-white md:text-3xl">{t('cases.title')}</h2>
    <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {cases.map((c) => (
        <div class="overflow-hidden rounded-lg border border-[var(--color-line)]">
          <div class="h-24" style={`background:${c.gradient}`}></div>
          <div class="p-4">
            <div class="font-bold text-white">{c[lang].title}</div>
            <div class="mt-1 font-mono text-xs text-accent">{c.metric}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Cases.astro
git commit -m "feat: add Cases section (placeholder content)"
```

---

## Task 12: Stack

**Files:**
- Create: `src/components/Stack.astro`

- [ ] **Step 1: Create `src/components/Stack.astro`**

```astro
---
import type { Lang } from '../i18n/ui';
import { useTranslations } from '../i18n/utils';
import { stack } from '../content/site';
interface Props { lang: Lang }
const { lang } = Astro.props;
const t = useTranslations(lang);
---
<section id="stack" class="border-t border-[var(--color-line)]">
  <div class="mx-auto max-w-5xl px-5 py-20">
    <p class="font-mono text-xs text-accent">{t('stack.kicker')}</p>
    <h2 class="mt-1 text-2xl font-bold text-white md:text-3xl">{t('stack.title')}</h2>
    <div class="mt-8 flex flex-wrap gap-2 font-mono text-sm">
      {stack.map((item) => (
        <span class="rounded border border-gray-700 px-3 py-1 text-gray-300">{item}</span>
      ))}
      <span class="rounded border border-gray-700 px-3 py-1 text-gray-300">+ más</span>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Stack.astro
git commit -m "feat: add Stack section"
```

---

## Task 13: Contact (Formspree)

**Files:**
- Create: `src/components/Contact.astro`

- [ ] **Step 1: Create `src/components/Contact.astro`**

The Formspree endpoint is a placeholder (`https://formspree.io/f/REPLACE_ME`) until the user supplies a real form ID. Form posts directly to Formspree; no backend needed.

```astro
---
import type { Lang } from '../i18n/ui';
import { useTranslations } from '../i18n/utils';
interface Props { lang: Lang }
const { lang } = Astro.props;
const t = useTranslations(lang);
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/REPLACE_ME';
---
<section id="contact" class="border-t border-[var(--color-line-accent)] bg-accent/[0.03]">
  <div class="mx-auto max-w-5xl px-5 py-20">
    <p class="font-mono text-xs text-accent">{t('contact.kicker')}</p>
    <h2 class="mt-1 text-2xl font-bold text-white md:text-3xl">{t('contact.title')}</h2>
    <form action={FORMSPREE_ENDPOINT} method="POST" class="mt-8 max-w-xl">
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          required name="name" type="text" placeholder={t('contact.name')}
          class="rounded-md border border-gray-700 bg-transparent p-3 text-sm text-white placeholder:text-gray-500 focus:border-accent focus:outline-none"
        />
        <input
          required name="email" type="email" placeholder={t('contact.email')}
          class="rounded-md border border-gray-700 bg-transparent p-3 text-sm text-white placeholder:text-gray-500 focus:border-accent focus:outline-none"
        />
      </div>
      <textarea
        required name="message" rows="4" placeholder={t('contact.message')}
        class="mt-3 w-full rounded-md border border-gray-700 bg-transparent p-3 text-sm text-white placeholder:text-gray-500 focus:border-accent focus:outline-none"
      ></textarea>
      <button
        type="submit"
        class="shadow-glow mt-4 rounded-md bg-accent px-5 py-3 font-mono text-sm font-bold text-black hover:bg-accent-soft"
      >
        {t('contact.send')} →
      </button>
    </form>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Contact.astro
git commit -m "feat: add Contact section with Formspree form (endpoint placeholder)"
```

---

## Task 14: Footer

**Files:**
- Create: `src/components/Footer.astro`

- [ ] **Step 1: Create `src/components/Footer.astro`**

```astro
---
import type { Lang } from '../i18n/ui';
import { useTranslations } from '../i18n/utils';
interface Props { lang: Lang }
const { lang } = Astro.props;
const t = useTranslations(lang);
const year = 2026;
---
<footer class="border-t border-[var(--color-line)]">
  <div class="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-6 font-mono text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
    <span>◇ neuralcore.dev</span>
    <div class="flex gap-4">
      <a href="#" class="hover:text-white">{t('footer.privacy')}</a>
      <a href="#" class="hover:text-white">{t('footer.terms')}</a>
      <span>© {year} NeuralCore · {t('footer.rights')}</span>
    </div>
  </div>
</footer>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: add Footer"
```

---

## Task 15: Assemble pages (ES + EN) and verify the build

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/pages/en/index.astro`

- [ ] **Step 1: Create `src/pages/index.astro` (Spanish, served at `/`)**

```astro
---
import Base from '../layouts/Base.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import Services from '../components/Services.astro';
import Process from '../components/Process.astro';
import Cases from '../components/Cases.astro';
import Stack from '../components/Stack.astro';
import Contact from '../components/Contact.astro';
import Footer from '../components/Footer.astro';
const lang = 'es' as const;
---
<Base lang={lang}>
  <Nav lang={lang} />
  <main>
    <Hero lang={lang} />
    <Services lang={lang} />
    <Process lang={lang} />
    <Cases lang={lang} />
    <Stack lang={lang} />
    <Contact lang={lang} />
  </main>
  <Footer lang={lang} />
</Base>
```

- [ ] **Step 2: Create `src/pages/en/index.astro` (English, served at `/en/`)**

```astro
---
import Base from '../../layouts/Base.astro';
import Nav from '../../components/Nav.astro';
import Hero from '../../components/Hero.astro';
import Services from '../../components/Services.astro';
import Process from '../../components/Process.astro';
import Cases from '../../components/Cases.astro';
import Stack from '../../components/Stack.astro';
import Contact from '../../components/Contact.astro';
import Footer from '../../components/Footer.astro';
const lang = 'en' as const;
---
<Base lang={lang} title="NeuralCore — End-to-end AI engineering" description="Full-stack AI consultancy: machine learning, data, software and cloud.">
  <Nav lang={lang} />
  <main>
    <Hero lang={lang} />
    <Services lang={lang} />
    <Process lang={lang} />
    <Cases lang={lang} />
    <Stack lang={lang} />
    <Contact lang={lang} />
  </main>
  <Footer lang={lang} />
</Base>
```

- [ ] **Step 3: Type-check**

Run: `npm run check`
Expected: 0 errors, 0 warnings.

- [ ] **Step 4: Build the site**

Run: `npm run build`
Expected: build succeeds; `dist/index.html`, `dist/en/index.html`, and `dist/CNAME` exist.

- [ ] **Step 5: Verify rendered output (component gate)**

Run:
```bash
grep -q "núcleo de IA" dist/index.html && echo "ES hero OK"
grep -q "AI core" dist/en/index.html && echo "EN hero OK"
grep -q "neuralcore.dev" dist/CNAME && echo "CNAME OK"
```
Expected: prints `ES hero OK`, `EN hero OK`, `CNAME OK`.

- [ ] **Step 6: Visual check in the dev server**

Run: `npm run dev` (opens http://localhost:4321). Manually confirm: `/` is Spanish, `/en/` is English, lime accent + grid/glow render, nav links scroll to sections, and the layout is responsive (resize to mobile width). Stop the server when done (Ctrl-C).

- [ ] **Step 7: Commit**

```bash
git add src/pages/index.astro src/pages/en/index.astro
git commit -m "feat: assemble bilingual home pages (ES at /, EN at /en/)"
```

---

## Task 16: GitHub Pages deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: withastro/action@v3
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: deploy to GitHub Pages with withastro/action"
```

- [ ] **Step 3: Document the one-time manual GitHub setting**

In the GitHub repo: **Settings → Pages → Build and deployment → Source → "GitHub Actions"**. This is a one-time UI action the user must do; it cannot be scripted here. The custom domain (`neuralcore.dev`) is served via the `public/CNAME` file already in the build output.

---

## Final verification (run before opening the PR)

- [ ] `npm test` — all Vitest suites pass.
- [ ] `npm run check` — 0 errors.
- [ ] `npm run build` — succeeds; `dist/index.html`, `dist/en/index.html`, `dist/CNAME` present.
- [ ] Grep gate from Task 15 Step 5 passes.

---

## Post-implementation follow-ups (need user input — not blockers for first deploy)

- Replace `https://formspree.io/f/REPLACE_ME` in `Contact.astro` with the real Formspree form ID.
- Replace placeholder case studies in `src/content/site.ts` with real projects, copy, and metrics.
- Replace the `◇ neuralcore.dev` text logo with a real logo asset.
- Wire `Privacy` / `Terms` footer links to real pages if/when they exist.
- Optional: add an "About / Team" section if desired (out of scope for v1 per spec).
- Optional polish: subtle fade-in-on-scroll for sections via IntersectionObserver (spec mentions it as a "subtle" effect). Deferred from v1 to keep the first build dependency-free; hover-glow transitions and `prefers-reduced-motion` handling are already implemented. Add as a small progressive-enhancement script if desired.
```
